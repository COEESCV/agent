# Informador IA COEESCV — App (PWA)

App web instalable (PWA) del informador virtual del COEESCV.
Funciona con el Worker de Cloudflare ya desplegado; no requiere tienda de apps.

## Archivos (subir TODOS a la raíz del repo COEESCV/agent, en la rama main)

- `index.html`            (reemplaza al anterior)
- `manifest.json`
- `sw.js`
- `icon-192.png`
- `icon-512.png`
- `icon-maskable-512.png`

Deben seguir existiendo en el repo: `imagen_logo.jpg`, `imagen_fondo.jpg`, `base_conocimiento.md`.

## Instalación en el móvil (después de hacer commit y esperar ~1 min a GitHub Pages)

- **Android (Chrome):** abrir https://coeescv.github.io/agent/ → menú ⋮ → "Instalar aplicación" / "Añadir a pantalla de inicio".
- **iPhone (Safari):** abrir la misma URL → botón Compartir → "Añadir a pantalla de inicio".

## Notas de mantenimiento

- Para forzar la actualización de la app en los móviles, cambia el nombre de la
  caché en `sw.js` (`coeescv-ia-v1` → `coeescv-ia-v2`) en cada despliegue.
- El service worker NO cachea las respuestas de la IA: siempre van en directo
  al Worker de Cloudflare.
