import { useState, useCallback } from 'react';

const MAX_SIZE = 8;

export default function StackVisualizer() {
  const [stack, setStack] = useState<number[]>([12, 5, 18]);
  const [inputVal, setInputVal] = useState('');
  const [log, setLog] = useState<string[]>([]);
  const [peekIdx, setPeekIdx] = useState<number | null>(null);

  const addLog = useCallback((msg: string) => {
    setLog(prev => [msg, ...prev].slice(0, 8));
  }, []);

  const push = useCallback(() => {
    const val = parseInt(inputVal);
    if (isNaN(val)) { addLog('Enter a value'); return; }
    if (stack.length >= MAX_SIZE) { addLog('Stack overflow!'); return; }
    setStack(prev => [...prev, val]);
    addLog(`Push ${val} → TOP`);
    setInputVal('');
  }, [inputVal, stack.length, addLog]);

  const pop = useCallback(() => {
    if (stack.length === 0) { addLog('Stack underflow!'); return; }
    const val = stack[stack.length - 1];
    setStack(prev => prev.slice(0, -1));
    addLog(`Pop ${val} ← TOP`);
  }, [stack, addLog]);

  const peek = useCallback(() => {
    if (stack.length === 0) { addLog('Stack is empty'); return; }
    setPeekIdx(stack.length - 1);
    addLog(`Peek → TOP = ${stack[stack.length - 1]}`);
    setTimeout(() => setPeekIdx(null), 1200);
  }, [stack, addLog]);

  return (
    <div>
      <div className="mono-tag text-[11px] text-ink font-bold mb-1">STACK</div>
      <div className="mono-label text-[9px] mb-6">LIFO — LAST IN, FIRST OUT</div>

      <div className="flex gap-10 items-start">
        {/* Stack visual */}
        <div className="flex flex-col-reverse items-center gap-0 min-w-[100px]">
          {/* Empty slots */}
          {Array.from({ length: MAX_SIZE - stack.length }).map((_, i) => (
            <div key={`empty-${i}`} className="w-20 h-11 border border-dashed border-ink/10 flex items-center justify-center">
              <span className="mono-label text-[8px] text-muted/30">—</span>
            </div>
          ))}
          {/* Stack elements */}
          {stack.map((val, i) => {
            const isTop = i === stack.length - 1;
            const isPeeking = peekIdx === i;
            return (
              <div key={i} className="relative">
                <div className={`viz-element w-20 h-11 transition-all duration-300 ${
                  isPeeking ? 'active' : isTop ? 'border-2 border-ink' : ''
                }`}>
                  {val}
                </div>
                {isTop && (
                  <span className="absolute -right-10 top-1/2 -translate-y-1/2 mono-label text-[8px] text-burnt-orange">← TOP</span>
                )}
              </div>
            );
          })}
          {/* Base */}
          <div className="w-24 h-1 bg-ink mt-0" />
        </div>

        {/* Controls */}
        <div className="flex-1">
          <div className="flex flex-wrap items-end gap-3 mb-6">
            <div>
              <label className="mono-label text-[8px] text-muted block mb-1">VALUE</label>
              <input type="number" value={inputVal} onChange={e => setInputVal(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && push()}
                className="w-20 bg-transparent border border-ink/15 px-2 py-1.5 text-[13px] focus:border-burnt-orange focus:outline-none" />
            </div>
            <button onClick={push} className="btn-editorial text-[9px]">PUSH</button>
            <button onClick={pop} className="btn-editorial text-[9px]">POP</button>
            <button onClick={peek} className="btn-editorial text-[9px]">PEEK</button>
            <button onClick={() => { setStack([12, 5, 18]); setLog([]); }} className="btn-editorial text-[9px]">RESET</button>
          </div>

          <div className="mono-label text-[9px] text-muted mb-2">SIZE: {stack.length} / {MAX_SIZE}</div>

          {/* Log */}
          <div className="border-t border-ink/8 pt-3">
            <div className="mono-label text-[8px] text-muted mb-2">LOG</div>
            <div className="space-y-0.5">
              {log.map((msg, i) => (
                <div key={i} className={`mono-label text-[10px] ${i === 0 ? 'text-ink' : 'text-muted'}`}>→ {msg}</div>
              ))}
              {log.length === 0 && <div className="mono-label text-[10px] text-muted">Ready</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
