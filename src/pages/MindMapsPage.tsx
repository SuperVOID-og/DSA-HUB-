import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ReactFlow,
  type Node,
  type Edge,
  Position,
  MarkerType,
  Background,
  BackgroundVariant,
  Controls,
  Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Data structure mindmaps for each unit
type MapKey = 'overview' | 'unit1' | 'unit2' | 'unit3' | 'unit4' | 'unit5';

interface MindmapNode extends Node {
  data: {
    label: string;
    link?: string; // route to navigate to when clicked
  };
}

const nodeStyle = (level: number): React.CSSProperties => {
  if (level === 0) return {
    background: '#141414', color: '#F4F1EA', border: 'none',
    fontFamily: 'JetBrains Mono', fontSize: '11px', fontWeight: 700,
    letterSpacing: '0.08em', padding: '12px 20px', borderRadius: '0',
    cursor: 'pointer',
  };
  if (level === 1) return {
    background: '#F4F1EA', color: '#141414', border: '1.5px solid #141414',
    fontFamily: 'JetBrains Mono', fontSize: '10px', fontWeight: 600,
    letterSpacing: '0.1em', padding: '8px 14px', borderRadius: '0',
    cursor: 'pointer',
  };
  return {
    background: '#F4F1EA', color: '#141414', border: '1px solid rgba(20,20,20,0.2)',
    fontFamily: 'JetBrains Mono', fontSize: '9px', fontWeight: 500,
    letterSpacing: '0.1em', padding: '6px 12px', borderRadius: '0',
    cursor: 'pointer',
  };
};

const edgeDefaults = { style: { stroke: '#141414', strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed as const, width: 12, height: 12, color: '#141414' } };
const edgeLight = { style: { stroke: 'rgba(20,20,20,0.2)', strokeWidth: 1 } };

