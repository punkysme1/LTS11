import { useCallback, useEffect, useRef, useState } from 'react';
import { Maximize, Minimize, RotateCw, ZoomIn, ZoomOut } from 'lucide-react';
import OpenSeadragon from 'openseadragon';
import { iiifInfoUrl } from './iiifImage';

export default function IiifViewer({ imageUrl, label }: { imageUrl?: string; label: string }) {
  const element = useRef<HTMLDivElement>(null);
  const readerElement = useRef<HTMLElement>(null);
  const viewer = useRef<OpenSeadragon.Viewer | null>(null);
  const [ready, setReady] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [error, setError] = useState('');

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
  }, [imageUrl, updateZoom]);

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
  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await readerElement.current?.requestFullscreen();
    } catch { setError('Mode layar penuh tidak didukung browser ini.'); }
  };

  return <section className="reader" ref={readerElement} aria-label="Pembaca manuskrip">
    <div className="reader-toolbar">
      <div className="reader-page-label"><strong>{label}</strong><span>{ready ? `${zoom}%` : 'Memuat gambar…'}</span></div>
      <div className="reader-actions" aria-label="Kontrol pembaca">
        <button type="button" aria-label="Perkecil gambar" title="Perkecil" disabled={!ready} onClick={() => zoomBy(1 / 1.25)}><ZoomOut size={19}/></button>
        <button type="button" aria-label="Perbesar gambar" title="Perbesar" disabled={!ready} onClick={() => zoomBy(1.25)}><ZoomIn size={19}/></button>
        <button type="button" aria-label="Pas ke layar" title="Pas ke layar" disabled={!ready} onClick={() => { viewer.current?.viewport.goHome(true); updateZoom(); }}><span className="fit-icon">Fit</span></button>
        <button type="button" aria-label="Putar gambar 90 derajat" title="Putar 90°" disabled={!ready} onClick={() => viewer.current?.viewport.setRotation(viewer.current.viewport.getRotation() + 90)}><RotateCw size={18}/></button>
        <button type="button" aria-label={fullscreen ? 'Keluar layar penuh' : 'Layar penuh'} title={fullscreen ? 'Keluar layar penuh' : 'Layar penuh'} disabled={!ready} onClick={() => void toggleFullscreen()}>{fullscreen ? <Minimize size={18}/> : <Maximize size={18}/>}</button>
      </div>
    </div>
    <div className="iiif-stage" aria-label={label}>
      {imageUrl ? <div className="iiif-canvas" ref={element} role="img" aria-label={`Viewer halaman ${label}. Gunakan tombol zoom, roda tetikus, atau gestur cubit untuk memperbesar; seret untuk menggeser.`}/> : <div className="reader-empty">Halaman ini belum memiliki gambar.</div>}
      {imageUrl && !ready && !error && <div className="reader-loading" role="status">Memuat halaman…</div>}
      {error && <div className="reader-error" role="alert">{error}</div>}
    </div>
    <p className="reader-help">Gulir atau cubit untuk memperbesar · Seret untuk menggeser · Tekan Esc untuk keluar dari layar penuh</p>
  </section>;
}
