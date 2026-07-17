import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary">
      <div className="text-center max-w-md px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 90, damping: 18, mass: 0.8 }}
        >
          <div className="text-8xl font-bold text-white/[0.04] tracking-tight font-arabic">٤٠٤</div>
          <h1 className="text-3xl font-semibold tracking-tight text-white mt-4 font-arabic">
            الصفحة غير موجودة
          </h1>
          <p className="mt-4 text-white/40 text-sm leading-relaxed font-arabic">
            عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-gold text-[#040B18] rounded-button text-sm font-semibold hover:bg-gold-light transition-all duration-300 font-arabic"
          >
            <FiArrowLeft size={16} />
            العودة للرئيسية
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
