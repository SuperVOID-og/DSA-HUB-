export default function FormattedText({ text, className = '' }: { text: string; className?: string }) {
  if (!text) return null;

  // Split text into paragraphs based on double newlines
  const paragraphs = text.split(/\n\s*\n/);

  return (
    <div className={`space-y-4 ${className}`}>
      {paragraphs.map((p, idx) => {
        const lines = p.split('\n');
        
        // Detect if this paragraph is mostly a list
        const isList = lines.length > 1 && lines.every(line => /^[•\-*]\s|^\d+\.\s/.test(line.trim()) || line.trim() === '');
        
        if (isList) {
          return (
            <ul key={idx} className="list-inside space-y-2 pl-2">
              {lines.filter(line => line.trim() !== '').map((line, lIdx) => {
                // Remove bullet point characters for cleaner rendering
                const cleanLine = line.replace(/^[•\-*]\s/, '').replace(/^\d+\.\s/, '');
                return (
                  <li key={lIdx} className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full">
                    {cleanLine}
                  </li>
                );
              })}
            </ul>
          );
        }

        // Detect if this is a heading (all caps or very short)
        const isHeading = lines.length === 1 && (p.toUpperCase() === p || p.length < 40) && !p.includes('.') && !p.includes('?');
        
        if (isHeading) {
          return <h4 key={idx} className="font-bold text-text-primary text-lg mt-6 mb-2">{p}</h4>;
        }

        return (
          <p key={idx} className="leading-relaxed">
            {p}
          </p>
        );
      })}
    </div>
  );
}
