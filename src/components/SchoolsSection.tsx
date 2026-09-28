import { useState } from "react";
import { MapPin, ArrowUpRight, X } from "lucide-react";
import { colegios } from "@/content/colegios";
import SectionHeader from "./SectionHeader";
import SchoolList from "./SchoolList";
import LeafletMap from "./LeafletMap";
import GoogleMapView from "./GoogleMapView";

type Provider = "leaflet" | "google";
const PROVIDERS: { id: Provider; label: string }[] = [
  { id: "leaflet", label: "Leaflet" },
  { id: "google", label: "Google Maps" },
];

export default function SchoolsSection({ dark }: { dark: boolean }) {
  const [active, setActive] = useState<number | null>(null);
  const [provider, setProvider] = useState<Provider>(() => {
    try { return localStorage.getItem("cpt-map") === "google" ? "google" : "leaflet"; } catch { return "leaflet"; }
  });
  const choose = (p: Provider) => {
    setProvider(p);
    try { localStorage.setItem("cpt-map", p); } catch { /* sin almacenamiento */ }
  };
  const school = active === null ? null : colegios[active];

  return (
    <section id="colegios" className="mx-auto max-w-[1200px] px-6 pt-20">
      <SectionHeader
        title="Colegios visitados"
        text="Selecciona un colegio en la lista para ubicarlo en el mapa, o toca un marcador para encontrarlo en la lista."
      />

      <div className="mt-12 grid items-end gap-10 lg:grid-cols-[340px_1fr]">
        <SchoolList activeIndex={active} onSelect={setActive} />

        {/* Device Mockup Frame: esquinas superiores 40px, base pegada al borde de la sección */}
        <div className="relative overflow-hidden rounded-t-large border border-b-0 border-line/20 bg-surface">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line/15 px-5 py-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line/25 px-3 py-1 text-caption">
                <MapPin size={13} strokeWidth={1.5} /> {colegios.length} colegios
              </span>
              {school && (
                <button onClick={() => setActive(null)} className="rounded-full border border-line/25 px-3 py-1 text-caption text-fg2 transition hover:bg-glass/10">
                  Ver todo
                </button>
              )}
            </div>
            <div role="group" aria-label="Proveedor de mapa" className="flex rounded-full border border-line/25 p-0.5 text-caption">
              {PROVIDERS.map((p) => (
                <button
                  key={p.id}
                  aria-pressed={provider === p.id}
                  onClick={() => choose(p.id)}
                  className={`rounded-full px-3 py-1 transition ${provider === p.id ? "bg-cta text-cta-fg" : "text-fg2 hover:text-fg"}`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {provider === "leaflet" ? (
            <LeafletMap key="leaflet" dark={dark} activeIndex={active} onMarkerClick={setActive} />
          ) : (
            <GoogleMapView key="google" dark={dark} activeIndex={active} onMarkerClick={setActive} />
          )}

          {/* Tarjeta de vidrio con el detalle, sube sobre el mapa */}
          {school && (
            <div key={active} className="absolute bottom-4 left-4 right-4 z-[1100] animate-fade-up rounded-card border border-line/20 bg-surface/85 p-5 backdrop-blur-sm md:right-auto md:w-[340px]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-caption uppercase text-fg2">Colegio visitado</div>
                  <h3 className="mt-1 font-geist text-heading-sm font-medium">{school.name}</h3>
                </div>
                <button onClick={() => setActive(null)} aria-label="Cerrar" className="rounded-full border border-line/25 p-1.5 text-fg2 transition hover:bg-glass/10">
                  <X size={14} strokeWidth={1.5} />
                </button>
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-fg2">
                <MapPin size={14} strokeWidth={1.5} /> {school.place}
              </div>
              <div className="mt-1 text-caption tabular-nums text-fg2">
                {school.lat.toFixed(4)}, {school.lng.toFixed(4)}
              </div>
              <a
                href={`https://www.openstreetmap.org/?mlat=${school.lat}&mlon=${school.lng}#map=14/${school.lat}/${school.lng}`}
                target="_blank" rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-cta px-4 py-2 text-sm text-cta-fg transition hover:opacity-90"
              >
                Abrir en OpenStreetMap <ArrowUpRight size={14} strokeWidth={1.5} />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
