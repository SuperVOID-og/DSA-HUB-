import { useCallback, useState } from 'react';
import {
  ReactFlow,
  type Node,
  type Edge,
  useNodesState,
  useEdgesState,
  Position,
  MarkerType,
  Background,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes: Node[] = [
  {
    id: 'root',
    position: { x: 300, y: 160 },
    data: { label: 'DATA STRUCTURES' },
    style: {
      background: '#141414', color: '#F4F1EA', border: 'none',
      fontFamily: 'JetBrains Mono', fontSize: '11px', fontWeight: 700,
      letterSpacing: '0.08em', padding: '10px 18px', borderRadius: '0',
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: 'linear',
    position: { x: 580, y: 60 },
    data: { label: 'LINEAR' },
    style: {
      background: '#F4F1EA', color: '#141414', border: '1.5px solid #141414',
      fontFamily: 'JetBrains Mono', fontSize: '10px', fontWeight: 600,
      letterSpacing: '0.1em', padding: '8px 14px', borderRadius: '0',
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: 'nonlinear',
    position: { x: 580, y: 260 },
    data: { label: 'NON-LINEAR' },
    style: {
      background: '#F4F1EA', color: '#141414', border: '1.5px solid #141414',
      fontFamily: 'JetBrains Mono', fontSize: '10px', fontWeight: 600,
      letterSpacing: '0.1em', padding: '8px 14px', borderRadius: '0',
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: 'array',
    position: { x: 800, y: 10 },
    data: { label: 'ARRAYS' },
    style: {
      background: 'rgba(224, 86, 38, 0.08)', color: '#E05626', border: '1px solid #E05626',
      fontFamily: 'JetBrains Mono', fontSize: '9px', fontWeight: 600,
      letterSpacing: '0.1em', padding: '6px 12px', borderRadius: '0',
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: 'stack',
    position: { x: 800, y: 65 },
    data: { label: 'STACKS' },
    style: {
      background: '#F4F1EA', color: '#141414', border: '1px solid rgba(20,20,20,0.2)',
      fontFamily: 'JetBrains Mono', fontSize: '9px', fontWeight: 500,
      letterSpacing: '0.1em', padding: '6px 12px', borderRadius: '0',
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: 'queue',
    position: { x: 800, y: 115 },
    data: { label: 'QUEUES' },
    style: {
      background: '#F4F1EA', color: '#141414', border: '1px solid rgba(20,20,20,0.2)',
      fontFamily: 'JetBrains Mono', fontSize: '9px', fontWeight: 500,
      letterSpacing: '0.1em', padding: '6px 12px', borderRadius: '0',
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: 'tree',
    position: { x: 800, y: 220 },
    data: { label: 'TREES' },
    style: {
      background: '#F4F1EA', color: '#141414', border: '1px solid rgba(20,20,20,0.2)',
      fontFamily: 'JetBrains Mono', fontSize: '9px', fontWeight: 500,
      letterSpacing: '0.1em', padding: '6px 12px', borderRadius: '0',
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: 'graph',
    position: { x: 800, y: 300 },
    data: { label: 'GRAPHS' },
    style: {
      background: '#F4F1EA', color: '#141414', border: '1px solid rgba(20,20,20,0.2)',
      fontFamily: 'JetBrains Mono', fontSize: '9px', fontWeight: 500,
      letterSpacing: '0.1em', padding: '6px 12px', borderRadius: '0',
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
];

const initialEdges: Edge[] = [
  { id: 'e-root-linear', source: 'root', target: 'linear', style: { stroke: '#141414', strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: '#141414' } },
  { id: 'e-root-nonlinear', source: 'root', target: 'nonlinear', style: { stroke: '#141414', strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: '#141414' } },
  { id: 'e-linear-array', source: 'linear', target: 'array', style: { stroke: '#E05626', strokeWidth: 1 }, animated: true },
  { id: 'e-linear-stack', source: 'linear', target: 'stack', style: { stroke: 'rgba(20,20,20,0.2)', strokeWidth: 1 } },
  { id: 'e-linear-queue', source: 'linear', target: 'queue', style: { stroke: 'rgba(20,20,20,0.2)', strokeWidth: 1 } },
  { id: 'e-nonlinear-tree', source: 'nonlinear', target: 'tree', style: { stroke: 'rgba(20,20,20,0.2)', strokeWidth: 1 } },
  { id: 'e-nonlinear-graph', source: 'nonlinear', target: 'graph', style: { stroke: 'rgba(20,20,20,0.2)', strokeWidth: 1 } },
];

export default function MindmapPreview() {
  const [nodes] = useNodesState(initialNodes);
  const [edges] = useEdgesState(initialEdges);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const onNodeMouseEnter = useCallback((_: React.MouseEvent, node: Node) => {
    setHoveredId(node.id);
  }, []);

  const onNodeMouseLeave = useCallback(() => {
    setHoveredId(null);
  }, []);

  return (
    <div className="w-full h-full relative" style={{ minHeight: '400px' }}>
      <ReactFlow
        nodes={nodes.map(n => ({
          ...n,
          style: {
            ...n.style,
            opacity: hoveredId ? (n.id === hoveredId ? 1 : 0.4) : 1,
            transition: 'opacity 0.3s ease',
          },
        }))}
        edges={edges.map(e => ({
          ...e,
          style: {
            ...e.style,
            opacity: hoveredId
              ? (e.source === hoveredId || e.target === hoveredId ? 1 : 0.2)
              : 1,
            transition: 'opacity 0.3s ease',
          },
        }))}
        onNodeMouseEnter={onNodeMouseEnter}
        onNodeMouseLeave={onNodeMouseLeave}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        panOnDrag
        zoomOnScroll={false}
        attributionPosition="bottom-left"
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="rgba(20,20,20,0.06)" />
      </ReactFlow>
      {/* Corner annotation */}
      <div className="absolute top-3 left-3 mono-label text-[8px]">FIG. 2.1 / DS TAXONOMY</div>
    </div>
  );
}
