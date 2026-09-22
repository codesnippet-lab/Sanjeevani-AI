import { SymptomComplaint, ClinicalQuestion, ScannedDocument, DoctorQueuePatient } from '../types';

export const COMPLAINTS: SymptomComplaint[] = [
  {
    id: 'fever',
    label: 'Fever',
    icon: '🌡️',
    translations: {
      en: 'Fever or Chills',
      hi: 'बुखार या कंपकंपी',
      kn: 'ಜ್ವರ ಅಥವಾ ಚಳಿ',
    },
    keywords: {
      en: ['fever', 'temperature', 'hot', 'chills', 'feverish'],
      hi: ['बुखार', 'ताप', 'गरम', 'ठंड', 'कपकपी', 'bukhar'],
      kn: ['ಜ್ವರ', 'ಬಿಸಿ', 'ಚಳಿ', 'jvara', 'jwara', 'kaayisalu'],
    },
  },
  {
    id: 'cough',
    label: 'Cough',
    icon: '😮‍💨',
    translations: {
      en: 'Cough or Cold',
      hi: 'खांसी या जुकाम',
      kn: 'ಕೆಮ್ಮು ಅಥವಾ ಶೀತ',
    },
    keywords: {
      en: ['cough', 'cold', 'phlegm', 'throat', 'coughing'],
      hi: ['खांसी', 'खासी', 'कफ', 'बलगम', 'जुकाम', 'khasi', 'khansi'],
      kn: ['ಕೆಮ್ಮು', 'ಕಫ', 'ಶೀತ', 'kemmu', 'shitha'],
    },
  },
  {
    id: 'chest',
    label: 'Chest Pain',
    icon: '❤️',
    translations: {
      en: 'Chest Pain or Discomfort',
      hi: 'सीने में दर्द या भारीपन',
      kn: 'ಎದೆ ನೋವು ಅಥವಾ ಬಿಗಿತ',
    },
    keywords: {
      en: ['chest pain', 'chest', 'heart', 'tightness', 'pressure'],
      hi: ['सीने में दर्द', 'सीना', 'दिल', 'छाती', 'भारीपन', 'seena'],
      kn: ['ಎದೆ ನೋವು', 'ಎದೆ', 'ಹೃದಯ', 'ಬಿಗಿತ', 'ede novu', 'ede'],
    },
  },
  {
    id: 'abdo',
    label: 'Stomach Pain',
    icon: '🩹',
    translations: {
      en: 'Stomach Pain or Cramps',
      hi: 'पेट दर्द या ऐंठन',
      kn: 'ಹೊಟ್ಟೆ ನೋವು ಅಥವಾ ಸೆಳೆತ',
    },
    keywords: {
      en: ['stomach', 'belly', 'abdomen', 'tummy', 'abdominal', 'cramps'],
      hi: ['पेट दर्द', 'पेट', 'ऐंठन', 'उदर', 'pet dard', 'pet'],
      kn: ['ಹೊಟ್ಟೆ ನೋವು', 'ಹೊಟ್ಟೆ', 'ಸೆಳೆತ', 'hotte novu', 'hotte'],
    },
  },
  {
    id: 'headache',
    label: 'Headache',
    icon: '🧠',
    translations: {
      en: 'Headache or Dizziness',
      hi: 'सिरदर्द या चक्कर आना',
      kn: 'ತಲೆನೋವು ಅಥವಾ ತಲೆಸುತ್ತು',
    },
    keywords: {
      en: ['headache', 'head', 'migraine', 'dizzy', 'dizziness'],
      hi: ['सिरदर्द', 'सर दर्द', 'माथा', 'चक्कर', 'sir dard', 'sar dard'],
      kn: ['ತಲೆನೋವು', 'ತಲೆ', 'ತಲೆಸುತ್ತು', 'tale novu', 'tale'],
    },
  },
  {
    id: 'other',
    label: 'Other Symptoms',
    icon: '✍️',
    translations: {
      en: 'Something else / General weakness',
      hi: 'कुछ और / सामान्य कमजोरी',
      kn: 'ಬೇರೇನಾದರೂ / ಸಾಮಾನ್ಯ ನಿಶ್ಯಕ್ತಿ',
    },
    keywords: {
      en: ['other', 'something else', 'weakness', 'tired', 'body pain'],
      hi: ['कुछ और', 'अन्य', 'कमजोरी', 'थकान', 'kuch aur'],
      kn: ['ಬೇರೆ', 'ಇನ್ನೇನಾದರೂ', 'ನಿಶ್ಯಕ್ತಿ', 'ಸುಸ್ತು', 'bere'],
    },
  },
];

