import { LanguageCode } from '../types';

export const LANG_BCP47: Record<LanguageCode, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
  kn: 'kn-IN',
};

// Global recognition reference to control stop/cancel
let currentRecognition: any = null;

export function stopAllSpeech(): void {
  if (typeof window !== 'undefined') {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (currentRecognition) {
      try {
        currentRecognition.abort();
      } catch (e) {
        // ignore abort errors
      }
      currentRecognition = null;
    }
  }
}

export function speakText(
  text: string,
  lang: LanguageCode,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (err: any) => void
): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    onError?.('Speech synthesis not supported in this browser');
    return false;
  }

  try {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const targetLang = LANG_BCP47[lang] || 'en-IN';
    utterance.lang = targetLang;
    utterance.rate = 0.95; // Slightly measured pace for healthcare clarity
    utterance.pitch = 1.0;

    // Pick best matching voice
    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      const directMatch = voices.find((v) => v.lang === targetLang);
      const prefixMatch = voices.find((v) => v.lang.startsWith(lang));
      if (directMatch) {
        utterance.voice = directMatch;
      } else if (prefixMatch) {
        utterance.voice = prefixMatch;
      }
    }

    utterance.onstart = () => {
      onStart?.();
    };

    utterance.onend = () => {
      onEnd?.();
    };

    utterance.onerror = (e) => {
      // Don't flag error if interrupted by user action
      if (e.error !== 'interrupted' && e.error !== 'canceled') {
        onError?.(e.error);
      }
      onEnd?.();
    };

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    onError?.(err);
    return false;
  }
}

export function startSpeechRecognition(
  lang: LanguageCode,
  onResult: (transcript: string) => void,
  onError: (errorType: string) => void,
  onEnd?: () => void
): () => void {
  if (typeof window === 'undefined') {
    onError('Browser environment unavailable');
    return () => {};
  }

  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    onError('unsupported');
    return () => {};
  }

  try {
    if (currentRecognition) {
      try {
        currentRecognition.abort();
      } catch (e) {}
    }

    const recognition = new SpeechRecognition();
    currentRecognition = recognition;
    recognition.lang = LANG_BCP47[lang] || 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    recognition.onresult = (event: any) => {
      if (event.results && event.results[0] && event.results[0][0]) {
        const transcript = event.results[0][0].transcript.trim();
        onResult(transcript);
      }
    };

    recognition.onerror = (event: any) => {
      const err = event.error || 'error';
      onError(err);
    };

    recognition.onend = () => {
      currentRecognition = null;
      onEnd?.();
    };

    recognition.start();

    return () => {
      try {
        recognition.abort();
      } catch (e) {}
      currentRecognition = null;
    };
  } catch (err) {
    onError('start_failed');
    return () => {};
  }
}

/**
 * Intelligent keyword matcher to find closest question option from speech transcript
 */
export function matchSpokenOption(
  transcript: string,
  options: Array<{ id: string; label: string; keywords?: Record<LanguageCode, string[]> }>,
  lang: LanguageCode
): { id: string; label: string } | null {
  const cleanTranscript = transcript.toLowerCase().trim();

  // 1. Direct label check
  for (const opt of options) {
    if (cleanTranscript.includes(opt.label.toLowerCase())) {
      return opt;
    }
  }

  // 2. Keyword check
  for (const opt of options) {
    const kws = opt.keywords?.[lang] || [];
    const enKws = opt.keywords?.['en'] || [];
    const allKeywords = [...kws, ...enKws];

    for (const kw of allKeywords) {
      if (cleanTranscript.includes(kw.toLowerCase())) {
        return opt;
      }
    }
  }

  // 3. Numbered option shortcut (e.g., "option 1", "one", "first", "पहला", "ಒಂದನೇ")
  const numbersMap: Record<string, number> = {
    '1': 0, 'one': 0, 'first': 0, 'पहला': 0, 'एक': 0, 'ಒಂದು': 0, 'ಮೊದಲನೇ': 0,
    '2': 1, 'two': 1, 'second': 1, 'दूसरा': 1, 'दो': 1, 'ಎರಡು': 1, 'ಎರಡನೇ': 1,
    '3': 2, 'three': 2, 'third': 2, 'तीसरा': 2, 'तीन': 2, 'ಮೂರು': 2, 'ಮೂರನೇ': 2,
    '4': 3, 'four': 3, 'fourth': 3, 'चौथा': 3, 'चार': 3, 'ನಾಲ್ಕು': 3, 'ನಾಲ್ಕನೇ': 3,
  };

  for (const [key, idx] of Object.entries(numbersMap)) {
    if (cleanTranscript.includes(key) && options[idx]) {
      return options[idx];
    }
  }

  return null;
}
