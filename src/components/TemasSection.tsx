import { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ArrowUpRight } from "lucide-react";
import { temas } from "@/content/temas";
import SectionHeader from "./SectionHeader";

const pill =
  "inline-flex items-center gap-1.5 rounded-full border border-line/30 px-4 py-2 text-sm text-fg transition hover:bg-glass/10";

export default function TemasSection() {
  const [open, setOpen] = useState("");
  const [selected, setSelected] = useState(temas[0].title);
  const groups = Array.from(new Set(temas.map((t) => t.group)));
  const current = temas.find((t) => t.title === selected)!;
  const Icon = current.icon;

  return (
    <section id="temas" className="mx-auto max-w-[1200px] px-6 py-20">
      <SectionHeader
        title="Temas para conversar con los estudiantes"
        text="Elige un tema: a la izquierda se despliega la explicación y a la derecha queda el resumen rápido."
      />

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_380px]">
        {/* Numbered Accordion Rows */}
        <Accordion.Root
          type="single"
          collapsible
          value={open}
          onValueChange={(v) => { setOpen(v); if (v) setSelected(v); }}
        >
          {groups.map((group) => (
            <div key={group} className="mb-10 last:mb-0">
              <div className="mb-3 text-caption uppercase text-fg2">{group}</div>
              {temas.map((tema, i) =>
                tema.group !== group ? null : (
                  <Accordion.Item key={tema.title} value={tema.title}>
                    <Accordion.Header>
                      <Accordion.Trigger className="group flex w-full items-baseline justify-between gap-6 py-3.5 text-left">
                        <span className="text-[17px] text-fg2 transition group-hover:text-fg group-data-[state=open]:text-fg">
                          {tema.title}
                        </span>
                        <span className="text-sm tabular-nums text-fg2">{String(i + 1).padStart(2, "0")}</span>
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="overflow-hidden data-[state=closed]:animate-acc-up data-[state=open]:animate-acc-down">
                      <div className="max-w-[62ch] pb-6 pr-10 text-fg2">
                        <p>{tema.body}</p>
                        <ul className="mt-4 list-disc space-y-1.5 pl-5">
                          {tema.tips.map((tip) => <li key={tip}>{tip}</li>)}
                        </ul>
                        {tema.example && (
                          <div className="mt-5 rounded-card border border-line/15 bg-glass/[0.07] p-5 text-[15px]">
                            {tema.example}
                          </div>
                        )}
                        <a href={tema.link} target="_blank" rel="noopener noreferrer" className={`${pill} mt-5 lg:hidden`}>
                          Más información <ArrowUpRight size={14} strokeWidth={1.5} />
                        </a>
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                )
              )}
            </div>
          ))}
        </Accordion.Root>

        {/* Panel derecho fijo: vistazo rápido + link */}
        <aside className="hidden lg:block">
          <div key={current.title} className="sticky top-28 animate-fade-up rounded-panel border border-line/15 bg-glass/[0.07] p-8 backdrop-blur-sm">
            <div className="flex h-24 w-24 items-center justify-center rounded-large border border-line/20 bg-glass/[0.08]">
              <Icon size={44} strokeWidth={1.25} />
            </div>
            <div className="mt-6 text-caption uppercase text-fg2">{current.group}</div>
            <h3 className="mt-2 font-geist text-heading-sm font-medium">{current.title}</h3>
            <div className="mt-5 rounded-card border border-line/15 p-5 text-[15px] text-fg2">
              <div className="mb-1.5 text-caption uppercase text-fg">Recuerda</div>
              {current.tips[0]}
            </div>
            <a href={current.link} target="_blank" rel="noopener noreferrer" className={`${pill} mt-6`}>
              Más información <ArrowUpRight size={14} strokeWidth={1.5} />
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
