"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  CheckCircle2,
  Crown,
  Gem,
  HeartHandshake,
  MapPin,
  MessageCircle,
  Shield,
  ShieldCheck,
  Sparkles,
  Star,
  ThumbsUp,
  Users,
} from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/config/site";

const TESTIMONIOS = [
  {
    name: "Mariana Rojas",
    city: "Chota, Cajamarca",
    role: "Compró en La Finca · 2 lotes",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=faces",
    stars: 5,
    text: "Conocí a Abraham por una publicación en Facebook. Tenía mis dudas pero me invitó a visitar La Finca personalmente y me mostró TODO: planos, títulos, escrituras. Compré 2 lotes a un súper precio y hoy su valor ya subió muchísimo. ¡Es un asesor SUPER recomendado!",
    video: false,
    before: true,
  },
  {
    name: "Jorge Mendoza",
    city: "Cajamarca",
    role: "Compró en Santa Margarita Polloc",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=faces",
    stars: 5,
    text: "Vine de Lima para invertir en Cajamarca. No conocía a nadie, por suerte contacté a Abraham. Me explicó todo con total transparencia, incluso cosas que otros asesores me ocultaron. Mi familia ya construye su casa ahí. 10/10.",
    video: false,
  },
  {
    name: "Patricia Campos",
    city: "Bambamarca",
    role: "Invirtió en Valle 5 · Premium",
    photo:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=faces",
    stars: 5,
    text: "Valle 5 es lo MEJOR. Piscina, seguridad 24/7, gimnasio. Tengo 3 lotes ahí y 2 ya los rento para Airbnb los fines de semana. La rentabilidad que me genera es una locura. ¡Gracias Abraham por la recomendación!",
    video: false,
  },
  {
    name: "David Palacios",
    city: "San Miguel",
    role: "Compró en Alameda La Colpa",
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=faces",
    stars: 5,
    text: "Mis hijos no paraban de pedirme una casa con piscina. Vi Alameda La Colpa en Portal Terrenos y nos enamoramos. El proceso de compra fue sin letra chica, Abraham estuvo presente en TODO. ¡Muy feliz!",
    video: false,
  },
  {
    name: "Rosa Avalos",
    city: "Cajamarca",
    role: "Compró lote en Valle 7",
    photo:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=faces",
    stars: 5,
    text: "Era mi PRIMERA vez comprando un terreno y tenía terror. Abraham me explicó TODO como si le hablara a su hermana: trámites, partidas, Sunarp, riesgos. Me sentí acompañada. Valle 7 fue la mejor opción por mi presupuesto. ¡Mil gracias!",
    video: false,
  },
  {
    name: "Fernando Huaman",
    city: "Chota",
    role: "3 proyectos en cartera",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=faces",
    stars: 5,
    text: "Soy inversionista y he trabajado con MUCHOS asesores. Abraham está EN OTRO NIVEL. Responde al instante por WhatsApp, siempre tiene la data actualizada, precios honestos. Tengo 3 lotes en Valle 4, La Pirca y Planicies del Valle. ¡Sociazo!",
    video: false,
  },
];

const STATISTICS = [
  { icon: Users, value: "+900", label: "Familias felices" },
  { icon: BadgeCheck, value: "+1,200", label: "Lotes vendidos en Cajamarca" },
  { icon: Award, value: "+15", label: "Años de experiencia" },
  { icon: Crown, value: "TOP 3", label: "Asesor inmobiliario Cajamarca" },
];

