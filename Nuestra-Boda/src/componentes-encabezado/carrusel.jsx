
import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
} from "lucide-react";

// Fotografías del carrusel
const images = [
  "/Carrusel01v.jpg",
  "/Carrusel02.jpg",
  "/Carrusel03.jpg",
  "/Carrusel04.jpg",
  "/Carrusel05.jpg",
];

const Carousel = () => {
  const [index, setIndex] = useState(0);
  const [cargadas, setCargadas] = useState({});
  const [pausado, setPausado] = useState(false);

  // Precargar todas las imágenes
  useEffect(() => {
    let activo = true;

    const precargas = images.map((src, i) => {
      const img = new Image();

      const finalizar = (correcta) => {
        if (!activo) return;

        setCargadas((prev) => ({
          ...prev,
          [i]: correcta,
        }));
      };

      img.onload = () => finalizar(true);
      img.onerror = () => finalizar(false);
      img.src = src;

      if (img.complete) {
        finalizar(img.naturalWidth > 0);
      }

      return img;
    });

    return () => {
      activo = false;

      precargas.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, []);

  // Índices disponibles
  const disponibles = images
    .map((_, i) => i)
    .filter((i) => cargadas[i] === true);

  const siguienteDisponible = useCallback(
    (actual, direccion = 1) => {
      for (let paso = 1; paso <= images.length; paso++) {
        const candidato =
          (actual + direccion * paso + images.length * 2) %
          images.length;

        if (cargadas[candidato] === true) {
          return candidato;
        }
      }

      return actual;
    },
    [cargadas]
  );

  // Avance automático
  useEffect(() => {
    if (pausado || disponibles.length < 2) return;

    const intervalo = window.setInterval(() => {
      setIndex((prev) => siguienteDisponible(prev, 1));
    }, 4500);

    return () => window.clearInterval(intervalo);
  }, [pausado, disponibles.length, siguienteDisponible]);

  const nextImage = () => {
    setIndex((prev) => siguienteDisponible(prev, 1));
  };

  const prevImage = () => {
    setIndex((prev) => siguienteDisponible(prev, -1));
  };

  const imagenVisible = cargadas[index]
    ? index
    : disponibles[0] ?? -1;

  return (
    <section
      id="galeria"
      className="
        relative isolate w-full
        overflow-hidden
        bg-white
        px-4 py-20
        sm:px-6 sm:py-28
      "
    >
      {/* Decoración de esquinas */}
      <div
        className="
          pointer-events-none
          absolute left-0 top-0
          h-28 w-28
          border-l-2 border-t-2
          border-[#D4E6FF]
          sm:h-44 sm:w-44
        "
      />

      <div
        className="
          pointer-events-none
          absolute bottom-0 right-0
          h-28 w-28
          border-b-2 border-r-2
          border-[#D4E6FF]
          sm:h-44 sm:w-44
        "
      />

      <div className="relative z-10 mx-auto max-w-5xl">

        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p
            className="
              mb-4 text-[11px]
              uppercase tracking-[0.35em]
              text-[#294285]
              sm:text-xs
            "
          >
            Nuestra historia
          </p>

          <h2
            className="
              font-['Playfair_Display']
              text-[clamp(2.5rem,6vw,4rem)]
              font-normal
              text-[#111111]
            "
          >
            Momentos Especiales
          </h2>

          <div
            className="
              my-6 flex items-center
              justify-center gap-4
            "
          >
            <span className="h-px w-16 bg-[#294285]/60" />

            <Heart
              size={13}
              fill="#4169E1"
              className="text-[#4169E1]"
            />

            <span className="h-px w-16 bg-[#294285]/60" />
          </div>

          <p
            className="
              mx-auto max-w-lg
              font-['Playfair_Display']
              text-sm leading-7
              text-[#444444]
              sm:text-base
            "
          >
            Cada fotografía guarda un recuerdo
            de nuestra historia de amor.
          </p>
        </motion.div>

        {/* Carrusel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl"
          onMouseEnter={() => setPausado(true)}
          onMouseLeave={() => setPausado(false)}
        >
          {/* Marco exterior */}
          <div
            className="
              relative border
              border-[#B7CAE7]
              bg-[#F6F9FF]
              p-2
              shadow-[0_15px_45px_rgba(27,36,71,0.09)]
              sm:p-3
            "
          >
            {/* Contenedor con altura fija */}
            <div
              className="
                relative w-full
                h-[390px]
                sm:h-[520px]
                md:h-[600px]
                overflow-hidden
                bg-[#f7f7fa]
              "
            >
              {/* Todas las imágenes permanecen montadas */}
              {images.map((src, i) => {
                const activa = imagenVisible === i;
                const cargada = cargadas[i] === true;

                return (
                  <img
                    key={src}
                    src={src}
                    alt={`Blanca y Luis - recuerdo ${i + 1}`}
                    loading="eager"
                    decoding="async"
                    draggable={false}
                    className="
                      absolute inset-0
                      h-full w-full
                      object-contain
                      select-none
                      transition-opacity
                      duration-700
                      ease-in-out
                    "
                    style={{
                      opacity: activa && cargada ? 1 : 0,
                      zIndex: activa ? 2 : 1,
                      pointerEvents: "none",
                    }}
                  />
                );
              })}

              {/* Mensaje durante carga inicial */}
              {imagenVisible === -1 && (
                <div
                  className="
                    absolute inset-0 z-10
                    flex flex-col
                    items-center justify-center
                    gap-4
                    bg-[#F6F9FF]
                  "
                >
                  <span
                    className="
                      h-8 w-8 animate-spin
                      rounded-full
                      border-2
                      border-[#4169E1]/25
                      border-t-[#4169E1]
                    "
                  />

                  <p
                    className="
                      font-['Playfair_Display']
                      text-sm italic
                      text-[#294285]
                    "
                  >
                    Preparando nuestros recuerdos...
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Controles inferiores */}
          <div
            className="
              mt-7 flex items-center
              justify-center gap-6
              sm:gap-9
            "
          >
            <button
              type="button"
              onClick={prevImage}
              disabled={disponibles.length < 2}
              aria-label="Fotografía anterior"
              className="
                flex h-12 w-12
                items-center justify-center
                rounded-full
                bg-[#1B2447]
                text-white
                shadow-[0_6px_18px_rgba(27,36,71,0.16)]
                transition-all duration-300
                hover:scale-105
                hover:bg-[#294285]
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              <ChevronLeft size={22} strokeWidth={1.7} />
            </button>

            {/* Indicadores */}
            <div className="flex items-center justify-center gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    if (cargadas[i]) setIndex(i);
                  }}
                  disabled={!cargadas[i]}
                  aria-label={`Ver fotografía ${i + 1}`}
                  aria-current={
                    imagenVisible === i ? "true" : undefined
                  }
                  className="
                    flex h-8 min-w-3
                    items-center justify-center
                    disabled:cursor-not-allowed
                  "
                >
                  <span
                    className={`
                      block h-2 rounded-full
                      transition-all duration-300
                      ${
                        imagenVisible === i
                          ? "w-7 bg-[#294285]"
                          : "w-2 bg-[#C9D9F0]"
                      }
                    `}
                  />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={nextImage}
              disabled={disponibles.length < 2}
              aria-label="Siguiente fotografía"
              className="
                flex h-12 w-12
                items-center justify-center
                rounded-full
                bg-[#1B2447]
                text-white
                shadow-[0_6px_18px_rgba(27,36,71,0.16)]
                transition-all duration-300
                hover:scale-105
                hover:bg-[#294285]
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              <ChevronRight size={22} strokeWidth={1.7} />
            </button>
          </div>

          {/* Contador de fotografías */}
          <p
            className="
              mt-4 text-center
              font-['Playfair_Display']
              text-sm
              tracking-[0.15em]
              text-[#294285]
            "
          >
            {imagenVisible === -1
              ? "Cargando..."
              : `${String(imagenVisible + 1).padStart(2, "0")} / ${String(images.length).padStart(2, "0")}`}
          </p>
        </motion.div>

        {/* Frase inferior */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Heart
            size={14}
            fill="#4169E1"
            className="mx-auto mb-4 text-[#4169E1]"
          />

          <p
            className="
              font-['Playfair_Display']
              text-base italic
              text-[#294285]
              sm:text-lg
            "
          >
            Y lo mejor de nuestra historia está por comenzar...
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Carousel;
