import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Header } from './components/Header';
import { VoiceAssistantBanner } from './components/VoiceAssistantBanner';
import { LanguageStep } from './components/LanguageStep';
import { ConsentStep } from './components/ConsentStep';
import { ComplaintStep } from './components/ComplaintStep';
import { QuestionsStep } from './components/QuestionsStep';
import { ScanStep } from './components/ScanStep';
import { SummaryStep } from './components/SummaryStep';
import { DoctorDashboard } from './components/DoctorDashboard';

import {
  LanguageCode,
  PatientState,
  DoctorQueuePatient,
  ClinicalQuestion,
  ScannedDocument,
} from './types';
import { SUPPORTED_LANGUAGES, UI_STRINGS } from './data/translations';
import {
  COMPLAINTS,
  QUESTION_TREES,
  PAST_SAMPLE_DOCS,
  MOCK_DOCTOR_QUEUE,
} from './data/clinicalTrees';
import {
  speakText,
  startSpeechRecognition,
  stopAllSpeech,
  matchSpokenOption,
} from './services/voiceService';

export default function App() {
  // Application Mode: 'patient' or 'doctor'
  const [currentMode, setCurrentMode] = useState<'patient' | 'doctor'>('patient');

  // Patient Intake State
  const [patientState, setPatientState] = useState<PatientState>({
    step: 0,
    language: 'en',
    consent: {
      shareWithDoctor: false,
      abdmLinked: false,
    },
    complaintId: null,
    currentQuestionIndex: 0,
    answers: {},
    redFlagDetected: false,
    scannedDocs: [],
    timeline: [],
  });

  // Doctor Queue State
  const [doctorQueue, setDoctorQueue] = useState<DoctorQueuePatient[]>(MOCK_DOCTOR_QUEUE);
  const [activeDoctorPatientId, setActiveDoctorPatientId] = useState<number>(101);

  // Voice Assistant State
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [matchedAction, setMatchedAction] = useState<string | undefined>(undefined);
  const [autoSpeak, setAutoSpeak] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isScanningDoc, setIsScanningDoc] = useState<boolean>(false);

  // Doctor voice dictation state
  const [isDictatingDoctorNotes, setIsDictatingDoctorNotes] = useState<boolean>(false);
  const [dictationTranscript, setDictationTranscript] = useState<string>('');

  const toastTimerRef = useRef<any>(null);
  const cancelListeningRef = useRef<(() => void) | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  }, []);

  // Safe stop speech & listening
  const handleStopAll = useCallback(() => {
    stopAllSpeech();
    if (cancelListeningRef.current) {
      cancelListeningRef.current();
      cancelListeningRef.current = null;
    }
    setIsSpeaking(false);
    setIsListening(false);
    setIsDictatingDoctorNotes(false);
  }, []);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      handleStopAll();
    };
  }, [handleStopAll]);

  // Current clinical questions based on selected complaint
  const currentQuestions: ClinicalQuestion[] =
    QUESTION_TREES[patientState.complaintId || 'other'] || QUESTION_TREES.other;
  const currentQuestion: ClinicalQuestion | undefined =
    currentQuestions[patientState.currentQuestionIndex];

  // Helper to get text spoken by assistant for the current step
  const getCurrentStepSpokenPrompt = useCallback((): string => {
    const lang = patientState.language;
    switch (patientState.step) {
      case 0: // Language
        if (lang === 'hi') {
          return 'नमस्ते। कृपया अपनी भाषा चुनें या अंग्रेजी, हिंदी, या कन्नड़ बोलें।';
        } else if (lang === 'kn') {
          return 'ನಮಸ್ಕಾರ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ ಅಥವಾ ಇಂಗ್ಲಿಷ್, ಹಿಂದಿ, ಅಥವಾ ಕನ್ನಡ ಎಂದು ಹೇಳಿ.';
        }
        return 'Hello, welcome to Sanjeevani AI. Please choose your preferred language or say English, Hindi, or Kannada.';

      case 1: // Consent
        if (lang === 'hi') {
          return 'शुरू करने से पहले, क्या आप आज के डॉक्टर के साथ अपना केस इतिहास साझा करने की सहमति देते हैं? आप आयुष्मान भारत रिकॉर्ड भी जोड़ सकते हैं। बोलें: सहमति है।';
        } else if (lang === 'kn') {
          return 'ಪ್ರಾರಂಭಿಸುವ ಮುನ್ನ, ಇಂದಿನ ವೈದ್ಯರೊಂದಿಗೆ ವಿವರಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಲು ಒಪ್ಪಿಗೆ ನೀಡುತ್ತೀರಾ? ನೀವು ಆಯುಷ್ಮಾನ್ ದಾಖಲೆಯನ್ನೂ ಜೋಡಿಸಬಹುದು. ಹೇಳಿ: ಹೌದು ಅಥವಾ ಒಪ್ಪಿಗೆ.';
        }
        return 'Before we begin, do you agree to share your case history with your doctor today? You can say: I agree, or yes to both.';

      case 2: // Chief Complaint
        if (lang === 'hi') {
          return 'आज आपको क्या तकलीफ या परेशानी है? कृपया अपना लक्षण बोलें या नीचे दिए गए विकल्पों में से चुनें।';
        } else if (lang === 'kn') {
          return 'ಇಂದು ನಿಮಗೆ ಏನು ತೊಂದರೆ ಇದೆ? ದಯವಿಟ್ಟು ಮಾತನಾಡಿ ತಿಳಿಸಿ ಅಥವಾ ಕೆಳಗಿನ ಆಯ್ಕೆಯನ್ನು ಆರಿಸಿ.';
        }
        return "What is bothering you today? Please speak your symptoms aloud, or tap an option like fever, cough, chest pain, or stomach pain.";

      case 3: // Questions
        if (currentQuestion) {
          const qText = currentQuestion.translations[lang];
          const optsText = currentQuestion.options
            .map((o) => o.translations[lang])
            .join(', ');
          return `${qText}. Options are: ${optsText}.`;
        }
        return '';

      case 4: // Scan
        if (lang === 'hi') {
          return 'क्या आपके पास कोई पुरानी पर्ची या टेस्ट रिपोर्ट है? आप कैमरा से स्कैन कर सकते हैं या आगे बढ़ें बोल सकते हैं।';
        } else if (lang === 'kn') {
          return 'ನಿಮ್ಮ ಬಳಿ ಹಳೆಯ ಔಷಧಿ ಚೀಟಿ ಅಥವಾ ವರದಿಗಳಿವೆಯೇ? ನೀವು ಸ್ಕ್ಯಾನ್ ಮಾಡಬಹುದು ಅಥವಾ ಮುಂದೆ ಹೋಗಿ ಎಂದು ಹೇಳಬಹುದು.';
        }
        return 'Do you have any past prescriptions or lab reports? You can tap scan a document or say skip for now.';

      case 5: // Summary
        if (lang === 'hi') {
          return 'आपकी केस समरी तैयार है। कृपया जांच लें और डॉक्टर को भेजें बोलें या सबमिट करें।';
        } else if (lang === 'kn') {
          return 'ನಿಮ್ಮ ಕೇಸ್ ಸಾರಾಂಶ ಸಿದ್ಧವಾಗಿದೆ. ಪರಿಶೀಲಿಸಿ ವೈದ್ಯರಿಗೆ ಕಳುಹಿಸಿ ಎಂದು ಹೇಳಿ ಅಥವಾ ಸಲ್ಲಿಸಿ.';
        }
        return 'Your clinical case summary is ready for the doctor. Say send to doctor or click submit to queue your case.';

      default:
        return '';
    }
  }, [patientState.step, patientState.language, currentQuestion]);

  // Speak the question/prompt aloud
  const speakCurrentStepPrompt = useCallback(() => {
    handleStopAll();
    const textToSpeak = getCurrentStepSpokenPrompt();
    if (!textToSpeak) return;

    setIsSpeaking(true);
    speakText(
      textToSpeak,
      patientState.language,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false),
      (err) => {
        setIsSpeaking(false);
        console.warn('Speech synthesis warning:', err);
      }
    );
  }, [getCurrentStepSpokenPrompt, patientState.language, handleStopAll]);

  // Auto-speak on step transition if autoSpeak is enabled
  useEffect(() => {
    if (currentMode === 'patient' && autoSpeak) {
      const timer = setTimeout(() => {
        speakCurrentStepPrompt();
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [patientState.step, patientState.currentQuestionIndex, patientState.complaintId, autoSpeak, currentMode, speakCurrentStepPrompt]);

  // Process Voice Input
  const processVoiceInput = useCallback(
    (spokenText: string) => {
      const clean = spokenText.toLowerCase().trim();
      setTranscript(spokenText);
      const lang = patientState.language;

      // 1. Check for universal voice control commands: Stop, Repeat
      if (
        clean.includes('stop') ||
        clean.includes('रुकें') ||
        clean.includes('नಿಲ್ಲಿಸಿ') ||
        clean.includes('quiet') ||
        clean.includes('cancel')
      ) {
        handleStopAll();
        setMatchedAction('Action: Stop');
        showToast('⏹️ Voice stopped');
        return;
      }

      if (
        clean.includes('repeat') ||
        clean.includes('दोहराएं') ||
        clean.includes('मತ್ತೆ ಹೇಳಿ') ||
        clean.includes('again') ||
        clean.includes('listen again')
      ) {
        setMatchedAction('Action: Repeat');
        showToast('🔊 Repeating question');
        speakCurrentStepPrompt();
        return;
      }

      // 2. Step-specific voice handling
      switch (patientState.step) {
        case 0: {
          // Language selection
          let targetLang: LanguageCode | null = null;
          if (clean.includes('hindi') || clean.includes('हिंदी') || clean.includes('हिन्दी')) {
            targetLang = 'hi';
          } else if (clean.includes('kannada') || clean.includes('ಕನ್ನಡ')) {
            targetLang = 'kn';
          } else if (clean.includes('english') || clean.includes('अंग्रेजी') || clean.includes('ಇಂಗ್ಲಿಷ್')) {
            targetLang = 'en';
          }

          if (targetLang) {
            setPatientState((prev) => ({ ...prev, language: targetLang! }));
            setMatchedAction(`Selected: ${targetLang.toUpperCase()}`);
            showToast(`🎙️ Language switched to ${targetLang.toUpperCase()}`);
          } else {
            showToast(`🎙️ Heard: "${spokenText}"`);
          }
          break;
        }

        case 1: {
          // Consent
          const isAgree =
            clean.includes('agree') ||
            clean.includes('yes') ||
            clean.includes('yeah') ||
            clean.includes('share') ||
            clean.includes('हाँ') ||
            clean.includes('सहमति') ||
            clean.includes('हौदु') ||
            clean.includes('ಹೌದು') ||
            clean.includes('ಒಪ್ಪಿಗೆ');

          const wantsAbdm =
            clean.includes('abdm') ||
            clean.includes('ayushman') ||
            clean.includes('both') ||
            clean.includes('दोनों') ||
            clean.includes('ಎರಡೂ') ||
            clean.includes('record');

          if (isAgree) {
            setPatientState((prev) => ({
              ...prev,
              consent: {
                shareWithDoctor: true,
                abdmLinked: wantsAbdm || prev.consent.abdmLinked,
              },
            }));
            setMatchedAction(wantsAbdm ? 'Agreed + Linked ABDM' : 'Agreed to share');
            showToast('✅ Consent confirmed via voice');
          } else {
            showToast(`🎙️ Heard: "${spokenText}"`);
          }
          break;
        }

        case 2: {
          // Chief Complaint
          let matchedId: string | null = null;
          for (const item of COMPLAINTS) {
            const allKws = [
              ...(item.keywords[lang] || []),
              ...(item.keywords.en || []),
              item.label.toLowerCase(),
            ];
            for (const kw of allKws) {
              if (clean.includes(kw.toLowerCase())) {
                matchedId = item.id;
                break;
              }
            }
            if (matchedId) break;
          }

          if (matchedId) {
            setPatientState((prev) => ({ ...prev, complaintId: matchedId }));
            const comp = COMPLAINTS.find((c) => c.id === matchedId);
            setMatchedAction(`Symptom: ${comp?.label}`);
            showToast(`🎙️ Selected symptom: ${comp?.label}`);
          } else {
            showToast(`🎙️ Heard: "${spokenText}" — tap to confirm`);
          }
          break;
        }

        case 3: {
          // Clinical Question
          if (!currentQuestion) break;

          const matched = matchSpokenOption(clean, currentQuestion.options, lang);
          if (matched) {
            const isMulti = !!currentQuestion.multi;
            const currentAns = patientState.answers[patientState.currentQuestionIndex];

            let newAns: string | string[];
            if (isMulti) {
              const prevList = Array.isArray(currentAns) ? currentAns : [];
              if (matched.label === 'None of these') {
                newAns = ['None of these'];
              } else {
                const filtered = prevList.filter((x) => x !== 'None of these');
                if (filtered.includes(matched.label)) {
                  newAns = filtered.filter((x) => x !== matched.label);
                } else {
                  newAns = [...filtered, matched.label];
                }
              }
            } else {
              newAns = matched.label;
            }

            // Check if triggers red flag
            const isRed =
              matched.label === currentQuestion.flagOn ||
              currentQuestion.options.find((o) => o.label === matched.label)?.isRedFlag;

            setPatientState((prev) => ({
              ...prev,
              answers: { ...prev.answers, [prev.currentQuestionIndex]: newAns },
              redFlagDetected: prev.redFlagDetected || !!isRed,
            }));

            setMatchedAction(`Answer: ${matched.label}`);
            showToast(`🎙️ Answer recorded: "${matched.label}"`);
          } else {
            showToast(`🎙️ Heard: "${spokenText}"`);
          }
          break;
        }

        case 4: {
          // Scan Document
          if (
            clean.includes('scan') ||
            clean.includes('photo') ||
            clean.includes('camera') ||
            clean.includes('स्कैन') ||
            clean.includes('ಸ್ಕ್ಯಾನ್')
          ) {
            setMatchedAction('Action: Scan Document');
            triggerDocumentScan();
          } else if (
            clean.includes('skip') ||
            clean.includes('next') ||
            clean.includes('आगे') ||
            clean.includes('ಮುಂದೆ')
          ) {
            setMatchedAction('Action: Skip');
            setPatientState((prev) => ({ ...prev, step: 5 }));
            showToast('Skipping document scan');
          } else {
            showToast(`🎙️ Heard: "${spokenText}"`);
          }
          break;
        }

        case 5: {
          // Summary Submit
          if (
            clean.includes('send') ||
            clean.includes('doctor') ||
            clean.includes('submit') ||
            clean.includes('भेजें') ||
            clean.includes('ಕಳುಹಿಸಿ') ||
            clean.includes('done')
          ) {
            setMatchedAction('Action: Sent to Doctor');
            handleSubmitCase();
          } else {
            showToast(`🎙️ Heard: "${spokenText}"`);
          }
          break;
        }
      }
    },
    [
      patientState.step,
      patientState.language,
      patientState.answers,
      patientState.currentQuestionIndex,
      currentQuestion,
      handleStopAll,
      showToast,
      speakCurrentStepPrompt,
    ]
  );

  // Trigger Speech Recognition on current step
  const handleStartListening = useCallback(() => {
    handleStopAll();
    setIsListening(true);
    setTranscript('');
    setMatchedAction(undefined);

    const cancelFn = startSpeechRecognition(
      patientState.language,
      (resultTranscript) => {
        setIsListening(false);
        processVoiceInput(resultTranscript);
      },
      (errorType) => {
        setIsListening(false);
        if (errorType === 'unsupported' || errorType === 'start_failed') {
          showToast('🎙️ Microphone access simulated. You can also tap sample speech buttons below.');
        } else if (errorType === 'no-speech') {
          showToast('🎙️ No speech heard. Tap "Speak Again" to retry.');
        } else {
          showToast('🎙️ Could not hear clearly. Please tap Speak Again or select an option.');
        }
      },
      () => {
        setIsListening(false);
      }
    );

    cancelListeningRef.current = cancelFn;
  }, [patientState.language, handleStopAll, processVoiceInput, showToast]);

  // Doctor Notes Voice Dictation
  const handleStartDoctorDictation = useCallback(() => {
    handleStopAll();
    setIsDictatingDoctorNotes(true);
    setDictationTranscript('');

    const cancelFn = startSpeechRecognition(
      'en',
      (resultTranscript) => {
        setIsDictatingDoctorNotes(false);
        setDoctorQueue((prev) =>
          prev.map((p) =>
            p.id === activeDoctorPatientId
              ? {
                  ...p,
                  clinicalNotes: (p.clinicalNotes ? p.clinicalNotes + ' ' : '') + resultTranscript,
                }
              : p
          )
        );
        showToast(`🎙️ Dictated: "${resultTranscript}"`);
      },
      (err) => {
        setIsDictatingDoctorNotes(false);
        showToast('🎙️ Dictation ended. Notes updated.');
      },
      () => {
        setIsDictatingDoctorNotes(false);
      }
    );

    cancelListeningRef.current = cancelFn;
  }, [activeDoctorPatientId, handleStopAll, showToast]);

  // Document scan simulation
  const triggerDocumentScan = () => {
    const unadded = PAST_SAMPLE_DOCS.filter(
      (d) => !patientState.scannedDocs.some((sd) => sd.id === d.id)
    );
    if (unadded.length === 0) {
      showToast('All sample medical records have already been scanned.');
      return;
    }

    setIsScanningDoc(true);
    showToast('🔎 Camera OCR reading prescription text & lab values...');

    setTimeout(() => {
      const nextDoc = unadded[0];
      setPatientState((prev) => ({
        ...prev,
        scannedDocs: [...prev.scannedDocs, nextDoc],
      }));
      setIsScanningDoc(false);
      showToast(`✅ Scanned & added: ${nextDoc.name}`);
    }, 900);
  };

  // Submit patient case to doctor's queue
  const handleSubmitCase = () => {
    handleStopAll();

    const complaintObj = COMPLAINTS.find((c) => c.id === patientState.complaintId);
    const complaintName = complaintObj ? complaintObj.label : 'General Symptom';

    const newPatientSummary = currentQuestions.map((q, idx) => ({
      label: q.translations.en,
      value: Array.isArray(patientState.answers[idx])
        ? (patientState.answers[idx] as string[]).join(', ')
        : (patientState.answers[idx] as string) || 'Reported',
    }));

    const newTimeline = patientState.scannedDocs.map((d) => ({
      date: d.date,
      description: d.name,
    }));
    newTimeline.push({
      date: 'Today (Just Now)',
      description: `Voice Intake: ${complaintName} (${patientState.redFlagDetected ? 'Urgent Review' : 'Routine'})`,
    });

    const newPatient: DoctorQueuePatient = {
      id: Date.now(),
      name: 'Patient (You)',
      age: 42,
      gender: 'M/F',
      waitTime: '0 min (Just checked in)',
      chiefComplaint: `${complaintName} — ${patientState.redFlagDetected ? 'Flagged for Early Review' : 'Stable'}`,
      isRedFlag: patientState.redFlagDetected,
      languageUsed:
        patientState.language === 'hi'
          ? 'Hindi'
          : patientState.language === 'kn'
          ? 'Kannada'
          : 'English',
      languageCode: patientState.language,
      isAbdmLinked: patientState.consent.abdmLinked,
      summary: [
        { label: 'Chief Complaint', value: complaintName },
        ...newPatientSummary,
        {
          label: 'ABDM Status',
          value: patientState.consent.abdmLinked ? 'ABHA Linked & Consent Verified' : 'Unlinked',
        },
      ],
      timeline: newTimeline,
      clinicalNotes: '',
      isConfirmed: false,
    };

    setDoctorQueue((prev) => [newPatient, ...prev]);
    setActiveDoctorPatientId(newPatient.id);

    showToast("✅ Case note sent! Now viewing doctor's clinical queue.");
    setTimeout(() => {
      setCurrentMode('doctor');
    }, 700);
  };

  // Quick simulation phrases tailored to each step to guarantee 100% testability in iframe previews
  const getQuickSimulationPhrases = (): string[] => {
    const lang = patientState.language;
    switch (patientState.step) {
      case 0:
        return lang === 'hi'
          ? ['हिन्दी', 'English', 'ಕನ್ನಡ']
          : lang === 'kn'
          ? ['ಕನ್ನಡ', 'English', 'हिन्दी']
          : ['Hindi', 'Kannada', 'English'];
      case 1:
        return lang === 'hi'
          ? ['हाँ, सहमति है', 'दोनों जोड़ें']
          : lang === 'kn'
          ? ['ಹೌದು, ಒಪ್ಪಿಗೆ', 'ಎರಡೂ ಸರಿ']
          : ['I agree', 'Yes to both'];
      case 2:
        return lang === 'hi'
          ? ['बुखार है', 'सीने में दर्द', 'खांसी']
          : lang === 'kn'
          ? ['ಜ್ವರ ಇದೆ', 'ಎದೆ ನೋವು', 'ಕೆಮ್ಮು']
          : ['I have fever', 'Chest pain', 'Cough'];
      case 3:
        if (currentQuestion) {
          return currentQuestion.options.slice(0, 2).map((o) => o.translations[lang]);
        }
        return ['Yes', 'No'];
      case 4:
        return lang === 'hi' ? ['दस्तावेज स्कैन करें', 'आगे बढ़ें'] : ['Scan document', 'Skip for now'];
      case 5:
        return lang === 'hi' ? ['डॉक्टर को भेजें'] : lang === 'kn' ? ['ವೈದ್ಯರಿಗೆ ಕಳುಹಿಸಿ'] : ['Send to doctor'];
      default:
        return [];
    }
  };

  const selectedComplaintObj = COMPLAINTS.find((c) => c.id === patientState.complaintId);
  const complaintDisplayLabel = selectedComplaintObj
    ? selectedComplaintObj.translations[patientState.language]
    : 'Symptoms';

  return (
    <div className="min-h-screen bg-[#F3F8F7] flex flex-col font-sans">
      {/* Top Header */}
      <Header
        currentMode={currentMode}
        onModeChange={(mode) => {
          handleStopAll();
          setCurrentMode(mode);
        }}
        currentLanguage={patientState.language}
        onLanguageChange={(newLang) => {
          handleStopAll();
          setPatientState((prev) => ({ ...prev, language: newLang }));
          showToast(`Language switched to ${newLang.toUpperCase()}`);
        }}
        redFlagCount={doctorQueue.filter((p) => p.isRedFlag).length}
        waitingCount={doctorQueue.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 pb-20 space-y-5">
        {currentMode === 'patient' ? (
          <>
            {/* Progress indicator bar (Steps 1 to 6) */}
            <div className="bg-white border border-[#D7E6E1] rounded-2xl p-3.5 shadow-2xs">
              <div className="flex items-center justify-between text-xs font-bold text-[#4C7C72] mb-2">
                <span>Step {patientState.step + 1} of 6</span>
                <span className="text-[#0F2F4A]">
                  {patientState.step === 0 && 'Language Selection'}
                  {patientState.step === 1 && 'Patient Consent'}
                  {patientState.step === 2 && 'Chief Complaint'}
                  {patientState.step === 3 && `Questions (${patientState.currentQuestionIndex + 1}/${currentQuestions.length})`}
                  {patientState.step === 4 && 'Medical Records'}
                  {patientState.step === 5 && 'Case Review'}
                </span>
              </div>
              <div className="grid grid-cols-6 gap-1.5 h-2 rounded-full overflow-hidden bg-[#EEF3EF]">
                {[0, 1, 2, 3, 4, 5].map((s) => (
                  <div
                    key={s}
                    className={`h-full rounded-full transition-all duration-300 ${
                      s < patientState.step
                        ? 'bg-[#1B4E7A]'
                        : s === patientState.step
                        ? 'bg-[#2E9E6B]'
                        : 'bg-[#D7E6E1]'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Omnipresent Voice Assistant Banner (Available on EVERY step) */}
            <VoiceAssistantBanner
              language={patientState.language}
              isSpeaking={isSpeaking}
              isListening={isListening}
              transcript={transcript}
              matchedAction={matchedAction}
              onRepeat={speakCurrentStepPrompt}
              onStop={handleStopAll}
              onSpeakAgain={handleStartListening}
              autoSpeak={autoSpeak}
              onToggleAutoSpeak={() => setAutoSpeak(!autoSpeak)}
              quickSimulationPhrases={getQuickSimulationPhrases()}
              onSimulatePhrase={(phrase) => {
                handleStopAll();
                processVoiceInput(phrase);
              }}
            />

            {/* Step Content Card */}
            <div className="bg-white border border-[#D7E6E1] rounded-2xl p-5 sm:p-7 shadow-xs">
              {patientState.step === 0 && (
                <LanguageStep
                  selectedLanguage={patientState.language}
                  onSelectLanguage={(lang) => {
                    handleStopAll();
                    setPatientState((prev) => ({ ...prev, language: lang }));
                  }}
                  onPreviewLanguage={(lang) => {
                    handleStopAll();
                    const sample = SUPPORTED_LANGUAGES.find((l) => l.code === lang)?.speechSample || '';
                    speakText(sample, lang);
                  }}
                  onNext={() => {
                    handleStopAll();
                    setPatientState((prev) => ({ ...prev, step: 1 }));
                  }}
                />
              )}

              {patientState.step === 1 && (
                <ConsentStep
                  language={patientState.language}
                  consent={patientState.consent}
                  onToggleConsent={(field) =>
                    setPatientState((prev) => ({
                      ...prev,
                      consent: { ...prev.consent, [field]: !prev.consent[field] },
                    }))
                  }
                  onNext={() => {
                    handleStopAll();
                    setPatientState((prev) => ({ ...prev, step: 2 }));
                  }}
                  onBack={() => {
                    handleStopAll();
                    setPatientState((prev) => ({ ...prev, step: 0 }));
                  }}
                />
              )}

              {patientState.step === 2 && (
                <ComplaintStep
                  language={patientState.language}
                  selectedComplaintId={patientState.complaintId}
                  onSelectComplaint={(id) => {
                    handleStopAll();
                    setPatientState((prev) => ({
                      ...prev,
                      complaintId: id,
                      currentQuestionIndex: 0,
                      answers: {},
                      redFlagDetected: false,
                    }));
                  }}
                  onStartSpeech={handleStartListening}
                  isListening={isListening}
                  onNext={() => {
                    handleStopAll();
                    setPatientState((prev) => ({
                      ...prev,
                      step: 3,
                      currentQuestionIndex: 0,
                    }));
                  }}
                  onBack={() => {
                    handleStopAll();
                    setPatientState((prev) => ({ ...prev, step: 1 }));
                  }}
                />
              )}

              {patientState.step === 3 && currentQuestion && (
                <QuestionsStep
                  language={patientState.language}
                  complaintLabel={complaintDisplayLabel}
                  questionIndex={patientState.currentQuestionIndex}
                  totalQuestions={currentQuestions.length}
                  currentQuestion={currentQuestion}
                  currentAnswer={patientState.answers[patientState.currentQuestionIndex]}
                  onAnswer={(val, isMulti) => {
                    const current = patientState.answers[patientState.currentQuestionIndex];
                    let newAns: string | string[];

                    if (isMulti) {
                      const arr = Array.isArray(current) ? [...current] : [];
                      if (val === 'None of these') {
                        newAns = ['None of these'];
                      } else {
                        const filtered = arr.filter((x) => x !== 'None of these');
                        if (filtered.includes(val)) {
                          newAns = filtered.filter((x) => x !== val);
                        } else {
                          newAns = [...filtered, val];
                        }
                      }
                    } else {
                      newAns = val;
                    }

                    const isRed =
                      val === currentQuestion.flagOn ||
                      currentQuestion.options.find((o) => o.label === val)?.isRedFlag;

                    setPatientState((prev) => ({
                      ...prev,
                      answers: { ...prev.answers, [prev.currentQuestionIndex]: newAns },
                      redFlagDetected: prev.redFlagDetected || !!isRed,
                    }));
                  }}
                  onSpeakQuestion={speakCurrentStepPrompt}
                  onListenAnswer={handleStartListening}
                  isListening={isListening}
                  redFlagDetected={patientState.redFlagDetected}
                  onNext={() => {
                    handleStopAll();
                    if (patientState.currentQuestionIndex + 1 < currentQuestions.length) {
                      setPatientState((prev) => ({
                        ...prev,
                        currentQuestionIndex: prev.currentQuestionIndex + 1,
                      }));
                    } else {
                      setPatientState((prev) => ({ ...prev, step: 4 }));
                    }
                  }}
                  onBack={() => {
                    handleStopAll();
                    if (patientState.currentQuestionIndex > 0) {
                      setPatientState((prev) => ({
                        ...prev,
                        currentQuestionIndex: prev.currentQuestionIndex - 1,
                      }));
                    } else {
                      setPatientState((prev) => ({ ...prev, step: 2 }));
                    }
                  }}
                />
              )}

              {patientState.step === 4 && (
                <ScanStep
                  language={patientState.language}
                  scannedDocs={patientState.scannedDocs}
                  onScanDocument={triggerDocumentScan}
                  isScanning={isScanningDoc}
                  onNext={() => {
                    handleStopAll();
                    setPatientState((prev) => ({ ...prev, step: 5 }));
                  }}
                  onBack={() => {
                    handleStopAll();
                    setPatientState((prev) => ({ ...prev, step: 3 }));
                  }}
                />
              )}

              {patientState.step === 5 && (
                <SummaryStep
                  language={patientState.language}
                  complaintLabel={complaintDisplayLabel}
                  questions={currentQuestions}
                  answers={patientState.answers}
                  redFlagDetected={patientState.redFlagDetected}
                  isAbdmLinked={patientState.consent.abdmLinked}
                  scannedDocs={patientState.scannedDocs}
                  onBack={() => {
                    handleStopAll();
                    setPatientState((prev) => ({ ...prev, step: 3 }));
                  }}
                  onSubmit={handleSubmitCase}
                />
              )}
            </div>
          </>
        ) : (
          /* Doctor Dashboard */
          <DoctorDashboard
            patients={doctorQueue}
            activePatientId={activeDoctorPatientId}
            onSelectPatient={(id) => setActiveDoctorPatientId(id)}
            onConfirmPatient={(id) => {
              setDoctorQueue((prev) =>
                prev.map((p) => (p.id === id ? { ...p, isConfirmed: true } : p))
              );
              showToast('✅ Case confirmed and synchronized with ABDM');
            }}
            onUpdateNotes={(id, notes) => {
              setDoctorQueue((prev) =>
                prev.map((p) => (p.id === id ? { ...p, clinicalNotes: notes } : p))
              );
            }}
            onDictateNotes={handleStartDoctorDictation}
            onStopDictation={handleStopAll}
            isDictating={isDictatingDoctorNotes}
            dictationTranscript={dictationTranscript}
          />
        )}
      </main>

      {/* Floating Toast notification */}
      {toastMessage && (
        <div
          id="app-toast-alert"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#0F2F4A] text-white px-5 py-3 rounded-2xl shadow-xl text-sm font-semibold z-50 transition-all border border-[#1B4E7A] flex items-center gap-2 max-w-[90vw]"
        >
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
