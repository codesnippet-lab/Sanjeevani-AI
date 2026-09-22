import React from 'react';
import { ArrowLeft, ArrowRight, Mic, Sparkles } from 'lucide-react';
import { LanguageCode } from '../types';
import { COMPLAINTS } from '../data/clinicalTrees';

interface ComplaintStepProps {
  language: LanguageCode;
  selectedComplaintId: string | null;
  onSelectComplaint: (id: string) => void;
  onStartSpeech: () => void;
  isListening: boolean;
  onNext: () => void;
  onBack: () => void;
}

export const ComplaintStep: React.FC<ComplaintStepProps> = ({
  language,
  selectedComplaintId,
  onSelectComplaint,
  onStartSpeech,
  isListening,
  onNext,
  onBack,
}) => {
  const content = {
    en: {
      kicker: 'Step 3 of 6 · Chief Complaint',
      title: "What's Bothering You Today?",
      subtitle: 'Speak aloud or tap the symptom that best describes your health concern.',
      speakPrompt: 'Tap to speak your symptoms',
      speakHint: 'e.g., "I have chest pain since morning" or "I have a high fever"',
    },
    hi: {
      kicker: 'चरण 3 / 6 · मुख्य समस्या',
      title: 'आज आपको क्या तकलीफ या परेशानी है?',
      subtitle: 'माइक दबाकर बोलें या नीचे दिए गए लक्षणों में से चुनें।',
      speakPrompt: 'अपनी समस्या बोलकर बताएं',
      speakHint: 'जैसे: "मुझे सुबह से सीने में दर्द है" या "तेज़ बुखार है"',
    },
    kn: {
      kicker: 'ಹಂತ 3 / 6 · ಮುಖ್ಯ ತೊಂದರೆ',
      title: 'ಇಂದು ನಿಮಗೆ ಏನು ತೊಂದರೆ ಇದೆ?',
      subtitle: 'ಮೈಕ್ ಒತ್ತಿ ಮಾತನಾಡಿ ಅಥವಾ ಕೆಳಗಿನ ಆಯ್ಕೆಗಳಲ್ಲಿ ಸೂಕ್ತವಾದುದನ್ನು ಆರಿಸಿ.',
      speakPrompt: 'ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ಮಾತನಾಡಿ ತಿಳಿಸಿ',
      speakHint: 'ಉದಾ: "ಬೆಳಗ್ಗೆಯಿಂದ ಎದೆ ನೋವು ಇದೆ" ಅಥವಾ "ತೀವ್ರ ಜ್ವರ ಇದೆ"',
    },
  }[language];

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-bold text-[#4C7C72] uppercase tracking-wider mb-1">
          {content.kicker}
        </div>
        <h2 className="text-2xl font-extrabold text-[#0F2F4A]">{content.title}</h2>
        <p className="text-sm text-gray-600 mt-1">{content.subtitle}</p>
      </div>

      {/* Primary Voice Box on Screen */}
      <div className="bg-[#EEF3EF] border-2 border-[#D7E6E1] rounded-2xl p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <button
            id="complaint-voice-mic-btn"
            type="button"
            onClick={onStartSpeech}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
              isListening
                ? 'bg-rose-600 text-white ring-4 ring-rose-200 animate-pulse'
                : 'bg-[#1B4E7A] hover:bg-[#0F2F4A] text-white shadow-md hover:scale-105 active:scale-95'
            }`}
            title="Tap and speak your symptom"
          >
            <Mic className="w-7 h-7" />
          </button>
          <div>
            <h4 className="font-bold text-[#0F2F4A] text-base">{content.speakPrompt}</h4>
            <p className="text-xs text-[#4C7C72]">{content.speakHint}</p>
          </div>
        </div>

        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white text-[#1B4E7A] border border-[#D7E6E1]">
          <Sparkles className="w-3.5 h-3.5 text-[#2E9E6B]" />
          <span>Voice AI Ready</span>
        </span>
      </div>

      {/* Complaint Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {COMPLAINTS.map((item) => {
          const isSelected = selectedComplaintId === item.id;
          return (
            <button
              key={item.id}
              id={`complaint-btn-${item.id}`}
              type="button"
              onClick={() => onSelectComplaint(item.id)}
              className={`p-4 rounded-2xl border-2 text-left transition-all flex items-center gap-3.5 ${
                isSelected
                  ? 'border-[#1B4E7A] bg-[#EEF3EF] shadow-md ring-2 ring-[#1B4E7A]/20'
                  : 'border-[#D7E6E1] bg-white hover:border-[#4C7C72] hover:bg-gray-50'
              }`}
            >
              <span className="text-3xl shrink-0">{item.icon}</span>
              <div className="flex-1">
                <div className="font-bold text-sm text-[#0F2F4A]">
                  {item.translations[language]}
                </div>
                <div className="text-xs text-gray-500 font-medium">
                  {item.label}
                </div>
              </div>
              {isSelected && (
                <span className="w-5 h-5 rounded-full bg-[#1B4E7A] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="pt-2 flex items-center justify-between">
        <button
          id="btn-complaint-back"
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-[#16232B] border border-[#D7E6E1] bg-white hover:bg-gray-50 active:scale-98 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          id="btn-complaint-continue"
          type="button"
          onClick={onNext}
          disabled={!selectedComplaintId}
          className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-[#2E9E6B] hover:bg-[#258257] disabled:opacity-40 disabled:pointer-events-none shadow-sm active:scale-98 transition-all"
        >
          <span>Continue to Questions</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
