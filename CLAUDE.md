# CiberParaTodos — guía para Claude Code

Sitio de divulgación de ciberseguridad para colegios (Vite + React + TS + Tailwind v3 + react-leaflet).

- **Diseño:** sigue `DESIGN.md` (sistema oscuro, vidrio esmerilado, píldoras, títulos peso 500, sin sombras).
  Los tokens viven como variables CSS en `src/index.css` (oscuro por defecto; clase `light` = variante clara,
  que NO está en DESIGN.md y es una extrapolación) y se exponen en `tailwind.config.js`.
- **Contenido:** temas en `src/content/temas.ts`, colegios en `src/content/colegios.ts`.
- **Público:** estudiantes de básica y media. Lenguaje cercano, sin alarmismo, temas sensibles (grooming, sexting)
  siempre orientados a protección y a avisar a un adulto de confianza.
- Íconos: lucide-react con `strokeWidth={1.5}`. Sin emojis como íconos.
- Probar con `npm run build` antes de dar algo por terminado.
- **Claves:** viven en `.env` (ignorado por git). Nunca escribirlas en código, README ni commits; ver `.env.example`.
