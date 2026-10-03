import { useState, useCallback, useRef, useEffect } from 'react';

type SearchAlgo = 'linear' | 'binary';

interface SearchStep {
  arr: number[];
  current: number;
  low?: number;
  high?: number;
  found: boolean | null;
  label: string;
  eliminated: number[];
  codeLine: number;
}

const searchCode: Record<SearchAlgo, string[]> = {
  linear: [
    'int linearSearch(int arr[], int n, int key) {',
    '  for (int i = 0; i < n; i++)',
    '    if (arr[i] == key)',
    '      return i;    // found',
    '  return -1;       // not found',
    '}',
  ],
  binary: [
    'int binarySearch(int arr[], int n, int key) {',
    '  int low = 0, high = n - 1;',
    '  while (low <= high) {',
    '    int mid = (low + high) / 2;',
    '    if (arr[mid] == key)',
    '      return mid;',
    '    else if (arr[mid] < key)',
    '      low = mid + 1;',
    '    else',
    '      high = mid - 1;',
    '  }',
    '  return -1;',
    '}',
  ],
};

export default function SearchVisualizer() {
  const [algo, setAlgo] = useState<SearchAlgo>('binary');
  const [arr] = useState([3, 7, 11, 15, 22, 28, 34, 41, 49, 55, 63, 70]);
  const [target, setTarget] = useState('28');
  const [steps, setSteps] = useState<SearchStep[]>([]);
  const [stepIdx, setStepIdx] = useState(0);
  const [running, setRunning] = useState(false);
  const timerRef = useRef<number | null>(null);

  const currentStep = steps[stepIdx];

  const clearTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

  const runSearch = useCallback(() => {
    clearTimer();
    const t = parseInt(target);
    if (isNaN(t)) return;
    const s: SearchStep[] = [];

    if (algo === 'linear') {
      s.push({ arr, current: -1, found: null, label: 'Start Linear Search', eliminated: [], codeLine: 0 });
      for (let i = 0; i < arr.length; i++) {
        s.push({ arr, current: i, found: null, label: `Check arr[${i}] = ${arr[i]}`, eliminated: [], codeLine: 2 });
        if (arr[i] === t) {
          s.push({ arr, current: i, found: true, label: `Found ${t} at index ${i}!`, eliminated: [], codeLine: 3 });
          break;
        }
        if (i === arr.length - 1) {
          s.push({ arr, current: -1, found: false, label: `${t} not found in array`, eliminated: [], codeLine: 4 });
        }
      }
    } else {
      let low = 0, high = arr.length - 1;
      const eliminated: number[] = [];
      s.push({ arr, current: -1, low, high, found: null, label: 'Initialize low=0, high=' + (arr.length - 1), eliminated: [...eliminated], codeLine: 1 });
      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        s.push({ arr, current: mid, low, high, found: null, label: `mid = (${low}+${high})/2 = ${mid}, arr[${mid}]=${arr[mid]}`, eliminated: [...eliminated], codeLine: 3 });
        if (arr[mid] === t) {
          s.push({ arr, current: mid, low, high, found: true, label: `Found ${t} at index ${mid}!`, eliminated: [...eliminated], codeLine: 5 });
          break;
        } else if (arr[mid] < t) {
          for (let i = low; i <= mid; i++) eliminated.push(i);
          s.push({ arr, current: mid, low, high, found: null, label: `${arr[mid]} < ${t}, search right`, eliminated: [...eliminated], codeLine: 7 });
          low = mid + 1;
        } else {
          for (let i = mid; i <= high; i++) eliminated.push(i);
          s.push({ arr, current: mid, low, high, found: null, label: `${arr[mid]} > ${t}, search left`, eliminated: [...eliminated], codeLine: 9 });
          high = mid - 1;
        }
      }
      if (s.length === 0 || s[s.length - 1].found !== true) {
        s.push({ arr, current: -1, found: false, label: `${t} not found`, eliminated, codeLine: 11 });
      }
    }

    setSteps(s);
    setStepIdx(0);
    setRunning(true);
  }, [algo, arr, target, clearTimer]);

  useEffect(() => {
    if (running && steps.length > 0) {
      clearTimer();
      const delay = algo === 'binary' ? 900 : 500;
      timerRef.current = window.setInterval(() => {
        setStepIdx(prev => {
          if (prev >= steps.length - 1) { clearTimer(); setRunning(false); return prev; }
          return prev + 1;
        });
      }, delay);
    }
    return clearTimer;
  }, [running, steps.length, clearTimer, algo]);

  const reset = useCallback(() => {
    clearTimer();
    setSteps([]);
    setStepIdx(0);
    setRunning(false);
  }, [clearTimer]);

  const code = searchCode[algo];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="mono-tag text-[11px] text-ink font-bold">
            {algo === 'linear' ? 'LINEAR SEARCH' : 'BINARY SEARCH'}
          </div>
          <div className="mono-label text-[9px] mt-1">
            {algo === 'linear' ? 'O(n) — SEQUENTIAL' : 'O(log n) — SORTED INPUT REQUIRED'}
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => { setAlgo('linear'); reset(); }} className={`mono-tag text-[9px] px-2.5 py-1 border ${algo === 'linear' ? 'border-burnt-orange text-burnt-orange' : 'border-ink/10 text-muted'}`}>LINEAR</button>
          <button onClick={() => { setAlgo('binary'); reset(); }} className={`mono-tag text-[9px] px-2.5 py-1 border ${algo === 'binary' ? 'border-burnt-orange text-burnt-orange' : 'border-ink/10 text-muted'}`}>BINARY</button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Array display */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-0 mb-6 overflow-x-auto py-2">
            {arr.map((val, i) => {
              const isCurrent = currentStep?.current === i;
              const isEliminated = currentStep?.eliminated.includes(i);
              const isInRange = currentStep && currentStep.low !== undefined && currentStep.high !== undefined
                ? i >= currentStep.low && i <= currentStep.high : true;
              const isFound = currentStep?.found === true && isCurrent;

              return (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className={`viz-element transition-all duration-300 ${
                      isFound ? 'active' :
                      isCurrent ? 'comparing' :
                      isEliminated ? 'opacity-25' :
                      !isInRange ? 'opacity-40' : ''
                    }`}
                    style={{ minWidth: '48px' }}
                  >
                    {val}
                  </div>
                  <span className="mono-label text-[8px] text-muted mt-1">[{i}]</span>
                  {algo === 'binary' && currentStep && (
                    <span className="mono-label text-[7px] text-burnt-orange mt-0.5">
                      {currentStep.low === i ? 'L' : ''}{currentStep.high === i ? 'H' : ''}{isCurrent ? 'M' : ''}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-end gap-3 mb-4">
            <div>
              <label className="mono-label text-[8px] text-muted block mb-1">SEARCH FOR</label>
              <input type="number" value={target} onChange={e => setTarget(e.target.value)}
                className="w-20 bg-transparent border border-ink/15 px-2 py-1.5 text-[13px] focus:border-burnt-orange focus:outline-none" />
            </div>
            <button onClick={runSearch} className="btn-editorial text-[9px]" disabled={running}>
              <span>▶</span><span>SEARCH</span>
            </button>
            <button onClick={reset} className="btn-editorial text-[9px]">
              <span>↺</span><span>RESET</span>
            </button>
          </div>

          <div className="mono-label text-[10px] text-ink/60 h-5">
            {currentStep?.label || 'Enter a value and search'}
          </div>
        </div>

        {/* Code panel */}
        <div className="lg:w-[300px] xl:w-[340px] shrink-0 border border-ink/10 bg-ink text-[#F4F1EA] overflow-hidden">
          <div className="px-3 py-2 border-b border-[rgba(244,241,234,0.1)]">
            <span className="mono-label text-[8px] text-[rgba(244,241,234,0.4)]">C++ — {algo === 'linear' ? 'LINEAR' : 'BINARY'} SEARCH</span>
          </div>
          <div className="overflow-x-auto p-0">
            <pre className="text-[11px] leading-[1.7]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              {code.map((line, idx) => {
                const isActive = currentStep?.codeLine === idx;
                return (
                  <div
                    key={idx}
                    className={`flex transition-colors duration-150 ${isActive ? 'bg-[rgba(224,86,38,0.25)]' : ''}`}
                  >
                    <span className={`inline-block w-7 text-right pr-2 select-none shrink-0 ${isActive ? 'text-burnt-orange' : 'text-[rgba(244,241,234,0.2)]'}`}>
                      {idx + 1}
                    </span>
                    <code className="pr-3 whitespace-pre">{line}</code>
                  </div>
                );
              })}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
