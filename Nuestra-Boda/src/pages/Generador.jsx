
import React, { useState } from "react";
import {
  Heart,
  Users,
  UserRound,
  Link2,
  Copy,
  Check,
  MessageCircle,
  RefreshCw,
  ExternalLink,
} from "lucide-react";

const MAX_PASES = 100;

// Codifica los datos en Base64 URL-safe.
// Compatible con Confirmacion.jsx.
const crearId = (nombre, pases) => {
  const datos = JSON.stringify({ nombre, pases });

  const invertido = datos.split("").reverse().join("");

  const bytes = new TextEncoder().encode(invertido);

  let binario = "";

  bytes.forEach((byte) => {
    binario += String.fromCharCode(byte);
  });

  return btoa(binario)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
};

const crearMensaje = (nombre, pases, enlace) => {
  const lugares =
    pases === 1 ? "1 lugar" : `${pases} lugares`;

  return `💍 *¡NOS CASAMOS!* 💍

Hola, ${nombre} 🤍

Con mucha alegría queremos compartir contigo uno de los momentos más importantes de nuestras vidas.

Nos encantaría que nos acompañaras a celebrar nuestra boda.

📅 *26 de febrero de 2027*

🎟️ *Hemos reservado para ti:*
${lugares}

✨ *Tu invitación personalizada:*
${enlace}

Dentro de la invitación encontrarás todos los detalles de nuestra celebración y podrás confirmar tu asistencia.

Tu presencia hará este día aún más especial.

Con mucho cariño,
*Blanca & Luis* 🤍`;
};