export const QUESTION_TREES: Record<string, ClinicalQuestion[]> = {
  fever: [
    {
      id: 'fever_dur',
      question: 'How long have you had the fever?',
      translations: {
        en: 'How long have you had the fever?',
        hi: 'आपको बुखार कितने दिनों से है?',
        kn: 'ನಿಮಗೆ ಎಷ್ಟು ದಿನಗಳಿಂದ ಜ್ವರ ಇದೆ?',
      },
      options: [
        {
          id: 'under_1d',
          label: 'Less than 1 day',
          translations: { en: 'Less than 1 day', hi: '1 दिन से कम (आज शुरू हुआ)', kn: '1 ದಿನಕ್ಕಿಂತ ಕಡಿಮೆ (ಇಂದು ಪ್ರಾರಂಭ)' },
          keywords: { en: ['less than 1 day', '1 day', 'today', 'since morning'], hi: ['1 दिन से कम', 'आज से', 'सुबह से'], kn: ['ಒಂದು ದಿನಕ್ಕಿಂತ ಕಡಿಮೆ', 'ಇಂದು', 'ಬೆಳಗ್ಗೆಯಿಂದ'] },
        },
        {
          id: '1_3d',
          label: '1 to 3 days',
          translations: { en: '1 to 3 days', hi: '1 से 3 दिन', kn: '1 ರಿಂದ 3 ದಿನಗಳು' },
          keywords: { en: ['1 to 3 days', '2 days', '3 days', 'couple days'], hi: ['1 से 3 दिन', 'दो दिन', 'तीन दिन'], kn: ['1 ರಿಂದ 3 ದಿನಗಳು', 'ಎರಡು ದಿನ', 'ಮೂರು ದಿನ'] },
        },
        {
          id: 'over_3d',
          label: 'More than 3 days',
          translations: { en: 'More than 3 days', hi: '3 दिन से अधिक समय से', kn: '3 ದಿನಗಳಿಗಿಂತ ಹೆಚ್ಚು' },
          keywords: { en: ['more than 3 days', 'over 3 days', 'many days', 'week'], hi: ['3 दिन से अधिक', 'चार दिन', 'एक हफ्ता'], kn: ['3 ದಿನಗಳಿಗಿಂತ ಹೆಚ್ಚು', 'ಹಲವು ದಿನ', 'ಒಂದು ವಾರ'] },
        },
      ],
    },
    {
      id: 'fever_int',
      question: 'How high does the fever feel to you?',
      translations: {
        en: 'How high does the fever feel to you?',
        hi: 'यह बुखार आपको कितना तेज़ लगता है?',
        kn: 'ಜ್ವರದ ತೀವ್ರತೆ ನಿಮಗೆ ಹೇಗೆ ಅನಿಸುತ್ತದೆ?',
      },
      options: [
        {
          id: 'mild',
          label: 'Mild (Warm forehead)',
          translations: { en: 'Mild (Warm forehead)', hi: 'हल्का (हल्की गर्माहट)', kn: 'ಸೌಮ್ಯ (ಸ್ವಲ್ಪ ಬೆಚ್ಚಗೆ)' },
          keywords: { en: ['mild', 'low', 'warm', 'light'], hi: ['हल्का', 'धीमा', 'कम'], kn: ['ಸೌಮ್ಯ', 'ಕಡಿಮೆ', 'ಸ್ವಲ್ಪ'] },
        },
        {
          id: 'mod',
          label: 'Moderate (Noticeable heat)',
          translations: { en: 'Moderate (Noticeable heat)', hi: 'मध्यम (स्पष्ट बुखार)', kn: 'ಮಧ್ಯಮ (ಗಮನಾರ್ಹ ಜ್ವರ)' },
          keywords: { en: ['moderate', 'medium'], hi: ['मध्यम', 'ठीक ठाक'], kn: ['ಮಧ್ಯಮ', 'ಸಾಧಾರಣ'] },
        },
        {
          id: 'high',
          label: 'Very high (Severe heat)',
          translations: { en: 'Very high (Severe heat)', hi: 'बहुत तेज़ (अत्यधिक गर्म)', kn: 'ತುಂಬಾ ಹೆಚ್ಚು (ತೀವ್ರ ಜ್ವರ)' },
          keywords: { en: ['very high', 'high', 'severe', 'burning'], hi: ['बहुत तेज', 'बहुत अधिक', 'ज्यादा'], kn: ['ತುಂಬಾ ಹೆಚ್ಚು', 'ತೀವ್ರ', 'ಅತಿಯಾದ'] },
        },
      ],
    },
    {
      id: 'fever_assoc',
      question: 'Do you have any of these associated symptoms?',
      translations: {
        en: 'Do you have any of these associated symptoms?',
        hi: 'क्या बुखार के साथ इनमें से कोई लक्षण है?',
        kn: 'ಜ್ವರದೊಂದಿಗೆ ಈ ಕೆಳಗಿನ ಯಾವುದಾದರೂ ಲಕ್ಷಣಗಳಿವೆಯೇ?',
      },
      multi: true,
      options: [
        {
          id: 'chills',
          label: 'Shivering / Chills',
          translations: { en: 'Shivering / Chills', hi: 'कंपकंपी / ठंड लगना', kn: 'ನಡುಕ / ಚಳಿ' },
          keywords: { en: ['chills', 'shivering', 'cold'], hi: ['कंपकंपी', 'ठंड'], kn: ['ನಡುಕ', 'ಚಳಿ'] },
        },
        {
          id: 'bodyache',
          label: 'Severe Body Ache',
          translations: { en: 'Severe Body Ache', hi: 'पूरे शरीर में दर्द', kn: 'ತೀವ್ರ ಮೈ ಕೈ ನೋವು' },
          keywords: { en: ['body ache', 'body pain', 'muscle pain'], hi: ['शरीर दर्द', 'बदन दर्द'], kn: ['ಮೈ ನೋವು', 'ಮೈ ಕೈ ನೋವು'] },
        },
        {
          id: 'rash',
          label: 'Skin Rash',
          translations: { en: 'Skin Rash', hi: 'त्वचा पर लाल चकत्ते', kn: 'ಚರ್ಮದ ದದ್ದುಗಳು' },
          isRedFlag: true,
          keywords: { en: ['rash', 'spots', 'skin'], hi: ['चकत्ते', 'दाने'], kn: ['ದದ್ದು', 'ಗುಳ್ಳೆ'] },
        },
        {
          id: 'vomiting',
          label: 'Nausea or Vomiting',
          translations: { en: 'Nausea or Vomiting', hi: 'उल्टी या मितली', kn: 'ವಾಂತಿ ಅಥವಾ ವಾಕರಿಕೆ' },
          keywords: { en: ['vomiting', 'nausea', 'vomit'], hi: ['उल्टी', 'मितली'], kn: ['ವಾಂತಿ', 'ವಾಕರಿಕೆ'] },
        },
        {
          id: 'none',
          label: 'None of these',
          translations: { en: 'None of these', hi: 'इनमें से कोई नहीं', kn: 'ಇವುಗಳಲ್ಲಿ ಯಾವುದೂ ಇಲ್ಲ' },
          keywords: { en: ['none', 'no', 'nothing'], hi: ['कोई नहीं', 'कुछ नहीं'], kn: ['ಯಾವುದೂ ಇಲ್ಲ', 'ಇಲ್ಲ'] },
        },
      ],
    },
    {
      id: 'fever_travel',
      question: 'Have you travelled recently or been near someone sick?',
      translations: {
        en: 'Have you travelled recently or been near someone sick?',
        hi: 'क्या हाल ही में कोई यात्रा की है या किसी बीमार व्यक्ति के संपर्क में आए हैं?',
        kn: 'ಇತ್ತೀಚೆಗೆ ಪ್ರಯಾಣ ಮಾಡಿದ್ದೀರಾ ಅಥವಾ ಅನಾರೋಗ್ಯದ ವ್ಯಕ್ತಿಯ ಸಂಪರ್ಕದಲ್ಲಿದ್ದೀರಾ?',
      },
      options: [
        {
          id: 'yes',
          label: 'Yes',
          translations: { en: 'Yes', hi: 'हाँ', kn: 'ಹೌದು' },
          keywords: { en: ['yes', 'yeah', 'yep', 'travelled'], hi: ['हाँ', 'हा', 'जी हाँ'], kn: ['ಹೌದು', 'ಪ್ರಯಾಣ ಮಾಡಿದ್ದೇನೆ'] },
        },
        {
          id: 'no',
          label: 'No',
          translations: { en: 'No', hi: 'नहीं', kn: 'ಇಲ್ಲ' },
          keywords: { en: ['no', 'nope', 'none'], hi: ['नहीं', 'ना', 'जी नहीं'], kn: ['ಇಲ್ಲ', 'ಮಾಡಿಲ್ಲ'] },
        },
      ],
    },
  ],
  cough: [
    {
      id: 'cough_dur',
      question: 'How long has the cough lasted?',
      translations: {
        en: 'How long has the cough lasted?',
        hi: 'आपको यह खांसी कितने समय से है?',
        kn: 'ಕೆಮ್ಮು ಎಷ್ಟು ದಿನಗಳಿಂದ ಇದೆ?',
      },
      options: [
        {
          id: 'u1w',
          label: 'Under 1 week',
          translations: { en: 'Under 1 week', hi: '1 सप्ताह से कम', kn: '1 ವಾರಕ್ಕಿಂತ ಕಡಿಮೆ' },
          keywords: { en: ['under 1 week', 'less than a week', 'few days'], hi: ['1 सप्ताह से कम', 'कुछ दिन'], kn: ['ಒಂದು ವಾರಕ್ಕಿಂತ ಕಡಿಮೆ', 'ಕೆಲವು ದಿನ'] },
        },
        {
          id: '1_3w',
          label: '1 to 3 weeks',
          translations: { en: '1 to 3 weeks', hi: '1 से 3 सप्ताह', kn: '1 ರಿಂದ 3 ವಾರಗಳು' },
          keywords: { en: ['1 to 3 weeks', 'two weeks'], hi: ['1 से 3 सप्ताह', 'दो हफ्ते'], kn: ['1 ರಿಂದ 3 ವಾರಗಳು', 'ಎರಡು ವಾರ'] },
        },
        {
          id: 'over_3w',
          label: 'More than 3 weeks (Chronic)',
          translations: { en: 'More than 3 weeks (Chronic)', hi: '3 सप्ताह से अधिक समय से', kn: '3 ವಾರಗಳಿಗಿಂತ ಹೆಚ್ಚು (ದೀರ್ಘಕಾಲದ)' },
          isRedFlag: true,
          keywords: { en: ['over 3 weeks', 'chronic', 'month'], hi: ['3 सप्ताह से अधिक', 'महीने भर से'], kn: ['3 ವಾರಗಳಿಗಿಂತ ಹೆಚ್ಚು', 'ತಿಂಗಳು'] },
        },
      ],
    },
    {
      id: 'cough_type',
      question: 'Is your cough dry, or does it bring up phlegm?',
      translations: {
        en: 'Is your cough dry, or does it bring up phlegm?',
        hi: 'क्या यह सूखी खांसी है या बलगम आता है?',
        kn: 'ಇದು ಒಣ ಕೆಮ್ಮೇ ಅಥವಾ ಕಫ ಬರುತ್ತಿದೆಯೇ?',
      },
      options: [
        {
          id: 'dry',
          label: 'Dry cough (No phlegm)',
          translations: { en: 'Dry cough (No phlegm)', hi: 'सूखी खांसी (बिना बलगम)', kn: 'ಒಣ ಕೆಮ್ಮು (ಕಫವಿಲ್ಲದೆ)' },
          keywords: { en: ['dry', 'no phlegm'], hi: ['सूखी खांसी', 'सूखा'], kn: ['ಒಣ ಕೆಮ್ಮು', 'ಕಫವಿಲ್ಲ'] },
        },
        {
          id: 'wet',
          label: 'Wet cough with phlegm',
          translations: { en: 'Wet cough with phlegm', hi: 'बलगम वाली खांसी', kn: 'ಕಫದೊಂದಿಗೆ ತೇವ ಕೆಮ್ಮು' },
          keywords: { en: ['wet', 'phlegm', 'mucus'], hi: ['बलगम', 'कफ'], kn: ['ಕಫ', 'ತೇವ'] },
        },
      ],
    },
    {
      id: 'cough_blood',
      question: 'Have you noticed any blood in your cough?',
      translations: {
        en: 'Have you noticed any blood in your cough?',
        hi: 'क्या खांसते समय खून या लाल धब्बे दिखे हैं?',
        kn: 'ಕೆಮ್ಮುವಾಗ ರಕ್ತ ಅಥವಾ ಕೆಂಪು ಕಲೆಗಳು ಕಾಣಿಸಿಕೊಂಡಿವೆಯೇ?',
      },
      flagOn: 'Yes',
      options: [
        {
          id: 'yes_blood',
          label: 'Yes',
          translations: { en: 'Yes', hi: 'हाँ (खून दिखा है)', kn: 'ಹೌದು (ರಕ್ತ ಕಂಡಿದೆ)' },
          isRedFlag: true,
          keywords: { en: ['yes', 'blood', 'red'], hi: ['हाँ', 'खून है'], kn: ['ಹೌದು', 'ರಕ್ತ ಇದೆ'] },
        },
        {
          id: 'no_blood',
          label: 'No',
          translations: { en: 'No', hi: 'नहीं (कोई खून नहीं)', kn: 'ಇಲ್ಲ (ರಕ್ತವಿಲ್ಲ)' },
          keywords: { en: ['no', 'clean', 'none'], hi: ['नहीं', 'कोई खून नहीं'], kn: ['ಇಲ್ಲ', 'ರಕ್ತವಿಲ್ಲ'] },
        },
      ],
    },
    {
      id: 'cough_breathless',
      question: 'Are you experiencing any shortness of breath?',
      translations: {
        en: 'Are you experiencing any shortness of breath?',
        hi: 'क्या आपको सांस लेने में तकलीफ या सांस फूलने की समस्या है?',
        kn: 'ನಿಮಗೆ ಉಸಿರಾಟದ ತೊಂದರೆ ಅಥವಾ ಉಬ್ಬಸ ಉಂಟಾಗುತ್ತಿದೆಯೇ?',
      },
      flagOn: 'Yes',
      options: [
        {
          id: 'yes_breath',
          label: 'Yes',
          translations: { en: 'Yes', hi: 'हाँ (सांस फूलती है)', kn: 'ಹೌದು (ಉಸಿರಾಟ ಕಷ್ಟ)' },
          isRedFlag: true,
          keywords: { en: ['yes', 'breathless', 'breathing problem', 'pant'], hi: ['हाँ', 'सांस फूलना'], kn: ['ಹೌದು', 'ಉಸಿರಾಟ ಕಷ್ಟ'] },
        },
        {
          id: 'no_breath',
          label: 'No',
          translations: { en: 'No', hi: 'नहीं (सांस सामान्य है)', kn: 'ಇಲ್ಲ (ಉಸಿರಾಟ ಸಹಜವಾಗಿದೆ)' },
          keywords: { en: ['no', 'normal breathing'], hi: ['नहीं', 'सामान्य है'], kn: ['ಇಲ್ಲ', 'ಸಹಜ'] },
        },
      ],
    },
  ],
  chest: [
    {
      id: 'chest_desc',
      question: 'How would you describe the chest pain?',
      translations: {
        en: 'How would you describe the chest pain?',
        hi: 'आप सीने के दर्द को किस तरह बयां करेंगे?',
        kn: 'ಎದೆ ನೋವನ್ನು ನೀವು ಹೇಗೆ ವಿವರಿಸುತ್ತೀರಿ?',
      },
      options: [
        {
          id: 'tight',
          label: 'Tightness / Heavy Pressure',
          translations: { en: 'Tightness / Heavy Pressure', hi: 'जकड़न या भारी दबाव', kn: 'ಬಿಗಿತ ಅಥವಾ ತೀವ್ರ ಒತ್ತಡ' },
          isRedFlag: true,
          keywords: { en: ['tightness', 'pressure', 'heavy', 'squeezing'], hi: ['जकड़न', 'दबाव', 'भारी'], kn: ['ಬಿಗಿತ', 'ಒತ್ತಡ', 'ಭಾರ'] },
        },
        {
          id: 'sharp',
          label: 'Sharp / Stabbing pain',
          translations: { en: 'Sharp / Stabbing pain', hi: 'तीखा या चुभने वाला दर्द', kn: 'ತೀಕ್ಷ್ಣ / ಚುಚ್ಚುವ ನೋವು' },
          keywords: { en: ['sharp', 'stabbing', 'poking'], hi: ['तीखा', 'चुभन'], kn: ['ತೀಕ್ಷ್ಣ', 'ಚುಚ್ಚುವುದು'] },
        },
        {
          id: 'burning',
          label: 'Burning sensation (Heartburn)',
          translations: { en: 'Burning sensation (Heartburn)', hi: 'जलन (एसिडिटी जैसी)', kn: 'ಉರಿ (ಎದೆಯುರಿ)' },
          keywords: { en: ['burning', 'acidity', 'heartburn'], hi: ['जलन', 'एसिडिटी'], kn: ['ಉರಿ', 'ಎದೆಯುರಿ'] },
        },
      ],
    },
    {
      id: 'chest_radiate',
      question: 'Does the pain spread to your left arm, jaw, or back?',
      translations: {
        en: 'Does the pain spread to your left arm, jaw, or back?',
        hi: 'क्या यह दर्द बाएं हाथ, जबड़े या पीठ की तरफ फैलता है?',
        kn: 'ಈ ನೋವು ಎಡಗೈ, ದವಡೆ ಅಥವಾ ಬೆನ್ನಿಗೆ ಹರಡುತ್ತಿದೆಯೇ?',
      },
      flagOn: 'Yes',
      options: [
        {
          id: 'rad_yes',
          label: 'Yes',
          translations: { en: 'Yes', hi: 'हाँ (फैलता है)', kn: 'ಹೌದು (ಹರಡುತ್ತದೆ)' },
          isRedFlag: true,
          keywords: { en: ['yes', 'arm', 'jaw', 'back', 'spreading'], hi: ['हाँ', 'हाथ में जाता है', 'पीठ में'], kn: ['ಹೌದು', 'ಕೈಗೆ ಹರಡುತ್ತದೆ', 'ಬೆನ್ನಿಗೆ'] },
        },
        {
          id: 'rad_no',
          label: 'No',
          translations: { en: 'No', hi: 'नहीं (केवल सीने में है)', kn: 'ಇಲ್ಲ (ಕೇವಲ ಎದೆಯಲ್ಲಿ ಮಾತ್ರ)' },
          keywords: { en: ['no', 'only chest', 'does not spread'], hi: ['नहीं', 'फैलता नहीं'], kn: ['ಇಲ್ಲ', 'ಹರಡುವುದಿಲ್ಲ'] },
        },
      ],
    },
    {
      id: 'chest_sweat',
      question: 'Are you sweating profusely or feeling faint with the pain?',
      translations: {
        en: 'Are you sweating profusely or feeling faint with the pain?',
        hi: 'क्या दर्द के साथ ठंडा पसीना आ रहा है या चक्कर आ रहे हैं?',
        kn: 'ನೋವಿನೊಂದಿಗೆ ಅತಿಯಾಗಿ ಬೆವರುತ್ತಿದೆಯೇ ಅಥವಾ ತಲೆಸುತ್ತು ಬರುತ್ತಿದೆಯೇ?',
      },
      flagOn: 'Yes',
      options: [
        {
          id: 'sweat_yes',
          label: 'Yes',
          translations: { en: 'Yes', hi: 'हाँ (पसीना या चक्कर है)', kn: 'ಹೌದು (ಬೆವರು ಅಥವಾ ತಲೆಸುತ್ತು)' },
          isRedFlag: true,
          keywords: { en: ['yes', 'sweating', 'sweat', 'faint'], hi: ['हाँ', 'पसीना', 'चक्कर'], kn: ['ಹೌದು', 'ಬೆವರು', 'ತಲೆಸುತ್ತು'] },
        },
        {
          id: 'sweat_no',
          label: 'No',
          translations: { en: 'No', hi: 'नहीं', kn: 'ಇಲ್ಲ' },
          keywords: { en: ['no', 'no sweat'], hi: ['नहीं', 'पसीना नहीं'], kn: ['ಇಲ್ಲ', 'ಬೆವರಿಲ್ಲ'] },
        },
      ],
    },
    {
      id: 'chest_exertion',
      question: 'Does the discomfort worsen when walking or doing physical activity?',
      translations: {
        en: 'Does the discomfort worsen when walking or doing physical activity?',
        hi: 'क्या चलने-फिरने या काम करने पर दर्द बढ़ जाता है?',
        kn: 'ನಡೆದಾಗ ಅಥವಾ ದೈಹಿಕ ಕೆಲಸ ಮಾಡಿದಾಗ ನೋವು ಹೆಚ್ಚಾಗುತ್ತದೆಯೇ?',
      },
      options: [
        {
          id: 'exert_yes',
          label: 'Yes, worse with effort',
          translations: { en: 'Yes, worse with effort', hi: 'हाँ, चलने पर बढ़ता है', kn: 'ಹೌದು, ಕೆಲಸ ಮಾಡಿದಾಗ ಹೆಚ್ಚಾಗುತ್ತದೆ' },
          isRedFlag: true,
          keywords: { en: ['yes', 'worse', 'walking', 'stairs'], hi: ['हाँ', 'चलने पर बढ़ता है'], kn: ['ಹೌದು', 'ಹೆಚ್ಚಾಗುತ್ತದೆ'] },
        },
        {
          id: 'exert_no',
          label: 'No difference',
          translations: { en: 'No difference', hi: 'नहीं, कोई फर्क नहीं पड़ता', kn: 'ಇಲ್ಲ, ಯಾವುದೇ ವ್ಯತ್ಯಾಸವಿಲ್ಲ' },
          keywords: { en: ['no', 'same'], hi: ['नहीं', 'समान है'], kn: ['ಇಲ್ಲ', 'ವ್ಯತ್ಯಾಸವಿಲ್ಲ'] },
        },
      ],
    },
  ],
  abdo: [
    {
      id: 'abdo_loc',
      question: 'Where is the stomach pain located most?',
      translations: {
        en: 'Where is the stomach pain located most?',
        hi: 'पेट में दर्द मुख्य रूप से किस जगह पर है?',
        kn: 'ಹೊಟ್ಟೆ ನೋವು ಮುಖ್ಯವಾಗಿ ಯಾವ ಭಾಗದಲ್ಲಿದೆ?',
      },
      options: [
        {
          id: 'upper',
          label: 'Upper abdomen',
          translations: { en: 'Upper abdomen', hi: 'ऊपरी पेट में', kn: 'ಹೊಟ್ಟೆಯ ಮೇಲ್ಭಾಗ' },
          keywords: { en: ['upper', 'top'], hi: ['ऊपरी पेट', 'ऊपर'], kn: ['ಮೇಲ್ಭಾಗ'] },
        },
        {
          id: 'lower_right',
          label: 'Lower right side',
          translations: { en: 'Lower right side', hi: 'निचले दाहिने हिस्से में', kn: 'ಕೆಳಗಿನ ಬಲಭಾಗ' },
          isRedFlag: true,
          keywords: { en: ['right', 'lower right', 'appendix'], hi: ['दाहिनी तरफ', 'दायां पेट'], kn: ['ಬಲಭಾಗ', 'ಕೆಳ ಬಲಭಾಗ'] },
        },
        {
          id: 'around_navel',
          label: 'Around the navel / Diffuse',
          translations: { en: 'Around the navel / Diffuse', hi: 'नाभि के आसपास या पूरे पेट में', kn: 'ಹೊಕ್ಕುಳ ಸುತ್ತ ಅಥವಾ ಇಡೀ ಹೊಟ್ಟೆ' },
          keywords: { en: ['navel', 'middle', 'all over'], hi: ['नाभि', 'बीच में', 'पूरे पेट'], kn: ['ಹೊಕ್ಕುಳು', 'ಮಧ್ಯದಲ್ಲಿ'] },
        },
      ],
    },
    {
      id: 'abdo_alarm',
      question: 'Do you have vomiting or blood in stool?',
      translations: {
        en: 'Do you have vomiting or blood in stool?',
        hi: 'क्या लगातार उल्टी हो रही है या मल में खून आया है?',
        kn: 'ನಿಮಗೆ ಸತತ ವಾಂತಿ ಅಥವಾ ಮಲದಲ್ಲಿ ರಕ್ತ ಕಾಣಿಸಿಕೊಂಡಿದೆಯೇ?',
      },
      flagOn: 'Blood in stool',
      options: [
        {
          id: 'blood_stool',
          label: 'Blood in stool',
          translations: { en: 'Blood in stool', hi: 'मल में खून दिखा है', kn: 'ಮಲದಲ್ಲಿ ರಕ್ತ ಬಂದಿದೆ' },
          isRedFlag: true,
          keywords: { en: ['blood in stool', 'blood', 'black stool'], hi: ['मल में खून', 'खून आया है'], kn: ['ಮಲದಲ್ಲಿ ರಕ್ತ', 'ರಕ್ತ'] },
        },
        {
          id: 'vomit_only',
          label: 'Vomiting only',
          translations: { en: 'Vomiting only', hi: 'केवल उल्टी हो रही है', kn: 'ವಾಂತಿ ಮಾತ್ರ ಆಗುತ್ತಿದೆ' },
          keywords: { en: ['vomiting', 'throwing up'], hi: ['उल्टी', 'कै'], kn: ['ವಾಂತಿ'] },
        },
        {
          id: 'neither',
          label: 'Neither',
          translations: { en: 'Neither', hi: 'दोनों में से कुछ नहीं', kn: 'ಎರಡೂ ಇಲ್ಲ' },
          keywords: { en: ['neither', 'no', 'none'], hi: ['कुछ नहीं', 'नहीं'], kn: ['ಯಾವುದೂ ಇಲ್ಲ', 'ಇಲ್ಲ'] },
        },
      ],
    },
  ],
  headache: [
    {
      id: 'head_severity',
      question: 'Is this the sudden worst headache of your life ("thunderclap")?',
      translations: {
        en: 'Is this the sudden worst headache of your life ("thunderclap")?',
        hi: 'क्या यह अचानक हुआ आपके जीवन का सबसे तीव्र व भयंकर सिरदर्द है?',
        kn: 'ಇದು ಹಠಾತ್ತನೆ ಕಾಣಿಸಿಕೊಂಡ ನಿಮ್ಮ ಜೀವನದ ಅತ್ಯಂತ ತೀವ್ರವಾದ ತಲೆನೋವೇ?',
      },
      flagOn: 'Yes',
      options: [
        {
          id: 'worst_yes',
          label: 'Yes',
          translations: { en: 'Yes', hi: 'हाँ (अत्यधिक तीव्र दर्द)', kn: 'ಹೌದು (ಅತ್ಯಂತ ತೀವ್ರ ನೋವು)' },
          isRedFlag: true,
          keywords: { en: ['yes', 'worst headache', 'thunderclap', 'terrible'], hi: ['हाँ', 'बहुत भयंकर', 'बहुत तेज'], kn: ['ಹೌದು', 'ಅತ್ಯಂತ ತೀವ್ರ', 'ತುಂಬಾ ನೋವು'] },
        },
        {
          id: 'worst_no',
          label: 'No',
          translations: { en: 'No', hi: 'नहीं (सामान्य सिरदर्द)', kn: 'ಇಲ್ಲ (ಸಾಮಾನ್ಯ ತಲೆನೋವು)' },
          keywords: { en: ['no', 'usual', 'normal'], hi: ['नहीं', 'सामान्य है'], kn: ['ಇಲ್ಲ', 'ಸಾಮಾನ್ಯ'] },
        },
      ],
    },
    {
      id: 'head_stiff',
      question: 'Do you have neck stiffness, high fever, or blurry vision?',
      translations: {
        en: 'Do you have neck stiffness, high fever, or blurry vision?',
        hi: 'क्या गर्दन में अकड़न, तेज बुखार या धुंधला दिखाई देने की समस्या है?',
        kn: 'ಕುತ್ತಿಗೆ ಬಿಗಿತ, ತೀವ್ರ ಜ್ವರ ಅಥವಾ ಮಸುಕಾದ ದೃಷ್ಟಿ ಇದೆಯೇ?',
      },
      flagOn: 'Yes',
      options: [
        {
          id: 'stiff_yes',
          label: 'Yes',
          translations: { en: 'Yes', hi: 'हाँ', kn: 'ಹೌದು' },
          isRedFlag: true,
          keywords: { en: ['yes', 'neck stiffness', 'blurry', 'double vision'], hi: ['हाँ', 'गर्दन अकड़न', 'धुंधला'], kn: ['ಹೌದು', 'ಕುತ್ತಿಗೆ ಬಿಗಿತ', 'ಮಸುಕು'] },
        },
        {
          id: 'stiff_no',
          label: 'No',
          translations: { en: 'No', hi: 'नहीं', kn: 'ಇಲ್ಲ' },
          keywords: { en: ['no', 'none'], hi: ['नहीं', 'सब ठीक'], kn: ['ಇಲ್ಲ', 'ಏನೂ ಇಲ್ಲ'] },
        },
      ],
    },
  ],
  other: [
    {
      id: 'other_dur',
      question: 'How long have you been feeling unwell?',
      translations: {
        en: 'How long have you been feeling unwell?',
        hi: 'यह परेशानी लगभग कितने समय से चल रही है?',
        kn: 'ಈ ತೊಂದರೆ ಸುಮಾರು ಎಷ್ಟು ದಿನಗಳಿಂದ ಇದೆ?',
      },
      options: [
        {
          id: 'few_hours',
          label: 'A few hours or today',
          translations: { en: 'A few hours or today', hi: 'कुछ घंटों से या आज से', kn: 'ಕೆಲವು ಗಂಟೆಗಳಿಂದ ಅಥವಾ ಇಂದು' },
          keywords: { en: ['today', 'hours'], hi: ['आज', 'कुछ घंटे'], kn: ['ಇಂದು', 'ಕೆಲವು ಗಂಟೆ'] },
        },
        {
          id: 'few_days',
          label: '2 to 7 days',
          translations: { en: '2 to 7 days', hi: '2 से 7 दिन', kn: '2 ರಿಂದ 7 ದಿನಗಳು' },
          keywords: { en: ['days', 'week'], hi: ['कुछ दिन', 'हफ्ता'], kn: ['ಕೆಲವು ದಿನ', 'ವಾರ'] },
        },
        {
          id: 'long_time',
          label: 'More than a week',
          translations: { en: 'More than a week', hi: 'एक सप्ताह से अधिक', kn: 'ಒಂದು ವಾರಕ್ಕಿಂತ ಹೆಚ್ಚು' },
          keywords: { en: ['more than week', 'long'], hi: ['एक सप्ताह से अधिक'], kn: ['ವಾರಕ್ಕಿಂತ ಹೆಚ್ಚು'] },
        },
      ],
    },
  ],
};

