import { useState, useCallback, useRef, useEffect } from 'react';

type SortAlgorithm = 'bubble' | 'selection' | 'insertion' | 'merge' | 'quick';
type AnimState = 'idle' | 'running' | 'paused' | 'done';

interface SortStep {
  arr: number[];
  comparing: number[];
  swapping: number[];
  sorted: number[];
  label: string;
  codeLine: number; // 0-indexed line in the code to highlight
  pointers: Record<string, number>; // e.g. { i: 3, j: 5, min: 2 }
}

function generateArray(size: number): number[] {
  const arr: number[] = [];
  while(arr.length < size) {
    const val = Math.floor(Math.random() * 80) + 10;
    if (!arr.includes(val)) arr.push(val);
  }
  return arr;
}

/* ─── Step generators ─── */

function generateBubbleSortSteps(input: number[]): SortStep[] {
  const a = [...input]; const steps: SortStep[] = []; const n = a.length;
  steps.push({ arr: [...a], comparing: [], swapping: [], sorted: [], label: 'Start Bubble Sort', codeLine: 0, pointers: {} });
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({ arr: [...a], comparing: [j, j + 1], swapping: [], sorted: Array.from({ length: i }, (_, k) => n - 1 - k), label: `Compare arr[${j}]=${a[j]} and arr[${j+1}]=${a[j+1]}`, codeLine: 2, pointers: { i, j } });
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        steps.push({ arr: [...a], comparing: [], swapping: [j, j + 1], sorted: Array.from({ length: i }, (_, k) => n - 1 - k), label: `Swap arr[${j}] ↔ arr[${j+1}]`, codeLine: 4, pointers: { i, j } });
      }
    }
  }
  steps.push({ arr: [...a], comparing: [], swapping: [], sorted: Array.from({ length: n }, (_, k) => k), label: 'Sorted!', codeLine: 7, pointers: {} });
  return steps;
}

function generateSelectionSortSteps(input: number[]): SortStep[] {
  const a = [...input]; const steps: SortStep[] = []; const n = a.length;
  steps.push({ arr: [...a], comparing: [], swapping: [], sorted: [], label: 'Start Selection Sort', codeLine: 0, pointers: {} });
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    steps.push({ arr: [...a], comparing: [i], swapping: [], sorted: Array.from({ length: i }, (_, k) => k), label: `Pass ${i+1}: min = arr[${i}]=${a[i]}`, codeLine: 2, pointers: { i, min: minIdx } });
    for (let j = i + 1; j < n; j++) {
      steps.push({ arr: [...a], comparing: [minIdx, j], swapping: [], sorted: Array.from({ length: i }, (_, k) => k), label: `Compare arr[${minIdx}]=${a[minIdx]} with arr[${j}]=${a[j]}`, codeLine: 4, pointers: { i, j, min: minIdx } });
      if (a[j] < a[minIdx]) {
        minIdx = j;
        steps.push({ arr: [...a], comparing: [minIdx], swapping: [], sorted: Array.from({ length: i }, (_, k) => k), label: `New min = arr[${minIdx}]=${a[minIdx]}`, codeLine: 5, pointers: { i, j, min: minIdx } });
      }
    }
    if (minIdx !== i) {
      [a[i], a[minIdx]] = [a[minIdx], a[i]];
      steps.push({ arr: [...a], comparing: [], swapping: [i, minIdx], sorted: Array.from({ length: i }, (_, k) => k), label: `Swap arr[${i}] ↔ arr[${minIdx}]`, codeLine: 7, pointers: { i, min: minIdx } });
    }
  }
  steps.push({ arr: [...a], comparing: [], swapping: [], sorted: Array.from({ length: n }, (_, k) => k), label: 'Sorted!', codeLine: 9, pointers: {} });
  return steps;
}

