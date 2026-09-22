import React from 'react';
import { AlertTriangle, CheckCircle2, ArrowLeft, Send, Clock, Calendar, Check } from 'lucide-react';
import { LanguageCode, ClinicalQuestion, ScannedDocument } from '../types';

interface SummaryStepProps {
  language: LanguageCode;
  complaintLabel: string;
  questions: ClinicalQuestion[];
  answers: Record<number, string | string[]>;
  redFlagDetected: boolean;
  isAbdmLinked: boolean;
  scannedDocs: ScannedDocument[];
  onBack: () => void;
  onSubmit: () => void;
}

export const SummaryStep: React.FC<SummaryStepProps> = ({
  language,
  complaintLabel,
  questions,
  answers,
  redFlagDetected,
  isAbdmLinked,
  scannedDocs,
  onBack,
  onSubmit,
}) => {
  const content = {
    en: {
      kicker: 'Step 6 of 6 · Clinical Case Review',
      title: 'Review Before Sending to Doctor',
      subtitle: 'Sanjeevani AI has structured your voice and medical inputs into a clinical case summary ready for the doctor.',
      redFlagTitle: 'Flagged for Priority Clinical Review',
      redFlagDesc: 'Your responses indicate symptoms that need prompt evaluation. Your file will appear at the top of the doctor’s queue.',
      summaryHeading: 'AI-Organized Clinical Summary',
      timelineHeading: 'Longitudinal Medical Timeline',
      submitBtn: 'Send to Doctor’s Queue',
      voiceHint: 'Voice command: Say "Send to doctor" or "Submit".',
    },
    hi: {
      kicker: 'चरण 6 / 6 · केस समरी समीक्षा',
      title: 'डॉक्टर को भेजने से पहले जांचें',
      subtitle: 'संजीवनी एआई ने आपके बोलकर दिए गए जवाबों को डॉक्टर के लिए एक व्यवस्थित केस नोट में बदल दिया है।',
      redFlagTitle: 'प्राथमिकता से जांच हेतु चिह्नित',
      redFlagDesc: 'आपके लक्षणों के आधार पर यह केस डॉक्टर की कतार में सबसे ऊपर प्राथमिकता से दिखाया जाएगा।',
      summaryHeading: 'एआई द्वारा व्यवस्थित केस समरी',
      timelineHeading: 'मेडिकल टाइमलाइन',
      submitBtn: 'डॉक्टर को भेजें',
      voiceHint: 'वॉइस कमांड: "डॉक्टर को भेजें" या "सबमिट करें" बोलें।',
    },
    kn: {
      kicker: 'ಹಂತ 6 / 6 · ಕೇಸ್ ಸಾರಾಂಶ ಪರಿಶೀಲನೆ',
      title: 'ವೈದ್ಯರಿಗೆ ಕಳುಹಿಸುವ ಮುನ್ನ ಪರಿಶೀಲಿಸಿ',
      subtitle: 'ಸಂಜೀವನಿ ಎಐ ನಿಮ್ಮ ಧ್ವನಿ ವಿವರಗಳನ್ನು ವೈದ್ಯರಿಗೆ ಅಗತ್ಯವಿರುವ ಕ್ಲಿನಿಕಲ್ ಟಿಪ್ಪಣಿಯಾಗಿ ಸಿದ್ಧಪಡಿಸಿದೆ.',
      redFlagTitle: 'ಮುಂಚಿತ ವೈದ್ಯಕೀಯ ಗಮನಕ್ಕಾಗಿ ಗುರುತಿಸಲಾಗಿದೆ',
      redFlagDesc: 'ನಿಮ್ಮ ಲಕ್ಷಣಗಳ ಆಧಾರದ ಮೇಲೆ ನಿಮ್ಮ ಕೇಸ್ ವೈದ್ಯರ ಸಾಲಿನಲ್ಲಿ ಆದ್ಯತೆಯೊಂದಿಗೆ ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತದೆ.',
      summaryHeading: 'ಎಐ ಸಿದ್ಧಪಡಿಸಿದ ಸಾರಾಂಶ',
      timelineHeading: 'ವೈದ್ಯಕೀಯ ಇತಿಹಾಸ',
      submitBtn: 'ವೈದ್ಯರಿಗೆ ಕಳುಹಿಸಿ',
      voiceHint: 'ಧ್ವನಿ ಆದೇಶ: "ವೈದ್ಯರಿಗೆ ಕಳುಹಿಸಿ" ಅಥವಾ "ಸಲ್ಲಿಸಿ" ಎಂದು ಹೇಳಿ.',
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

      {/* Red flag priority banner */}
      {redFlagDetected && (
        <div className="p-4 rounded-2xl bg-[#FCEBE7] border border-[#ECC0B6] flex items-start gap-3.5 text-xs text-[#7A2E22] shadow-xs">
          <AlertTriangle className="w-5 h-5 text-[#B54A3B] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block text-sm">{content.redFlagTitle}</span>
            <p className="mt-0.5 leading-relaxed">{content.redFlagDesc}</p>
          </div>
        </div>
      )}

      {/* Case Summary Card */}
      <div className="bg-white border border-[#D7E6E1] rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h3 className="text-xs font-bold text-[#4C7C72] uppercase tracking-wider">
            {content.summaryHeading}
          </h3>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#EEF3EF] text-[#1B4E7A]">
            Language: {language === 'en' ? 'English' : language === 'hi' ? 'हिन्दी' : 'ಕನ್ನಡ'}
          </span>
        </div>

        <div className="space-y-2.5 text-sm">
          <div className="flex items-center justify-between gap-4 py-1 border-b border-gray-50">
            <span className="text-gray-500 font-medium">Chief Complaint</span>
            <span className="font-bold text-[#0F2F4A] text-right">{complaintLabel}</span>
          </div>

          {questions.map((q, idx) => {
            const rawAns = answers[idx];
            const displayAns = Array.isArray(rawAns)
              ? rawAns.join(', ')
              : rawAns || '—';
            return (
              <div
                key={q.id}
                className="flex items-start justify-between gap-4 py-1.5 border-b border-gray-50"
              >
                <span className="text-gray-600 text-xs sm:text-sm font-medium flex-1">
                  {q.translations[language]}
                </span>
                <span className="font-bold text-xs sm:text-sm text-[#0F2F4A] text-right max-w-[50%]">
                  {displayAns}
                </span>
              </div>
            );
          })}

          <div className="flex items-center justify-between gap-4 pt-1">
            <span className="text-gray-500 font-medium">ABDM Digital Health Record</span>
            <span className="font-bold text-xs px-2.5 py-0.5 rounded-md bg-[#DDEFE2] text-[#1C6B3A]">
              {isAbdmLinked ? 'Linked (ABHA Verified)' : 'Not Linked'}
            </span>
          </div>
        </div>
      </div>

      {/* Medical Timeline */}
      <div className="bg-white border border-[#D7E6E1] rounded-2xl p-5 shadow-xs">
        <h3 className="text-xs font-bold text-[#4C7C72] uppercase tracking-wider mb-4">
          {content.timelineHeading}
        </h3>

        <div className="relative pl-5 border-l-2 border-[#D7E6E1] space-y-4">
          {scannedDocs.map((doc) => (
            <div key={doc.id} className="relative">
              <span className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-[#1B4E7A] ring-4 ring-white" />
              <div className="text-[11px] font-bold text-[#4C7C72]">{doc.date}</div>
              <div className="font-bold text-sm text-[#0F2F4A]">{doc.name}</div>
              <p className="text-xs text-gray-600 mt-0.5">{doc.tag}</p>
            </div>
          ))}

          <div className="relative">
            <span className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-[#2E9E6B] ring-4 ring-white" />
            <div className="text-[11px] font-bold text-[#2E9E6B]">Today</div>
            <div className="font-bold text-sm text-[#0F2F4A]">
              Voice Case Intake: {complaintLabel}
            </div>
            <p className="text-xs text-gray-600 mt-0.5">
              Structured summary generated and queued for clinical consultation.
            </p>
          </div>
        </div>
      </div>

      {/* Voice command hint */}
      <div className="flex items-center gap-2 text-xs text-[#4C7C72] bg-white p-3 rounded-xl border border-[#D7E6E1]">
        <CheckCircle2 className="w-4 h-4 text-[#2E9E6B] shrink-0" />
        <span>{content.voiceHint}</span>
      </div>

      {/* Navigation footer */}
      <div className="pt-2 flex items-center justify-between">
        <button
          id="btn-summary-back"
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-[#16232B] border border-[#D7E6E1] bg-white hover:bg-gray-50 active:scale-98 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Edit Answers</span>
        </button>

        <button
          id="btn-summary-submit"
          type="button"
          onClick={onSubmit}
          className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-[#1B4E7A] hover:bg-[#0F2F4A] shadow-md active:scale-98 transition-all"
        >
          <Send className="w-4 h-4" />
          <span>{content.submitBtn}</span>
        </button>
      </div>
    </div>
  );
};
