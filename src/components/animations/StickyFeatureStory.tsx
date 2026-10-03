import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

/* ─── Previews ─── */

function NotesPreview() {
  return (
    <div className="w-full h-full bg-cream border border-ink/10 p-8 flex flex-col relative overflow-hidden">
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="mono-label text-[10px] text-burnt-orange mb-6">UNIT 1 / THEORY</motion.div>
      <motion.h3 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-[2rem] font-serif tracking-[-0.03em] leading-tight mb-8 font-normal" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
        Linear vs Non-Linear<br />Data Structures
      </motion.h3>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }} className="space-y-4">
        <div className="w-full h-2 bg-ink/5 rounded-full" />
        <div className="w-5/6 h-2 bg-ink/5 rounded-full" />
        <div className="w-full h-2 bg-ink/5 rounded-full" />
        <div className="w-4/5 h-2 bg-ink/5 rounded-full" />
      </motion.div>
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="mt-auto border-l-2 border-burnt-orange pl-4">
        <div className="text-[12px] text-ink-light">A data structure is a specialized format for organizing, storing, and retrieving data.</div>
      </motion.div>
    </div>
  );
}

function QuestionsPreview() {
  return (
    <div className="w-full h-full bg-[#141414] text-[#F4F1EA] p-8 flex flex-col">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mono-label text-[10px] text-[rgba(244,241,234,0.5)] mb-8">QUESTION BANK / EXAM PREP</motion.div>
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }} className="border border-[rgba(244,241,234,0.1)] p-6 bg-[rgba(244,241,234,0.02)] mb-4">
        <div className="flex justify-between items-start mb-4">
          <span className="mono-tag text-[10px] bg-burnt-orange text-cream px-2 py-1">Q. 04</span>
          <span className="mono-label text-[9px] text-[rgba(244,241,234,0.4)]">4 MARKS</span>
        </div>
        <p className="text-[14px] leading-relaxed">Explain the storage representation of a 2D array in Row-Major and Column-Major order with address calculation formulas.</p>
      </motion.div>
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="border border-[rgba(244,241,234,0.1)] p-6 bg-[rgba(244,241,234,0.02)] opacity-50 scale-95 origin-top">
        <div className="flex justify-between items-start mb-4">
          <span className="mono-tag text-[10px] bg-[rgba(244,241,234,0.1)] text-[rgba(244,241,234,0.8)] px-2 py-1">Q. 05</span>
        </div>
        <p className="text-[14px] leading-relaxed">What is a sparse matrix? Explain its tuple representation.</p>
      </motion.div>
    </div>
  );
}

