import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, ChevronLeft, ChevronRight, Maximize, Minimize, RotateCw, ZoomIn, ZoomOut } from 'lucide-react';
import OpenSeadragon from 'openseadragon';
import { iiifInfoUrl } from './iiifImage';

export default function IiifViewer({ imageUrl, label, currentPage = 1, totalPages = 1, onNavigatePage, onJumpPage, jumpPage, setJumpPage }: { imageUrl?: string; label: string; currentPage?: number; totalPages?: number; onNavigatePage?: (index: number) => void; onJumpPage?: (index: number) => void; jumpPage?: string; setJumpPage?: (value: string) => void }) {
  const element = useRef<HTMLDivElement>(null);
  const readerElement = useRef<HTMLElement>(null);
  const viewer = useRef<OpenSeadragon.Viewer | null>(null);
  const [ready, setReady] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);
  const [inkContrast,setInkContrast]=useState(false);
  const [inverted,setInverted]=useState(false);

  const updateZoom = useCallback(() => {
    const instance = viewer.current;
    if (!instance) return;
    const homeZoom = instance.viewport.getHomeZoom();
    if (homeZoom > 0) setZoom(Math.round(instance.viewport.getZoom(true) / homeZoom * 100));
  }, []);

  useEffect(() => {
    if (!element.current || !imageUrl) return;
    setReady(false); setError('');
    const infoUrl = iiifInfoUrl(imageUrl);
    const instance = OpenSeadragon({
      element: element.current,
      tileSources: infoUrl || { type: 'image', url: imageUrl },
      // OSD 6 requires each viewer to declare the renderer used by its tiled images.
      drawer: ['webgl', 'canvas', 'html'],
      showNavigationControl: false,
      showNavigator: false,
      mouseNavEnabled: true,
      minZoomImageRatio: 0.5,
      maxZoomPixelRatio: 4,
      visibilityRatio: 0.65,
      constrainDuringPan: true,
      gestureSettingsMouse: { clickToZoom: false, dblClickToZoom: true, dragToPan: true, scrollToZoom: true },
      gestureSettingsTouch: { clickToZoom: false, dblClickToZoom: false, dragToPan: true, pinchToZoom: true },
      imageLoaderLimit: 4,
      maxImageCacheCount: 12,
    });
    viewer.current = instance;
    instance.addHandler('open', () => { setReady(true); updateZoom(); });
    instance.addHandler('open-failed', () => { setError('Gambar halaman gagal dimuat. Periksa koneksi sumber IIIF lalu coba lagi.'); setReady(false); });
    instance.addHandler('animation-finish', updateZoom);
    return () => { instance.destroy(); viewer.current = null; setReady(false); setFullscreen(false); };
  }, [imageUrl, updateZoom, retry]);

  useEffect(() => {
    const syncFullscreen = () => setFullscreen(document.fullscreenElement === readerElement.current);
    document.addEventListener('fullscreenchange', syncFullscreen);
    return () => document.removeEventListener('fullscreenchange', syncFullscreen);
  }, []);

  const zoomBy = (factor: number) => {
    const instance = viewer.current;
    if (!instance) return;
    instance.viewport.zoomBy(factor);
    instance.viewport.applyConstraints();
    const homeZoom = instance.viewport.getHomeZoom();
    if (homeZoom > 0) setZoom(Math.round(instance.viewport.getZoom() / homeZoom * 100));
  };
  const panBy = (x: number, y: number) => {
    const viewport = viewer.current?.viewport;
    if (!viewport) return;
    viewport.panBy(new OpenSeadragon.Point(x, y));
    viewport.applyConstraints();
  };
  const handlePanKey = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const directions: Record<string, [number, number]> = { ArrowLeft: [-0.08, 0], ArrowRight: [0.08, 0], ArrowUp: [0, -0.08], ArrowDown: [0, 0.08] };
    const direction = directions[event.key];
    if (!direction) return;
    event.preventDefault();
    panBy(...direction);
  };
  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await readerElement.current?.requestFullscreen();
    } catch { setError('Mode layar penuh tidak didukung browser ini.'); }
  };

  return <section className="reader" ref={readerElement} aria-label="Pembaca manuskrip">
    <div className="reader-toolbar">
      <div className="reader-page-label"><strong>{label}</strong><span>{ready ? `${zoom}%` : 'Memuat gambar…'}</span></div>
      {totalPages > 0 && <div className="reader-page-navigation" aria-label="Navigasi halaman">
        <button type="button" aria-label="Halaman sebelumnya" disabled={currentPage <= 1} onClick={() => onNavigatePage?.(currentPage - 2)}><ChevronLeft size={18}/><span>Sebelumnya</span></button>
        <span aria-live="polite">{currentPage} / {totalPages}</span>
        <button type="button" aria-label="Halaman berikutnya" disabled={currentPage >= totalPages} onClick={() => onNavigatePage?.(currentPage)}><span>Berikutnya</span><ChevronRight size={18}/></button>
        <form onSubmit={event => { event.preventDefault(); const value = Number(jumpPage); if (value >= 1 && value <= totalPages) onJumpPage?.(value - 1); }}>
          <label htmlFor="reader-page-jump">Lompat ke foto</label><input id="reader-page-jump" type="number" min={1} max={totalPages} value={jumpPage || ''} onChange={event => setJumpPage?.(event.target.value)} placeholder={String(currentPage)}/><button type="submit">Buka</button>
        </form>
      </div>}
    <div className="reader-image-options" role="group" aria-label="Tampilan tinta">
      <button type="button" aria-pressed={inkContrast} onClick={()=>setInkContrast(v=>!v)}>Kontras Tinta</button>
      <button type="button" aria-pressed={inverted} onClick={()=>setInverted(v=>!v)}>Inversi</button>
      <button type="button" disabled={!inkContrast && !inverted} onClick={()=>{setInkContrast(false);setInverted(false);}}>Gambar Asli</button>
    </div>
      <div className="reader-actions" aria-label="Kontrol pembaca">
        <button type="button" aria-label="Perkecil gambar" title="Perkecil" disabled={!ready} onClick={() => zoomBy(1 / 1.25)}><ZoomOut size={19}/></button>
        <button type="button" aria-label="Perbesar gambar" title="Perbesar" disabled={!ready} onClick={() => zoomBy(1.25)}><ZoomIn size={19}/></button>
        <button type="button" aria-label="Pas ke layar" title="Pas ke layar" disabled={!ready} onClick={() => { viewer.current?.viewport.goHome(true); updateZoom(); }}><span className="fit-icon">Fit</span></button>
        <button type="button" aria-label="Putar gambar 90 derajat" title="Putar 90°" disabled={!ready} onClick={() => viewer.current?.viewport.setRotation(viewer.current.viewport.getRotation() + 90)}><RotateCw size={18}/></button>
        <button type="button" aria-label={fullscreen ? 'Keluar layar penuh' : 'Layar penuh'} title={fullscreen ? 'Keluar layar penuh' : 'Layar penuh'} disabled={!ready} onClick={() => void toggleFullscreen()}>{fullscreen ? <Minimize size={18}/> : <Maximize size={18}/>}</button>
      </div>
    </div>
    <div className="iiif-stage" aria-label={label}>
      {imageUrl ? <div className="iiif-canvas" style={{filter:`${inkContrast ? 'grayscale(1) contrast(1.7)' : 'contrast(1)'} ${inverted ? 'invert(1)' : ''}`}} ref={element} role="img" tabIndex={0} onKeyDown={handlePanKey} aria-label={`Viewer halaman ${label}. Gunakan tombol zoom atau tombol pan untuk memperbesar dan menggeser. Panah pada papan ketik juga dapat menggeser gambar.`}/> : <div className="reader-empty">Halaman ini belum memiliki gambar.</div>}
      {imageUrl && <div className="reader-pan-controls" role="group" aria-label="Geser gambar tanpa menyeret"><button type="button" aria-label="Geser ke atas" disabled={!ready} onClick={() => panBy(0, -0.08)}><ArrowUp size={18}/></button><button type="button" aria-label="Geser ke kiri" disabled={!ready} onClick={() => panBy(-0.08, 0)}><ArrowLeft size={18}/></button><button type="button" aria-label="Geser ke bawah" disabled={!ready} onClick={() => panBy(0, 0.08)}><ArrowDown size={18}/></button><button type="button" aria-label="Geser ke kanan" disabled={!ready} onClick={() => panBy(0.08, 0)}><ArrowRight size={18}/></button></div>}
      {imageUrl && !ready && !error && <div className="reader-loading" role="status">Memuat halaman…</div>}
      {error && <div className="reader-error" role="alert">{error}<button type="button" onClick={() => { setError(''); setReady(false); setRetry(value => value + 1); }}>Coba lagi</button></div>}
    </div>
    <p className="reader-help">Gulir atau cubit untuk memperbesar · Seret, tombol pan, atau panah papan ketik untuk menggeser · Tekan Esc untuk keluar dari layar penuh</p>
  </section>;
}
