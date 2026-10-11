
"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Music2,
  Pause,
  Play,
  Volume2,
  VolumeX,
  X,
  Heart,
} from "lucide-react";

const Musica = () => {
  const audioRef = useRef(null);

  const [mostrarModal, setMostrarModal] = useState(true);
  const [reproduciendo, setReproduciendo] = useState(false);
  const [silenciado, setSilenciado] = useState(false);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.45;

    const onPlaying = () => {
      setReproduciendo(true);
      setCargando(false);
    };

    const onPause = () => {
      setReproduciendo(false);
      setCargando(false);
    };

    const onReady = () => setCargando(false);

    const onError = () => {
      setCargando(false);
      setReproduciendo(false);
    };

    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("canplay", onReady);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("canplay", onReady);
      audio.removeEventListener("error", onError);
    };
  }, []);

  const reproducirMusica = async () => {
    const audio = audioRef.current;
    if (!audio || cargando) return;

    try {
      setCargando(true);
      audio.muted = false;
      setSilenciado(false);
      await audio.play();
      setMostrarModal(false);
    } catch (error) {
      console.error("No se pudo reproducir música:", error);
      setCargando(false);
    }
  };

  const continuarSinMusica = () => {
    const audio = audioRef.current;

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    setReproduciendo(false);
    setCargando(false);
    setMostrarModal(false);
  };

  const alternarReproduccion = async () => {
    const audio = audioRef.current;
    if (!audio || cargando) return;

    if (audio.paused) {
      try {
        setCargando(true);
        await audio.play();
      } catch (error) {
        console.error("No se pudo reproducir música:", error);
        setCargando(false);
      }
    } else {
      audio.pause();
    }
  };

  const alternarSilencio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !audio.muted;
    setSilenciado(audio.muted);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/musica.mp3"
        loop
        preload="auto"
      />

      <AnimatePresence>
        {mostrarModal && (
          <motion.div
            className="
              fixed inset-0 z-[9999]
              flex items-center justify-center
              bg-black/70
              px-4 py-3
              backdrop-blur-sm
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="musica-titulo"
              className="
                relative
                flex w-full max-w-[380px]
                max-h-[calc(100dvh-24px)]
                flex-col
                overflow-hidden
                border border-[#A5CFFA]/50
                bg-[#1B2447]
                text-center text-white
                shadow-[0_20px_60px_rgba(0,0,0,0.35)]
              "
              initial={{
                opacity: 0,
                y: 20,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 15,
                scale: 0.96,
              }}
              transition={{ duration: 0.4 }}
            >
              {/* Marco decorativo */}
              <div
                className="
                  pointer-events-none
                  absolute inset-[7px]
                  border border-white/20
                "
              />

              {/* Botón cerrar */}
              <button
                type="button"
                onClick={continuarSinMusica}
                aria-label="Cerrar ventana"
                className="
                  absolute right-4 top-4 z-30
                  flex h-8 w-8
                  items-center justify-center
                  rounded-full
                  border border-white/30
                  bg-[#1B2447]
                  text-white
                "
              >
                <X size={16} />
              </button>

              {/* Contenido desplazable */}
              <div
                className="
                  relative z-10
                  min-h-0 overflow-y-auto
                  overscroll-contain
                  px-6 py-7
                  sm:px-9 sm:py-9
                "
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <p
                  className="
                    mb-3 text-[10px]
                    uppercase tracking-[0.3em]
                    text-[#D4E6FF]
                  "
                >
                  Nuestra boda
                </p>

                <h2
                  className="
                    font-['Playfair_Display']
                    text-[32px]
                    leading-tight text-white
                    sm:text-[38px]
                  "
                >
                  Blanca
                  <span
                    className="
                      mx-2
                      font-['Cedarville_Cursive']
                      text-[27px]
                      text-[#A5CFFA]
                    "
                  >
                    &
                  </span>
                  Luis
                </h2>

                {/* Separador */}
                <div className="my-4 flex items-center justify-center gap-3">
                  <span className="h-px w-12 bg-[#A5CFFA]/60" />
                  <Heart
                    size={11}
                    fill="#A5CFFA"
                    className="text-[#A5CFFA]"
                  />
                  <span className="h-px w-12 bg-[#A5CFFA]/60" />
                </div>

                {/* Icono */}
                <motion.div
                  className="
                    mx-auto mb-4
                    flex h-[65px] w-[65px]
                    items-center justify-center
                    rounded-full
                    border border-[#A5CFFA]/60
                    bg-white/5
                  "
                  animate={{
                    scale: [1, 1.04, 1],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Music2
                    size={27}
                    strokeWidth={1.3}
                    className="text-[#D4E6FF]"
                  />
                </motion.div>

                <p
                  className="
                    mb-2 text-[9px]
                    uppercase tracking-[0.23em]
                    text-[#A5CFFA]
                  "
                >
                  Una experiencia especial
                </p>

                <h3
                  id="musica-titulo"
                  className="
                    mb-3
                    font-['Playfair_Display']
                    text-[23px]
                    leading-snug
                    text-white
                  "
                >
                  Música para acompañarte
                </h3>

                <p
                  className="
                    mx-auto mb-5
                    max-w-[280px]
                    text-[12px]
                    leading-[1.7]
                    text-white/80
                  "
                >
                  Hemos elegido una melodía especial
                  para acompañarte mientras descubres
                  nuestra invitación.
                </p>

                {/* Botones */}
                <div className="flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={reproducirMusica}
                    disabled={cargando}
                    className="
                      flex w-full items-center
                      justify-center gap-2
                      rounded-full
                      bg-[#D4E6FF]
                      px-4 py-3
                      text-[11px] font-medium
                      uppercase tracking-[0.12em]
                      text-black
                      transition
                      hover:bg-white
                      disabled:opacity-60
                    "
                  >
                    {cargando ? (
                      <>
                        <span
                          className="
                            h-4 w-4 animate-spin
                            rounded-full border-2
                            border-[#1B2447]/30
                            border-t-[#1B2447]
                          "
                        />
                        Cargando
                      </>
                    ) : (
                      <>
                        <Play size={15} fill="currentColor" />
                        Escuchar música
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={continuarSinMusica}
                    className="
                      w-full rounded-full
                      border border-white/40
                      px-4 py-3
                      text-[11px]
                      uppercase tracking-[0.12em]
                      text-white
                      transition
                      hover:bg-white/10
                    "
                  >
                    Continuar sin música
                  </button>
                </div>

                <p
                  className="
                    mt-5
                    font-['Playfair_Display']
                    text-[11px] italic
                    text-[#D4E6FF]/80
                  "
                >
                  Con amor, Blanca & Luis
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controles flotantes */}
      <AnimatePresence>
        {!mostrarModal && (
          <motion.div
            className="
              fixed bottom-5 right-5
              z-[9998]
              flex items-center gap-1
              rounded-full
              border border-[#A5CFFA]/50
              bg-[#1B2447]
              p-1.5
              shadow-[0_10px_35px_rgba(0,0,0,0.25)]
            "
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 15,
            }}
          >
            <button
              type="button"
              onClick={alternarReproduccion}
              disabled={cargando}
              aria-label={
                reproduciendo
                  ? "Pausar música"
                  : "Reproducir música"
              }
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-full
                bg-[#D4E6FF]
                text-[#1B2447]
                transition
                hover:bg-white
                disabled:opacity-60
              "
            >
              {cargando ? (
                <span
                  className="
                    h-4 w-4 animate-spin
                    rounded-full border-2
                    border-[#1B2447]/30
                    border-t-[#1B2447]
                  "
                />
              ) : reproduciendo ? (
                <Pause size={17} fill="currentColor" />
              ) : (
                <Play size={17} fill="currentColor" />
              )}
            </button>

            <button
              type="button"
              onClick={alternarSilencio}
              aria-label={
                silenciado
                  ? "Activar sonido"
                  : "Silenciar música"
              }
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-full
                text-[#D4E6FF]
                transition
                hover:bg-white/10
              "
            >
              {silenciado ? (
                <VolumeX size={19} />
              ) : (
                <Volume2 size={19} />
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Musica;
