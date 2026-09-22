import { LanguageOption, LanguageCode } from '../types';

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  {
    code: 'en',
    label: 'English',
    native: 'English',
    sub: 'Speak or tap in English',
    bcp47: 'en-IN',
    speechSample: 'Hello, I am Sanjeevani Voice Assistant. I will help prepare your case note for the doctor.',
  },
  {
    code: 'hi',
    label: 'Hindi',
    native: 'हिन्दी',
    sub: 'हिंदी में बोलें या चुनें',
    bcp47: 'hi-IN',
    speechSample: 'नमस्ते, मैं संजीवनी वॉइस असिस्टेंट हूँ। डॉक्टर से मिलने से पहले आपकी सहायता करूँगा।',
  },
  {
    code: 'kn',
    label: 'Kannada',
    native: 'ಕನ್ನಡ',
    sub: 'ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡಿ ಅಥವಾ ಆಯ್ಕೆಮಾಡಿ',
    bcp47: 'kn-IN',
    speechSample: 'ನಮಸ್ಕಾರ, ನಾನು ಸಂಜೀವನಿ ಧ್ವನಿ ಸಹಾಯಕ. ವೈದ್ಯರ ಭೇಟಿಗೆ ಮುನ್ನ ನಿಮ್ಮ ಕೇಸ್ ವಿವರ ಸಿದ್ಧಪಡಿಸಲು ನೆರವಾಗುತ್ತೇನೆ.',
  },
];

export const UI_STRINGS: Record<string, Record<LanguageCode, string>> = {
  assistantTitle: {
    en: 'Sanjeevani Voice Assistant',
    hi: 'संजीवनी वॉइस असिस्टेंट',
    kn: 'ಸಂಜೀವನಿ ಧ್ವನಿ ಸಹಾಯಕ',
  },
  assistantTagline: {
    en: 'Speak naturally in English, Hindi, or Kannada',
    hi: 'अंग्रेजी, हिंदी या कन्नड़ में सहजता से बोलें',
    kn: 'ಇಂಗ್ಲಿಷ್, ಹಿಂದಿ ಅಥವಾ ಕನ್ನಡದಲ್ಲಿ ಸುಲಭವಾಗಿ ಮಾತನಾಡಿ',
  },
  repeatBtn: {
    en: 'Repeat Question',
    hi: 'सवाल दोहराएं',
    kn: 'ಪ್ರಶ್ನೆ ಮತ್ತೆ ಕೇಳಿ',
  },
  stopBtn: {
    en: 'Stop',
    hi: 'रोकें',
    kn: 'ನಿಲ್ಲಿಸಿ',
  },
  speakAgainBtn: {
    en: 'Speak Again',
    hi: 'फिर से बोलें',
    kn: 'ಮತ್ತೆ ಮಾತನಾಡಿ',
  },
  listeningStatus: {
    en: 'Listening... Please speak your response now',
    hi: 'सुन रहा हूँ... कृपया अपनी बात बोलें',
    kn: 'ಆಲಿಸುತ್ತಿದೆ... ದಯವಿಟ್ಟು ಮಾತನಾಡಿ',
  },
  speakingStatus: {
    en: 'Speaking question aloud...',
    hi: 'सवाल बोलकर सुनाया जा रहा है...',
    kn: 'ಪ್ರಶ್ನೆಯನ್ನು ಧ್ವನಿಯಲ್ಲಿ ಓದಲಾಗುತ್ತಿದೆ...',
  },
  readyStatus: {
    en: 'Tap the mic or select an option below',
    hi: 'माइक दबाएं या नीचे विकल्प चुनें',
    kn: 'ಮೈಕ್ ಒತ್ತಿ ಅಥವಾ ಕೆಳಗಿನ ಆಯ್ಕೆಗಳನ್ನು ಆರಿಸಿ',
  },
  voiceHeard: {
    en: 'Heard',
    hi: 'सुना गया',
    kn: 'ಗ್ರಹಿಸಿದ್ದು',
  },
  voiceMatched: {
    en: 'Recognized selection',
    hi: 'पहचाना गया विकल्प',
    kn: 'ಗುರುತಿಸಲಾದ ಆಯ್ಕೆ',
  },
  autoVoiceToggle: {
    en: 'Auto-read aloud',
    hi: 'सवाल अपने आप बोलें',
    kn: 'ಧ್ವನಿ ಸ್ವಯಂ ಚಾಲನೆ',
  },
  nextBtn: {
    en: 'Continue',
    hi: 'आगे बढ़ें',
    kn: 'ಮುಂದುವರಿಯಿರಿ',
  },
  backBtn: {
    en: 'Back',
    hi: 'पीछे जाएं',
    kn: 'ಹಿಂದೆ',
  },
  skipBtn: {
    en: 'Skip for now',
    hi: 'अभी छोड़ें',
    kn: 'ಸದ್ಯಕ್ಕೆ ಬಿಡಿ',
  },
  stepIndicator: {
    en: 'Step',
    hi: 'चरण',
    kn: 'ಹಂತ',
  },
  of: {
    en: 'of',
    hi: 'का',
    kn: 'ರ',
  },
  sendToDoctor: {
    en: 'Send to Doctor',
    hi: 'डॉक्टर को भेजें',
    kn: 'ವೈದ್ಯರಿಗೆ ಕಳುಹಿಸಿ',
  },
};
