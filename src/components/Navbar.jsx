import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { FiDownload, FiMenu, FiX } from 'react-icons/fi';

const navItems = [
  { label: 'الرئيسية', href: '#hero' },
  { label: 'الرحلة', href: '#why-rafiq' },
  { label: 'المميزات', href: '#features' },
  { label: 'المعرض', href: '#showcase' },
  { label: 'الأسئلة', href: '#faq' },
  { label: 'التواصل', href: '#footer' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [width, setWidth] = useState(1200);
  const [mouseHovered, setMouseHovered] = useState(false);

  const navRef = useRef(null);
  const containerRef = useRef(null);

  // Smooth mouse coordinates for specular reflection
  const mouseX = useMotionValue(600);
  const mouseY = useMotionValue(38);
  const springX = useSpring(mouseX, { stiffness: 140, damping: 24, mass: 0.15 });
  const springY = useSpring(mouseY, { stiffness: 140, damping: 24, mass: 0.15 });

  const scrollToSection = useCallback((href) => {
    setMobileOpen(false);
    setHoveredIndex(null);
    let targetId = href.slice(1);
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const sectionIds = navItems.map(l => l.href.slice(1));

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      for (const id of sectionIds.slice().reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 180) {
          setActiveSection(id);
          return;
        }
      }
      setActiveSection('');
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Responsive SVG Width tracker
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    setMouseHovered(true);
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    setMouseHovered(false);
    mouseX.set(width / 2);
    mouseY.set(scrolled ? 34 : 38);
  };

  const activeIndex = navItems.findIndex(i => i.href.slice(1) === activeSection);
  const currentIndex = hoveredIndex !== null ? hoveredIndex : (activeIndex !== -1 ? activeIndex : null);

  // Dynamic SVG Path Calculations for long gradually-descending Apple curves (transitionWidth = 180px)
  const transitionWidth = 180;

  const d_expanded = `M 0 0 C 90 0, 90 76, ${transitionWidth} 76 L ${width - transitionWidth} 76 C ${width - 90} 76, ${width - 90} 0, ${width} 0 Z`;
  const d_collapsed = `M 0 0 C 90 0, 90 68, ${transitionWidth} 68 L ${width - transitionWidth} 68 C ${width - 90} 68, ${width - 90} 0, ${width} 0 Z`;

  return (
    <>
      {/* ====== DESKTOP NAVBAR ====== */}
      <motion.div
        ref={navRef}
        className="fixed z-40 hidden lg:block"
        style={{
          top: 0,
          left: '50%',
          x: '-50%',
          width: 'min(1200px, 92vw)',
          height: 76,
        }}
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} // Ease Out Expo
      >
        <div
          ref={containerRef}
          className="relative w-full h-full select-none"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Recessed SVG Chassis Background */}
          <motion.svg
            width={width}
            height={76}
            viewBox={`0 0 ${width} 76`}
            className="absolute inset-0 pointer-events-none"
            style={{
              filter: scrolled
                ? 'drop-shadow(0 10px 24px rgba(0, 0, 0, 0.22))'
                : 'drop-shadow(0 8px 24px rgba(0, 0, 0, 0.18))',
            }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <defs>
              {/* Linear Gradient: Slightly brighter than page (#182230 -> #131C28 -> #101722) */}
              <linearGradient id="chassis-bg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#182230" />
                <stop offset="50%" stopColor="#131C28" />
                <stop offset="100%" stopColor="#101722" />
              </linearGradient>

              {/* Edge Blending Border Gradient (Fades to 0 opacity at horizontal page edges) */}
              <linearGradient id="border-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
                <stop offset="15%" stopColor="rgba(255, 255, 255, 0.05)" />
                <stop offset="85%" stopColor="rgba(255, 255, 255, 0.05)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
              </linearGradient>

              {/* Specular reflection */}
              <radialGradient id="specular-grad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.03)" />
                <stop offset="50%" stopColor="rgba(255, 255, 255, 0.008)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
              </radialGradient>

              {/* Top Studio Lighting Highlight Gradient (Top-most edge stroke light) */}
              <linearGradient id="stroke-light" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.07)" />
                <stop offset="15%" stopColor="rgba(255, 255, 255, 0.02)" />
                <stop offset="50%" stopColor="rgba(255, 255, 255, 0)" />
              </linearGradient>

              {/* Soft White Inset Highlight simulation (Top edge of the carved recess) */}
              <linearGradient id="inner-shadow-top" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.10)" />
                <stop offset="4%" stopColor="rgba(255, 255, 255, 0.04)" />
                <stop offset="15%" stopColor="rgba(255, 255, 255, 0)" />
              </linearGradient>

              {/* Deep Bottom Inset Shadow simulation */}
              <linearGradient id="inner-shadow-bottom" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(0, 0, 0, 0)" />
                <stop offset="60%" stopColor="rgba(0, 0, 0, 0.12)" />
                <stop offset="100%" stopColor="rgba(0, 0, 0, 0.35)" />
              </linearGradient>

              {/* Clip path mapping */}
              <clipPath id="chassis-clip">
                <motion.path
                  d={scrolled ? d_collapsed : d_expanded}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                />
              </clipPath>

              {/* Sandblasted metal grain noise */}
              <filter id="grain">
                <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" result="noise" />
                <feColorMatrix type="matrix" values="0 0 0 0 1   0 0 0 0 1   0 0 0 0 1  0 0 0 0.022 0" />
                <feComposite operator="in" in2="SourceGraphic" />
              </filter>
            </defs>

            {/* Base Fill & Texture (Clipped to contour) */}
            <g clipPath="url(#chassis-clip)">
              {/* Linear gradient background */}
              <rect width="100%" height="100%" fill="url(#chassis-bg)" />

              {/* Sandblasted metal texture */}
              <rect width="100%" height="100%" filter="url(#grain)" style={{ mixBlendMode: 'overlay' }} />

              {/* Specular mouse glide light */}
              <motion.circle
                cx={springX}
                cy={springY}
                r="300"
                fill="url(#specular-grad)"
                animate={{ opacity: mouseHovered ? 1 : 0 }}
                transition={{ duration: 0.4 }}
                style={{ mixBlendMode: 'overlay' }}
              />

              {/* Physical Recess Inset Shadows */}
              <rect width="100%" height="100%" fill="url(#inner-shadow-top)" />
              <rect width="100%" height="100%" fill="url(#inner-shadow-bottom)" />
            </g>

            {/* Top edge lighting stroke */}
            <motion.path
              d={scrolled ? d_collapsed : d_expanded}
              fill="none"
              stroke="url(#stroke-light)"
              strokeWidth={1.5}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            />

            {/* 1px Blended Outer Boundary Border */}
            <motion.path
              d={scrolled ? d_collapsed : d_expanded}
              fill="none"
              stroke="url(#border-grad)"
              strokeWidth={1}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </motion.svg>

          {/* Interactive Content Container */}
          <motion.div
            className="absolute left-0 right-0 bottom-0 z-10 flex items-center justify-between"
            style={{
              paddingLeft: transitionWidth + 12,
              paddingRight: transitionWidth + 12,
            }}
            animate={{
              height: scrolled ? 68 : 76
            }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Logo */}
            <div className="flex items-center gap-3 py-1 select-none shrink-0">
              <img
                src={`${import.meta.env.BASE_URL}icons/logo.svg`}
                alt="رفيق"
                className="w-[18px] h-[18px]"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <span className="logo-wordmark logo-wordmark-sm tracking-[0.2px] text-white/95" style={{ fontWeight: 600 }}>
                رَفِيقْ
              </span>
            </div>

            {/* Separator 1 */}
            <div className="w-px h-[20px] bg-white/10 opacity-[0.06] shrink-0" />

            {/* Navigation Menu */}
            <div className="flex items-center justify-center flex-1 gap-2" style={{ direction: 'rtl' }}>
              {navItems.map((item, i) => {
                const isActive = activeSection === item.href.slice(1);
                const isHovered = hoveredIndex === i;
                const isCurrent = currentIndex === i;

                return (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    onMouseEnter={() => setHoveredIndex(i)}
                    className="relative px-5 py-2 text-[13px] font-medium tracking-[0.2px] font-arabic cursor-pointer transition-colors duration-200 select-none"
                    style={{
                      color: isActive
                        ? '#D8B25A'
                        : (isHovered ? '#FFFFFF' : 'rgba(255, 255, 255, 0.75)'),
                    }}
                  >
                    {isCurrent && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute rounded-full pointer-events-none"
                        style={{
                          zIndex: 0,
                        }}
                        animate={{
                          top: hoveredIndex !== null ? 2 : 5,
                          bottom: hoveredIndex !== null ? 2 : 5,
                          left: hoveredIndex !== null ? 4 : 8,
                          right: hoveredIndex !== null ? 4 : 8,
                          backgroundColor: hoveredIndex !== null ? 'rgba(216, 178, 90, 0.025)' : 'rgba(216, 178, 90, 0.015)',
                          border: hoveredIndex !== null
                            ? '1px solid rgba(216, 178, 90, 0.20)'
                            : '1px solid rgba(216, 178, 90, 0.15)',
                          boxShadow: hoveredIndex !== null
                            ? '0 0 12px rgba(216, 178, 90, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.02)'
                            : '0 0 8px rgba(216, 178, 90, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.01)',
                        }}
                        transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
                      />
                    )}
                    {/* Hover tiny underline glow */}
                    {isHovered && !isActive && (
                      <motion.div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1.5px] rounded-full pointer-events-none"
                        style={{
                          background: 'linear-gradient(90deg, transparent, rgba(216, 178, 90, 0.65), transparent)',
                          boxShadow: '0 0 6px rgba(216, 178, 90, 0.4)',
                        }}
                        initial={{ width: '0%', opacity: 0 }}
                        animate={{ width: '50%', opacity: 1 }}
                        exit={{ width: '0%', opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Separator 2 */}
            <div className="w-px h-[20px] bg-white/10 opacity-[0.06] shrink-0" />

            {/* CTA Button */}
            <div className="flex items-center pl-2 shrink-0">
              <button
                onClick={() => scrollToSection('#download')}
                className="relative flex items-center justify-center gap-2 px-5 h-[34px] rounded-full text-[12px] font-semibold font-arabic cursor-pointer transition-all duration-200"
                style={{
                  background: '#D8B25A',
                  color: '#070F1A',
                  border: '1px solid rgba(0, 0, 0, 0.15)',
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.35), 0 2px 8px rgba(0, 0, 0, 0.12)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#E5C16E';
                  e.currentTarget.style.boxShadow = '0 0 10px rgba(216, 178, 90, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.45)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#D8B25A';
                  e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.35), 0 2px 8px rgba(0, 0, 0, 0.12)';
                }}
              >
                <FiDownload size={12} className="relative z-10" />
                <span className="relative z-10">حمّل التطبيق</span>
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ====== MOBILE ====== */}
      <button
        className="lg:hidden fixed top-4 right-4 z-50 w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-xl transition-all duration-300 cursor-pointer"
        style={{
          backgroundColor: mobileOpen ? 'rgba(216, 178, 90, 0.12)' : 'rgba(10, 18, 32, 0.85)',
          border: '1px solid rgba(216, 178, 90, 0.15)',
          color: mobileOpen ? '#D8B25A' : 'rgba(255, 255, 255, 0.85)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
        }}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="القائمة"
      >
        {mobileOpen ? <FiX size={18} /> : <FiMenu size={18} />}
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 lg:hidden"
              style={{ backgroundColor: 'rgba(4, 11, 24, 0.75)', backdropFilter: 'blur(8px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
              style={{
                borderRadius: '24px 24px 0 0',
                background: 'linear-gradient(180deg, #0E1624, #0A1220)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderBottom: 'none',
                boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.5)',
              }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            >
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-white/[0.08]" />
              </div>
              <div className="flex justify-center mb-6 mt-2">
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full" style={{ border: '1px solid rgba(216,178,90,0.15)', background: 'rgba(255,255,255,0.02)' }}>
                  <img src={`${import.meta.env.BASE_URL}icons/logo.svg`} alt="رفيق" className="w-4 h-4" style={{ filter: 'brightness(0) invert(1)' }} />
                  <span className="logo-wordmark text-white/90 text-xs">رَفِيقْ</span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1 pb-8 px-6">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className="w-full text-center py-3.5 rounded-xl text-[15px] font-medium cursor-pointer font-arabic transition-all duration-200"
                    style={{
                      color: activeSection === item.href.slice(1) ? '#D8B25A' : 'rgba(255, 255, 255, 0.75)',
                      backgroundColor: activeSection === item.href.slice(1) ? 'rgba(216, 178, 90, 0.06)' : 'transparent',
                    }}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
                <motion.div
                  className="w-full mt-4 pt-4"
                  style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.04 + 0.1, duration: 0.25 }}
                >
                  <button
                    onClick={() => scrollToSection('#download')}
                    className="w-full flex items-center justify-center gap-2 bg-[#D8B25A] text-[#0A1220] py-3.5 rounded-xl text-sm font-semibold shadow-md font-arabic cursor-pointer hover:bg-[#E5C16E] transition-colors"
                  >
                    <FiDownload size={15} />
                    حمّل التطبيق
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
