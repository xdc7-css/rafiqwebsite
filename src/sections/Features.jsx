import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiClock, FiBook, FiSunrise, FiCircle, FiCompass, FiBookOpen, FiSliders, FiStar, FiCalendar, FiMapPin, FiBell, FiTarget, FiHeadphones, FiBookmark, FiMoon, FiGlobe, FiSearch, FiLayout, FiVolume2 } from 'react-icons/fi';
import PhoneMockup from '../components/PhoneMockup';
import { EightPointStar, TwelvePointStar, GeometricRing, Arabesque, CircularRosette, CornerOrnament } from '../components/IslamicOrnaments';

const chapters = [
  {
    id: 'front',
    title: 'الاستقبال',
    description: 'قبل أي شيء، يحيّيك الهدوء. شاشة البداية ليست مجرد ترحيب. إنها مساحة صفاء تدعوك للبقاء.',
    src: '/icons/front.png',
    floatingCards: [
      { icon: FiStar, text: 'ترحيب أنيق', sub: 'جاهزة منذ اللحظة الأولى' },
      { icon: FiClock, text: 'حاضر دائمًا', sub: 'افتحه وابدأ رحلتك مباشرة' },
    ],
    highlights: [
      { icon: FiLayout, text: 'صُمم ليرافقك', sub: 'كل التفاصيل تهمس لا تصرخ' },
      { icon: FiStar, text: 'تجربة هادئة بلا تشتيت', sub: 'لا إعلانات ولا زحام بصري' },
      { icon: FiGlobe, text: 'هوية عربية أصيلة', sub: 'يتحدث بلغتك وتفاصيلك' },
    ],
    ornament: 'EightPointStar',
    bgGlow: 'from-gold/5 via-emerald-950/5 to-transparent',
    bgPulse: 'rgba(216, 178, 90, 0.04)',
    phoneRotation: -2,
  },
  {
    id: 'salaa',
    title: 'الصلاة',
    description: 'يومك كله ينتظم حولها. رفيق يذكّرك بها في وقتها، بهدوء يليق بقدسية اللحظة.',
    src: '/icons/salaa.png',
    floatingCards: [
      { icon: FiClock, text: 'موعد الصلاة القادم', sub: 'الفجر · ٥:٣٢ ص' },
      { icon: FiCalendar, text: 'التقويم الهجري', sub: '١٥ رمضان ١٤٤٦' },
    ],
    highlights: [
      { icon: FiMapPin, text: 'أوقات دقيقة', sub: 'تتكيّف مع موقعك بدقة' },
      { icon: FiBell, text: 'إشعارات هادئة', sub: 'تنبيه كطيف عابر لا يزعج' },
      { icon: FiTarget, text: 'طرق حساب متعددة', sub: 'اختر ما يناسب مشربك' },
    ],
    ornament: 'GeometricRing',
    bgGlow: 'from-amber-900/10 via-amber-800/3 to-transparent',
    bgPulse: 'rgba(245, 158, 11, 0.04)',
    phoneRotation: 0,
  },
  {
    id: 'quraan',
    title: 'القرآن',
    description: 'كلمات الله تأنس بها وحدك. اقرأ، استمع، واحفظ موضعك، وكأن المصحف في جيبك.',
    src: '/icons/quraan.png',
    floatingCards: [
      { icon: FiBook, text: 'آخر قراءة', sub: 'الكهف · آية ١' },
      { icon: FiHeadphones, text: 'تلاوة تختارها', sub: 'أصوات نخبة من القرّاء' },
    ],
    highlights: [
      { icon: FiBookmark, text: 'المصحف بين يديك', sub: 'بخط واضح ونقيّ' },
      { icon: FiHeadphones, text: 'أصوات تختارها', sub: 'لسانك يردد معهم' },
      { icon: FiGlobe, text: 'ترجمات ومعانٍ', sub: 'افهم ما تقرأ بلغتك' },
    ],
    ornament: 'CircularRosette',
    bgGlow: 'from-emerald-900/10 via-emerald-800/3 to-transparent',
    bgPulse: 'rgba(16, 185, 129, 0.04)',
    phoneRotation: 2,
  },
  {
    id: 'adkar',
    title: 'الأذكار',
    description: 'ذكر الله يملأ اليوم نوراً. رفيق يرتب لك أذكار الصباح والمساء وما بينهما بكل لطف.',
    src: '/icons/adkar.png',
    floatingCards: [
      { icon: FiSunrise, text: 'أذكار الصباح', sub: 'النور الأول لنهارك' },
      { icon: FiMoon, text: 'أذكار المساء', sub: 'سكينة تودّع بها يومك' },
    ],
    highlights: [
      { icon: FiStar, text: 'تأتيك في وقتها', sub: 'مرتبة بعناية حسب ساعتك' },
      { icon: FiVolume2, text: 'استمع وردّد', sub: 'تشغيل صوتي يسبق لسانك' },
      { icon: FiCircle, text: 'عداد لا ينسى', sub: 'يحفظ لك تسبيحاتك وأذكارك' },
    ],
    ornament: 'TwelvePointStar',
    bgGlow: 'from-sky-900/10 via-sky-800/3 to-transparent',
    bgPulse: 'rgba(14, 165, 233, 0.04)',
    phoneRotation: -1,
  },
  {
    id: 'sphaa',
    title: 'التسبيح',
    description: 'كلّما شغلت يدك، ذكر قلبك. حركات بسيطة تتحول إلى عبادة بلا تكلف.',
    src: '/icons/sphaa.png',
    floatingCards: [
      { icon: FiCircle, text: 'سبحان الله', sub: 'والحمد لله' },
      { icon: FiStar, text: 'الله أكبر', sub: 'لا إله إلا الله' },
    ],
    highlights: [
      { icon: FiCircle, text: 'لمسة واحدة', sub: 'تسبيح متواصل بلا جهد' },
      { icon: FiStar, text: 'تفاصيل مستوحاة من الفن الإسلامي', sub: 'لعينك راحة في كل نقرة' },
      { icon: FiClock, text: 'يحفظ عددك', sub: 'يعودك أينما توقفت' },
    ],
    ornament: 'CircularRosette',
    bgGlow: 'from-amber-900/10 via-gold/3 to-transparent',
    bgPulse: 'rgba(216, 178, 90, 0.05)',
    phoneRotation: 0,
  },
  {
    id: 'qibla',
    title: 'القبلة',
    description: 'أينما كنت، تعرف أين تتجه. بوصلة دقيقة ترشدك إلى القبلة دون اتصال ولا حيرة.',
    src: '/icons/qibla.png',
    floatingCards: [
      { icon: FiCompass, text: 'اتجاه القبلة', sub: 'قرص يوجهك بدقة' },
      { icon: FiMapPin, text: 'المسافة', sub: 'تعرف كم تبعد' },
    ],
    highlights: [
      { icon: FiCompass, text: 'بوصلة موثوقة', sub: 'دائماً معك أينما حللت' },
      { icon: FiGlobe, text: 'بلا إنترنت', sub: 'في البيت أو السفر تعمل' },
      { icon: FiMapPin, text: 'مدمجة بالخريطة', sub: 'أرضية وقمر صناعي' },
    ],
    ornament: 'GeometricRing',
    bgGlow: 'from-violet-900/10 via-violet-800/3 to-transparent',
    bgPulse: 'rgba(139, 92, 246, 0.04)',
    phoneRotation: 3,
  },
  {
    id: 'ahadeth',
    title: 'الأحاديث',
    description: 'كلمات النبوة تأتيك مختارة بعناية. تقرؤها في هدوء، تتدبرها بتأمل.',
    src: '/icons/ahadeth.png',
    floatingCards: [
      { icon: FiBookOpen, text: 'حديث اليوم', sub: 'من الصحيحين مختاراً' },
      { icon: FiSearch, text: 'بحث', sub: 'يصلك بما تبحث عنه' },
    ],
    highlights: [
      { icon: FiBookOpen, text: 'مجموعة صحيحة', sub: 'من البخاري ومسلم وغيرهما' },
      { icon: FiSearch, text: 'بحث سريع', sub: 'يصل إلى ما تريد في لحظة' },
      { icon: FiBookmark, text: 'احفظ ما تحب', sub: 'مكتبتك الخاصة من الأحاديث' },
    ],
    ornament: 'EightPointStar',
    bgGlow: 'from-indigo-900/10 via-indigo-800/3 to-transparent',
    bgPulse: 'rgba(99, 102, 241, 0.04)',
    phoneRotation: -2,
  },
  {
    id: 'settings',
    title: 'الإعدادات',
    description: 'لا يوجد حل واحد يناسب الجميع. رفيق يتيح لك أن تجعله كما تحب. من المظهر إلى التفاصيل.',
    src: '/icons/settings.png',
    floatingCards: [
      { icon: FiSliders, text: 'التخصيص', sub: 'اجعله تطبيقك أنت' },
      { icon: FiMoon, text: 'المظهر', sub: 'داكن أم فاتح' },
    ],
    highlights: [
      { icon: FiSliders, text: 'طرق الحساب', sub: 'اختر أسلوبك الذي تثق به' },
      { icon: FiLayout, text: 'المظهر الذي تريد', sub: 'لعينيك الراحة في كل وقت' },
      { icon: FiBell, text: 'تحكم كامل بالإشعارات', sub: 'لا شيء يزعجك دون إذنك' },
    ],
    ornament: 'Arabesque',
    bgGlow: 'from-zinc-900/10 via-zinc-800/3 to-transparent',
    bgPulse: 'rgba(161, 161, 170, 0.03)',
    phoneRotation: 1,
  },
];

