import { Sun, Moon } from "lucide-react";

type Props = {
  dark: boolean;
  onToggle: () => void;
};

export default function ThemeToggle({ dark, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      aria-label="Cambiar tema claro/oscuro"
      title="Cambiar tema"
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white hover:bg-white/10 transition"
    >
      {dark ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}
