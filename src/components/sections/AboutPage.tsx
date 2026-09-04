"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Briefcase,
  Calendar,
  CheckCircle2,
  FileCheck2,
  HeartHandshake,
  Languages,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Users,
} from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/config/site";

const TIMELINE = [
  {
    year: "2009",
    title: "Inicios en el mundo inmobiliario",
    desc: "Abraham Portal empieza asesorando a familias en proyectos habitacionales de la región Cajamarca.",
    icon: Star,
  },
  {
    year: "2015",
    title: "Primera cartera propia",
    desc: "Lanzamiento de los primeros proyectos Valle 1, 2 y 3 en Cajamarca. +200 familias felices.",
    icon: Briefcase,
  },
  {
    year: "2019",
    title: "Crecimiento regional",
    desc: "Expansión a Polloc, La Colpa, Bambamarca. Consolidados como asesor #1 en lotes urbanos.",
    icon: MapPin,
  },
  {
    year: "2022",
    title: "Lanzamiento oficial Portal Terrenos",
    desc: "Nace Portal Terrenos con 10 proyectos en cartera y planos digitales de Google My Maps.",
    icon: Sparkles,
  },
  {
    year: "Hoy",
    title: "+1,200 lotes vendidos",
    desc: "Cajamarca, Chota, Bambamarca, San Miguel y más. El único asesor con planos interactivos y WhatsApp 24/7.",
    icon: Award,
  },
];

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Transparencia total",
    desc: "Te mostramos el título, partida registral y todos los documentos ANTES de cualquier pago. Sin letra chica.",
    color: "from-emerald-500 to-emerald-700",
  },
  {
    icon: HeartHandshake,
    title: "Acompañamiento permanente",
    desc: "Abraham estará contigo desde la primera llamada hasta la firma de escrituras. 7 días a la semana.",
    color: "from-rose-500 to-rose-700",
  },
  {
    icon: Target,
    title: "Plusvalía comprobada",
    desc: "Solo trabajamos en zonas de alto crecimiento. Todos los lotes suben de valor el primer año.",
    color: "from-[#0f4c81] to-[#1460a6]",
  },
  {
    icon: Languages,
    title: "Atención bilingüe",
    desc: "Te atendemos en español o quechua. También a peruanos en el extranjero (EEUU, España, Chile y más).",
    color: "from-amber-500 to-amber-700",
  },
];

const CREDENTIALS = [
  "Registro Inmobiliario Oficial",
  "Registro de Corredores Sunarp",
  "Miembro Cámara de Comercio Cajamarca",
  "Certificación Sunarp en Derechos Reales",
  "Asesor Verificado por +1000 clientes",
  "Canal oficial Google My Maps + GeoLocal",
];

