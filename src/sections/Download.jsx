import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import { FiMonitor, FiStar } from 'react-icons/fi';
import PhoneMockup from '../components/PhoneMockup';
import MagneticButton from '../components/MagneticButton';
import BackgroundOrnaments from '../components/BackgroundOrnaments';

const stars = Array(5).fill(null);

export default function Download() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const phoneRef = useRef(null);
  const phoneInView = useInView(phoneRef, { once: true, amount: 0.3 });

  return (
    <section id="download" className="relative py-16 md:py-20 overflow-hidden">
      <BackgroundOrnaments preset="download" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
          <motion.div
            className="order-2 lg:order-1 flex justify-center lg:justify-start"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div ref={phoneRef}>
              <motion.div
                initial={{ opacity: 0, x: -40, rotateY: -6 }}
                animate={phoneInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <PhoneMockup src="/icons/main.png" alt="تطبيق رفيق" floating parallax />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="order-1 lg:order-2 flex flex-col justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex items-center gap-2 mb-5">
              <span className="w-5 h-px bg-gold/40" />
              <span className="text-[10px] text-gold/40 tracking-[0.15em] font-arabic">رحلتك تبدأ</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-tight font-arabic">
              وقتك الأجمل<br />
              <span className="text-gradient-gold">يبدأ من هنا</span>
            </h2>

            <p className="mt-4 text-sm text-white/35 leading-relaxed max-w-sm font-arabic">
              لا إعلانات ولا حسابات. فقط مساحة روحانية هادئة تنتظرك.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <MagneticButton>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="soon-btn group inline-flex items-center gap-2.5 bg-gold text-[#040B18] px-7 py-3 rounded-button text-sm font-semibold shadow-button font-arabic"
                >
                  <FaApple size={17} />
                  App Store
                  <span className="soon-badge">SOON</span>
                </a>
              </MagneticButton>
              <a
                href="#"
                className="inline-flex items-center gap-2.5 border border-white/[0.1] text-white/65 px-7 py-3 rounded-button text-sm font-medium hover:bg-white/[0.04] transition-all duration-300 font-arabic"
              >
                <FaGooglePlay size={17} />
                Google Play
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-white/20 hover:text-white/40 px-3 py-3 rounded-button text-xs font-medium transition-all duration-300"
              >
                <FiMonitor size={15} />
                Web
              </a>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.04]">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-0.5">
                  {stars.map((_, i) => (
                    <FiStar key={i} size={11} className="text-gold/40 fill-gold/40" />
                  ))}
                </div>
                <span className="text-xs text-white/20 font-arabic">تجربة روحانية · تصميم راقٍ</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-16 md:mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-[11px] text-white/15 tracking-widest font-arabic">
            مجاني بالكامل · بلا إعلانات · بلا اشتراكات
          </p>
        </motion.div>
      </div>
    </section>
  );
}
