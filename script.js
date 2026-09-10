/* ==========================================================================
   INSTITUTO TÉCNICO LEÓN ÁNGEL GÓMEZ — script.js
   Contiene: menú móvil, resaltado de enlace activo, revelado en scroll,
   cuestionario "Descubre tus intereses" y formularios de contacto/apoyo.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  /* ---------- Menú móvil (hamburguesa) ---------- */
  const boton = document.querySelector(".nav-hamb");
  const menuMovil = document.querySelector(".nav-movil");
  if (boton && menuMovil) {
    boton.addEventListener("click", function () {
      boton.classList.toggle("abierto");
      menuMovil.classList.toggle("abierto");
      const abierto = menuMovil.classList.contains("abierto");
      boton.setAttribute("aria-expanded", abierto ? "true" : "false");
    });
  }

  /* ---------- Resaltar el enlace activo según la página actual ---------- */
  const pagina = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a, .nav-movil a").forEach(function (enlace) {
    const destino = enlace.getAttribute("href").split("?")[0];
    if (destino === pagina) enlace.classList.add("activo");
  });

  /* ---------- Revelado suave de secciones al hacer scroll ---------- */
  const elementos = document.querySelectorAll(".revelar");
  if ("IntersectionObserver" in window && elementos.length) {
    const observador = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (entrada) {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("mostrar");
            observador.unobserve(entrada.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    elementos.forEach(function (el) { observador.observe(el); });
  } else {
    elementos.forEach(function (el) { el.classList.add("mostrar"); });
  }

  /* ---------- Formulario de contacto (solo visual, sin backend) ---------- */
  const formContacto = document.getElementById("form-contacto");
  if (formContacto) {
    formContacto.addEventListener("submit", function (e) {
      e.preventDefault();
      const mensaje = document.getElementById("confirmacion-contacto");
      formContacto.reset();
      if (mensaje) {
        mensaje.classList.add("mostrar");
        setTimeout(function () { mensaje.classList.remove("mostrar"); }, 5000);
      }
    });
  }

  /* ---------- Sección de apoyo / donaciones (placeholder visual) ---------- */
  const botonApoyo = document.getElementById("boton-apoyo");
  const modalApoyo = document.getElementById("modal-apoyo");
  const cerrarApoyo = document.getElementById("cerrar-apoyo");
  if (botonApoyo && modalApoyo) {
    botonApoyo.addEventListener("click", function () {
      modalApoyo.classList.add("mostrar");
    });
  }
  if (cerrarApoyo && modalApoyo) {
    cerrarApoyo.addEventListener("click", function () {
      modalApoyo.classList.remove("mostrar");
    });
    modalApoyo.addEventListener("click", function (e) {
      if (e.target === modalApoyo) modalApoyo.classList.remove("mostrar");
    });
  }

  /* ---------- Cuestionario: "¿Qué técnica conecta contigo?" ---------- */
  iniciarQuiz();

  /* ---------- Página de detalle de técnica ---------- */
  iniciarDetalleTecnica();
});

/* ==========================================================================
   Detalle de técnica: lee el parámetro ?t= de la URL y pinta el contenido
   ========================================================================== */
function iniciarDetalleTecnica() {
  const contenedor = document.getElementById("detalle-tecnica");
  if (!contenedor) return;

  const datos = {
    contable: {
      num: "01",
      nombre: "Auxiliar Contable",
      trata: "Una formación relacionada con la organización, manejo y registro de información contable dentro de una empresa u organización.",
      aprender: [
        "Registro y organización de información contable.",
        "Manejo de documentos y comprobantes.",
        "Uso básico de herramientas contables."
      ],
      habilidades: [
        "Orden y atención al detalle.",
        "Manejo de información numérica.",
        "Responsabilidad en el manejo de datos."
      ],
      paraQuien: "Para quienes disfrutan organizar información, trabajar con números y llevar procesos con orden y precisión."
    },
    veterinaria: {
      num: "02",
      nombre: "Veterinaria",
      trata: "Un área relacionada con el cuidado, bienestar y atención de los animales.",
      aprender: [
        "Cuidados básicos y bienestar animal.",
        "Manejo y manipulación segura de animales.",
        "Nociones generales de salud animal."
      ],
      habilidades: [
        "Observación y paciencia.",
        "Cuidado y responsabilidad.",
        "Trabajo cercano con seres vivos."
      ],
      paraQuien: "Para quienes sienten interés por el cuidado animal y disfrutan aprender observando y cuidando."
    },
    seguridad: {
      num: "03",
      nombre: "Seguridad y Salud en el Trabajo",
      trata: "Una formación enfocada en la prevención y el cuidado dentro de los espacios de trabajo.",
      aprender: [
        "Identificación de riesgos en entornos laborales.",
        "Prácticas básicas de prevención.",
        "Nociones de cuidado y bienestar en el trabajo."
      ],
      habilidades: [
        "Análisis y prevención de riesgos.",
        "Responsabilidad y cuidado del entorno.",
        "Atención a normas y procesos."
      ],
      paraQuien: "Para quienes disfrutan analizar situaciones, prevenir riesgos y cuidar del bienestar de las personas."
    }
  };

  const params = new URLSearchParams(window.location.search);
  const clave = params.get("t") || "contable";
  const tecnica = datos[clave] || datos.contable;

  document.getElementById("detalle-num").textContent = tecnica.num;
  document.getElementById("detalle-nombre").textContent = tecnica.nombre;
  document.getElementById("detalle-trata").textContent = tecnica.trata;

  const listaAprender = document.getElementById("detalle-aprender");
  listaAprender.innerHTML = tecnica.aprender.map(function (item) { return "<li>" + item + "</li>"; }).join("");

  const listaHabilidades = document.getElementById("detalle-habilidades");
  listaHabilidades.innerHTML = tecnica.habilidades.map(function (item) { return "<li>" + item + "</li>"; }).join("");

  document.getElementById("detalle-paraquien").textContent = tecnica.paraQuien;

  document.title = tecnica.nombre + " — Instituto Técnico León Ángel Gómez";
}

