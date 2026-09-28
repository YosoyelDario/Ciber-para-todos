import { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { temas } from "@/content/temas";
import SectionHeader from "./SectionHeader";
import { MoreLink, TemaCard, TemaFigure } from "./TemaPreview";

export default function TemasSection() {
  const [open, setOpen] = useState("");
  const [selected, setSelected] = useState(temas[0].title);
  const groups = Array.from(new Set(temas.map((t) => t.group)));
  const current = temas.find((t) => t.title === selected)!;
  const openTema = temas.find((t) => t.title === open); // undefined si no hay ninguno abierto

  return (
    <section id="temas" aria-labelledby="temas-titulo" className="mx-auto max-w-[1200px] px-6 py-20">
      <SectionHeader
        id="temas-titulo"
        title="Temas para conversar con los estudiantes"
        text="Elige un tema para ver la explicación, una imagen y un ejemplo cercano."
      />

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_380px]">
        <Accordion.Root
          type="single"
          collapsible
          value={open}
          onValueChange={(v) => { setOpen(v); if (v) setSelected(v); }}
        >
          {groups.map((group, gi) => (
            <div key={group} role="group" aria-labelledby={`grupo-${gi}`} className="mb-10 last:mb-0">
              <div id={`grupo-${gi}`} className="mb-3 text-caption uppercase text-fg2">{group}</div>
              {temas.map((tema, i) =>
                tema.group !== group ? null : (
                  <Accordion.Item key={tema.title} value={tema.title}>
                    <Accordion.Header>
                      <Accordion.Trigger className="group flex w-full items-baseline justify-between gap-6 py-3.5 text-left">
                        <span className="text-[1.0625rem] text-fg2 transition group-hover:text-fg group-data-[state=open]:text-fg">
                          {tema.title}
                        </span>
                        <span aria-hidden="true" className="text-sm tabular-nums text-fg2">{String(i + 1).padStart(2, "0")}</span>
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="overflow-hidden data-[state=closed]:animate-acc-up data-[state=open]:animate-acc-down">
                      <div className="max-w-[62ch] pb-6 text-fg2 lg:pr-10">
                        <p>{tema.body}</p>
                        <ul className="mt-4 list-disc space-y-1.5 pl-5">
                          {tema.tips.map((tip) => <li key={tip}>{tip}</li>)}
                        </ul>

                        {/* Móvil y tablet: imagen con el ejemplo como pie, debajo de la info */}
                        <div className="mt-5 lg:hidden">
                          <TemaFigure tema={tema} variant="inline" />
                        </div>

                        {/* Donde antes estaba el ejemplo */}
                        <MoreLink tema={tema} className="mt-5" />
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                )
              )}
            </div>
          ))}
        </Accordion.Root>

        {/* Escritorio: con un tema abierto → imagen + ejemplo como pie; sin ninguno abierto → tarjeta resumen */}
        <aside className="hidden lg:block" aria-label="Resumen del tema">
          <div key={openTema ? `fig-${openTema.title}` : `card-${current.title}`} className="sticky top-28 animate-fade-up">
            {openTema ? <TemaFigure tema={openTema} variant="aside" /> : <TemaCard tema={current} />}
          </div>
        </aside>
      </div>
    </section>
  );
}