const mindmaps: Record<MapKey, { nodes: MindmapNode[]; edges: Edge[]; label: string; description: string }> = {
  overview: {
    label: 'DS OVERVIEW',
    description: 'Complete data structures taxonomy',
    nodes: [
      { id: 'root', position: { x: 400, y: 250 }, data: { label: 'DATA STRUCTURES', link: '/notes/unit-1' }, style: nodeStyle(0), sourcePosition: Position.Right, targetPosition: Position.Left },
      { id: 'linear', position: { x: 700, y: 120 }, data: { label: 'LINEAR', link: '/notes/unit-2' }, style: nodeStyle(1), sourcePosition: Position.Right, targetPosition: Position.Left },
      { id: 'nonlinear', position: { x: 700, y: 380 }, data: { label: 'NON-LINEAR', link: '/notes/unit-3' }, style: nodeStyle(1), sourcePosition: Position.Right, targetPosition: Position.Left },
      { id: 'arr', position: { x: 960, y: 40 }, data: { label: 'ARRAYS', link: '/notes/unit-2#u2-t1' }, style: nodeStyle(2), targetPosition: Position.Left },
      { id: 'stack', position: { x: 960, y: 100 }, data: { label: 'STACKS', link: '/notes/unit-2#u2-t2' }, style: nodeStyle(2), targetPosition: Position.Left },
      { id: 'queue', position: { x: 960, y: 160 }, data: { label: 'QUEUES', link: '/notes/unit-2#u2-t3' }, style: nodeStyle(2), targetPosition: Position.Left },
      { id: 'll', position: { x: 960, y: 220 }, data: { label: 'LINKED LISTS', link: '/notes/unit-2#u2-t4' }, style: nodeStyle(2), targetPosition: Position.Left },
      { id: 'tree', position: { x: 960, y: 330 }, data: { label: 'TREES', link: '/notes/unit-3#u3-t1' }, style: nodeStyle(2), targetPosition: Position.Left },
      { id: 'graph', position: { x: 960, y: 410 }, data: { label: 'GRAPHS', link: '/notes/unit-3#u3-t2' }, style: nodeStyle(2), targetPosition: Position.Left },
      { id: 'hash', position: { x: 960, y: 480 }, data: { label: 'HASH TABLES', link: '/notes/unit-4#u4-t1' }, style: nodeStyle(2), targetPosition: Position.Left },
    ],
    edges: [
      { id: 'e1', source: 'root', target: 'linear', ...edgeDefaults },
      { id: 'e2', source: 'root', target: 'nonlinear', ...edgeDefaults },
      { id: 'e3', source: 'linear', target: 'arr', ...edgeLight },
      { id: 'e4', source: 'linear', target: 'stack', ...edgeLight },
      { id: 'e5', source: 'linear', target: 'queue', ...edgeLight },
      { id: 'e6', source: 'linear', target: 'll', ...edgeLight },
      { id: 'e7', source: 'nonlinear', target: 'tree', ...edgeLight },
      { id: 'e8', source: 'nonlinear', target: 'graph', ...edgeLight },
      { id: 'e9', source: 'nonlinear', target: 'hash', ...edgeLight },
    ],
  },
  unit1: {
    label: 'UNIT 1 — INTRODUCTION',
    description: 'Terminology, classification, ADTs',
    nodes: [
      { id: 'root', position: { x: 400, y: 220 }, data: { label: 'INTRODUCTION TO DS', link: '/notes/unit-1' }, style: nodeStyle(0), sourcePosition: Position.Right, targetPosition: Position.Left },
      { id: 'term', position: { x: 700, y: 80 }, data: { label: 'TERMINOLOGY', link: '/notes/unit-1#u1-t1' }, style: nodeStyle(1), sourcePosition: Position.Right, targetPosition: Position.Left },
      { id: 'class', position: { x: 700, y: 200 }, data: { label: 'CLASSIFICATION', link: '/notes/unit-1#u1-t2' }, style: nodeStyle(1), sourcePosition: Position.Right, targetPosition: Position.Left },
      { id: 'adt', position: { x: 700, y: 320 }, data: { label: 'ADT', link: '/notes/unit-1#u1-t4' }, style: nodeStyle(1), sourcePosition: Position.Right, targetPosition: Position.Left },
      { id: 'store', position: { x: 700, y: 420 }, data: { label: 'STORAGE', link: '/notes/unit-1#u1-t5' }, style: nodeStyle(1), targetPosition: Position.Left },
      { id: 'prim', position: { x: 960, y: 150 }, data: { label: 'PRIMITIVE', link: '/notes/unit-1#u1-t2' }, style: nodeStyle(2), targetPosition: Position.Left },
      { id: 'nonprim', position: { x: 960, y: 220 }, data: { label: 'NON-PRIMITIVE', link: '/notes/unit-1#u1-t2' }, style: nodeStyle(2), targetPosition: Position.Left },
      { id: 'lin', position: { x: 960, y: 280 }, data: { label: 'LINEAR', link: '/notes/unit-1#u1-t3' }, style: nodeStyle(2), targetPosition: Position.Left },
      { id: 'nlin', position: { x: 960, y: 340 }, data: { label: 'NON-LINEAR', link: '/notes/unit-1#u1-t3' }, style: nodeStyle(2), targetPosition: Position.Left },
    ],
    edges: [
      { id: 'e1', source: 'root', target: 'term', ...edgeDefaults },
      { id: 'e2', source: 'root', target: 'class', ...edgeDefaults },
      { id: 'e3', source: 'root', target: 'adt', ...edgeDefaults },
      { id: 'e4', source: 'root', target: 'store', ...edgeDefaults },
      { id: 'e5', source: 'class', target: 'prim', ...edgeLight },
      { id: 'e6', source: 'class', target: 'nonprim', ...edgeLight },
      { id: 'e7', source: 'nonprim', target: 'lin', ...edgeLight },
      { id: 'e8', source: 'nonprim', target: 'nlin', ...edgeLight },
    ],
  },
  unit2: {
    label: 'UNIT 2 — LINEAR DS',
    description: 'Arrays, stacks, queues, linked lists',
    nodes: [
      { id: 'root', position: { x: 350, y: 250 }, data: { label: 'LINEAR DS', link: '/notes/unit-2' }, style: nodeStyle(0), sourcePosition: Position.Right, targetPosition: Position.Left },
      { id: 'arr', position: { x: 650, y: 60 }, data: { label: 'ARRAYS', link: '/notes/unit-2#u2-t1' }, style: nodeStyle(1), sourcePosition: Position.Right, targetPosition: Position.Left },
      { id: 'stack', position: { x: 650, y: 170 }, data: { label: 'STACKS', link: '/notes/unit-2#u2-t2' }, style: nodeStyle(1), sourcePosition: Position.Right, targetPosition: Position.Left },
      { id: 'queue', position: { x: 650, y: 320 }, data: { label: 'QUEUES', link: '/notes/unit-2#u2-t3' }, style: nodeStyle(1), sourcePosition: Position.Right, targetPosition: Position.Left },
      { id: 'rec', position: { x: 650, y: 440 }, data: { label: 'RECURSION', link: '/notes/unit-2#u2-t5' }, style: nodeStyle(1), targetPosition: Position.Left },
      { id: 'sparse', position: { x: 920, y: 30 }, data: { label: 'SPARSE MATRIX', link: '/notes/unit-2#u2-t1' }, style: nodeStyle(2), targetPosition: Position.Left },
      { id: 'rowcol', position: { x: 920, y: 90 }, data: { label: 'ROW/COL MAJOR', link: '/notes/unit-2#u2-t1' }, style: nodeStyle(2), targetPosition: Position.Left },
      { id: 'push', position: { x: 920, y: 150 }, data: { label: 'PUSH / POP', link: '/notes/unit-2#u2-t2' }, style: nodeStyle(2), targetPosition: Position.Left },
      { id: 'polish', position: { x: 920, y: 210 }, data: { label: 'POLISH NOTATION', link: '/notes/unit-2#u2-t2' }, style: nodeStyle(2), targetPosition: Position.Left },
      { id: 'cq', position: { x: 920, y: 300 }, data: { label: 'CIRCULAR QUEUE', link: '/notes/unit-2#u2-t3' }, style: nodeStyle(2), targetPosition: Position.Left },
      { id: 'pq', position: { x: 920, y: 360 }, data: { label: 'PRIORITY QUEUE', link: '/notes/unit-2#u2-t3' }, style: nodeStyle(2), targetPosition: Position.Left },
    ],
    edges: [
      { id: 'e1', source: 'root', target: 'arr', ...edgeDefaults },
      { id: 'e2', source: 'root', target: 'stack', ...edgeDefaults },
      { id: 'e3', source: 'root', target: 'queue', ...edgeDefaults },
      { id: 'e4', source: 'root', target: 'rec', ...edgeDefaults },
      { id: 'e5', source: 'arr', target: 'sparse', ...edgeLight },
      { id: 'e6', source: 'arr', target: 'rowcol', ...edgeLight },
      { id: 'e7', source: 'stack', target: 'push', ...edgeLight },
      { id: 'e8', source: 'stack', target: 'polish', ...edgeLight },
      { id: 'e9', source: 'queue', target: 'cq', ...edgeLight },
      { id: 'e10', source: 'queue', target: 'pq', ...edgeLight },
    ],
  },
  unit3: {
    label: 'UNIT 3 — NON-LINEAR DS',
    description: 'Trees, graphs, traversal algorithms',
    nodes: [
      { id: 'root', position: { x: 350, y: 220 }, data: { label: 'NON-LINEAR DS', link: '/notes/unit-3' }, style: nodeStyle(0), sourcePosition: Position.Right, targetPosition: Position.Left },
      { id: 'tree', position: { x: 650, y: 80 }, data: { label: 'TREES', link: '/notes/unit-3#u3-t1' }, style: nodeStyle(1), sourcePosition: Position.Right, targetPosition: Position.Left },
      { id: 'graph', position: { x: 650, y: 280 }, data: { label: 'GRAPHS', link: '/notes/unit-3#u3-t2' }, style: nodeStyle(1), sourcePosition: Position.Right, targetPosition: Position.Left },
      { id: 'bst', position: { x: 920, y: 30 }, data: { label: 'BST', link: '/notes/unit-3#u3-t1' }, style: nodeStyle(2), targetPosition: Position.Left },
      { id: 'trav', position: { x: 920, y: 90 }, data: { label: 'TRAVERSAL', link: '/notes/unit-3#u3-t1' }, style: nodeStyle(2), targetPosition: Position.Left },
      { id: 'thread', position: { x: 920, y: 150 }, data: { label: 'THREADED BT', link: '/notes/unit-3#u3-t1' }, style: nodeStyle(2), targetPosition: Position.Left },
      { id: 'bfs', position: { x: 920, y: 240 }, data: { label: 'BFS', link: '/notes/unit-3#u3-t2' }, style: nodeStyle(2), targetPosition: Position.Left },
      { id: 'dfs', position: { x: 920, y: 300 }, data: { label: 'DFS', link: '/notes/unit-3#u3-t2' }, style: nodeStyle(2), targetPosition: Position.Left },
      { id: 'mst', position: { x: 920, y: 370 }, data: { label: 'MST / SHORTEST PATH', link: '/notes/unit-3#u3-t3' }, style: nodeStyle(2), targetPosition: Position.Left },
    ],
    edges: [
      { id: 'e1', source: 'root', target: 'tree', ...edgeDefaults },
      { id: 'e2', source: 'root', target: 'graph', ...edgeDefaults },
      { id: 'e3', source: 'tree', target: 'bst', ...edgeLight },
      { id: 'e4', source: 'tree', target: 'trav', ...edgeLight },
      { id: 'e5', source: 'tree', target: 'thread', ...edgeLight },
      { id: 'e6', source: 'graph', target: 'bfs', ...edgeLight },
      { id: 'e7', source: 'graph', target: 'dfs', ...edgeLight },
      { id: 'e8', source: 'graph', target: 'mst', ...edgeLight },
    ],
  },
  unit4: {
    label: 'UNIT 4 — HASHING & FILES',
    description: 'Hash functions, collisions, file org',
    nodes: [
      { id: 'root', position: { x: 350, y: 200 }, data: { label: 'HASHING & FILES', link: '/notes/unit-4' }, style: nodeStyle(0), sourcePosition: Position.Right, targetPosition: Position.Left },
      { id: 'hash', position: { x: 650, y: 80 }, data: { label: 'HASHING', link: '/notes/unit-4#u4-t1' }, style: nodeStyle(1), sourcePosition: Position.Right, targetPosition: Position.Left },
      { id: 'file', position: { x: 650, y: 310 }, data: { label: 'FILE STRUCTURES', link: '/notes/unit-4#u4-t3' }, style: nodeStyle(1), sourcePosition: Position.Right, targetPosition: Position.Left },
      { id: 'div', position: { x: 920, y: 30 }, data: { label: 'DIVISION METHOD', link: '/notes/unit-4#u4-t1' }, style: nodeStyle(2), targetPosition: Position.Left },
      { id: 'chain', position: { x: 920, y: 90 }, data: { label: 'CHAINING', link: '/notes/unit-4#u4-t2' }, style: nodeStyle(2), targetPosition: Position.Left },
      { id: 'probe', position: { x: 920, y: 150 }, data: { label: 'PROBING', link: '/notes/unit-4#u4-t2' }, style: nodeStyle(2), targetPosition: Position.Left },
      { id: 'seq', position: { x: 920, y: 280 }, data: { label: 'SEQUENTIAL', link: '/notes/unit-4#u4-t3' }, style: nodeStyle(2), targetPosition: Position.Left },
      { id: 'isam', position: { x: 920, y: 340 }, data: { label: 'ISAM', link: '/notes/unit-4#u4-t3' }, style: nodeStyle(2), targetPosition: Position.Left },
    ],
    edges: [
      { id: 'e1', source: 'root', target: 'hash', ...edgeDefaults },
      { id: 'e2', source: 'root', target: 'file', ...edgeDefaults },
      { id: 'e3', source: 'hash', target: 'div', ...edgeLight },
      { id: 'e4', source: 'hash', target: 'chain', ...edgeLight },
      { id: 'e5', source: 'hash', target: 'probe', ...edgeLight },
      { id: 'e6', source: 'file', target: 'seq', ...edgeLight },
      { id: 'e7', source: 'file', target: 'isam', ...edgeLight },
    ],
  },
  unit5: {
    label: 'UNIT 5 — SORTING & SEARCHING',
    description: 'Sorting algorithms, search techniques',
    nodes: [
      { id: 'root', position: { x: 300, y: 220 }, data: { label: 'SORT & SEARCH', link: '/notes/unit-5' }, style: nodeStyle(0), sourcePosition: Position.Right, targetPosition: Position.Left },
      { id: 'sort', position: { x: 600, y: 100 }, data: { label: 'SORTING', link: '/notes/unit-5#u5-t2' }, style: nodeStyle(1), sourcePosition: Position.Right, targetPosition: Position.Left },
      { id: 'search', position: { x: 600, y: 350 }, data: { label: 'SEARCHING', link: '/notes/unit-5#u5-t4' }, style: nodeStyle(1), sourcePosition: Position.Right, targetPosition: Position.Left },
      { id: 'bubble', position: { x: 880, y: 20 }, data: { label: 'BUBBLE SORT', link: '/notes/unit-5#u5-t2' }, style: nodeStyle(2), targetPosition: Position.Left },
      { id: 'sel', position: { x: 880, y: 70 }, data: { label: 'SELECTION SORT', link: '/notes/unit-5#u5-t2' }, style: nodeStyle(2), targetPosition: Position.Left },
      { id: 'ins', position: { x: 880, y: 120 }, data: { label: 'INSERTION SORT', link: '/notes/unit-5#u5-t2' }, style: nodeStyle(2), targetPosition: Position.Left },
      { id: 'quick', position: { x: 880, y: 170 }, data: { label: 'QUICK SORT', link: '/notes/unit-5#u5-t3' }, style: nodeStyle(2), targetPosition: Position.Left },
      { id: 'merge', position: { x: 880, y: 220 }, data: { label: 'MERGE SORT', link: '/notes/unit-5#u5-t3' }, style: nodeStyle(2), targetPosition: Position.Left },
      { id: 'heap', position: { x: 880, y: 270 }, data: { label: 'HEAP SORT', link: '/notes/unit-5#u5-t3' }, style: nodeStyle(2), targetPosition: Position.Left },
      { id: 'lin', position: { x: 880, y: 330 }, data: { label: 'LINEAR SEARCH', link: '/notes/unit-5#u5-t4' }, style: nodeStyle(2), targetPosition: Position.Left },
      { id: 'bin', position: { x: 880, y: 390 }, data: { label: 'BINARY SEARCH', link: '/notes/unit-5#u5-t4' }, style: nodeStyle(2), targetPosition: Position.Left },
    ],
    edges: [
      { id: 'e1', source: 'root', target: 'sort', ...edgeDefaults },
      { id: 'e2', source: 'root', target: 'search', ...edgeDefaults },
      { id: 'e3', source: 'sort', target: 'bubble', ...edgeLight },
      { id: 'e4', source: 'sort', target: 'sel', ...edgeLight },
      { id: 'e5', source: 'sort', target: 'ins', ...edgeLight },
      { id: 'e6', source: 'sort', target: 'quick', ...edgeLight },
      { id: 'e7', source: 'sort', target: 'merge', ...edgeLight },
      { id: 'e8', source: 'sort', target: 'heap', ...edgeLight },
      { id: 'e9', source: 'search', target: 'lin', ...edgeLight },
      { id: 'e10', source: 'search', target: 'bin', ...edgeLight },
    ],
  },
};

