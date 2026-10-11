import React from "react";
import { motion } from "framer-motion";

const ImagenFinal = () => {
  return (
    <section
      id="imagen-final"
      className="
        relative
        w-full
        h-[100svh]
        overflow-hidden
        bg-black
      "
    >
      {/* IMAGEN DE FONDO */}
      <img
        src="/final.jpg"
        alt="Blanca y Luis"
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          object-center
        "
      />

      {/* SOMBRA INFERIOR PARA LEGIBILIDAD */}
      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-[40%]
          bg-gradient-to-t
          from-black/60
          via-black/20
          to-transparent
          pointer-events-none
        "
      />

      {/* INICIALES */}
      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1.4,
          ease: "easeOut",
        }}
        viewport={{
          once: true,
        }}
        className="
          absolute
          bottom-[8%]
          left-0
          w-full
          flex
          items-center
          justify-center
          px-4
        "
      >
        <h2
          className="
            font-['Playfair_Display']
            text-white
            text-[clamp(3.5rem,12vw,7rem)]
            font-normal
            tracking-[0.08em]
            drop-shadow-[0_3px_12px_rgba(0,0,0,0.45)]
          "
        >
          B <span className="text-[0.6em]">&</span> L
        </h2>
      </motion.div>
    </section>
  );
};

export default ImagenFinal;