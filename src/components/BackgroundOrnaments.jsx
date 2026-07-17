import {
  EightPointStar, TwelvePointStar, SixPointStar, SixteenPointStar,
  Dodecagram, Decagram, GirihStar, FourPointStar,
  ConcentricOctagons, OverlappingCircles, GeometricDiamond, HexagonPattern,
  EightPointRosette, TwelvePointRosette, CrescentMotif, Shamsa,
  GeometricRing, Arabesque, CircularRosette, MosqueLamp, CornerOrnament,
} from './IslamicOrnaments';

const COMPONENT_MAP = {
  EightPointStar, TwelvePointStar, SixPointStar, SixteenPointStar,
  Dodecagram, Decagram, GirihStar, FourPointStar,
  ConcentricOctagons, OverlappingCircles, GeometricDiamond, HexagonPattern,
  EightPointRosette, TwelvePointRosette, CrescentMotif, Shamsa,
  GeometricRing, Arabesque, CircularRosette, MosqueLamp, CornerOrnament,
};

const PRESETS = {
  hero: {
    blurs: [
      'absolute top-[10%] left-1/2 -translate-x-1/2 w-[60%] h-[30%] bg-gold/[0.02] rounded-full blur-[140px]',
      'absolute top-[20%] -right-24 w-[320px] h-[320px] bg-indigo-950/15 rounded-full blur-3xl',
    ],
    far: [
      { Component: 'SixteenPointStar', props: { size: 280, opacity: 0.025, rotate: 8 }, position: 'top-[15%] -right-[5%]', blur: 60 },
      { Component: 'GeometricRing', props: { size: 240, opacity: 0.015 }, position: '-bottom-[8%] -left-[5%]', blur: 60 },
      { Component: 'Dodecagram', props: { size: 200, opacity: 0.018, rotate: 15 }, position: 'top-[40%] left-[10%]', blur: 40 },
    ],
    mid: [
      { Component: 'EightPointStar', props: { size: 160, opacity: 0.025, rotate: 10 }, position: 'top-[8%] left-[2%]', blur: 0 },
      { Component: 'CircularRosette', props: { size: 110, opacity: 0.012 }, position: 'top-[45%] left-[3%]', blur: 0 },
      { Component: 'TwelvePointRosette', props: { size: 130, opacity: 0.015, rotate: 5 }, position: 'bottom-[20%] -right-[2%]', blur: 20 },
    ],
    near: [
      { Component: 'CornerOrnament', props: { size: 50, opacity: 0.012 }, position: 'top-[3%] right-[2%]' },
      { Component: 'Shamsa', props: { size: 60, opacity: 0.01, rotate: 22 }, position: 'bottom-[30%] left-[5%]' },
      { Component: 'GeometricDiamond', props: { size: 40, opacity: 0.008 }, position: 'top-[55%] right-[8%]' },
    ],
  },

  whyRafiq: {
    blurs: [
      'absolute top-[5%] -left-20 w-[400px] h-[400px] bg-gold/[0.01] rounded-full blur-[150px]',
      'absolute bottom-[10%] -right-20 w-[450px] h-[450px] bg-indigo-950/15 rounded-full blur-[120px]',
    ],
    far: [
      { Component: 'SixPointStar', props: { size: 220, opacity: 0.018, rotate: 12 }, position: 'top-[20%] -right-[8%]', blur: 60 },
      { Component: 'ConcentricOctagons', props: { size: 260, opacity: 0.015, rotate: 5 }, position: '-bottom-[5%] -left-[5%]', blur: 60 },
    ],
    mid: [
      { Component: 'GeometricRing', props: { size: 130, opacity: 0.015 }, position: 'top-[30%] left-[1%]' },
      { Component: 'EightPointStar', props: { size: 100, opacity: 0.015, rotate: 15 }, position: 'bottom-[25%] right-[1%]' },
      { Component: 'Decagram', props: { size: 90, opacity: 0.012, rotate: 8 }, position: 'top-[50%] right-[3%]', blur: 20 },
    ],
    near: [
      { Component: 'CornerOrnament', props: { size: 90, opacity: 0.015 }, position: 'top-[3%] left-[1%]' },
      { Component: 'CornerOrnament', props: { size: 90, opacity: 0.015 }, position: 'top-[3%] right-[1%]' },
      { Component: 'CornerOrnament', props: { size: 60, opacity: 0.01 }, position: 'bottom-[5%] left-[2%]' },
      { Component: 'CornerOrnament', props: { size: 60, opacity: 0.01 }, position: 'bottom-[5%] right-[2%]' },
    ],
  },

  showcase: {
    blurs: [
      'absolute top-[15%] -left-20 w-[400px] h-[400px] bg-gold/[0.02] rounded-full blur-[140px]',
      'absolute bottom-[20%] -right-20 w-[350px] h-[350px] bg-indigo-950/10 rounded-full blur-[100px]',
    ],
    far: [
      { Component: 'Shamsa', props: { size: 320, opacity: 0.02, rotate: 6 }, position: 'top-[10%] left-[5%]', blur: 60 },
      { Component: 'GirihStar', props: { size: 280, opacity: 0.015, rotate: 18 }, position: 'bottom-[5%] -right-[5%]', blur: 60 },
    ],
    mid: [
      { Component: 'CircularRosette', props: { size: 120, opacity: 0.015 }, position: 'top-[5%] left-[8%]' },
      { Component: 'EightPointStar', props: { size: 150, opacity: 0.015, rotate: 25 }, position: 'bottom-[8%] right-[3%]' },
      { Component: 'Arabesque', props: { size: 140, opacity: 0.01 }, position: 'top-[50%] right-[5%]', blur: 20 },
    ],
    near: [
      { Component: 'SixteenPointStar', props: { size: 55, opacity: 0.01, rotate: 10 }, position: 'bottom-[45%] left-[3%]' },
      { Component: 'GeometricDiamond', props: { size: 45, opacity: 0.009, rotate: 45 }, position: 'top-[35%] right-[2%]' },
    ],
  },

  faq: {
    blurs: [
      'absolute top-[5%] -right-16 w-[200px] h-[200px] bg-indigo-950/8 rounded-full blur-[70px]',
      'absolute bottom-[20%] -left-16 w-[250px] h-[250px] bg-gold/[0.008] rounded-full blur-[90px]',
    ],
    far: [
      { Component: 'OverlappingCircles', props: { size: 180, opacity: 0.015 }, position: 'top-[-10%] left-[-5%]', blur: 60 },
      { Component: 'FourPointStar', props: { size: 160, opacity: 0.012, rotate: 22 }, position: 'bottom-[-5%] right-[-5%]', blur: 60 },
    ],
    mid: [
      { Component: 'GeometricRing', props: { size: 60, opacity: 0.01 }, position: 'top-[10%] left-[2%]' },
      { Component: 'EightPointStar', props: { size: 50, opacity: 0.008, rotate: 30 }, position: 'bottom-[15%] right-[3%]' },
    ],
    near: [
      { Component: 'CrescentMotif', props: { size: 45, opacity: 0.006 }, position: 'bottom-[40%] left-[5%]' },
      { Component: 'HexagonPattern', props: { size: 40, opacity: 0.007, rotate: 15 }, position: 'top-[60%] right-[2%]' },
    ],
  },

  download: {
    blurs: [
      'absolute top-[20%] left-[50%] -translate-x-1/2 w-[500px] h-[500px] bg-gold/[0.015] rounded-full blur-[150px]',
      'absolute bottom-[10%] -right-20 w-[300px] h-[300px] bg-indigo-950/10 rounded-full blur-[100px]',
    ],
    far: [
      { Component: 'TwelvePointStar', props: { size: 300, opacity: 0.02, rotate: 12 }, position: 'top-[5%] -left-[10%]', blur: 60 },
      { Component: 'Shamsa', props: { size: 260, opacity: 0.015, rotate: 8 }, position: 'bottom-[-10%] -right-[10%]', blur: 60 },
    ],
    mid: [
      { Component: 'TwelvePointStar', props: { size: 180, opacity: 0.015, rotate: 12 }, position: 'top-[3%] left-[2%]' },
      { Component: 'GeometricRing', props: { size: 120, opacity: 0.012 }, position: 'bottom-[20%] left-[5%]' },
      { Component: 'Dodecagram', props: { size: 100, opacity: 0.01, rotate: 25 }, position: 'top-[50%] right-[8%]', blur: 20 },
    ],
    near: [
      { Component: 'CornerOrnament', props: { size: 70, opacity: 0.012 }, position: 'top-[15%] right-[1%]' },
      { Component: 'CrescentMotif', props: { size: 50, opacity: 0.008, rotate: -15 }, position: 'bottom-[35%] right-[5%]' },
      { Component: 'SixPointStar', props: { size: 45, opacity: 0.009, rotate: 30 }, position: 'top-[70%] left-[4%]' },
    ],
  },
};

function OrnamentRenderer({ item }) {
  const Component = COMPONENT_MAP[item.Component];
  if (!Component) return null;
  const blurClass = item.blur >= 60 ? 'blur-3xl' : item.blur >= 40 ? 'blur-2xl' : item.blur >= 20 ? 'blur-xl' : '';
  const scaleClass = item.blur >= 60 ? 'scale-110' : item.blur === 0 ? 'scale-90' : '';
  return (
    <div className={`absolute ${item.position} ${scaleClass}`}>
      <div className={blurClass}>
        <Component {...item.props} />
      </div>
    </div>
  );
}

export default function BackgroundOrnaments({ preset = 'hero' }) {
  const config = PRESETS[preset] || PRESETS.hero;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {config.blurs?.map((cls, i) => <div key={`b${i}`} className={cls} />)}
      {config.far?.map((item, i) => <OrnamentRenderer key={`f${i}`} item={item} />)}
      {config.mid?.map((item, i) => <OrnamentRenderer key={`m${i}`} item={item} />)}
      {config.near?.map((item, i) => <OrnamentRenderer key={`n${i}`} item={item} />)}
    </div>
  );
}
