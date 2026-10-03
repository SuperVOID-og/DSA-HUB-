import { useState, useCallback } from 'react';

type QueueType = 'standard' | 'circular' | 'deque' | 'priority';
const MAX_SIZE = 8;

/* ─── Standard Queue ─── */
function StandardQueue({ addLog }: { log: string[]; addLog: (m: string) => void }) {
  const [queue, setQueue] = useState<number[]>([12, 5, 18, 27]);
  const [inputVal, setInputVal] = useState('');
  const [hlFront, setHlFront] = useState(false);
  const [hlRear, setHlRear] = useState(false);

  const enqueue = useCallback(() => {
    const val = parseInt(inputVal);
    if (isNaN(val)) { addLog('Enter a value'); return; }
    if (queue.length >= MAX_SIZE) { addLog('Queue overflow!'); return; }
    setQueue(prev => [...prev, val]); setHlRear(true); addLog(`Enqueue ${val} → REAR`); setInputVal('');
    setTimeout(() => setHlRear(false), 800);
  }, [inputVal, queue.length, addLog]);

  const dequeue = useCallback(() => {
    if (queue.length === 0) { addLog('Queue underflow!'); return; }
    const val = queue[0]; setHlFront(true); addLog(`Dequeue ${val} ← FRONT`);
    setTimeout(() => { setQueue(prev => prev.slice(1)); setHlFront(false); }, 400);
  }, [queue, addLog]);

  return (
    <div>
      <div className="flex items-center gap-0 mb-2 overflow-x-auto py-2">
        <span className="mono-label text-[9px] text-burnt-orange mr-2 shrink-0">FRONT →</span>
        {queue.map((val, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className={`viz-element transition-all duration-300 ${(i === 0 && hlFront) || (i === queue.length - 1 && hlRear) ? 'active' : ''}`} style={{ minWidth: '52px' }}>{val}</div>
            <span className="mono-label text-[7px] text-muted mt-1">{i === 0 && i === queue.length - 1 ? 'F/R' : i === 0 ? 'F' : i === queue.length - 1 ? 'R' : ''}</span>
          </div>
        ))}
        <span className="mono-label text-[9px] text-burnt-orange ml-2 shrink-0">← REAR</span>
      </div>
      <div className="flex flex-wrap items-end gap-3 mt-6 mb-4">
        <div>
          <label className="mono-label text-[8px] text-muted block mb-1">VALUE</label>
          <input type="number" value={inputVal} onChange={e => setInputVal(e.target.value)} onKeyDown={e => e.key === 'Enter' && enqueue()}
            className="w-20 bg-transparent border border-ink/15 px-2 py-1.5 text-[13px] focus:border-burnt-orange focus:outline-none" />
        </div>
        <button onClick={enqueue} className="btn-editorial text-[9px]">ENQUEUE</button>
        <button onClick={dequeue} className="btn-editorial text-[9px]">DEQUEUE</button>
        <button onClick={() => { if (queue.length > 0) addLog(`Front → ${queue[0]}`); else addLog('Queue empty'); }} className="btn-editorial text-[9px]">FRONT</button>
        <button onClick={() => { setQueue([12, 5, 18, 27]); }} className="btn-editorial text-[9px]">RESET</button>
      </div>
      <div className="mono-label text-[9px] text-muted">SIZE: {queue.length} / {MAX_SIZE}</div>
    </div>
  );
}

