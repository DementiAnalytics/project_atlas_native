import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableDemoMode } from './app/utils/errorHandler';
import { API_CONFIG } from './app/config/api';

// Import the Welcome screen
import WelcomeScreen from './app/index';

export default function App() {
  useEffect(() => {
    // Enable demo mode if configured
    if (API_CONFIG.suppressErrors) {
      enableDemoMode();

      // Suppress specific warnings in LogBox
      LogBox.ignoreLogs([
        'Network request failed',
        'TypeError: Network request failed',
        'Analysis error',
        'Transcription error',
        'fetch failed',
        'ECONNREFUSED',
      ]);

      // Ignore all logs for clean demo
      LogBox.ignoreAllLogs(true);
    }
  }, []);

  const handleStartAssessment = () => {
    // For now, just show an alert
    // Later we'll add React Navigation to go to AgeInputScreen
    console.log('🧠 Starting Project Atlas assessment...');
    alert('🎉 Welcome to Project Atlas!\n\nNext: We\'ll add navigation to the Age Input screen.');
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="transparent" translucent />
      <WelcomeScreen onStartAssessment={handleStartAssessment} />
    </SafeAreaProvider>
  );
}
