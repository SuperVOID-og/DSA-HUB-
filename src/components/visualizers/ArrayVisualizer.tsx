import { useState, useCallback } from 'react';

export default function ArrayVisualizer() {
  const [arr, setArr] = useState<number[]>([12, 5, 18, 27, 33, 8]);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [inputVal, setInputVal] = useState('');
  const [inputIdx, setInputIdx] = useState('');
  const [log, setLog] = useState<string[]>([]);
  const [traversing, setTraversing] = useState(false);
  const [traverseIdx, setTraverseIdx] = useState(-1);

  const addLog = useCallback((msg: string) => {
    setLog(prev => [msg, ...prev].slice(0, 8));
  }, []);

  const access = useCallback(() => {
    const idx = parseInt(inputIdx);
    if (isNaN(idx) || idx < 0 || idx >= arr.length) { addLog('Invalid index'); return; }
    setActiveIdx(idx);
    addLog(`Access arr[${idx}] = ${arr[idx]}`);
    setTimeout(() => setActiveIdx(null), 1000);
  }, [inputIdx, arr, addLog]);

  const insertAt = useCallback(() => {
    const val = parseInt(inputVal);
    const idx = parseInt(inputIdx);
    if (isNaN(val)) { addLog('Enter a value'); return; }
    const insertIdx = isNaN(idx) ? arr.length : Math.min(idx, arr.length);
    const newArr = [...arr];
    newArr.splice(insertIdx, 0, val);
    setArr(newArr);
    setActiveIdx(insertIdx);
    addLog(`Insert ${val} at [${insertIdx}]`);
    setTimeout(() => setActiveIdx(null), 800);
  }, [inputVal, inputIdx, arr, addLog]);

  const deleteAt = useCallback(() => {
    const idx = parseInt(inputIdx);
    if (isNaN(idx) || idx < 0 || idx >= arr.length) { addLog('Invalid index'); return; }
    const val = arr[idx];
    const newArr = [...arr];
    newArr.splice(idx, 1);
    setArr(newArr);
    addLog(`Delete arr[${idx}] = ${val}`);
  }, [inputIdx, arr, addLog]);

  const traverse = useCallback(() => {
    if (traversing) return;
    setTraversing(true);
    setTraverseIdx(0);
    addLog('Traversing array...');
    let i = 0;
    const timer = setInterval(() => {
      i++;
      if (i >= arr.length) {
        clearInterval(timer);
        setTraversing(false);
        setTraverseIdx(-1);
        addLog('Traversal complete');
      } else {
        setTraverseIdx(i);
      }
    }, 400);
  }, [arr.length, traversing, addLog]);

  return (
    <div>
      <div className="mono-tag text-[11px] text-ink font-bold mb-1">ARRAY</div>
      <div className="mono-label text-[9px] mb-6">CONTIGUOUS MEMORY — INDEXED ACCESS O(1)</div>

      {/* Array display */}
      <div className="flex items-center gap-0 mb-6 overflow-x-auto py-2">
        {arr.map((val, i) => (
          <div key={i} className="flex flex-col items-center">
            <div
              className={`viz-element transition-all duration-300 ${
                i === activeIdx ? 'active' :
                i === traverseIdx ? 'comparing' :
                ''
              }`}
              style={{ minWidth: '52px' }}
            >
              {val}
            </div>
            <span className="mono-label text-[8px] text-muted mt-1">[{i}]</span>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-end gap-3 mb-4">
        <div>
          <label className="mono-label text-[8px] text-muted block mb-1">VALUE</label>
          <input
            type="number"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            className="w-20 bg-transparent border border-ink/15 px-2 py-1.5 text-[13px] focus:border-burnt-orange focus:outline-none"
            placeholder="val"
          />
        </div>
        <div>
          <label className="mono-label text-[8px] text-muted block mb-1">INDEX</label>
          <input
            type="number"
            value={inputIdx}
            onChange={e => setInputIdx(e.target.value)}
            className="w-20 bg-transparent border border-ink/15 px-2 py-1.5 text-[13px] focus:border-burnt-orange focus:outline-none"
            placeholder="idx"
          />
        </div>
        <button onClick={access} className="btn-editorial text-[9px]">ACCESS</button>
        <button onClick={insertAt} className="btn-editorial text-[9px]">INSERT</button>
        <button onClick={deleteAt} className="btn-editorial text-[9px]">DELETE</button>
        <button onClick={traverse} className="btn-editorial text-[9px]" disabled={traversing}>TRAVERSE</button>
        <button onClick={() => { setArr([12, 5, 18, 27, 33, 8]); setLog([]); }} className="btn-editorial text-[9px]">RESET</button>
      </div>

      {/* Log */}
      <div className="border-t border-ink/8 pt-3 mt-4">
        <div className="mono-label text-[8px] text-muted mb-2">LOG</div>
        <div className="space-y-0.5 max-h-32 overflow-y-auto">
          {log.map((msg, i) => (
            <div key={i} className={`mono-label text-[10px] ${i === 0 ? 'text-ink' : 'text-muted'}`}>
              → {msg}
            </div>
          ))}
          {log.length === 0 && <div className="mono-label text-[10px] text-muted">Ready</div>}
        </div>
      </div>
    </div>
  );
}