export function AboutPage() {
  return (
    <div className="pt-20">
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-slate-950 via-[#0b2e4c] to-[#0f4c81] text-white">
        <div className="pointer-events-none absolute -left-20 top-10 h-96 w-96 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-[500px] w-[500px] rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="container-app relative py-20 md:py-28 grid gap-12 lg:grid-cols-5 items-center">
          <div className="lg:col-span-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest ring-1 ring-white/20 mb-6">
              <BadgeCheck className="h-3.5 w-3.5 text-amber-300" />
              Sobre Portal Terrenos
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-black leading-[1.05] tracking-tight">
              Más de 15 años{" "}
              <span className="bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
                construyendo patrimonios
              </span>{" "}
              en Cajamarca
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/85 leading-relaxed max-w-2xl">
              Somos el asesor inmobiliario N°1 en lotes urbanos y campestres
              del departamento. Abraham Saul Portal Garcia, con +1,200
              operaciones exitosas, te invita a ser parte de la familia Portal
              Terrenos.
            </p>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl">
              {[
                { v: "+15", l: "Años" },
                { v: "+1,200", l: "Lotes vendidos" },
                { v: "+900", l: "Clientes" },
                { v: "10", l: "Proyectos" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="rounded-2xl border border-white/15 bg-white/8 p-4 backdrop-blur"
                >
                  <div className="font-display text-2xl md:text-3xl font-black text-amber-300">
                    {s.v}
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-white/60">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 relative">
            <div className="absolute -top-6 -left-6 h-full w-full rounded-[2.5rem] bg-gradient-to-br from-amber-300/20 to-emerald-400/10 blur-2xl" />
            <div className="relative rounded-[2.5rem] border border-white/20 bg-white/5 p-6 backdrop-blur shadow-2xl">
              <div className="rounded-3xl overflow-hidden aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=1000&fit=crop"
                  alt="Abraham Saul Portal Garcia - Asesor Inmobiliario"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=1000&fit=crop";
                  }}
                />
              </div>
              <div className="mt-5">
                <div className="font-display text-2xl md:text-3xl font-black">
                  {siteConfig.advisor.name}
                </div>
                <div className="text-sm text-white/75 mt-1 font-semibold">
                  {siteConfig.advisor.role}
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-black uppercase tracking-wider">
                    <Users className="h-3.5 w-3.5" />
                    900+ clientes
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-black uppercase tracking-wider">
                    <Award className="h-3.5 w-3.5" />
                    Top 3 Cajamarca
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-black uppercase tracking-wider">
                    <Languages className="h-3.5 w-3.5" />
                    ES / QH
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <a
                    href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/15 px-4 py-3 text-xs font-black uppercase tracking-wide backdrop-blur hover:bg-white/25 transition-all"
                  >
                    <Phone className="h-4 w-4 text-emerald-300" />
                    Llamar
                  </a>
                  <a
                    href={buildWhatsAppLink(
                      "Hola Abraham! Vi tu sección 'Nosotros' y quiero agendar una reunión para charlar sobre lotes en Cajamarca.",
                      {
                        source: "nosotros_hero",
                        medium: "website",
                        campaign: "reunion_personal",
                      }
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-300 px-4 py-3 text-xs font-black uppercase tracking-wide text-[#0b2e4c] hover:bg-amber-200 transition-all"
                    onClick={() =>
                      trackEvent({
                        name: "whatsapp_click",
                        params: { button_location: "nosotros_hero" },
                      })
                    }
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALORES */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container-app">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#0f4c81]/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#0f4c81] mb-4">
              <Star className="h-3.5 w-3.5" />
              Por qué somos diferentes
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight text-slate-900">
              4 valores que nos{" "}
              <span className="bg-gradient-to-r from-[#0f4c81] to-[#1460a6] bg-clip-text text-transparent">
                mueven todos los días
              </span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -8 }}
                className="group relative flex flex-col rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-7 shadow-sm transition-all hover:shadow-2xl hover:shadow-slate-900/10 overflow-hidden"
              >
                <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br ${v.color} text-white shadow-lg`}>
                  <v.icon className="h-8 w-8" />
                </div>
                <h3 className="font-display text-xl font-black text-slate-900">
                  {v.title}
                </h3>
                <p className="mt-3 text-slate-600 leading-relaxed">{v.desc}</p>
                <CheckCircle2 className="mt-6 h-6 w-6 text-slate-200 group-hover:text-emerald-500 transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LÍNEA DE TIEMPO */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-slate-50 to-white border-y border-slate-200">
        <div className="container-app">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-amber-800 mb-4">
              <Calendar className="h-3.5 w-3.5" />
              Nuestra historia
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight text-slate-900">
              Del 2009 a hoy:{" "}
              <span className="text-[#0f4c81]">+1,200 historias</span>
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Cada hito es un testimonio del compromiso con Cajamarca y su
              gente.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 hidden md:block w-0.5 bg-gradient-to-b from-transparent via-[#0f4c81]/30 to-transparent -translate-x-1/2" />
            <div className="space-y-10">
              {TIMELINE.map((t, i) => (
                <motion.div
                  key={t.year}
                  initial={{ opacity: 0, x: i % 2 ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className={`relative grid gap-6 md:grid-cols-2 items-center ${
                    i % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"
                  }`}
                >
                  <div
                    className={`md:px-10 ${
                      i % 2 === 0 ? "md:text-right" : "md:text-left"
                    }`}
                  >
                    <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-amber-800 ring-1 ring-amber-200 mb-3">
                      <Calendar className="h-3.5 w-3.5" />
                      {t.year}
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl font-black text-slate-900">
                      {t.title}
                    </h3>
                    <p className="mt-3 text-slate-600 leading-relaxed max-w-xl md:ml-auto">
                      {t.desc}
                    </p>
                  </div>

                  <div className="md:px-10">
                    <div className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl transition-shadow overflow-hidden">
                      <div className="absolute -top-10 right-6 h-28 w-28 rounded-full bg-[#0f4c81]/5 blur-2xl" />
                      <div className="relative inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-[#0f4c81] to-[#1460a6] text-white shadow-lg shadow-[#0f4c81]/20 mb-4">
                        <t.icon className="h-8 w-8" />
                      </div>
                      <div className="font-display text-sm font-black uppercase tracking-widest text-slate-400">
                        Hito N° {i + 1}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CREDENCIALES */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container-app grid gap-10 lg:grid-cols-5 items-center">
          <div className="lg:col-span-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#0f4c81]/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#0f4c81] mb-4">
              <FileCheck2 className="h-3.5 w-3.5" />
              Credenciales
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              Respaldo oficial y{" "}
              <span className="bg-gradient-to-r from-[#0f4c81] to-[#1460a6] bg-clip-text text-transparent">
                certificaciones
              </span>{" "}
              que avalan nuestro trabajo
            </h2>
            <p className="mt-5 text-slate-600 leading-relaxed">
              Invertir en un lote es una decisión de vida. Por eso compartimos
              todas las credenciales, colegiaturas y membresías: para que
              inviertas con los ojos cerrados… de tranquilidad.
            </p>
          </div>
          <div className="lg:col-span-3 grid gap-3 sm:grid-cols-2">
            {CREDENTIALS.map((c, i) => (
              <motion.div
                key={c}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 hover:border-[#0f4c81]/30 hover:bg-white hover:shadow-md transition-all"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                  <BadgeCheck className="h-6 w-6" />
                </div>
                <div className="font-bold text-slate-800 leading-snug">{c}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-amber-300 to-yellow-300" />
        <div className="pointer-events-none absolute -left-20 top-0 h-96 w-96 rounded-full bg-white/40 blur-3xl" />
        <div className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 rounded-full bg-[#0f4c81]/10 blur-3xl" />
        <div className="container-app relative text-[#0b2e4c] text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/60 backdrop-blur px-4 py-1.5 text-[11px] font-black uppercase tracking-widest ring-1 ring-white mb-6">
            <HeartHandshake className="h-3.5 w-3.5" />
            Estamos a un WhatsApp de distancia
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-black leading-[1.05] tracking-tight">
            ¿Listo para construir tu legado en{" "}
            <span className="text-[#0f4c81]">Cajamarca?</span>
          </h2>
          <p className="mt-6 text-lg md:text-xl text-[#0b2e4c]/80 max-w-2xl mx-auto leading-relaxed">
            Agenda una llamada personalizada 1 a 1 con Abraham. Sin costo, sin
            compromisos. Solo información honesta.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={buildWhatsAppLink(
                "Hola Abraham! Quiero agendar una llamada 1 a 1 contigo para revisar opciones de lotes en Cajamarca. Te cuento:  (mi presupuesto / tipo de proyecto / distrito...)",
                {
                  source: "nosotros_cta_final",
                  medium: "website",
                  campaign: "reunion_personal",
                }
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp justify-center !py-4 !text-base shadow-2xl shadow-emerald-700/20"
              onClick={() =>
                trackEvent({
                  name: "whatsapp_click",
                  params: { button_location: "nosotros_bottom" },
                })
              }
            >
              <MessageCircle className="h-5 w-5" />
              Agendar llamada personalizada
            </a>
            <Link
              href="/proyectos"
              className="inline-flex items-center gap-2 rounded-2xl bg-white/90 ring-1 ring-white px-6 py-4 text-sm font-black uppercase tracking-wide text-[#0b2e4c] shadow-md transition-all hover:bg-white hover:-translate-y-0.5"
            >
              Ver 10 proyectos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
