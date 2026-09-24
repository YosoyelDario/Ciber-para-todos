import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { temas } from "@/content/temas";
import { cn } from "@/lib/utils";

export default function TemasAccordion() {
  const groups = Array.from(new Set(temas.map((t) => t.group)));

  return (
    <div className="border-t border-line dark:border-white/10">
      {groups.map((group) => {
        const items = temas.filter((t) => t.group === group);
        return (
          <div key={group}>
            <div className="mt-9 mb-1.5 flex items-center gap-2.5 font-display text-sm font-semibold uppercase tracking-wide text-teal">
              {group}
              <span className="h-px flex-1 bg-line dark:bg-white/10" />
            </div>

            <Accordion.Root type="single" collapsible className="w-full">
              {items.map((tema, i) => (
                <Accordion.Item
                  key={tema.title}
                  value={tema.title}
                  className="border-b border-line dark:border-white/10"
                >
                  <Accordion.Header>
                    <Accordion.Trigger
                      className={cn(
                        "group flex w-full items-center gap-4 py-5 text-left font-display text-lg font-semibold"
                      )}
                    >
                      <span className="flex h-8.5 w-8.5 min-w-[34px] items-center justify-center rounded-full bg-amber/20 text-sm text-amber-ink dark:text-amber">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {tema.title}
                      <Plus
                        size={18}
                        className="ml-auto shrink-0 text-ink-soft transition-transform group-data-[state=open]:rotate-45"
                      />
                    </Accordion.Trigger>
                  </Accordion.Header>

                  <Accordion.Content className="grid grid-cols-1 gap-7 py-1 pb-6 pl-[66px] pr-1 text-ink-soft sm:grid-cols-[1fr_200px]">
                    <div className="max-w-[64ch]">
                      <p>{tema.body}</p>
                      <h4 className="mb-1.5 mt-4 text-sm font-semibold text-ink dark:text-[#EDEAE1]">
                        Recomendaciones
                      </h4>
                      <ul className="list-disc space-y-1 pl-4.5">
                        {tema.tips.map((tip) => (
                          <li key={tip}>{tip}</li>
                        ))}
                      </ul>
                      {tema.example && (
                        <div className="mt-3 rounded-lg border border-line bg-paper-2 p-3.5 text-sm dark:border-white/10 dark:bg-[#181D28]">
                          {tema.example}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2.5">
                      {/* Reemplaza por <img src={tema.image} className="h-[140px] w-full rounded-lg object-cover" /> */}
                      <div className="flex h-[140px] items-center justify-center rounded-lg border border-line bg-amber/10 text-4xl dark:border-white/10">
                        {tema.icon}
                      </div>
                      <a
                        href={tema.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-teal hover:underline"
                      >
                        Más información →
                      </a>
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </div>
        );
      })}
    </div>
  );
}
