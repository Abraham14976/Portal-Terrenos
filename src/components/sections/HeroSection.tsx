"use client";

import { motion } from "framer-motion";
import { MapPin, Play, ChevronDown, CheckCircle, ArrowRight, Calculator, Sparkles } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/config/site";
import { LOTS_DATA } from "@/data/lots";

const HERO_FEATURES = [
  "Lotes desde 100 m² en Cajamarca",
  "10 proyectos en Cajamarca",
  "Documentos legales incluidos",
  "Áreas de 100 - 280 m²",
];

export function HeroSection() {
  const lotsDisponibles = LOTS_DATA.filter((l) => l.status === "disponible").length;

  return (
    <section
      id="inicio"
      className="relative isolate overflow-hidden pt-24 md:pt-32 pb-20 md:pb-32"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-gold-50/50" />
        <div className="absolute inset-x-0 top-0 -z-10 overflow-hidden">
          <div
            className="absolute left-[1/2 top-0 h-[800px] w-[1600px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-brand-200/50 via-transparent to-gold-200/40 blur-3xl"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="container-app grid items-center gap-12 lg:grid-cols-2">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/80 px-4 py-2 text-xs font-semibold text-brand-700 shadow-sm backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5 text-gold-500" />
            <span>{siteConfig.projectName}</span>
            <span className="text-brand-500">·</span>
            <span className="text-slate-600">Nuevo lanzamiento</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
          >
            Invierte en tu futuro con un{" "}
            <span className="gradient-text">lote residencial</span> listo para construir
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600"
          >
            Descubre una exclusiva lotización con áreas verdes, seguridad 24/7, piscina y
            acceso controlado. <strong>{lotsDisponibles} lotes</strong> premium disponibles con
            documentos legales y título de propiedad inscrito en SUNARP.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap"
          >
            {HERO_FEATURES.map((f) => (
              <div
                key={f}
                className="flex items-center gap-2 rounded-lg border border-slate-200/80 bg-white/70 px-3 py-2 text-sm font-medium text-slate-700 backdrop-blur"
              >
                <CheckCircle className="h-4 w-4 text-brand-500" />
                {f}
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="#plano"
              className="btn-primary"
              onClick={() => {
                trackEvent({
                  name: "cta_click",
                  params: {
                    cta_label: "Ver Lotes Disponibles",
                    cta_location: "hero",
                  },
                });
              }}
            >
              <MapPin className="h-4 w-4" />
              <span>Ver Lotes Disponibles</span>
            </a>
            <a
              href={buildWhatsAppLink(
                "Hola! He visto el proyecto en tu web y quiero más información sobre los lotes disponibles y los documentos legales.",
                {
                  source: "hero",
                  medium: "website",
                  campaign: "hero_cta",
                  content: "whatsapp_cotizar",
                }
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
              onClick={() => {
                trackEvent({
                  name: "whatsapp_click",
                  params: {
                    utm_source: "hero",
                    button_location: "hero",
                  },
                });
              }}
            >
              <Play className="h-4 w-4 fill-current" />
              <span>Cotizar por WhatsApp</span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-12 flex items-center gap-4"
          >
            <div className="flex -space-x-3">
              {[
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
              ].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="h-10 w-10 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
            <div className="text-sm">
              <div className="flex items-center gap-1 text-amber-500">
                {"★★★★★".split("").map((s, i) => (
                  <span key={i}>{s}</span>
                ))}
                <span className="ml-1 font-semibold text-slate-700">4.9/5</span>
              </div>
              <p className="text-slate-600">
                +50 familias confiaron en nosotros
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-brand-400/20 to-gold-400/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-3xl border border-white/80 bg-white shadow-2xl shadow-brand-500/10">
            <img
              src="https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&h=900&fit=crop"
              alt="Vista aérea residencial"
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-white/80">Ubicación privilegiada</p>
                  <p className="mt-1 font-display text-xl font-bold text-white">
                    Zona de alto crecimiento
                  </p>
                </div>
                <div className="flex items-center gap-4 rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-md border border-white/20">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                    <Calculator className="h-5 w-5 text-white" />
                  </div>
                  <a
                    href="#simulador"
                    className="text-sm font-semibold text-white hover:underline"
                  >
                    Simular cuotas
                    <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            className="absolute -bottom-6 -left-6 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Precio desde</p>
              <p className="font-display text-lg font-bold text-slate-900">Consulta precio por WhatsApp</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute -top-4 -right-4 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-100 text-gold-600">
              <CheckCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Lotes disponibles</p>
              <p className="font-display text-lg font-bold text-slate-900">
                {lotsDisponibles} unidades
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="mt-20 flex justify-center">
        <a
          href="#plano"
          className="group flex flex-col items-center gap-2 text-slate-500 transition-colors hover:text-brand-600"
        >
          <span className="text-xs font-semibold uppercase tracking-wider">
            Conoce el proyecto
          </span>
          <ChevronDown className="h-5 w-5 animate-bounce-slow" />
        </a>
      </div>
    </section>
  );
}
