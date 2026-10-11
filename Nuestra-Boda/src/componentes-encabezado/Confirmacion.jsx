
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Users,
  UserRound,
  Check,
  X,
  Send,
} from "lucide-react";

const CONTACTOS = [
  {
    nombre: "Blanca",
    numero: "525540103130",
  },
  {
    nombre: "Luis",
    numero: "525545773145",
  },
];

// Decodificación Base64 URL-safe y UTF-8
const decodificarBase64 = (valor) => {
  try {
    let normalizado = valor
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    normalizado += "=".repeat(
      (4 - (normalizado.length % 4)) % 4
    );

    const binario = atob(normalizado);

    const bytes = Uint8Array.from(
      binario,
      (caracter) => caracter.charCodeAt(0)
    );

    return new TextDecoder("utf-8", {
      fatal: true,
    }).decode(bytes);
  } catch (error) {
    console.error("Error al decodificar:", error);
    return null;
  }
};

// Recupera el JSON invertido del generador
const decodificarDatos = (valor) => {
  const texto = decodificarBase64(valor);

  if (!texto) return null;

  const variantes = [
    texto.split("").reverse().join(""),
    texto,
  ];

  for (const variante of variantes) {
    try {
      const datos = JSON.parse(variante);

      if (
        datos &&
        typeof datos === "object" &&
        !Array.isArray(datos)
      ) {
        return datos;
      }
    } catch {
      // Probar siguiente variante
    }
  }

  return null;
};

// Lee los datos de la URL personalizada
const leerInvitacion = () => {
  const params = new URLSearchParams(
    window.location.search
  );

  // IMPORTANTE: el generador utiliza ?id=
  const token =
    params.get("id") ||
    params.get("data") ||
    params.get("d") ||
    params.get("invitacion");

  let datos = null;

  if (token) {
    datos = decodificarDatos(token);
  } else if (
    params.has("nombre") &&
    params.has("pases")
  ) {
    // Compatibilidad con enlaces anteriores
    datos = {
      nombre: params.get("nombre"),
      pases: params.get("pases"),
    };
  }

  if (!datos) {
    return {
      valida: false,
      nombre: "",
      pases: 0,
    };
  }

  const nombre = String(
    datos.nombre ?? datos.name ?? ""
  ).trim();

  const pases = Number(
    datos.pases ?? datos.pass ?? datos.cantidad
  );

  if (
    !nombre ||
    nombre.length > 120 ||
    !Number.isInteger(pases) ||
    pases < 1 ||
    pases > 100
  ) {
    return {
      valida: false,
      nombre: "",
      pases: 0,
    };
  }

  return {
    valida: true,
    nombre,
    pases,
  };
};

