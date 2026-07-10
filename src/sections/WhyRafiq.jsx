import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiArrowDown } from 'react-icons/fi';
import { dailyJourney } from '../data';
import BackgroundOrnaments from '../components/BackgroundOrnaments';

function TimelineCard({ item, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const Icon = item.icon;

  return (
    <motion.div
      ref={ref}
      className="relative flex items-start gap-5 group"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: 'spring', stiffness: 100, damping: 20, mass: 0.8, delay: index * 0.12 }}
    >
      <div className="flex flex-col items-center">
        <motion.div
          className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.iconBg} border border-white/[0.06] flex items-center justify-center text-gold transition-all duration-500 group-hover:border-gold/30`}
          whileHover={{ scale: 1.08 }}
        >
          <Icon size={18} />
        </motion.div>
        {index < dailyJourney.length - 1 && (
          <motion.div
            className="w-px flex-1 min-h-[32px] mt-2"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.7, delay: index * 0.12 + 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ originY: 0 }}
          >
            <div className="w-full h-full bg-gradient-to-b from-gold/25 to-gold/5" />
          </motion.div>
        )}
      </div>

      <div className="flex-1 pb-8 pt-0.5">
        <motion.span
          className="text-[10px] text-gold/50 font-medium tracking-[0.2em] font-arabic"
          initial={{ opacity: 0, x: -8 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.3, delay: index * 0.12 + 0.08 }}
        >
          {item.time}
        </motion.span>
        <motion.h4
          className="text-lg font-semibold text-white mt-0.5 font-arabic"
          initial={{ opacity: 0, x: -8 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.3, delay: index * 0.12 + 0.12 }}
        >
          {item.title}
        </motion.h4>
        <motion.p
          className="text-sm text-white/40 mt-1 leading-relaxed font-arabic"
          initial={{ opacity: 0, x: -8 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.3, delay: index * 0.12 + 0.16 }}
        >
          {item.description}
        </motion.p>
      </div>
    </motion.div>
  );
}

export default function WhyRafiq() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, amount: 0.3 });
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.3 });

  return (
    <section id="why-rafiq" className="relative py-16 md:py-20 overflow-hidden">
      <BackgroundOrnaments preset="whyRafiq" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-6 h-px bg-gold/30" />
            <span className="text-[10px] text-gold/40 tracking-[0.25em] font-arabic">رحلة يومك مع رفيق</span>
            <div className="w-6 h-px bg-gold/30" />
          </div>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight text-white font-arabic"
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: 'spring', stiffness: 110, damping: 22, mass: 0.8 }}
          >
            يصحبك طوال اليوم.
            <br />
            <span className="text-gradient-gold">من الفجر إلى العشاء.</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-2 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <h3 className="text-3xl md:text-4xl font-semibold text-white leading-tight font-arabic">
                رحلة منظمة
                <br />
                <span className="text-white/50">للقلب</span>
                <br />
                <span className="text-white/50">والروح</span>
              </h3>

              <p className="mt-5 text-sm text-white/35 leading-relaxed font-arabic">
                رفيق لا يتركك. يذكّرك بالله في كل محطة من يومك. صباحاً بأذكار. ظهراً بتلاوة. مساءً بحكمة. اليوم كله منظّم بهدوء.
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {['سكينة', 'نظام', 'روحانية', 'حضور', 'دقة'].map((w) => (
                  <span key={w} className="px-3 py-1.5 text-[11px] bg-white/[0.03] text-white/40 rounded-button border border-white/[0.05] font-arabic">{w}</span>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-3">
            <div className="max-w-md mx-auto lg:mx-0">
              {dailyJourney.map((item, i) => (
                <TimelineCard key={item.title} item={item} index={i} />
              ))}
            </div>
          </div>
        </div>

        <div ref={ctaRef} className="text-center max-w-3xl mx-auto mt-16">
          <motion.div
            className="w-10 h-px bg-gold/30 mx-auto mb-8"
            initial={{ scaleX: 0 }}
            animate={ctaInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          />
          <motion.h3
            className="text-3xl md:text-4xl font-semibold tracking-tight text-white leading-tight font-arabic"
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: 'spring', stiffness: 120, damping: 24, mass: 0.7, delay: 0.1 }}
          >
            يرافقك بلا إزعاج.
            <br />
            <span className="text-gradient-gold">بكل ما تحتاج.</span>
          </motion.h3>
          <motion.p
            className="mt-4 text-sm text-white/35 leading-relaxed max-w-md mx-auto font-arabic"
            initial={{ opacity: 0, y: 12 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            من أول نور في صباحك إلى آخر ذكر تطمئن به قبل النوم. رفيق معك. بهدوء. بلا إعلانات. بلا تعقيد.
          </motion.p>

          <motion.a
            href="#download"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 mt-8 text-gold/40 hover:text-gold/60 transition-colors duration-300 cursor-pointer font-arabic"
            initial={{ opacity: 0, y: 8 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="text-xs tracking-widest">اكتشف المزيد</span>
            <motion.div>
              <FiArrowDown size={12} />
            </motion.div>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
