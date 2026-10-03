import { useState } from 'react';
import ArrayVisualizer from '../components/visualizers/ArrayVisualizer';
import SortingVisualizer from '../components/visualizers/SortingVisualizer';
import SearchVisualizer from '../components/visualizers/SearchVisualizer';
import StackVisualizer from '../components/visualizers/StackVisualizer';
import QueueVisualizer from '../components/visualizers/QueueVisualizer';
import LinkedListVisualizer from '../components/visualizers/LinkedListVisualizer';

type VisualizerKey = 'array' | 'sorting' | 'searching' | 'stack' | 'queue' | 'linked-list';

const visualizers: { key: VisualizerKey; label: string; desc: string }[] = [
  { key: 'array', label: 'ARRAYS', desc: 'Creation, access, insertion, deletion, traversal' },
  { key: 'sorting', label: 'SORTING', desc: 'Bubble, selection, insertion, merge, quick sort' },
  { key: 'searching', label: 'SEARCHING', desc: 'Linear search, binary search' },
  { key: 'stack', label: 'STACK', desc: 'Push, pop, peek — LIFO behaviour' },
  { key: 'queue', label: 'QUEUE', desc: 'Enqueue, dequeue — FIFO behaviour' },
  { key: 'linked-list', label: 'LINKED LIST', desc: 'Nodes, insertion, deletion, traversal' },
];

export default function VisualisersPage() {
  const [active, setActive] = useState<VisualizerKey>('sorting');

  return (
    <div>
      <div className="mb-10">
        <div className="mono-label text-[10px] mb-3">THE LAB / VISUALISERS</div>
        <h1 className="text-[clamp(2rem,5vw,3.5rem)] tracking-[-0.03em]"
          style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
          Visualisers.
        </h1>
        <p className="text-[14px] text-muted mt-3 max-w-[480px]">
          Watch algorithms come alive. Interactive step-by-step visualizations.
        </p>
      </div>

      {/* Selector */}
      <div className="flex flex-wrap gap-2 mb-8">
        {visualizers.map((v) => (
          <button
            key={v.key}
            onClick={() => setActive(v.key)}
            className={`mono-tag text-[10px] px-4 py-2 border transition-colors ${
              active === v.key ? 'border-ink bg-ink text-cream' : 'border-ink/15 text-muted hover:border-ink/30'
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>

      {/* Description */}
      <div className="mono-label text-[9px] text-muted mb-6">
        {visualizers.find(v => v.key === active)?.desc?.toUpperCase()}
      </div>

      {/* Visualizer */}
      <div className="border border-[rgba(20,20,20,0.1)] bg-[rgba(244,241,234,0.5)] p-6 md:p-8">
        {active === 'array' && <ArrayVisualizer />}
        {active === 'sorting' && <SortingVisualizer />}
        {active === 'searching' && <SearchVisualizer />}
        {active === 'stack' && <StackVisualizer />}
        {active === 'queue' && <QueueVisualizer />}
        {active === 'linked-list' && <LinkedListVisualizer />}
      </div>
    </div>
  );
}
