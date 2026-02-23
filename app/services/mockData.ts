export interface MockTranscription {
  text: string;
  confidence: 1.0;
}

export interface MockAnalysis {
  animal_count: number;
  repetitions: number;
  memory_score: number;
  brain_health_score: number;
  report: string;
}

export const generateMockData = (audioUri?: string): {
  transcription: MockTranscription;
  analysis: MockAnalysis;
} => {
  const scenarios = [
    {
      text: "cat dog bird fish elephant lion tiger bear wolf deer rabbit squirrel mouse rat hamster guinea pig",
      animal_count: 16,
      repetitions: 0,
      memory_score: 100,
      brain_health_score: 95,
    },
    {
      text: "cat dog cat bird fish fish elephant lion tiger bear wolf deer rabbit",
      animal_count: 11,
      repetitions: 2,
      memory_score: 98,
      brain_health_score: 88,
    },
    {
      text: "dog cat horse cow pig sheep goat chicken duck turkey rabbit hamster giraffe zebra kangaroo koala panda",
      animal_count: 17,
      repetitions: 0,
      memory_score: 100,
      brain_health_score: 98,
    },
  ];

  const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];

  const report = `🧠 AI Cognitive Assessment - Animal Naming (Demo)
-----------------------------------------------
Total entries:     ${scenario.animal_count + scenario.repetitions}
Unique animals:    ${scenario.animal_count}
Repetitions:       ${scenario.repetitions}
Memory score:      ${scenario.memory_score} / 100
Brain health score:${scenario.brain_health_score} / 100

Unique list: ${scenario.text}

Disclaimer: Demo-only. Not clinical-grade. Not for diagnosis.`;

  return {
    transcription: {
      text: scenario.text,
      confidence: 1.0,
    },
    analysis: {
      animal_count: scenario.animal_count,
      repetitions: scenario.repetitions,
      memory_score: scenario.memory_score,
      brain_health_score: scenario.brain_health_score,
      report,
    },
  };
};
