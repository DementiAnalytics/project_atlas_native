import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

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
          {/* Header with Back Button */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
          </View>

          {/* Main Content - Scrollable */}
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
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
          </ScrollView>

          {/* Start Button - Fixed at bottom */}
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
  header: {
    paddingTop: verticalScale(8),
    paddingBottom: verticalScale(12),
    paddingHorizontal: scale(20),
  },
  backButton: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: moderateScale(22),
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: scale(20),
    paddingBottom: verticalScale(20),
    flexGrow: 1,
    justifyContent: 'center',
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: verticalScale(20),
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(28),
    borderRadius: scale(18),
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignSelf: 'center',
  },
  timerText: {
    fontSize: moderateScale(42),
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  timerLabel: {
    fontSize: moderateScale(13),
    color: '#E8E8E8',
    textAlign: 'center',
    marginTop: verticalScale(2),
  },
  title: {
    fontSize: moderateScale(19),
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: moderateScale(26),
    marginBottom: verticalScale(12),
    paddingHorizontal: scale(8),
  },
  instruction: {
    fontSize: moderateScale(14),
    color: '#E8E8E8',
    textAlign: 'center',
    lineHeight: moderateScale(20),
    marginBottom: verticalScale(20),
    paddingHorizontal: scale(8),
  },
  agentsContainer: {
    marginBottom: verticalScale(20),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(16),
    borderRadius: scale(14),
    width: '100%',
  },
  agentsTitle: {
    fontSize: moderateScale(13),
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: verticalScale(8),
  },
  agentsList: {
    gap: verticalScale(3),
  },
  agentItem: {
    fontSize: moderateScale(11),
    color: '#E8E8E8',
    lineHeight: moderateScale(16),
  },
  micStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(14),
    borderRadius: scale(22),
    marginBottom: verticalScale(14),
    alignSelf: 'center',
  },
  micStatusIndicator: {
    width: scale(9),
    height: scale(9),
    borderRadius: scale(5),
    marginRight: scale(8),
  },
  loadingIndicator: {
    width: scale(9),
    height: scale(9),
    borderRadius: scale(5),
    backgroundColor: '#FFC107',
    marginRight: scale(8),
  },
  micStatusText: {
    fontSize: moderateScale(13),
    color: '#FFFFFF',
    fontWeight: '500',
  },
  ageInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: verticalScale(7),
    paddingHorizontal: scale(14),
    borderRadius: scale(14),
    alignSelf: 'center',
  },
  ageInfoText: {
    fontSize: moderateScale(11),
    color: '#D0D0D0',
    textAlign: 'center',
  },
  buttonContainer: {
    paddingBottom: verticalScale(16),
    paddingHorizontal: scale(20),
    gap: verticalScale(10),
  },
  startButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(48),
    borderRadius: scale(28),
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
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#667eea',
    textAlign: 'center',
  },
  disabledButtonText: {
    color: '#999999',
  },
  permissionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(28),
    borderRadius: scale(22),
    borderWidth: 2,
    borderColor: '#FF5722',
  },
  permissionButtonText: {
    fontSize: moderateScale(14),
    color: '#FF5722',
    fontWeight: '600',
    textAlign: 'center',
  },
});
