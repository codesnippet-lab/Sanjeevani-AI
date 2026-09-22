import React from 'react';
import { ArrowLeft, ArrowRight, AlertTriangle, Mic, Volume2, CheckCircle2 } from 'lucide-react';
import { LanguageCode, ClinicalQuestion } from '../types';

interface QuestionsStepProps {
  language: LanguageCode;
  complaintLabel: string;
  questionIndex: number;
  totalQuestions: number;
  currentQuestion: ClinicalQuestion;
  currentAnswer: string | string[] | undefined;
  onAnswer: (val: string, isMulti: boolean) => void;
  onSpeakQuestion: () => void;
  onListenAnswer: () => void;
  isListening: boolean;
  redFlagDetected: boolean;
  onNext: () => void;
  onBack: () => void;
}

export const QuestionsStep: React.FC<QuestionsStepProps> = ({
  language,
  complaintLabel,
  questionIndex,
  totalQuestions,
  currentQuestion,
  currentAnswer,
  onAnswer,
  onSpeakQuestion,
  onListenAnswer,
  isListening,
  redFlagDetected,
  onNext,
  onBack,
}) => {
  const isMulti = !!currentQuestion.multi;
  const isAnswered = isMulti
    ? Array.isArray(currentAnswer) && currentAnswer.length > 0
    : !!currentAnswer;

  const content = {
    en: {
      kicker: `Step 4 of 6 · Question ${questionIndex + 1} of ${totalQuestions}`,
      micPrompt: 'Speak answer',
      repeatPrompt: 'Listen again',
      multiHint: 'You can select more than one option or say them aloud.',
      redFlagWarning: 'Flagged for early clinical review — Your doctor will be notified promptly.',
    },
    hi: {
      kicker: `चरण 4 / 6 · सवाल ${questionIndex + 1} / ${totalQuestions}`,
      micPrompt: 'उत्तर बोलें',
      repeatPrompt: 'दोबारा सुनें',
      multiHint: 'आप एक से अधिक विकल्प चुन सकते हैं या बोल सकते हैं।',
      redFlagWarning: 'त्वरित समीक्षा हेतु चिह्नित — यह लक्षण डॉक्टर को प्राथमिकता से दिखाया जाएगा।',
    },
    kn: {
      kicker: `ಹಂತ 4 / 6 · ಪ್ರಶ್ನೆ ${questionIndex + 1} / ${totalQuestions}`,
      micPrompt: 'ಉತ್ತರ ಮಾತನಾಡಿ',
      repeatPrompt: 'ಮತ್ತೆ ಕೇಳಿ',
      multiHint: 'ನೀವು ಒಂದಕ್ಕಿಂತ ಹೆಚ್ಚು ಆಯ್ಕೆಗಳನ್ನು ಆರಿಸಬಹುದು ಅಥವಾ ಹೇಳಬಹುದು.',
      redFlagWarning: 'ಮುಂಚಿತ ಪರಿಶೀಲನೆಗೆ ಗುರುತಿಸಲಾಗಿದೆ — ವೈದ್ಯರಿಗೆ ತಕ್ಷಣ ತಿಳಿಸಲಾಗುತ್ತದೆ.',
    },
  }[language];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between text-xs font-bold text-[#4C7C72] uppercase tracking-wider mb-1">
          <span>{content.kicker}</span>
          <span className="text-[#1B4E7A] font-extrabold">{complaintLabel}</span>
        </div>

        {/* Question heading with speaker button and microphone button */}
        <div className="flex items-start justify-between gap-3 mt-1">
          <h2 className="text-2xl font-extrabold text-[#0F2F4A] leading-tight">
            {currentQuestion.translations[language]}
          </h2>

          <div className="flex items-center gap-2 shrink-0">
            {/* Listen / Repeat Voice Button */}
            <button
              type="button"
              id="question-speak-btn"
              onClick={onSpeakQuestion}
              className="w-10 h-10 rounded-xl bg-[#EEF3EF] hover:bg-[#D7E6E1] text-[#1B4E7A] flex items-center justify-center transition-all active:scale-95 shadow-2xs"
              title={content.repeatPrompt}
            >
              <Volume2 className="w-5 h-5" />
            </button>

            {/* Answer by voice microphone button right on question */}
            <button
              type="button"
              id="question-voice-mic-btn"
              onClick={onListenAnswer}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all active:scale-95 shadow-sm ${
                isListening
                  ? 'bg-rose-600 text-white ring-4 ring-rose-200 animate-pulse'
                  : 'bg-[#2E9E6B] hover:bg-[#258257] text-white'
              }`}
              title={content.micPrompt}
            >
              <Mic className="w-5 h-5" />
            </button>
          </div>
        </div>

        {isMulti && (
          <p className="text-xs text-[#4C7C72] mt-1 font-medium">{content.multiHint}</p>
        )}
      </div>

      {/* Red flag notice banner if active */}
      {redFlagDetected && (
        <div className="p-3.5 rounded-2xl bg-[#FCEBE7] border border-[#ECC0B6] flex items-start gap-3 text-xs text-[#7A2E22]">
          <AlertTriangle className="w-4 h-4 text-[#B54A3B] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block text-sm">Alert / ശ്രദ്ധ / ध्यान</span>
            <p className="mt-0.5">{content.redFlagWarning}</p>
          </div>
        </div>
      )}

      {/* Options Stack */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {currentQuestion.options.map((opt) => {
          const isSelected = isMulti
            ? Array.isArray(currentAnswer) && currentAnswer.includes(opt.label)
            : currentAnswer === opt.label;

          return (
            <button
              key={opt.id}
              id={`option-btn-${opt.id}`}
              type="button"
              onClick={() => onAnswer(opt.label, isMulti)}
              className={`p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between gap-3 ${
                isSelected
                  ? 'border-[#1B4E7A] bg-[#EEF3EF] shadow-md ring-2 ring-[#1B4E7A]/20'
                  : 'border-[#D7E6E1] bg-white hover:border-[#4C7C72] hover:bg-gray-50'
              }`}
            >
              <div>
                <div className="font-bold text-sm text-[#0F2F4A]">
                  {opt.translations[language]}
                </div>
                <div className="text-xs text-gray-500 font-medium">{opt.label}</div>
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

      {/* Navigation footer */}
      <div className="pt-2 flex items-center justify-between">
        <button
          id="btn-questions-back"
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-[#16232B] border border-[#D7E6E1] bg-white hover:bg-gray-50 active:scale-98 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          id="btn-questions-next"
          type="button"
          onClick={onNext}
          disabled={!isAnswered}
          className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-[#2E9E6B] hover:bg-[#258257] disabled:opacity-40 disabled:pointer-events-none shadow-sm active:scale-98 transition-all"
        >
          <span>{questionIndex + 1 < totalQuestions ? 'Next Question' : 'Done, Next Step'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
