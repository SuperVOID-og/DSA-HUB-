import { useState, useMemo, useEffect } from 'react';
import { questionBank } from '../data/questions';
import { flashcards } from '../data/flashcards';

type PracticeItem = 
  | { type: 'question'; id: string; front: string; back: string; category: string }
  | { type: 'flashcard'; id: string; front: string; back: string; category: string };

export default function PracticePage() {
  const [currentItem, setCurrentItem] = useState<PracticeItem | null>(null);
  const [revealed, setRevealed] = useState(false);

  const pool = useMemo<PracticeItem[]>(() => {
    const qItems: PracticeItem[] = questionBank.map(q => ({
      type: 'question',
      id: `q-${q.id}`,
      front: q.question,
      back: q.answer,
      category: `Unit ${q.unitId.replace('unit-', '')} Question`,
    }));
    
    const fItems: PracticeItem[] = flashcards.map(f => ({
      type: 'flashcard',
      id: `f-${f.id}`,
      front: f.front,
      back: f.back,
      category: f.category,
    }));

    return [...qItems, ...fItems];
  }, []);

  const pickRandom = () => {
    setRevealed(false);
    if (pool.length === 0) return;
    const randomIdx = Math.floor(Math.random() * pool.length);
    setCurrentItem(pool[randomIdx]);
  };

  // Pick initially
  useEffect(() => {
    pickRandom();
  }, [pool]);

  const truncateAnswer = (text: string, maxLen: number = 800): string => {
    if (text.length <= maxLen) return text;
    return text.slice(0, maxLen).replace(/\s+\S*$/, '') + '…';
  };

  if (!currentItem) return null;

  return (
    <div className="max-w-[700px] mx-auto py-12 md:py-20 px-4">
      <div className="mb-12 text-center">
        <div className="mono-label text-[10px] mb-3 text-burnt-orange">RANDOM PRACTICE</div>
        <h1 className="text-[clamp(2rem,4vw,3rem)] tracking-[-0.03em] leading-tight"
          style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
          Surprise Me.
        </h1>
        <p className="text-[14px] text-muted mt-3">
          Randomly selected concepts, questions, and flashcards to test your recall.
        </p>
      </div>

      <div className="border border-ink/15 bg-cream p-8 md:p-12 min-h-[300px] flex flex-col justify-between relative shadow-sm">
        <div>
          <div className="flex justify-between items-center mb-6">
             <div className="mono-label text-[9px] text-muted uppercase tracking-wider">{currentItem.category}</div>
             <div className="mono-label text-[9px] text-ink/40 bg-ink/5 px-2 py-1 rounded">{currentItem.type}</div>
          </div>
          
          <div className="text-[1.2rem] md:text-[1.5rem] leading-snug font-medium text-ink tracking-tight mb-8"
               style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            {currentItem.front}
          </div>
          
          {revealed && (
            <div className="mt-8 pt-8 border-t border-ink/10 animate-in fade-in slide-in-from-top-4">
              <div className="mono-label text-[9px] text-burnt-orange mb-4">ANSWER</div>
              <div className="text-[13px] leading-[1.7] text-ink-light whitespace-pre-wrap">
                {truncateAnswer(currentItem.back)}
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 flex items-center justify-between">
          <button 
            onClick={() => setRevealed(!revealed)}
            className="mono-tag text-[11px] px-4 py-2 bg-ink text-cream hover:bg-ink-light transition-colors"
          >
            {revealed ? 'HIDE ANSWER' : 'REVEAL ANSWER'}
          </button>
          
          <button 
            onClick={pickRandom}
            className="flex items-center gap-2 mono-tag text-[11px] px-4 py-2 border border-ink/15 hover:border-ink/30 text-ink transition-colors"
          >
            <span>NEXT</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
