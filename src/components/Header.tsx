import React from 'react';
import { Stethoscope, User, Globe, Activity, Download } from 'lucide-react';
import { LanguageCode } from '../types';
import { SUPPORTED_LANGUAGES } from '../data/translations';

interface HeaderProps {
  currentMode: 'patient' | 'doctor';
  onModeChange: (mode: 'patient' | 'doctor') => void;
  currentLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  redFlagCount: number;
  waitingCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  onModeChange,
  currentLanguage,
  onLanguageChange,
  redFlagCount,
  waitingCount,
}) => {
  return (
    <header className="bg-white border-b border-[#D7E6E1] sticky top-0 z-40 shadow-xs">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1B4E7A] text-white flex items-center justify-center shadow-sm">
            <Activity className="w-6 h-6 text-[#2E9E6B]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-extrabold text-[#0F2F4A] tracking-tight">
                Sanjeevani <span className="text-[#2E9E6B]">AI</span>
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DDEFE2] text-[#1C6B3A]">
                Voice Case Taking
              </span>
            </div>
            <p className="text-xs text-[#4C7C72] font-medium">
              Multilingual Patient Triage · SIH 2026
            </p>
          </div>
        </div>

        {/* Right controls: Language Picker + Mode Switch */}
        <div className="flex items-center gap-3">
          {/* Quick language switch */}
          <div className="flex items-center bg-[#F3F8F7] border border-[#D7E6E1] rounded-xl p-1">
            <Globe className="w-3.5 h-3.5 text-[#4C7C72] ml-1.5 mr-1" />
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                id={`lang-select-${lang.code}`}
                type="button"
                onClick={() => onLanguageChange(lang.code)}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  currentLanguage === lang.code
                    ? 'bg-[#1B4E7A] text-white shadow-xs'
                    : 'text-[#4C7C72] hover:text-[#0F2F4A]'
                }`}
                title={lang.sub}
              >
                {lang.native}
              </button>
            ))}
          </div>

          {/* Mode Switch: Patient App vs Doctor Dashboard */}
          <div className="flex bg-[#F3F8F7] border border-[#D7E6E1] rounded-xl p-1">
            <button
              id="mode-patient-btn"
              type="button"
              onClick={() => onModeChange('patient')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                currentMode === 'patient'
                  ? 'bg-[#1B4E7A] text-white shadow-xs'
                  : 'text-[#4C7C72] hover:text-[#0F2F4A]'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Patient Intake</span>
            </button>
            <button
              id="mode-doctor-btn"
              type="button"
              onClick={() => onModeChange('doctor')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all relative ${
                currentMode === 'doctor'
                  ? 'bg-[#1B4E7A] text-white shadow-xs'
                  : 'text-[#4C7C72] hover:text-[#0F2F4A]'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Doctor Queue</span>
              {redFlagCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              )}
            </button>
          </div>

          {/* Download Standalone HTML File */}
          <a
            id="download-html-btn"
            href="/sanjeevani-ai.html"
            download="sanjeevani-ai-voice-assistant.html"
            title="Download Standalone HTML File"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl border border-teal-300 bg-teal-50 text-teal-800 hover:bg-teal-100 transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download HTML</span>
          </a>
        </div>
      </div>
    </header>
  );
};
