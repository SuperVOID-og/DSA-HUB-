import { useParams, Link } from 'react-router-dom';
import { getUnitById } from '../data';
import type { Section, Topic } from '../data/types';
import { AlertTriangle, Zap, ArrowLeft, ArrowRight } from 'lucide-react';

// A stripped down renderer for revision mode
function RevisionSection({ section }: { section: Section }) {
  switch (section.type) {
    case 'definition':
      return (
        <div className="border-l-2 border-burnt-orange pl-4 py-2 my-3 bg-cream">
          <div className="mono-tag text-[9px] text-burnt-orange font-bold mb-1">{section.term}</div>
          <p className="text-[13px] leading-[1.6] text-ink">{section.definition}</p>
        </div>
      );
    case 'callout':
      return (
        <div className={`my-3 p-4 border-l-2 text-[13px] leading-[1.6] ${
          section.variant === 'tip' ? 'border-burnt-orange bg-[rgba(224,86,38,0.04)] text-ink' :
          section.variant === 'warning' ? 'border-[#D97706] bg-[rgba(217,119,6,0.04)] text-ink' :
          'border-ink/20 bg-[rgba(20,20,20,0.02)] text-ink'
        }`}>
          {section.title && <div className="mono-tag text-[9px] font-bold mb-1">{section.title}</div>}
          {section.content}
        </div>
      );
    case 'table':
      return (
        <div className="my-4 overflow-x-auto border border-ink/10">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="bg-ink/5">
                {section.headers.map((h, i) => (
                  <th key={i} className="px-3 py-2 text-left mono-tag text-[9px] font-bold text-ink">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.rows.map((row, i) => (
                <tr key={i} className="border-b border-ink/5">
                  {row.map((cell, j) => (
                    <td key={j} className="px-3 py-2 text-ink-light">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'list':
      return (
        <ul className="my-3 space-y-1.5 pl-4">
          {section.items.map((item, i) => (
            <li key={i} className="text-[13px] leading-[1.6] text-ink relative before:content-['•'] before:absolute before:-left-4 before:text-burnt-orange">
              {item}
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
}

function TopicRevision({ topic, unitId }: { topic: Topic; unitId: string }) {
  // Extract high-yield sections
  const highYield = topic.sections.filter(s => 
    s.type === 'definition' || s.type === 'callout' || s.type === 'table' || s.type === 'list'
  );

  if (highYield.length === 0 && (!topic.mistakes || topic.mistakes.length === 0)) {
    return null; // Skip topics with nothing to revise quickly
  }

  return (
    <div className="mb-10 pb-6 border-b border-ink/10 last:border-0 relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[1.2rem] tracking-[-0.01em] font-medium text-ink"
          style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
          {topic.title}
        </h2>
        <Link 
          to={`/notes/${unitId}#${topic.id}`}
          className="mono-tag text-[9px] text-muted hover:text-burnt-orange flex items-center gap-1 transition-colors"
        >
          FULL NOTES <ArrowRight size={10} />
        </Link>
      </div>

      <div className="space-y-1">
        {highYield.map(section => (
          <RevisionSection key={section.id} section={section} />
        ))}
      </div>

      {topic.mistakes && topic.mistakes.length > 0 && (
        <div className="mt-6 border border-[#D97706]/20 bg-[#D97706]/5 p-4 rounded-sm">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={12} className="text-[#D97706]" />
            <div className="mono-tag text-[9px] font-bold text-[#D97706]">WATCH OUT</div>
          </div>
          <div className="space-y-1">
             {topic.mistakes.map(section => (
                <RevisionSection key={section.id} section={section} />
             ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function QuickRevisionPage() {
  const { unitId } = useParams();
  const unit = getUnitById(unitId || '');

  if (!unit) {
    return (
      <div className="text-center py-20">
        <h2 className="text-[2rem]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>Unit not found.</h2>
        <Link to="/notes" className="btn-editorial mt-6 inline-flex">
          <ArrowLeft size={16} className="mr-2" /> BACK TO NOTES
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[700px] mx-auto py-12 md:py-20 px-4">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <Link to={`/notes/${unit.id}`} className="mono-label text-[9px] text-muted hover:text-burnt-orange transition-colors flex items-center gap-1">
            <ArrowLeft size={10} /> BACK TO UNIT
          </Link>
          <div className="mono-tag text-[9px] bg-ink text-cream px-2 py-1 flex items-center gap-1">
            <Zap size={10} className="text-burnt-orange" /> QUICK REVISION
          </div>
        </div>
        
        <h1 className="text-[clamp(1.8rem,4vw,2.5rem)] tracking-[-0.03em] leading-tight mb-2"
          style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
          {unit.title}
        </h1>
        <p className="text-[14px] text-muted max-w-[480px]">
          High-yield concepts, definitions, and common mistakes compiled for rapid review.
        </p>
      </div>

      {/* Revision Content */}
      <div className="bg-cream/50 p-6 md:p-10 border border-ink/10 rounded-sm shadow-sm">
        {unit.topics.map((topic) => (
          <TopicRevision key={topic.id} topic={topic} unitId={unit.id} />
        ))}
      </div>
    </div>
  );
}
