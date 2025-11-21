import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import Slider from '@react-native-community/slider';

const { width, height } = Dimensions.get('window');

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
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 24,
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#E8E8E8',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    paddingHorizontal: 10,
  },
  ageDisplayContainer: {
    alignItems: 'center',
    marginBottom: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 20,
    paddingHorizontal: 48,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignSelf: 'center',
  },
  ageNumber: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  ageLabel: {
    fontSize: 18,
    color: '#E8E8E8',
    textAlign: 'center',
    marginTop: 4,
  },
  sliderContainer: {
    width: '100%',
    marginBottom: 24,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  rangeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 12,
  },
  rangeLabel: {
    fontSize: 14,
    color: '#D0D0D0',
    fontWeight: '500',
  },
  categoryHelper: {
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignSelf: 'center',
  },
  categoryText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
  },
  disclaimer: {
    fontSize: 14,
    color: '#D0D0D0',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: 'transparent',
  },
  continueButton: {
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
  continueButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#667eea',
    textAlign: 'center',
  },
});
