// app/utils/errorHandler.ts

/**
 * Error Handler for Demo Mode
 * Suppresses console errors and network errors from appearing in Expo UI
 */

// Store original console methods
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

// List of error patterns to suppress
const SUPPRESSED_PATTERNS = [
  'Network request failed',
  'TypeError: Network request failed',
  'Analysis error',
  'Transcription error',
  'fetch failed',
  'ECONNREFUSED',
  'timeout',
];

/**
 * Check if error message should be suppressed
 */
function shouldSuppress(message: string): boolean {
  return SUPPRESSED_PATTERNS.some(pattern =>
    message.toLowerCase().includes(pattern.toLowerCase())
  );
}

/**
 * Enable demo mode - suppress network and API errors
 */
export function enableDemoMode() {
  console.log('🎬 DEMO MODE ENABLED - Suppressing network errors');

  // Override console.error
  console.error = (...args: any[]) => {
    const message = args.join(' ');
    if (!shouldSuppress(message)) {
      originalConsoleError(...args);
    }
  };

  // Override console.warn
  console.warn = (...args: any[]) => {
    const message = args.join(' ');
    if (!shouldSuppress(message)) {
      originalConsoleWarn(...args);
    }
  };

  // Suppress React Native LogBox for specific errors
  if (__DEV__) {
    const LogBox = require('react-native').LogBox;
    LogBox.ignoreLogs([
      'Network request failed',
      'TypeError: Network request failed',
      'Analysis error',
      'Transcription error',
    ]);
  }
}

/**
 * Disable demo mode - restore normal error handling
 */
export function disableDemoMode() {
  console.log('🎬 DEMO MODE DISABLED - Restoring normal error handling');
  console.error = originalConsoleError;
  console.warn = originalConsoleWarn;
}

/**
 * Safe API call wrapper - doesn't throw errors in demo mode
 */
export async function safeApiCall<T>(
  apiCall: () => Promise<T>,
  fallback: T,
  demoMode: boolean = true
): Promise<T> {
  try {
    return await apiCall();
  } catch (error) {
    if (demoMode) {
      // Silently return fallback in demo mode
      console.log('🎬 Demo mode: Using fallback data');
      return fallback;
    } else {
      // Re-throw error in non-demo mode
      throw error;
    }
  }
}
