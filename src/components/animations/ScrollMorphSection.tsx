import { useRef, useEffect, useState } from 'react';

interface MorphNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

interface MorphEdge {
  from: string;
  to: string;
}

function getResponsiveLayout(W: number, H: number) {
  const isMobile = W < 768;
  const cx = W / 2;
  
  const nodeRadius = isMobile ? 16 : 22;
  const fontSize = isMobile ? 12 : 14;
  const labelFontSize = isMobile ? 8 : 10;
  
  const llSpacing = Math.min(150, (W - 32) / 4);
  const llY = H / 2;
  
  const linkedListNodes: MorphNode[] = [
    { id: 'a', label: '12', x: cx - 2 * llSpacing, y: llY },
    { id: 'b', label: '05', x: cx - llSpacing, y: llY },
    { id: 'c', label: '18', x: cx, y: llY },
    { id: 'd', label: '27', x: cx + llSpacing, y: llY },
    { id: 'e', label: '33', x: cx + 2 * llSpacing, y: llY },
  ];
  
  const arrCellW = Math.min(116, (W - 32) / 5);
  const arrSpacing = arrCellW;
  const arrY = llY;
  
  const arrayNodes: MorphNode[] = [
    { id: 'a', label: '05', x: cx - 2 * arrSpacing, y: arrY },
    { id: 'b', label: '12', x: cx - arrSpacing, y: arrY },
    { id: 'c', label: '18', x: cx, y: arrY },
    { id: 'd', label: '27', x: cx + arrSpacing, y: arrY },
    { id: 'e', label: '33', x: cx + 2 * arrSpacing, y: arrY },
  ];
  
  const bstRootY = isMobile ? H * 0.15 : 60;
  const bstLevelY = isMobile ? H * 0.35 : 110;
  const bstLevel2Y = isMobile ? H * 0.70 : 220;
  const bstL1Offset = Math.min(160, W / 3.2);
  const bstL2Offset = Math.min(80, W / 6);
  
  const treeNodes: MorphNode[] = [
    { id: 'c', label: '18', x: cx, y: bstRootY },
    { id: 'b', label: '12', x: cx - bstL1Offset, y: bstRootY + bstLevelY },
    { id: 'd', label: '27', x: cx + bstL1Offset, y: bstRootY + bstLevelY },
    { id: 'a', label: '05', x: cx - bstL1Offset - bstL2Offset, y: bstRootY + bstLevel2Y },
    { id: 'e', label: '33', x: cx + bstL1Offset + bstL2Offset, y: bstRootY + bstLevel2Y },
  ];

  const linkedListEdges: MorphEdge[] = [
    { from: 'a', to: 'b' }, { from: 'b', to: 'c' }, { from: 'c', to: 'd' }, { from: 'd', to: 'e' },
  ];
  const arrayEdges: MorphEdge[] = [];
  const treeEdges: MorphEdge[] = [
    { from: 'c', to: 'b' }, { from: 'c', to: 'd' }, { from: 'b', to: 'a' }, { from: 'd', to: 'e' },
  ];

  return {
    nodeRadius, fontSize, labelFontSize,
    linkedListNodes, arrayNodes, treeNodes,
    linkedListEdges, arrayEdges, treeEdges,
    arrCellW, llSpacing
  };
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function interpolateNodes(from: MorphNode[], to: MorphNode[], t: number): MorphNode[] {
  const eased = easeInOutCubic(t);
  return from.map((node) => {
    const target = to.find(n => n.id === node.id) || node;
    return {
      ...node,
      label: t > 0.5 ? target.label : node.label,
      x: lerp(node.x, target.x, eased),
      y: lerp(node.y, target.y, eased),
    };
  });
}

function interpolateEdges(from: MorphEdge[], to: MorphEdge[], t: number): { edges: MorphEdge[]; opacity: number } {
  if (t < 0.3) {
    return { edges: from, opacity: 1 - t / 0.3 };
  } else if (t < 0.7) {
    return { edges: to.length > 0 ? to : from, opacity: 0 };
  } else {
    return { edges: to, opacity: (t - 0.7) / 0.3 };
  }
}

export default function ScrollMorphSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentLabel, setCurrentLabel] = useState('LINKED LIST');
  const targetProgressRef = useRef(0);
  const smoothProgressRef = useRef(0);
  const velocityRef = useRef(0);
  const rafRef = useRef<number>(0);
  const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let sectionTop = 0;
    let sectionHeight = 0;
    let maxScroll = 0;

    const measure = () => {
      const rect = section.getBoundingClientRect();
      sectionTop = rect.top + window.scrollY;
      sectionHeight = section.offsetHeight;
      maxScroll = sectionHeight - window.innerHeight;
    };

    const onScroll = () => {
      if (maxScroll <= 0) return;
      const scrolled = window.scrollY - sectionTop;
      const p = Math.max(0, Math.min(1, scrolled / maxScroll));
      targetProgressRef.current = p;
    };

    window.addEventListener('resize', measure);
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Slight delay to ensure layout is settled
    setTimeout(() => { measure(); onScroll(); }, 50);
    
    return () => {
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 800;
    let h = 360;

    const render = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect && (rect.width !== w || rect.height !== h)) {
        w = rect.width;
        h = rect.height;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      const layout = getResponsiveLayout(w, h);
      const {
        nodeRadius, fontSize, labelFontSize,
        linkedListNodes, arrayNodes, treeNodes,
        linkedListEdges, arrayEdges, treeEdges,
        arrCellW, llSpacing
      } = layout;

      // Smooth interpolation: heavily locked/unrushable feel with spring-like physics
      const diff = targetProgressRef.current - smoothProgressRef.current;
      
      // Use a spring-like dampening to prevent blowing through the animation
      velocityRef.current = (velocityRef.current + diff * 0.005) * 0.85;
      smoothProgressRef.current += velocityRef.current;
      
      // Safety clamp
      if (smoothProgressRef.current < 0) smoothProgressRef.current = 0;
      if (smoothProgressRef.current > 1) smoothProgressRef.current = 1;

      const progress = smoothProgressRef.current;

      if (progress < 0.30) setCurrentLabel('LINKED LIST');
      else if (progress < 0.75) setCurrentLabel('SORTED ARRAY');
      else setCurrentLabel('BINARY SEARCH TREE');

      let nodes: MorphNode[];
      let edgeResult: { edges: MorphEdge[]; opacity: number };
      let showArrayBox = false;

      if (progress < 0.15) {
        nodes = linkedListNodes;
        edgeResult = { edges: linkedListEdges, opacity: 1 };
      } else if (progress < 0.45) {
        const t = (progress - 0.15) / 0.30;
        nodes = interpolateNodes(linkedListNodes, arrayNodes, t);
        edgeResult = interpolateEdges(linkedListEdges, arrayEdges, t);
        showArrayBox = t > 0.5;
      } else if (progress < 0.60) {
        nodes = arrayNodes;
        edgeResult = { edges: arrayEdges, opacity: 1 };
        showArrayBox = true;
      } else if (progress < 0.95) {
        const t = (progress - 0.60) / 0.35;
        nodes = interpolateNodes(arrayNodes, treeNodes, t);
        edgeResult = interpolateEdges(arrayEdges, treeEdges, t);
        showArrayBox = t < 0.3;
      } else {
        nodes = treeNodes;
        edgeResult = { edges: treeEdges, opacity: 1 };
      }

      ctx.clearRect(0, 0, w, h);

      // Draw array box
      if (showArrayBox) {
        const boxOpacity = progress < 0.60 ?
          Math.min(1, (progress - 0.30) / 0.15) :
          Math.max(0, 1 - ((progress - 0.60) / 0.10));
        if (boxOpacity > 0) {
          ctx.globalAlpha = boxOpacity * 0.3;
          ctx.strokeStyle = '#141414';
          ctx.lineWidth = 1;
          const startX = (w / 2) - (arrCellW * 2.5);
          for (let i = 0; i < 5; i++) {
            ctx.strokeRect(startX + i * arrCellW, (h / 2) - nodeRadius - 6, arrCellW, nodeRadius * 2 + 12);
          }
          ctx.globalAlpha = 1;
        }
      }

      // Draw edges
      if (edgeResult.opacity > 0 && edgeResult.edges.length > 0) {
        ctx.globalAlpha = edgeResult.opacity;
        ctx.strokeStyle = 'rgba(20, 20, 20, 0.4)';
        ctx.lineWidth = 1.5;

        edgeResult.edges.forEach(edge => {
          const fromNode = nodes.find(n => n.id === edge.from);
          const toNode = nodes.find(n => n.id === edge.to);
          if (fromNode && toNode) {
            ctx.beginPath();
            ctx.moveTo(fromNode.x, fromNode.y);
            ctx.lineTo(toNode.x, toNode.y);
            
            // Halo stroke to visually hide the data line behind the edges
            ctx.save();
            ctx.strokeStyle = '#F4F1EA'; // cream background
            ctx.lineWidth = 6;
            ctx.globalAlpha = 1;
            ctx.stroke();
            ctx.restore();

            ctx.stroke(); // Draw actual dark edge

            // Draw arrow tip for linked list edges
            if (progress < 0.35) {
              const angle = Math.atan2(toNode.y - fromNode.y, toNode.x - fromNode.x);
              const tipX = toNode.x - nodeRadius * Math.cos(angle);
              const tipY = toNode.y - nodeRadius * Math.sin(angle);
              
              ctx.beginPath();
              ctx.moveTo(tipX, tipY);
              ctx.lineTo(tipX - 8 * Math.cos(angle - 0.4), tipY - 8 * Math.sin(angle - 0.4));
              ctx.moveTo(tipX, tipY);
              ctx.lineTo(tipX - 8 * Math.cos(angle + 0.4), tipY - 8 * Math.sin(angle + 0.4));
              
              // Halo for arrow tip
              ctx.save();
              ctx.strokeStyle = '#F4F1EA';
              ctx.lineWidth = 6;
              ctx.globalAlpha = 1;
              ctx.stroke();
              ctx.restore();
              
              ctx.stroke();
            }
          }
        });

        ctx.globalAlpha = 1;
      }

      // Draw nodes
      nodes.forEach(node => {
        ctx.fillStyle = '#F4F1EA';
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#141414';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#141414';
        ctx.font = `600 ${fontSize}px "JetBrains Mono", monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.label, node.x, node.y);
      });

      // Structure type labels
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = '#141414';
      ctx.font = `500 ${labelFontSize}px "JetBrains Mono", monospace`;
      ctx.textAlign = 'center';

      if (progress < 0.15) {
        const cx = w / 2;
        ctx.fillText('HEAD', cx - 2 * llSpacing, h / 2 + nodeRadius + 15);
        if (w >= 500) {
          ctx.fillText('→ NEXT', cx - 1.5 * llSpacing, h / 2 - nodeRadius - 10);
          ctx.fillText('→ NEXT', cx - 0.5 * llSpacing, h / 2 - nodeRadius - 10);
          ctx.fillText('→ NEXT', cx + 0.5 * llSpacing, h / 2 - nodeRadius - 10);
          ctx.fillText('→ NULL', cx + 1.5 * llSpacing, h / 2 - nodeRadius - 10);
        }
      } else if (progress >= 0.45 && progress < 0.60) {
        const cx = w / 2;
        ctx.fillText('[0]', cx - 2 * arrCellW, h / 2 + nodeRadius + 18);
        ctx.fillText('[1]', cx - arrCellW, h / 2 + nodeRadius + 18);
        ctx.fillText('[2]', cx, h / 2 + nodeRadius + 18);
        ctx.fillText('[3]', cx + arrCellW, h / 2 + nodeRadius + 18);
        ctx.fillText('[4]', cx + 2 * arrCellW, h / 2 + nodeRadius + 18);
      } else if (progress >= 0.90) {
        ctx.fillText('ROOT', w / 2, treeNodes[0].y - nodeRadius - 10);
      }
      ctx.globalAlpha = 1;



      rafRef.current = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(rafRef.current);
  }, [dpr]);

  return (
    <section ref={sectionRef} className="relative" style={{ height: '300vh' }}>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-4">

        <div className="mb-8 md:mb-12 text-center relative z-10">
          <div className="mono-label text-[10px] text-muted mb-4">DATA TRANSFORMATION</div>
          <h2
            className="text-[1.5rem] md:text-[2.5rem] lg:text-[3rem] tracking-[-0.03em] leading-tight transition-colors duration-500 bg-cream px-4 py-2"
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
          >
            {currentLabel}
          </h2>
        </div>

        <div className="relative w-full max-w-[800px] h-[320px] md:h-[400px] z-10">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        </div>

        <div className="absolute bottom-8 md:bottom-12 flex flex-col items-center gap-2">
          <span className="mono-label text-[9px] text-muted tracking-widest">SCROLL TO MORPH</span>
          <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-ink/20 to-transparent" />
        </div>
      </div>
    </section>
  );
}
