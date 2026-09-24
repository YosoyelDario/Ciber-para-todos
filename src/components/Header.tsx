import ThemeToggle from "./ThemeToggle";

type Props = {
  dark: boolean;
  onToggleTheme: () => void;
};

export default function Header({ dark, onToggleTheme }: Props) {
  return (
    <div className="bg-navy border-b border-white/10 px-6 py-4">
      <div className="mx-auto grid max-w-5xl grid-cols-[1fr_auto_1fr] items-center gap-4">
        <ThemeToggle dark={dark} onToggle={onToggleTheme} />

        <div className="flex items-center justify-center gap-3 text-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber text-navy font-display text-lg font-bold">
            🛡
          </div>
          <span className="font-display text-2xl font-bold tracking-tight text-[#F3F1EA]">
            CiberParaTodos
          </span>
        </div>

        {/* Reemplaza este bloque por <img src="/logo-universidad.png" className="h-16 w-16 object-contain" /> */}
        <div className="justify-self-end flex h-16 w-16 items-center justify-center rounded-lg border border-dashed border-white/35 text-center text-[11px] leading-tight text-white/45">
          LOGO
          <br />
          Universidad
        </div>
      </div>
    </div>
  );
}
