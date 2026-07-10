import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import NoiseOverlay from './components/NoiseOverlay';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, filter: 'blur(4px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, filter: 'blur(4px)' }}
        transition={{ duration: 0.4, ease: [0.45, 0, 0.55, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollProgress />
      <NoiseOverlay />
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-[#070F1A]" />
        <div className="absolute -top-[30%] -left-[10%] w-[80%] h-[60%] bg-[radial-gradient(ellipse_at_center,rgba(18,38,72,0.35),transparent_70%)]" />
        <div className="absolute -bottom-[30%] -right-[10%] w-[70%] h-[55%] bg-[radial-gradient(ellipse_at_center,rgba(10,25,55,0.3),transparent_70%)]" />
        <div className="absolute top-[30%] left-[25%] w-[50%] h-[50%] bg-[radial-gradient(ellipse_at_center,rgba(15,30,60,0.2),transparent_70%)]" />
        <div className="absolute top-[12%] left-[18%] w-[350px] h-[350px] bg-indigo-950/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-[18%] right-[12%] w-[300px] h-[300px] bg-blue-950/15 rounded-full blur-[120px]" />
        <div className="absolute top-[55%] left-[40%] w-[250px] h-[250px] bg-gold/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(4,11,24,0.5)_100%)]" />
      </div>

      <Navbar />

      <div className="relative z-10" style={{ paddingTop: 76 }}>
        <AnimatedRoutes />
        <Footer />
      </div>
    </Router>
  );
}