function generateInsertionSortSteps(input: number[]): SortStep[] {
  const a = [...input]; const steps: SortStep[] = []; const n = a.length;
  steps.push({ arr: [...a], comparing: [], swapping: [], sorted: [], label: 'Start Insertion Sort', codeLine: 0, pointers: {} });
  for (let i = 1; i < n; i++) {
    const key = a[i]; let j = i - 1;
    steps.push({ arr: [...a], comparing: [i], swapping: [], sorted: [], label: `key = arr[${i}] = ${key}`, codeLine: 2, pointers: { i, key: i } });
    while (j >= 0 && a[j] > key) {
      steps.push({ arr: [...a], comparing: [j, j + 1], swapping: [], sorted: [], label: `arr[${j}]=${a[j]} > key=${key}, shift right`, codeLine: 4, pointers: { i, j, key: j + 1 } });
      a[j + 1] = a[j];
      steps.push({ arr: [...a], comparing: [], swapping: [j + 1], sorted: [], label: `Shift arr[${j}] → arr[${j+1}]`, codeLine: 5, pointers: { i, j, key: j + 1 } });
      j--;
    }
    a[j + 1] = key;
    steps.push({ arr: [...a], comparing: [], swapping: [j + 1], sorted: [], label: `Place key=${key} at arr[${j+1}]`, codeLine: 6, pointers: { i, key: j + 1 } });
  }
  steps.push({ arr: [...a], comparing: [], swapping: [], sorted: Array.from({ length: n }, (_, k) => k), label: 'Sorted!', codeLine: 8, pointers: {} });
  return steps;
}

function generateMergeSortSteps(input: number[]): SortStep[] {
  const a = [...input]; const steps: SortStep[] = [];
  steps.push({ arr: [...a], comparing: [], swapping: [], sorted: [], label: 'Start Merge Sort', codeLine: 0, pointers: {} });
  function merge(arr: number[], l: number, m: number, r: number) {
    const left = arr.slice(l, m + 1); const right = arr.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;
    while (i < left.length && j < right.length) {
      steps.push({ arr: [...arr], comparing: [l + i, m + 1 + j], swapping: [], sorted: [], label: `Compare ${left[i]} vs ${right[j]}`, codeLine: 6, pointers: { L: l + i, R: m + 1 + j } });
      if (left[i] <= right[j]) { arr[k] = left[i]; i++; } else { arr[k] = right[j]; j++; }
      steps.push({ arr: [...arr], comparing: [], swapping: [k], sorted: [], label: `Place ${arr[k]} at [${k}]`, codeLine: 8, pointers: { k } });
      k++;
    }
    while (i < left.length) { arr[k] = left[i]; steps.push({ arr: [...arr], comparing: [], swapping: [k], sorted: [], label: `Copy remaining ${left[i]}`, codeLine: 10, pointers: { k } }); i++; k++; }
    while (j < right.length) { arr[k] = right[j]; steps.push({ arr: [...arr], comparing: [], swapping: [k], sorted: [], label: `Copy remaining ${right[j]}`, codeLine: 11, pointers: { k } }); j++; k++; }
  }
  function mergeSort(arr: number[], l: number, r: number) {
    if (l < r) {
      const m = Math.floor((l + r) / 2);
      steps.push({ arr: [...arr], comparing: [], swapping: [], sorted: [], label: `Divide [${l}..${r}] at mid=${m}`, codeLine: 2, pointers: { low: l, mid: m, high: r } });
      mergeSort(arr, l, m);
      mergeSort(arr, m + 1, r);
      merge(arr, l, m, r);
    }
  }
  mergeSort(a, 0, a.length - 1);
  steps.push({ arr: [...a], comparing: [], swapping: [], sorted: Array.from({ length: a.length }, (_, k) => k), label: 'Sorted!', codeLine: 13, pointers: {} });
  return steps;
}

