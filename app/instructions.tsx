import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { Audio } from 'expo-av';

const { width, height } = Dimensions.get('window');

export default function InstructionsScreen() {
  const { age } = useLocalSearchParams<{ age: string }>();
  const [microphonePermission, setMicrophonePermission] = useState<boolean>(false);
  const [checkingPermission, setCheckingPermission] = useState<boolean>(true);

  useEffect(() => {
    checkMicrophonePermission();
  }, []);

  const checkMicrophonePermission = async () => {
    try {
      setCheckingPermission(true);
      const { status } = await Audio.requestPermissionsAsync();
      setMicrophonePermission(status === 'granted');
      setCheckingPermission(false);
    } catch (error) {
      console.log('Permission check error:', error);
      setMicrophonePermission(false);
      setCheckingPermission(false);
    }
  };

  const handleStartRecording = async () => {
    if (!microphonePermission) {
      Alert.alert(
        'Microphone Permission Required',
        'We need access to your microphone to record the assessment.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Grant Permission',
            onPress: checkMicrophonePermission
          }
        ]
      );
      return;
    }

    console.log(`Starting recording for age: ${age}`);
    router.push({ pathname: '/recording', params: { age } });
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#667eea" translucent={false} />

      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
          <View style={styles.content}>
            {/* Header with Back Button */}
            <View style={styles.header}>
              <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                <Text style={styles.backButtonText}>←</Text>
              </TouchableOpacity>
            </View>

            {/* Main Content */}
            <View style={styles.mainContent}>
              {/* Timer Display */}
              <View style={styles.timerContainer}>
                <Text style={styles.timerText}>60</Text>
                <Text style={styles.timerLabel}>seconds</Text>
              </View>

              <Text style={styles.title}>
                Name as many animals as you can in 60 seconds
              </Text>

              <Text style={styles.instruction}>
                Speak clearly - our AI agents will handle the rest
              </Text>

              {/* AI Agents Working Preview */}
              <View style={styles.agentsContainer}>
                <Text style={styles.agentsTitle}>5 AI Agents Ready:</Text>
                <View style={styles.agentsList}>
                  {[
                    '🗣️ Speech Agent - Audio processing',
                    '⚡ Efficiency Agent - Repetition detection',
                    '🧩 Flexibility Agent - Category analysis',
                    '🎯 Strategy Agent - Approach evaluation',
                    '💡 Insight Agent - Personalized tips'
                  ].map((agent, index) => (
                    <Text key={index} style={styles.agentItem}>{agent}</Text>
                  ))}
                </View>
              </View>

              {/* Microphone Status */}
              <View style={styles.micStatusContainer}>
                {checkingPermission ? (
                  <>
                    <View style={styles.loadingIndicator} />
                    <Text style={styles.micStatusText}>Checking microphone...</Text>
                  </>
                ) : (
                  <>
                    <View style={[
                      styles.micStatusIndicator,
                      { backgroundColor: microphonePermission ? '#4CAF50' : '#FF5722' }
                    ]} />
                    <Text style={styles.micStatusText}>
                      {microphonePermission ? '🎤 Microphone Ready' : '❌ Microphone Permission Needed'}
                    </Text>
                  </>
                )}
              </View>

              {/* Age Display */}
              <View style={styles.ageInfo}>
                <Text style={styles.ageInfoText}>Age: {age} • Personalized scoring ready</Text>
              </View>
            </View>

            {/* Start Button */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.startButton,
                  (!microphonePermission || checkingPermission) && styles.disabledButton
                ]}
                onPress={handleStartRecording}
                activeOpacity={0.8}
                disabled={!microphonePermission || checkingPermission}
              >
                <Text style={[
                  styles.startButtonText,
                  (!microphonePermission || checkingPermission) && styles.disabledButtonText
                ]}>
                  {checkingPermission ? 'Checking...' : 'Start Recording'}
                </Text>
              </TouchableOpacity>

              {!microphonePermission && !checkingPermission && (
                <TouchableOpacity
                  style={styles.permissionButton}
                  onPress={checkMicrophonePermission}
                >
                  <Text style={styles.permissionButtonText}>Grant Microphone Access</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#667eea',
  },
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  timerLabel: {
    fontSize: 14,
    color: '#E8E8E8',
    textAlign: 'center',
    marginTop: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 30,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  instruction: {
    fontSize: 16,
    color: '#E8E8E8',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  agentsContainer: {
    marginBottom: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 15,
    width: '100%',
  },
  agentsTitle: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  agentsList: {
    gap: 4,
  },
  agentItem: {
    fontSize: 12,
    color: '#E8E8E8',
    lineHeight: 18,
  },
  micStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 25,
    marginBottom: 16,
  },
  micStatusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  loadingIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFC107',
    marginRight: 10,
  },
  micStatusText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  ageInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 15,
  },
  ageInfoText: {
    fontSize: 12,
    color: '#D0D0D0',
    textAlign: 'center',
  },
  buttonContainer: {
    paddingBottom: 20,
    gap: 12,
  },
  startButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    paddingHorizontal: 64,
    borderRadius: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  disabledButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  startButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#667eea',
    textAlign: 'center',
  },
  disabledButtonText: {
    color: '#999999',
  },
  permissionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FF5722',
  },
  permissionButtonText: {
    fontSize: 16,
    color: '#FF5722',
    fontWeight: '600',
    textAlign: 'center',
  },
});