const ornamentMap = {
  EightPointStar, TwelvePointStar, GeometricRing, Arabesque, CircularRosette,
};

function ChapterLabel({ number }) {
  const labels = ['الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس', 'السابع', 'الثامن'];
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="text-[10px] text-gold/40 tracking-[0.2em] font-mono" dir="ltr">
        {(number + 1).toString().padStart(2, '0')}
      </span>
      <div className="w-6 h-px bg-gold/20" />
      <span className="text-[10px] text-gold/30 tracking-[0.15em] font-arabic">
        الفصل {labels[number]}
      </span>
    </div>
  );
}

function FloatingCard({ card, index, className = '' }) {
  const Icon = card.icon;
  return (
    <motion.div
      className={`flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/[0.06] shadow-glass ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 + index * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -2, borderColor: 'rgba(216, 178, 90, 0.15)' }}
    >
      <div className="w-7 h-7 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
        <Icon size={12} className="text-gold/60" />
      </div>
      <div>
        <span className="text-xs text-white/70 font-arabic">{card.text}</span>
        <p className="text-[10px] text-white/30 font-arabic">{card.sub}</p>
      </div>
    </motion.div>
  );
}

function HighlightCard({ highlight, index }) {
  const Icon = highlight.icon;
  return (
    <motion.div
      className="flex items-center gap-3 px-4 py-3.5 rounded-2xl border border-white/[0.04] bg-white/[0.015]"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 + index * 0.08, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ borderColor: 'rgba(216, 178, 90, 0.1)' }}
    >
      <div className="w-6 h-6 rounded-lg bg-gold/8 flex items-center justify-center shrink-0">
        <Icon size={10} className="text-gold/40" />
      </div>
      <div>
        <span className="text-sm text-white/70 font-arabic">{highlight.text}</span>
        <p className="text-[10px] text-white/25 font-arabic">{highlight.sub}</p>
      </div>
    </motion.div>
  );
}

function FeatureBlock({ chapter, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const Ornament = ornamentMap[chapter.ornament] || EightPointStar;

  const isEven = index % 2 === 0;

  return (
    <section ref={ref} className="relative py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute inset-0 bg-gradient-to-b ${chapter.bgGlow}`} />
        <motion.div
          className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[150px]"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.6 } : {}}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{ backgroundColor: chapter.bgPulse }}
        />

        <div className={`absolute ${isEven ? 'top-[2%] left-[2%]' : 'top-[5%] right-[3%]'} opacity-30`}>
          <Ornament size={140} opacity={0.025} animate />
        </div>
        <div className={`absolute ${isEven ? 'bottom-[2%] right-[2%]' : 'bottom-[5%] left-[2%]'} opacity-20`}>
          <Ornament size={90} opacity={0.015} />
        </div>

        <div className={`absolute ${isEven ? 'top-[8%] right-[1%]' : 'top-[3%] left-[1%]'}`}>
          <CornerOrnament size={60} opacity={0.012} corner={isEven ? 'top-right' : 'top-left'} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <ChapterLabel number={index} />
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.05] font-arabic">
            {chapter.title}
          </h2>
          <p className="mt-4 text-sm md:text-base lg:text-lg text-white/35 leading-relaxed max-w-lg font-arabic">
            {chapter.description}
          </p>
        </motion.div>

        <div className="relative mt-16 md:mt-20 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.div
              animate={{ rotate: chapter.phoneRotation }}
              transition={{ type: 'spring', stiffness: 100, damping: 18 }}
            >
              <PhoneMockup
                src={chapter.src}
                alt={chapter.title}
                floating
                parallax
              />
            </motion.div>
          </motion.div>

          <div className="hidden lg:block absolute -left-8 md:-left-12 top-1/3">
            <FloatingCard card={chapter.floatingCards[0]} index={0} className="!flex-row-reverse" />
          </div>
          <div className="hidden lg:flex flex-col gap-3 absolute -right-8 md:-right-12 top-1/4">
            {chapter.floatingCards.slice(1).map((card, i) => (
              <FloatingCard key={i} card={card} index={i + 1} />
            ))}
          </div>
        </div>

        <div className="lg:hidden mt-8 flex flex-wrap justify-center gap-3">
          {chapter.floatingCards.map((card, i) => (
            <FloatingCard key={i} card={card} index={i} />
          ))}
        </div>

        <div className="mt-10 md:mt-12">
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <div className="w-4 h-px bg-gold/20" />
            <span className="text-[10px] text-gold/30 tracking-[0.15em] font-arabic">صُمّمت بعناية</span>
          </motion.div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {chapter.highlights.map((h, i) => (
              <HighlightCard key={i} highlight={h} index={i} />
            ))}
          </div>
        </div>
      </div>

      {index < chapters.length - 1 && (
        <div className="max-w-4xl mx-auto px-6 mt-16 md:mt-20">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/8 to-transparent" />
        </div>
      )}
    </section>
  );
}

export default function Features() {
  return (
    <section id="features" className="relative">
      {chapters.map((chapter, i) => (
        <FeatureBlock key={chapter.id} chapter={chapter} index={i} />
      ))}
    </section>
  );
}
