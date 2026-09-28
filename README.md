# CiberParaTodos

Sitio de divulgación sobre ciberseguridad escolar: módulo educativo con 10 temáticas
(acordeón) y un registro visual de colegios visitados (lista + mapa sincronizados).

## Stack

- **Vite + React + TypeScript**
- **Tailwind CSS** (dark mode por clase `dark` en `<html>`)
- **@radix-ui/react-accordion** para el acordeón accesible
- **react-leaflet + Leaflet** para el mapa (tiles CARTO con clave gratuita, o respaldo OpenStreetMap)
- **@vis.gl/react-google-maps** como segundo proveedor, intercambiable desde el marco del mapa
- **lucide-react** para íconos
- Diseño basado en `DESIGN.md` (fuentes DM Sans + Geist)

## Cómo correrlo

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`.

Para compilar la versión de producción:

```bash
npm run build
npm run preview
```

## Estructura

```
src/
  content/
    temas.ts       ← las 10 temáticas (texto, ícono, link "más información")
    colegios.ts     ← lista de colegios visitados (nombre, lugar, lat/lng)
  components/
    Header.tsx          ← nav flotante: toggle de tema, título, logo de la universidad
    Hero.tsx            ← hero con degradado
    TemasSection.tsx    ← filas numeradas + panel derecho fijo
    SchoolsSection.tsx  ← lista + mapa en marco tipo mockup + tarjeta de detalle
    SchoolList.tsx / SchoolMap.tsx
    Footer.tsx            ← contacto
  App.tsx            ← arma todo y maneja el estado compartido (tema, colegio activo)
```

## Mapas: proveedores y claves

El marco del mapa tiene un selector **Leaflet | Google Maps**. Ambos comparten lista, marcadores y tarjeta de detalle.
Copia `.env.example` a `.env` (no se sube al repo) y completa lo que uses:

| Variable | Para qué | Sin ella |
|---|---|---|
| `VITE_CARTO_KEY` | Clave gratuita de tiles CARTO ([solicitar](https://carto.com/basemaps/apikey/)) | Leaflet usa tiles públicos de OpenStreetMap (modo oscuro simulado con filtro CSS) |
| `VITE_GOOGLE_MAPS_API_KEY` | Google Maps JavaScript API | La pestaña Google muestra instrucciones y no carga nada de Google |
| `VITE_GOOGLE_MAP_ID` | Map ID propio (opcional) | Usa `DEMO_MAP_ID` |

- La clave de Google queda visible en el navegador (es normal): **restríngela por HTTP referrer** y por API
  (solo Maps JavaScript API) en Google Cloud Console, y activa alertas de presupuesto.
- Google solo se carga cuando alguien elige esa pestaña.
- Nunca subas `.env` ni pegues claves en issues, chats o commits.

## Accesibilidad

Hecho: foco visible en todo control, enlace "Saltar al contenido", landmarks (`header`, `nav`, `main`, `footer`),
acordeón con Radix (teclado + `aria-expanded`), lista de colegios con `aria-pressed`, marcadores del mapa con nombre
accesible (Tab + Enter), anuncio de la selección para lectores de pantalla, `Esc` cierra el detalle,
`prefers-reduced-motion` respetado (CSS y desplazamientos del mapa), tamaños de texto en `rem`, íconos decorativos
con `aria-hidden`.

Pendiente / manual: probar con un lector de pantalla real (NVDA o VoiceOver), zoom al 200 %, navegación solo con teclado,
y escribir `imageAlt` en `temas.ts` cuando se agreguen imágenes. El mapa es visual: la lista de colegios es su
equivalente en texto.

## Diseño

`DESIGN.md` es la referencia visual. Tokens en `src/index.css` (variables CSS, oscuro por defecto;
clase `light` en `<html>` para la variante clara) y `tailwind.config.js`. El mapa ya no usa las imágenes
de marcador de Leaflet (marcadores propios en CSS), así que no depende de cdnjs.

## Cosas para personalizar

- **Logo de la universidad**: reemplaza el bloque punteado en `Header.tsx` por
  `<img src="/logo-universidad.png" className="h-12 w-12 object-contain" />`.
  Pon el archivo en `public/`.
- **Imágenes de cada temática**: la tarjeta (`TemaPreview.tsx`) ya tiene un recuadro 16:10 que muestra
  `tema.image` si existe (ej. `image: "/temas/ciberacoso.jpg"`, con el archivo en `public/temas/`) y, si no,
  el ícono. En escritorio es el panel fijo de la derecha; en móvil y tablet aparece dentro del desplegable.
- **Links "Más información"**: hoy apuntan a `"#"`. Actualiza el campo `link`
  de cada tema en `temas.ts`.
- **Colores y tipografía**: están centralizados en `tailwind.config.js`
  y en `src/index.css`; las fuentes se cargan en `index.html`.

## Siguiente paso: contenido dinámico para el registro de colegios

Mientras el listado de colegios lo actualice alguien no técnico seguido,
conviene sacar `colegios.ts` de un archivo estático y traerlo desde una base
de datos liviana. Recomendado: **Supabase**.

1. Crea un proyecto en supabase.com (tiene plan gratuito).
2. Crea una tabla `colegios` con columnas `name`, `place`, `lat`, `lng`.
3. Instala el cliente: `npm install @supabase/supabase-js`.
4. Reemplaza el `import { colegios } from "@/content/colegios"` en `App.tsx`
   por un `useEffect` que haga `supabase.from('colegios').select('*')` y
   guarde el resultado en estado.
5. Así, el equipo puede agregar colegios desde el panel de Supabase (como una
   planilla) sin tocar código ni volver a desplegar.

Las 10 temáticas educativas, en cambio, cambian poco — dejarlas versionadas
en `temas.ts` dentro del repo (editables por pull request) es intencional.

## Deploy

Cualquiera de estas opciones sirve con el plan gratuito y despliegue
automático al hacer push a `main`:

- [Vercel](https://vercel.com) — detecta Vite automáticamente.
- [Netlify](https://netlify.com) — build command `npm run build`, publish
  directory `dist`.

Ambos permiten conectar un dominio propio de la universidad.
