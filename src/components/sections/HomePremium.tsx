"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  DollarSign,
  Ruler,
  Sparkles,
  ShieldCheck,
  FileCheck2,
  Award,
  Map,
  Calculator,
  Users,
  Phone,
  MessageCircle,
  Star,
  ExternalLink,
  CheckCircle2,
  TrendingUp,
  BadgeCheck,
} from "lucide-react";
import { buildWhatsAppLink, formatPEN, formatUSD } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { PROJECTS } from "@/data/projects";
import { useState } from "react";
import { saveLead } from "@/lib/supabase";

const BENEFITS = [
  {
    icon: MapPin,
    title: "Ubicaciones Estratégicas",
    description:
      "Lotes en zonas de alto crecimiento y plusvalía asegurada. Cercanía a servicios, colegios y vías de acceso principales.",
    color: "from-[#0f4c81] to-[#1460a6]",
  },
  {
    icon: ShieldCheck,
    title: "Financiamiento Seguro y Directo",
    description:
      "Cuotas accesibles, tasas preferenciales y financiamiento propio. Sin intermediarios, sin sorpresas.",
    color: "from-emerald-600 to-emerald-700",
  },
  {
    icon: FileCheck2,
    title: "Títulos de Propiedad Garantizados",
    description:
      "Escrituras públicas, partidas registrales individuales y todos los trámites legales listos. 100% seguro.",
    color: "from-amber-600 to-amber-700",
  },
];

const TESTIMONIOS = [
  {
    name: "Mariana Rojas",
    role: "Inversionista · La Finca",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces",
    stars: 5,
    text: "Compré mi lote en La Finca hace un año y ya valorizó un 25%. El asesoramiento de Abraham fue de lo mejor. Totalmente recomendado.",
  },
  {
    name: "Jorge Mendoza",
    role: "Comprador · Santa Margarita",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces",
    stars: 5,
    text: "Mi familia y yo construimos nuestra casa soñada en Santa Margarita. Todo muy transparente, financiamiento súper flexible. ¡Gracias!",
  },
  {
    name: "Patricia Campos",
    role: "Inversionista · Valle 5",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=faces",
    stars: 5,
    text: "Invertí en 3 lotes de Valle 5 y ya tengo 2 alquilados. El ROI fue inmediato. Portal Terrenos es mi opción #1 para invertir en tierra.",
  },
  {
    name: "David Palacios",
    role: "Comprador · Alameda La Colpa",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces",
    stars: 5,
    text: "La piscina y las áreas sociales de Alameda La Colpa me impresionaron. Mis hijos están felices. ¡Excelente inversión!",
  },
];

const STATS = [
  { label: "Lotes vendidos", value: "+1,200", icon: BadgeCheck },
  { label: "Proyectos entregados", value: `${PROJECTS.length}`, icon: Map },
  { label: "Años de experiencia", value: "+15", icon: Award },
  { label: "Clientes felices", value: "+900", icon: Users },
];

