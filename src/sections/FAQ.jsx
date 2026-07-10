import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { faqs } from '../data';
import BackgroundOrnaments from '../components/BackgroundOrnaments';

function FaqCard({ faq, isOpen, onClick, index }) {
  const ref = useRef(null);

  return (
    <motion.div
      ref={ref}
      className="rounded-card border border-white/[0.04] cursor-pointer select-none overflow-hidden"
      style={{
        backgroundColor: isOpen ? 'rgba(216, 178, 90, 0.02)' : 'transparent',
        borderColor: isOpen ? 'rgba(216, 178, 90, 0.1)' : 'rgba(255,255,255,0.04)',
      }}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ borderColor: 'rgba(216, 178, 90, 0.08)' }}
      onClick={onClick}
      layout
    >
      <div className="px-6 md:px-8 py-5">
        <div className="flex items-start gap-4" aria-expanded={isOpen}>
          <span className="text-xs text-gold/30 font-mono mt-0.5 shrink-0 w-5 text-left" dir="ltr">
            {(index + 1).toString().padStart(2, '0')}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <span className="text-sm md:text-base font-medium text-white/80 leading-relaxed font-arabic">{faq.question}</span>
              <motion.div
                className="w-5 h-5 rounded-full shrink-0 mt-0.5 flex items-center justify-center"
                style={{
                  backgroundColor: isOpen ? 'rgba(216, 178, 90, 0.1)' : 'rgba(255,255,255,0.04)',
                }}
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className={isOpen ? 'text-gold/50' : 'text-white/20'}>
                  <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </motion.div>
            </div>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  className="overflow-hidden"
                >
                  <motion.p
                    className="pt-3 pb-1 text-sm text-white/40 leading-relaxed font-arabic"
                    initial={{ y: -4 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    {faq.answer}
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SectionHeading() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="max-w-2xl mx-auto mb-12 md:mb-14">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-6 h-px bg-gold/30" />
          <span className="text-[10px] text-gold/40 tracking-[0.25em] font-arabic">أسئلة متوقعة</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white leading-tight font-arabic">
          إجابات شافية.
        </h2>
      </motion.div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="py-14 md:py-16 relative">
      <BackgroundOrnaments preset="faq" />

      <div className="max-w-2xl mx-auto px-6 lg:px-8">
        <SectionHeading />
        <div className="space-y-2.5">
          {faqs.map((faq, i) => (
            <FaqCard
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