export default function Generador() {
  const [nombre, setNombre] = useState("");
  const [pases, setPases] = useState("1");
  const [link, setLink] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [linkCopiado, setLinkCopiado] = useState(false);
  const [mensajeCopiado, setMensajeCopiado] =
    useState(false);

  const limpiarResultado = () => {
    setLink("");
    setMensaje("");
    setError("");
    setLinkCopiado(false);
    setMensajeCopiado(false);
  };

  const generarInvitacion = (e) => {
    e.preventDefault();

    const nombreLimpio = nombre.trim();
    const numeroPases = Number(pases);

    if (!nombreLimpio) {
      setError("Escribe el nombre del invitado o familia.");
      return;
    }

    if (nombreLimpio.length > 120) {
      setError("El nombre no debe superar 120 caracteres.");
      return;
    }

    if (
      !Number.isInteger(numeroPases) ||
      numeroPases < 1 ||
      numeroPases > MAX_PASES
    ) {
      setError(
        `Ingresa una cantidad entre 1 y ${MAX_PASES} pases.`
      );
      return;
    }

    try {
      const id = crearId(nombreLimpio, numeroPases);

      const url = new URL("/", window.location.origin);
      url.searchParams.set("id", id);

      const enlace = url.toString();

      setLink(enlace);
      setMensaje(
        crearMensaje(nombreLimpio, numeroPases, enlace)
      );

      setError("");
      setLinkCopiado(false);
      setMensajeCopiado(false);
    } catch (err) {
      console.error(err);
      setError("No fue posible generar la invitación.");
    }
  };

  const copiarTexto = async (texto, tipo) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(texto);
      } else {
        const campo = document.createElement("textarea");
        campo.value = texto;
        campo.style.position = "fixed";
        campo.style.opacity = "0";

        document.body.appendChild(campo);
        campo.select();

        const copiado = document.execCommand("copy");

        document.body.removeChild(campo);

        if (!copiado) {
          throw new Error("No se pudo copiar");
        }
      }

      if (tipo === "link") {
        setLinkCopiado(true);
      } else {
        setMensajeCopiado(true);
      }

      setError("");
    } catch (err) {
      console.error(err);
      setError(
        "No se pudo copiar automáticamente. " +
          "Selecciona el texto y cópialo manualmente."
      );
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#F8FAFF] px-4 py-10 text-[#111111] sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">

        {/* ENCABEZADO */}
        <header className="mb-12 text-center">
          <p className="mb-4 text-[11px] uppercase tracking-[0.32em] text-[#294285]">
            Blanca & Luis
          </p>

          <h1 className="font-['Playfair_Display'] text-3xl font-normal sm:text-5xl">
            Generador de Invitaciones
          </h1>

          <div className="my-6 flex items-center justify-center gap-4">
            <span className="h-px w-14 bg-[#294285]/50" />

            <Heart
              size={14}
              fill="#4169E1"
              className="text-[#4169E1]"
            />

            <span className="h-px w-14 bg-[#294285]/50" />
          </div>

          <p className="text-sm text-[#555555] sm:text-base">
            Crea enlaces personalizados y mensajes
            listos para enviar por WhatsApp.
          </p>
        </header>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">

          {/* COLUMNA IZQUIERDA */}
          <div className="space-y-7">

            {/* FORMULARIO */}
            <form
              onSubmit={generarInvitacion}
              className="border border-[#B7CAE7] bg-white p-6 shadow-[0_12px_35px_rgba(27,36,71,0.05)] sm:p-8"
            >
              <div className="mb-7 flex items-center gap-3">
                <UserRound
                  size={22}
                  className="text-[#294285]"
                />

                <h2 className="font-['Playfair_Display'] text-2xl">
                  Datos del invitado
                </h2>
              </div>

              <label
                htmlFor="generador-nombre"
                className="mb-2 block text-xs uppercase tracking-[0.15em] text-[#294285]"
              >
                Nombre o familia
              </label>

              <input
                id="generador-nombre"
                type="text"
                value={nombre}
                maxLength={120}
                onChange={(e) => {
                  setNombre(e.target.value);
                  limpiarResultado();
                }}
                placeholder="Ej. Familia Hernández"
                className="mb-6 w-full border border-[#C9D9F0] bg-[#F8FAFF] px-4 py-4 text-[#111111] outline-none focus:border-[#4169E1]"
              />

              <label
                htmlFor="generador-pases"
                className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-[#294285]"
              >
                <Users size={15} />
                Pases asignados
              </label>

              <input
                id="generador-pases"
                type="number"
                min="1"
                max={MAX_PASES}
                step="1"
                value={pases}
                onChange={(e) => {
                  setPases(e.target.value);
                  limpiarResultado();
                }}
                className="w-full border border-[#C9D9F0] bg-[#F8FAFF] px-4 py-4 text-[#111111] outline-none focus:border-[#4169E1]"
              />

              <p className="mt-3 text-xs text-[#666666]">
                Esta cantidad será el límite de personas
                que podrán confirmar.
              </p>

              {error && (
                <p
                  role="alert"
                  className="mt-5 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="mt-7 flex w-full items-center justify-center gap-3 bg-[#1B2447] px-6 py-4 text-white transition hover:bg-[#294285]"
              >
                <Link2 size={19} />
                Generar invitación
              </button>
            </form>

            {/* ENLACE PERSONALIZADO */}
            {link && (
              <section className="border border-[#B7CAE7] bg-white p-6 sm:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <Link2
                    size={21}
                    className="text-[#294285]"
                  />

                  <h2 className="font-['Playfair_Display'] text-2xl">
                    Enlace personalizado
                  </h2>
                </div>

                <p className="mb-5 text-sm leading-6 text-[#555555]">
                  Copia únicamente el enlace,
                  sin incluir el mensaje de WhatsApp.
                </p>

                <div className="break-all border border-[#C9D9F0] bg-[#F6F9FF] p-4 text-xs leading-6 text-[#294285]">
                  {link}
                </div>

                <button
                  type="button"
                  onClick={() => copiarTexto(link, "link")}
                  className="mt-4 flex w-full items-center justify-center gap-2 border border-[#1B2447] px-5 py-3.5 text-sm text-[#1B2447] transition hover:bg-[#F6F9FF]"
                >
                  {linkCopiado ? (
                    <>
                      <Check size={18} />
                      Enlace copiado
                    </>
                  ) : (
                    <>
                      <Copy size={18} />
                      Copiar solo el enlace
                    </>
                  )}
                </button>

                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center gap-2 text-sm text-[#294285] underline underline-offset-4"
                >
                  Probar invitación
                  <ExternalLink size={15} />
                </a>
              </section>
            )}
          </div>

          {/* COLUMNA DERECHA */}
          <div className="space-y-7">

            {/* PORTADA */}
            <section className="border border-[#B7CAE7] bg-white p-5 shadow-[0_12px_35px_rgba(27,36,71,0.05)] sm:p-7">
              <p className="mb-4 text-center text-xs uppercase tracking-[0.2em] text-[#294285]">
                Vista previa de la invitación
              </p>

              <div className="relative mx-auto aspect-[3/4] max-w-[350px] overflow-hidden bg-[#D4E6FF]">
                <img
                  src="/portada.jpg"
                  alt="Portada de Blanca y Luis"
                  className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
                />

                <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/60 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#1B2447]/75 to-transparent" />

                <div className="absolute inset-0 flex flex-col items-center justify-between px-4 py-9 text-center">
                  <h3 className="font-['Playfair_Display'] text-3xl text-[#1B2447] drop-shadow-[0_1px_3px_rgba(255,255,255,0.9)] sm:text-4xl">
                    Blanca & Luis
                  </h3>

                  <p className="font-['Playfair_Display'] text-sm tracking-[0.15em] text-white">
                    26 · FEBRERO · 2027
                  </p>
                </div>
              </div>
            </section>

            {/* MENSAJE DE WHATSAPP */}
            {link && (
              <section className="border border-[#B7CAE7] bg-white p-5 sm:p-7">
                <div className="mb-4 flex items-center gap-3">
                  <MessageCircle
                    size={22}
                    className="text-[#294285]"
                  />

                  <h2 className="font-['Playfair_Display'] text-2xl">
                    Mensaje de WhatsApp
                  </h2>
                </div>

                <p className="mb-5 text-sm leading-6 text-[#555555]">
                  El mensaje incluye el nombre,
                  los pases y el enlace personalizado.
                  Puedes editarlo antes de copiarlo.
                </p>

                <label
                  htmlFor="mensaje-whatsapp"
                  className="mb-2 block text-xs uppercase tracking-[0.15em] text-[#294285]"
                >
                  Editar mensaje
                </label>

                <textarea
                  id="mensaje-whatsapp"
                  value={mensaje}
                  onChange={(e) => {
                    setMensaje(e.target.value);
                    setMensajeCopiado(false);
                  }}
                  rows={13}
                  className="w-full resize-y border border-[#C9D9F0] bg-[#F8FAFF] p-4 text-sm leading-6 text-[#111111] outline-none focus:border-[#4169E1]"
                />

                <button
                  type="button"
                  onClick={() =>
                    copiarTexto(mensaje, "mensaje")
                  }
                  className="mt-4 flex w-full items-center justify-center gap-3 bg-[#1B2447] px-5 py-4 text-sm text-white transition hover:bg-[#294285]"
                >
                  {mensajeCopiado ? (
                    <>
                      <Check size={18} />
                      Mensaje copiado
                    </>
                  ) : (
                    <>
                      <Copy size={18} />
                      Copiar mensaje completo
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMensaje(
                      crearMensaje(
                        nombre.trim(),
                        Number(pases),
                        link
                      )
                    );
                    setMensajeCopiado(false);
                  }}
                  className="mt-3 flex w-full items-center justify-center gap-2 py-2 text-sm text-[#294285]"
                >
                  <RefreshCw size={15} />
                  Restaurar mensaje original
                </button>

                {/* VISTA PREVIA */}
                <div className="mt-8">
                  <p className="mb-4 text-center text-xs uppercase tracking-[0.2em] text-[#294285]">
                    Vista previa del mensaje
                  </p>

                  <div className="rounded-2xl bg-[#EFEAE2] p-4 sm:p-5">
                    <div className="ml-auto max-w-[95%] rounded-xl rounded-tr-sm bg-[#D9FDD3] px-4 py-3 shadow-sm">
                      <p className="whitespace-pre-wrap break-words text-[13px] leading-[1.7] text-[#1D2733]">
                        {mensaje}
                      </p>

                      <p className="mt-3 text-right text-[10px] text-[#66746A]">
                        Vista previa
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>

        <footer className="mt-14 text-center">
          <Heart
            size={15}
            fill="#4169E1"
            className="mx-auto mb-4 text-[#4169E1]"
          />

          <p className="font-['Playfair_Display'] text-lg italic text-[#294285]">
            Blanca & Luis
          </p>
        </footer>
      </div>
    </main>
  );
}
