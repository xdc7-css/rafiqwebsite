import { motion } from 'framer-motion';

function starPath(cx, cy, outerR, innerR, points) {
  let d = '';
  for (let i = 0; i < points * 2; i++) {
    const angle = (i * Math.PI) / points - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : innerR;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    d += (i === 0 ? 'M' : 'L') + x.toFixed(2) + ',' + y.toFixed(2);
  }
  return d + 'Z';
}

function wrap(svg, { size, opacity, rotate, animate }, timing = { duration: 45 }) {
  const el = <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden="true">{svg}</svg>;
  if (animate) {
    return (
      <motion.div
        style={{ opacity }}
        animate={{ rotate: [rotate || 0, rotate ? rotate + 360 : 360] }}
        transition={{ duration: timing.duration, repeat: Infinity, ease: 'linear' }}
        aria-hidden="true"
      >
        {el}
      </motion.div>
    );
  }
  return <div style={{ opacity, transform: `rotate(${rotate || 0}deg)` }} aria-hidden="true">{el}</div>;
}

const centerStarInner = '64.64,35.36 64.64,64.64 35.36,64.64 35.36,35.36';

export function EightPointStar({ size = 80, opacity = 0.04, rotate = 0, color = '#D8B25A', animate = false }) {
  return wrap(
    <>
      <path d={starPath(50, 50, 44, 17, 8)} fill={color} />
      <polygon points={centerStarInner} fill={color} opacity={0.25} />
    </>,
    { size, opacity, rotate, animate }
  );
}

export function TwelvePointStar({ size = 100, opacity = 0.03, rotate = 0, color = '#D8B25A', animate = false }) {
  return wrap(
    <>
      <path d={starPath(50, 50, 42, 20, 12)} fill={color} opacity={0.6} />
      <path d={starPath(50, 50, 20, 8, 12)} fill={color} opacity={0.3} />
    </>,
    { size, opacity, rotate, animate },
    { duration: 50 }
  );
}

export function GeometricRing({ size = 120, opacity = 0.04, color = '#D8B25A', strokeWidth = 1, animate = false }) {
  const ticks = [];
  for (let i = 0; i < 16; i++) {
    const angle = (i * 2 * Math.PI) / 16 - Math.PI / 2;
    const x1 = 50 + 38 * Math.cos(angle);
    const y1 = 50 + 38 * Math.sin(angle);
    const x2 = 50 + 46 * Math.cos(angle);
    const y2 = 50 + 46 * Math.sin(angle);
    ticks.push(<line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={strokeWidth} opacity={0.5} />);
  }
  const dots = [];
  for (let i = 0; i < 8; i++) {
    const angle = (i * 2 * Math.PI) / 8 - Math.PI / 2;
    const x = 50 + 30 * Math.cos(angle);
    const y = 50 + 30 * Math.sin(angle);
    dots.push(<circle key={i} cx={x} cy={y} r={1.5} fill={color} opacity={0.4} />);
  }
  return wrap(
    <>
      <circle cx={50} cy={50} r={46} stroke={color} strokeWidth={strokeWidth} opacity={0.3} />
      <circle cx={50} cy={50} r={38} stroke={color} strokeWidth={strokeWidth} opacity={0.2} />
      {ticks}
      {dots}
      <circle cx={50} cy={50} r={30} stroke={color} strokeWidth={strokeWidth} opacity={0.15} strokeDasharray="2,4" />
    </>,
    { size, opacity, rotate: 0, animate },
    { duration: 35 }
  );
}

export function Arabesque({ size = 140, opacity = 0.03, color = '#D8B25A' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden="true" style={{ opacity }}>
      {['M25,75 C25,50 35,25 50,25 C65,25 75,50 75,75', 'M25,75 C25,60 40,50 50,50 C60,50 75,60 75,75', 'M30,75 C30,55 40,35 50,35 C60,35 70,55 70,75'].map((d, i) => (
        <path key={i} d={d} stroke={color} strokeWidth={0.8} fill="none" opacity={0.5 - i * 0.15} />
      ))}
      <path d="M50,25 C60,40 65,55 62,70" stroke={color} strokeWidth={0.5} fill="none" opacity={0.3} />
      <path d="M50,25 C40,40 35,55 38,70" stroke={color} strokeWidth={0.5} fill="none" opacity={0.3} />
    </svg>
  );
}

