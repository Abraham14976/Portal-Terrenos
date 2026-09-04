"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { saveLead } from "@/lib/supabase";
import { siteConfig } from "@/config/site";

const MOTIVOS = [
  { id: "comprar", label: "Quiero comprar un lote" },
  { id: "invertir", label: "Quiero invertir en lotes" },
  { id: "visita", label: "Agendar visita guiada" },
  { id: "asesoria", label: "Asesoría personalizada" },
  { id: "otros", label: "Otro motivo" },
];

const GOOGLE_MAPS_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2023753.2771870606!2d-79.8215979!3d-6.5469704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91b23632a880a3b5%3A0x273e5ad33c48c0e6!2sCajamarca!5e0!3m2!1ses-419!2spe!4v1700000000000";

export function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    motivo: MOTIVOS[0].id,
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle"
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    setStatus("sending");
    trackEvent({
      name: "lead_form_submit",
      params: {
        source: `contacto_${form.motivo}`,
        has_lot_code: false,
      },
    });
    const res = await saveLead({
      name: form.name,
      email: form.email,
      phone: form.phone,
      message: form.message + `\n\nMotivo: ${form.motivo} - ${form.city || "Sin ciudad"}`,
      source: `contacto_${form.motivo}`,
    });
    if (!res.error || res.skipped) {
      setStatus("ok");
      setTimeout(
        () => {
          setForm({
            name: "",
            email: "",
            phone: "",
            city: "",
            motivo: MOTIVOS[0].id,
            message: "",
          });
          setStatus("idle");
        },
        5500
      );
    } else {
      setStatus("error");
    }
  };

  return (
    <div className="pt-20">
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#0f4c81] via-[#1460a6] to-[#0b2e4c] text-white">
        <div className="pointer-events-none absolute -top-32 right-0 h-[500px] w-[500px] rounded-full bg-amber-300/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-[500px] w-[500px] rounded-full bg-emerald-300/15 blur-3xl" />
        <div className="container-app relative py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest ring-1 ring-white/20 mb-6">
              <Mail className="h-3.5 w-3.5 text-amber-300" />
              Estamos para ayudarte
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-black leading-[1.05] tracking-tight">
              Contáctate con{" "}
              <span className="bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
                Abraham directamente
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/85 leading-relaxed max-w-2xl">
              Responde en menos de 2 horas. De lunes a domingo. Puedes escribir
              por WhatsApp, llamar o rellenar el formulario: elige el canal que
              te sea más cómodo.
            </p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl">
              {[
                {
                  icon: Phone,
                  title: "Llamar ahora",
                  sub: siteConfig.phone,
                  href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
                  bg: "from-emerald-500 to-emerald-700",
                },
                {
                  icon: MessageCircle,
                  title: "WhatsApp 24/7",
                  sub: "Respuesta rápida",
                  href: buildWhatsAppLink(
                    "Hola Abraham! Te escribo desde tu página de contacto. Quiero más información sobre tus lotes en Cajamarca.",
                    { source: "contacto_hero_wa", medium: "website" }
                  ),
                  bg: "from-[#25D366] to-emerald-600",
                },
                {
                  icon: Mail,
                  title: "Correo",
                  sub: siteConfig.email,
                  href: `mailto:${siteConfig.email}`,
                  bg: "from-indigo-500 to-indigo-700",
                },
              ].map((c) => (
                <a
                  key={c.title}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/8 p-5 backdrop-blur hover:bg-white/15 transition-all"
                  onClick={() =>
                    trackEvent({
                      name: "cta_click",
                      params: {
                        cta_label: c.title,
                        cta_location: "contacto_hero_cta",
                      },
                    })
                  }
                >
                  <div
                    className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${c.bg} opacity-20 blur-xl group-hover:opacity-30 transition-opacity`}
                  />
                  <div
                    className={`relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${c.bg} text-white shadow-lg mb-4`}
                  >
                    <c.icon className="h-6 w-6" />
                  </div>
                  <div className="relative font-display text-lg font-black">
                    {c.title}
                  </div>
                  <div className="relative text-sm font-semibold text-white/70 mt-1">
                    {c.sub}
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-10 inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-3 ring-1 ring-white/20 backdrop-blur">
              <Clock className="h-5 w-5 text-amber-300" />
              <div className="text-sm font-bold">
                Horario de atención:{" "}
                <span className="text-amber-300">L-S 8am - 9pm</span> · Domingos
                9am - 7pm
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORM + INFO + MAPA */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container-app grid gap-8 lg:grid-cols-12">
          {/* COLUMNA IZQ: INFO + MAPA */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-amber-800 mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                ¿Qué obtienes al escribirnos?
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-black text-slate-900 leading-tight">
                Atención personalizada y respuesta{" "}
                <span className="text-[#0f4c81]">menor a 2 horas</span>
              </h2>
              <p className="mt-3 text-slate-600 leading-relaxed">
                Si rellenas este formulario, Abraham personalmente revisa tu
                mensaje y te contacta por el número que nos dejes. Si quieres
                respuesta INSTANTÁNEA, el botón de WhatsApp siempre está al
                costado.
              </p>
              <ul className="mt-7 space-y-4">
                {[
                  "Recomendación de hasta 3 proyectos IDEALES según tu perfil",
                  "Precios exactos y disponibilidad AL DÍA (no es inventada)",
                  "Agendamiento de visita guiada en el lote o proyecto que elijas",
                  "Asesoría jurídica básica: títulos, Sunarp, partidas",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded-2xl bg-slate-50 border border-slate-100 p-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600 flex-shrink-0" />
                    <span className="font-semibold text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7 pt-6 border-t border-slate-100 grid grid-cols-3 gap-3">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Atención
                  </div>
                  <div className="mt-1 font-display text-lg font-black text-slate-900">
                    7 días
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Respuesta
                  </div>
                  <div className="mt-1 font-display text-lg font-black text-emerald-600">
                    {"<"} 2h
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Gratuito
                  </div>
                  <div className="mt-1 font-display text-lg font-black text-[#0f4c81]">
                    100%
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="relative">
                <iframe
                  src={GOOGLE_MAPS_EMBED}
                  width="100%"
                  height="360"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación Cajamarca - Portal Terrenos"
                  className="w-full"
                  allowFullScreen
                />
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur px-3.5 py-1.5 text-[11px] font-black uppercase text-[#0f4c81] shadow-md ring-1 ring-black/5">
                  <MapPin className="h-3.5 w-3.5" />
                  Cajamarca, Perú
                </div>
              </div>
              <div className="bg-gradient-to-br from-slate-50 to-white p-5 border-t border-slate-100 flex items-center justify-between gap-4">
                <div>
                  <div className="font-display text-lg font-black text-slate-900">
                    Visítanos en oficina
                  </div>
                  <div className="text-sm text-slate-600 mt-0.5">
                    {siteConfig.address}
                  </div>
                </div>
                <a
                  href="https://www.google.com/maps/place/Cajamarca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#0f4c81] px-4 py-3 text-xs font-black uppercase tracking-wider text-white hover:bg-[#1460a6] transition-all"
                >
                  Abrir en Maps
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: FORMULARIO */}
          <div className="lg:col-span-7">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              onSubmit={onSubmit}
              className="rounded-3xl border border-slate-200 bg-white p-8 md:p-10 shadow-xl shadow-slate-900/5 relative overflow-hidden"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#0f4c81]/10 blur-3xl" />
              <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-amber-300/10 blur-3xl" />

              <div className="relative mb-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#0f4c81]/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#0f4c81] mb-4">
                  <Send className="h-3.5 w-3.5" />
                  Formulario de contacto
                </div>
                <h3 className="font-display text-2xl md:text-4xl font-black tracking-tight text-slate-900 leading-tight">
                  Cuéntanos de tu inversión ideal
                </h3>
                <p className="mt-3 text-slate-600 leading-relaxed">
                  Entre más detalles nos des, mejor será la recomendación de
                  Abraham. No te preocupes: tus datos son 100% privados.
                </p>
              </div>

              <div className="relative grid gap-5 md:grid-cols-2">
                <div className="md:col-span-1">
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    placeholder="Ej. Juan Perez"
                    className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-5 py-4 text-base text-slate-900 placeholder:text-slate-400 focus:border-[#0f4c81] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#0f4c81]/10 transition-all"
                  />
                </div>

                <div className="md:col-span-1">
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
                    Celular / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    placeholder="926 301 972"
                    className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-5 py-4 text-base text-slate-900 placeholder:text-slate-400 focus:border-[#0f4c81] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#0f4c81]/10 transition-all"
                  />
                </div>

                <div className="md:col-span-1">
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="tucorreo@gmail.com"
                    className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-5 py-4 text-base text-slate-900 placeholder:text-slate-400 focus:border-[#0f4c81] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#0f4c81]/10 transition-all"
                  />
                </div>

                <div className="md:col-span-1">
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
                    Ciudad / Distrito
                  </label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) =>
                      setForm({ ...form, city: e.target.value })
                    }
                    placeholder="Cajamarca, Lima, USA, España..."
                    className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-5 py-4 text-base text-slate-900 placeholder:text-slate-400 focus:border-[#0f4c81] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#0f4c81]/10 transition-all"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-3">
                    ¿En qué podemos ayudarte? *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {MOTIVOS.map((m) => {
                      const active = form.motivo === m.id;
                      return (
                        <button
                          type="button"
                          key={m.id}
                          onClick={() => setForm({ ...form, motivo: m.id })}
                          className={`rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                            active
                              ? "bg-[#0f4c81] text-white shadow-lg shadow-[#0f4c81]/30"
                              : "border-2 border-slate-200 bg-white text-slate-600 hover:border-[#0f4c81]/40 hover:bg-[#0f4c81]/5 hover:text-[#0f4c81]"
                          }`}
                        >
                          {m.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
                    Mensaje (cuéntanos más)
                  </label>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    placeholder="Presupuesto aproximado, tipo de lote que buscas, si es para construir o invertir, proyecto que te llamó la atención... ¡toda la info ayuda!"
                    className="w-full resize-none rounded-2xl border-2 border-slate-200 bg-slate-50 px-5 py-4 text-base text-slate-900 placeholder:text-slate-400 focus:border-[#0f4c81] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#0f4c81]/10 transition-all"
                  />
                </div>
              </div>

              <div className="relative mt-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5 pt-8 border-t border-slate-100">
                <div className="flex items-start gap-3 max-w-xl">
                  <ShieldCheck className="mt-0.5 h-6 w-6 flex-shrink-0 text-emerald-600" />
                  <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                    Al enviar aceptas nuestra política de privacidad. Tus datos
                    NUNCA se comparten. Solo Abraham Portal recibe y responde
                    tu consulta.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0f4c81] px-7 py-4 text-sm md:text-base font-black uppercase tracking-wide text-white shadow-lg shadow-[#0f4c81]/25 transition-all hover:-translate-y-0.5 hover:bg-[#1460a6] hover:shadow-xl disabled:opacity-70 disabled:hover:translate-y-0"
                  >
                    <Send className="h-5 w-5" />
                    {status === "sending"
                      ? "Enviando..."
                      : status === "ok"
                      ? "✓ ¡Enviado correctamente!"
                      : "Enviar mensaje"}
                  </button>
                  <a
                    href={buildWhatsAppLink(
                      `Hola Abraham! Te contacto desde el formulario web.\n\nNombre: ${form.name || "[Tu nombre]"}\nCelular: ${form.phone || "[Tu celular]"}\nMotivo: ${MOTIVOS.find((x) => x.id === form.motivo)?.label}\nMensaje: ${form.message || "[Tu mensaje]"}`,
                      { source: "contacto_form_wa", medium: "website" }
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp justify-center !py-4"
                    onClick={() =>
                      trackEvent({
                        name: "whatsapp_click",
                        params: { button_location: "contacto_form_bottom" },
                      })
                    }
                  >
                    <MessageCircle className="h-5 w-5" />
                    Enviar por WhatsApp
                  </a>
                </div>
              </div>

              {status === "ok" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative mt-6 rounded-2xl bg-emerald-50 border border-emerald-200 p-5 flex items-start gap-4"
                >
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-md">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-display text-lg font-black text-emerald-900">
                      ¡Recibimos tu mensaje! 🎉
                    </div>
                    <p className="text-sm font-semibold text-emerald-800 mt-1">
                      Abraham revisará tu información y te llamará / escribirá
                      por WhatsApp en menos de 2 horas. Si es más urgente, usa
                      el botón de WhatsApp.
                    </p>
                  </div>
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="relative mt-6 rounded-2xl bg-red-50 border border-red-200 p-5 text-red-800"
                >
                  <strong>Error temporal:</strong> Escríbenos directamente por
                  WhatsApp.
                </motion.div>
              )}
            </motion.form>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  icon: Facebook,
                  label: "Facebook",
                  sub: "@Portalterrenos",
                  href: "https://facebook.com",
                },
                {
                  icon: Instagram,
                  label: "Instagram",
                  sub: "@portalterrenos.pe",
                  href: "https://instagram.com",
                },
                {
                  icon: Linkedin,
                  label: "LinkedIn",
                  sub: "Abraham Portal",
                  href: "https://linkedin.com",
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 hover:border-[#0f4c81]/30 hover:shadow-md transition-all"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-slate-500 group-hover:bg-[#0f4c81] group-hover:text-white transition-colors">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-black text-slate-900">{s.label}</div>
                    <div className="text-xs font-semibold text-slate-500 truncate">
                      {s.sub}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
