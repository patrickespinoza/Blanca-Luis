
import React from "react";
import { motion } from "framer-motion";
import { Gift, Heart, Sparkles } from "lucide-react";

const Regalos = () => {
  return (
    <section
      id="regalos"
      className="
        relative isolate w-full
        overflow-hidden
        bg-[#F8FAFF]
        px-5 py-20
        sm:px-6 sm:py-28
      "
    >
      {/* Decoración superior izquierda */}
      <div
        className="
          pointer-events-none
          absolute left-0 top-0
          h-32 w-32
          border-l-2 border-t-2
          border-[#D4E6FF]
          sm:h-44 sm:w-44
        "
      />

      {/* Decoración inferior derecha */}
      <div
        className="
          pointer-events-none
          absolute bottom-0 right-0
          h-32 w-32
          border-b-2 border-r-2
          border-[#D4E6FF]
          sm:h-44 sm:w-44
        "
      />

      <motion.div
        initial={{
          opacity: 0,
          y: 35,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.85,
          ease: [0.22, 1, 0.36, 1],
        }}
        viewport={{ once: true }}
        className="
          relative z-10
          mx-auto max-w-3xl
          bg-white
          px-7 py-14
          text-center
          shadow-[0_15px_45px_rgba(27,36,71,0.06)]
          sm:px-14 sm:py-20
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
            absolute inset-[8px]
            border border-[#D4E6FF]
          "
        />

        {/* Contenido */}
        <div className="relative z-10">

          {/* Encabezado */}
          <p
            className="
              mb-5
              text-[10px]
              font-medium
              uppercase
              tracking-[0.32em]
              text-[#294285]
              sm:text-xs
            "
          >
            Con mucho cariño
          </p>

          <h2
            className="
              font-['Playfair_Display']
              text-[clamp(2.4rem,6vw,4rem)]
              font-normal
              leading-tight
              text-[#111111]
            "
          >
            Mesa de Regalos
          </h2>

          {/* Separador */}
          <div
            className="
              my-7 flex items-center
              justify-center gap-4
            "
          >
            <span
              className="
                h-px w-14
                bg-[#294285]/60
              "
            />

            <Heart
              size={13}
              fill="#4169E1"
              className="text-[#4169E1]"
            />

            <span
              className="
                h-px w-14
                bg-[#294285]/60
              "
            />
          </div>

          {/* Icono de regalo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.7,
              delay: 0.15,
            }}
            viewport={{ once: true }}
            className="
              mx-auto mb-9
              flex h-24 w-24
              items-center justify-center
              rounded-full
              border border-[#B7CAE7]
              bg-[#F6F9FF]
            "
          >
            <Gift
              size={39}
              strokeWidth={1.2}
              className="text-[#294285]"
            />
          </motion.div>

          {/* Mensaje principal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
            viewport={{ once: true }}
          >
            <h3
              className="
                mx-auto max-w-lg
                font-['Playfair_Display']
                text-[25px]
                font-normal
                leading-[1.5]
                text-[#111111]
                sm:text-[32px]
              "
            >
              Tu presencia es nuestro
              <br className="hidden sm:block" />
              {" "}mejor regalo
            </h3>

            <p
              className="
                mx-auto mt-8
                max-w-xl
                font-['Playfair_Display']
                text-[16px]
                leading-[2]
                text-[#333333]
                sm:text-[18px]
              "
            >
              No contamos con mesa de regalos.
              Si deseas obsequiarnos algún detalle,
              será recibido con mucho cariño,
              pero no es obligatorio.
            </p>

            <div
              className="
                mx-auto my-9
                h-px w-20
                bg-[#B7CAE7]
              "
            />

            <p
              className="
                mx-auto max-w-md
                font-['Playfair_Display']
                text-base italic
                leading-[1.9]
                text-[#294285]
                sm:text-lg
              "
            >
              Lo más importante para nosotros
              es compartir este día tan especial contigo.
            </p>
          </motion.div>

          {/* Detalle final */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              duration: 1,
              delay: 0.35,
            }}
            viewport={{ once: true }}
            className="
              mt-12 flex flex-col
              items-center
            "
          >
            <Sparkles
              size={20}
              strokeWidth={1.3}
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
              Con amor,
            </p>

            <p
              className="
                mt-2
                font-['Playfair_Display']
                text-2xl
                text-[#111111]
                sm:text-3xl
              "
            >
              Blanca & Luis
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Regalos;
