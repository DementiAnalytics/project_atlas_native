// app/services/api.ts
import { API_CONFIG } from "../config/api";
import { generateMockData } from "./mockData";
import { cartesiaService } from "./cartesia";

const API_BASE_URL = API_CONFIG.baseUrl;

// Silent logging for demo mode
const log = (...args: any[]) => {
  if (API_CONFIG.logRequests) {
    console.log(...args);
  }
};

const logError = (...args: any[]) => {
  if (API_CONFIG.logErrors) {
    console.error(...args);
  }
};

export interface AnalyzeRequest {
  text: string;
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

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async transcribeAudio(audioUri: string): Promise<TranscriptionResponse> {
    // If using mock data, return immediately
    if (API_CONFIG.useMockData) {
      log('[MOCK] Using mock transcription data');
      await this.simulateDelay(1000);
      const mockData = generateMockData(audioUri);
      return mockData.transcription;
    }

    try {
      log('[API] Starting audio transcription with Cartesia...');

      // Use Cartesia service for transcription (frontend-based STT)
      const result = await cartesiaService.transcribeAudio(audioUri);
      log('[API] Transcription completed:', result.text);

      return result;
    } catch (error) {
      // In demo mode, silently fall back to mock data
      if (API_CONFIG.suppressErrors) {
        log('[DEMO] Transcription error, using mock data');
        const mockData = generateMockData(audioUri);
        return mockData.transcription;
      } else {
        logError('[ERROR] Transcription error:', error);
        throw error;
      }
    }
  }

  async analyzeText(text: string): Promise<AnalyzeResponse> {
    // If using mock data, return immediately
    if (API_CONFIG.useMockData) {
      log('[MOCK] Using mock analysis data');
      await this.simulateDelay(1500);
      const mockData = generateMockData();
      return mockData.analysis;
    }

    try {
      log('[API] Starting cognitive analysis...');

      const response = await fetch(`${this.baseUrl}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error(`Analysis failed: ${response.statusText}`);
      }

      const result = await response.json();
      log('[API] Analysis completed');

      return result;
    } catch (error) {
      // In demo mode, silently fall back to mock data
      if (API_CONFIG.suppressErrors) {
        log('[DEMO] Network error, using mock data');
        const mockData = generateMockData();
        return mockData.analysis;
      } else {
        logError('[ERROR] Analysis error:', error);
        throw error;
      }
    }
  }

  async transcribeAndAnalyze(audioUri: string): Promise<{
    transcription: TranscriptionResponse;
    analysis: AnalyzeResponse;
  }> {
    log('🔄 Starting transcription and analysis pipeline...');

    const transcription = await this.transcribeAudio(audioUri);
    const analysis = await this.analyzeText(transcription.text);

    log('✅ Pipeline completed successfully');

    return {
      transcription,
      analysis,
    };
  }

  async checkServerHealth(): Promise<boolean> {
    if (API_CONFIG.useMockData) {
      log('[MOCK] Server health check bypassed (using mock data)');
      return true;
    }

    try {
      const response = await fetch(`${this.baseUrl}/docs`, {
        method: 'GET',
      });
      return response.ok;
    } catch (error) {
      if (!API_CONFIG.suppressErrors) {
        logError('[ERROR] API server not available:', error);
      }
      return false;
    }
  }

  private simulateDelay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const apiService = new ApiService();