function FlashcardsPreview() {
  return (
    <div className="w-full h-full bg-cream border border-ink/10 flex items-center justify-center relative perspective-[1000px]">
      <motion.div 
        initial={{ y: 50, rotateZ: -5, opacity: 0 }}
        animate={{ y: 0, rotateZ: -10, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0 }}
        className="absolute w-[280px] h-[320px] bg-white border border-ink/10 shadow-sm"
      />
      <motion.div 
        initial={{ y: 50, rotateZ: 0, opacity: 0 }}
        animate={{ y: 0, rotateZ: 5, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="absolute w-[280px] h-[320px] bg-white border border-ink/10 shadow-sm"
      />
      <motion.div 
        initial={{ y: 50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute w-[280px] h-[320px] bg-cream border border-ink/15 p-8 flex flex-col justify-between shadow-xl"
      >
        <div>
          <div className="mono-label text-[9px] text-burnt-orange mb-4">DEFINITION</div>
          <p className="text-[18px] leading-snug tracking-[-0.01em]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            What is a Circular Queue?
          </p>
        </div>
        <div className="mono-label text-[8px] text-muted self-end">TAP TO REVEAL</div>
      </motion.div>
    </div>
  );
}

function MindmapAnimatedPreview() {
  return (
    <div className="w-full h-full bg-cream border border-ink/10 relative overflow-hidden flex flex-col p-6">
      <div className="mono-label text-[10px] text-muted mb-2 z-20">MAP 01 / TAXONOMY</div>
      
      <div className="flex-1 relative w-full h-full flex items-center justify-center">
        {/* SVG paths - Aspect 4:3 roughly matches container */}
        <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
          {/* Main branches */}
          <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.4 }} d="M 200 60 L 200 90 L 100 90 L 100 110" stroke="var(--color-ink)" strokeWidth="1.5" fill="none" />
          <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.4 }} d="M 200 60 L 200 90 L 300 90 L 300 110" stroke="var(--color-ink)" strokeWidth="1.5" fill="none" />

          {/* Sub branches linear */}
          <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 1.2 }} d="M 100 150 L 100 180 L 50 180 L 50 200" stroke="var(--color-ink)" strokeWidth="1.5" fill="none" />
          <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 1.2 }} d="M 100 150 L 100 180 L 150 180 L 150 200" stroke="var(--color-ink)" strokeWidth="1.5" fill="none" />
          
          {/* Sub branches non-linear */}
          <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 1.2 }} d="M 300 150 L 300 180 L 250 180 L 250 200" stroke="var(--color-ink)" strokeWidth="1.5" fill="none" />
          <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 1.2 }} d="M 300 150 L 300 180 L 350 180 L 350 200" stroke="var(--color-burnt-orange)" strokeWidth="1.5" fill="none" />

          {/* Pulse */}
          <motion.circle
            initial={{ offsetDistance: '0%' }}
            animate={{ offsetDistance: '100%' }}
            transition={{ duration: 2, delay: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
            r="4" fill="var(--color-burnt-orange)"
            style={{ offsetPath: 'path("M 200 60 L 200 90 L 300 90 L 300 150 L 300 180 L 350 180 L 350 200")' }}
          />
        </svg>

        {/* Root */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="absolute top-[16.6%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20 bg-ink text-cream px-3 py-1.5 text-[10px] font-mono font-bold tracking-wider shadow-sm whitespace-nowrap">
          DATA STRUCTURES
        </motion.div>

        {/* L1 */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.8 }} className="absolute top-[43.3%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-20 bg-cream border border-ink/20 px-2 py-1 text-[9px] font-mono tracking-wider shadow-sm">
          LINEAR
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.8 }} className="absolute top-[43.3%] left-[75%] -translate-x-1/2 -translate-y-1/2 z-20 bg-cream border border-ink/20 px-2 py-1 text-[9px] font-mono tracking-wider shadow-sm whitespace-nowrap">
          NON-LINEAR
        </motion.div>

        {/* L2 */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 1.6 }} className="absolute top-[70%] left-[12.5%] -translate-x-1/2 -translate-y-1/2 z-20 bg-cream border border-ink/20 px-2 py-1 text-[8px] font-mono tracking-wider shadow-sm">
          ARRAY
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 1.6 }} className="absolute top-[70%] left-[37.5%] -translate-x-1/2 -translate-y-1/2 z-20 bg-cream border border-ink/20 px-2 py-1 text-[8px] font-mono tracking-wider shadow-sm whitespace-nowrap">
          LINKED LIST
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 1.6 }} className="absolute top-[70%] left-[62.5%] -translate-x-1/2 -translate-y-1/2 z-20 bg-cream border border-ink/20 px-2 py-1 text-[8px] font-mono tracking-wider shadow-sm">
          TREE
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.4, delay: 1.6 }} className="absolute top-[70%] left-[87.5%] -translate-x-1/2 -translate-y-1/2 z-20 bg-cream border border-burnt-orange text-burnt-orange px-2 py-1 text-[8px] font-mono tracking-wider font-bold shadow-[0_0_10px_rgba(224,86,38,0.1)] whitespace-nowrap">
          GRAPH
        </motion.div>
      </div>
    </div>
  );
}