function iniciarQuiz() {
  const contenedorQuiz = document.getElementById("quiz");
  if (!contenedorQuiz) return;

  const preguntas = [
    {
      texto: "¿Qué actividad te llama más la atención?",
      opciones: [
        { letra: "A", texto: "Organizar información", valor: "contable" },
        { letra: "B", texto: "Cuidar animales", valor: "veterinaria" },
        { letra: "C", texto: "Prevenir riesgos y cuidar personas", valor: "seguridad" }
      ]
    },
    {
      texto: "¿Qué tipo de actividad disfrutarías más?",
      opciones: [
        { letra: "A", texto: "Trabajar con números y documentos", valor: "contable" },
        { letra: "B", texto: "Trabajar con animales", valor: "veterinaria" },
        { letra: "C", texto: "Analizar situaciones y buscar soluciones", valor: "seguridad" }
      ]
    },
    {
      texto: "¿Qué habilidad te gustaría desarrollar?",
      opciones: [
        { letra: "A", texto: "Organización", valor: "contable" },
        { letra: "B", texto: "Cuidado y observación", valor: "veterinaria" },
        { letra: "C", texto: "Prevención y responsabilidad", valor: "seguridad" }
      ]
    }
  ];

  const resultados = {
    contable: {
      nombre: "Auxiliar Contable",
      desc: "Esta técnica podría relacionarse con algunos de tus intereses: te inclinas por organizar, registrar y darle estructura a la información.",
      slug: "contable"
    },
    veterinaria: {
      nombre: "Veterinaria",
      desc: "Esta técnica podría relacionarse con algunos de tus intereses: te acercan el cuidado, la observación y el bienestar animal.",
      slug: "veterinaria"
    },
    seguridad: {
      nombre: "Seguridad y Salud en el Trabajo",
      desc: "Esta técnica podría relacionarse con algunos de tus intereses: te motiva prevenir riesgos y cuidar a las personas a tu alrededor.",
      slug: "seguridad"
    }
  };

  let indiceActual = 0;
  const puntajes = { contable: 0, veterinaria: 0, seguridad: 0 };

  const relleno = document.getElementById("barra-relleno");
  const progresoTexto = document.getElementById("progreso-texto");
  const tarjeta = document.getElementById("tarjeta-pregunta");
  const zonaResultado = document.getElementById("quiz-resultado");
  const zonaPreguntas = document.getElementById("quiz-preguntas");

  function pintarPregunta() {
    const p = preguntas[indiceActual];
    tarjeta.innerHTML =
      "<h2>" + p.texto + "</h2>" +
      '<div class="opciones">' +
      p.opciones.map(function (op) {
        return '<button class="opcion" data-valor="' + op.valor + '">' +
          '<span class="letra">' + op.letra + '</span><span>' + op.texto + '</span>' +
          '</button>';
      }).join("") +
      "</div>";

    relleno.style.width = (((indiceActual) / preguntas.length) * 100) + "%";
    progresoTexto.textContent = "Pregunta " + (indiceActual + 1) + " de " + preguntas.length;

    tarjeta.querySelectorAll(".opcion").forEach(function (boton) {
      boton.addEventListener("click", function () {
        puntajes[boton.getAttribute("data-valor")]++;
        avanzar();
      });
    });
  }

  function avanzar() {
    tarjeta.classList.add("saliendo");
    setTimeout(function () {
      indiceActual++;
      if (indiceActual < preguntas.length) {
        tarjeta.classList.remove("saliendo");
        pintarPregunta();
      } else {
        mostrarResultado();
      }
    }, 250);
  }

  function mostrarResultado() {
    relleno.style.width = "100%";
    progresoTexto.textContent = "Pregunta " + preguntas.length + " de " + preguntas.length;

    let ganador = "contable";
    let maximo = -1;
    Object.keys(puntajes).forEach(function (clave) {
      if (puntajes[clave] > maximo) {
        maximo = puntajes[clave];
        ganador = clave;
      }
    });

    const resultado = resultados[ganador];
    document.getElementById("resultado-nombre").textContent = resultado.nombre;
    document.getElementById("resultado-desc").textContent = resultado.desc;
    document.getElementById("resultado-enlace").setAttribute("href", "tecnica.html?t=" + resultado.slug);

    zonaPreguntas.style.display = "none";
    zonaResultado.classList.add("mostrar");
  }

  const botonReintentar = document.getElementById("reintentar-quiz");
  if (botonReintentar) {
    botonReintentar.addEventListener("click", function () {
      indiceActual = 0;
      puntajes.contable = 0;
      puntajes.veterinaria = 0;
      puntajes.seguridad = 0;
      zonaResultado.classList.remove("mostrar");
      zonaPreguntas.style.display = "block";
      tarjeta.classList.remove("saliendo");
      pintarPregunta();
    });
  }

  pintarPregunta();
}