export function CircularRosette({ size = 100, opacity = 0.03, color = '#D8B25A', animate = false }) {
  const petals = [];
  for (let i = 0; i < 12; i++) {
    const angle = (i * 2 * Math.PI) / 12 - Math.PI / 2;
    const x = 50 + 28 * Math.cos(angle);
    const y = 50 + 28 * Math.sin(angle);
    const rot = (angle * 180) / Math.PI;
    petals.push(<ellipse key={i} cx={x} cy={y} rx={14} ry={5} fill={color} opacity={0.25} transform={`rotate(${rot}, ${x}, ${y})`} />);
  }
  return wrap(
    <>
      <circle cx={50} cy={50} r={36} stroke={color} strokeWidth={0.5} opacity={0.2} />
      {petals}
      <circle cx={50} cy={50} r={3} fill={color} opacity={0.3} />
      <circle cx={50} cy={50} r={42} stroke={color} strokeWidth={0.3} opacity={0.15} strokeDasharray="3,6" />
    </>,
    { size, opacity, rotate: 0, animate },
    { duration: 60 }
  );
}

export function MosqueLamp({ size = 80, opacity = 0.03, color = '#D8B25A' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 120" fill="none" aria-hidden="true" style={{ opacity }}>
      <path d="M50,5 L50,30" stroke={color} strokeWidth={1} opacity={0.4} />
      <path d="M35,30 C35,30 30,40 32,50 C34,60 30,70 30,80 L70,80 C70,70 66,60 68,50 C70,40 65,30 65,30 Z" stroke={color} strokeWidth={0.8} fill="none" opacity={0.3} />
      <path d="M35,80 C35,80 33,88 36,95 L64,95 C67,88 65,80 65,80" stroke={color} strokeWidth={0.6} fill="none" opacity={0.2} />
      <line x1={40} y1={95} x2={60} y2={95} stroke={color} strokeWidth={0.5} opacity={0.2} />
      <line x1={36} y1={100} x2={64} y2={100} stroke={color} strokeWidth={0.4} opacity={0.15} />
      <path d="M45,30 L45,40 M55,30 L55,40" stroke={color} strokeWidth={0.5} opacity={0.25} />
    </svg>
  );
}

