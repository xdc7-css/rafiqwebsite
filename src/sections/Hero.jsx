import { motion } from 'framer-motion';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import { FiCheck } from 'react-icons/fi';
import PhoneMockup from '../components/PhoneMockup';
import BackgroundOrnaments from '../components/BackgroundOrnaments';
import { ANDROID_APK_URL } from '../constants/urls';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: [0.25, 0.1, 0.25, 1] },
});

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-bg-primary">
      <BackgroundOrnaments preset="hero" />

      {/* ========================= MOBILE ========================= */}
      <div className="lg:hidden relative z-10 px-6 pt-10 pb-12">
        <motion.h1
          className="text-center leading-[1.1] font-semibold tracking-tight mb-4"
          {...fadeUp(0.05)}
        >
          <span className="block text-[2.6rem] sm:text-[3.2rem] font-arabic text-white">صديقك</span>
          <span className="block text-[2.6rem] sm:text-[3.2rem] font-arabic text-gradient-gold">في قرآنك</span>
          <span className="block text-[2.6rem] sm:text-[3.2rem] font-arabic text-white">وذكرك</span>
        </motion.h1>

        <motion.p
          className="text-sm text-white/40 leading-[1.85] text-center max-w-[260px] mx-auto mb-7 font-arabic"
          {...fadeUp(0.1)}
        >
          صلاتك، قرآنك، أذكارك.
          <br />
          في تجربة واحدة هادئة.
        </motion.p>

        <motion.div className="mb-5" {...fadeUp(0.15)}>
          <div className="flex flex-col sm:flex-row gap-2.5 max-w-[320px] mx-auto">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="soon-btn flex-1 inline-flex items-center justify-center gap-2 bg-gold text-[#040B18] px-5 py-3 rounded-full text-sm font-semibold shadow-button font-arabic"
            >
              <FaApple size={15} />
              <span>App Store</span>
              <span className="soon-badge">SOON</span>
            </a>
            <a
              href={ANDROID_APK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-white/[0.06] text-white/85 px-5 py-3 rounded-full text-sm font-semibold border border-white/[0.08] font-arabic"
            >
              <FaGooglePlay size={15} />
              <span>Google Play</span>
            </a>
          </div>
        </motion.div>

        <motion.div className="flex items-center justify-center gap-4 mb-10" {...fadeUp(0.2)}>
          {['بدون إعلانات', 'مجاني', 'دون تعقيد'].map((text, i) => (
            <span key={i} className="flex items-center gap-1 text-[9px] text-white/30 font-arabic">
              <FiCheck size={9} className="text-gold/40" />
              {text}
            </span>
          ))}
        </motion.div>

        <motion.div className="flex justify-center" {...fadeUp(0.25)}>
          <div className="relative w-[65vw] max-w-[280px]">
            <PhoneMockup src={`${import.meta.env.BASE_URL}icons/front.png`} alt="تطبيق رفيق" floating />
            <div className="absolute -inset-6 bg-gold/[0.05] rounded-full blur-3xl -z-10" />
          </div>
        </motion.div>
      </div>

      {/* ========================= DESKTOP ========================= */}
      <div className="hidden lg:flex relative z-10 max-w-7xl mx-auto px-8 pt-14 pb-16 items-center justify-between gap-16">
        <div className="max-w-lg">
          <motion.h1
            className="text-6xl xl:text-7xl 2xl:text-8xl font-semibold tracking-tight leading-[1.05] mb-5 font-arabic"
            {...fadeUp(0.05)}
          >
            <span className="block text-white">صديقك</span>
            <span className="block text-gradient-gold">في قرآنك</span>
            <span className="block text-white">وذكرك</span>
          </motion.h1>

          <motion.p
            className="text-base text-white/40 leading-relaxed max-w-md mb-8 font-arabic"
            {...fadeUp(0.1)}
          >
            صلاتك، قرآنك، أذكارك، وأكثر. في مكان واحد.
            <br />
            لا إعلانات. لا تعقيد. يرافقك بهدوء.
          </motion.p>

          <motion.div className="flex items-center gap-3 mb-5" {...fadeUp(0.15)}>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="soon-btn inline-flex items-center gap-2.5 bg-gold text-[#040B18] px-8 py-3.5 rounded-full text-sm font-semibold shadow-button font-arabic"
            >
              <FaApple size={17} />
              App Store
              <span className="soon-badge">SOON</span>
            </a>
            <a
              href={ANDROID_APK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-white/[0.06] text-white/75 px-8 py-3.5 rounded-full text-sm font-semibold border border-white/[0.08] font-arabic"
            >
              <FaGooglePlay size={17} />
              Google Play
            </a>
          </motion.div>

          <motion.div className="flex items-center gap-4" {...fadeUp(0.2)}>
            {['بدون إعلانات', 'مجاني', 'دون تعقيد'].map((text, i) => (
              <span key={i} className="flex items-center gap-1.5 text-[10px] text-white/30 font-arabic">
                <FiCheck size={10} className="text-gold/40" />
                {text}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div className="w-[340px] shrink-0" {...fadeUp(0.25)}>
          <div className="relative">
            <PhoneMockup src={`${import.meta.env.BASE_URL}icons/front.png`} alt="تطبيق رفيق" floating parallax />
            <div className="absolute -inset-6 bg-gold/[0.05] rounded-full blur-3xl -z-10" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