export function HomePremium() {
  const featured = PROJECTS.slice(0, 6);
  const [formState, setFormState] = useState<{
    name: string;
    email: string;
    phone: string;
    message: string;
    status: "idle" | "sending" | "ok" | "error";
  }>({ name: "", email: "", phone: "", message: "", status: "idle" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.phone.trim()) return;
    setFormState((s) => ({ ...s, status: "sending" }));
    trackEvent({
      name: "lead_form_submit",
      params: { source: "contacto_home", has_lot_code: false },
    });
    const res = await saveLead({
      name: formState.name,
      email: formState.email,
      phone: formState.phone,
      message: formState.message,
      source: "contacto_home",
    });
    if (!res.error || res.skipped) {
      setFormState((s) => ({ ...s, status: "ok" }));
      setTimeout(
        () =>
          setFormState({
            name: "",
            email: "",
            phone: "",
            message: "",
            status: "idle",
          }),
        4500
      );
    } else {
      setFormState((s) => ({ ...s, status: "error" }));
    }
  };

  return (
    <main className="pt-20">
      {/* HERO */}
      <section
        id="inicio"
        className="relative isolate overflow-hidden"
      >
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=2000&h=1200&fit=crop"
            alt="Terrenos urbanos residenciales"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f4c81]/90 via-[#0f4c81]/70 to-[#0b2e4c]/95" />
        </div>

        <div className="container-app relative py-24 md:py-36 lg:py-44">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl text-center mx-auto"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/90 backdrop-blur ring-1 ring-white/20 mb-6">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              <span>Tu inversión en terreno empieza aquí</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white drop-shadow-xl leading-[1.05]">
              CONSTRUYE TU SUEÑO
              <br />
              <span className="bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
                EN TU PROPIO TERRENO
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg md:text-xl text-white/90 leading-relaxed">
              Lotes urbanos y campestres desde{" "}
              <span className="font-extrabold text-amber-300">$15,000 USD</span>.
              Financiamiento directo y seguro ·{" "}
              {PROJECTS.length} proyectos en Lambayeque · Asesoría personalizada
              de Abraham Saul Portal Garcia.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#proyectos-destacados"
                onClick={() =>
                  trackEvent({
                    name: "cta_click",
                    params: {
                      cta_label: "Explorar lotes disponibles",
                      cta_location: "hero",
                    },
                  })
                }
                className="group inline-flex items-center gap-3 rounded-2xl bg-white px-7 py-4 font-bold text-[#0f4c81] shadow-2xl shadow-black/20 transition-all hover:-translate-y-0.5 hover:bg-amber-300 hover:text-[#0b2e4c]"
              >
                <Map className="h-5 w-5" />
                EXPLORAR LOTES DISPONIBLES
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={buildWhatsAppLink(
                  "Hola Abraham! Vi PORTAL TERRENOS y quiero cotizar un lote. ¿Cuáles tienen disponibilidad inmediata?",
                  { source: "hero", medium: "website", campaign: "cotizar_hero" }
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-2xl border-2 border-white/40 bg-white/10 px-7 py-4 font-bold text-white backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white/20"
                onClick={() =>
                  trackEvent({
                    name: "whatsapp_click",
                    params: { button_location: "hero" },
                  })
                }
              >
                <MessageCircle className="h-5 w-5" />
                COTIZAR POR WHATSAPP
              </a>
            </div>
          </motion.div>

          {/* STATS */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mx-auto mt-20 grid max-w-6xl grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
          >
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-md transition-all hover:bg-white/10"
              >
                <div className="flex items-center gap-2 text-amber-300">
                  <s.icon className="h-5 w-5" />
                </div>
                <div className="mt-2 font-display text-3xl md:text-4xl font-black text-white">
                  {s.value}
                </div>
                <div className="mt-1 text-xs md:text-sm font-medium text-white/70">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* WAVE SEPARATOR */}
        <div className="absolute bottom-0 left-0 right-0 -z-0">
          <svg viewBox="0 0 1440 120" className="w-full" preserveAspectRatio="none">
            <path
              fill="#ffffff"
              d="M0,64 C360,112 720,0 1080,64 C1260,96 1380,80 1440,64 L1440,120 L0,120 Z"
            />
          </svg>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section id="beneficios" className="py-20 md:py-28 bg-white">
        <div className="container-app">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#0f4c81]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#0f4c81] mb-4">
              ¿Por qué elegirnos?
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight text-slate-900">
              ¿Por Qué Elegir{" "}
              <span className="bg-gradient-to-r from-[#0f4c81] to-[#1460a6] bg-clip-text text-transparent">
                Portal Terrenos?
              </span>
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Más de 15 años conectando familias peruanas con su patrimonio.
              Transparencia, seguridad y resultados comprobados.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {BENEFITS.map((b) => (
              <motion.div
                key={b.title}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-2xl hover:shadow-slate-900/5"
              >
                <div
                  className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${b.color} text-white shadow-lg`}
                >
                  <b.icon className="h-8 w-8" />
                </div>
                <h3 className="font-display text-xl font-bold text-slate-900">
                  {b.title}
                </h3>
                <p className="mt-3 text-slate-600 leading-relaxed">
                  {b.description}
                </p>
                <div className="mt-6 flex items-center gap-2 text-sm font-bold text-[#0f4c81]">
                  <CheckCircle2 className="h-4 w-4" />
                  Garantía Portal Terrenos
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROYECTOS DESTACADOS */}
      <section
        id="proyectos-destacados"
        className="py-20 md:py-28 bg-gradient-to-b from-slate-50 to-white"
      >
        <div className="container-app">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-800 mb-4">
                <TrendingUp className="h-3.5 w-3.5" />
                Nuestra cartera
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight text-slate-900">
                Explora Nuestros{" "}
                <span className="text-[#0f4c81]">Proyectos</span>
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                {PROJECTS.length} proyectos residenciales. Cada uno con su plano
                de Google My Maps, lotes disponibles, financiamiento y
                asesoramiento de Abraham.
              </p>
            </div>
            <Link
              href="#todos-proyectos"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-[#0f4c81]/20 bg-white px-5 py-3 font-bold text-[#0f4c81] transition-all hover:border-[#0f4c81] hover:bg-[#0f4c81]/5"
            >
              Ver {PROJECTS.length} proyectos
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  whileHover={{ y: -6 }}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-2xl hover:shadow-slate-900/10"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={p.heroImage}
                      alt={p.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#0f4c81] shadow-md">
                      <MapPin className="h-3.5 w-3.5" />
                      {p.location} · {p.region}
                    </div>
                    <div className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-black uppercase text-white shadow-md">
                      <DollarSign className="h-3.5 w-3.5" />
                      DESDE ${p.minPrice.toLocaleString()}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between text-[11px] font-bold text-white/90 mb-1.5">
                        <span>Vendido</span>
                        <span>{pct}% · {p.totalLots - p.availableLots} / {p.totalLots}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/30 backdrop-blur">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl font-bold text-slate-900 group-hover:text-[#0f4c81]">
                      {p.name}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                      {p.tagline}
                    </p>

                    <div className="mt-5 grid grid-cols-3 gap-2">
                      <div className="rounded-xl bg-slate-50 p-3 text-center">
                        <div className="flex justify-center text-[#0f4c81]">
                          <Ruler className="h-4 w-4" />
                        </div>
                        <div className="mt-1 font-display text-xs font-bold text-slate-900">
                          {p.minArea} - {p.maxArea}m²
                        </div>
                      </div>
                      <div className="rounded-xl bg-slate-50 p-3 text-center">
                        <div className="flex justify-center text-[#0f4c81]">
                          <Map className="h-4 w-4" />
                        </div>
                        <div className="mt-1 font-display text-xs font-bold text-slate-900">
                          {p.totalLots} lotes
                        </div>
                      </div>
                      <div className="rounded-xl bg-slate-50 p-3 text-center">
                        <div className="flex justify-center text-emerald-600">
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                        <div className="mt-1 font-display text-xs font-bold text-slate-900">
                          {p.availableLots} disp.
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center flex-wrap gap-1.5">
                      {p.amenities.slice(0, 3).map((a) => (
                        <span
                          key={a}
                          className="rounded-md bg-[#0f4c81]/5 px-2 py-1 text-[11px] font-semibold text-[#0f4c81]"
                        >
                          {a}
                        </span>
                      ))}
                      {p.amenities.length > 3 && (
                        <span className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-600">
                          +{p.amenities.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="mt-6 flex gap-3 pt-4 border-t border-slate-100">
                      <Link
                        href={`/proyectos/${p.slug}`}
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0f4c81] px-4 py-3 text-sm font-bold text-white transition-all hover:bg-[#1460a6] hover:shadow-lg hover:shadow-[#0f4c81]/25"
                        onClick={() =>
                          trackEvent({
                            name: "cta_click",
                            params: {
                              cta_label: `Ver proyecto ${p.name}`,
                              cta_location: "destacados",
                            },
                          })
                        }
                      >
                        Ver Detalles
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <a
                        href={buildWhatsAppLink(
                          `Hola Abraham! Estoy interesado/a en el proyecto ${p.name}. ¿Tienes lotes disponibles?`,
                          {
                            source: `proyecto_${p.slug}`,
                            medium: "website",
                            campaign: "card_proyecto",
                          }
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#0f4c81]/20 px-4 py-3 text-sm font-bold text-[#0f4c81] transition-all hover:border-[#0f4c81] hover:bg-[#0f4c81]/5"
                        onClick={() =>
                          trackEvent({
                            name: "whatsapp_click",
                            params: {
                              button_location: `proyecto_card_${p.slug}`,
                            },
                          })
                        }
                        aria-label="WhatsApp"
                      >
                        <MessageCircle className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* RESTO DE PROYECTOS compactos */}
          <div id="todos-proyectos" className="mt-16">
            <div className="mb-8">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-slate-900">
                Todos los Proyectos ({PROJECTS.length})
              </h3>
              <p className="mt-2 text-slate-600">
                Haz clic en cualquier tarjeta para ver su plano de Google My
                Maps y su disponibilidad actual.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {PROJECTS.slice(6).map((p) => (
                <Link
                  key={p.id}
                  href={`/proyectos/${p.slug}`}
                  className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-[#0f4c81]/30 hover:bg-[#0f4c81]/[0.02] hover:shadow-md"
                >
                  <div className="relative h-16 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-[#0f4c81] to-[#1460a6]">
                    <img
                      src={p.heroImage}
                      alt={p.name}
                      className="h-full w-full object-cover opacity-90 group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-bold text-slate-900 group-hover:text-[#0f4c81]">
                      {p.name}
                    </div>
                    <div className="truncate text-xs text-slate-500">
                      {p.region} · {p.location} · {p.totalLots} lotes
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-xs">
                      <span className="font-black text-[#0f4c81]">
                        ${p.minPrice.toLocaleString()}
                      </span>
                      <span className="text-slate-400">·</span>
                      <span className="font-semibold text-emerald-600">
                        {p.availableLots} disp.
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 flex-shrink-0 text-slate-300 group-hover:text-[#0f4c81] group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINANCIAMIENTO */}
      <section
        id="financiamiento"
        className="py-20 md:py-28 bg-gradient-to-br from-[#0f4c81] via-[#1460a6] to-[#0b2e4c] text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-amber-300 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-emerald-400 blur-3xl" />
        </div>

        <div className="container-app relative">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/90 ring-1 ring-white/20 mb-4">
                <Calculator className="h-3.5 w-3.5" />
                Sin letra chica
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-black leading-tight">
                Financiamiento{" "}
                <span className="bg-gradient-to-r from-amber-200 to-yellow-400 bg-clip-text text-transparent">
                  directo y flexible
                </span>
                , tú eliges cómo pagar.
              </h2>
              <p className="mt-6 text-lg text-white/85 leading-relaxed">
                En Portal Terrenos creemos en la inclusión financiera. Por eso
                diseñamos planes de pago adaptados a tu economía, con tasas
                preferenciales, cuotas fijas en soles o dólares, y sin
                intermediarios.
              </p>

              <ul className="mt-8 space-y-4">
                {[
                  "✅ Inicial desde 10% en proyectos seleccionados",
                  "✅ Plazo hasta 96 meses (8 años)",
                  "✅ Cuotas fijas, sin sorpresas ni recargos",
                  "✅ Tasa preferencial desde 1.1% mensual",
                  "✅ Opción soles o dólares (la que prefieras)",
                  "✅ Pre-evaluación inmediata por WhatsApp",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/90">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-300" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href={buildWhatsAppLink(
                    "Hola Abraham! Quiero una pre-evaluación de financiamiento para comprar mi lote. ¿Cuáles son los planes?",
                    { source: "financiamiento", medium: "website", campaign: "simulador_home" }
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-2xl bg-amber-300 px-7 py-4 font-extrabold text-[#0b2e4c] shadow-2xl shadow-black/20 transition-all hover:-translate-y-0.5 hover:bg-amber-200"
                  onClick={() =>
                    trackEvent({
                      name: "cta_click",
                      params: {
                        cta_label: "Solicitar pre-evaluación",
                        cta_location: "financiamiento_home",
                      },
                    })
                  }
                >
                  <Calculator className="h-5 w-5" />
                  SOLICITAR PRE-EVALUACIÓN
                </a>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-r from-amber-300/40 via-emerald-300/30 to-white/10 blur-xl" />
              <div className="relative rounded-3xl border border-white/15 bg-white/10 p-7 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div className="font-display text-lg font-bold">
                    Simulador rápido
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
                    <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                    Demo
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                  {[
                    { label: "Precio lote", val: "$25,000", tip: "Promedio" },
                    { label: "Inicial 20%", val: "$5,000", tip: "Una sola vez" },
                    { label: "Cuota (72m)", val: "$390", tip: "Tasa 1.15%" },
                  ].map((b) => (
                    <div
                      key={b.label}
                      className="rounded-2xl bg-white/8 p-4"
                    >
                      <div className="text-[11px] uppercase tracking-wider text-white/70 font-semibold">
                        {b.label}
                      </div>
                      <div className="mt-2 font-display text-2xl font-black text-amber-200">
                        {b.val}
                      </div>
                      <div className="mt-1 text-[11px] text-white/60">
                        {b.tip}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-5">
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold">
                        ¡Aprobación en 24h!
                      </div>
                      <div className="text-xs text-white/70">
                        Solo necesitamos 3 documentos
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/80">
                    💡 Tip: Haz clic en cualquier proyecto y usa el simulador
                    avanzado de esa página. Verás cuotas personalizadas, ITF,
                    cronograma detallado y podrás enviar a WhatsApp en 1 clic.
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section
        id="testimonios"
        className="py-20 md:py-28 bg-white relative overflow-hidden"
      >
        <div className="container-app">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-800 mb-4">
              <Star className="h-3.5 w-3.5 fill-amber-500" />
              Voces de nuestros clientes
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight text-slate-900">
              Historias de familias que ya{" "}
              <span className="bg-gradient-to-r from-[#0f4c81] to-[#1460a6] bg-clip-text text-transparent">
                invirtieron con nosotros
              </span>
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Más de 900 familias felices ya construyeron su patrimonio con
              Portal Terrenos. Tu historia podría ser la siguiente.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {TESTIMONIOS.map((t, i) => (
              <motion.figure
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="flex flex-col rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-6 shadow-sm hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="h-14 w-14 rounded-2xl object-cover ring-2 ring-[#0f4c81]/20"
                  />
                  <figcaption>
                    <div className="font-bold text-slate-900">{t.name}</div>
                    <div className="text-xs font-medium text-slate-500">
                      {t.role}
                    </div>
                  </figcaption>
                </div>
                <div className="mt-4 flex gap-0.5">
                  {Array.from({ length: t.stars }).map((_, k) => (
                    <Star
                      key={k}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed text-slate-700">
                  “{t.text}”
                </blockquote>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTO + MAPA */}
      <section id="contacto" className="py-20 md:py-28 bg-slate-50">
        <div className="container-app">
          <div className="grid gap-8 lg:grid-cols-5">
            {/* FORM + INFO */}
            <div className="lg:col-span-2">
              <div className="rounded-3xl bg-gradient-to-br from-[#0f4c81] via-[#1460a6] to-[#0b2e4c] p-8 text-white shadow-2xl shadow-[#0f4c81]/20">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest ring-1 ring-white/20 mb-4">
                  <Phone className="h-3.5 w-3.5" />
                  Contáctanos
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-black leading-tight">
                  Contáctanos para tu Inversión
                </h3>
                <p className="mt-3 text-white/80 text-sm">
                  Déjanos tus datos y Abraham Saul Portal Garcia se pondrá en
                  contacto contigo en menos de 24 horas.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                  <input
                    type="text"
                    placeholder="Nombre completo *"
                    required
                    value={formState.name}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, name: e.target.value }))
                    }
                    className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3.5 text-sm text-white placeholder-white/50 backdrop-blur focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-amber-300/50 transition-all"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, email: e.target.value }))
                    }
                    className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3.5 text-sm text-white placeholder-white/50 backdrop-blur focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-amber-300/50 transition-all"
                  />
                  <input
                    type="tel"
                    placeholder="Celular / WhatsApp *"
                    required
                    value={formState.phone}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, phone: e.target.value }))
                    }
                    className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3.5 text-sm text-white placeholder-white/50 backdrop-blur focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-amber-300/50 transition-all"
                  />
                  <textarea
                    rows={3}
                    placeholder="Mensaje (¿Qué proyecto te interesa?)"
                    value={formState.message}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, message: e.target.value }))
                    }
                    className="w-full resize-none rounded-xl border border-white/15 bg-white/10 px-4 py-3.5 text-sm text-white placeholder-white/50 backdrop-blur focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-amber-300/50 transition-all"
                  />
                  <button
                    type="submit"
                    disabled={formState.status === "sending"}
                    className="w-full rounded-xl bg-amber-300 px-5 py-4 text-sm font-black uppercase tracking-wide text-[#0b2e4c] shadow-xl transition-all hover:-translate-y-0.5 hover:bg-amber-200 disabled:opacity-70 disabled:hover:translate-y-0"
                  >
                    {formState.status === "sending"
                      ? "Enviando..."
                      : formState.status === "ok"
                      ? "✓ ¡Enviado! Te llamamos pronto."
                      : "Enviar Consulta"}
                  </button>
                  {formState.status === "error" && (
                    <p className="text-xs text-red-300">
                      Hubo un error. Escríbenos directamente por WhatsApp.
                    </p>
                  )}
                </form>

                <div className="mt-6 pt-6 border-t border-white/15 space-y-3">
                  <a
                    href={buildWhatsAppLink(
                      "Hola Abraham! Quiero información de tus proyectos.",
                      {
                        source: "contacto_side",
                        medium: "website",
                        campaign: "contacto_form",
                      }
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold transition-all hover:bg-white/20"
                  >
                    <MessageCircle className="h-5 w-5 text-emerald-300" />
                    WhatsApp: +51 926 301 972
                    <ExternalLink className="h-4 w-4 ml-auto text-white/50" />
                  </a>
                  <a
                    href="mailto:contacto@portalterrenos.pe"
                    className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold transition-all hover:bg-white/20"
                  >
                    📧 contacto@portalterrenos.pe
                  </a>
                  <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold">
                    <MapPin className="h-5 w-5 text-amber-300" />
                    Lambayeque · Chiclayo · Perú
                  </div>
                </div>
              </div>
            </div>

            {/* MAPA */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-slate-900">
                  Mapa de proyectos — Santa Margarita (Demo)
                </h3>
                <p className="mt-2 text-slate-600">
                  ✨ Este es tu plano de{" "}
                  <span className="font-semibold">Google My Maps</span>
                  integrado directamente. Puedes hacer zoom, ver las parcelas
                  marcadas y abrir en Google Maps completo. Repetiremos esto en
                  cada uno de tus {PROJECTS.length} proyectos.
                </p>
              </div>

              <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full bg-white/95 backdrop-blur px-4 py-2 text-xs font-bold text-[#0f4c81] shadow-lg ring-1 ring-black/5">
                  <Map className="h-4 w-4" />
                  Google My Maps · Santa Margarita – Polloc
                </div>
                <a
                  href="https://www.google.com/maps/d/u/0/viewer?mid=1PvoWFwx1KCVgwRaXNZgagA2QB5IDPy0&ll&z=16"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-4 right-4 z-10 inline-flex items-center gap-2 rounded-full bg-[#0f4c81] px-4 py-2 text-xs font-bold text-white shadow-lg hover:bg-[#1460a6] transition-all"
                >
                  Abrir en Google Maps
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <div className="aspect-[16/10] w-full">
                  <iframe
                    src="https://www.google.com/maps/d/embed?mid=1PvoWFwx1KCVgwRaXNZgagA2QB5IDPy0&hl=es"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mapa de proyectos - Portal Terrenos"
                    className="w-full h-full"
                  />
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <Link
                  href="/proyectos/santa-margarita-polloc"
                  className="rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:border-[#0f4c81]/30 hover:shadow-md"
                >
                  <div className="text-xs font-semibold text-slate-500">
                    Ver plano completo
                  </div>
                  <div className="mt-1 font-bold text-[#0f4c81]">
                    Santa Margarita →
                  </div>
                </Link>
                <Link
                  href="/proyectos/alameda-la-colpa"
                  className="rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:border-[#0f4c81]/30 hover:shadow-md"
                >
                  <div className="text-xs font-semibold text-slate-500">
                    Proyecto premium
                  </div>
                  <div className="mt-1 font-bold text-[#0f4c81]">
                    Alameda La Colpa →
                  </div>
                </Link>
                <Link
                  href="/proyectos/valle-5"
                  className="rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:border-[#0f4c81]/30 hover:shadow-md"
                >
                  <div className="text-xs font-semibold text-slate-500">
                    Nivel alto
                  </div>
                  <div className="mt-1 font-bold text-[#0f4c81]">
                    Valle 5 →
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* Helper to avoid unused-import warnings on format helpers */
export const _formatters = { formatPEN, formatUSD };
