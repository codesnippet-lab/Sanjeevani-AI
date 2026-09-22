import React from 'react';
import { Mic, MicOff, Volume2, Square, RotateCcw, Sparkles } from 'lucide-react';
import { LanguageCode } from '../types';
import { UI_STRINGS } from '../data/translations';

interface VoiceAssistantBannerProps {
  language: LanguageCode;
  isSpeaking: boolean;
  isListening: boolean;
  transcript: string;
  matchedAction?: string;
  onRepeat: () => void;
  onStop: () => void;
  onSpeakAgain: () => void;
  autoSpeak: boolean;
  onToggleAutoSpeak: () => void;
  quickSimulationPhrases?: string[];
  onSimulatePhrase?: (phrase: string) => void;
}

export const VoiceAssistantBanner: React.FC<VoiceAssistantBannerProps> = ({
  language,
  isSpeaking,
  isListening,
  transcript,
  matchedAction,
  onRepeat,
  onStop,
  onSpeakAgain,
  autoSpeak,
  onToggleAutoSpeak,
  quickSimulationPhrases = [],
  onSimulatePhrase,
}) => {
  const t = (key: string) => UI_STRINGS[key]?.[language] || UI_STRINGS[key]?.en || '';

  return (
    <div
      id="voice-assistant-panel"
      className="bg-white border-2 border-[#D7E6E1] rounded-2xl p-4 shadow-sm transition-all duration-200"
    >
      {/* Top row: Status, visual pulse, and quick controls */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          {/* Main Primary Mic / Speaker Action Button */}
          <button
            id="voice-assistant-main-mic-btn"
            type="button"
            onClick={isListening ? onStop : onSpeakAgain}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 relative ${
              isListening
                ? 'bg-rose-600 text-white shadow-lg ring-4 ring-rose-200 animate-pulse'
                : isSpeaking
                ? 'bg-[#1B4E7A] text-white shadow-md ring-4 ring-sky-100'
                : 'bg-[#2E9E6B] hover:bg-[#258257] text-white shadow-sm hover:scale-105 active:scale-95'
            }`}
            title={isListening ? 'Tap to stop listening' : 'Tap to speak your answer'}
          >
            {isListening ? (
              <Mic className="w-6 h-6 animate-bounce" />
            ) : isSpeaking ? (
              <Volume2 className="w-6 h-6 animate-pulse" />
            ) : (
              <Mic className="w-6 h-6" />
            )}
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#4C7C72]">
                {t('assistantTitle')}
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#EEF3EF] text-[#1B4E7A]">
                {language === 'en' ? 'English' : language === 'hi' ? 'हिन्दी (Hindi)' : 'ಕನ್ನಡ (Kannada)'}
              </span>
            </div>

            <p className="text-sm font-semibold text-[#0F2F4A]">
              {isListening
                ? t('listeningStatus')
                : isSpeaking
                ? t('speakingStatus')
                : t('readyStatus')}
            </p>
          </div>
        </div>

        {/* Action Buttons: Repeat, Stop, Speak Again */}
        <div className="flex items-center gap-2">
          {/* Repeat Question Button */}
          <button
            id="voice-assistant-repeat-btn"
            type="button"
            onClick={onRepeat}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-[#1B4E7A] bg-[#EEF3EF] hover:bg-[#D7E6E1] transition-colors active:scale-95"
            title="Listen to the question again"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t('repeatBtn')}</span>
          </button>

          {/* Stop Button */}
          <button
            id="voice-assistant-stop-btn"
            type="button"
            onClick={onStop}
            disabled={!isSpeaking && !isListening}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 disabled:opacity-40 disabled:pointer-events-none transition-colors active:scale-95"
            title="Stop voice playback or recording"
          >
            <Square className="w-3.5 h-3.5 fill-current" />
            <span>{t('stopBtn')}</span>
          </button>

          {/* Speak Again Button */}
          <button
            id="voice-assistant-speak-again-btn"
            type="button"
            onClick={onSpeakAgain}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white bg-[#1B4E7A] hover:bg-[#0F2F4A] transition-colors active:scale-95 shadow-xs"
            title="Record speech again"
          >
            <Mic className="w-3.5 h-3.5" />
            <span>{t('speakAgainBtn')}</span>
          </button>
        </div>
      </div>

      {/* Live Transcript Display Box */}
      {(transcript || isListening) && (
        <div className="mt-3 p-3 rounded-xl bg-[#F8FAF8] border border-[#D7E6E1]/80 text-sm">
          <div className="flex items-center justify-between text-xs text-[#4C7C72] font-semibold mb-1">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#2E9E6B]" />
              {isListening ? t('listeningStatus') : t('voiceHeard')}
            </span>
            {matchedAction && (
              <span className="text-[#1C6B3A] font-bold bg-[#DDEFE2] px-2 py-0.5 rounded-md">
                {t('voiceMatched')}: {matchedAction}
              </span>
            )}
          </div>

          <p className="text-sm font-medium text-[#16232B] italic">
            {transcript ? `"${transcript}"` : 'Listening for your voice...'}
          </p>
        </div>
      )}

      {/* Footer hint & quick sample phrases for convenient one-tap patient or testing voice entry */}
      <div className="mt-3 pt-2.5 border-t border-[#D7E6E1]/60 flex items-center justify-between gap-3 text-xs text-[#4C7C72] flex-wrap">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={autoSpeak}
            onChange={onToggleAutoSpeak}
            className="w-4 h-4 rounded text-[#1B4E7A] accent-[#1B4E7A] cursor-pointer"
          />
          <span className="font-medium text-[#0F2F4A]">{t('autoVoiceToggle')}</span>
        </label>

        {quickSimulationPhrases.length > 0 && onSimulatePhrase && (
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-gray-500">Quick voice test:</span>
            {quickSimulationPhrases.map((phrase, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSimulatePhrase(phrase)}
                className="px-2 py-1 rounded-lg text-[11px] font-semibold bg-white border border-[#D7E6E1] text-[#1B4E7A] hover:bg-[#EEF3EF] transition-colors"
              >
                🎙️ "{phrase}"
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
