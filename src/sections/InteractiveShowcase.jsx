import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import PhoneMockup from '../components/PhoneMockup';
import { showcaseItems } from '../data';
import BackgroundOrnaments from '../components/BackgroundOrnaments';

export default function InteractiveShowcase() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const next = () => setActive((prev) => (prev + 1) % showcaseItems.length);
  const prev = () => setActive((prev) => (prev - 1 + showcaseItems.length) % showcaseItems.length);

  return (
    <section id="showcase" ref={sectionRef} className="py-16 md:py-20 relative overflow-hidden">
      <BackgroundOrnaments preset="showcase" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-px bg-gold/30" />
            <span className="text-[10px] text-gold/40 tracking-[0.25em] font-arabic">جولة سريعة في الشاشات</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-tight font-arabic">
            شاهد بنفسك
          </h2>
          <p className="text-sm text-white/30 mt-2 font-arabic">شاشة بعد شاشة. تجربة تتحدث بالصورة.</p>
        </motion.div>

        <div className="relative">
          <div className="flex items-center justify-center gap-6 lg:gap-12">
            <motion.button
              onClick={prev}
              className="hidden md:flex w-11 h-11 items-center justify-center rounded-full bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] cursor-pointer text-white/40 hover:text-gold transition-colors duration-300"
              whileTap={{ scale: 0.9 }}
              aria-label="السابق"
            >
              <FiChevronLeft size={16} />
            </motion.button>

            <div className="flex items-center justify-center gap-4 md:gap-8">
              <motion.div
                className="hidden lg:block pointer-events-none"
                animate={{ opacity: 0.12, scale: 0.5, filter: 'blur(3px)' }}
                transition={{ type: 'spring', stiffness: 150, damping: 20 }}
              >
                <PhoneMockup
                  src={showcaseItems[(active - 1 + showcaseItems.length) % showcaseItems.length].src}
                  alt={showcaseItems[(active - 1 + showcaseItems.length) % showcaseItems.length].alt}
                  floating={false}
                  parallax={false}
                />
              </motion.div>

              <div className="relative">
                <motion.div
                  className="absolute -inset-6 bg-gold/[0.04] rounded-[60px] blur-2xl"
                  key={active}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, scale: 0.92, rotateY: -6 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.92, rotateY: 6 }}
                    transition={{ type: 'spring', stiffness: 180, damping: 22, mass: 0.7 }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <PhoneMockup
                      src={showcaseItems[active].src}
                      alt={showcaseItems[active].alt}
                      floating
                      parallax
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <motion.div
                className="hidden lg:block pointer-events-none"
                animate={{ opacity: 0.12, scale: 0.5, filter: 'blur(3px)' }}
                transition={{ type: 'spring', stiffness: 150, damping: 20 }}
              >
                <PhoneMockup
                  src={showcaseItems[(active + 1) % showcaseItems.length].src}
                  alt={showcaseItems[(active + 1) % showcaseItems.length].alt}
                  floating={false}
                  parallax={false}
                />
              </motion.div>
            </div>

            <motion.button
              onClick={next}
              className="hidden md:flex w-11 h-11 items-center justify-center rounded-full bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] cursor-pointer text-white/40 hover:text-gold transition-colors duration-300"
              whileTap={{ scale: 0.9 }}
              aria-label="التالي"
            >
              <FiChevronRight size={16} />
            </motion.button>
          </div>

          <div className="flex items-center justify-center gap-3 mt-8">
            <motion.button
              onClick={prev}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-white/[0.03] border border-white/[0.06] cursor-pointer text-white/40"
              whileTap={{ scale: 0.9 }}
              aria-label="السابق"
            >
              <FiChevronLeft size={14} />
            </motion.button>

            <div className="flex gap-2">
              {showcaseItems.slice(0, 8).map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActive(i)}
                  className="rounded-full cursor-pointer"
                  animate={{
                    width: i === active ? 32 : 6,
                    height: 6,
                    backgroundColor: i === active ? '#D8B25A' : 'rgba(255,255,255,0.08)',
                  }}
                  whileHover={{ backgroundColor: i === active ? '#D8B25A' : 'rgba(255,255,255,0.2)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                  aria-label={`عرض ${showcaseItems[i].label}`}
                />
              ))}
            </div>

            <motion.button
              onClick={next}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-white/[0.03] border border-white/[0.06] cursor-pointer text-white/40"
              whileTap={{ scale: 0.9 }}
              aria-label="التالي"
            >
              <FiChevronRight size={14} />
            </motion.button>
          </div>

          <motion.p
            className="text-center text-sm text-gold/50 font-medium mt-4 font-arabic"
            key={active}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {showcaseItems[active].label}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
