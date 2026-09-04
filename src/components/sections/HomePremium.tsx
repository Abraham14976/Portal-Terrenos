"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  FileCheck2,
  HeartHandshake,
  LayoutGrid,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Zap,
  BookOpen,
  Award,
  Map,
  MessageSquareHeart,
  ChevronRight,
  Ruler,
} from "lucide-react";
import { buildWhatsAppLink, formatPEN } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { PROJECTS, Lot, formatPEN as formatPENLocal } from "@/data/projects";
import { useState } from "react";
import { saveLead } from "@/lib/supabase";

const BENEFITS = [
  {
    icon: MapPin,
    title: "Solo en Cajamarca",
    description:
      "10 proyectos en zonas estratégicas de alto crecimiento: Polloc, La Colpa, Valle, La Pirca y más. Toda la región cubierta.",
    color: "from-[#0f4c81] to-[#1460a6]",
  },
  {
    icon: ShieldCheck,
    title: "Trámites 100% seguros",
    description:
      "Títulos de propiedad, partidas registrales Sunarp, escrituras públicas. Documentación limpia y verificada antes de cualquier pago.",
    color: "from-emerald-600 to-emerald-700",
  },
  {
    icon: FileCheck2,
    title: "Entrega inmediata",
    description:
      "Lotes listos para escriturar. No esperarás meses ni años: todo listo para que empieces a construir o invertir HOY.",
    color: "from-amber-500 to-amber-700",
  },
  {
    icon: HeartHandshake,
    title: "Acompañamiento total",
    description:
      "Abraham Portal estará contigo de principio a fin. Llamadas, WhatsApp, visitas guiadas, asesoría jurídica y más.",
    color: "from-rose-500 to-rose-700",
  },
];

const STATS = [
  { label: "Familias felices", value: "+900", icon: Users },
  { label: "Proyectos en Cajamarca", value: `${PROJECTS.length}`, icon: LayoutGrid },
  { label: "Lotes vendidos", value: "+1,200", icon: BadgeCheck },
  { label: "Años de confianza", value: "+15", icon: Award },
];

