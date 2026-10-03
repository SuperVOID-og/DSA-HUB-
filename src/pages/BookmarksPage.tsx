import { useBookmarkStore } from '../store/useBookmarkStore';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, HelpCircle, Layers, Trash2 } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';

export default function BookmarksPage() {
  const { bookmarks, removeBookmark } = useBookmarkStore();
  const location = useLocation();
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const typeParam = params.get('type');
    if (typeParam && ['note', 'question', 'flashcard'].includes(typeParam)) {
      setFilter(typeParam);
    }
  }, [location.search]);

  const filteredBookmarks = useMemo(() => {
    if (filter === 'all') return bookmarks;
    return bookmarks.filter(b => b.type === filter);
  }, [bookmarks, filter]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'note': return <BookOpen size={16} className="text-burnt-orange" />;
      case 'question': return <HelpCircle size={16} className="text-burnt-orange" />;
      case 'flashcard': return <Layers size={16} className="text-burnt-orange" />;
      default: return <BookOpen size={16} />;
    }
  };

  const getUrl = (bookmark: any) => {
    if (bookmark.url) return bookmark.url;
    if (bookmark.type === 'question') return `/question-bank?q=${bookmark.id}`;
    if (bookmark.type === 'note') return `/notes/${bookmark.unitId || 'unit-1'}#${bookmark.id}`;
    if (bookmark.type === 'flashcard') return `/flashcards`;
    return '/'; // fallback
  };

  return (
    <div className="max-w-[800px] mx-auto py-12 md:py-20 px-4">
      <div className="mb-10">
        <div className="mono-label text-[10px] mb-3 text-burnt-orange">SAVED CONTENT</div>
        <h1 className="text-[clamp(2rem,4vw,3.5rem)] tracking-[-0.03em] leading-tight"
          style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
          Bookmarks.
        </h1>
        <p className="text-[14px] text-muted mt-3 max-w-[480px]">
          Your saved concepts, notes, and challenging questions.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-3 mb-8 border-b border-ink/10 pb-4">
        {[
          { id: 'all', label: 'ALL' },
          { id: 'note', label: 'NOTES' },
          { id: 'question', label: 'QUESTIONS' },
          { id: 'flashcard', label: 'FLASHCARDS' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`mono-tag text-[10px] px-3 py-1.5 border transition-colors ${
              filter === tab.id ? 'border-ink bg-ink text-cream' : 'border-ink/15 text-muted hover:border-ink/30'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filteredBookmarks.length === 0 ? (
        <div className="border border-ink/15 bg-cream p-12 text-center text-muted">
          No bookmarks found in this category.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookmarks.map(b => (
            <div key={b.id} className="group border border-ink/15 bg-cream p-4 flex items-start justify-between hover:border-ink/30 transition-colors">
              <Link to={getUrl(b)} className="flex items-start gap-4 flex-1">
                <div className="mt-1">{getIcon(b.type)}</div>
                <div>
                  <div className="text-[14px] font-medium text-ink tracking-tight hover:text-burnt-orange transition-colors">
                    {b.title}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="mono-tag text-[9px] bg-ink/5 px-1.5 py-0.5 uppercase">{b.type}</span>
                    {b.unitId && <span className="mono-tag text-[9px] text-muted uppercase">Unit {b.unitId.replace('unit-', '')}</span>}
                  </div>
                </div>
              </Link>
              <button 
                onClick={(e) => { e.preventDefault(); removeBookmark(b.id); }}
                className="p-2 text-ink/20 hover:text-burnt-orange transition-colors"
                aria-label="Remove bookmark"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
