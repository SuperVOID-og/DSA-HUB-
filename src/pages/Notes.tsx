import { Link } from 'react-router-dom';
import { units } from '../data';

export default function Notes() {
  return (
    <div>
      <div className="mb-12">
        <div className="mono-label text-[10px] mb-3">NOTES / ALL UNITS</div>
        <h1 className="text-[clamp(2rem,5vw,3.5rem)] tracking-[-0.03em]"
          style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
          Study notes.
        </h1>
        <p className="text-[14px] text-muted mt-3 max-w-[480px]">
          In-depth theory and explanations across five units. From fundamentals to sorting and searching.
        </p>
      </div>

      <div className="space-y-1">
        {units.map((unit) => (
          <Link
            key={unit.id}
            to={`/notes/${unit.id}`}
            className="group flex items-start gap-5 py-5 border-b border-[rgba(20,20,20,0.08)] hover:bg-[rgba(224,86,38,0.03)] transition-colors px-2 -mx-2"
          >
            <span className="num-display text-[32px] w-12 text-right group-hover:text-burnt-orange/30 transition-colors">
              {String(unit.number).padStart(2, '0')}
            </span>
            <div className="flex-1 pt-1">
              <h2 className="mono-tag text-[12px] text-ink font-bold group-hover:text-burnt-orange transition-colors mb-1">
                {unit.title.toUpperCase()}
              </h2>
              <p className="text-[13px] text-muted leading-relaxed">{unit.description}</p>
              <div className="mono-label text-[9px] text-muted mt-2">
                {unit.topics.length} TOPICS
              </div>
            </div>
            <span className="mono-tag text-[11px] text-burnt-orange opacity-0 group-hover:opacity-100 transition-opacity pt-2">
              →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
