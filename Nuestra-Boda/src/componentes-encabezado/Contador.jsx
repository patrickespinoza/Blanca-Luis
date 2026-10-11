
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

// Paleta Blanca & Luis
const COLORS = {
  blanco: "#FFFFFF",
  azulPalido: "#D4E6FF",
  azulClaro: "#A5CFFA",
  azulRoyal: "#4169E1",
  azulMedio: "#294285",
  azulOscuro: "#1B2447",
  negro: "#111111",
};

const obtenerTiempo = (fecha) => {
  const diferencia = new Date(fecha).getTime() - Date.now();

  if (!Number.isFinite(diferencia) || diferencia <= 0) {
    return {
      dias: 0,
      horas: 0,
      minutos: 0,
      segundos: 0,
    };
  }

  return {
    dias: Math.floor(diferencia / 86400000),
    horas: Math.floor((diferencia / 3600000) % 24),
    minutos: Math.floor((diferencia / 60000) % 60),
    segundos: Math.floor((diferencia / 1000) % 60),
  };
};

const Contador = ({
  titulo = "Nuestro Gran Día",
  texto = "Cada segundo nos acerca al comienzo de nuestra historia juntos.",
  frase = "El inicio de una eternidad juntos",
  fecha = "2027-02-26T16:10:00-06:00",
}) => {
  const [tiempo, setTiempo] = useState(() =>
    obtenerTiempo(fecha)
  );

  const [finalizado, setFinalizado] = useState(
    () => new Date(fecha).getTime() <= Date.now()
  );

  useEffect(() => {
    const actualizar = () => {
      setTiempo(obtenerTiempo(fecha));

      const objetivo = new Date(fecha).getTime();

      setFinalizado(
        Number.isFinite(objetivo) && Date.now() >= objetivo
      );
    };

    actualizar();

    const intervalo = window.setInterval(actualizar, 1000);

    return () => window.clearInterval(intervalo);
  }, [fecha]);

  const unidades = [
    { nombre: "DÍAS", valor: tiempo.dias },
    { nombre: "HORAS", valor: tiempo.horas },
    { nombre: "MINUTOS", valor: tiempo.minutos },
    { nombre: "SEGUNDOS", valor: tiempo.segundos },
  ];

  return (
    <section
      id="contador"
      className="
        relative isolate w-full
        overflow-hidden
        bg-white
        px-4 py-20
        sm:px-6 sm:py-28
      "
    >
      {/* Decoración superior */}
      <div
        className="
          pointer-events-none absolute
          left-0 top-0
          h-32 w-32
          border-l-[3px] border-t-[3px]
          border-[#D4E6FF]
          opacity-70
          sm:h-44 sm:w-44
        "
      />

      <div
        className="
          pointer-events-none absolute
          left-4 top-4
          h-20 w-20
          border-l border-t
          border-[#4169E1]/30
          sm:h-32 sm:w-32
        "
      />

      {/* Decoración inferior */}
      <div
        className="
          pointer-events-none absolute
          bottom-0 right-0
          h-32 w-32
          border-b-[3px] border-r-[3px]
          border-[#D4E6FF]
          opacity-70
          sm:h-44 sm:w-44
        "
      />

      <div
        className="
          pointer-events-none absolute
          bottom-4 right-4
          h-20 w-20
          border-b border-r
          border-[#4169E1]/30
          sm:h-32 sm:w-32
        "
      />

      <div className="relative z-10 mx-auto max-w-5xl">

        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center"
        >


          <h2
            className="
              font-['Playfair_Display']
              text-[clamp(2.3rem,6vw,4rem)]
              font-normal
              leading-tight
              text-[#111111]
            "
          >
            {titulo}
          </h2>

          {/* Separador */}
          <div
            className="
              my-7 flex items-center
              justify-center gap-4
            "
          >
            <span className="h-px w-14 bg-[#294285]/60 sm:w-24" />

            <Heart
              size={13}
              fill={COLORS.azulRoyal}
              className="text-[#4169E1]"
            />

            <span className="h-px w-14 bg-[#294285]/60 sm:w-24" />
          </div>

          <p
            className="
              mx-auto max-w-xl
              font-['Playfair_Display']
              text-[15px]
              leading-[1.9]
              text-[#333333]
              sm:text-lg
            "
          >
            {texto}
          </p>
        </motion.div>

        {/* Cuenta regresiva */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            delay: 0.15,
            ease: "easeOut",
          }}
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto mt-12 max-w-3xl sm:mt-16"
        >
          {!finalizado ? (
            <div
              className="
                grid grid-cols-4
                gap-2 sm:gap-5
              "
            >
              {unidades.map((unidad, index) => (
                <motion.div
                  key={unidad.nombre}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                  }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center"
                >
                  <div
                    className="
                      flex aspect-[0.85]
                      w-full flex-col
                      items-center justify-center
                      gap-2
                      rounded-t-full
                      rounded-b-[5px]
                      border border-[#B7CAE7]
                      bg-[#F6F9FF]
                      px-1
                      shadow-[0_8px_25px_rgba(27,36,71,0.04)]
                      sm:gap-4
                    "
                  >
                    <span
                      className="
                        font-['Playfair_Display']
                        text-[clamp(1.6rem,5.5vw,3.5rem)]
                        font-normal
                        leading-none
                        tabular-nums
                        text-[#111111]
                      "
                    >
                      {String(unidad.valor).padStart(2, "0")}
                    </span>

                    <span
                      className="
                        text-[8px]
                        font-medium
                        uppercase
                        tracking-[0.06em]
                        text-[#294285]
                        sm:text-[11px]
                        sm:tracking-[0.2em]
                      "
                    >
                      {unidad.nombre}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="
                border-y border-[#B7CAE7]
                px-4 py-10 text-center
              "
            >
              <Heart
                size={25}
                fill={COLORS.azulRoyal}
                className="mx-auto mb-5 text-[#4169E1]"
              />

              <h3
                className="
                  font-['Playfair_Display']
                  text-3xl
                  text-[#111111]
                  sm:text-4xl
                "
              >
                ¡Llegó nuestro gran día!
              </h3>

              <p
                className="
                  mt-4 text-sm
                  text-[#294285]
                  sm:text-base
                "
              >
                Gracias por ser parte de nuestra historia.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Pie de sección */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.35 }}
          viewport={{ once: true }}
          className="
            mt-12 flex flex-col
            items-center text-center
            sm:mt-14
          "
        >
          <Heart
            size={13}
            fill={COLORS.azulRoyal}
            className="mb-5 text-[#4169E1]"
          />

          <p
            className="
              font-['Playfair_Display']
              text-[12px]
              uppercase
              tracking-[0.18em]
              text-[#1B2447]
              sm:text-sm
              sm:tracking-[0.28em]
            "
          >
            {frase}
          </p>

          <div
            className="
              mt-6 h-px w-16
              bg-[#294285]/40
            "
          />

   
        </motion.div>
      </div>
    </section>
  );
};

export default Contador;
