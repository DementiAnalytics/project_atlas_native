// app/services/api.ts
import { Platform } from 'react-native';
import { API_CONFIG } from '../config/api';

const log = (...args: any[]) => {
  if (API_CONFIG.logRequests) console.log(...args);
};

const logError = (...args: any[]) => {
  if (API_CONFIG.logErrors) console.error(...args);
};

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeoutMs: number
): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } catch (err: any) {
    if (err.name === 'AbortError') {
      throw new Error(`Request timed out after ${timeoutMs / 1000}s`);
    }
    throw err;
  } finally {
    clearTimeout(id);
  }
}

export interface AnalyzeResponse {
  animal_count: number;
  repetitions: number;
  memory_score: number;
  brain_health_score: number;
  report: string;
}

export interface TranscriptionResponse {
  text: string;
  confidence: number;
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_CONFIG.baseUrl) {
    this.baseUrl = baseUrl;
  }

  async transcribeAudio(audioUri: string): Promise<TranscriptionResponse> {
    log('[API] Starting audio transcription...');

    const formData = new FormData();
    const isAndroid = Platform.OS === 'android';
    formData.append('file', {
      uri: audioUri,
      type: isAndroid ? 'audio/m4a' : 'audio/wav',
      name: isAndroid ? 'recording.m4a' : 'recording.wav',
    } as any);

    // 2-minute timeout — Whisper on a 2-vCPU VM transcribing 60 s of audio can be slow.
    const response = await fetchWithTimeout(
      `${this.baseUrl}/transcribe`,
      { method: 'POST', body: formData },
      120_000
    );

    if (!response.ok) {
      throw new Error(`Transcription failed: ${response.status} ${response.statusText}`);
    }

    const data: TranscriptionResponse = await response.json();
    log('[API] Transcription completed:', data.text);
    return data;
  }

  async analyzeText(text: string): Promise<AnalyzeResponse> {
    log('[API] Starting cognitive analysis...');

    const response = await fetchWithTimeout(
      `${this.baseUrl}/analyze`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      },
      30_000
    );

    if (!response.ok) {
      throw new Error(`Analysis failed: ${response.status} ${response.statusText}`);
    }

    const result: AnalyzeResponse = await response.json();
    log('[API] Analysis completed');
    return result;
  }

  async transcribeAndAnalyze(audioUri: string): Promise<{
    transcription: TranscriptionResponse;
    analysis: AnalyzeResponse;
  }> {
    log('Starting transcription and analysis pipeline...');
    const transcription = await this.transcribeAudio(audioUri);
    const analysis = await this.analyzeText(transcription.text);
    log('Pipeline completed successfully');
    return { transcription, analysis };
  }

  async checkServerHealth(): Promise<boolean> {
    try {
      const response = await fetchWithTimeout(
        `${this.baseUrl}/health`,
        { method: 'GET' },
        5_000
      );
      return response.ok;
    } catch {
      logError('[ERROR] API server not available');
      return false;
    }
  }
}

export const apiService = new ApiService();
