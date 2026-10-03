import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollMorphSection from '../components/animations/ScrollMorphSection';
import StickyFeatureStory from '../components/animations/StickyFeatureStory';
import DataLine from '../components/DataLine';

/* ─── Config ─── */


/* ─── Hero Node Tooltip ─── */
function NodeTooltip({ label, x, y, index }: { label: string; x: string; y: string; index: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="absolute cursor-pointer group"
      style={{ left: x, top: y }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="w-3 h-3 border border-ink/30 rounded-full hover:border-burnt-orange hover:bg-burnt-orange/10 transition-all" />
      {hovered && (
        <div className="absolute left-5 top-[-4px] z-20 bg-cream border border-warm-grey px-3 py-1.5 shadow-sm whitespace-nowrap">
          <div className="mono-label text-[8px] text-muted">{index}</div>
          <div className="mono-tag text-[10px] text-ink">{label}</div>
        </div>
      )}
    </div>
  );
}

/* ─── Ledger Item ─── */
function LedgerItem({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="flex-1 py-5 px-4 md:px-6">
      <div className="flex items-start gap-3">
        <span className="num-display text-[36px]">{num}</span>
        <div className="pt-1.5">
          <div className="mono-tag text-[11px] text-ink font-bold mb-1">{title}</div>
          <div className="text-[12px] text-muted leading-relaxed">{desc}</div>
        </div>
      </div>
    </div>
  );
}

/* ─── True Character-by-Character Construction ─── */
function RevealText({ children, baseDelay = 0 }: { children: string; baseDelay?: number }) {
  const chars = children.split('');

  return (
    <span className="block overflow-hidden relative" style={{ paddingBottom: '0.05em' }}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          transition={{
            duration: 0.9,
            delay: (baseDelay / 1000) + (i * 0.07),
            ease: [0.16, 1, 0.3, 1]
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── Section Header ─── */
function SectionHeader({ subtitle, title }: { subtitle: string; title: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="mb-12"
    >
      <div className="mono-label text-[10px] mb-3">{subtitle}</div>
      <h2 className="text-[clamp(1.8rem,4vw,3rem)] tracking-[-0.03em]"
        style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
        {title}
      </h2>
    </motion.div>
  );
}


/* ─── Living Background (Barely visible atmospheric layer) ─── */
function LivingBackground() {
  const { scrollYProgress, scrollY } = useScroll();

  const arrayOpacity = useTransform(scrollYProgress, [0.1, 0.25, 0.4], [0, 0.04, 0]);
  const treeOpacity = useTransform(scrollYProgress, [0.35, 0.5, 0.65], [0, 0.04, 0]);
  const mindmapOpacity = useTransform(scrollYProgress, [0.6, 0.75, 0.9], [0, 0.04, 0]);
  const labOpacity = useTransform(scrollYProgress, [0.8, 0.9, 1], [0, 0.04, 0.04]);

  // Stronger background parallax
  const yMove = useTransform(scrollY, [0, 1000], [0, 120]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden mix-blend-multiply">
      {/* Array Traces */}
      <motion.div style={{ opacity: arrayOpacity, y: yMove }} className="absolute inset-0 flex items-center justify-center">
        <svg width="600" height="400" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="100" y1="200" x2="500" y2="200" stroke="#141414" strokeWidth="1" strokeDasharray="4 4" />
          <rect x="150" y="150" width="300" height="100" stroke="#141414" strokeWidth="0.5" />
          <line x1="225" y1="150" x2="225" y2="250" stroke="#141414" strokeWidth="0.5" />
          <line x1="300" y1="150" x2="300" y2="250" stroke="#141414" strokeWidth="0.5" />
          <line x1="375" y1="150" x2="375" y2="250" stroke="#141414" strokeWidth="0.5" />
          <circle cx="100" cy="200" r="4" fill="#141414" />
          <circle cx="500" cy="200" r="4" fill="#141414" />
        </svg>
      </motion.div>

      {/* Tree Traces */}
      <motion.div style={{ opacity: treeOpacity, y: yMove }} className="absolute inset-0 flex items-center justify-center">
        <svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="300" y1="100" x2="150" y2="300" stroke="#141414" strokeWidth="0.5" />
          <line x1="300" y1="100" x2="450" y2="300" stroke="#141414" strokeWidth="0.5" />
          <line x1="150" y1="300" x2="50" y2="500" stroke="#141414" strokeWidth="0.5" strokeDasharray="2 4" />
          <line x1="150" y1="300" x2="250" y2="500" stroke="#141414" strokeWidth="0.5" strokeDasharray="2 4" />
          <circle cx="300" cy="100" r="40" stroke="#141414" strokeWidth="0.5" />
          <circle cx="150" cy="300" r="30" stroke="#141414" strokeWidth="0.5" />
          <circle cx="450" cy="300" r="30" stroke="#141414" strokeWidth="0.5" />
        </svg>
      </motion.div>

      {/* Mindmap Radial Traces */}
      <motion.div style={{ opacity: mindmapOpacity, y: yMove }} className="absolute inset-0 flex items-center justify-center">
        <svg width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="400" cy="400" r="100" stroke="#141414" strokeWidth="0.5" strokeDasharray="4 8" />
          <circle cx="400" cy="400" r="200" stroke="#141414" strokeWidth="0.5" />
          <circle cx="400" cy="400" r="300" stroke="#141414" strokeWidth="0.5" strokeDasharray="2 6" />
          <line x1="400" y1="100" x2="400" y2="700" stroke="#141414" strokeWidth="0.5" />
          <line x1="100" y1="400" x2="700" y2="400" stroke="#141414" strokeWidth="0.5" />
          <line x1="187" y1="187" x2="613" y2="613" stroke="#141414" strokeWidth="0.5" />
          <line x1="187" y1="613" x2="613" y2="187" stroke="#141414" strokeWidth="0.5" />
        </svg>
      </motion.div>

      {/* Visualizer Measurement Traces */}
      <motion.div style={{ opacity: labOpacity, y: yMove }} className="absolute inset-0 flex items-center justify-center">
        <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#141414" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <path d="M 0 500 L 1000 500" stroke="#141414" strokeWidth="1" />
          <path d="M 500 0 L 500 1000" stroke="#141414" strokeWidth="1" />
        </svg>
      </motion.div>
    </div>
  );
}

/* ─── Mobile Menu ─── */
function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-cream/98 backdrop-blur-sm flex flex-col items-center justify-center gap-8"
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute top-4 right-6 mono-tag text-[14px] text-ink" aria-label="Close menu">✕</button>
      {[
        { to: '/notes', label: 'NOTES' },
        { to: '/question-bank', label: 'QUESTIONS' },
        { to: '/flashcards', label: 'FLASHCARDS' },
        { to: '/mind-maps', label: 'MAPS' },
        { to: '/visualisers', label: 'LAB' },
      ].map(({ to, label }) => (
        <Link key={to} to={to} onClick={onClose} className="mono-tag text-[14px] text-ink hover:text-burnt-orange transition-colors tracking-[0.2em]">
          {label}
        </Link>
      ))}
      <div className="mt-4 pt-4 border-t border-[rgba(20,20,20,0.1)] text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-burnt-orange/25 bg-cream/90 shadow-[0_1px_3px_rgba(20,20,20,0.04),0_0_10px_rgba(224,86,38,0.08)]">
          <span className="w-1.5 h-1.5 rounded-full bg-burnt-orange shadow-[0_0_6px_rgba(224,86,38,0.7)] shrink-0" />
          <span className="italic text-[13px] text-ink/75 tracking-wide" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            developed by{' '}
            <span className="text-burnt-orange font-medium">
              kashyap
            </span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════ MAIN LANDING PAGE ═══════════ */
export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  // Parallax layers for depth separation
  const annotationParallax = useTransform(scrollY, [0, 1000], [0, 40]);
  const origamiParallax = useTransform(scrollY, [0, 1000], [0, 280]); // Moves DOWN
  const typeParallax = useTransform(scrollY, [0, 1000], [0, -220]); // Moves UP

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen relative">
      <LivingBackground />
      <DataLine />

      {/* ═══════════ HEADER BAR ═══════════ */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[rgba(20,20,20,0.08)]"
        style={{ backgroundColor: 'rgba(244, 241, 234, 0.92)', backdropFilter: 'blur(8px)' }}>
        <nav className="flex items-center justify-between px-6 md:px-10 h-14">
          <div className="flex items-center gap-6 lg:gap-8">
            <Link to="/" className="flex flex-col">
              <span className="font-mono text-[13px] font-bold tracking-[0.15em]" style={{ fontFamily: 'JetBrains Mono' }}>DSA HUB</span>
              <span className="w-7 h-[2.5px] bg-burnt-orange mt-0.5" />
            </Link>
            <span className="hidden md:block w-px h-4 bg-ink/15" />
            {/* Navigation links */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              <Link to="/notes" className="mono-tag text-[11px] text-ink hover:text-burnt-orange transition-colors">NOTES</Link>
              <Link to="/question-bank" className="mono-tag text-[11px] text-ink hover:text-burnt-orange transition-colors">QUESTIONS</Link>
              <Link to="/mind-maps" className="mono-tag text-[11px] text-ink hover:text-burnt-orange transition-colors">MAPS</Link>
              <Link to="/visualisers" className="mono-tag text-[11px] text-ink hover:text-burnt-orange transition-colors relative">
                LAB
                <span className="absolute -right-2.5 -top-0.5 w-1.5 h-1.5 rounded-full bg-burnt-orange" />
              </Link>
            </div>
          </div>

          {/* Right: Search trigger, Developer Signature (Editorial Pill) & Mobile toggle */}
          <div className="flex items-center gap-3 md:gap-4">
            <button 
              onClick={() => window.dispatchEvent(new Event('open-command-palette'))}
              aria-label="Open command palette"
              className="flex items-center gap-2 px-2 py-1.5 md:px-3 md:py-1.5 rounded border border-[rgba(20,20,20,0.15)] hover:border-[rgba(20,20,20,0.3)] transition-colors focus:outline-none focus:ring-1 focus:ring-ink"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink/70">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <span className="hidden md:inline text-[12px] text-ink/70" style={{ fontFamily: 'Inter, sans-serif' }}>Search...</span>
              <span className="hidden md:inline mono-label text-[9px] text-muted ml-1 bg-ink/5 px-1 rounded border border-ink/10">⌘K</span>
            </button>
            <div className="group relative inline-flex items-center gap-2 px-3 py-1 md:px-3.5 md:py-1 rounded-full border border-burnt-orange/25 bg-cream/70 hover:bg-burnt-orange/[0.06] hover:border-burnt-orange/45 shadow-[0_1px_3px_rgba(20,20,20,0.04),0_0_10px_rgba(224,86,38,0.08)] hover:shadow-[0_2px_10px_rgba(224,86,38,0.18)] transition-all duration-300">
              <span className="w-1.5 h-1.5 rounded-full bg-burnt-orange shadow-[0_0_6px_rgba(224,86,38,0.7)] shrink-0" />
              <span
                className="italic text-[12px] md:text-[13px] text-ink/75 tracking-wide select-none whitespace-nowrap"
                style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
              >
                developed by{' '}
                <span className="text-burnt-orange font-medium">
                  kashyap
                </span>
              </span>
            </div>
            {/* Mobile hamburger */}
            <button className="md:hidden mono-tag text-[14px] text-ink p-1" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu">
              ☰
            </button>
          </div>
        </nav>
      </header>
      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* ═══════════ HERO SECTION ═══════════ */}
      <section ref={heroRef} className="relative min-h-screen pt-14 flex flex-col overflow-hidden">

        {/* Left vertical label */}
        <div className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 items-center corner-marks z-30 pointer-events-none"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
          <span className="mono-label text-[9px] rotate-180 tracking-[0.2em]">DSA STUDY SERIES</span>
        </div>

        {/* ─── Top-Right Annotations (per reference) ─── */}
        <motion.div style={{ y: annotationParallax }} className="absolute top-20 md:top-24 right-6 md:right-12 z-30 pointer-events-none hidden md:block">
          <div className={`flex gap-16 lg:gap-24 transition-opacity duration-1000 delay-[600ms] ${heroVisible ? 'opacity-100' : 'opacity-0'}`}>
            {/* FIELD NOTES column */}
            <div className="text-left">
              <div className="mono-tag text-[11px] text-ink font-semibold">FIELD NOTES</div>
              <div className="mono-label text-[10px]">/ 01 — 05</div>
            </div>
            {/* LINKED LIST column */}
            <div className="text-right">
              <div className="mono-tag text-[11px] text-ink font-semibold">LINKED LIST</div>
              <div className="mono-label text-[10px] mt-1 text-ink-light">
                NODES<br />
                / connections<br />
                / sequence<br />
                / memory
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── Main Composition: Origami + Typography (per reference) ─── */}
        <div className="flex-1 relative flex items-center z-10 w-full max-w-[1600px] mx-auto min-h-[70vh] md:min-h-[80vh]">

          {/* Origami Layer — Positioned center-right, overlapping typography */}
          <motion.div
            className={`absolute right-[-5%] md:right-[5%] lg:right-[8%] top-[8%] md:top-[12%] w-[85%] md:w-[55%] lg:w-[52%] max-w-[780px] pointer-events-none transition-opacity duration-[1.5s] ease-out ${heroVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{ zIndex: 15, y: origamiParallax }}
          >
            <img
              src="/assets/hero-origami-transparent-clean2.webp"
              alt="Origami paper linked list sculpture"
              className="w-full h-auto drop-shadow-2xl"
              style={{ filter: 'contrast(1.02)' }}
            />
            {/* Interactive node hotspots */}
            <div className="absolute inset-0 pointer-events-auto hidden md:block">
              <NodeTooltip label="HEAD NODE" x="20%" y="25%" index="01" />
              <NodeTooltip label="DATA: 42" x="35%" y="32%" index="02" />
              <NodeTooltip label="DATA: 17" x="50%" y="38%" index="03" />
              <NodeTooltip label="DATA: 93" x="65%" y="45%" index="04" />
              <NodeTooltip label="NULL PTR" x="80%" y="55%" index="Ø" />
            </div>
            {/* Registration crosshair */}
            <div className="absolute -right-3 top-[15%] text-[14px] text-ink/20 font-mono select-none hidden lg:block">+</div>
          </motion.div>

          {/* Typography Foreground Layer — Left side, overlapping origami via mix-blend */}
          <motion.div style={{ y: typeParallax }} className="relative z-20 pointer-events-none w-full px-6 md:px-10 lg:pl-[8%]">
            <h1 className="font-normal text-[clamp(3.5rem,12vw,12rem)] leading-[0.82] tracking-[-0.04em] text-ink mix-blend-multiply"
              style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              <RevealText baseDelay={200}>DATA</RevealText>
              <RevealText baseDelay={900}>HAS</RevealText>
              <RevealText baseDelay={1600}>SHAPE.</RevealText>
            </h1>

            <div className={`mt-8 md:mt-14 pointer-events-auto transition-all duration-1000 delay-[2400ms] ease-out ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <p className="text-[15px] text-ink-light leading-relaxed max-w-[280px] mb-7"
                style={{ fontFamily: 'Inter, sans-serif' }}>
                A study of<br />structure, logic &amp; motion.
              </p>

              <div className="flex items-center gap-4 flex-wrap">
                <Link to="/notes" className="btn-editorial group">
                  <span className="text-burnt-orange arrow transition-transform group-hover:translate-x-1">→</span>
                  <span>CONTINUE LEARNING</span>
                </Link>
                <span className="hidden sm:block w-16 h-px bg-ink/20" />
                <span className="hidden sm:block mono-label text-[9px]">UNIT 1 / ARRAYS</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* FIG 1.2 annotation — bottom right per reference */}
        <motion.div style={{ y: annotationParallax }} className={`absolute bottom-[240px] right-6 md:right-12 z-30 pointer-events-none hidden md:block transition-opacity duration-1000 delay-[1000ms] ${heroVisible ? 'opacity-100' : 'opacity-0'}`}>
          <span className="mono-label text-[9px] text-muted text-right block">FIG. 1.2<br />SINGLY LINKED LIST</span>
        </motion.div>


        {/* ─── Bottom Ledger ─── */}
        <div className="border-t border-[rgba(20,20,20,0.12)] mt-auto relative z-10">
          <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[rgba(20,20,20,0.12)] max-w-[1400px] mx-auto">
            <LedgerItem num="01" title="NOTES" desc="In-depth theory and explanations." />
            <LedgerItem num="02" title="QUESTION BANK" desc="Practice. Understand. Master." />
            <LedgerItem num="03" title="FLASHCARDS" desc="Quick recall. Better retention." />
            <LedgerItem num="04" title="MIND MAPS" desc="See the big picture. Connect the dots." />
            <LedgerItem num="05" title="VISUALISERS" desc="Watch algorithms come alive." />
          </div>
        </div>

        {/* ─── Bottom Bar ─── */}
        <div className="border-t border-[rgba(20,20,20,0.12)] px-6 md:px-10 py-4 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-burnt-orange text-xs">◆</span>
            <span className="mono-label text-[9px] max-w-[240px]">ALGORITHMS ARE THE POETRY OF LOGICAL IDEAS.</span>
          </div>
          <Link to="/visualisers" className="flex items-center gap-3 group">
            <span className="mono-tag text-[11px] text-burnt-orange hidden sm:inline">ENTER THE LAB</span>
            <span className="hidden sm:inline mono-tag text-[11px] text-ink/40 group-hover:text-burnt-orange transition-colors">——</span>
            <span className="btn-circle-orange w-9 h-9 text-[14px] group-hover:bg-burnt-orange-hover">→</span>
          </Link>
        </div>
      </section>

      {/* ═══════════ SCROLL MORPH SECTION ═══════════ */}
      <div className="relative">
        <ScrollMorphSection />
      </div>

      {/* ═══════════ CURRICULUM CHOREOGRAPHY ═══════════ */}
      <section className="py-20 md:py-32 px-6 md:px-10 border-t border-[rgba(20,20,20,0.08)] relative">
        <div className="max-w-[1200px] mx-auto relative z-10">
          <SectionHeader subtitle="CURRICULUM / OVERVIEW" title={<>Five units.<br />One complete journey.</>} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
            {[
              { num: '01', title: 'Introduction to Data Structures', desc: 'Terminology, classification, ADTs, storage representations. The foundation.', link: '/notes/unit-1' },
              { num: '02', title: 'Linear Structures', desc: 'Arrays, stacks, queues, linked lists. Polish expressions, recursion, Tower of Hanoi.', link: '/notes/unit-2' },
              { num: '03', title: 'Non-Linear Structures', desc: 'Trees, binary search trees, graphs, BFS, DFS, spanning trees, shortest paths.', link: '/notes/unit-3' },
              { num: '04', title: 'Hashing & Files', desc: 'Symbol tables, hashing functions, collision resolution, file organization.', link: '/notes/unit-4' },
              { num: '05', title: 'Sorting & Searching', desc: 'Bubble, selection, insertion, merge, quick, heap sort. Linear & binary search.', link: '/notes/unit-5' },
              { num: '→', title: 'Explore the Lab', desc: 'Interactive visualisers that let you watch algorithms come alive, step by step.', link: '/visualisers' },
            ].map((item, i) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link to={item.link} className="group block h-full">
                  <div className="flex items-start gap-4 relative">
                    {/* Background to make the card opaque over the data line */}
                    <div className="absolute inset-0 -inset-x-6 -inset-y-6 bg-cream rounded-xl -z-10 transition-colors group-hover:bg-cream" />
                    
                    <span className="num-display text-[48px] leading-[0.8] text-muted opacity-40 group-hover:text-burnt-orange group-hover:opacity-100 transition-colors relative z-10">{item.num}</span>
                    <div className="pt-1 relative z-10">
                      <h3 className="mono-tag text-[12px] text-ink font-bold mb-2 group-hover:text-burnt-orange transition-colors">{item.title}</h3>
                      <p className="text-[13px] text-muted leading-relaxed">{item.desc}</p>
                      <span className="inline-block mt-3 mono-label text-[9px] text-burnt-orange opacity-0 group-hover:opacity-100 transition-opacity">
                        EXPLORE →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ STICKY FEATURE STORY ═══════════ */}
      <StickyFeatureStory />

      {/* ═══════════ FINAL CTA ═══════════ */}
      <section className="py-24 md:py-40 px-6 md:px-10 border-t border-[rgba(20,20,20,0.08)] text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[600px] mx-auto relative z-10"
        >
          <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] tracking-[-0.04em] leading-[0.95]"
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Start<br />learning.
          </h2>
          <p className="text-[14px] text-muted mt-6 mb-10">
            Five units. Hundreds of questions. Interactive visualisers.<br className="hidden md:block" />
            Everything you need to master data structures.
          </p>
          <Link to="/notes" className="inline-flex items-center gap-4 group">
            <span id="cta-circle" className="btn-circle-orange w-12 h-12 text-lg group-hover:scale-110 transition-transform">→</span>
            <span className="mono-tag text-[12px] text-burnt-orange">BEGIN UNIT 1</span>
          </Link>
        </motion.div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="border-t border-[rgba(20,20,20,0.08)] px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
        <span className="mono-label text-[9px]">DSA HUB — STUDY SERIES</span>
        <div className="flex items-center gap-6">
          <Link to="/notes" className="mono-label text-[9px] hover:text-burnt-orange transition-colors">NOTES</Link>
          <Link to="/question-bank" className="mono-label text-[9px] hover:text-burnt-orange transition-colors">QUESTIONS</Link>
          <Link to="/flashcards" className="mono-label text-[9px] hover:text-burnt-orange transition-colors">FLASHCARDS</Link>
          <Link to="/mind-maps" className="mono-label text-[9px] hover:text-burnt-orange transition-colors">MAPS</Link>
          <Link to="/visualisers" className="mono-label text-[9px] hover:text-burnt-orange transition-colors">LAB</Link>
        </div>
      </footer>
    </div>
  );
}
