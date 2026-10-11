
import React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Shirt,
  Sparkles,
  Users,
} from "lucide-react";

const Vestimenta = () => {
  return (
    <section
      id="vestimenta"
      className="
        relative isolate w-full
        overflow-hidden
        bg-[#1B2447]
        px-5 py-20
        sm:px-6 sm:py-28
      "
    >
      {/* Decoración de las esquinas */}
      <div
        className="
          pointer-events-none absolute
          left-5 top-5
          h-24 w-24
          border-l border-t
          border-[#A5CFFA]/40
          sm:left-10 sm:top-10
          sm:h-40 sm:w-40
        "
      />

      <div
        className="
          pointer-events-none absolute
          bottom-5 right-5
          h-24 w-24
          border-b border-r
          border-[#A5CFFA]/40
          sm:bottom-10 sm:right-10
          sm:h-40 sm:w-40
        "
      />

      <div
        className="
          relative z-10 mx-auto
          max-w-4xl text-center
        "
      >
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.85,
            ease: "easeOut",
          }}
          viewport={{ once: true }}
        >
          <p
            className="
              mb-5 text-[11px]
              uppercase tracking-[0.32em]
              text-[#D4E6FF]
              sm:text-xs
            "
          >
            Nuestro gran día
          </p>

          <h2
            className="
              font-['Playfair_Display']
              text-[clamp(2.5rem,6vw,4rem)]
              font-normal
              leading-tight
              text-white
            "
          >
            Código de Vestimenta
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
                h-px w-16
                bg-[#A5CFFA]/70
              "
            />

            <Heart
              size={13}
              fill="#A5CFFA"
              className="text-[#A5CFFA]"
            />

            <span
              className="
                h-px w-16
                bg-[#A5CFFA]/70
              "
            />
          </div>
        </motion.div>

        {/* Vestimenta */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.15,
          }}
          viewport={{ once: true }}
          className="
            mx-auto mt-10
            max-w-2xl
          "
        >
          <div
            className="
              mx-auto mb-7
              flex h-20 w-20
              items-center justify-center
              rounded-full
              border border-[#A5CFFA]/50
              bg-white/5
            "
          >
            <Shirt
              size={34}
              strokeWidth={1.2}
              className="text-[#D4E6FF]"
            />
          </div>

          <h3
            className="
              font-['Playfair_Display']
              text-[clamp(2.4rem,7vw,4rem)]
              font-normal
              text-white
            "
          >
            Formal casual
          </h3>

          <p
            className="
              mx-auto mt-6
              max-w-lg
              font-['Playfair_Display']
              text-base
              leading-[1.9]
              text-white/85
              sm:text-lg
            "
          >
            Nos encantará que nos acompañes
            con un estilo elegante y cómodo
            para celebrar este día tan especial.
          </p>
        </motion.div>

        {/* Separador central */}
        <div
          className="
            mx-auto my-12
            flex items-center
            justify-center gap-4
          "
        >
          <span className="h-px w-20 bg-[#A5CFFA]/40" />

          <Sparkles
            size={17}
            strokeWidth={1.3}
            className="text-[#A5CFFA]"
          />

          <span className="h-px w-20 bg-[#A5CFFA]/40" />
        </div>

        {/* Detalle final */}
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
            items-center
          "
        >
          <Heart
            size={14}
            fill="#A5CFFA"
            className="text-[#A5CFFA]"
          />

          <p
            className="
              mt-4
              font-['Playfair_Display']
              text-sm italic
              tracking-wide
              text-[#D4E6FF]
            "
          >
            Con amor, Blanca & Luis
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Vestimenta;
