import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnalyzeResponse, apiService, TranscriptionResponse } from './services/api';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

interface ResultsData {
  transcription: TranscriptionResponse;
  analysis: AnalyzeResponse;
  age: string;
  sessionId: string;
  audioUri: string;
}

export default function ResultsScreen() {
  const params = useLocalSearchParams<{
    age: string;
    sessionId: string;
    audioUri: string;
  }>();

  const [results, setResults] = useState<ResultsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.audioUri) {
      processRecording();
    }
  }, [params.audioUri]);

  const processRecording = async () => {
    try {
      setIsLoading(true);
      setError(null);

      console.log('🔄 Processing recording...');
      console.log('Audio URI:', params.audioUri);

      // Transcribe and analyze the recording
      const { transcription, analysis } = await apiService.transcribeAndAnalyze(params.audioUri);

      setResults({
        transcription,
        analysis,
        age: params.age || 'Unknown',
        sessionId: params.sessionId || 'Unknown',
        audioUri: params.audioUri,
      });

    } catch (error) {
      console.error('❌ Processing error:', error);
      setError('Failed to process recording. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreColor = (score: number): string => {
    if (score >= 80) return '#4CAF50'; // Green
    if (score >= 60) return '#FF9800'; // Orange
    return '#F44336'; // Red
  };

  const getScoreLevel = (score: number): string => {
    if (score >= 90) return '🧠 Brain Master';
    if (score >= 80) return '💪 Brain Athlete';
    if (score >= 70) return '🎯 Sharp Mind';
    if (score >= 60) return '📚 Learning';
    return '🌱 Growing';
  };

  const handleShare = () => {
    Alert.alert(
      'Share Results',
      'Sharing functionality will be added soon!',
      [{ text: 'OK' }]
    );
  };

  const handleNewAssessment = () => {
    router.push('/');
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" backgroundColor="#000000" translucent />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>🤖 AI Agents Analyzing...</Text>
          <Text style={styles.loadingSubtext}>Processing your cognitive assessment</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" backgroundColor="#000000" translucent />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>❌ {error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={processRecording}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!results) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" backgroundColor="#000000" translucent />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No results available</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#000000" translucent />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>🧠 Brain Health Results</Text>
          <Text style={styles.subtitle}>Your AI Cognitive Assessment</Text>
        </View>

        {/* Score Card */}
        <View style={styles.scoreCard}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.scoreGradient}
          >
            <Text style={styles.scoreLabel}>Brain Health Score</Text>
            <Text style={[styles.scoreValue, { color: getScoreColor(results.analysis.brain_health_score) }]}>
              {results.analysis.brain_health_score}
            </Text>
            <Text style={styles.scoreMax}>/ 100</Text>
            <Text style={styles.scoreLevel}>{getScoreLevel(results.analysis.brain_health_score)}</Text>
          </LinearGradient>
        </View>

        {/* Metrics */}
        <View style={styles.metricsContainer}>
          <View style={styles.metricRow}>
            <View style={styles.metric}>
              <Text style={styles.metricValue}>{results.analysis.animal_count}</Text>
              <Text style={styles.metricLabel}>Unique Animals</Text>
            </View>
            <View style={styles.metric}>
              <Text style={styles.metricValue}>{results.analysis.repetitions}</Text>
              <Text style={styles.metricLabel}>Repetitions</Text>
            </View>
            <View style={styles.metric}>
              <Text style={[styles.metricValue, { color: getScoreColor(results.analysis.memory_score) }]}>
                {results.analysis.memory_score}
              </Text>
              <Text style={styles.metricLabel}>Memory Score</Text>
            </View>
          </View>
        </View>

        {/* Transcription */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎤 What You Said</Text>
          <View style={styles.transcriptionBox}>
            <Text style={styles.transcriptionText}>{results.transcription.text}</Text>
            <Text style={styles.confidenceText}>
              Confidence: {(results.transcription.confidence * 100).toFixed(1)}%
            </Text>
          </View>
        </View>

        {/* Detailed Report */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Detailed Analysis</Text>
          <View style={styles.reportBox}>
            <Text style={styles.reportText}>{results.analysis.report}</Text>
          </View>
        </View>

        {/* Session Info */}
        <View style={styles.sessionInfo}>
          <Text style={styles.sessionText}>Age: {results.age}</Text>
          <Text style={styles.sessionText}>Session: {results.sessionId}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <Text style={styles.shareButtonText}>📤 Share Results</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.newButton} onPress={handleNewAssessment}>
            <Text style={styles.newButtonText}>🔄 New Assessment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(20),
  },
  loadingText: {
    fontSize: moderateScale(22),
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: verticalScale(10),
  },
  loadingSubtext: {
    fontSize: moderateScale(14),
    color: '#CCCCCC',
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(20),
  },
  errorText: {
    fontSize: moderateScale(16),
    color: '#FF6B6B',
    textAlign: 'center',
    marginBottom: verticalScale(20),
  },
  retryButton: {
    backgroundColor: '#667eea',
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(20),
    borderRadius: scale(8),
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(14),
    fontWeight: '600',
  },
  header: {
    alignItems: 'center',
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(24),
  },
  title: {
    fontSize: moderateScale(24),
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: verticalScale(6),
  },
  subtitle: {
    fontSize: moderateScale(14),
    color: '#CCCCCC',
    textAlign: 'center',
  },
  scoreCard: {
    marginHorizontal: scale(20),
    marginBottom: verticalScale(24),
    borderRadius: scale(14),
    overflow: 'hidden',
  },
  scoreGradient: {
    paddingVertical: verticalScale(24),
    paddingHorizontal: scale(16),
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: moderateScale(14),
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: verticalScale(6),
  },
  scoreValue: {
    fontSize: moderateScale(60),
    fontWeight: 'bold',
    marginBottom: verticalScale(3),
  },
  scoreMax: {
    fontSize: moderateScale(20),
    color: '#FFFFFF',
    opacity: 0.7,
    marginBottom: verticalScale(10),
  },
  scoreLevel: {
    fontSize: moderateScale(17),
    color: '#FFFFFF',
    fontWeight: '600',
  },
  metricsContainer: {
    marginHorizontal: scale(20),
    marginBottom: verticalScale(24),
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metric: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: verticalScale(16),
    marginHorizontal: scale(3),
    borderRadius: scale(10),
  },
  metricValue: {
    fontSize: moderateScale(28),
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: verticalScale(3),
  },
  metricLabel: {
    fontSize: moderateScale(11),
    color: '#CCCCCC',
    textAlign: 'center',
  },
  section: {
    marginHorizontal: scale(20),
    marginBottom: verticalScale(20),
  },
  sectionTitle: {
    fontSize: moderateScale(17),
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: verticalScale(10),
  },
  transcriptionBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: scale(14),
    borderRadius: scale(10),
  },
  transcriptionText: {
    fontSize: moderateScale(14),
    color: '#FFFFFF',
    lineHeight: moderateScale(21),
    marginBottom: verticalScale(6),
  },
  confidenceText: {
    fontSize: moderateScale(11),
    color: '#CCCCCC',
    fontStyle: 'italic',
  },
  reportBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: scale(14),
    borderRadius: scale(10),
  },
  reportText: {
    fontSize: moderateScale(12),
    color: '#FFFFFF',
    lineHeight: moderateScale(18),
    fontFamily: 'monospace',
  },
  sessionInfo: {
    marginHorizontal: scale(20),
    marginBottom: verticalScale(20),
    paddingVertical: verticalScale(10),
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  sessionText: {
    fontSize: moderateScale(11),
    color: '#999999',
    marginBottom: verticalScale(3),
  },
  actionButtons: {
    marginHorizontal: scale(20),
    marginBottom: verticalScale(32),
    gap: verticalScale(10),
  },
  shareButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: verticalScale(14),
    borderRadius: scale(10),
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  newButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: verticalScale(14),
    borderRadius: scale(10),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  newButtonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
});
