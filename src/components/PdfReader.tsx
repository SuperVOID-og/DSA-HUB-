import { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { 
  ZoomIn, ZoomOut, Minimize, 
  ChevronLeft, ChevronRight, Download,
  Monitor, Maximize2
} from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfReaderProps {
  url: string;
}

export default function PdfReader({ url }: PdfReaderProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  const [fitMode, setFitMode] = useState<'width' | 'page' | 'custom'>('width');
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      if (entries[0] && entries[0].contentRect) {
        setContainerWidth(entries[0].contentRect.width);
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isFullscreen]); // Re-observe when fullscreen changes

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const changePage = (offset: number) => {
    setPageNumber(prev => Math.min(Math.max(1, prev + offset), numPages));
  };

  const changeScale = (offset: number) => {
    setScale(prev => Math.max(0.5, Math.min(3, prev + offset)));
    setFitMode('custom');
  };

  const handlePageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val >= 1 && val <= numPages) {
      setPageNumber(val);
    }
  };

  const toggleFullscreen = () => {
    if (!wrapperRef.current) return;
    
    if (!document.fullscreenElement) {
      wrapperRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div 
      ref={wrapperRef}
      className={`flex flex-col h-full bg-bg-ambient border border-border-strong rounded-2xl overflow-hidden ${
        isFullscreen ? 'fixed inset-0 z-[100] rounded-none border-none' : ''
      }`}
    >
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between p-3 glass-2 border-b border-border-strong gap-4">
        
        {/* Page Controls */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => changePage(-1)}
            disabled={pageNumber <= 1}
            className="p-1.5 rounded-lg hover:bg-surface-3 disabled:opacity-50 text-text-primary transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 text-sm font-mono text-text-primary">
            <input 
              type="number"
              min={1}
              max={numPages || 1}
              value={pageNumber}
              onChange={handlePageInput}
              className="w-12 px-1 text-center bg-surface border border-border-strong rounded focus:border-accent outline-none"
            />
            <span className="text-text-muted">/ {numPages || '-'}</span>
          </div>
          
          <button 
            onClick={() => changePage(1)}
            disabled={pageNumber >= numPages}
            className="p-1.5 rounded-lg hover:bg-surface-3 disabled:opacity-50 text-text-primary transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1 bg-surface rounded-xl p-1 border border-border-subtle">
          <button 
            onClick={() => changeScale(-0.1)}
            className="p-1.5 rounded-lg hover:bg-surface-3 text-text-primary"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono w-12 text-center text-text-muted">
            {Math.round(scale * 100)}%
          </span>
          <button 
            onClick={() => changeScale(0.1)}
            className="p-1.5 rounded-lg hover:bg-surface-3 text-text-primary"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          
          <div className="w-px h-4 bg-border-strong mx-1"></div>
          
          <button 
            onClick={() => setFitMode('width')}
            className={`p-1.5 rounded-lg transition-colors ${fitMode === 'width' ? 'bg-accent/20 text-accent' : 'hover:bg-surface-3 text-text-primary'}`}
            title="Fit Width"
          >
            <Monitor className="w-4 h-4" />
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <a 
            href={url}
            download
            className="p-2 rounded-lg hover:bg-surface-3 text-text-primary transition-colors flex items-center gap-2"
            title="Download PDF"
          >
            <Download className="w-4 h-4" />
            <span className="text-xs font-medium hidden sm:inline">Save</span>
          </a>
          <button 
            onClick={toggleFullscreen}
            className="p-2 rounded-lg hover:bg-surface-3 text-text-primary transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* PDF Viewer Area */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden bg-[#e5e7eb] dark:bg-[#1f2937] custom-scrollbar flex justify-center p-4 relative"
      >
        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex items-center justify-center h-full text-text-muted font-mono text-sm animate-pulse">
              Loading document...
            </div>
          }
          error={
            <div className="flex items-center justify-center h-full text-danger font-mono text-sm">
              Failed to load PDF.
            </div>
          }
          className="flex flex-col items-center"
        >
          <Page 
            pageNumber={pageNumber} 
            width={fitMode === 'width' && containerWidth ? containerWidth - 40 : undefined}
            scale={fitMode === 'custom' ? scale : (fitMode === 'page' ? 1 : undefined)}
            className="shadow-xl"
            renderTextLayer={true}
            renderAnnotationLayer={true}
          />
        </Document>
      </div>
    </div>
  );
}
