import React, { useEffect, useRef, useState } from 'react';
import OpenSeadragon from 'openseadragon';
import { Maximize2, Minimize2, ZoomIn, ZoomOut, RotateCw, ChevronLeft, ChevronRight, Info, BookOpen, Home, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface ManuscriptViewerProps {
  id: string;
  title?: string;
  tileSources: string | string[];
}

const ManuscriptViewer: React.FC<ManuscriptViewerProps> = ({ id, title, tileSources }) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const viewerInstance = useRef<OpenSeadragon.Viewer | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const sources = React.useMemo(() => {
    const raw = Array.isArray(tileSources) ? tileSources : [tileSources];
    return raw.filter((s): s is string => typeof s === 'string' && !!s && s.trim().length > 0);
  }, [Array.isArray(tileSources) ? tileSources.join(',') : tileSources]);

  useEffect(() => {
    if (!viewerRef.current || sources.length === 0) return;

    setTotalPages(sources.length);
    setLoadError(null);

    let osd: OpenSeadragon.Viewer | null = null;

    try {
      osd = OpenSeadragon({
        element: viewerRef.current,
        prefixUrl: 'https://cdnjs.cloudflare.com/ajax/libs/openseadragon/4.1.0/images/',
        tileSources: sources.map(url => ({
          type: 'image',
          url: url,
          buildPyramid: false,
          crossOriginPolicy: 'Anonymous'
        })) as any,
        sequenceMode: true,
        showNavigationControl: false,
        mouseNavEnabled: true,
        showRotationControl: true,
        gestureSettingsMouse: {
          clickToZoom: true,
          dblClickToZoom: true,
          pinchToZoom: true,
          scrollToZoom: true,
        },
        imageLoaderLimit: 1,
        maxImageCacheCount: 10,
        compositeOperation: 'source-over',
        useCanvas: true,
      });

      viewerInstance.current = osd;
      setIsReady(true);

      osd.addHandler('full-screen', (e: any) => {
        setIsFullscreen(e.fullScreen);
      });

      osd.addHandler('full-page', (e: any) => {
        setIsFullscreen(e.fullPage);
      });

      osd.addHandler('page', (e: any) => {
        setCurrentPage(e.page);
      });

      osd.addHandler('open-failed', () => {
        setLoadError('Gagal memuat gambar. Pastikan link Google Drive sudah diatur ke "Siapa saja yang memiliki link dapat melihat".');
      });

    } catch (err) {
      console.error('Failed to initialize OpenSeadragon:', err);
      setLoadError('Gagal menginisialisasi penampil naskah.');
    }

    return () => {
      if (viewerInstance.current) {
        viewerInstance.current.destroy();
        viewerInstance.current = null;
        setIsReady(false);
      }
    };
  }, [id, sources]);

  const handleZoomIn = () => viewerInstance.current?.viewport.zoomBy(1.2);
  const handleZoomOut = () => viewerInstance.current?.viewport.zoomBy(0.8);
  const handleReset = () => viewerInstance.current?.viewport.goHome();
  const handleRotate = () => viewerInstance.current?.viewport.setRotation(viewerInstance.current.viewport.getRotation() + 90);
  const handleFullscreen = () => viewerInstance.current?.setFullPage(!isFullscreen);
  
  const goToNextPage = () => {
    if (viewerInstance.current && currentPage < totalPages - 1) {
      viewerInstance.current.goToPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (viewerInstance.current && currentPage > 0) {
      viewerInstance.current.goToPage(currentPage - 1);
    }
  };

  // Fallback if no images found or is a folder
  const isFolder = sources.some(s => typeof s === 'string' && s.includes('/folders/'));
  if (isFolder || loadError) {
    return (
      <div className="w-full h-full bg-black/90 flex flex-col items-center justify-center text-white p-8 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
          <Info size={40} className="text-secondary" />
        </div>
        <div className="max-w-md space-y-2">
          <h3 className="text-xl font-serif italic text-secondary">{loadError ? 'Gagal Memuat' : 'Mode Antarmuka Folder'}</h3>
          <p className="text-sm opacity-60">
            {loadError || 'Konten ini berupa folder Google Drive. Untuk pengalaman navigasi "OpenSeadragon" (zoom tinggi per halaman), silakan klik salah satu gambar di daftar folder atau gunakan file PDF di masa mendatang.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-black group/osd">
      <div ref={viewerRef} className="w-full h-full" />
      
      {/* Controls Overlay */}
      <div className={cn(
        "absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-[10002] transition-all duration-300",
        isFullscreen ? "opacity-100" : "opacity-0 group-hover/osd:opacity-100"
      )}>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center gap-4 px-4 py-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full text-white text-[10px] font-bold tracking-widest uppercase shadow-2xl">
            <button 
              onClick={goToPrevPage} 
              disabled={currentPage === 0}
              className="disabled:opacity-20 hover:text-secondary transition-colors p-1"
            >
              <ChevronLeft size={16} />
            </button>
            <span>Hal {currentPage + 1} / {totalPages}</span>
            <button 
              onClick={goToNextPage} 
              disabled={currentPage === totalPages - 1}
              className="disabled:opacity-20 hover:text-secondary transition-colors p-1"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Tools */}
        <div className="flex items-center gap-2 p-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
          <button onClick={handleReset} title="Reset View" className="p-2 hover:bg-white/20 rounded-xl text-white transition-colors">
            <Home size={18} />
          </button>
          <div className="w-px h-4 bg-white/10 mx-1" />
          <button onClick={handleZoomIn} title="Zoom In" className="p-2 hover:bg-white/20 rounded-xl text-white transition-colors">
            <ZoomIn size={18} />
          </button>
          <button onClick={handleZoomOut} title="Zoom Out" className="p-2 hover:bg-white/20 rounded-xl text-white transition-colors">
            <ZoomOut size={18} />
          </button>
          <button onClick={handleRotate} title="Rotate" className="p-2 hover:bg-white/20 rounded-xl text-white transition-colors">
            <RotateCw size={18} />
          </button>
          <button onClick={handleFullscreen} title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"} className="p-2 hover:bg-white/20 rounded-xl text-white transition-colors">
            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>
      </div>

      {/* Exit Fullscreen Button (Top Right) */}
      {isFullscreen && (
        <div className="fixed top-0 left-0 right-0 p-6 flex flex-col md:flex-row items-start justify-between z-[2147483647] pointer-events-none gap-4">
          <div className="flex flex-col gap-1 px-5 py-3 bg-black/90 backdrop-blur-3xl border border-white/20 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] pointer-events-auto border-l-4 border-l-secondary">
            <span className="text-[10px] text-secondary font-bold tracking-[0.2em] uppercase">Sedang Membaca</span>
            <h2 className="text-white text-lg font-serif italic truncate max-w-[250px] md:max-w-md">{title || 'Naskah Digital'}</h2>
          </div>
          
          <button 
            onClick={handleFullscreen}
            className="pointer-events-auto p-4 bg-red-600 border border-white/20 rounded-full text-white hover:bg-red-500 transition-all shadow-2xl flex items-center gap-3 group/exit scale-110 md:scale-100"
          >
            <span className="text-[10px] font-bold tracking-widest uppercase pl-2">Keluar Layar Penuh</span>
            <X size={28} className="group-hover/exit:rotate-90 transition-transform duration-300" />
          </button>
        </div>
      )}
      
      {/* Pages Overlay Top */}
      {totalPages > 1 && (
        <div className={cn(
          "absolute top-6 left-6 z-[10001] pointer-events-none transition-opacity duration-300",
          isFullscreen ? "opacity-0" : "opacity-100" // Hide small page counter in favor of large title in fullscreen
        )}>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-lg text-white border border-white/5">
            <BookOpen size={14} className="text-secondary" />
            <span className="text-[10px] font-bold tracking-tighter uppercase">{totalPages} Halaman Terdeteksi</span>
          </div>
        </div>
      )}

      {/* Watermark Overlay (OSD Layer) */}
      <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center opacity-[0.03]">
        <div className="text-white font-bold text-4xl rotate-[-25deg] uppercase whitespace-nowrap">
          PERPUSTAKAAN SAMPURNAN
        </div>
      </div>
    </div>
  );
};

export default ManuscriptViewer;
