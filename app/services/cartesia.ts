// app/services/cartesia.ts
// Direct REST API implementation (Cartesia SDK doesn't work in React Native)

import Constants from 'expo-constants';

// Get API key from Expo Constants (loaded via app.config.js from .env)
const CARTESIA_API_KEY = Constants.expoConfig?.extra?.CARTESIA_API_KEY || '';
const CARTESIA_VERSION = Constants.expoConfig?.extra?.CARTESIA_VERSION;
const CARTESIA_API_URL = 'https://api.cartesia.ai/stt';

class CartesiaService {
  private apiKey: string;

  constructor() {
    this.apiKey = CARTESIA_API_KEY;
    console.log('[Cartesia] API Key loaded:', this.apiKey ? 'Yes' : 'No');
    if (!this.apiKey) {
      console.warn('[Cartesia] Warning: API key not found. Check app.config.js and .env');
    }
  }

  async transcribeAudio(audioUri: string): Promise<{ text: string; confidence: number }> {
    try {
      console.log('[Cartesia] Starting transcription for:', audioUri);
      console.log('[Cartesia] Preparing to send to Cartesia API...');

      // Create FormData for multipart upload
      const formData = new FormData();

      // Check if this is a web blob URL or a native file URI
      if (audioUri.startsWith('blob:')) {
        // Web: Fetch the blob and append it properly
        console.log('[Cartesia] Detected web blob URL, fetching blob...');
        const response = await fetch(audioUri);
        const blob = await response.blob();
        formData.append('file', blob, 'recording.webm');
        console.log('[Cartesia] Blob fetched, size:', blob.size);
      } else {
        // Native (iOS/Android): Use the file URI directly
        formData.append('file', {
          uri: audioUri,
          type: 'audio/wav',
          name: 'recording.wav',
        } as any);
      }

      formData.append('model', 'ink-whisper');
      formData.append('language', 'en');

      // Call Cartesia REST API directly
      const apiResponse = await fetch(CARTESIA_API_URL, {
        method: 'POST',
        headers: {
          'X-API-Key': this.apiKey,
          'Cartesia-Version': CARTESIA_VERSION,
        },
        body: formData,
      });

      if (!apiResponse.ok) {
        const errorText = await apiResponse.text();
        throw new Error(`Cartesia API error: ${apiResponse.status} - ${errorText}`);
      }

      const result = await apiResponse.json();
      console.log('[Cartesia] Transcription completed:', result.text);

      return {
        text: result.text || '',
        confidence: 1.0,
      };
    } catch (error) {
      console.error('[Cartesia] Transcription error:', error);
      throw error;
    }
  }
}

export const cartesiaService = new CartesiaService();
