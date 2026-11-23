# ArteTulio

Web portfolio de **Tulio Fausto Di Lorenzo**, pintor expresionista figurativo (Buenos Aires, 1973 · taller en Málaga). Instagram: [@artetulio](https://www.instagram.com/artetulio/).

Sitio estático (HTML + CSS + JS, sin compilación). Se puede publicar tal cual con GitHub Pages: *Settings → Pages → Deploy from a branch → `main` / root*.

## Estructura

- `index.html`: la página (portada, obra, sobre mí, contacto).
- `styles.css`: estilos y tokens de diseño.
- `main.js`: visor de pinturas (teclado, flechas y deslizar en móvil), aparición de obras y menú activo.
- `assets/obras/`: fotos de las pinturas.
- `assets/img/`: foto de Tulio y favicon.
- `assets/fonts/`: tipografías autoalojadas (Outfit e Instrument Serif).
- `PRODUCT.md`: contexto del proyecto para las skills de diseño.

## Añadir una pintura

1. Guarda la foto en `assets/obras/nombre-de-la-obra.jpg` (cuanto más grande y nítida, mejor; ideal 2000 px de lado largo).
2. En `index.html`, copia uno de los bloques `<li class="obra">` dentro de `<ul class="galeria">` y cambia la imagen, el título, la técnica y las medidas. Actualiza `width`/`height` con el tamaño real de la foto y el texto alternativo.

## Recursos de diseño instalados

En `.claude/` están instalados para Claude Code:

- Skills de Emil Kowalski (`npx skills@latest add emilkowalski/skills`): `emil-design-eng`, `animate`, `review-animations`, etc.
- Impeccable de Paul Bakaus (skill `impeccable`, sus agentes y los hooks del detector de diseño en `.claude/settings.json`).
