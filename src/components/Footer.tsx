import { Mail, MessageCircle, Phone, Instagram } from "lucide-react";

const contacts = [
  { icon: Mail, label: "Correo", value: "contacto@ciberparatodos.cl", href: "mailto:contacto@ciberparatodos.cl" },
  { icon: MessageCircle, label: "WhatsApp", value: "+56 9 0000 0000", href: "https://wa.me/56900000000" },
  { icon: Phone, label: "Teléfono", value: "+56 32 000 0000", href: "tel:+56320000000" },
  { icon: Instagram, label: "Instagram", value: "@ciberparatodos", href: "https://instagram.com/ciberparatodos" },
];

export default function Footer() {
  return (
    <footer className="bg-navy px-6 pb-8 pt-11 text-[#C9C5B8]">
      <div className="mx-auto max-w-5xl">
        <h3 className="mb-1.5 font-display text-xl text-[#F3F1EA]">
          ¿Necesitas ayuda o quieres coordinar una visita?
        </h3>
        <p className="mb-6 max-w-[52ch] text-sm text-[#9C98A6]">
          Escríbenos por cualquiera de estos canales y te respondemos a la brevedad.
        </p>

        <div className="flex flex-wrap gap-3">
          {contacts.map(({ icon: Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 basis-[220px] items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3.5 text-[#F3F1EA] transition hover:border-amber/40 hover:bg-amber/10"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber/20 text-amber">
                <Icon size={18} />
              </span>
              <span>
                <span className="block text-xs text-[#9C98A6]">{label}</span>
                <span className="block text-sm font-medium">{value}</span>
              </span>
            </a>
          ))}
        </div>

        <div className="mt-8 border-t border-white/10 pt-5 text-xs text-[#7D7A87]">
          Prototipo — CiberParaTodos. Datos de ejemplo, no oficiales.
        </div>
      </div>
    </footer>
  );
}