function VisualizerAnimatedPreview() {
  const [swapped, setSwapped] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setSwapped(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const arr = [42, 75, 12, 89];
  // Swap 75 and 12
  const currentArr = swapped ? [42, 12, 75, 89] : arr;

  return (
    <div className="w-full h-full bg-cream border border-ink/10 flex flex-col p-8">
      <div className="mono-label text-[10px] text-muted mb-auto">BUBBLE SORT / SWAP</div>
      <div className="relative h-48 w-full">
        {currentArr.map((val, i) => {
          const isSwappedEls = (val === 12 || val === 75);
          return (
            <motion.div 
              key={val}
              layout
              transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
              className="absolute bottom-0 flex flex-col items-center justify-end"
              style={{ left: `${(i / 4) * 100}%`, width: '25%', height: '100%', padding: '0 4px' }}
            >
              <span className={`mono-label text-[9px] mb-1 ${isSwappedEls ? 'text-burnt-orange font-bold' : 'text-muted'}`}>{val}</span>
              <div 
                className={`w-full rounded-t-sm transition-colors duration-300 ${isSwappedEls ? 'bg-burnt-orange' : 'bg-ink/10'}`} 
                style={{ height: `${(val / 89) * 100}%` }} 
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

const FEATURES = [
  { id: 'notes', title: 'NOTES', desc: 'In-depth theory and explanations.', Preview: NotesPreview, link: '/notes' },
  { id: 'questions', title: 'QUESTIONS', desc: 'Practice. Understand. Master.', Preview: QuestionsPreview, link: '/question-bank' },
  { id: 'flashcards', title: 'FLASHCARDS', desc: 'Quick recall. Better retention.', Preview: FlashcardsPreview, link: '/flashcards' },
  { id: 'mindmaps', title: 'MIND MAPS', desc: 'See the big picture. Connect the dots.', Preview: MindmapAnimatedPreview, link: '/mind-maps' },
  { id: 'visualizers', title: 'VISUALISERS', desc: 'Watch algorithms come alive.', Preview: VisualizerAnimatedPreview, link: '/visualisers' }
];

export default function StickyFeatureStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const targetProgressRef = useRef(0);
  const smoothProgressRef = useRef(0);
  const velocityRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    let top = 0;
    let maxScroll = 0;

    const measure = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      top = rect.top + window.scrollY;
      maxScroll = rect.height - window.innerHeight;
    };

    const handleScroll = () => {
      if (maxScroll <= 0) return;
      const scrolled = window.scrollY - top;
      const scrollProgress = Math.max(0, Math.min(1, scrolled / maxScroll));
      targetProgressRef.current = scrollProgress;
    };

    window.addEventListener('resize', measure);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    setTimeout(() => { measure(); handleScroll(); }, 50);
    
    const render = () => {
      const diff = targetProgressRef.current - smoothProgressRef.current;
      
      // Use a spring-like dampening to prevent blowing through the animation
      velocityRef.current = (velocityRef.current + diff * 0.005) * 0.85;
      smoothProgressRef.current += velocityRef.current;
      
      // Clamp
      if (smoothProgressRef.current < 0) smoothProgressRef.current = 0;
      if (smoothProgressRef.current > 1) smoothProgressRef.current = 1;
      
      let idx = Math.floor(smoothProgressRef.current * FEATURES.length);
      idx = Math.max(0, Math.min(idx, FEATURES.length - 1));
      
      setActiveIdx(idx);
      rafRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const ActivePreview = FEATURES[activeIdx].Preview;

  return (
    <div ref={containerRef} className="relative z-10" style={{ height: '400vh' }}>
      <div className="sticky top-0 h-screen flex items-center px-6 md:px-10 overflow-hidden">
        <div className="w-full max-w-[1400px] mx-auto flex flex-col md:flex-row gap-12 md:gap-24 h-[70vh]">
          
          {/* Left Text */}
          <div className="flex-1 flex flex-col justify-center relative z-10">
            <div className="mono-label text-[10px] mb-8 text-muted bg-cream inline-block px-2 py-1 w-max">CORE FEATURES</div>
            <div className="space-y-8">
              {FEATURES.map((feat, i) => {
                const isActive = i === activeIdx;
                return (
                  <div key={feat.id} className={`transition-all duration-500 bg-cream/80 backdrop-blur-[2px] p-2 -ml-2 rounded-lg ${isActive ? 'opacity-100 translate-x-4' : 'opacity-30 blur-[1px]'}`}>
                    <div className="flex items-start gap-4">
                      <span className="num-display text-[24px] md:text-[32px] text-muted leading-[1]">0{i + 1}</span>
                      <div className="pt-1 md:pt-2">
                        <h3 className="text-[1.5rem] md:text-[2.5rem] tracking-[-0.03em] leading-[1]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                          {feat.title}
                        </h3>
                        <div className={`overflow-hidden transition-all duration-500 ease-out ${isActive ? 'max-h-[100px] opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'}`}>
                          <p className="text-[13px] md:text-[14px] text-ink-light mb-3">{feat.desc}</p>
                          <Link to={feat.link} className="mono-tag text-[9px] md:text-[10px] text-burnt-orange hover:text-burnt-orange-hover">
                            ENTER SECTION →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Preview */}
          <div className="flex-1 hidden md:flex items-center justify-center relative z-10">
            <div className="w-full max-w-[600px] aspect-[4/3] relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <ActivePreview />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
