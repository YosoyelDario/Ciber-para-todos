import { colegios } from "@/content/colegios";
import { cn } from "@/lib/utils";

type Props = {
  activeIndex: number | null;
  onSelect: (index: number) => void;
};

export default function SchoolList({ activeIndex, onSelect }: Props) {
  return (
    <div className="flex max-h-[560px] flex-col border-r border-line dark:border-white/10 md:max-h-none">
      <div className="border-b border-line px-5 pb-4 pt-5.5 dark:border-white/10">
        <div className="font-display text-4xl font-bold leading-none text-teal">
          {colegios.length}
        </div>
        <div className="mt-1 text-sm text-ink-soft">colegios visitados este año</div>
      </div>

      <ul className="flex-1 space-y-1 overflow-y-auto p-2">
        {colegios.map((school, i) => (
          <li
            key={school.name}
            id={`school-${i}`}
            onClick={() => onSelect(i)}
            className={cn(
              "cursor-pointer rounded-lg px-3.5 py-3 hover:bg-teal/10",
              activeIndex === i && "bg-amber/15 shadow-[inset_3px_0_0_0_theme(colors.amber.DEFAULT)]"
            )}
          >
            <div className="text-[0.98rem] font-semibold">{school.name}</div>
            <div className="text-sm text-ink-soft">{school.place}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