export function HomePremium() {
  const featured = PROJECTS.filter((p) =>
    ["santa-margarita-polloc", "alameda-la-colpa", "la-finca", "valle-5", "valle-7", "la-pirca"].includes(p.slug)
  );
  const [formState, setFormState] = useState<{
    name: string;
    phone: string;
    email: string;
    message: string;
    status: "idle" | "sending" | "ok" | "error";
  }>({ name: "", phone: "", email: "", message: "", status: "idle" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.phone.trim()) return;
    setFormState((s) => ({ ...s, status: "sending" }));
    trackEvent({
      name: "lead_form_submit",
      params: { source: "home_contacto_rapido", has_lot_code: false },
    });
    const res = await saveLead({
      name: formState.name,
      email: formState.email,
      phone: formState.phone,
      message: formState.message,
      source: "home_contacto_rapido",
    });
    if (!res.error || res.skipped) {
      setFormState((s) => ({ ...s, status: "ok" }));
      setTimeout(
        () =>
          setFormState({
            name: "",
            phone: "",
            email: "",
            message: "",
            status: "idle",
          }),
        5000
      );
    } else {
      setFormState((s) => ({ ...s, status: "error" }));
    }
  };

  return (
    <main>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=2200&h=1400&fit=crop"
            alt="Lotes urbanos y campestres en Cajamarca"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b2e4c]/85 via-[#0f4c81]/75 to-[#0b2e4c]/98" />
        </div>

        <div className="container-app relative py-24 md:py-36 lg:py-44">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3 max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-white/90 backdrop-blur ring-1 ring-white/20 mb-5">
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                <span>Cajamarca · #1 Portal Inmobiliario</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white drop-shadow-xl leading-[1.03]">
                Tu lote en{" "}
                <span className="bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
                  Cajamarca
                </span>
                <br />
                desde{" "}
                <span className="text-emerald-300">S/ 57,000 soles</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-white/85 leading-relaxed max-w-2xl">
                {PROJECTS.length} proyectos residenciales. Urbanos y
                campestres. Títulos de propiedad limpios. Planos interactivos
                en Google My Maps. Asesoría personalizada de{" "}
                <strong className="text-amber-300">
                  Abraham Saul Portal Garcia
                </strong>
                , con +15 años ayudando a familias peruanas a construir su
                patrimonio.
              </p>

              <div className="mt-9 flex flex-col sm:flex-row flex-wrap gap-4">
                <Link
                  href="/proyectos"
                  onClick={() =>
                    trackEvent({
                      name: "cta_click",
                      params: {
                        cta_label: "Explorar 10 proyectos",
                        cta_location: "hero",
                      },
                    })
                  }
                  className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-7 py-4 text-base font-black text-[#0f4c81] shadow-2xl shadow-black/20 transition-all hover:-translate-y-0.5 hover:bg-amber-300 hover:text-[#0b2e4c]"
                >
                  <LayoutGrid className="h-5 w-5" />
                  EXPLORAR {PROJECTS.length} PROYECTOS
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href={buildWhatsAppLink(
                    "Hola Abraham! Vi PORTAL TERRENOS y quiero que me recomiendes 3 proyectos. Mi presupuesto es de S/ ... , quiero (urbano/campestre) para (construir/invertir).",
                    {
                      source: "hero",
                      medium: "website",
                      campaign: "asesoria_inmediata",
                    }
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 rounded-2xl border-2 border-white/40 bg-white/10 px-7 py-4 text-base font-black text-white backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white/20"
                  onClick={() =>
                    trackEvent({
                      name: "whatsapp_click",
                      params: { button_location: "hero_wa" },
                    })
                  }
                >
                  <MessageCircle className="h-5 w-5" />
                  ASESORÍA POR WHATSAPP
                </a>
              </div>

              <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-white/15 bg-white/8 p-5 backdrop-blur hover:bg-white/15 transition-all"
                  >
                    <div className="flex items-center gap-2 text-amber-300">
                      <s.icon className="h-5 w-5" />
                    </div>
                    <div className="mt-2 font-display text-3xl md:text-4xl font-black text-white leading-none">
                      {s.value}
                    </div>
                    <div className="mt-2 text-[11px] md:text-xs font-semibold text-white/70 leading-tight">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* FORMULARIO RÁPIDO HERO */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="relative">
                <div className="absolute -inset-2 rounded-[2.5rem] bg-gradient-to-br from-amber-300/30 via-emerald-300/20 to-white/10 blur-xl" />
                <form
                  onSubmit={handleSubmit}
                  className="relative rounded-3xl border border-white/15 bg-white/[0.97] p-7 md:p-8 backdrop-blur shadow-2xl shadow-black/15"
                >
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#0f4c81]/10 px-3.5 py-1.5 text-[11px] font-black uppercase tracking-widest text-[#0f4c81] mb-4">
                    <Zap className="h-3.5 w-3.5 text-amber-500" />
                    Respuesta {"<"} 2 horas
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-black tracking-tight text-slate-900 leading-tight">
                    Cuéntame tu lote ideal
                  </h3>
                  <p className="mt-2 text-sm text-slate-500 font-semibold">
                    Abraham te contacta personalmente.
                  </p>

                  <div className="mt-6 space-y-3.5">
                    <input
                      type="text"
                      required
                      placeholder="Tu nombre completo *"
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-4.5 py-3.5 pl-4 text-sm md:text-base font-semibold text-slate-900 placeholder:text-slate-400 focus:border-[#0f4c81] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#0f4c81]/10 transition-all"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Tu WhatsApp / Celular *"
                      value={formState.phone}
                      onChange={(e) =>
                        setFormState({ ...formState, phone: e.target.value })
                      }
                      className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-4.5 py-3.5 pl-4 text-sm md:text-base font-semibold text-slate-900 placeholder:text-slate-400 focus:border-[#0f4c81] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#0f4c81]/10 transition-all"
                    />
                    <input
                      type="email"
                      placeholder="Tu email (opcional)"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-4.5 py-3.5 pl-4 text-sm md:text-base font-semibold text-slate-900 placeholder:text-slate-400 focus:border-[#0f4c81] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#0f4c81]/10 transition-all"
                    />
                    <textarea
                      rows={3}
                      placeholder="Cuéntame: ¿urbano o campestre? ¿Presupuesto aprox? ¿Proyecto que te llamó la atención?"
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      className="w-full resize-none rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-3.5 text-sm md:text-base font-semibold text-slate-900 placeholder:text-slate-400 focus:border-[#0f4c81] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#0f4c81]/10 transition-all"
                    />
                    <button
                      type="submit"
                      disabled={formState.status === "sending"}
                      className="w-full rounded-2xl bg-gradient-to-r from-[#0f4c81] to-[#1460a6] px-5 py-4 text-sm md:text-base font-black uppercase tracking-wide text-white shadow-xl shadow-[#0f4c81]/25 transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-[#0f4c81]/30 disabled:opacity-70 disabled:hover:translate-y-0"
                    >
                      {formState.status === "sending"
                        ? "Enviando consulta..."
                        : formState.status === "ok"
                        ? "✓ ¡Abraham te contactará pronto!"
                        : formState.status === "error"
                        ? "Error. Escríbenos por WhatsApp"
                        : "Quiero que Abraham me contacte"}
                    </button>
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <a
                      href={buildWhatsAppLink(
                        "Hola Abraham! Te escribo desde el HOME. Quiero información de tus proyectos en Cajamarca.",
                        { source: "hero_form_wa", medium: "website" }
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-whatsapp !py-3 !text-xs md:!text-sm justify-center"
                      onClick={() =>
                        trackEvent({
                          name: "whatsapp_click",
                          params: { button_location: "hero_form_wa" },
                        })
                      }
                    >
                      <MessageCircle className="h-4 w-4 md:h-5 md:w-5" />
                      WhatsApp
                    </a>
                    <a
                      href="tel:+51926301972"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-xs md:text-sm font-black uppercase tracking-wide text-slate-700 hover:border-[#0f4c81] hover:text-[#0f4c81] transition-all"
                    >
                      <Phone className="h-4 w-4 md:h-5 md:w-5" />
                      Llamar
                    </a>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>

        {/* WAVE */}
        <div className="absolute bottom-0 left-0 right-0 -z-0">
          <svg viewBox="0 0 1440 120" className="w-full" preserveAspectRatio="none">
            <path
              fill="#ffffff"
              d="M0,64 C360,112 720,10 1080,72 C1240,104 1340,80 1440,64 L1440,120 L0,120 Z"
            />
          </svg>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-app">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#0f4c81]/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#0f4c81] mb-4">
              ¿Por qué Portal Terrenos?
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              Invertir en Cajamarca{" "}
              <span className="bg-gradient-to-r from-[#0f4c81] to-[#1460a6] bg-clip-text text-transparent">
                nunca fue tan seguro
              </span>
            </h2>
            <p className="mt-5 text-lg text-slate-600 leading-relaxed">
              4 pilares que nos diferencian del resto. Más de 900 familias en
              Cajamarca ya lo confirmaron.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -8 }}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-7 shadow-sm transition-all hover:shadow-2xl hover:shadow-slate-900/10"
              >
                <div
                  className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br ${b.color} text-white shadow-xl`}
                >
                  <b.icon className="h-8 w-8" />
                </div>
                <h3 className="font-display text-xl font-black text-slate-900">
                  {b.title}
                </h3>
                <p className="mt-3 text-slate-600 leading-relaxed">{b.description}</p>
                <div className="mt-6 pt-6 border-t border-slate-200/70 flex items-center justify-between">
                  <div className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                    Garantía Portal Terrenos
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROYECTOS DESTACADOS */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-slate-50 to-white border-y border-slate-200">
        <div className="container-app">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-amber-800 mb-4">
                <LayoutGrid className="h-3.5 w-3.5" />
                Proyectos destacados
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                Los proyectos más buscados en{" "}
                <span className="text-[#0f4c81]">Cajamarca</span>
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Cada proyecto incluye su plano interactivo oficial en Google
                My Maps, inventario de lotes ACTUALIZADO y WhatsApp directo
                con Abraham.
              </p>
            </div>
            <Link
              href="/proyectos"
              className="inline-flex items-center gap-2 self-start md:self-end rounded-2xl bg-[#0f4c81] px-6 py-4 text-sm font-black uppercase tracking-wider text-white shadow-lg shadow-[#0f4c81]/25 transition-all hover:-translate-y-0.5 hover:bg-[#1460a6] hover:shadow-xl"
              onClick={() =>
                trackEvent({
                  name: "cta_click",
                  params: {
                    cta_label: "Ver todos proyectos home",
                    cta_location: "home_proyectos_btn",
                  },
                })
              }
            >
              Ver {PROJECTS.length} proyectos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {featured.map((p, idx) => {
              const pct = Math.round(
                ((p.totalLots - p.availableLots) / p.totalLots) * 100
              );
              return (
                <motion.article
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-2xl hover:shadow-slate-900/10"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={p.heroImage}
                      alt={p.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/0 to-transparent" />
                    <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur px-3 py-1.5 text-[11px] font-black uppercase text-[#0f4c81] shadow-md ring-1 ring-black/5">
                        <MapPin className="h-3.5 w-3.5" />
                        {p.location}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/80 backdrop-blur px-3 py-1.5 text-[11px] font-black uppercase text-white shadow-md">
                        {p.type}
                      </span>
                    </div>
                    <div className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-2 text-xs font-black uppercase text-white shadow-xl">
                      desde {formatPENLocal(p.minPrice)}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-[11px] font-black uppercase tracking-widest text-white/60">
                          Proyecto
                        </div>
                        <h3 className="font-display text-2xl font-black text-white leading-tight drop-shadow-lg truncate">
                          {p.shortName}
                        </h3>
                      </div>
                      <div className="w-24 flex-shrink-0">
                        <div className="flex justify-between text-[10px] font-black uppercase text-white/80 mb-1.5">
                          <span>Ocupación</span>
                          <span>{pct}%</span>
                        </div>
                        <div className="h-2.5 overflow-hidden rounded-full bg-white/30 backdrop-blur">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-amber-300 to-yellow-400 shadow"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center justify-between gap-3">
                      <h4 className="font-display text-lg md:text-xl font-black text-slate-900 group-hover:text-[#0f4c81] transition-colors truncate">
                        {p.name}
                      </h4>
                      <BadgeCheck className="h-5 w-5 flex-shrink-0 text-[#0f4c81]" />
                    </div>
                    <p className="mt-2 text-sm text-slate-500 font-semibold line-clamp-2">
                      {p.tagline}
                    </p>

                    <div className="mt-5 grid grid-cols-3 gap-2">
                      <MiniStat
                        icon={<Ruler className="h-4 w-4" />}
                        value={`${p.minArea}-${p.maxArea}`}
                        label="m²"
                        color="[#0f4c81]"
                      />
                      <MiniStat
                        icon={<LayoutGrid className="h-4 w-4" />}
                        value={`${p.totalLots}`}
                        label="Lotes"
                        color="indigo-600"
                      />
                      <MiniStat
                        icon={<CheckCircle2 className="h-4 w-4" />}
                        value={`${p.availableLots}`}
                        label="Disp."
                        color="emerald-600"
                      />
                    </div>

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {p.amenities.slice(0, 4).map((a) => (
                        <span
                          key={a}
                          className="rounded-lg bg-slate-50 border border-slate-200 px-2.5 py-1 text-[11px] font-bold text-slate-700"
                        >
                          {a}
                        </span>
                      ))}
                      {p.amenities.length > 4 && (
                        <span className="rounded-lg bg-[#0f4c81]/10 px-2.5 py-1 text-[11px] font-black uppercase text-[#0f4c81]">
                          +{p.amenities.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="mt-6 grid grid-cols-5 gap-2 pt-6 border-t border-slate-100">
                      <Link
                        href={`/proyectos/${p.slug}`}
                        className="col-span-3 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0f4c81] px-4 py-3.5 text-xs md:text-sm font-black uppercase tracking-wider text-white shadow-lg shadow-[#0f4c81]/25 transition-all hover:-translate-y-0.5 hover:bg-[#1460a6] hover:shadow-xl"
                        onClick={() =>
                          trackEvent({
                            name: "cta_click",
                            params: {
                              cta_label: `Ver proyecto ${p.name}`,
                              cta_location: "home_featured",
                            },
                          })
                        }
                      >
                        Ver proyecto
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                      <a
                        href={buildWhatsAppLink(
                          `Hola Abraham! Estoy interesado en ${p.name} (${p.location}, Cajamarca). ${p.availableLots} lotes disponibles de ${p.minArea}-${p.maxArea}m². ¿Tienes promoción esta semana?`,
                          {
                            source: `home_proyecto_${p.slug}`,
                            medium: "website",
                            campaign: `home_featured_whatsapp`,
                            content: p.id,
                          }
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="col-span-2 inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-[#0f4c81]/15 bg-[#0f4c81]/[0.04] px-3 py-3.5 text-[11px] md:text-xs font-black uppercase tracking-wider text-[#0f4c81] transition-all hover:border-emerald-500/60 hover:bg-emerald-500 hover:text-white"
                        onClick={() =>
                          trackEvent({
                            name: "whatsapp_click",
                            params: {
                              button_location: `home_featured_wa_${p.slug}`,
                            },
                          })
                        }
                      >
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <div className="mt-14 md:hidden">
            <Link
              href="/proyectos"
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-4 text-sm font-black uppercase tracking-wide text-white transition-all hover:bg-slate-800"
            >
              <LayoutGrid className="h-5 w-5" />
              Ver {PROJECTS.length} proyectos en Cajamarca
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA NOSOTROS + TESTIMONIOS PREVIEW */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-app grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 relative order-2 lg:order-1">
            <div className="absolute -top-10 -left-10 h-72 w-72 rounded-full bg-[#0f4c81]/10 blur-3xl" />
            <div className="absolute -bottom-16 -right-10 h-80 w-80 rounded-full bg-amber-300/15 blur-3xl" />
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-900/10 aspect-[5/4]">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1000&h=800&fit=crop"
                alt="Abraham Saul Portal Garcia - Asesor Inmobiliario Cajamarca"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=1000&h=800&fit=crop";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <div className="absolute left-5 right-5 bottom-5 rounded-2xl bg-white/95 backdrop-blur p-5 shadow-xl border border-white/50">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0f4c81] to-[#1460a6] text-white shadow-lg">
                    <Award className="h-7 w-7" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-display text-xl font-black text-slate-900">
                      Abraham Saul Portal Garcia
                    </div>
                    <div className="text-sm font-bold text-[#0f4c81]">
                      Asesor Inmobiliario · Cajamarca
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Experiencia
                    </div>
                    <div className="mt-0.5 font-display text-xl font-black text-slate-900">
                      +15 años
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Clientes
                    </div>
                    <div className="mt-0.5 font-display text-xl font-black text-emerald-600">
                      +900
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Rating
                    </div>
                    <div className="mt-0.5 flex items-center gap-1">
                      <div className="font-display text-xl font-black text-slate-900">
                        5.0
                      </div>
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-amber-800 mb-4">
              <MessageSquareHeart className="h-3.5 w-3.5" />
              Testimonios + Trayectoria
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-[1.05]">
              Más de 15 años construyendo{" "}
              <span className="bg-gradient-to-r from-[#0f4c81] to-[#1460a6] bg-clip-text text-transparent">
                sueños en Cajamarca
              </span>
            </h2>
            <p className="mt-5 text-lg text-slate-600 leading-relaxed">
              Conoce a Abraham, lee las experiencias de quienes ya confiaron y
              descubre por qué somos la opción N°1 en lotes de la región.
            </p>

            <div className="mt-7 space-y-4">
              {[
                "Títulos de propiedad individuales y verificados en Sunarp",
                "+600 lotes entregados inmediatamente, sin demoras",
                "Respuesta por WhatsApp en menos de 2 horas",
                "Visitas guiadas SÍ o SÍ en cada proyecto",
              ].map((x) => (
                <div
                  key={x}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-gradient-to-r from-white to-slate-50 p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
                  <span className="font-bold text-slate-700 leading-snug">
                    {x}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-col sm:flex-row flex-wrap gap-3">
              <Link
                href="/nosotros"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-4 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-slate-900/20 transition-all hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-xl"
                onClick={() =>
                  trackEvent({
                    name: "cta_click",
                    params: {
                      cta_label: "Conocer a Abraham",
                      cta_location: "home_nosotros",
                    },
                  })
                }
                >
                  <BookOpen className="h-5 w-5" />
                  Conoce a Abraham
                  <ArrowRight className="h-4 w-4" />
                </Link>
              <Link
                href="/testimonios"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-[#0f4c81]/20 bg-[#0f4c81]/5 px-6 py-4 text-sm font-black uppercase tracking-wide text-[#0f4c81] transition-all hover:border-[#0f4c81]/50 hover:bg-[#0f4c81]/10 hover:-translate-y-0.5"
                onClick={() =>
                  trackEvent({
                    name: "cta_click",
                    params: {
                      cta_label: "Ver 900 testimonios",
                      cta_location: "home_testimonios",
                    },
                  })
                }
                >
                  <Users className="h-5 w-5" />
                  +900 testimonios
                </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MAPA DEMO + CTA CONTACTO */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-[#0f4c81] via-[#1460a6] to-[#0b2e4c] text-white relative overflow-hidden">
        <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="pointer-events-none absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="container-app relative">
          <div className="grid gap-10 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest ring-1 ring-white/20 mb-4">
                <Map className="h-3.5 w-3.5 text-emerald-300" />
                Plano oficial · Demo
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight leading-[1.05]">
                Plano interactivo tipo{" "}
                <span className="bg-gradient-to-r from-amber-200 to-yellow-400 bg-clip-text text-transparent">
                  Google My Maps
                </span>{" "}
                en cada proyecto
              </h2>
              <p className="mt-5 text-lg md:text-xl text-white/85 leading-relaxed">
                Este es el tipo de plano interactivo que tendrá{" "}
                <strong className="text-amber-300">
                  cada uno de tus {PROJECTS.length} proyectos
                </strong>
                . Fácil de navegar para el cliente, lotes exactos,
                coordenadas y calles 100% a escala.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  "Ver disponibilidad EN VIVO de cada lote",
                  "Zoom infinito, vista satelital y de calle",
                  "Abrir directamente Maps y enviar ubicación al cliente",
                  "100% GRATIS para ti usando Google My Maps",
                ].map((f) => (
                  <div
                    key={f}
                    className="flex items-start gap-3 rounded-2xl bg-white/5 border border-white/10 p-4 backdrop-blur"
                  >
                    <TrendingUp className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-300" />
                    <span className="font-bold text-white/90 leading-snug">
                      {f}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-3 rounded-2xl bg-amber-300 px-7 py-4 text-base font-black uppercase tracking-wide text-[#0b2e4c] shadow-xl shadow-black/20 transition-all hover:-translate-y-0.5 hover:bg-amber-200"
                  onClick={() =>
                    trackEvent({
                      name: "cta_click",
                      params: {
                        cta_label: "Agendar visita guiada",
                        cta_location: "home_mapa_cta",
                      },
                    })
                  }
                >
                  <MapPin className="h-5 w-5" />
                  Agendar visita guiada
                </Link>
                <Link
                  href="/proyectos/santa-margarita-polloc"
                  className="inline-flex items-center gap-3 rounded-2xl border-2 border-white/30 bg-white/10 px-7 py-4 text-sm md:text-base font-black uppercase tracking-wide text-white backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white/20"
                >
                  Ver demo plano real
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative rounded-[2rem] overflow-hidden border-2 border-white/20 bg-white/5 p-3 shadow-2xl backdrop-blur">
                <div className="flex items-center justify-between px-3 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <div className="h-3 w-3 rounded-full bg-amber-400" />
                    <div className="h-3 w-3 rounded-full bg-emerald-500" />
                    <div className="ml-4 text-xs font-black uppercase tracking-widest text-white/70">
                      maps.google.com / Santa Margarita · Polloc
                    </div>
                  </div>
                  <a
                    href="https://www.google.com/maps/d/u/0/viewer?mid=1PvoWFwx1KCVgwRaXNZgagA2QB5IDPy0&ll&z=16"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-white hover:bg-white/25 transition-colors"
                  >
                    Abrir en Maps
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
                <div className="rounded-3xl overflow-hidden shadow-inner aspect-[16/11]">
                  <iframe
                    src="https://www.google.com/maps/d/embed?mid=1PvoWFwx1KCVgwRaXNZgagA2QB5IDPy0&hl=es"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mapa Portal Terrenos - Demo"
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-amber-400 via-amber-300 to-yellow-300 text-[#0b2e4c] relative overflow-hidden">
        <div className="pointer-events-none absolute -left-20 top-0 h-96 w-96 rounded-full bg-white/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-[500px] w-[500px] rounded-full bg-[#0f4c81]/10 blur-3xl" />
        <div className="container-app relative max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/60 backdrop-blur px-4 py-1.5 text-[11px] font-black uppercase tracking-widest ring-1 ring-white mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            ¡Primera asesoría GRATIS!
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-black leading-[1.05] tracking-tight">
            ¿Listo para ser{" "}
            <span className="text-[#0f4c81]">propietario</span> de tu lote en
            Cajamarca?
          </h2>
          <p className="mt-6 text-lg md:text-xl text-[#0b2e4c]/80 leading-relaxed max-w-2xl mx-auto">
            Empieza con un solo clic. Abraham te llamará HOY mismo, te
            recomendará los 3 mejores proyectos según tu presupuesto y te
            invitará a una visita guiada SIN COSTO.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={buildWhatsAppLink(
                "Hola Abraham! Vengo del HOME de Portal Terrenos. Quiero mi PRIMERA ASESORÍA GRATUITA. Mi presupuesto: S/ ... Mi objetivo es (construir / invertir):...",
                {
                  source: "home_cta_final",
                  medium: "website",
                  campaign: "asesoria_gratuita",
                }
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp justify-center !py-5 !text-base shadow-2xl shadow-emerald-700/20"
              onClick={() =>
                trackEvent({
                  name: "whatsapp_click",
                  params: { button_location: "home_cta_final" },
                })
              }
            >
              <MessageCircle className="h-5 w-5" />
              Empezar asesoría gratuita HOY
            </a>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-white/90 ring-1 ring-white px-7 py-5 text-sm md:text-base font-black uppercase tracking-wide text-[#0b2e4c] shadow-md transition-all hover:bg-white hover:-translate-y-0.5"
            >
              Rellenar formulario
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function MiniStat({
  icon,
  value,
  label,
  color,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: string;
}) {
  return (
    <div className="rounded-2xl bg-slate-50 border border-slate-100 p-3 transition-all hover:bg-white hover:border-slate-200 hover:shadow-sm">
      <div className={`flex justify-center text-${color}`}>{icon}</div>
      <div className="mt-1 text-center font-display text-sm md:text-base font-black text-slate-900">
        {value}
      </div>
      <div className="text-center text-[10px] md:text-[11px] font-black uppercase tracking-wider text-slate-400 leading-tight">
        {label}
      </div>
    </div>
  );
}

export const _formatters = { formatPEN };
