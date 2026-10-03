import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Command, BookOpen, Layers, Lightbulb, Zap, HelpCircle, Shuffle } from 'lucide-react';
import { units } from '../data';
import { questionBank } from '../data/questions';
import { flashcards } from '../data/flashcards';

type Result = {
  id: string;
  title: string;
  subtitle?: string;
  type: 'route' | 'unit' | 'topic' | 'question' | 'flashcard' | 'action';
  icon: React.ReactNode;
  url: string;
};

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    const handleOpenEvent = () => setIsOpen(true);
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleOpenEvent);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleOpenEvent);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Build the index
  const staticRoutes: Result[] = [
    { id: 'r-home', title: 'Home', type: 'route', icon: <Command size={16} />, url: '/' },
    { id: 'r-notes', title: 'Notes Overview', type: 'route', icon: <BookOpen size={16} />, url: '/notes' },
    { id: 'r-questions', title: 'Question Bank', type: 'route', icon: <HelpCircle size={16} />, url: '/question-bank' },
    { id: 'r-flashcards', title: 'Flashcards', type: 'route', icon: <Layers size={16} />, url: '/flashcards' },
    { id: 'r-visualisers', title: 'Visualisers', type: 'route', icon: <Zap size={16} />, url: '/visualisers' },
    { id: 'r-mindmaps', title: 'Mind Maps', type: 'route', icon: <Lightbulb size={16} />, url: '/mind-maps' },
    { id: 'r-bookmarks', title: 'Bookmarks', type: 'route', icon: <BookOpen size={16} />, url: '/bookmarks' },
    { id: 'a-random', title: 'Surprise Me (Random Practice)', type: 'action', icon: <Shuffle size={16} />, url: '/practice' },
  ];

  const unitResults: Result[] = units.map(u => ({
    id: `u-${u.id}`,
    title: `Unit ${u.number}: ${u.title}`,
    type: 'unit',
    icon: <BookOpen size={16} />,
    url: `/notes/${u.id}`
  }));

  const topicResults: Result[] = units.flatMap(u => 
    u.topics.map(t => ({
      id: `t-${u.id}-${t.id}`,
      title: t.title,
      subtitle: `Unit ${u.number}`,
      type: 'topic',
      icon: <Layers size={16} />,
      url: `/notes/${u.id}#${t.id}`
    }))
  );

  const qResults: Result[] = questionBank.map(q => ({
    id: `q-${q.id}`,
    title: q.question,
    subtitle: `Question Bank`,
    type: 'question',
    icon: <HelpCircle size={16} />,
    url: `/question-bank?q=${q.id}`
  }));

  const fResults: Result[] = flashcards.map(f => ({
    id: `f-${f.id}`,
    title: f.front,
    subtitle: `Flashcard`,
    type: 'flashcard',
    icon: <Layers size={16} />,
    url: `/flashcards`
  }));

  const allResults = [...staticRoutes, ...unitResults, ...topicResults, ...qResults, ...fResults];

  const filtered = query.length === 0 
    ? staticRoutes 
    : allResults.filter(r => 
        r.title.toLowerCase().includes(query.toLowerCase()) || 
        r.subtitle?.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8);

  const handleSelect = (url: string) => {
    setIsOpen(false);
    navigate(url);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((s) => (s + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((s) => (s - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        handleSelect(filtered[selectedIndex].url);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
      <div 
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      <div className="relative bg-cream border border-ink/10 shadow-2xl w-full max-w-2xl overflow-hidden rounded-md animate-in fade-in slide-in-from-top-4 duration-200">
        <div className="flex items-center border-b border-ink/10 px-4 py-3">
          <Search className="text-muted mr-3" size={18} />
          <input
            ref={inputRef}
            className="flex-1 bg-transparent border-none outline-none text-ink text-lg placeholder:text-ink/30"
            placeholder="Search topics, questions, units..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
          />
          <div className="mono-label text-[9px] text-muted ml-3 border border-ink/10 px-1.5 py-0.5 rounded">ESC</div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {filtered.length === 0 && (
            <div className="p-4 text-center text-muted text-sm">No results found.</div>
          )}
          {filtered.map((item, index) => {
            const isSelected = index === selectedIndex;
            return (
              <div
                key={item.id}
                className={`flex items-center px-4 py-3 cursor-pointer rounded-sm ${isSelected ? 'bg-ink/5' : 'hover:bg-ink/5'}`}
                onMouseEnter={() => setSelectedIndex(index)}
                onClick={() => handleSelect(item.url)}
              >
                <div className={`mr-4 ${isSelected ? 'text-burnt-orange' : 'text-muted'}`}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] text-ink font-medium truncate">{item.title}</div>
                  {item.subtitle && <div className="text-[11px] text-muted mt-0.5">{item.subtitle}</div>}
                </div>
                {item.type === 'action' && <div className="mono-tag text-[9px] text-burnt-orange bg-burnt-orange/10 px-2 py-0.5 ml-2">ACTION</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