const Confirmacion = () => {
  const [invitacion, setInvitacion] = useState(
    () => leerInvitacion()
  );

  const [asistencia, setAsistencia] = useState("");
  const [confirmados, setConfirmados] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const actualizar = () => {
      setInvitacion(leerInvitacion());
      setAsistencia("");
      setConfirmados("");
      setMensaje("");
      setError("");
    };

    window.addEventListener("popstate", actualizar);

    return () => {
      window.removeEventListener("popstate", actualizar);
    };
  }, []);

  const seleccionarAsistencia = (opcion) => {
    setAsistencia(opcion);
    setError("");

    if (opcion === "no") {
      setConfirmados("");
    }
  };

  const enviarWhatsApp = (contacto) => {
    if (!invitacion.valida) {
      setError(
        "No encontramos los datos de tu invitación. " +
        "Solicita tu enlace personalizado a los novios."
      );
      return;
    }

    if (!asistencia) {
      setError(
        "Por favor, selecciona si asistirás o no."
      );
      return;
    }

    const cantidad = Number(confirmados);

    if (
      asistencia === "si" &&
      (
        !Number.isInteger(cantidad) ||
        cantidad < 1 ||
        cantidad > invitacion.pases
      )
    ) {
      setError(
        `Selecciona entre 1 y ${invitacion.pases} ` +
        "personas para confirmar."
      );
      return;
    }

    setError("");

    const lineas = [
      "💍 *CONFIRMACIÓN DE ASISTENCIA*",
      "*Boda de Blanca & Luis*",
      "",
      `👤 *Invitado:* ${invitacion.nombre}`,
      `🎟️ *Pases asignados:* ${invitacion.pases}`,
      "",
      asistencia === "si"
        ? "✅ *Asistencia:* Sí asistiré"
        : "❌ *Asistencia:* No podré asistir",
    ];

    if (asistencia === "si") {
      lineas.push(
        `👥 *Personas confirmadas:* ${cantidad}`
      );
    }

    if (mensaje.trim()) {
      lineas.push(
        "",
        "💌 *Mensaje para los novios:*",
        mensaje.trim()
      );
    }

    lineas.push(
      "",
      "Gracias por la invitación. 🤍"
    );

    const texto = lineas.join("\n");

    const url =
      `https://wa.me/${contacto.numero}` +
      `?text=${encodeURIComponent(texto)}`;

    // WhatsApp abre el mensaje preparado.
    // El invitado debe pulsar Enviar.
    window.location.href = url;
  };

  return (
    <section
      id="confirmacion"
      className="relative isolate w-full overflow-hidden bg-[#1B2447] px-4 py-20 sm:px-6 sm:py-28"
    >
      {/* Decoraciones */}
      <div className="pointer-events-none absolute left-5 top-5 h-28 w-28 border-l border-t border-[#A5CFFA]/40 sm:left-10 sm:top-10 sm:h-44 sm:w-44" />

      <div className="pointer-events-none absolute bottom-5 right-5 h-28 w-28 border-b border-r border-[#A5CFFA]/40 sm:bottom-10 sm:right-10 sm:h-44 sm:w-44" />

      <div className="relative z-10 mx-auto max-w-3xl">

        {/* ENCABEZADO */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85 }}
          viewport={{ once: true }}
          className="mb-11 text-center"
        >
          <p className="mb-5 text-xs uppercase tracking-[0.35em] text-[#D4E6FF]">
            RSVP
          </p>

          <h2 className="font-['Playfair_Display'] text-[clamp(2.4rem,6vw,4rem)] font-normal leading-tight text-white">
            Confirma tu Asistencia
          </h2>

          <div className="my-7 flex items-center justify-center gap-4">
            <span className="h-px w-16 bg-[#A5CFFA]/70" />

            <Heart
              size={13}
              fill="#A5CFFA"
              className="text-[#A5CFFA]"
            />

            <span className="h-px w-16 bg-[#A5CFFA]/70" />
          </div>

          <p className="mx-auto max-w-xl font-['Playfair_Display'] text-base leading-[1.9] text-white/85 sm:text-lg">
            Nos llenará de alegría contar contigo
            en este día tan especial.
            Agradecemos que nos confirmes tu asistencia.
          </p>
        </motion.div>

        {/* TARJETA */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.85,
            delay: 0.1,
          }}
          viewport={{ once: true }}
          className="relative bg-white px-6 py-12 shadow-[0_20px_60px_rgba(0,0,0,0.2)] sm:px-12 sm:py-14"
        >
          {/* Marco doble */}
          <div className="pointer-events-none absolute inset-0 border border-[#B7CAE7]" />

          <div className="pointer-events-none absolute inset-[7px] border border-[#D4E6FF]" />

          <div className="relative z-10">

            {/* DATOS DEL INVITADO */}
            {invitacion.valida ? (
              <div className="mb-9 border border-[#D4E6FF] bg-[#F6F9FF] px-5 py-7 text-center">
                <UserRound
                  size={24}
                  strokeWidth={1.3}
                  className="mx-auto mb-4 text-[#294285]"
                />

                <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-[#294285]">
                  Invitación para
                </p>

                <h3 className="break-words font-['Playfair_Display'] text-2xl text-[#111111] sm:text-3xl">
                  {invitacion.nombre}
                </h3>

                <div className="mt-5 flex items-center justify-center gap-2 text-[#294285]">
                  <Users size={17} strokeWidth={1.5} />

                  <span className="text-sm">
                    {invitacion.pases}{" "}
                    {invitacion.pases === 1
                      ? "pase asignado"
                      : "pases asignados"}
                  </span>
                </div>
              </div>
            ) : (
              <div className="mb-8 border border-[#D4E6FF] bg-[#F6F9FF] px-5 py-7 text-center">
                <h3 className="font-['Playfair_Display'] text-xl text-[#1B2447]">
                  Invitación personalizada
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#444444]">
                  Para confirmar tu asistencia,
                  abre el enlace personalizado que
                  recibiste de los novios.
                </p>
              </div>
            )}

            <h3 className="mb-7 text-center font-['Playfair_Display'] text-2xl text-[#111111] sm:text-3xl">
              ¿Nos acompañarás?
            </h3>

            {/* ASISTENCIA */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

              <button
                type="button"
                disabled={!invitacion.valida}
                onClick={() => seleccionarAsistencia("si")}
                aria-pressed={asistencia === "si"}
                className={`
                  flex min-h-[58px]
                  items-center justify-center
                  gap-2 border px-4 py-4
                  font-['Playfair_Display']
                  transition-colors duration-300
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  ${
                    asistencia === "si"
                      ? "border-[#1B2447] bg-[#1B2447] text-white"
                      : "border-[#B7CAE7] bg-white text-[#1B2447] hover:bg-[#F6F9FF]"
                  }
                `}
              >
                <Check size={18} />
                Sí asistiré
              </button>

              <button
                type="button"
                disabled={!invitacion.valida}
                onClick={() => seleccionarAsistencia("no")}
                aria-pressed={asistencia === "no"}
                className={`
                  flex min-h-[58px]
                  items-center justify-center
                  gap-2 border px-4 py-4
                  font-['Playfair_Display']
                  transition-colors duration-300
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  ${
                    asistencia === "no"
                      ? "border-[#1B2447] bg-[#1B2447] text-white"
                      : "border-[#B7CAE7] bg-white text-[#1B2447] hover:bg-[#F6F9FF]"
                  }
                `}
              >
                <X size={18} />
                No podré asistir
              </button>
            </div>

            {/* CANTIDAD DE ASISTENTES */}
            {asistencia === "si" && invitacion.valida && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-8"
              >
                <label
                  htmlFor="cantidad-confirmados"
                  className="mb-3 block text-xs font-medium uppercase tracking-[0.14em] text-[#294285]"
                >
                  ¿Cuántas personas asistirán?
                </label>

                <select
                  id="cantidad-confirmados"
                  value={confirmados}
                  onChange={(e) => {
                    setConfirmados(e.target.value);
                    setError("");
                  }}
                  className="w-full border border-[#B7CAE7] bg-white px-5 py-4 text-[#1B2447] outline-none focus:border-[#4169E1]"
                >
                  <option value="">
                    Selecciona una cantidad
                  </option>

                  {Array.from(
                    { length: invitacion.pases },
                    (_, i) => i + 1
                  ).map((cantidad) => (
                    <option
                      key={cantidad}
                      value={cantidad}
                    >
                      {cantidad}{" "}
                      {cantidad === 1
                        ? "persona"
                        : "personas"}
                    </option>
                  ))}
                </select>

                <p className="mt-3 text-xs leading-6 text-[#666666]">
                  Puedes confirmar hasta{" "}
                  {invitacion.pases}{" "}
                  {invitacion.pases === 1
                    ? "persona"
                    : "personas"}.
                </p>
              </motion.div>
            )}

            {/* MENSAJE */}
            {asistencia && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8"
              >
                <label
                  htmlFor="mensaje-novios"
                  className="mb-3 block text-xs font-medium uppercase tracking-[0.14em] text-[#294285]"
                >
                  Mensaje para los novios (opcional)
                </label>

                <textarea
                  id="mensaje-novios"
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  rows={4}
                  maxLength={500}
                  placeholder="Escribe un mensaje para Blanca y Luis..."
                  className="w-full resize-none border border-[#B7CAE7] bg-white px-5 py-4 text-sm leading-7 text-[#1B2447] outline-none placeholder:text-[#888888] focus:border-[#4169E1]"
                />
              </motion.div>
            )}

            {/* ERROR */}
            {error && (
              <p
                role="alert"
                className="mt-6 border border-[#B7CAE7] bg-[#F6F9FF] px-4 py-3 text-sm leading-6 text-[#1B2447]"
              >
                {error}
              </p>
            )}

            {/* WHATSAPP */}
            <div className="mt-10">
              <div className="mb-7 flex items-center justify-center gap-3">
                <span className="h-px w-12 bg-[#B7CAE7]" />

                <Heart
                  size={13}
                  fill="#4169E1"
                  className="text-[#4169E1]"
                />

                <span className="h-px w-12 bg-[#B7CAE7]" />
              </div>

              <h4 className="text-center font-['Playfair_Display'] text-xl text-[#111111] sm:text-2xl">
                Enviar confirmación
              </h4>

              <p className="mt-3 text-center text-sm leading-7 text-[#555555]">
                Elige a quién deseas enviar
                tu respuesta por WhatsApp.
              </p>

              <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {CONTACTOS.map((contacto) => (
                  <button
                    key={contacto.nombre}
                    type="button"
                    disabled={!invitacion.valida}
                    onClick={() => enviarWhatsApp(contacto)}
                    className="flex min-h-[60px] items-center justify-center gap-3 rounded-full bg-[#1B2447] px-5 py-4 font-['Playfair_Display'] text-base text-white shadow-[0_8px_22px_rgba(27,36,71,0.15)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#294285] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <MessageCircle
                      size={21}
                      strokeWidth={1.6}
                    />

                    Confirmar con {contacto.nombre}

                    <Send size={15} />
                  </button>
                ))}
              </div>

              <p className="mt-6 text-center text-xs leading-6 text-[#777777]">
                Se abrirá WhatsApp con tu mensaje
                preparado. Recuerda presionar enviar
                para completar tu confirmación.
              </p>
            </div>
          </div>
        </motion.div>

        {/* PIE */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Heart
            size={15}
            fill="#A5CFFA"
            className="mx-auto mb-5 text-[#A5CFFA]"
          />

          <p className="font-['Playfair_Display'] text-lg italic text-[#D4E6FF]">
            Con amor, Blanca & Luis
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Confirmacion;
