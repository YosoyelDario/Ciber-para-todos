import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import type { Foto } from "@/content/colegios";

const VISIBLE = 5; // miniaturas a la vista antes de que la tira empiece a desplazarse

/** Foto de portada (primer plano del colegio). */
export function SchoolCover({ photo }: { photo: Foto }) {
  return (
    <img
      src={photo.src}
      alt={photo.alt}
      loading="lazy"
      className="mt-3 aspect-[16/9] w-full rounded-ui border border-line/20 object-cover"
    />
  );
}

/** Álbum a pantalla completa. Va en un portal para que no lo recorte la tarjeta del mapa. */
function Lightbox({ photos, start, title, onClose }: { photos: Foto[]; start: number; title: string; onClose: () => void }) {
  const [i, setI] = useState(start);
  const closeRef = useRef<HTMLButtonElement>(null);
  const prev = () => setI((n) => (n - 1 + photos.length) % photos.length);
  const next = () => setI((n) => (n + 1) % photos.length);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    // Captura: Escape cierra solo el álbum, no la tarjeta que está debajo
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.stopPropagation(); onClose(); }
      else if (e.key === "ArrowLeft") { e.stopPropagation(); setI((n) => (n - 1 + photos.length) % photos.length); }
      else if (e.key === "ArrowRight") { e.stopPropagation(); setI((n) => (n + 1) % photos.length); }
    };
    window.addEventListener("keydown", onKey, true);
    return () => { window.removeEventListener("keydown", onKey, true); opener?.focus(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const btn = "flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition hover:bg-white/20";

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Álbum de fotos: ${title}`}
      onClick={onClose}
      className="fixed inset-0 z-[3000] flex flex-col items-center justify-center gap-4 bg-black/85 p-4"
    >
      <button ref={closeRef} onClick={onClose} aria-label="Cerrar álbum" title="Cerrar (Esc)" className={`${btn} absolute right-4 top-4`}>
        <X size={18} strokeWidth={1.5} aria-hidden="true" />
      </button>

      <figure onClick={(e) => e.stopPropagation()} className="w-full max-w-[60rem]">
        <img key={photos[i].src} src={photos[i].src} alt={photos[i].alt} className="mx-auto max-h-[72vh] w-auto max-w-full animate-fade-up rounded-card object-contain" />
        <figcaption className="mt-3 flex items-start justify-between gap-4 text-sm text-white/85">
          <span>{photos[i].alt}</span>
          <span className="shrink-0 tabular-nums" aria-live="polite">{i + 1} / {photos.length}</span>
        </figcaption>
      </figure>

      {photos.length > 1 && (
        <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
          <button onClick={prev} aria-label="Foto anterior" className={btn}><ChevronLeft size={18} strokeWidth={1.5} aria-hidden="true" /></button>
          <button onClick={next} aria-label="Foto siguiente" className={btn}><ChevronRight size={18} strokeWidth={1.5} aria-hidden="true" /></button>
        </div>
      )}
    </div>,
    document.body
  );
}

/**
 * Tira de miniaturas que se desplaza hacia la izquierda (si hay más de 5), con botón
 * "Ver álbum completo". Se pausa al pasar el mouse o enfocar, y con "reducir movimiento"
 * deja de moverse y se puede desplazar a mano.
 */
export function SchoolAlbum({ photos, schoolName }: { photos: Foto[]; schoolName: string }) {
  const [openAt, setOpenAt] = useState<number | null>(null);
  if (photos.length === 0) return null;

  const moving = photos.length > VISIBLE;
  const thumb = "h-12 w-12 shrink-0 overflow-hidden rounded-ui border border-line/20";

  const copy = (hidden: boolean) => (
    <div className="flex gap-2 pr-2" aria-hidden={hidden || undefined}>
      {photos.map((p, idx) => (
        <button
          key={p.src + idx}
          onClick={() => setOpenAt(idx)}
          tabIndex={hidden ? -1 : 0}
          aria-label={`Abrir foto ${idx + 1} de ${photos.length}: ${p.alt}`}
          className={`${thumb} transition hover:opacity-80`}
        >
          <img src={p.src} alt="" loading="lazy" className="h-full w-full object-cover" />
        </button>
      ))}
    </div>
  );

  return (
    <div className="mt-3">
      <div
        className="cpt-marquee overflow-hidden"
        style={moving ? { maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)" } : undefined}
      >
        <div className={`flex w-max ${moving ? "cpt-marquee-track" : ""}`} style={moving ? ({ "--marquee-dur": `${photos.length * 3}s` } as React.CSSProperties) : undefined}>
          {copy(false)}
          {moving && copy(true)}
        </div>
      </div>

      <button
        onClick={() => setOpenAt(0)}
        className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-line/30 px-3.5 py-1.5 text-sm text-fg transition hover:bg-glass/10"
      >
        <Images size={14} strokeWidth={1.5} aria-hidden="true" /> Ver álbum completo ({photos.length})
      </button>

      {openAt !== null && <Lightbox photos={photos} start={openAt} title={schoolName} onClose={() => setOpenAt(null)} />}
    </div>
  );
}