function generateQuickSortSteps(input: number[]): SortStep[] {
  const a = [...input]; const steps: SortStep[] = [];
  steps.push({ arr: [...a], comparing: [], swapping: [], sorted: [], label: 'Start Quick Sort', codeLine: 0, pointers: {} });
  function partition(arr: number[], low: number, high: number): number {
    const pivot = arr[high];
    steps.push({ arr: [...arr], comparing: [high], swapping: [], sorted: [], label: `Pivot = ${pivot} at [${high}]`, codeLine: 2, pointers: { low, high, pivot: high } });
    let i = low - 1;
    for (let j = low; j < high; j++) {
      steps.push({ arr: [...arr], comparing: [j, high], swapping: [], sorted: [], label: `arr[${j}]=${arr[j]} vs pivot=${pivot}`, codeLine: 5, pointers: { i: i + 1, j, pivot: high } });
      if (arr[j] < pivot) {
        i++;
        if (i !== j) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          steps.push({ arr: [...arr], comparing: [], swapping: [i, j], sorted: [], label: `Swap arr[${i}] ↔ arr[${j}]`, codeLine: 7, pointers: { i, j, pivot: high } });
        }
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    steps.push({ arr: [...arr], comparing: [], swapping: [i + 1, high], sorted: [], label: `Place pivot at [${i+1}]`, codeLine: 9, pointers: { pivot: i + 1 } });
    return i + 1;
  }
  function quickSort(arr: number[], low: number, high: number) {
    if (low < high) {
      const pi = partition(arr, low, high);
      quickSort(arr, low, pi - 1);
      quickSort(arr, pi + 1, high);
    }
  }
  quickSort(a, 0, a.length - 1);
  steps.push({ arr: [...a], comparing: [], swapping: [], sorted: Array.from({ length: a.length }, (_, k) => k), label: 'Sorted!', codeLine: 14, pointers: {} });
  return steps;
}

const algorithmGenerators: Record<SortAlgorithm, (arr: number[]) => SortStep[]> = {
  bubble: generateBubbleSortSteps,
  selection: generateSelectionSortSteps,
  insertion: generateInsertionSortSteps,
  merge: generateMergeSortSteps,
  quick: generateQuickSortSteps,
};

const algorithmInfo: Record<SortAlgorithm, { name: string; complexity: string }> = {
  bubble: { name: 'BUBBLE SORT', complexity: 'O(n²)' },
  selection: { name: 'SELECTION SORT', complexity: 'O(n²)' },
  insertion: { name: 'INSERTION SORT', complexity: 'O(n²)' },
  merge: { name: 'MERGE SORT', complexity: 'O(n log n)' },
  quick: { name: 'QUICK SORT', complexity: 'O(n log n) avg' },
};

/* ─── Algorithm C++ Code ─── */
const algorithmCode: Record<SortAlgorithm, string[]> = {
  bubble: [
    'void bubbleSort(int arr[], int n) {',
    '  for (int i = 0; i < n-1; i++)',
    '    for (int j = 0; j < n-i-1; j++)',
    '      if (arr[j] > arr[j+1]) {',
    '        swap(arr[j], arr[j+1]);',
    '      }',
    '  }',
    '}',
  ],
  selection: [
    'void selectionSort(int arr[], int n) {',
    '  for (int i = 0; i < n-1; i++) {',
    '    int min_idx = i;',
    '    for (int j = i+1; j < n; j++)',
    '      if (arr[j] < arr[min_idx])',
    '        min_idx = j;',
    '    if (min_idx != i)',
    '      swap(arr[i], arr[min_idx]);',
    '  }',
    '}',
  ],
  insertion: [
    'void insertionSort(int arr[], int n) {',
    '  for (int i = 1; i < n; i++) {',
    '    int key = arr[i];',
    '    int j = i - 1;',
    '    while (j >= 0 && arr[j] > key) {',
    '      arr[j+1] = arr[j];',
    '      j--;',
    '    }',
    '    arr[j+1] = key;',
    '  }',
    '}',
  ],
  merge: [
    'void mergeSort(int arr[], int l, int r) {',
    '  if (l < r) {',
    '    int m = (l + r) / 2;',
    '    mergeSort(arr, l, m);',
    '    mergeSort(arr, m+1, r);',
    '    merge(arr, l, m, r);',
    '  }',
    '}',
    'void merge(int arr[], int l, int m, int r) {',
    '  // Compare left[i] and right[j]',
    '  // Place smaller at arr[k]',
    '  // Copy remaining left elements',
    '  // Copy remaining right elements',
    '}',
  ],
  quick: [
    'void quickSort(int arr[], int low, int high) {',
    '  if (low < high) {',
    '    int pi = partition(arr, low, high);',
    '    quickSort(arr, low, pi-1);',
    '    quickSort(arr, pi+1, high);',
    '  }',
    '}',
    'int partition(int arr[], int low, int high) {',
    '  int pivot = arr[high];',
    '  int i = low - 1;',
    '  for (int j = low; j < high; j++)',
    '    if (arr[j] < pivot)',
    '      swap(arr[++i], arr[j]);',
    '  swap(arr[i+1], arr[high]);',
    '  return i + 1;',
    '}',
  ],
};

export default function SortingVisualizer() {
  const [algorithm, setAlgorithm] = useState<SortAlgorithm>('bubble');
  const [arr, setArr] = useState(() => generateArray(14));
  const [steps, setSteps] = useState<SortStep[]>([]);
  const [stepIdx, setStepIdx] = useState(0);
  const [state, setState] = useState<AnimState>('idle');
  const [speed, setSpeed] = useState(350);
  const intervalRef = useRef<number | null>(null);

  const currentStep = steps[stepIdx];

  const clearTimer = useCallback(() => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
  }, []);

  const reset = useCallback(() => {
    clearTimer();
    const newArr = generateArray(14);
    setArr(newArr);
    setSteps([]);
    setStepIdx(0);
    setState('idle');
  }, [clearTimer]);

  const run = useCallback(() => {
    clearTimer();
    const s = algorithmGenerators[algorithm](arr);
    setSteps(s);
    setStepIdx(0);
    setState('running');
  }, [algorithm, arr, clearTimer]);

  const pause = useCallback(() => {
    clearTimer();
    setState('paused');
  }, [clearTimer]);

  const resume = useCallback(() => {
    setState('running');
  }, []);

  const nextStep = useCallback(() => {
    if (steps.length === 0) {
      // Generate steps first, start paused at step 0
      const s = algorithmGenerators[algorithm](arr);
      setSteps(s);
      setStepIdx(0);
      setState('paused');
      return;
    }
    if (stepIdx < steps.length - 1) {
      setStepIdx(i => i + 1);
    } else {
      setState('done');
      clearTimer();
    }
  }, [stepIdx, steps.length, clearTimer, algorithm, arr]);

  useEffect(() => {
    if (state === 'running' && steps.length > 0) {
      clearTimer();
      intervalRef.current = window.setInterval(() => {
        setStepIdx(prev => {
          if (prev >= steps.length - 1) {
            clearTimer();
            setState('done');
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }
    return clearTimer;
  }, [state, steps.length, speed, clearTimer]);

  // Clean up on algorithm change
  useEffect(() => {
    clearTimer();
    setSteps([]);
    setStepIdx(0);
    setState('idle');
  }, [algorithm, clearTimer]);

  const displayArr = currentStep?.arr || arr;
  const maxVal = Math.max(...displayArr, 1);
  const code = algorithmCode[algorithm];

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="mono-tag text-[12px] text-ink font-bold">{algorithmInfo[algorithm].name}</div>
          <div className="mono-label text-[9px] mt-1">COMPLEXITY: {algorithmInfo[algorithm].complexity}</div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {(Object.keys(algorithmInfo) as SortAlgorithm[]).map((alg) => (
            <button
              key={alg}
              onClick={() => setAlgorithm(alg)}
              className={`mono-tag text-[9px] px-2.5 py-1 border transition-colors ${
                algorithm === alg ? 'border-burnt-orange text-burnt-orange' : 'border-ink/10 text-muted hover:border-ink/20'
              }`}
            >
              {algorithmInfo[alg].name}
            </button>
          ))}
        </div>
      </div>

      {/* Main layout: Bars + Code side by side */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Bars visualization */}
        <div className="flex-1 min-w-0">
          <div className="relative h-56 mb-1 w-full">
            {displayArr.map((val, i) => {
              const height = (val / maxVal) * 100;
              const isComparing = currentStep?.comparing.includes(i);
              const isSwapping = currentStep?.swapping.includes(i);
              const isSorted = currentStep?.sorted.includes(i);
              
              const leftPos = (i / displayArr.length) * 100;
              const width = 100 / displayArr.length;

              return (
                <div 
                  key={val} 
                  className="absolute bottom-0 flex flex-col items-center justify-end transition-all duration-300 ease-in-out" 
                  style={{ 
                    left: `${leftPos}%`, 
                    width: `${width}%`,
                    height: '100%',
                    padding: '0 2px'
                  }}
                >
                  <span className={`mono-label text-[7px] mb-0.5 transition-colors truncate ${isComparing || isSwapping ? 'text-burnt-orange font-bold' : 'text-muted'}`}>
                    {val}
                  </span>
                  <div
                    className={`w-full rounded-t-[2px] transition-colors duration-200 ${
                      isSorted ? 'bg-ink'
                      : isSwapping ? 'bg-burnt-orange'
                      : isComparing ? 'bg-burnt-orange/50'
                      : 'bg-[rgba(20,20,20,0.15)]'
                    }`}
                    style={{ height: `${height}%`, minHeight: '4px' }}
                  />
                </div>
              );
            })}
          </div>

          {/* Pointer labels */}
          <div className="flex gap-[3px] md:gap-1 h-5">
            {displayArr.map((_, i) => {
              const ptrs: string[] = [];
              if (currentStep?.pointers) {
                for (const [name, idx] of Object.entries(currentStep.pointers)) {
                  if (idx === i) ptrs.push(name);
                }
              }
              return (
                <div key={i} className="flex-1 text-center" style={{ minWidth: 0 }}>
                  {ptrs.length > 0 && (
                    <span className="mono-label text-[7px] text-burnt-orange font-bold truncate block">{ptrs.join(',')}</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Array indices */}
          <div className="flex gap-[3px] md:gap-1 mb-3">
            {displayArr.map((_, i) => (
              <div key={i} className="flex-1 text-center" style={{ minWidth: 0 }}>
                <span className="mono-label text-[6px] text-muted">{i}</span>
              </div>
            ))}
          </div>

          {/* Step info */}
          <div className="mono-label text-[10px] text-ink/60 h-5 mb-4">
            {currentStep?.label || 'Press ▶ RUN or ⏭ STEP to start'}
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {state === 'idle' && (
              <>
                <button onClick={run} className="btn-editorial text-[9px]"><span>▶</span><span>RUN</span></button>
                <button onClick={nextStep} className="btn-editorial text-[9px]"><span>⏭</span><span>STEP</span></button>
              </>
            )}
            {state === 'running' && <button onClick={pause} className="btn-editorial text-[9px]"><span>⏸</span><span>PAUSE</span></button>}
            {state === 'paused' && (
              <>
                <button onClick={resume} className="btn-editorial text-[9px]"><span>▶</span><span>PLAY</span></button>
                <button onClick={nextStep} className="btn-editorial text-[9px]"><span>⏭</span><span>STEP</span></button>
              </>
            )}
            {(state === 'running' || state === 'paused' || state === 'done') && (
              <button onClick={reset} className="btn-editorial text-[9px]"><span>↺</span><span>RESET</span></button>
            )}
            {state === 'done' && (
              <button onClick={reset} className="btn-editorial text-[9px]"><span>↺</span><span>NEW ARRAY</span></button>
            )}

            <div className="ml-auto flex items-center gap-2">
              <span className="mono-label text-[7px] text-muted">SLOW</span>
              <input
                type="range"
                min="50"
                max="800"
                step="50"
                value={850 - speed}
                onChange={(e) => setSpeed(850 - Number(e.target.value))}
                className="w-16 accent-[#E05626]"
              />
              <span className="mono-label text-[7px] text-muted">FAST</span>
            </div>

            {steps.length > 0 && (
              <span className="mono-label text-[8px] text-muted">
                {stepIdx + 1}/{steps.length}
              </span>
            )}
          </div>
        </div>

        {/* Code panel */}
        <div className="lg:w-[320px] xl:w-[360px] shrink-0 border border-ink/10 bg-ink text-[#F4F1EA] overflow-hidden">
          <div className="px-3 py-2 border-b border-[rgba(244,241,234,0.1)]">
            <span className="mono-label text-[8px] text-[rgba(244,241,234,0.4)]">C++ — {algorithmInfo[algorithm].name}</span>
          </div>
          <div className="overflow-x-auto p-0">
            <pre className="text-[11px] leading-[1.7]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              {code.map((line, idx) => {
                const isActive = currentStep?.codeLine === idx && state !== 'idle';
                return (
                  <div
                    key={idx}
                    className={`flex transition-colors duration-150 ${isActive ? 'bg-[rgba(224,86,38,0.25)]' : 'hover:bg-[rgba(244,241,234,0.04)]'}`}
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
