import React from 'react';
import { ShieldCheck, Database, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { LanguageCode } from '../types';

interface ConsentStepProps {
  language: LanguageCode;
  consent: {
    shareWithDoctor: boolean;
    abdmLinked: boolean;
  };
  onToggleConsent: (field: 'shareWithDoctor' | 'abdmLinked') => void;
  onNext: () => void;
  onBack: () => void;
}

export const ConsentStep: React.FC<ConsentStepProps> = ({
  language,
  consent,
  onToggleConsent,
  onNext,
  onBack,
}) => {
  const content = {
    en: {
      kicker: 'Step 2 of 6 · Patient Consent',
      title: 'Before We Begin',
      subtitle: 'Your medical data remains private and is only used to prepare your clinical summary for your doctor.',
      shareTitle: 'Share my case history with today’s doctor',
      shareDesc: 'Your doctor reviews this structured note before you enter the consultation room, saving consultation time.',
      abdmTitle: 'Link with ABDM Ayushman Bharat Digital Mission',
      abdmDesc: 'Optional. Enables seamless synchronization with your ABHA ID so your longitudinal health history follows you.',
      sayHint: 'You can say: "I agree" or "Yes to both" instead of tapping.',
    },
    hi: {
      kicker: 'चरण 2 / 6 · मरीज की सहमति',
      title: 'शुरू करने से पहले सहमति',
      subtitle: 'आपकी जानकारी सुरक्षित है और केवल आपके डॉक्टर के परामर्श को बेहतर बनाने के लिए उपयोग की जाएगी।',
      shareTitle: 'आज के डॉक्टर के साथ केस हिस्ट्री साझा करें',
      shareDesc: 'डॉक्टर आपके कमरे में आने से पहले ही आपकी समस्या समझ सकेंगे, जिससे जांच जल्दी और सटीक होगी।',
      abdmTitle: 'आयुष्मान भारत (ABDM) डिजिटल हेल्थ रिकॉर्ड से जोड़ें',
      abdmDesc: 'वैकल्पिक। आपकी ABHA आईडी से जोड़ता है ताकि आपकी पुरानी रिपोर्ट और पर्चियां सुरक्षित रहें।',
      sayHint: 'आप बोल सकते हैं: "हाँ" या "सहमति है" या "दोनों जोड़ें"।',
    },
    kn: {
      kicker: 'ಹಂತ 2 / 6 · ರೋಗಿಯ ಸಮ್ಮತಿ',
      title: 'ಪ್ರಾರಂಭಿಸುವ ಮುನ್ನ ಸಮ್ಮತಿ',
      subtitle: 'ನಿಮ್ಮ ವಿವರಗಳು ಗೌಪ್ಯವಾಗಿದ್ದು, ಇಂದಿನ ವೈದ್ಯರ ಭೇಟಿಯ ಸಿದ್ಧತೆಗೆ ಮಾತ್ರ ಬಳಕೆಯಾಗುತ್ತವೆ.',
      shareTitle: 'ಇಂದಿನ ವೈದ್ಯರೊಂದಿಗೆ ನನ್ನ ಕೇಸ್ ಹಂಚಿಕೊಳ್ಳಿ',
      shareDesc: 'ನೀವು ಕೊಠಡಿಗೆ ಪ್ರವೇಶಿಸುವ ಮುನ್ನವೇ ವೈದ್ಯರು ಸಾರಾಂಶವನ್ನು ಪರಿಶೀಲಿಸಲು ಇದು ನೆರವಾಗುತ್ತದೆ.',
      abdmTitle: 'ಆಯುಷ್ಮಾನ್ ಭಾರತ್ (ABDM) ಡಿಜಿಟಲ್ ಹೆಲ್ತ್ ದಾಖಲೆಗೆ ಜೋಡಿಸಿ',
      abdmDesc: 'ಐಚ್ಛಿಕ. ನಿಮ್ಮ ABHA ಐಡಿಯೊಂದಿಗೆ ಜೋಡಿಸಿ ಹಿಂದಿನ ವರದಿಗಳು ಸುಲಭವಾಗಿ ಲಭ್ಯವಾಗುವಂತೆ ಮಾಡುತ್ತದೆ.',
      sayHint: 'ನೀವು: "ಹೌದು" ಅಥವಾ "ಒಪ್ಪಿಗೆ" ಅಥವಾ "ಎರಡೂ ಸರಿ" ಎಂದು ಮಾತನಾಡಬಹುದು.',
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

      <div className="space-y-3">
        {/* Consent 1: Share with doctor */}
        <label
          htmlFor="consent-share"
          className={`flex items-start gap-3.5 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
            consent.shareWithDoctor
              ? 'border-[#1B4E7A] bg-[#EEF3EF] shadow-xs'
              : 'border-[#D7E6E1] bg-white hover:border-[#4C7C72]'
          }`}
        >
          <input
            id="consent-share"
            type="checkbox"
            checked={consent.shareWithDoctor}
            onChange={() => onToggleConsent('shareWithDoctor')}
            className="w-5 h-5 mt-0.5 rounded text-[#1B4E7A] accent-[#1B4E7A] cursor-pointer"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 font-bold text-[#0F2F4A]">
              <ShieldCheck className="w-4 h-4 text-[#2E9E6B]" />
              <span>{content.shareTitle}</span>
            </div>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              {content.shareDesc}
            </p>
          </div>
        </label>

        {/* Consent 2: ABDM linkage */}
        <label
          htmlFor="consent-abdm"
          className={`flex items-start gap-3.5 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
            consent.abdmLinked
              ? 'border-[#1B4E7A] bg-[#EEF3EF] shadow-xs'
              : 'border-[#D7E6E1] bg-white hover:border-[#4C7C72]'
          }`}
        >
          <input
            id="consent-abdm"
            type="checkbox"
            checked={consent.abdmLinked}
            onChange={() => onToggleConsent('abdmLinked')}
            className="w-5 h-5 mt-0.5 rounded text-[#1B4E7A] accent-[#1B4E7A] cursor-pointer"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 font-bold text-[#0F2F4A]">
              <Database className="w-4 h-4 text-[#1B4E7A]" />
              <span>{content.abdmTitle}</span>
            </div>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              {content.abdmDesc}
            </p>
          </div>
        </label>
      </div>

      <div className="flex items-center gap-2 text-xs text-[#4C7C72] bg-white p-3 rounded-xl border border-[#D7E6E1]">
        <CheckCircle2 className="w-4 h-4 text-[#2E9E6B] shrink-0" />
        <span>{content.sayHint}</span>
      </div>

      <div className="pt-2 flex items-center justify-between">
        <button
          id="btn-consent-back"
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-[#16232B] border border-[#D7E6E1] bg-white hover:bg-gray-50 active:scale-98 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          id="btn-consent-continue"
          type="button"
          onClick={onNext}
          disabled={!consent.shareWithDoctor}
          className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-[#2E9E6B] hover:bg-[#258257] disabled:opacity-40 disabled:pointer-events-none shadow-sm active:scale-98 transition-all"
        >
          <span>I Agree, Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
