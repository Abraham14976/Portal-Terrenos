"use client";

import { motion } from "framer-motion";
import {
  Trees,
  Waves,
  Shield,
  Camera,
  Car,
  Dumbbell,
  Footprints,
  Sparkles,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { LOTS_DATA } from "@/data/lots";
import { buildWhatsAppLink, formatCurrencyDollars } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/config/site";

const AMENITIES = [
  {
    icon: Waves,
    title: "Piscina recreativa",
    description:
      "Piscina semi-olímpica con zona de niños y solárium.",
    color: "from-sky-400 to-blue-600",
    bg: "bg-sky-50",
  },
  {
    icon: Trees,
    title: "Parque central",
    description:
      "Área verde de 3,000 m² con juegos infantiles.",
    color: "from-green-400 to-brand-600",
    bg: "bg-brand-50",
  },
  {
    icon: Dumbbell,
    title: "Gimnasio al aire libre",
    description:
      "Equipos de última generación en zona abierta.",
    color: "from-orange-400 to-red-500",
    bg: "bg-orange-50",
  },
  {
    icon: Shield,
    title: "Seguridad 24/7",
    description:
      "Cercado perimetral, control de acceso y CCTV.",
    color: "from-indigo-400 to-purple-600",
    bg: "bg-indigo-50",
  },
  {
    icon: Footprints,
    title: "Ciclovía interna",
    description:
      "2.5 km de ciclovía pavimentada y senderos peatonales.",
    color: "from-pink-400 to-rose-600",
    bg: "bg-pink-50",
  },
  {
    icon: Car,
    title: "Estacionamiento visitantes",
    description:
      "Áreas cubiertas para visitas en cada bloque.",
    color: "from-amber-400 to-gold-600",
    bg: "bg-gold-50",
  },
];

const HIGHLIGHTS = [
  {
    label: "Entrega inmediata",
    value: "Sí",
    desc: "Lotes listos para escriturar",
  },
  {
    label: "Área total",
    value: "25,000 m²",
    desc: "de terreno consolidado",
  },
  {
    label: "Lotes totales",
    value: `${LOTS_DATA.length}`,
    desc: "unidades premium",
  },
  {
    label: "Precio desde",
    value: formatCurrencyDollars(
      Math.min(...LOTS_DATA.map((l) => l.price_usd))
    ),
    desc: "con financiamiento",
  },
];

export function ProjectSection() {
  return (
    <section id="proyecto" className="relative py-20 md:py-28 bg-white">
      <div className="container-app">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-heading"
          >
            <Sparkles className="mr-1.5 inline h-4 w-4" />
            Sobre el Proyecto
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            Vive en un entorno{" "}
            <span className="gradient-text">premium y familiar</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto"
          >
            {siteConfig.projectName} es una lotización pensada en tu bienestar,
            con amenities de primer nivel y una ubicación estratégica en zona
            de alto crecimiento.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-5"
        >
          {HIGHLIGHTS.map((h, i) => (
            <div
              key={h.label}
              className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 text-center shadow-sm"
              style={{
                transformOrigin: "bottom",
                animation: `float 3s ease-in-out ${i * 0.2}s infinite`,
              }}
            >
              <p className="text-xs uppercase tracking-wider text-slate-500">
                {h.label}
              </p>
              <p className="mt-2 font-display text-2xl font-extrabold text-slate-900 sm:text-3xl">
                {h.value}
              </p>
              <p className="mt-1 text-xs text-slate-500">{h.desc}</p>
            </div>
          ))}
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-br from-brand-300/30 via-gold-300/20 to-transparent blur-2xl" />
            <div className="relative grid grid-cols-6 gap-3">
              <div className="col-span-4 overflow-hidden rounded-2xl shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop"
                  alt="Vista frontal del conjunto"
                  className="h-full w-full object-cover aspect-[4/3]"
                />
              </div>
              <div className="col-span-2 space-y-3">
                <div className="overflow-hidden rounded-2xl shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400&h=300&fit=crop"
                    alt="Piscina"
                    className="w-full aspect-square object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop"
                    alt="Áreas verdes"
                    className="w-full aspect-square object-cover"
                  />
                </div>
              </div>
              <div className="col-span-3 overflow-hidden rounded-2xl shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=400&fit=crop"
                  alt="Lotes listos para construir"
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
              <div className="col-span-3 overflow-hidden rounded-2xl shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop"
                  alt="Vista aérea"
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
              Amenidades incluidas
            </h3>
            <p className="mt-3 text-slate-600">
              Todo lo que tu familia necesita para vivir al máximo. Sin
              gastos adicionales de mantenimiento durante el primer año.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {AMENITIES.map((a, i) => (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.35 }}
                  className="card-hover flex items-start gap-3"
                >
                  <div
                    className={`relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${a.bg} overflow-hidden`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${a.color} opacity-10`}
                    />
                    <a.icon
                      className="h-5 w-5 relative z-10"
                      style={{
                        color: "#22c55e",
                        filter: "saturate(1.5)",
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-900">
                      {a.title}
                    </h4>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-600">
                      {a.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50/80 p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">
                    Ubicación privilegiada
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {[
                      "A 5 min del centro comercial más grande",
                      "Colegios privados a 3 min",
                      "Acceso directo a avenida principal",
                      "Zona de alto valor comercial",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-slate-600"
                      >
                        <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-brand-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
