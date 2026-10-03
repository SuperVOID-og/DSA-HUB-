import { useState, useEffect, useRef, useCallback } from 'react';

type SortState = 'idle' | 'running' | 'done';

const INITIAL_ARRAY = [38, 12, 45, 7, 27, 19, 33, 5];

export default function VisualizerPreview() {
  const [arr, setArr] = useState<number[]>([...INITIAL_ARRAY]);
  const [comparing, setComparing] = useState<number[]>([]);
  const [sorted, setSorted] = useState<number[]>([]);
  const [state, setState] = useState<SortState>('idle');
  const [step, setStep] = useState('');
  const timeoutRefs = useRef<number[]>([]);

  const clearTimeouts = useCallback(() => {
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];
  }, []);

  const reset = useCallback(() => {
    clearTimeouts();
    setArr([...INITIAL_ARRAY]);
    setComparing([]);
    setSorted([]);
    setState('idle');
    setStep('');
  }, [clearTimeouts]);

  const bubbleSort = useCallback(() => {
    clearTimeouts();
    setState('running');
    const a = [...INITIAL_ARRAY];
    const steps: Array<{ arr: number[]; comp: number[]; sorted: number[]; label: string }> = [];
    const n = a.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        steps.push({
          arr: [...a],
          comp: [j, j + 1],
          sorted: Array.from({ length: i }, (_, k) => n - 1 - k),
          label: `Compare arr[${j}]=${a[j]} and arr[${j + 1}]=${a[j + 1]}`,
        });
        if (a[j] > a[j + 1]) {
          [a[j], a[j + 1]] = [a[j + 1], a[j]];
          steps.push({
            arr: [...a],
            comp: [j, j + 1],
            sorted: Array.from({ length: i }, (_, k) => n - 1 - k),
            label: `Swap → [${a[j]}, ${a[j + 1]}]`,
          });
        }
      }
    }
    steps.push({
      arr: [...a],
      comp: [],
      sorted: Array.from({ length: n }, (_, k) => k),
      label: 'Sorted!',
    });

    steps.forEach((s, i) => {
      const id = window.setTimeout(() => {
        setArr(s.arr);
        setComparing(s.comp);
        setSorted(s.sorted);
        setStep(s.label);
        if (i === steps.length - 1) setState('done');
      }, i * 400);
      timeoutRefs.current.push(id);
    });
  }, [clearTimeouts]);

  useEffect(() => {
    return clearTimeouts;
  }, [clearTimeouts]);

  const maxVal = Math.max(...arr);

  return (
    <div className="border border-[rgba(20,20,20,0.1)] bg-[rgba(244,241,234,0.5)] p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="mono-tag text-[11px] text-ink font-bold">BUBBLE SORT</div>
          <div className="mono-label text-[9px] mt-1">O(n²) — COMPARISON SORT</div>
        </div>
        <div className="flex items-center gap-3">
          {state === 'idle' && (
            <button onClick={bubbleSort} className="btn-editorial text-[10px]">
              <span className="arrow">▶</span>
              <span>RUN</span>
            </button>
          )}
          {(state === 'running' || state === 'done') && (
            <button onClick={reset} className="btn-editorial text-[10px]">
              <span>↺</span>
              <span>RESET</span>
            </button>
          )}
        </div>
      </div>

      {/* Array visualization */}
      <div className="flex items-end gap-1.5 md:gap-2 h-48 mb-4">
        {arr.map((val, i) => {
          const height = (val / maxVal) * 100;
          const isComparing = comparing.includes(i);
          const isSorted = sorted.includes(i);
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className={`mono-label text-[9px] transition-colors ${isComparing ? 'text-burnt-orange font-bold' : 'text-muted'}`}>
                {val}
              </span>
              <div
                className={`w-full transition-all duration-300 ease-out ${
                  isSorted
                    ? 'bg-ink'
                    : isComparing
                    ? 'bg-burnt-orange'
                    : 'border-[1.5px] border-ink bg-cream'
                }`}
                style={{ height: `${height}%`, minHeight: '12px' }}
              />
              <span className="mono-label text-[8px] text-muted">[{i}]</span>
            </div>
          );
        })}
      </div>

      {/* Step label */}
      <div className="mono-label text-[10px] text-ink/60 h-5">
        {step}
      </div>
    </div>
  );
}
