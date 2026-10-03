import { useState } from 'react';

const SAMPLE_CARDS = [
  {
    front: 'What is a Data Structure?',
    back: 'A specialized format for organizing, storing, and retrieving data efficiently. It establishes logical relationships among data items.',
    category: 'DEFINITION',
  },
  {
    front: 'Stack: LIFO or FIFO?',
    back: 'LIFO — Last In, First Out. The most recently added element is removed first. Think of a stack of plates.',
    category: 'CONCEPT',
  },
  {
    front: 'Binary Search complexity?',
    back: 'O(log n) — halves the search space at every step. Requires sorted input.',
    category: 'ALGORITHM',
  },
];

export default function FlashcardPreview() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const card = SAMPLE_CARDS[currentIdx];

  const next = () => {
    setFlipped(false);
    setTimeout(() => setCurrentIdx((i) => (i + 1) % SAMPLE_CARDS.length), 200);
  };

  const prev = () => {
    setFlipped(false);
    setTimeout(() => setCurrentIdx((i) => (i - 1 + SAMPLE_CARDS.length) % SAMPLE_CARDS.length), 200);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Card */}
      <div
        className="flashcard-container w-full max-w-[500px] cursor-pointer"
        onClick={() => setFlipped(!flipped)}
        onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') setFlipped(!flipped); }}
        tabIndex={0}
        role="button"
        aria-label={flipped ? 'Hide answer' : 'Reveal answer'}
      >
        <div className={`flashcard-inner w-full ${flipped ? 'flipped' : ''}`} style={{ minHeight: '220px' }}>
          {/* Front */}
          <div className="flashcard-front absolute inset-0 border border-ink/15 p-8 flex flex-col justify-between bg-cream">
            <div>
              <div className="mono-label text-[9px] text-burnt-orange mb-4">{card.category}</div>
              <p className="text-[18px] leading-snug tracking-[-0.01em]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                {card.front}
              </p>
            </div>
            <div className="mono-label text-[8px] text-muted self-end">TAP TO REVEAL</div>
          </div>

          {/* Back */}
          <div className="flashcard-back absolute inset-0 border border-burnt-orange/30 p-8 flex flex-col justify-between bg-cream">
            <div>
              <div className="mono-label text-[9px] text-burnt-orange mb-4">ANSWER</div>
              <p className="text-[14px] leading-relaxed text-ink-light">
                {card.back}
              </p>
            </div>
            <div className="mono-label text-[8px] text-muted self-end">TAP TO FLIP BACK</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6 mt-6">
        <button onClick={prev} className="mono-tag text-[11px] text-muted hover:text-ink transition-colors" aria-label="Previous card">
          ← PREV
        </button>
        <span className="mono-label text-[9px] text-muted">
          {currentIdx + 1} / {SAMPLE_CARDS.length}
        </span>
        <button onClick={next} className="mono-tag text-[11px] text-muted hover:text-ink transition-colors" aria-label="Next card">
          NEXT →
        </button>
      </div>
    </div>
  );
}
