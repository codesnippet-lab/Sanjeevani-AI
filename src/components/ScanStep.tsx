import React from 'react';
import { Camera, FileText, ArrowLeft, ArrowRight, CheckCircle2, UploadCloud } from 'lucide-react';
import { LanguageCode, ScannedDocument } from '../types';

interface ScanStepProps {
  language: LanguageCode;
  scannedDocs: ScannedDocument[];
  onScanDocument: () => void;
  onNext: () => void;
  onBack: () => void;
  isScanning: boolean;
}

export const ScanStep: React.FC<ScanStepProps> = ({
  language,
  scannedDocs,
  onScanDocument,
  onNext,
  onBack,
  isScanning,
}) => {
  const content = {
    en: {
      kicker: 'Step 5 of 6 · Health Records & Prescriptions',
      title: 'Any Reports or Prescriptions?',
      subtitle: 'Scan prior medications, lab test reports, or discharge summaries so the doctor has full clinical context.',
      scanBoxTitle: 'Point your camera at the document',
      scanBoxSub: 'High-speed OCR digitizes medications and lab test findings automatically.',
      scanBtn: isScanning ? 'Extracting text with OCR...' : 'Scan a Document',
      voiceHint: 'Voice commands: Say "Scan document" or "Skip for now".',
    },
    hi: {
      kicker: 'चरण 5 / 6 · पुरानी दवाएं व रिपोर्ट',
      title: 'क्या कोई रिपोर्ट या पुरानी पर्ची है?',
      subtitle: 'पुरानी पर्ची या टेस्ट रिपोर्ट स्कैन करें ताकि डॉक्टर आपका पूरा इलाज समझ सकें।',
      scanBoxTitle: 'अपने कैमरे को रिपोर्ट के सामने रखें',
      scanBoxSub: 'स्मार्ट ओसीआर तकनीक अपने आप दवाओं और जांच के परिणामों को पढ़ लेती है।',
      scanBtn: isScanning ? 'ओसीआर से रिपोर्ट पढ़ी जा रही है...' : 'दस्तावेज स्कैन करें',
      voiceHint: 'वॉइस कमांड: "दस्तावेज स्कैन करें" या "आगे बढ़ें" बोलें।',
    },
    kn: {
      kicker: 'ಹಂತ 5 / 6 · ವೈದ್ಯಕೀಯ ದಾಖಲೆಗಳು',
      title: 'ಯಾವುದಾದರೂ ಹಳೆಯ ವರದಿ ಅಥವಾ ಔಷಧಿ ಚೀಟಿ ಇದೆಯೇ?',
      subtitle: 'ಹಳೆಯ ಚೀಟಿ ಅಥವಾ ರಕ್ತ ಪರೀಕ್ಷಾ ವರದಿಗಳನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ, ವೈದ್ಯರಿಗೆ ಪೂರ್ಣ ಮಾಹಿತಿ ದೊರೆಯುತ್ತದೆ.',
      scanBoxTitle: 'ದಾಖಲೆಯ ಕಡೆಗೆ ಕ್ಯಾಮೆರಾ ಹಿಡಿಯಿರಿ',
      scanBoxSub: 'ಸ್ಮಾರ್ಟ್ ಓಸಿಆರ್ ತಂತ್ರಜ್ಞಾನ ಔಷಧಿಗಳು ಮತ್ತು ಲ್ಯಾಬ್ ಫಲಿತಾಂಶಗಳನ್ನು ತಕ್ಷಣ ಗ್ರಹಿಸುತ್ತದೆ.',
      scanBtn: isScanning ? 'ಓಸಿಆರ್ ಮೂಲಕ ಓದಲಾಗುತ್ತಿದೆ...' : 'ದಾಖಲೆ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ',
      voiceHint: 'ಧ್ವನಿ ಆದೇಶ: "ದಾಖಲೆ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ" ಅಥವಾ "ಸದ್ಯಕ್ಕೆ ಬಿಡಿ" ಎಂದು ಹೇಳಿ.',
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

      {/* Upload/Scan Box */}
      <div className="border-2 border-dashed border-[#4C7C72]/50 bg-white rounded-2xl p-6 text-center">
        <div className="w-14 h-14 mx-auto rounded-full bg-[#EEF3EF] text-[#1B4E7A] flex items-center justify-center mb-3">
          <Camera className="w-7 h-7" />
        </div>
        <h3 className="font-bold text-base text-[#0F2F4A]">{content.scanBoxTitle}</h3>
        <p className="text-xs text-gray-500 max-w-md mx-auto mt-1 mb-4">
          {content.scanBoxSub}
        </p>

        <button
          id="btn-scan-document"
          type="button"
          onClick={onScanDocument}
          disabled={isScanning}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-[#0F2F4A] bg-[#2E9E6B] hover:bg-[#258257] hover:text-white shadow-sm transition-all active:scale-95 disabled:opacity-60"
        >
          <UploadCloud className="w-4 h-4" />
          <span>{content.scanBtn}</span>
        </button>
      </div>

      {/* Voice prompt hint */}
      <div className="flex items-center gap-2 text-xs text-[#4C7C72] bg-white p-3 rounded-xl border border-[#D7E6E1]">
        <CheckCircle2 className="w-4 h-4 text-[#2E9E6B] shrink-0" />
        <span>{content.voiceHint}</span>
      </div>

      {/* List of scanned documents */}
      {scannedDocs.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-[#4C7C72] uppercase tracking-wider">
            Added to Medical Timeline ({scannedDocs.length})
          </h4>
          {scannedDocs.map((doc) => (
            <div
              key={doc.id}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-[#D7E6E1] text-left shadow-2xs"
            >
              <span className="text-2xl shrink-0">{doc.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm text-[#0F2F4A] truncate">{doc.name}</div>
                <div className="text-xs text-[#4C7C72] font-semibold mt-0.5">
                  {doc.date} · {doc.tag}
                </div>
                <p className="text-xs text-gray-600 mt-1">{doc.summary}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Navigation footer */}
      <div className="pt-2 flex items-center justify-between">
        <button
          id="btn-scan-back"
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-[#16232B] border border-[#D7E6E1] bg-white hover:bg-gray-50 active:scale-98 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          id="btn-scan-continue"
          type="button"
          onClick={onNext}
          className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-[#2E9E6B] hover:bg-[#258257] shadow-sm active:scale-98 transition-all"
        >
          <span>{scannedDocs.length > 0 ? 'Review Case Summary' : 'Skip for Now'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
