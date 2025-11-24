# 🧠 Project Atlas™

> **Agentic AI Meets Brain Wellness**
> 60-second cognitive assessment powered by 5 AI agents

[![React Native](https://img.shields.io/badge/React%20Native-0.72+-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-SDK%2049+-000020.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## Table of Contents
1. [What is project Atlas?](#-what-is-project-atlas)
2. [Project Structure](#️-project-structure-subject-to-change)
3. [Tech Stack](#️-tech-stack)
4. [Quick Start](#-quick-start-with-expo)
5. [Environment Variables](#-environment-variables)
6. [Development Roadmap](#-development-roadmap)
7. [Design Specifications](#-design-specifications)
8. [Metrics & Goals](#-key-metrics--goals)
9. [Contributing](#-contributing)
10. [License](#-license)
11. [Team](#-team)
12. [Support](#-support)

## 📱 What is Project Atlas?

Project Atlas is a revolutionary brain wellness app that uses **5 AI agents** to analyze a simple 60-second animal naming test. Users get personalized cognitive insights and can contribute to brain health research.

### 🎯 The Experience
1. **Enter age** (18-99) for personalized scoring
2. **Record 60 seconds** of animal naming
3. **AI agents analyze** speech, efficiency, flexibility, strategy, and insights
4. **Get results** with brain wellness score
5. **Share on social** or help research via wellness survey

### 🤖 The "5 AI Agents"
- **Speech Agent** - Cleans and processes audio
- **Efficiency Agent** - Detects repetitions and errors
- **Flexibility Agent** - Identifies semantic categories
- **Strategy Agent** - Analyzes cognitive approach
- **Insight Agent** - Generates personalized tips

## 🏗️ Project Structure (subject to change)

```
DA_project_atlas_native/
├── 📁 api/                          # Backend containing scoring algorithm
├── 📁 app/
│   ├── ⚙️ config/                   # Configs
│   │   └── api.ts                # Api config
│   ├── 🛠️ services/                 # Backend services
│   │   ├── api.ts                # Service for the api
│   │   └── mockData.ts           # Mock data service
│   ├── 📊 utils/                    # Utilities
│   │   └── errorHandler.ts       # Error handler (for demo only)
│   ├── _layout.tsx               # Layout
│   ├── age_input.tsx             # Screen with age input
│   ├── index.tsx                 # Welcome screen
│   ├── insutructions.tsx         # Instructions screen
│   ├── recording.tsx             # Recording screen
│   ├── results.tsx               # Results screen
├── 📁 assets/                   # Fonts & images
│   └── ...
├──📱 App.tsx                    # Main app entry point
├──⚙️ app.json                  # Expo configuration
└── ...                           # Package files
```

## 🛠️ Tech Stack

### Frontend (React Native + Expo)
- **Framework**: Expo SDK with React Native
  * **Language**: TypeScript
- **Navigation**: React Navigation 6
- **State Management**: React Hooks + Context
- **UI Components**: React Native + Custom styling
- **Audio**: Expo AV for recording
- **Storage**: Expo SecureStore + AsyncStorage
- **Sharing**: Expo Sharing

### Backend
- **API**: REST endpoints for assessment processing

### Analytics & Tracking
- **User Events**: Custom tracking system

## 🚀 Quick Start with Expo

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI
- Expo Go app on your phone (for testing)
- If using an emulator, additional setup is needed on your side.
  * Refer to [Set Up Your React Native Environment](https://reactnative.dev/docs/set-up-your-environment)

### 📱 Testing on Device
1. Install **Expo Go** from App Store/Play Store
2. Scan the QR code from your terminal
3. App loads on your phone in the Expo app

### Setup Instructions

1. Install Expo CLI globally
```bash
npm install -g @expo/cli
```
2. Clone the project
```bash
git clone <your-forked-repo-url>
cd DA_project_atlas_native
```

3. Install dependencies
```bash
npm install
```

4. Start the development server
```bash
# When working on private network
npx  start
# When working on public network or the test device is on another network
npx  start --tunnel
```

5. Scan QR code with Expo Go app or press 'a' for Android emulator

### 🔧 Development Scripts

```bash
# Start development server
npm start
# or
npx expo start

# Start on specific platform
npm run android    # Android emulator
npm run ios        # iOS simulator
npm run web        # Web browser

# Build for production
npx expo build:android # Android APK/AAB
npx expo build:ios     # iOS IPA

# TypeScript checking
npm run type-check

# Run tests
npm test

# Lint code
npm run lint
```

## 🔑 Environment Variables

Create `.env` file in project root:

```bash
# API Endpoints
REACT_APP_AZURE_BACKEND=https://your-api.azurewebsites.net
```

## 📋 Development Roadmap

### ✅ Phase 1: Foundation
- [x] Project setup with Expo
- [x] Basic navigation structure
- [x] Welcome screen with branding
- [x] Age input with slider component
- [x] Instructions screen with permissions
- [x] Basic recording screen with timer
- [x] Mock results display

### 🔄 Phase 2: Core Features
- [x] Audio recording with proper format (WAV, 44.1kHz, 16-bit)
- [ ] Azure integration
- [ ] AI processing API connection
- [x] Real-time "AI agents analyzing" animation
- [ ] Results screen with actual data
- [ ] Share functionality
- [ ] Wellness survey implementation

### 🚀 Phase 3: Polish & Launch
- [ ] Device testing (iOS/Android)
- [ ] Performance optimization
- [ ] Analytics tracking implementation
- [ ] Error handling and edge cases
- [ ] App store assets and metadata
- [ ] TestFlight submission

### 🎯 Phase 4: Partnership Prep
- [ ] Wellness data analytics dashboard
- [ ] Partnership integration APIs
- [ ] A/B testing infrastructure
- [ ] Viral sharing optimization
- [ ] User onboarding optimization

## 🎨 Design Specifications

### Visual Design
- **Primary Colors**: Purple gradient (`#667eea` to `#764ba2`)
- **Recording Screen**: Black background (TikTok-friendly)
- **Typography**: System fonts, bold weights
- **Layout**: Mobile-first, portrait orientation

### User Experience
- **Flow**: Linear progression through 5 screens
- **Duration**: Complete assessment in under 2 minutes
- **Accessibility**: Voice prompts, clear visual hierarchy
- **Performance**: <3s app launch, <1s screen transitions

## 📊 Key Metrics & Goals

### User Funnel
- **App Opens** → **Assessment Started** → **Recording Completed** → **Results Viewed** → **Results Shared**
- **Target**: >60% completion rate (opens → results)
- **Viral Goal**: >25% share rate

### Technical Performance
- **App Launch**: <3 seconds
- **Recording Start**: <1 second
- **AI Processing**: 5-15 seconds
- **Results Display**: Instant

### Partnership Data Collection
- Demographics (age, education, location)
- Sleep patterns and mood tracking
- Exercise habits and cognitive performance
- Family history data (anonymized)

## 🤝 Contributing

- Please contribute only if you were explicitly allowed. All unauthorized PRs will be rejected.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Author**: Kevin Mekulu (kxm5924@psu.edu)
- **Founding Software Engineer**: Ernest Saakian
- **Founding ML Engineer**: Alp Karalar
- **Institution**: Penn State University
- **Project**: Brain Wellness Research Initiative

## 🆘 Support

### Common Issues
- **App won't start**: Run `expo doctor` to check setup
- **Audio not recording**: Check device permissions
- **Build fails**: Clear cache with `expo start -c`

### Getting Help
- 📧 Email: kxm5924@psu.edu
- 📚 [Expo Docs](https://docs.expo.dev/)
- 📚 [React Navigation Docs](https://reactnavigation.org/)

---

**🧠 "5 AI Agents revolutionize brain wellness" - Project Atlas™**
