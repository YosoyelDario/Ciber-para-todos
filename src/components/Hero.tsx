import { Check, Sparkles } from "lucide-react";
import { colegios } from "@/content/colegios";
import { temas } from "@/content/temas";

const bullets = [
  "Explicaciones simples para básica y media",
  "Ejemplos cercanos y recomendaciones prácticas",
  "Registro de colegios visitados en un mapa",
  "Material listo para conversar en clase",
];

/** Gradient Hero Panel: único lugar con degradado de sección completa. */
export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-6 pb-28 pt-36 text-white"
      style={{ background: "linear-gradient(105deg,#B45A17 0%,#A8483A 32%,#5B3A9E 62%,#2A3FBF 100%)" }}
    >
      {/* Transición hacia el canvas */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-canvas" />

      <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-black/15 px-3.5 py-1.5 text-sm font-medium">
            <Sparkles size={14} strokeWidth={1.5} /> Programa de alfabetización digital
          </div>
          <h1 className="mt-6 max-w-[16ch] font-medium text-display">
            Navegar seguro empieza en la sala de clases
          </h1>
          <ul className="mt-8 space-y-4">
            {bullets.map((b) => (
              <li key={b} className="flex items-center gap-3 text-base">
                <span className="flex h-5 w-5 items-center justify-center rounded-[4px] bg-white text-[#161616]">
                  <Check size={13} strokeWidth={2} />
                </span>
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#temas" className="rounded-full bg-white px-5 py-2.5 text-[15px] text-[#161616] transition hover:bg-white/90">
              Ver los temas
            </a>
            <a href="#colegios" className="rounded-full border border-white/50 px-5 py-2.5 text-[15px] text-white transition hover:bg-white/10">
              Colegios visitados
            </a>
          </div>
        </div>

        <div className="rounded-panel border border-white/25 bg-white/10 p-8 backdrop-blur-sm">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="font-geist text-[48px] font-medium leading-none">{temas.length}</div>
              <div className="mt-2 text-sm text-white/85">temas para conversar</div>
            </div>
            <div>
              <div className="font-geist text-[48px] font-medium leading-none">{colegios.length}</div>
              <div className="mt-2 text-sm text-white/85">colegios visitados</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
