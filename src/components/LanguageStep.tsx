import React from 'react';
import { Volume2, Check, ArrowRight } from 'lucide-react';
import { LanguageCode } from '../types';
import { SUPPORTED_LANGUAGES } from '../data/translations';

interface LanguageStepProps {
  selectedLanguage: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  onPreviewLanguage: (lang: LanguageCode) => void;
  onNext: () => void;
}

export const LanguageStep: React.FC<LanguageStepProps> = ({
  selectedLanguage,
  onSelectLanguage,
  onPreviewLanguage,
  onNext,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-bold text-[#4C7C72] uppercase tracking-wider mb-1">
          Step 1 of 6 · Language Selection
        </div>
        <h2 className="text-2xl font-extrabold text-[#0F2F4A]">
          Choose Your Language / भाषा चुनें / ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Sanjeevani will speak with you and listen to your responses. You can speak instead of typing on every step.
        </p>
      </div>

      {/* Language choices */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {SUPPORTED_LANGUAGES.map((lang) => {
          const isSelected = selectedLanguage === lang.code;
          return (
            <div
              key={lang.code}
              className={`relative flex flex-col justify-between p-4 rounded-2xl border-2 transition-all text-left ${
                isSelected
                  ? 'border-[#1B4E7A] bg-[#EEF3EF] shadow-md ring-2 ring-[#1B4E7A]/20'
                  : 'border-[#D7E6E1] bg-white hover:border-[#4C7C72]'
              }`}
            >
              <button
                type="button"
                id={`btn-lang-${lang.code}`}
                onClick={() => onSelectLanguage(lang.code)}
                className="w-full text-left flex-1"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-[#0F2F4A]">{lang.native}</span>
                  {isSelected && (
                    <span className="w-6 h-6 rounded-full bg-[#1B4E7A] text-white flex items-center justify-center">
                      <Check className="w-4 h-4" />
                    </span>
                  )}
                </div>
                <div className="text-sm font-semibold text-[#16232B]">{lang.label}</div>
                <div className="text-xs text-gray-500 mt-0.5">{lang.sub}</div>
              </button>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPreviewLanguage(lang.code);
                  }}
                  className="flex items-center gap-1.5 text-xs font-bold text-[#1B4E7A] hover:underline"
                  title="Hear sample voice"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Hear sample</span>
                </button>

                <span className="text-[11px] font-medium text-[#4C7C72]">
                  {lang.bcp47}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-2 flex justify-end">
        <button
          id="btn-lang-continue"
          type="button"
          onClick={onNext}
          className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-[#2E9E6B] hover:bg-[#258257] shadow-sm active:scale-98 transition-all"
        >
          <span>Continue to Consent</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
