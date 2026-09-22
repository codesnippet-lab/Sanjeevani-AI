export type LanguageCode = 'en' | 'hi' | 'kn';

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  native: string;
  sub: string;
  bcp47: string;
  speechSample: string;
}

export interface SymptomComplaint {
  id: string;
  label: string;
  translations: Record<LanguageCode, string>;
  icon: string;
  keywords: Record<LanguageCode, string[]>;
}

export interface QuestionOption {
  id: string;
  label: string;
  translations: Record<LanguageCode, string>;
  isRedFlag?: boolean;
  keywords?: Record<LanguageCode, string[]>;
}

export interface ClinicalQuestion {
  id: string;
  question: string;
  translations: Record<LanguageCode, string>;
  options: QuestionOption[];
  multi?: boolean;
  flagOn?: string; // value that triggers red flag
  helpText?: Record<LanguageCode, string>;
}

export interface PatientAnswer {
  questionId: string;
  questionText: string;
  answer: string | string[];
  isRedFlag?: boolean;
  answeredByVoice?: boolean;
}

export interface ScannedDocument {
  id: string;
  name: string;
  date: string;
  tag: string;
  icon: string;
  summary: string;
}

export interface PatientState {
  step: number; // 0: language, 1: consent, 2: complaint, 3: questions, 4: scan, 5: summary
  language: LanguageCode;
  consent: {
    shareWithDoctor: boolean;
    abdmLinked: boolean;
  };
  complaintId: string | null;
  currentQuestionIndex: number;
  answers: Record<number, string | string[]>;
  redFlagDetected: boolean;
  scannedDocs: ScannedDocument[];
  timeline: Array<{ date: string; title: string }>;
}

export interface DoctorQueuePatient {
  id: number;
  name: string;
  age: number;
  gender: string;
  waitTime: string;
  chiefComplaint: string;
  isRedFlag: boolean;
  languageUsed: string;
  languageCode: LanguageCode;
  isAbdmLinked: boolean;
  summary: Array<{ label: string; value: string }>;
  timeline: Array<{ date: string; description: string }>;
  clinicalNotes?: string;
  isConfirmed: boolean;
}

export interface VoiceAssistantState {
  isSpeaking: boolean;
  isListening: boolean;
  transcript: string;
  statusMessage: string;
  autoSpeakQuestions: boolean;
  feedbackAudioWave: boolean;
  activeLanguage: LanguageCode;
}
