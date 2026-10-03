import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const navLinks = [
  { label: 'NOTES', path: '/notes' },
  { label: 'QUESTIONS', path: '/question-bank' },
  { label: 'FLASHCARDS', path: '/flashcards' },
  { label: 'MAPS', path: '/mind-maps' },
  { label: 'LAB', path: '/visualisers', accent: true },
];

export default function EditorialNav() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: 'rgba(244, 241, 234, 0.92)', backdropFilter: 'blur(8px)' }}>
      <nav className="flex items-center justify-between px-6 md:px-10 h-14 border-b border-[rgba(20,20,20,0.08)]">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex flex-col">
            <span className="font-mono text-[13px] font-bold tracking-[0.15em]" style={{ fontFamily: 'JetBrains Mono' }}>DSA HUB</span>
            <span className="w-7 h-[2.5px] bg-burnt-orange mt-0.5" />
          </Link>
          <span className="hidden md:block mono-label text-[9px] leading-tight max-w-[200px]">
            STRUCTURE &gt; LOGIC &gt; MOTION<br />BUILDING BETTER THINKERS.
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname.startsWith(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`mono-tag text-[11px] transition-colors duration-200 relative ${
                  isActive ? 'text-burnt-orange' : 'text-ink hover:text-burnt-orange'
                }`}
              >
                {link.label}
                {link.accent && (
                  <span className="absolute -right-2.5 -top-0.5 w-1.5 h-1.5 rounded-full bg-burnt-orange" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right side controls: Search + Mobile menu */}
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

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1 p-2"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-[1.5px] bg-ink transition-transform ${mobileOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-ink transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-ink transition-transform ${mobileOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-b border-[rgba(20,20,20,0.08)]" style={{ backgroundColor: 'rgba(244, 241, 234, 0.98)' }}>
          <div className="flex flex-col py-4 px-6 gap-4">
            {navLinks.map((link) => {
              const isActive = location.pathname.startsWith(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`mono-tag text-[12px] py-1 ${
                    isActive ? 'text-burnt-orange' : 'text-ink'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
