import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TemasSection from "@/components/TemasSection";
import SchoolsSection from "@/components/SchoolsSection";
import Footer from "@/components/Footer";

export default function App() {
  // Oscuro por defecto (DESIGN.md); la variante clara se activa con la clase `light`.
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("cpt-theme");
    if (saved === "light") setDark(false);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", !dark);
  }, [dark]);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    localStorage.setItem("cpt-theme", next ? "dark" : "light");
  };

  return (
    <div>
      <Header dark={dark} onToggleTheme={toggleTheme} />
      <Hero />
      <main>
        <TemasSection />
        <SchoolsSection dark={dark} />
      </main>
      <Footer />
    </div>
  );
}