export function CornerOrnament({ size = 60, opacity = 0.04, color = '#D8B25A', corner = 'top-left' }) {
  let rotation = 0;
  if (corner === 'top-right') rotation = 90;
  else if (corner === 'bottom-right') rotation = 180;
  else if (corner === 'bottom-left') rotation = 270;
  const cx = 50, cy = 50;
  const arc = `M${cx - 35},${cy + 5} Q${cx - 35},${cy - 35} ${cx + 5},${cy - 35}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden="true" style={{ opacity, transform: `rotate(${rotation}deg)` }}>
      <path d={arc} stroke={color} strokeWidth={1} fill="none" opacity={0.4} />
      <path d={`M${cx - 35},${cy + 5} L${cx - 25},${cy + 5}`} stroke={color} strokeWidth={0.6} opacity={0.3} />
      <path d={`M${cx + 5},${cy - 35} L${cx + 5},${cy - 25}`} stroke={color} strokeWidth={0.6} opacity={0.3} />
      <circle cx={cx - 35} cy={cy - 35} r={2} fill={color} opacity={0.3} />
    </svg>
  );
}

// ---- 14 New Islamic Geometric Components ----

export function SixPointStar({ size = 80, opacity = 0.04, rotate = 0, color = '#D8B25A', animate = false }) {
  const path = starPath(50, 50, 44, 22, 6);
  const inner = starPath(50, 50, 18, 7, 6);
  return wrap(
    <>
      <path d={path} fill={color} opacity={0.5} />
      <path d={inner} fill={color} opacity={0.25} />
    </>,
    { size, opacity, rotate, animate }
  );
}

export function SixteenPointStar({ size = 100, opacity = 0.03, rotate = 0, color = '#D8B25A', animate = false }) {
  const path1 = starPath(50, 50, 44, 18, 16);
  const path2 = starPath(50, 50, 28, 12, 8);
  return wrap(
    <>
      <path d={path1} fill={color} opacity={0.4} />
      <path d={path2} fill={color} opacity={0.2} transform="rotate(11.25, 50, 50)" />
    </>,
    { size, opacity, rotate, animate },
    { duration: 55 }
  );
}

export function Dodecagram({ size = 90, opacity = 0.035, rotate = 0, color = '#D8B25A', animate = false }) {
  const outer = starPath(50, 50, 44, 32, 12);
  const inner = starPath(50, 50, 22, 10, 12);
  const pentagram = starPath(50, 50, 16, 6, 6);
  return wrap(
    <>
      <path d={outer} fill={color} opacity={0.35} />
      <path d={inner} fill={color} opacity={0.2} />
      <path d={pentagram} fill={color} opacity={0.15} />
    </>,
    { size, opacity, rotate, animate },
    { duration: 50 }
  );
}

export function Decagram({ size = 90, opacity = 0.035, rotate = 0, color = '#D8B25A', animate = false }) {
  const outer = starPath(50, 50, 44, 28, 10);
  const inner = starPath(50, 50, 20, 8, 10);
  return wrap(
    <>
      <path d={outer} fill={color} opacity={0.4} />
      <path d={inner} fill={color} opacity={0.2} />
      <circle cx={50} cy={50} r={6} fill={color} opacity={0.15} />
    </>,
    { size, opacity, rotate, animate },
    { duration: 45 }
  );
}

export function GirihStar({ size = 100, opacity = 0.03, rotate = 0, color = '#D8B25A', animate = false }) {
  const outer = starPath(50, 50, 44, 32, 8);
  const inner = starPath(50, 50, 28, 18, 8);
  const core = starPath(50, 50, 16, 6, 8);
  return wrap(
    <>
      <path d={outer} fill={color} opacity={0.3} />
      <path d={inner} fill={color} opacity={0.2} />
      <path d={core} fill={color} opacity={0.15} />
    </>,
    { size, opacity, rotate, animate },
    { duration: 50 }
  );
}

export function FourPointStar({ size = 70, opacity = 0.04, rotate = 0, color = '#D8B25A', animate = false }) {
  const path = starPath(50, 50, 44, 5, 4);
  const mid = starPath(50, 50, 22, 3, 4);
  return wrap(
    <>
      <path d={path} fill={color} opacity={0.35} />
      <path d={mid} fill={color} opacity={0.2} />
    </>,
    { size, opacity, rotate, animate },
    { duration: 40 }
  );
}

export function ConcentricOctagons({ size = 100, opacity = 0.035, rotate = 0, color = '#D8B25A', animate = false }) {
  return wrap(
    <>
      <polygon points="50,6 90.4,25 90.4,75 50,94 9.6,75 9.6,25" fill="none" stroke={color} strokeWidth={0.6} opacity={0.35} />
      <polygon points="50,18 79.6,34 79.6,66 50,82 20.4,66 20.4,34" fill="none" stroke={color} strokeWidth={0.5} opacity={0.25} transform="rotate(22.5, 50, 50)" />
      <polygon points="50,30 68.8,42 68.8,58 50,70 31.2,58 31.2,42" fill="none" stroke={color} strokeWidth={0.4} opacity={0.18} />
      <polygon points="50,38 62.4,46 62.4,54 50,62 37.6,54 37.6,46" fill="none" stroke={color} strokeWidth={0.3} opacity={0.12} transform="rotate(11.25, 50, 50)" />
    </>,
    { size, opacity, rotate, animate },
    { duration: 50 }
  );
}

export function OverlappingCircles({ size = 100, opacity = 0.03, rotate = 0, color = '#D8B25A', animate = false }) {
  const arcs = [];
  for (let i = 0; i < 6; i++) {
    const a = (i * 2 * Math.PI) / 6;
    const cx = 50 + 22 * Math.cos(a);
    const cy = 50 + 22 * Math.sin(a);
    arcs.push(<circle key={i} cx={cx} cy={cy} r={22} fill="none" stroke={color} strokeWidth={0.5} opacity={0.3} />);
  }
  return wrap(
    <>
      {arcs}
      <circle cx={50} cy={50} r={22} fill="none" stroke={color} strokeWidth={0.6} opacity={0.25} />
      <circle cx={50} cy={50} r={36} fill="none" stroke={color} strokeWidth={0.3} opacity={0.15} strokeDasharray="2,5" />
    </>,
    { size, opacity, rotate, animate },
    { duration: 50 }
  );
}

export function GeometricDiamond({ size = 70, opacity = 0.035, rotate = 0, color = '#D8B25A', animate = false }) {
  return wrap(
    <>
      <polygon points="50,5 85,50 50,95 15,50" fill="none" stroke={color} strokeWidth={0.7} opacity={0.35} />
      <polygon points="50,18 72,50 50,82 28,50" fill="none" stroke={color} strokeWidth={0.5} opacity={0.25} />
      <polygon points="50,32 60,50 50,68 40,50" fill="none" stroke={color} strokeWidth={0.4} opacity={0.18} />
      <line x1={15} y1={50} x2={85} y2={50} stroke={color} strokeWidth={0.3} opacity={0.15} />
      <line x1={50} y1={5} x2={50} y2={95} stroke={color} strokeWidth={0.3} opacity={0.15} />
    </>,
    { size, opacity, rotate, animate },
    { duration: 45 }
  );
}

export function HexagonPattern({ size = 90, opacity = 0.03, rotate = 0, color = '#D8B25A', animate = false }) {
  const hex = (r) => {
    let p = '';
    for (let i = 0; i < 6; i++) {
      const a = (i * 2 * Math.PI) / 6 - Math.PI / 2;
      const x = 50 + r * Math.cos(a);
      const y = 50 + r * Math.sin(a);
      p += (i === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1);
    }
    return p + 'Z';
  };
  return wrap(
    <>
      <path d={hex(44)} fill="none" stroke={color} strokeWidth={0.6} opacity={0.3} />
      <path d={hex(30)} fill="none" stroke={color} strokeWidth={0.5} opacity={0.2} />
      <path d={hex(16)} fill="none" stroke={color} strokeWidth={0.4} opacity={0.15} />
      <line x1={50} y1={6} x2={50} y2={94} stroke={color} strokeWidth={0.3} opacity={0.1} />
      <line x1={11.9} y1={28} x2={88.1} y2={72} stroke={color} strokeWidth={0.3} opacity={0.1} />
      <line x1={11.9} y1={72} x2={88.1} y2={28} stroke={color} strokeWidth={0.3} opacity={0.1} />
    </>,
    { size, opacity, rotate, animate },
    { duration: 50 }
  );
}

export function EightPointRosette({ size = 100, opacity = 0.03, rotate = 0, color = '#D8B25A', animate = false }) {
  const petals = [];
  for (let i = 0; i < 8; i++) {
    const angle = (i * 2 * Math.PI) / 8 - Math.PI / 2;
    const x = 50 + 30 * Math.cos(angle);
    const y = 50 + 30 * Math.sin(angle);
    const rot = (angle * 180) / Math.PI;
    petals.push(<ellipse key={i} cx={x} cy={y} rx={18} ry={6} fill={color} opacity={0.2} transform={`rotate(${rot}, ${x}, ${y})`} />);
  }
  return wrap(
    <>
      {petals}
      <polygon points="50,10 90,50 50,90 10,50" fill="none" stroke={color} strokeWidth={0.5} opacity={0.25} />
      <circle cx={50} cy={50} r={38} stroke={color} strokeWidth={0.4} opacity={0.15} />
      <circle cx={50} cy={50} r={4} fill={color} opacity={0.2} />
    </>,
    { size, opacity, rotate, animate },
    { duration: 55 }
  );
}

export function TwelvePointRosette({ size = 100, opacity = 0.03, rotate = 0, color = '#D8B25A', animate = false }) {
  const petals = [];
  for (let i = 0; i < 12; i++) {
    const angle = (i * 2 * Math.PI) / 12 - Math.PI / 2;
    const x = 50 + 32 * Math.cos(angle);
    const y = 50 + 32 * Math.sin(angle);
    const rot = (angle * 180) / Math.PI;
    petals.push(<ellipse key={i} cx={x} cy={y} rx={10} ry={4} fill={color} opacity={0.2} transform={`rotate(${rot}, ${x}, ${y})`} />);
  }
  const star = starPath(50, 50, 22, 10, 12);
  return wrap(
    <>
      {petals}
      <path d={star} fill={color} opacity={0.25} />
      <circle cx={50} cy={50} r={40} stroke={color} strokeWidth={0.3} opacity={0.15} strokeDasharray="3,5" />
    </>,
    { size, opacity, rotate, animate },
    { duration: 60 }
  );
}

export function CrescentMotif({ size = 80, opacity = 0.035, rotate = 0, color = '#D8B25A', animate = false }) {
  return wrap(
    <>
      <path d="M50,15 A35,35 0 1,1 50,85 A35,35 0 1,1 50,15 M50,25 A25,25 0 1,0 50,75" fill={color} opacity={0.15} />
      <path d="M50,15 A35,35 0 1,1 50,85" fill="none" stroke={color} strokeWidth={0.6} opacity={0.35} />
      <circle cx={50} cy={50} r={2} fill={color} opacity={0.25} />
      {[0, 72, 144, 216, 288].map((a, i) => (
        <circle key={i} cx={50 + 32 * Math.cos((a * Math.PI) / 180)} cy={50 + 32 * Math.sin((a * Math.PI) / 180)} r={1.5} fill={color} opacity={0.2 - i * 0.03} />
      ))}
    </>,
    { size, opacity, rotate, animate },
    { duration: 50 }
  );
}

export function Shamsa({ size = 120, opacity = 0.025, rotate = 0, color = '#D8B25A', animate = false }) {
  const outer = starPath(50, 50, 44, 36, 16);
  const mid = starPath(50, 50, 30, 22, 12);
  const inner = starPath(50, 50, 18, 8, 8);
  const core = starPath(50, 50, 7, 3, 6);
  return wrap(
    <>
      <path d={outer} fill={color} opacity={0.15} />
      <path d={mid} fill={color} opacity={0.12} />
      <path d={inner} fill={color} opacity={0.2} />
      <path d={core} fill={color} opacity={0.15} />
      <circle cx={50} cy={50} r={42} fill="none" stroke={color} strokeWidth={0.3} opacity={0.12} />
      <circle cx={50} cy={50} r={36} fill="none" stroke={color} strokeWidth={0.2} opacity={0.08} strokeDasharray="2,4" />
    </>,
    { size, opacity, rotate, animate },
    { duration: 60 }
  );
}
