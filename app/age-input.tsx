import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default function AgeInputScreen() {
  const [age, setAge] = useState<number>(35);

  const handleContinue = () => {
    router.push({ pathname: '/instructions', params: { age } });
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

          {/* Scrollable Content */}
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.title}>What's your age?</Text>

            <Text style={styles.subtitle}>
              Our AI agents need this for personalized brain wellness scoring
            </Text>

            {/* Age Display */}
            <View style={styles.ageDisplayContainer}>
              <Text style={styles.ageNumber}>{age}</Text>
              <Text style={styles.ageLabel}>years old</Text>
            </View>

            {/* Age Slider */}
            <View style={styles.sliderContainer}>
              <Slider
                style={styles.slider}
                minimumValue={18}
                maximumValue={99}
                value={age}
                onValueChange={(value) => setAge(Math.round(value))}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
                thumbTintColor="#FFFFFF"
              />

              {/* Age Range Labels */}
              <View style={styles.rangeLabels}>
                <Text style={styles.rangeLabel}>18</Text>
                <Text style={styles.rangeLabel}>99</Text>
              </View>
            </View>

            {/* Age Categories Helper */}
            <View style={styles.categoryHelper}>
              <Text style={styles.categoryText}>
                {age < 25 ? '🧠 Young Adult' :
                  age < 40 ? '💼 Adult' :
                    age < 60 ? '🎯 Middle Age' : '🌟 Senior'}
              </Text>
            </View>

            <Text style={styles.disclaimer}>
              Required for accurate scoring
            </Text>
          </ScrollView>

          {/* Continue Button - Fixed at bottom */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleContinue}
              activeOpacity={0.8}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
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
    paddingBottom: verticalScale(8),
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
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(10),
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: moderateScale(28),
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: verticalScale(12),
  },
  subtitle: {
    fontSize: moderateScale(14),
    color: '#E8E8E8',
    textAlign: 'center',
    lineHeight: moderateScale(20),
    marginBottom: verticalScale(24),
    paddingHorizontal: scale(8),
  },
  ageDisplayContainer: {
    alignItems: 'center',
    marginBottom: verticalScale(24),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(32),
    borderRadius: scale(16),
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignSelf: 'center',
  },
  ageNumber: {
    fontSize: moderateScale(56),
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  ageLabel: {
    fontSize: moderateScale(15),
    color: '#E8E8E8',
    textAlign: 'center',
    marginTop: verticalScale(2),
  },
  sliderContainer: {
    width: '100%',
    marginBottom: verticalScale(18),
  },
  slider: {
    width: '100%',
    height: scale(40),
  },
  rangeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(6),
    paddingHorizontal: scale(10),
  },
  rangeLabel: {
    fontSize: moderateScale(12),
    color: '#D0D0D0',
    fontWeight: '500',
  },
  categoryHelper: {
    marginBottom: verticalScale(14),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(20),
    borderRadius: scale(16),
    alignSelf: 'center',
  },
  categoryText: {
    fontSize: moderateScale(16),
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
  },
  disclaimer: {
    fontSize: moderateScale(12),
    color: '#D0D0D0',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: verticalScale(12),
  },
  buttonContainer: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(12),
    backgroundColor: 'transparent',
  },
  continueButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(40),
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
  continueButtonText: {
    fontSize: moderateScale(17),
    fontWeight: 'bold',
    color: '#667eea',
    textAlign: 'center',
  },
});
