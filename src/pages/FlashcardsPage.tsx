import { useState, useMemo, useCallback } from 'react';
import { flashcards } from '../data/flashcards';
import { units } from '../data';
import BookmarkButton from '../components/BookmarkButton';
import { Bookmark as BookmarkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FlashcardsPage() {
  const [selectedUnit, setSelectedUnit] = useState<string>('all');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [shuffled, setShuffled] = useState(false);

  const filtered = useMemo(() => {
    let cards = flashcards.filter((fc) => selectedUnit === 'all' || fc.unitId === selectedUnit);
    if (shuffled) {
      cards = [...cards].sort(() => Math.random() - 0.5);
    }
    return cards;
  }, [selectedUnit, shuffled]);

  const card = filtered[currentIdx];

  const next = useCallback(() => {
    setFlipped(false);
    setTimeout(() => setCurrentIdx((i) => (i + 1) % filtered.length), 150);
  }, [filtered.length]);

  const prev = useCallback(() => {
    setFlipped(false);
    setTimeout(() => setCurrentIdx((i) => (i - 1 + filtered.length) % filtered.length), 150);
  }, [filtered.length]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setFlipped(!flipped); }
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  }, [flipped, next, prev]);

  if (!card) {
    return (
      <div className="text-center py-20">
        <h2 className="text-[1.5rem]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>No flashcards found.</h2>
      </div>
    );
  }

  // Truncate long answer to fit card without overflow
  const truncateAnswer = (text: string, maxLen: number = 320): string => {
    if (text.length <= maxLen) return text;
    return text.slice(0, maxLen).replace(/\s+\S*$/, '') + '…';
  };

  return (
    <div>
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <div className="mono-label text-[10px]">FLASHCARDS / STUDY</div>
          <Link to="/bookmarks?type=flashcard" className="flex items-center gap-1.5 mono-label text-[9px] text-muted hover:text-burnt-orange transition-colors">
            <BookmarkIcon size={12} />
            SAVED FLASHCARDS
          </Link>
        </div>
        <h1 className="text-[clamp(2rem,5vw,3.5rem)] tracking-[-0.03em]"
          style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
          Flashcards.
        </h1>
        <p className="text-[14px] text-muted mt-3 max-w-[480px]">
          Quick recall. Better retention. {flashcards.length} cards generated from the question bank.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <button
          onClick={() => { setSelectedUnit('all'); setCurrentIdx(0); setFlipped(false); }}
          className={`mono-tag text-[10px] px-3 py-1.5 border transition-colors ${
            selectedUnit === 'all' ? 'border-ink bg-ink text-cream' : 'border-ink/15 text-muted hover:border-ink/30'
          }`}
        >
          ALL
        </button>
        {units.map((unit) => (
          <button
            key={unit.id}
            onClick={() => { setSelectedUnit(unit.id); setCurrentIdx(0); setFlipped(false); }}
            className={`mono-tag text-[10px] px-3 py-1.5 border transition-colors ${
              selectedUnit === unit.id ? 'border-ink bg-ink text-cream' : 'border-ink/15 text-muted hover:border-ink/30'
            }`}
          >
            UNIT {unit.number}
          </button>
        ))}
        <button
          onClick={() => { setShuffled(!shuffled); setCurrentIdx(0); setFlipped(false); }}
          className={`mono-tag text-[10px] px-3 py-1.5 border transition-colors ${
            shuffled ? 'border-burnt-orange text-burnt-orange' : 'border-ink/15 text-muted hover:border-ink/30'
          }`}
        >
          ⟳ SHUFFLE
        </button>
      </div>

      {/* Card */}
      <div className="flex flex-col items-center">
        <div
          className="flashcard-container w-full max-w-[600px] cursor-pointer"
          onClick={() => setFlipped(!flipped)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="button"
          aria-label={flipped ? 'Hide answer' : 'Reveal answer'}
        >
          <div className={`flashcard-inner w-full ${flipped ? 'flipped' : ''}`} style={{ height: '320px' }}>
            {/* Front */}
            <div className="flashcard-front absolute inset-0 border border-ink/15 p-6 md:p-8 flex flex-col justify-between bg-cream overflow-hidden">
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="mono-label text-[9px] text-burnt-orange">{card.category}</div>
                  <div className="mono-label text-[9px] text-muted">{currentIdx + 1} / {filtered.length}</div>
                </div>
                <p className="text-[clamp(0.95rem,2.2vw,1.25rem)] leading-snug tracking-[-0.01em]"
                  style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                  {card.front.length > 180 ? card.front.slice(0, 180).replace(/\s+\S*$/, '') + '…' : card.front}
                </p>
              </div>
              <div className="flex items-center justify-between mt-4 shrink-0">
                <div className="mono-label text-[8px] text-muted">SPACE / ENTER TO REVEAL</div>
                <div className="mono-label text-[8px] text-muted">← → NAVIGATE</div>
              </div>
            </div>

            {/* Back */}
            <div className="flashcard-back absolute inset-0 border border-burnt-orange/30 p-6 md:p-8 flex flex-col justify-between bg-cream overflow-hidden">
              <div className="flex-1 overflow-y-auto editorial-scrollbar">
                <div className="flex items-center justify-between mb-4">
                  <div className="mono-label text-[9px] text-burnt-orange">ANSWER</div>
                  <div className="mono-label text-[9px] text-muted">{currentIdx + 1} / {filtered.length}</div>
                </div>
                <p className="text-[13px] leading-[1.7] text-ink-light whitespace-pre-wrap">
                  {truncateAnswer(card.back, 400)}
                </p>
              </div>
              <div className="mono-label text-[8px] text-muted mt-4 shrink-0">TAP TO FLIP BACK</div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6 mt-8 w-full max-w-[600px] justify-between">
          <button onClick={prev} className="mono-tag text-[11px] text-muted hover:text-ink transition-colors" aria-label="Previous card">
            ← PREV
          </button>
          <BookmarkButton 
            bookmark={{
              id: `f-${card.id}`,
              type: 'flashcard',
              title: card.front,
              unitId: card.unitId,
              timestamp: Date.now()
            }} 
            className="border border-ink/15 px-3 py-1 rounded-none hover:bg-transparent"
          />
          <button onClick={next} className="mono-tag text-[11px] text-muted hover:text-ink transition-colors" aria-label="Next card">
            NEXT →
          </button>
        </div>
      </div>
    </div>
  );
}
