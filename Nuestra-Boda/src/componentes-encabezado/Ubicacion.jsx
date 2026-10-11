
import React from "react";
import { motion } from "framer-motion";
import {
  Church,
  MapPin,
  Clock3,
  Heart,
  Wine,
  ArrowUpRight,
} from "lucide-react";

const eventos = [
  {
    id: "ceremonia",
    subtitulo: "Ceremonia religiosa",
    titulo: "Parroquia de la Divina Providencia",
    hora: "4:15 p. m.",
    direccion:
      "Cienfuegos 1012, Residencial Zacatenco, Gustavo A. Madero, 07360 Ciudad de México, CDMX",
    ubicacion:
      "https://maps.app.goo.gl/y96mZDVKk7A9cDtv9",
    Icono: Church,
  },
  {
    id: "recepcion",
    subtitulo: "Recepción",
    titulo: "San José de Gracia",
    hora: "6:30 p. m.",
    direccion:
      "Tepic 51, Hab. Valle Ceylán, 54150 Tlalnepantla, Méx.",
    ubicacion:
      "https://maps.app.goo.gl/XnNqyRdzTY2zNPGV9",
    Icono: Wine,
  },
];

const Celebracion = () => {
  return (
    <section
      id="celebracion"
      className="
        relative isolate w-full
        overflow-hidden
        bg-[#F8FAFF]
        px-5 py-20
        sm:px-6 sm:py-28
      "
    >
      {/* Detalles decorativos */}
      <div
        className="
          pointer-events-none
          absolute left-0 top-0
          h-32 w-32
          border-l-2 border-t-2
          border-[#D4E6FF]
          sm:h-48 sm:w-48
        "
      />

      <div
        className="
          pointer-events-none
          absolute bottom-0 right-0
          h-32 w-32
          border-b-2 border-r-2
          border-[#D4E6FF]
          sm:h-48 sm:w-48
        "
      />

      <div className="relative z-10 mx-auto max-w-5xl">

        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.85,
            ease: "easeOut",
          }}
          viewport={{ once: true }}
          className="mb-12 text-center sm:mb-16"
        >
          <p
            className="
              mb-4
              text-[11px]
              uppercase
              tracking-[0.3em]
              text-[#294285]
              sm:text-xs
            "
          >
            Celebremos juntos
          </p>

          <h2
            className="
              font-['Playfair_Display']
              text-[clamp(2.5rem,6vw,4rem)]
              font-normal
              leading-tight
              text-[#111111]
            "
          >
            Nuestra Boda
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
              font-['Playfair_Display']
              text-lg
              tracking-[0.06em]
              text-[#333333]
              sm:text-xl
            "
          >
            26 de febrero de 2027
          </p>

          <p
            className="
              mx-auto mt-5 max-w-xl
              text-sm leading-7
              text-[#444444]
              sm:text-base
            "
          >
            Nos llenará de alegría compartir contigo
            este día tan especial.
          </p>
        </motion.div>

        {/* Tarjetas de eventos */}
        <div
          className="
            grid grid-cols-1
            gap-7
            md:grid-cols-2
            md:gap-8
          "
        >
          {eventos.map((evento, index) => {
            const Icono = evento.Icono;

            return (
              <motion.article
                key={evento.id}
                initial={{
                  opacity: 0,
                  y: 35,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.75,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
                className="
                  relative flex h-full
                  flex-col items-center
                  bg-white
                  px-7 py-12
                  text-center
                  shadow-[0_12px_40px_rgba(27,36,71,0.06)]
                  sm:px-10 sm:py-14
                "
              >
                {/* Marco exterior */}
                <div
                  className="
                    pointer-events-none
                    absolute inset-0
                    border border-[#B7CAE7]
                  "
                />

                {/* Marco interior */}
                <div
                  className="
                    pointer-events-none
                    absolute inset-[7px]
                    border border-[#D4E6FF]
                  "
                />

                {/* Icono */}
                <div
                  className="
                    relative z-10 mb-7
                    flex h-20 w-20
                    items-center justify-center
                    rounded-full
                    border border-[#B7CAE7]
                    bg-[#F6F9FF]
                  "
                >
                  <Icono
                    size={34}
                    strokeWidth={1.25}
                    className="text-[#294285]"
                  />
                </div>

                {/* Tipo de evento */}
                <p
                  className="
                    relative z-10 mb-4
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-[0.25em]
                    text-[#294285]
                    sm:text-xs
                  "
                >
                  {evento.subtitulo}
                </p>

                {/* Hora */}
                <div
                  className="
                    relative z-10 mb-6
                    flex items-center
                    justify-center gap-2
                  "
                >
                  <Clock3
                    size={17}
                    strokeWidth={1.5}
                    className="text-[#4169E1]"
                  />

                  <span
                    className="
                      font-['Playfair_Display']
                      text-2xl
                      text-[#111111]
                      sm:text-3xl
                    "
                  >
                    {evento.hora}
                  </span>
                </div>

                {/* Separador */}
                <div
                  className="
                    relative z-10 mb-7
                    h-px w-20
                    bg-[#B7CAE7]
                  "
                />

                {/* Nombre del lugar */}
                <h3
                  className="
                    relative z-10 mb-5
                    min-h-[65px]
                    font-['Playfair_Display']
                    text-[25px]
                    font-normal
                    leading-snug
                    text-[#111111]
                    sm:text-[28px]
                  "
                >
                  {evento.titulo}
                </h3>

                {/* Dirección */}
                <div
                  className="
                    relative z-10 mb-9
                    flex items-start
                    justify-center gap-2
                  "
                >
                  <MapPin
                    size={18}
                    strokeWidth={1.5}
                    className="
                      mt-1 shrink-0
                      text-[#294285]
                    "
                  />

                  <p
                    className="
                      max-w-[310px]
                      text-sm
                      leading-[1.8]
                      text-[#444444]
                    "
                  >
                    {evento.direccion}
                  </p>
                </div>

                {/* Botón Maps */}
                <a
                  href={evento.ubicacion}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    relative z-10
                    mt-auto
                    inline-flex
                    min-h-[50px]
                    items-center
                    justify-center
                    gap-3
                    rounded-full
                    bg-[#1B2447]
                    px-8 py-3.5
                    text-xs
                    font-medium
                    uppercase
                    tracking-[0.13em]
                    text-white
                    shadow-[0_8px_22px_rgba(27,36,71,0.16)]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-[#294285]
                    focus-visible:outline
                    focus-visible:outline-2
                    focus-visible:outline-offset-4
                    focus-visible:outline-[#4169E1]
                  "
                >
                  Ver ubicación

                  <ArrowUpRight
                    size={17}
                    strokeWidth={1.7}
                  />
                </a>
              </motion.article>
            );
          })}
        </div>

        {/* Frase inferior */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            duration: 1,
            delay: 0.3,
          }}
          viewport={{ once: true }}
          className="
            mt-14 flex flex-col
            items-center text-center
          "
        >
          <Heart
            size={14}
            fill="#4169E1"
            className="mb-5 text-[#4169E1]"
          />

          <p
            className="
              font-['Playfair_Display']
              text-lg italic
              text-[#294285]
              sm:text-xl
            "
          >
            ¡Te esperamos para celebrar nuestro amor!
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Celebracion;
