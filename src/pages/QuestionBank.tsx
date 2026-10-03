import { useState, useMemo } from 'react';
import { questionBank } from '../data/questions';
import { units } from '../data';
import { useQuestionStore } from '../store/useQuestionStore';
import BookmarkButton from '../components/BookmarkButton';
import { Bookmark as BookmarkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function QuestionBank() {
  const [selectedUnit, setSelectedUnit] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { completed, toggleCompleted } = useQuestionStore();

  const filtered = useMemo(() => {
    return questionBank.filter((q) => {
      const matchUnit = selectedUnit === 'all' || q.unitId === selectedUnit;
      const matchSearch = !searchQuery || q.question.toLowerCase().includes(searchQuery.toLowerCase());
      return matchUnit && matchSearch;
    });
  }, [selectedUnit, searchQuery]);

  return (
    <div>
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <div className="mono-label text-[10px]">QUESTION BANK / PRACTICE</div>
          <Link to="/bookmarks?type=question" className="flex items-center gap-1.5 mono-label text-[9px] text-muted hover:text-burnt-orange transition-colors">
            <BookmarkIcon size={12} />
            SAVED QUESTIONS
          </Link>
        </div>
        <h1 className="text-[clamp(2rem,5vw,3.5rem)] tracking-[-0.03em]"
          style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
          Questions.
        </h1>
        <p className="text-[14px] text-muted mt-3 max-w-[480px]">
          Practice. Understand. Master. {questionBank.length} questions across all units.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setSelectedUnit('all')}
            className={`mono-tag text-[10px] px-3 py-1.5 border transition-colors ${
              selectedUnit === 'all' ? 'border-ink bg-ink text-cream' : 'border-ink/15 text-muted hover:border-ink/30'
            }`}
          >
            ALL
          </button>
          {units.map((unit) => (
            <button
              key={unit.id}
              onClick={() => setSelectedUnit(unit.id)}
              className={`mono-tag text-[10px] px-3 py-1.5 border transition-colors ${
                selectedUnit === unit.id ? 'border-ink bg-ink text-cream' : 'border-ink/15 text-muted hover:border-ink/30'
              }`}
            >
              U{unit.number}
            </button>
          ))}
        </div>
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border border-ink/10 px-4 py-2 text-[13px] placeholder:text-muted/50 focus:border-burnt-orange focus:outline-none transition-colors"
            style={{ fontFamily: 'Inter, sans-serif' }}
          />
        </div>
      </div>

      {/* Results count */}
      <div className="mono-label text-[9px] text-muted mb-4">{filtered.length} QUESTIONS</div>

      {/* Questions */}
      <div className="space-y-0">
        {filtered.map((q) => {
          const isExpanded = expandedId === q.id;
          const isCompleted = completed.includes(q.id);

          return (
            <div key={q.id} className="border-b border-ink/8">
              <div className="w-full flex items-start gap-4 py-4 px-2 hover:bg-[rgba(224,86,38,0.02)] transition-colors group">
                <button 
                  onClick={() => setExpandedId(isExpanded ? null : q.id)}
                  className="flex-1 flex items-start gap-4 text-left"
                >
                  <span className={`mono-label text-[10px] w-6 pt-0.5 ${isCompleted ? 'text-burnt-orange' : 'text-muted'}`}>
                    {isCompleted ? '✓' : String(q.number).padStart(2, '0')}
                  </span>
                  <div className="flex-1 pr-4">
                    <p className={`text-[14px] leading-snug ${isCompleted ? 'text-muted line-through' : 'text-ink'}`}>
                      {q.question}
                    </p>
                    {q.marks && (
                      <span className="mono-label text-[8px] text-muted mt-1 inline-block">{q.marks}</span>
                    )}
                  </div>
                </button>
                <div className="flex flex-col items-center gap-2 pt-1 shrink-0">
                  <BookmarkButton 
                    bookmark={{
                      id: `q-${q.id}`,
                      type: 'question',
                      title: q.question,
                      unitId: q.unitId,
                      timestamp: Date.now()
                    }} 
                  />
                  <button onClick={() => setExpandedId(isExpanded ? null : q.id)} className="mono-tag text-[12px] text-muted/40 hover:text-ink transition-colors">
                    {isExpanded ? '−' : '+'}
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="pl-12 pr-4 pb-5">
                  <div className="border-l-2 border-burnt-orange/30 pl-5 py-2">
                    <div className="mono-label text-[9px] text-burnt-orange mb-2">ANSWER</div>
                    <p className="text-[13px] leading-[1.8] text-ink-light whitespace-pre-wrap">
                      {q.answer}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleCompleted(q.id); }}
                      className={`mono-label text-[9px] transition-colors ${isCompleted ? 'text-burnt-orange' : 'text-muted hover:text-ink'}`}
                    >
                      {isCompleted ? '✓ COMPLETED' : 'MARK DONE'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
