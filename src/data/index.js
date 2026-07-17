import { FiSunrise, FiBook, FiCircle, FiBookOpen, FiCompass } from 'react-icons/fi';

export const navLinks = [
  { label: 'الرئيسية', labelEn: 'Home', href: '#hero' },
  { label: 'الرحلة', labelEn: 'Journey', href: '#why-rafiq' },
  { label: 'المميزات', labelEn: 'Features', href: '#features' },
  { label: 'المعرض', labelEn: 'Showcase', href: '#showcase' },
  { label: 'الأسئلة', labelEn: 'FAQ', href: '#faq' },
  { label: 'التواصل', labelEn: 'Contact', href: '#footer' },
];

const rawShowcaseItems = [
  { src: '/icons/main.png', alt: 'الرئيسية', label: 'الرئيسية' },
  { src: '/icons/salaa.png', alt: 'مواقيت الصلاة', label: 'مواقيت الصلاة' },
  { src: '/icons/quraan.png', alt: 'المصحف الكريم', label: 'المصحف' },
  { src: '/icons/adkar.png', alt: 'الأذكار', label: 'الأذكار' },
  { src: '/icons/ahadeth.png', alt: 'الأحاديث', label: 'الأحاديث' },
  { src: '/icons/qibla.png', alt: 'اتجاه القبلة', label: 'القبلة' },
  { src: '/icons/sphaa.png', alt: 'التسبيح', label: 'التسبيح' },
  { src: '/icons/settings.png', alt: 'الإعدادات', label: 'الإعدادات' },
  { src: '/icons/min1.png', alt: 'واجهات أخرى', label: 'واجهات' },
  { src: '/icons/quraann.png', alt: 'سورة الكهف', label: 'الكهف' },
];

export const showcaseItems = rawShowcaseItems.map(item => ({
  ...item,
  src: `${import.meta.env.BASE_URL}${item.src.replace(/^\//, '')}`
}));

export const dailyJourney = [
  {
    time: 'قبل الفجر',
    timeEn: 'Before Dawn',
    title: 'استيقظ على نور',
    titleEn: 'Wake to Light',
    description: 'أذكار الصباح تسبق شروق الشمس.',
    icon: FiSunrise,
    iconBg: 'from-amber-400/20 to-amber-600/5',
  },
  {
    time: 'الفجر',
    timeEn: 'Fajr',
    title: 'صلاة الفجر',
    titleEn: 'Fajr Prayer',
    description: 'أول النور وآخر الظلام.',
    icon: FiSunrise,
    iconBg: 'from-sky-400/20 to-sky-600/5',
  },
  {
    time: 'الضحى',
    timeEn: 'Mid-Morning',
    title: 'مع القرآن',
    titleEn: 'With the Quran',
    description: 'آيات تتلوها وأنت في صفاء.',
    icon: FiBook,
    iconBg: 'from-emerald-400/20 to-emerald-600/5',
  },
  {
    time: 'الظهيرة',
    timeEn: 'Noon',
    title: 'تسبيحة وسط اليوم',
    titleEn: 'Midday Tasbeeh',
    description: 'ثلاث كلمات تملأ الميزان.',
    icon: FiCircle,
    iconBg: 'from-gold/20 to-gold/5',
  },
  {
    time: 'العصر',
    timeEn: 'Afternoon',
    title: 'بصيرة نبوية',
    titleEn: 'Prophetic Insight',
    description: 'حديث يختار لك ما ينفعك.',
    icon: FiBookOpen,
    iconBg: 'from-indigo-400/20 to-indigo-600/5',
  },
  {
    time: 'المغرب',
    timeEn: 'Sunset',
    title: 'اتجاهك إلى القبلة',
    titleEn: 'Qibla Direction',
    description: 'أينما كنت، تعرف أين تتجه.',
    icon: FiCompass,
    iconBg: 'from-violet-400/20 to-violet-600/5',
  },
  {
    time: 'العشاء',
    timeEn: 'Evening',
    title: 'أذكار المساء',
    titleEn: 'Evening Adhkar',
    description: 'يومك يغلق بسلام.',
    icon: FiSunrise,
    iconBg: 'from-orange-400/20 to-orange-600/5',
  },
];

export const faqs = [
  {
    question: 'ما الذي يميز رفيق؟',
    answer: 'رفيق ليس مجرد تطبيق إسلامي. إنه مساحة رقمية هادئة تجمع صلاتك، قرآنك، أذكارك، وأكثر. لا إعلانات ولا تعقيد. صمم ليكون رفيق يومك، لا أداة عابرة.',
  },
  {
    question: 'هل التطبيق مجاني حقاً؟',
    answer: 'نعم، بالكامل. لا إعلانات، لا اشتراكات، ولا مفاجآت. كل الميزات متاحة بلا مقابل.',
  },
  {
    question: 'هل يعمل بدون إنترنت؟',
    answer: 'أوقات الصلاة، المصحف كاملاً، وبوصلة القبلة تعمل دون اتصال. التلاوات الصوتية والترجمات تحتاج تحميلاً واحداً فقط.',
  },
  {
    question: 'كيف يحسب أوقات الصلاة؟',
    answer: 'يعتمد على موقعك بدقة، مع خيارات متعددة: أم القرى، الهيئة المصرية، رابطة العالم الإسلامي، وغيرها.',
  },
  {
    question: 'متى سيتوفر التطبيق؟',
    answer: 'قريباً على iOS و Android. تابعنا عبر حساباتنا لتصلك أخبار الإطلاق.',
  },
  {
    question: 'كيف أبدأ؟',
    answer: 'حمّل التطبيق عند توفره. لا حساب ولا تسجيل. افتح وابدأ.',
  },
];

export const footerLinks = [
  { label: 'حمّل', labelEn: 'Download', href: '#download' },
  { label: 'الميزات', labelEn: 'Features', href: '#features' },
  { label: 'أسئلة', labelEn: 'FAQ', href: '#faq' },
  { label: 'تواصل', labelEn: 'Contact', href: '#footer' },
];
