# CiberParaTodos

Sitio de divulgación sobre ciberseguridad escolar: módulo educativo con 10 temáticas
(acordeón) y un registro visual de colegios visitados (lista + mapa sincronizados).

## Stack

- **Vite + React + TypeScript**
- **Tailwind CSS** (dark mode por clase `dark` en `<html>`)
- **@radix-ui/react-accordion** para el acordeón accesible
- **react-leaflet + Leaflet** para el mapa, con tiles gratuitos de **CartoDB**
  (`light_all` en modo claro, `dark_all` en modo oscuro)
- **lucide-react** para íconos

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
    Header.tsx          ← topbar: toggle de tema, título, logo de la universidad
    TemasAccordion.tsx  ← acordeón agrupado por categoría
    SchoolList.tsx       ← lista de colegios (columna izquierda)
    SchoolMap.tsx         ← mapa Leaflet (columna derecha)
    Footer.tsx            ← contacto
  App.tsx            ← arma todo y maneja el estado compartido (tema, colegio activo)
```

## Cosas para personalizar

- **Logo de la universidad**: reemplaza el bloque punteado en `Header.tsx` por
  `<img src="/logo-universidad.png" className="h-16 w-16 object-contain" />`.
  Pon el archivo en `public/`.
- **Imágenes de cada temática**: hoy `TemasAccordion.tsx` muestra el emoji de
  `tema.icon`. Agrega un campo `image` en `temas.ts` (ruta en `/public` o URL) y
  cambia ese bloque por un `<img>`.
- **Links "Más información"**: hoy apuntan a `"#"`. Actualiza el campo `link`
  de cada tema en `temas.ts`.
- **Colores y tipografía**: están centralizados en `tailwind.config.js`
  (paleta `navy`, `paper`, `amber`, `teal`) y en el `<link>` de Google Fonts
  en `index.html` (Space Grotesk + Inter).

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
