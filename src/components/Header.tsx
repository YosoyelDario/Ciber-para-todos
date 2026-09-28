import { Shield } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

type Props = { dark: boolean; onToggleTheme: () => void };

const ghost =
  "hidden rounded-full border border-line/30 px-3.5 py-1.5 text-sm text-fg/85 transition hover:bg-glass/10 sm:block";

/** Floating Frosted Nav: píldora flotante a 16px del borde. */
export default function Header({ dark, onToggleTheme }: Props) {
  return (
    <header className="fixed inset-x-4 top-4 z-[2000]">
      <nav className="mx-auto grid max-w-[1200px] grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-nav border border-line/20 bg-surface/80 px-3.5 py-2.5 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <ThemeToggle dark={dark} onToggle={onToggleTheme} />
          <a href="#temas" className={ghost}>Temas</a>
          <a href="#colegios" className={ghost}>Colegios</a>
        </div>

        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cta text-cta-fg">
            <Shield size={16} strokeWidth={1.75} />
          </span>
          <span className="text-lg font-medium tracking-tight sm:text-xl">CiberParaTodos</span>
        </a>

        {/* Logo universidad: reemplaza por <img src="/logo-universidad.png" className="h-12 w-12 object-contain" /> */}
        <div className="flex h-12 w-12 items-center justify-center justify-self-end rounded-ui border border-dashed border-line/40 text-center text-[10px] leading-tight text-fg2">
          LOGO<br />U.
        </div>
      </nav>
    </header>
  );
}
