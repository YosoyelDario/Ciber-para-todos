import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TemasAccordion from "@/components/TemasAccordion";
import SchoolList from "@/components/SchoolList";
import SchoolMap from "@/components/SchoolMap";

export default function App() {
  const [dark, setDark] = useState(false);
  const [activeSchool, setActiveSchool] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("cpt-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = saved ? saved === "dark" : prefersDark;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("cpt-theme", next ? "dark" : "light");
  };

  return (
    <div>
      <Header dark={dark} onToggleTheme={toggleTheme} />

      <div
        className="relative overflow-hidden px-6 py-14 text-[#F3F1EA]"
        style={{ background: "linear-gradient(165deg, #101B2D, #182640)" }}
      >
        <div className="relative mx-auto max-w-3xl">
          <div className="font-semibold text-amber">Programa de alfabetización digital</div>
          <h1 className="mt-2.5 max-w-[14ch] font-display text-4xl font-bold leading-tight">
            Navegar seguro empieza en la sala de clases
          </h1>
          <p className="mt-3.5 max-w-[56ch] text-[#C9C5B8]">
            Material de divulgación sobre ciberseguridad para estudiantes de educación básica y
            media, y registro de los colegios visitados por el equipo.
          </p>
        </div>
      </div>

      <main className="mx-auto max-w-5xl px-6">
        <section className="py-13">
          <div className="mb-7 max-w-[60ch]">
            <h2 className="mb-2 text-2xl font-semibold">Temas para conversar con los estudiantes</h2>
            <p className="text-ink-soft">
              Cada tarjeta se despliega con una explicación simple, un ejemplo cercano y una
              recomendación práctica.
            </p>
          </div>
          <TemasAccordion />
        </section>

        <section className="py-13">
          <div className="mb-7 max-w-[60ch]">
            <h2 className="mb-2 text-2xl font-semibold">Colegios visitados</h2>
            <p className="text-ink-soft">
              Selecciona un colegio en la lista para ubicarlo en el mapa, o haz clic en un
              marcador para encontrarlo en la lista.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-line dark:border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-[340px_1fr]">
              <SchoolList activeIndex={activeSchool} onSelect={setActiveSchool} />
              <SchoolMap dark={dark} activeIndex={activeSchool} onMarkerClick={setActiveSchool} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
