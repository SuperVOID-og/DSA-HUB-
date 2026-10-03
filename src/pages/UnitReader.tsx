import { useParams, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUnitById } from '../data';
import type { Section } from '../data/types';
import BookmarkButton from '../components/BookmarkButton';
import { Bookmark as BookmarkIcon, ChevronDown, AlertTriangle } from 'lucide-react';

function RenderSection({ section }: { section: Section }) {
  switch (section.type) {
    case 'h2':
      return (
        <h2 className="text-[clamp(1.3rem,3vw,1.8rem)] mt-12 mb-4 tracking-[-0.02em]"
          style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
          {section.content}
        </h2>
      );
    case 'h3':
      return (
        <h3 className="mono-tag text-[12px] font-bold text-ink mt-8 mb-3 tracking-[0.05em]">
          {section.content}
        </h3>
      );
    case 'text':
      return (
        <p className="text-[14px] leading-[1.8] text-ink-light mb-4">
          {section.content}
        </p>
      );
    case 'definition':
      return (
        <div className="border-l-2 border-burnt-orange pl-5 py-3 my-5">
          <div className="mono-tag text-[10px] text-burnt-orange font-bold mb-1">{section.term}</div>
          <p className="text-[14px] leading-[1.7] text-ink-light">{section.definition}</p>
        </div>
      );
    case 'list':
      return (
        <ul className="my-4 space-y-2 pl-5">
          {section.items.map((item, i) => (
            <li key={i} className="text-[14px] leading-[1.7] text-ink-light relative before:content-['—'] before:absolute before:-left-5 before:text-muted">
              {item}
            </li>
          ))}
        </ul>
      );
    case 'code':
      return (
        <div className="my-6 border border-ink/10 bg-ink text-[#F4F1EA] p-5 overflow-x-auto">
          <div className="mono-label text-[8px] text-[rgba(244,241,234,0.4)] mb-3">{section.language.toUpperCase()}</div>
          <pre className="text-[13px] leading-relaxed whitespace-pre" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            {section.code}
          </pre>
        </div>
      );
    case 'table':
      return (
        <div className="my-6 overflow-x-auto border border-ink/10">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-ink text-cream">
                {section.headers.map((h, i) => (
                  <th key={i} className="px-4 py-3 text-left mono-tag text-[10px] font-bold tracking-[0.08em]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.rows.map((row, i) => (
                <tr key={i} className="border-b border-ink/5 hover:bg-[rgba(224,86,38,0.03)]">
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-3 text-ink-light leading-relaxed">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'callout':
      return (
        <div className={`my-6 p-5 border-l-2 ${
          section.variant === 'tip' ? 'border-burnt-orange bg-[rgba(224,86,38,0.04)]' :
          section.variant === 'warning' ? 'border-[#D97706] bg-[rgba(217,119,6,0.04)]' :
          'border-ink/20 bg-[rgba(20,20,20,0.02)]'
        }`}>
          {section.title && (
            <div className="mono-tag text-[10px] font-bold mb-2">{section.title}</div>
          )}
          <p className="text-[14px] leading-[1.7] text-ink-light">{section.content}</p>
        </div>
      );
    case 'image':
      return (
        <figure className="my-6">
          <img src={section.src} alt={section.alt} className="border border-ink/10" />
          {section.caption && (
            <figcaption className="mono-label text-[9px] mt-2">{section.caption}</figcaption>
          )}
        </figure>
      );
    default:
      return null;
  }
}

function DeepDive({ sections }: { sections: Section[] }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!sections || sections.length === 0) return null;

  return (
    <div className="my-8 border border-ink/15">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-[rgba(20,20,20,0.02)] hover:bg-[rgba(20,20,20,0.05)] transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="mono-tag text-[10px] font-bold text-ink tracking-[0.1em]">DEEP DIVE</div>
          <div className="text-[13px] text-muted">Advanced concepts & intuition</div>
        </div>
        <ChevronDown size={16} className={`text-muted transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="p-5 md:p-8 border-t border-ink/10 bg-cream animate-in fade-in slide-in-from-top-2 duration-300">
          {sections.map((section) => (
            <RenderSection key={section.id} section={section} />
          ))}
        </div>
      )}
    </div>
  );
}

function CommonMistakes({ sections }: { sections: Section[] }) {
  if (!sections || sections.length === 0) return null;

  return (
    <div className="my-8 border border-[#D97706]/30 bg-[rgba(217,119,6,0.03)] p-5 md:p-8">
      <div className="flex items-center gap-2 mb-6 border-b border-[#D97706]/20 pb-3">
        <AlertTriangle size={14} className="text-[#D97706]" />
        <div className="mono-tag text-[10px] font-bold text-[#D97706] tracking-[0.1em]">COMMON MISTAKES</div>
      </div>
      <div className="space-y-2">
        {sections.map((section) => (
          <RenderSection key={section.id} section={section} />
        ))}
      </div>
    </div>
  );
}

export default function UnitReader() {
  const { unitId } = useParams();
  const location = useLocation();
  const unit = getUnitById(unitId || '');

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location.hash]);

  if (!unit) {
    return (
      <div className="text-center py-20">
        <h2 className="text-[2rem]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>Unit not found.</h2>
        <Link to="/notes" className="btn-editorial mt-6 inline-flex">
          <span className="arrow">←</span>
          <span>BACK TO NOTES</span>
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <Link to="/notes" className="mono-label text-[9px] text-muted hover:text-burnt-orange transition-colors inline-block">
            ← ALL UNITS
          </Link>
          <div className="flex items-center gap-4">
            <Link to={`/revision/${unit.id}`} className="flex items-center gap-1.5 mono-tag text-[9px] bg-ink text-cream px-2 py-1 hover:bg-ink-light transition-colors">
              <span className="text-burnt-orange">⚡</span> QUICK REVISION
            </Link>
            <Link to="/bookmarks?type=note" className="flex items-center gap-1.5 mono-label text-[9px] text-muted hover:text-burnt-orange transition-colors">
              <BookmarkIcon size={12} />
              SAVED NOTES
            </Link>
          </div>
        </div>
        <div className="flex items-start gap-4 mt-2">
          <span className="num-display text-[48px]">{String(unit.number).padStart(2, '0')}</span>
          <div>
            <h1 className="text-[clamp(1.5rem,4vw,2.5rem)] tracking-[-0.03em]"
              style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              {unit.title}
            </h1>
            <p className="text-[14px] text-muted mt-1">{unit.description}</p>
          </div>
        </div>
      </div>

      {/* Table of contents */}
      <div className="border border-ink/10 p-5 mb-12">
        <div className="mono-tag text-[10px] font-bold mb-3">CONTENTS</div>
        <div className="space-y-1.5">
          {unit.topics.map((topic, i) => (
            <a key={topic.id} href={`#${topic.id}`} className="flex items-center gap-3 text-[13px] text-muted hover:text-burnt-orange transition-colors">
              <span className="mono-label text-[9px] w-5">{String(i + 1).padStart(2, '0')}</span>
              {topic.title}
            </a>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="content-section">
        {unit.topics.map((topic) => (
          <div key={topic.id} id={topic.id} className="mb-16 scroll-mt-24 group">
            <div className="border-b border-ink/10 pb-3 mb-6 flex items-end justify-between">
              <div>
                <div className="mono-label text-[9px] text-burnt-orange mb-1">TOPIC</div>
                <h2 className="text-[clamp(1.2rem,3vw,1.6rem)] tracking-[-0.02em] pr-4"
                  style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                  {topic.title}
                </h2>
              </div>
              <BookmarkButton 
                bookmark={{
                  id: `t-${unit.id}-${topic.id}`,
                  type: 'note',
                  title: topic.title,
                  unitId: unit.id,
                  timestamp: Date.now(),
                  url: `/notes/${unit.id}#${topic.id}`
                }} 
              />
            </div>
            
            <div className="mb-8">
              {topic.sections.map((section) => (
                <RenderSection key={section.id} section={section} />
              ))}
            </div>

            {topic.deepDive && <DeepDive sections={topic.deepDive} />}
            {topic.mistakes && <CommonMistakes sections={topic.mistakes} />}
          </div>
        ))}
      </div>
    </div>
  );
}
