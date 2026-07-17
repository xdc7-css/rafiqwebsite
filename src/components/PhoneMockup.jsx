import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function PhoneMockup({ src, alt = '', className = '', floating = true, parallax = true, ...props }) {
  const ref = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!parallax) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientY - centerY) / 20;
    const y = (e.clientX - centerX) / -20;
    setRotate({ x: Math.max(-8, Math.min(8, x)), y: Math.max(-8, Math.min(8, y)) });
  };

  const handleMouseLeave = () => setRotate({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      className={`relative inline-block select-none ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={
        parallax
          ? { rotateX: rotate.x, rotateY: rotate.y }
          : floating
          ? { y: [0, -8, 0] }
          : {}
      }
      transition={
        parallax
          ? { type: 'spring', stiffness: 200, damping: 20 }
          : { duration: 4, repeat: Infinity, ease: 'easeInOut' }
      }
      {...props}
    >
      <div className="relative w-[260px] h-[530px] bg-[#0a0a0a] rounded-[44px] shadow-phone overflow-hidden border-[2px] border-white/[0.08]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[26px] bg-[#0a0a0a] rounded-b-[12px] z-20 flex items-center justify-center">
          <div className="w-12 h-3 bg-[#1a1a1a] rounded-full" />
        </div>
        <div className="absolute top-[10px] right-[14px] w-[3px] h-[32px] bg-[#2a2a2a] rounded-full z-20" />
        <div className="absolute top-[50px] right-[14px] w-[3px] h-[24px] bg-[#2a2a2a] rounded-full z-20" />
        <div className="absolute top-[90px] right-[14px] w-[3px] h-[48px] bg-[#2a2a2a] rounded-full z-20" />
        <div className="absolute left-[14px] top-[140px] w-[3px] h-[36px] bg-[#2a2a2a] rounded-full z-20" />
        <div className="absolute left-[14px] top-[184px] w-[3px] h-[36px] bg-[#2a2a2a] rounded-full z-20" />
        <div className="absolute left-[14px] top-[228px] w-[3px] h-[36px] bg-[#2a2a2a] rounded-full z-20" />

        <div className="relative w-full h-full overflow-hidden rounded-[40px]">
          {src ? (
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-surface">
              <span className="text-white/20 text-sm font-medium">الشاشة</span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-black/20 pointer-events-none" />
          <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-white/[0.04] to-transparent pointer-events-none" />
        </div>

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[100px] h-[3px] bg-white/30 rounded-full z-20" />
      </div>

      <div className="absolute -inset-2 bg-gradient-to-b from-gold/5 via-transparent to-black/20 rounded-[52px] blur-xl -z-10 opacity-50" />
      <div className="absolute top-6 -right-3 w-16 h-16 bg-gold/[0.04] rounded-full blur-2xl -z-10" />
      <div className="absolute bottom-12 -left-3 w-12 h-12 bg-gold/[0.06] rounded-full blur-2xl -z-10" />
    </motion.div>
  );
}
