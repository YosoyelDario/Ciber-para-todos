import { Sparkles } from "lucide-react";
import { colegios } from "@/content/colegios";
import { temas } from "@/content/temas";
import HeroTopicPreview from "./HeroTopicPreview";

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
            <Sparkles aria-hidden="true" size={14} strokeWidth={1.5} /> Programa de alfabetización digital
          </div>

          {/* Título más ancho (menos líneas) para dejarle más aire al resto */}
          <h1 className="mt-6 max-w-[20ch] font-medium text-display">
            Navegar seguro empieza en la sala de clases
          </h1>

          <div className="mt-8 flex gap-10">
            <div>
              <div className="font-geist text-[2.5rem] font-medium leading-none">{temas.length}</div>
              <div className="mt-2 text-sm text-white/85">temas para conversar</div>
            </div>
            <div>
              <div className="font-geist text-[2.5rem] font-medium leading-none">{colegios.length}</div>
              <div className="mt-2 text-sm text-white/85">colegios visitados</div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#temas" className="rounded-full bg-white px-5 py-2.5 text-[0.9375rem] text-[#161616] transition hover:bg-white/90">
              Ver los temas
            </a>
            <a href="#colegios" className="rounded-full border border-white/50 px-5 py-2.5 text-[0.9375rem] text-white transition hover:bg-white/10">
              Ver los colegios
            </a>
          </div>
        </div>

        <HeroTopicPreview />
      </div>
    </section>
  );
}