export const PAST_SAMPLE_DOCS: ScannedDocument[] = [
  {
    id: 'doc_1',
    name: 'Prescription — Dr. Rao Clinic',
    date: '12 Jun 2026',
    tag: 'Metformin 500mg (BD), Telmisartan 40mg',
    icon: '💊',
    summary: 'Diagnosed hypertension and type-2 diabetes mellitus on oral hypoglycemic therapy.',
  },
  {
    id: 'doc_2',
    name: 'Lab Report — Complete Blood Count (CBC)',
    date: '03 Feb 2026',
    tag: 'Hb: 11.2 g/dL, Platelets: 210k, WBC: Normal',
    icon: '🧪',
    summary: 'Mild microcytic anemia, normal total leukocyte count and platelet parameters.',
  },
  {
    id: 'doc_3',
    name: 'Discharge Summary — General Hospital',
    date: '18 Nov 2025',
    tag: 'Follow-up post acute bronchitis',
    icon: '📄',
    summary: 'Resolved lower respiratory tract infection, advised annual spirometry.',
  },
];

export const MOCK_DOCTOR_QUEUE: DoctorQueuePatient[] = [
  {
    id: 101,
    name: 'Ramesh Kumar',
    age: 54,
    gender: 'M',
    waitTime: '18 min',
    chiefComplaint: 'Chest pain radiating to left jaw & arm',
    isRedFlag: true,
    languageUsed: 'Hindi',
    languageCode: 'hi',
    isAbdmLinked: true,
    summary: [
      { label: 'Chief Complaint', value: 'Chest pain (Tightness / Heavy pressure)' },
      { label: 'Radiation', value: 'Spreading to left arm and jaw (High Risk)' },
      { label: 'Associated Signs', value: 'Cold sweating and dyspnea on exertion' },
      { label: 'Triage Note', value: 'Flagged for immediate STAT ECG & Troponin evaluation' },
    ],
    timeline: [
      { date: '14 Aug 2025', description: 'Discharge summary — Stent follow-up' },
      { date: 'Today (10:14 AM)', description: 'Voice intake completed: Acute angina presentation flagged' },
    ],
    clinicalNotes: '',
    isConfirmed: false,
  },
  {
    id: 102,
    name: 'Lakshmi Iyer',
    age: 31,
    gender: 'F',
    waitTime: '12 min',
    chiefComplaint: 'Fever (3rd day) with body aches',
    isRedFlag: false,
    languageUsed: 'Kannada',
    languageCode: 'kn',
    isAbdmLinked: true,
    summary: [
      { label: 'Chief Complaint', value: 'Fever (Moderate, 1 to 3 days)' },
      { label: 'Associated Symptoms', value: 'Severe body aches, chills, no vomiting' },
      { label: 'Recent Travel/Contact', value: 'None reported' },
      { label: 'Triage Note', value: 'Stable vital signs, suspected viral prodrome' },
    ],
    timeline: [
      { date: '03 Feb 2026', description: 'CBC Lab Report — Hb 11.2, Normal platelets' },
      { date: 'Today (10:20 AM)', description: 'Case note generated via Kannada voice assistant' },
    ],
    clinicalNotes: '',
    isConfirmed: false,
  },
  {
    id: 103,
    name: 'Abdul Salam',
    age: 46,
    gender: 'M',
    waitTime: '8 min',
    chiefComplaint: 'Cough (> 3 weeks) with trace blood',
    isRedFlag: true,
    languageUsed: 'English',
    languageCode: 'en',
    isAbdmLinked: false,
    summary: [
      { label: 'Chief Complaint', value: 'Chronic cough > 3 weeks with phlegm' },
      { label: 'Hemoptysis', value: 'Yes — blood flecks observed' },
      { label: 'Breathlessness', value: 'No acute dyspnea' },
      { label: 'Triage Note', value: 'Suspect pulmonary Kochs / Bronchiectasis, priority Sputum AFB & Chest X-Ray' },
    ],
    timeline: [
      { date: 'Today (10:25 AM)', description: 'Voice intake recorded: Flagged for early review' },
    ],
    clinicalNotes: '',
    isConfirmed: false,
  },
];
