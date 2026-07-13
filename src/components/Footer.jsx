import { FiHeart, FiArrowUp } from 'react-icons/fi';
import { FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { footerLinks } from '../data';
import { ANDROID_APK_URL } from '../constants/urls';

export default function Footer() {
  const socials = [
    { icon: FaInstagram, href: 'https://www.instagram.com/203.9.7', label: 'Instagram' },
    { icon: FaLinkedinIn, href: 'https://www.linkedin.com/in/hussein-ali-37556633b/', label: 'LinkedIn' },
    { icon: FaGithub, href: 'https://github.com/xdc7-css', label: 'GitHub' },
  ];

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer id="footer" className="relative bg-[#070F1A] border-t border-white/[0.04]">
      <div className="absolute top-0 left-0 right-0 h-px arabesque-line" />

      <div className="max-w-5xl mx-auto px-6 lg:px-8 pt-14 pb-8">

        {/* Main Footer Grid */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 pb-10 border-b border-white/[0.04]">

          {/* Left: Logo + Description + Socials */}
          <div className="max-w-xs">
            {/* Logo */}
            <a href="#" className="inline-flex items-center gap-2.5 mb-4">
              <img src={`${import.meta.env.BASE_URL}icons/logo.svg`} alt="رفيق" className="w-7 h-7 brightness-0 invert" />
              <span className="logo-wordmark logo-wordmark-lg text-white">رَفِيقْ</span>
            </a>

            {/* Description */}
            <p className="text-sm text-white/35 leading-relaxed font-arabic">
              رفيقك الروحاني اليومي في صلاتك،
              <br />قرآنك، وأذكارك.
            </p>

            {/* Social Icons */}
            <div className="flex gap-2.5 mt-5">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/[0.05] border border-white/[0.06] hover:bg-gold/15 hover:border-gold/20 hover:text-gold transition-all duration-250 text-white/35"
                  aria-label={label}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Right: Quick Links */}
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold/50 mb-4 font-arabic">
              تصفّح سريع
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      if (link.href === '#download') {
                        window.open(ANDROID_APK_URL, '_blank', 'noopener,noreferrer');
                        return;
                      }
                      const el = document.getElementById(link.href.slice(1));
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-sm text-white/35 hover:text-white/70 transition-colors duration-200 font-arabic"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <p className="text-xs text-white/20 font-arabic">
              &copy; {new Date().getFullYear()} رَفِيقْ. جميع الحقوق محفوظة.
            </p>
            <p className="text-[11px] text-white/12 flex items-center gap-1 font-arabic">
              crafted with <FiHeart size={9} className="text-gold/30" /> by CACTUS
            </p>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[11px] text-white/20 hover:text-white/45 transition-colors duration-200 cursor-pointer font-arabic"
            aria-label="العودة للأعلى"
          >
            <FiArrowUp size={12} />
            <span>للأعلى</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
