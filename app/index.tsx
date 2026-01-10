import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default function WelcomeScreen() {
  const handleStartAssessment = () => {
    console.log('🧠 Starting Project Atlas assessment...');
    router.push('/age-input');
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
            {/* Logo Area */}
            <View style={styles.logoSection}>
              <Text style={styles.logoText}>Project Atlas™</Text>
              <Text style={styles.tagline}>
                Agentic AI Agents for Brain Wellness Revolution
              </Text>
            </View>

            {/* Main Content */}
            <View style={styles.mainContent}>
              <Text style={styles.description}>
                60-second cognitive assessment powered by 5 AI agents
              </Text>

              {/* AI Agents Preview */}
              <View style={styles.agentsPreview}>
                {[
                  '🗣️ Speech Agent',
                  '⚡ Efficiency Agent',
                  '🧩 Flexibility Agent',
                  '🎯 Strategy Agent',
                  '💡 Insight Agent'
                ].map((agent, index) => (
                  <Text key={index} style={styles.agentItem}>{agent}</Text>
                ))}
              </View>

              <TouchableOpacity
                style={styles.startButton}
                onPress={handleStartAssessment}
                activeOpacity={0.8}
              >
                <Text style={styles.startButtonText}>Start Assessment</Text>
              </TouchableOpacity>

              <Text style={styles.disclaimer}>
                Anonymous • No signup required
              </Text>
            </View>

            {/* Version Info */}
            <View style={styles.bottomInfo}>
              <Text style={styles.versionText}>Powered by Kevin Mekulu's Research</Text>
              <Text style={styles.versionText}>version 0.1.0</Text>
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
    paddingHorizontal: scale(20),
    justifyContent: 'space-between',
  },
  logoSection: {
    alignItems: 'center',
    paddingTop: verticalScale(30),
  },
  logoText: {
    fontSize: moderateScale(34),
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: verticalScale(12),
    letterSpacing: 1,
  },
  tagline: {
    fontSize: moderateScale(14),
    color: '#E8E8E8',
    textAlign: 'center',
    lineHeight: moderateScale(20),
    paddingHorizontal: scale(16),
  },
  mainContent: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  description: {
    fontSize: moderateScale(16),
    color: '#F0F0F0',
    textAlign: 'center',
    marginBottom: verticalScale(28),
    lineHeight: moderateScale(24),
    paddingHorizontal: scale(12),
    fontWeight: '500',
  },
  agentsPreview: {
    alignItems: 'flex-start',
    marginBottom: verticalScale(32),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(20),
    borderRadius: scale(14),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    width: '100%',
  },
  agentItem: {
    fontSize: moderateScale(14),
    color: '#FFFFFF',
    marginVertical: verticalScale(3),
    fontWeight: '500',
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
    marginBottom: verticalScale(20),
  },
  startButtonText: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#667eea',
    textAlign: 'center',
  },
  disclaimer: {
    fontSize: moderateScale(13),
    color: '#D0D0D0',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  bottomInfo: {
    alignItems: 'center',
    paddingBottom: verticalScale(8),
  },
  versionText: {
    fontSize: moderateScale(10),
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
  },
});
