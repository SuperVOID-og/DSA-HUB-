import { useState, useCallback } from 'react';

interface LLNode {
  id: number;
  value: number;
}

let nextId = 100;

export default function LinkedListVisualizer() {
  const [nodes, setNodes] = useState<LLNode[]>([
    { id: 1, value: 12 },
    { id: 2, value: 5 },
    { id: 3, value: 18 },
    { id: 4, value: 27 },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [inputIdx, setInputIdx] = useState('');
  const [log, setLog] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [traverseId, setTraverseId] = useState<number | null>(null);

  const addLog = useCallback((msg: string) => {
    setLog(prev => [msg, ...prev].slice(0, 8));
  }, []);

  const insertHead = useCallback(() => {
    const val = parseInt(inputVal);
    if (isNaN(val)) { addLog('Enter a value'); return; }
    const newNode = { id: nextId++, value: val };
    setNodes(prev => [newNode, ...prev]);
    setActiveId(newNode.id);
    addLog(`Insert ${val} at HEAD`);
    setInputVal('');
    setTimeout(() => setActiveId(null), 800);
  }, [inputVal, addLog]);

  const insertTail = useCallback(() => {
    const val = parseInt(inputVal);
    if (isNaN(val)) { addLog('Enter a value'); return; }
    const newNode = { id: nextId++, value: val };
    setNodes(prev => [...prev, newNode]);
    setActiveId(newNode.id);
    addLog(`Insert ${val} at TAIL`);
    setInputVal('');
    setTimeout(() => setActiveId(null), 800);
  }, [inputVal, addLog]);

  const insertAt = useCallback(() => {
    const val = parseInt(inputVal);
    const idx = parseInt(inputIdx);
    if (isNaN(val) || isNaN(idx)) { addLog('Enter value and index'); return; }
    if (idx < 0 || idx > nodes.length) { addLog('Invalid index'); return; }
    const newNode = { id: nextId++, value: val };
    const newNodes = [...nodes];
    newNodes.splice(idx, 0, newNode);
    setNodes(newNodes);
    setActiveId(newNode.id);
    addLog(`Insert ${val} at position [${idx}]`);
    setInputVal('');
    setTimeout(() => setActiveId(null), 800);
  }, [inputVal, inputIdx, nodes, addLog]);

  const deleteHead = useCallback(() => {
    if (nodes.length === 0) { addLog('List is empty'); return; }
    const val = nodes[0].value;
    setNodes(prev => prev.slice(1));
    addLog(`Delete HEAD (${val})`);
  }, [nodes, addLog]);

  const deleteTail = useCallback(() => {
    if (nodes.length === 0) { addLog('List is empty'); return; }
    const val = nodes[nodes.length - 1].value;
    setNodes(prev => prev.slice(0, -1));
    addLog(`Delete TAIL (${val})`);
  }, [nodes, addLog]);

  const traverse = useCallback(() => {
    if (nodes.length === 0) { addLog('List is empty'); return; }
    addLog('Traversing list...');
    let i = 0;
    setTraverseId(nodes[0].id);
    const timer = setInterval(() => {
      i++;
      if (i >= nodes.length) {
        clearInterval(timer);
        setTraverseId(null);
        addLog('Traversal complete');
      } else {
        setTraverseId(nodes[i].id);
      }
    }, 500);
  }, [nodes, addLog]);

  return (
    <div>
      <div className="mono-tag text-[11px] text-ink font-bold mb-1">LINKED LIST</div>
      <div className="mono-label text-[9px] mb-6">SINGLY LINKED — DYNAMIC MEMORY</div>

      {/* Linked list visual */}
      <div className="flex items-center gap-0 mb-6 overflow-x-auto py-4 px-2">
        <span className="mono-label text-[8px] text-burnt-orange mr-2 shrink-0">HEAD</span>
        {nodes.map((node, i) => (
          <div key={node.id} className="flex items-center shrink-0">
            <div className="flex flex-col items-center">
              <div className={`viz-element transition-all duration-300 ${
                node.id === activeId ? 'active' :
                node.id === traverseId ? 'comparing' : ''
              }`} style={{ minWidth: '52px' }}>
                {node.value}
              </div>
              <span className="mono-label text-[7px] text-muted mt-1">
                {i === 0 ? 'HEAD' : i === nodes.length - 1 ? 'TAIL' : `[${i}]`}
              </span>
            </div>
            {i < nodes.length - 1 && (
              <div className="flex items-center mx-1">
                <div className="w-6 h-px bg-ink" />
                <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-ink" />
              </div>
            )}
          </div>
        ))}
        {nodes.length > 0 && (
          <div className="flex items-center mx-1 shrink-0">
            <div className="w-4 h-px bg-ink" />
            <span className="mono-label text-[8px] text-muted ml-1">NULL</span>
          </div>
        )}
        {nodes.length === 0 && (
          <span className="mono-label text-[10px] text-muted ml-2">EMPTY LIST</span>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-end gap-3 mb-4">
        <div>
          <label className="mono-label text-[8px] text-muted block mb-1">VALUE</label>
          <input type="number" value={inputVal} onChange={e => setInputVal(e.target.value)}
            className="w-20 bg-transparent border border-ink/15 px-2 py-1.5 text-[13px] focus:border-burnt-orange focus:outline-none" />
        </div>
        <div>
          <label className="mono-label text-[8px] text-muted block mb-1">INDEX</label>
          <input type="number" value={inputIdx} onChange={e => setInputIdx(e.target.value)}
            className="w-16 bg-transparent border border-ink/15 px-2 py-1.5 text-[13px] focus:border-burnt-orange focus:outline-none" />
        </div>
        <button onClick={insertHead} className="btn-editorial text-[9px]">+ HEAD</button>
        <button onClick={insertTail} className="btn-editorial text-[9px]">+ TAIL</button>
        <button onClick={insertAt} className="btn-editorial text-[9px]">+ AT IDX</button>
        <button onClick={deleteHead} className="btn-editorial text-[9px]">- HEAD</button>
        <button onClick={deleteTail} className="btn-editorial text-[9px]">- TAIL</button>
        <button onClick={traverse} className="btn-editorial text-[9px]">TRAVERSE</button>
        <button onClick={() => {
          setNodes([{ id: 1, value: 12 }, { id: 2, value: 5 }, { id: 3, value: 18 }, { id: 4, value: 27 }]);
          setLog([]);
        }} className="btn-editorial text-[9px]">RESET</button>
      </div>

      <div className="mono-label text-[9px] text-muted mb-4">SIZE: {nodes.length} NODES</div>

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
  );
}
