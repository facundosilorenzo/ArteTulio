// Web de Tulio Di Lorenzo: visor de obra, aparición de obras y estado de la cabecera.
document.addEventListener("DOMContentLoaded", () => {
  const botones = [...document.querySelectorAll(".obra__abrir")];
  const obras = botones.map((b) => {
    const li = b.closest(".obra");
    const img = b.querySelector("img");
    return {
      src: img.getAttribute("src"),
      alt: img.getAttribute("alt"),
      titulo: li.querySelector(".obra__titulo").textContent,
      datos: li.querySelector(".obra__datos").textContent,
      boton: b,
    };
  });

  /* ---------- Visor ---------- */
  const visor = document.querySelector(".visor");
  const vImg = visor.querySelector(".visor__img");
  const vTitulo = visor.querySelector(".visor__titulo");
  const vDatos = visor.querySelector(".visor__datos");
  const vCuenta = visor.querySelector(".visor__cuenta");
  let actual = 0;

  const pintar = (i) => {
    const o = obras[i];
    vImg.src = o.src;
    vImg.alt = o.alt;
    vTitulo.textContent = o.titulo;
    vDatos.textContent = o.datos;
    vCuenta.textContent = `${i + 1} / ${obras.length}`;
  };

  const mostrar = (i, animar) => {
    actual = (i + obras.length) % obras.length;
    const reducir = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!animar || reducir) return pintar(actual);
    vImg.classList.add("cambiando");
    setTimeout(() => {
      pintar(actual);
      const listo = () => requestAnimationFrame(() => vImg.classList.remove("cambiando"));
      vImg.complete ? listo() : vImg.addEventListener("load", listo, { once: true });
    }, 140);
  };

  botones.forEach((b, i) =>
    b.addEventListener("click", () => {
      mostrar(i, false);
      visor.showModal();
      document.body.style.overflow = "hidden";
    })
  );

  visor.addEventListener("close", () => {
    document.body.style.overflow = "";
    obras[actual].boton.focus({ preventScroll: true });
    obras[actual].boton.scrollIntoView({ block: "nearest" });
  });

  visor.querySelector(".visor__cerrar").addEventListener("click", () => visor.close());
  visor.querySelector(".visor__ant").addEventListener("click", () => mostrar(actual - 1, true));
  visor.querySelector(".visor__sig").addEventListener("click", () => mostrar(actual + 1, true));

  // Clic en el fondo (fuera de la imagen y de los controles) cierra
  visor.addEventListener("click", (e) => {
    if (e.target === visor || e.target.classList.contains("visor__escenario")) visor.close();
  });

  visor.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") mostrar(actual - 1, true);
    if (e.key === "ArrowRight") mostrar(actual + 1, true);
  });

  // Deslizar en pantallas táctiles
  let x0 = null;
  visor.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse") x0 = e.clientX; });
  visor.addEventListener("pointerup", (e) => {
    if (x0 === null) return;
    const dx = e.clientX - x0;
    x0 = null;
    if (Math.abs(dx) > 50) mostrar(actual + (dx < 0 ? 1 : -1), true);
  });

  /* ---------- Aparición de obras ---------- */
  const items = document.querySelectorAll(".obra");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entradas) =>
        entradas.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("visible");
            io.unobserve(en.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px" }
    );
    items.forEach((it) => io.observe(it));
  } else {
    items.forEach((it) => it.classList.add("visible"));
  }

  /* ---------- Cabecera ---------- */
  const cabecera = document.querySelector(".cabecera");
  const enlaces = [...document.querySelectorAll(".cabecera__nav a[href^='#']")];
  const secciones = enlaces.map((a) => document.querySelector(a.getAttribute("href")));
  const alDesplazar = () => {
    cabecera.classList.toggle("con-sombra", scrollY > 8);
    const y = scrollY + innerHeight * 0.35;
    let activo = -1;
    secciones.forEach((s, i) => { if (s && s.offsetTop <= y) activo = i; });
    enlaces.forEach((a, i) => (i === activo ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current")));
  };
  addEventListener("scroll", alDesplazar, { passive: true });
  alDesplazar();
});