export default function MindMapsPage() {
  const [activeMap, setActiveMap] = useState<MapKey>('overview');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const navigate = useNavigate();

  const onNodeMouseEnter = useCallback((_: React.MouseEvent, node: Node) => {
    setHoveredId(node.id);
  }, []);

  const onNodeMouseLeave = useCallback(() => {
    setHoveredId(null);
  }, []);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    const link = (node.data as { link?: string })?.link;
    if (link) {
      navigate(link);
    }
  }, [navigate]);

  // When map changes, update nodes/edges
  const switchMap = useCallback((key: MapKey) => {
    setActiveMap(key);
    setHoveredId(null);
  }, []);

  const currentMap = mindmaps[activeMap];

  return (
    <div>
      <div className="mb-10">
        <div className="mono-label text-[10px] mb-3">MIND MAPS / VISUAL</div>
        <h1 className="text-[clamp(2rem,5vw,3.5rem)] tracking-[-0.03em]"
          style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
          Mind maps.
        </h1>
        <p className="text-[14px] text-muted mt-3 max-w-[480px]">
          See the big picture. Connect the dots. Click any node to navigate to its notes section.
        </p>
      </div>

      {/* Map selector */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {(Object.keys(mindmaps) as MapKey[]).map((key) => (
          <button
            key={key}
            onClick={() => switchMap(key)}
            className={`mono-tag text-[10px] px-3 py-1.5 border transition-colors ${
              activeMap === key ? 'border-ink bg-ink text-cream' : 'border-ink/15 text-muted hover:border-ink/30'
            }`}
          >
            {mindmaps[key].label}
          </button>
        ))}
      </div>

      {/* Map */}
      <div className="border border-[rgba(20,20,20,0.1)] bg-[rgba(244,241,234,0.5)]" style={{ height: '550px' }}>
        <ReactFlow
          key={activeMap}
          defaultNodes={currentMap.nodes.map(n => ({
            ...n,
            style: {
              ...n.style,
              opacity: hoveredId ? (n.id === hoveredId ? 1 : 0.35) : 1,
              transition: 'opacity 0.3s ease',
            },
          }))}
          defaultEdges={currentMap.edges.map(e => ({
            ...e,
            style: {
              ...e.style,
              opacity: hoveredId
                ? (e.source === hoveredId || e.target === hoveredId ? 1 : 0.15)
                : 1,
              transition: 'opacity 0.3s ease',
            },
          }))}
          onNodeMouseEnter={onNodeMouseEnter}
          onNodeMouseLeave={onNodeMouseLeave}
          onNodeClick={onNodeClick}
          fitView
          fitViewOptions={{ padding: 0.25 }}
          panOnDrag
          zoomOnScroll
          attributionPosition="bottom-left"
          proOptions={{ hideAttribution: true }}
        >
          <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="rgba(20,20,20,0.06)" />
          <Controls showInteractive={false} position="bottom-right" />
          <Panel position="top-left">
            <div className="mono-label text-[8px]">{currentMap.description.toUpperCase()} · CLICK NODES TO NAVIGATE</div>
          </Panel>
        </ReactFlow>
      </div>

      {/* Text alternative for accessibility */}
      <details className="mt-6">
        <summary className="mono-label text-[10px] text-muted cursor-pointer hover:text-ink transition-colors">
          ♿ TEXT OUTLINE (ACCESSIBLE ALTERNATIVE)
        </summary>
        <div className="mt-3 pl-4 border-l border-ink/10">
          {currentMap.nodes.map((node) => (
            <div key={node.id} className="text-[13px] text-ink-light py-0.5">
              {typeof node.data.label === 'string' ? node.data.label : ''}
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