/* ─── Circular Queue ─── */
function CircularQueue({ addLog }: { log: string[]; addLog: (m: string) => void }) {
  const [data, setData] = useState<(number | null)[]>(Array(MAX_SIZE).fill(null));
  const [front, setFront] = useState(-1);
  const [rear, setRear] = useState(-1);
  const [inputVal, setInputVal] = useState('');
  const count = front === -1 ? 0 : (rear >= front ? rear - front + 1 : MAX_SIZE - front + rear + 1);

  const enqueue = useCallback(() => {
    const val = parseInt(inputVal);
    if (isNaN(val)) { addLog('Enter a value'); return; }
    if (count >= MAX_SIZE) { addLog('Circular queue full!'); return; }
    const d = [...data];
    if (front === -1) {
      d[0] = val; setFront(0); setRear(0);
    } else {
      const newRear = (rear + 1) % MAX_SIZE;
      d[newRear] = val; setRear(newRear);
    }
    setData(d); addLog(`Enqueue ${val} at [${front === -1 ? 0 : (rear + 1) % MAX_SIZE}]`); setInputVal('');
  }, [inputVal, data, front, rear, count, addLog]);

  const dequeue = useCallback(() => {
    if (front === -1) { addLog('Circular queue empty!'); return; }
    const val = data[front]; const d = [...data]; d[front] = null;
    addLog(`Dequeue ${val} from [${front}]`);
    if (front === rear) { setFront(-1); setRear(-1); }
    else { setFront((front + 1) % MAX_SIZE); }
    setData(d);
  }, [data, front, rear, addLog]);

  const resetQ = useCallback(() => { setData(Array(MAX_SIZE).fill(null)); setFront(-1); setRear(-1); }, []);

  return (
    <div>
      <div className="flex items-center gap-1 mb-2 overflow-x-auto py-2 flex-wrap">
        {data.map((val, i) => {
          const isFront = i === front;
          const isRear = i === rear;
          const isEmpty = val === null;
          return (
            <div key={i} className="flex flex-col items-center">
              <div className={`viz-element transition-all duration-300 ${isEmpty ? 'opacity-30' : isFront || isRear ? 'active' : ''}`} style={{ minWidth: '48px' }}>
                {isEmpty ? '—' : val}
              </div>
              <span className="mono-label text-[7px] text-muted mt-1">[{i}]</span>
              <span className="mono-label text-[7px] text-burnt-orange mt-0.5">
                {isFront && isRear ? 'F/R' : isFront ? 'F' : isRear ? 'R' : ''}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mono-label text-[9px] text-muted mb-4">WRAPAROUND: rear wraps to index 0 when space is available · SIZE: {count}/{MAX_SIZE}</div>
      <div className="flex flex-wrap items-end gap-3">
        <div>
          <label className="mono-label text-[8px] text-muted block mb-1">VALUE</label>
          <input type="number" value={inputVal} onChange={e => setInputVal(e.target.value)} onKeyDown={e => e.key === 'Enter' && enqueue()}
            className="w-20 bg-transparent border border-ink/15 px-2 py-1.5 text-[13px] focus:border-burnt-orange focus:outline-none" />
        </div>
        <button onClick={enqueue} className="btn-editorial text-[9px]">ENQUEUE</button>
        <button onClick={dequeue} className="btn-editorial text-[9px]">DEQUEUE</button>
        <button onClick={resetQ} className="btn-editorial text-[9px]">RESET</button>
      </div>
    </div>
  );
}

/* ─── Deque ─── */
function DequeVisualizer({ addLog }: { log: string[]; addLog: (m: string) => void }) {
  const [deque, setDeque] = useState<number[]>([10, 20, 30]);
  const [inputVal, setInputVal] = useState('');

  const insertFront = useCallback(() => {
    const val = parseInt(inputVal);
    if (isNaN(val)) { addLog('Enter a value'); return; }
    if (deque.length >= MAX_SIZE) { addLog('Deque full!'); return; }
    setDeque([val, ...deque]); addLog(`Insert ${val} → FRONT`); setInputVal('');
  }, [inputVal, deque, addLog]);

  const insertRear = useCallback(() => {
    const val = parseInt(inputVal);
    if (isNaN(val)) { addLog('Enter a value'); return; }
    if (deque.length >= MAX_SIZE) { addLog('Deque full!'); return; }
    setDeque([...deque, val]); addLog(`Insert ${val} → REAR`); setInputVal('');
  }, [inputVal, deque, addLog]);

  const deleteFront = useCallback(() => {
    if (deque.length === 0) { addLog('Deque empty!'); return; }
    addLog(`Delete ${deque[0]} ← FRONT`); setDeque(deque.slice(1));
  }, [deque, addLog]);

  const deleteRear = useCallback(() => {
    if (deque.length === 0) { addLog('Deque empty!'); return; }
    addLog(`Delete ${deque[deque.length - 1]} ← REAR`); setDeque(deque.slice(0, -1));
  }, [deque, addLog]);

  return (
    <div>
      <div className="flex items-center gap-0 mb-2 overflow-x-auto py-2">
        <span className="mono-label text-[9px] text-burnt-orange mr-2 shrink-0">FRONT ⇌</span>
        {deque.map((val, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="viz-element" style={{ minWidth: '52px' }}>{val}</div>
            <span className="mono-label text-[7px] text-muted mt-1">{i === 0 ? 'F' : i === deque.length - 1 ? 'R' : ''}</span>
          </div>
        ))}
        {deque.length === 0 && <div className="viz-element opacity-30" style={{ minWidth: '52px' }}>—</div>}
        <span className="mono-label text-[9px] text-burnt-orange ml-2 shrink-0">⇌ REAR</span>
      </div>
      <div className="mono-label text-[9px] text-muted mb-4">DOUBLE-ENDED: insert/delete from both ends · SIZE: {deque.length}/{MAX_SIZE}</div>
      <div className="flex flex-wrap items-end gap-2">
        <div>
          <label className="mono-label text-[8px] text-muted block mb-1">VALUE</label>
          <input type="number" value={inputVal} onChange={e => setInputVal(e.target.value)}
            className="w-20 bg-transparent border border-ink/15 px-2 py-1.5 text-[13px] focus:border-burnt-orange focus:outline-none" />
        </div>
        <button onClick={insertFront} className="btn-editorial text-[9px]">+FRONT</button>
        <button onClick={insertRear} className="btn-editorial text-[9px]">+REAR</button>
        <button onClick={deleteFront} className="btn-editorial text-[9px]">−FRONT</button>
        <button onClick={deleteRear} className="btn-editorial text-[9px]">−REAR</button>
        <button onClick={() => setDeque([10, 20, 30])} className="btn-editorial text-[9px]">RESET</button>
      </div>
    </div>
  );
}

/* ─── Priority Queue (Max Priority) ─── */
function PriorityQueueVisualizer({ addLog }: { log: string[]; addLog: (m: string) => void }) {
  const [pq, setPq] = useState<{ val: number; pri: number }[]>([
    { val: 10, pri: 3 }, { val: 20, pri: 7 }, { val: 5, pri: 1 }, { val: 15, pri: 5 },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [inputPri, setInputPri] = useState('');

  const insert = useCallback(() => {
    const val = parseInt(inputVal); const pri = parseInt(inputPri);
    if (isNaN(val) || isNaN(pri)) { addLog('Enter value and priority'); return; }
    if (pq.length >= MAX_SIZE) { addLog('Priority Queue full!'); return; }
    const newPq = [...pq, { val, pri }].sort((a, b) => b.pri - a.pri);
    setPq(newPq); addLog(`Insert ${val} with priority ${pri}`); setInputVal(''); setInputPri('');
  }, [inputVal, inputPri, pq, addLog]);

  const removeMax = useCallback(() => {
    if (pq.length === 0) { addLog('Priority Queue empty!'); return; }
    const top = pq[0]; addLog(`Remove max: ${top.val} (pri=${top.pri})`);
    setPq(pq.slice(1));
  }, [pq, addLog]);

  return (
    <div>
      <div className="flex items-center gap-1 mb-2 overflow-x-auto py-2">
        <span className="mono-label text-[9px] text-burnt-orange mr-2 shrink-0">HIGH PRI →</span>
        {pq.map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className={`viz-element transition-all ${i === 0 ? 'active' : ''}`} style={{ minWidth: '52px' }}>{item.val}</div>
            <span className="mono-label text-[7px] text-burnt-orange mt-1">P={item.pri}</span>
          </div>
        ))}
        {pq.length === 0 && <div className="viz-element opacity-30" style={{ minWidth: '52px' }}>—</div>}
      </div>
      <div className="mono-label text-[9px] text-muted mb-4">MAX-PRIORITY: larger priority served first · SIZE: {pq.length}/{MAX_SIZE}</div>
      <div className="flex flex-wrap items-end gap-2">
        <div>
          <label className="mono-label text-[8px] text-muted block mb-1">VALUE</label>
          <input type="number" value={inputVal} onChange={e => setInputVal(e.target.value)}
            className="w-16 bg-transparent border border-ink/15 px-2 py-1.5 text-[13px] focus:border-burnt-orange focus:outline-none" />
        </div>
        <div>
          <label className="mono-label text-[8px] text-muted block mb-1">PRIORITY</label>
          <input type="number" value={inputPri} onChange={e => setInputPri(e.target.value)}
            className="w-16 bg-transparent border border-ink/15 px-2 py-1.5 text-[13px] focus:border-burnt-orange focus:outline-none" />
        </div>
        <button onClick={insert} className="btn-editorial text-[9px]">INSERT</button>
        <button onClick={removeMax} className="btn-editorial text-[9px]">REMOVE MAX</button>
        <button onClick={() => { if (pq.length > 0) addLog(`Next: ${pq[0].val} (pri=${pq[0].pri})`); else addLog('Empty'); }} className="btn-editorial text-[9px]">PEEK</button>
        <button onClick={() => setPq([{ val: 10, pri: 3 }, { val: 20, pri: 7 }, { val: 5, pri: 1 }, { val: 15, pri: 5 }])} className="btn-editorial text-[9px]">RESET</button>
      </div>
    </div>
  );
}

/* ─── Main Queue Visualizer ─── */
export default function QueueVisualizer() {
  const [type, setType] = useState<QueueType>('standard');
  const [log, setLog] = useState<string[]>([]);

  const addLog = useCallback((msg: string) => {
    setLog(prev => [msg, ...prev].slice(0, 8));
  }, []);

  const types: { key: QueueType; label: string }[] = [
    { key: 'standard', label: 'STANDARD' },
    { key: 'circular', label: 'CIRCULAR' },
    { key: 'deque', label: 'DEQUE' },
    { key: 'priority', label: 'PRIORITY' },
  ];

  return (
    <div>
      <div className="mono-tag text-[11px] text-ink font-bold mb-1">QUEUE</div>
      <div className="mono-label text-[9px] mb-4">FIFO — FIRST IN, FIRST OUT</div>

      {/* Queue type selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {types.map(t => (
          <button key={t.key} onClick={() => { setType(t.key); setLog([]); }}
            className={`mono-tag text-[9px] px-3 py-1 border transition-colors ${type === t.key ? 'border-burnt-orange text-burnt-orange' : 'border-ink/10 text-muted hover:border-ink/20'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {type === 'standard' && <StandardQueue log={log} addLog={addLog} />}
      {type === 'circular' && <CircularQueue log={log} addLog={addLog} />}
      {type === 'deque' && <DequeVisualizer log={log} addLog={addLog} />}
      {type === 'priority' && <PriorityQueueVisualizer log={log} addLog={addLog} />}

      {/* Shared log */}
      <div className="border-t border-ink/8 pt-3 mt-6">
        <div className="mono-label text-[8px] text-muted mb-2">LOG</div>
        <div className="space-y-0.5">
          {log.map((msg, i) => (
            <div key={i} className={`mono-label text-[10px] ${i === 0 ? 'text-ink' : 'text-muted'}`}>→ {msg}</div>
          ))}
          {log.length === 0 && <div className="mono-label text-[10px] text-muted">Ready</div>}
        </div>
      </div>
    </div>
  );
}
