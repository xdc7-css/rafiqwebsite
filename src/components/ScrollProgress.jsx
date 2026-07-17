import { useScrollProgress } from '../hooks/useScrollProgress';

export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 w-full h-[1.5px] z-[9998] pointer-events-none">
      <div
        className="h-full transition-all duration-150 ease-out"
        style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #D8B25A, #F0D58A)' }}
      />
    </div>
  );
}