export function TestimonialsPage() {
  return (
    <div className="pt-20">
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-slate-50 to-white">
        <div className="pointer-events-none absolute -top-20 right-0 h-96 w-96 rounded-full bg-[#0f4c81]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-10 h-[500px] w-[500px] rounded-full bg-amber-300/15 blur-3xl" />
        <div className="container-app relative py-20 md:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#0f4c81]/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#0f4c81] mb-6">
              <HeartHandshake className="h-3.5 w-3.5" />
              Confianza y transparencia
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-black leading-[1.05] tracking-tight text-slate-900">
              Historias reales de personas que ya{" "}
              <span className="bg-gradient-to-r from-[#0f4c81] via-[#1460a6] to-[#0f4c81] bg-clip-text text-transparent">
                construyeron su patrimonio
              </span>{" "}
              con nosotros
            </h1>
            <p className="mt-6 text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Más de 900 familias en Cajamarca ya invirtieron en lotes con
              Portal Terrenos. Escucha sus propias palabras: sin filtros, sin
              guiones, solo experiencias reales.
            </p>

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
              {STATISTICS.map((s) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0f4c81] to-[#1460a6] text-white shadow-lg shadow-[#0f4c81]/20">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <div className="mt-4 font-display text-4xl font-black text-slate-900">
                    {s.value}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-slate-500">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={buildWhatsAppLink(
                  "Hola Abraham! Vi tus testimonios y quiero ser parte. ¿Cuáles proyectos tienen promoción hoy?",
                  { source: "testimonios_hero", medium: "website", campaign: "testimonios_cta" }
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp !py-4 !text-base shadow-2xl shadow-emerald-600/20"
                onClick={() =>
                  trackEvent({
                    name: "whatsapp_click",
                    params: { button_location: "testimonios_hero" },
                  })
                }
              >
                <MessageCircle className="h-5 w-5" />
                Quiero invertir también
              </a>
              <Link
                href="/proyectos"
                className="inline-flex items-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-6 py-4 text-sm font-black uppercase tracking-wide text-slate-700 shadow-sm transition-all hover:border-[#0f4c81] hover:text-[#0f4c81] hover:-translate-y-0.5"
              >
                Ver todos los proyectos
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* GRID TESTIMONIOS */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-app">
          <div className="flex flex-col items-center text-center mb-14 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-amber-800 mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              + 900 reseñas reales
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight text-slate-900">
              Ellos ya dijeron{" "}
              <span className="text-[#0f4c81]">¡SÍ!</span>
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Unas palabras de quienes ya confiaron en Portal Terrenos para su
              futuro.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIOS.map((t, idx) => (
              <motion.article
                key={t.name + idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-8 shadow-sm transition-all hover:shadow-2xl hover:shadow-slate-900/5"
              >
                <div className="absolute top-6 right-6 opacity-90">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#0f4c81] to-[#1460a6] flex items-center justify-center text-white shadow-lg shadow-[#0f4c81]/20">
                    <Gem className="h-6 w-6" />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="h-16 w-16 rounded-3xl object-cover ring-2 ring-[#0f4c81]/20"
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <div className="font-display text-lg font-black text-slate-900">
                      {t.name}
                    </div>
                    <div className="text-xs font-bold text-slate-500 flex items-center gap-1.5 mt-0.5">
                      <MapPin className="h-3 w-3" />
                      {t.city}
                    </div>
                    <div className="text-xs font-bold text-[#0f4c81] mt-0.5">
                      {t.role}
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-0.5">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-amber-400 text-amber-400 drop-shadow-sm"
                    />
                  ))}
                  <span className="ml-2 text-xs font-black text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg">
                    5.0 · Certificado
                  </span>
                </div>

                <p className="mt-5 text-slate-700 leading-relaxed text-[15px] flex-1">
                  “{t.text}”
                </p>

                <div className="mt-6 pt-6 border-t border-slate-200/70 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                      Verificado Portal Terrenos
                    </span>
                  </div>
                  <ThumbsUp className="h-5 w-5 text-slate-300 group-hover:text-[#0f4c81] transition-colors" />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f4c81] via-[#1460a6] to-[#0b2e4c]" />
        <div className="pointer-events-none absolute -left-20 top-0 h-96 w-96 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="container-app relative text-white text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest ring-1 ring-white/20 mb-6">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />
            Garantía Portal Terrenos
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-black leading-[1.05] tracking-tight">
            Tu historia podría ser la{" "}
            <span className="bg-gradient-to-r from-amber-200 to-yellow-400 bg-clip-text text-transparent">
              próxima
            </span>
          </h2>
          <p className="mt-6 text-lg md:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed">
            Títulos de propiedad limpios, planos oficiales, trámites
            transparentes y una persona (Abraham) contigo de principio a fin.
            Tu futuro patrimonio empieza con un solo mensaje.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={buildWhatsAppLink(
                "Hola Abraham! Quiero empezar HOY mismo. ¿Tienes promociones en Cajamarca? Cuéntame todo.",
                {
                  source: "testimonios_final",
                  medium: "website",
                  campaign: "testimonios_cta_final",
                }
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp !py-4 !text-base shadow-2xl shadow-black/20"
              onClick={() =>
                trackEvent({
                  name: "whatsapp_click",
                  params: { button_location: "testimonios_bottom" },
                })
              }
            >
              <MessageCircle className="h-5 w-5" />
              <span>Empezar mi inversión HOY</span>
            </a>
            <Link
              href="/nosotros"
              className="inline-flex items-center gap-2 rounded-2xl border-2 border-white/30 bg-white/10 px-6 py-4 text-sm font-black uppercase tracking-wide text-white backdrop-blur transition-all hover:bg-white/20 hover:-translate-y-0.5"
            >
              Conoce a Abraham
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
