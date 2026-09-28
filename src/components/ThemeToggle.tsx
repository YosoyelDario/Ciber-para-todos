import { Sun, Moon } from "lucide-react";

type Props = { dark: boolean; onToggle: () => void };

export default function ThemeToggle({ dark, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      aria-label="Cambiar tema claro/oscuro"
      title="Cambiar tema"
      className="flex h-9 w-9 items-center justify-center rounded-full border border-line/30 text-fg/85 transition hover:bg-glass/10"
    >
      {dark ? <Moon size={17} strokeWidth={1.5} /> : <Sun size={17} strokeWidth={1.5} />}
    </button>
  );
}
