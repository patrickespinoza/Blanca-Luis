
import React from "react";

export default function Portada() {
  return (
    <section
      className="
        relative w-full
        h-[100svh] min-h-[500px]
        overflow-hidden
        bg-[#1B2447]
      "
    >
      {/* Fotografía principal */}
      <img
        src="/portada.jpg"
        alt="Blanca y Luis"
        className="
          absolute inset-0
          h-full w-full
          object-cover
          object-[center_35%]
          sm:object-center
        "
      />

      {/* Sombra superior muy suave */}
      <div
        className="
          pointer-events-none
          absolute inset-x-0 top-0
          h-[32%]
          bg-gradient-to-b
          from-white/45
          via-white/15
          to-transparent
        "
      />

      {/* Sombra inferior para la fecha */}
      <div
        className="
          pointer-events-none
          absolute inset-x-0 bottom-0
          h-[30%]
          bg-gradient-to-t
          from-[#10182F]/75
          via-[#10182F]/20
          to-transparent
        "
      />

      {/* Nombres arriba */}
      <div
        className="
          absolute inset-x-0
          top-[7%] z-10
          flex flex-col
          items-center justify-center
          px-4 text-center
          sm:top-[9%]
        "
      >
        <h1
          className="
            font-['Playfair_Display']
            text-[#1B2447]
            text-[clamp(2.8rem,10vw,6rem)]
            font-normal
            leading-[1.1]
            tracking-[-0.035em]
          "
          style={{
            textShadow:
              "0 2px 12px rgba(255,255,255,0.85), 0 1px 2px rgba(255,255,255,0.9)",
          }}
        >
          Blanca
          <span
            className="
              mx-2 inline-block
              font-['Cedarville_Cursive']
              text-[0.65em]
              text-[#4169E1]
              sm:mx-4
            "
          >
            &
          </span>
          Luis
        </h1>
      </div>

      {/* Fecha abajo */}
      <div
        className="
          absolute inset-x-0
          bottom-[7%] z-10
          flex justify-center
          px-5
          sm:bottom-[9%]
        "
      >
        <div
          className="
            border-y border-white/70
            bg-[#1B2447]/35
            px-6 py-3
            backdrop-blur-[2px]
            sm:px-10
          "
        >
          <p
            className="
              font-['Playfair_Display']
              text-center
              text-[clamp(0.95rem,3.8vw,1.35rem)]
              font-normal
              uppercase
              tracking-[0.18em]
              text-white
              sm:tracking-[0.3em]
            "
            style={{
              textShadow:
                "0 2px 8px rgba(0,0,0,0.8)",
            }}
          >
            26 · Febrero  · 2027
          </p>
        </div>
      </div>
    </section>
  );
}
