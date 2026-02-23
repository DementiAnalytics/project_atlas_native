// Shared application constants derived from environment variables.
// Import from here rather than hardcoding values in individual screens.

// How long the recording lasts in seconds.
// Dev: set EXPO_PUBLIC_RECORDING_DURATION=10 for fast iteration.
// Production: 60 seconds (default).
export const RECORDING_DURATION: number = parseInt(
  process.env.EXPO_PUBLIC_RECORDING_DURATION ?? '60',
  10
);
