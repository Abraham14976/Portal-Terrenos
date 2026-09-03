"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  FileCheck,
  Building2,
  Zap,
  Phone,
  Calendar,
  BadgeCheck,
  Award,
  User,
  MessageCircle,
  Download,
} from "lucide-react";
import { buildWhatsAppLink, formatCurrencyDollars } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/config/site";
import { saveLead } from "@/lib/supabase";

const LEGAL_STEPS = [
  {
    icon: FileCheck,
    title: "1. Separación",
    description:
      "Reserva tu lote con una cuota inicial mínima. Te entregamos contrato de separación y recibo formal.",
    color: "from-brand-500 to-brand-700",
    bg: "bg-brand-50",
    text: "text-brand-600",
  },
  {
    icon: ShieldCheck,
    title: "2. Independización",
    description:
      "Gestionamos la independización registral del lote. Tu propiedad queda 100% individualizada en SUNARP.",
    color: "from-blue-500 to-blue-700",
    bg: "bg-blue-50",
    text: "text-blue-600",
  },
  {
    icon: Building2,
    title: "3. Partida Registral",
    description:
      "Entrega de partida registral de tu lote a tu nombre. Garantía jurídica total sobre tu propiedad.",
    color: "from-purple-500 to-purple-700",
    bg: "bg-purple-50",
    text: "text-purple-600",
  },
  {
    icon: Zap,
    title: "4. Factibilidad de Servicios",
    description:
      "Conexiones certificadas de luz, agua, alcantarillado y gas. Documentación lista para iniciar construcción.",
    color: "from-gold-500 to-gold-700",
    bg: "bg-gold-50",
    text: "text-gold-600",
  },
];

export function TrustSection() {
  return (
    <section id="asesoria" className="relative py-20 md:py-28 bg-slate-50/60">
      <div className="container-app grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5"
        >
          <div className="sticky top-24">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
              <div className="relative bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 px-6 pt-8 pb-16 text-white">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
                <div className="flex items-center gap-2 text-brand-200">
                  <BadgeCheck className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Asesor Inmobiliario
                  </span>
                </div>
                <h3 className="mt-2 font-display text-2xl font-bold">
                  Tu asesor de confianza
                </h3>
              </div>

              <div className="-mt-12 px-6 pb-6">
                <div className="relative">
                  <div className="absolute inset-x-0 -top-1 h-1 w-full rounded-full bg-gradient-to-r from-brand-400 via-gold-400 to-brand-400" />
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-brand-400 to-gold-400" />
                        <img
                          src={siteConfig.advisor.photo}
                          alt={siteConfig.advisor.name}
                          className="relative h-20 w-20 rounded-full object-cover border-2 border-white"
                        />
                        <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366] text-white ring-4 ring-white">
                          <Phone className="h-3.5 w-3.5" />
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-display text-lg font-bold text-slate-900">
                          {siteConfig.advisor.name}
                        </h4>
                        <p className="mt-0.5 text-sm font-medium text-brand-700">
                          {siteConfig.advisor.role}
                        </p>
                        <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
                          <Award className="h-3.5 w-3.5 text-gold-500" />
                          {siteConfig.advisor.credentials}
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                      {[
                        { k: "+50", v: "Clientes felices" },
                        { k: "5 años", v: "Experiencia" },
                        { k: "4.9/5", v: "Calificación" },
                      ].map((s) => (
                        <div
                          key={s.v}
                          className="rounded-xl border border-slate-100 bg-slate-50/80 py-2.5"
                        >
                          <p className="font-display text-base font-bold text-slate-900">
                            {s.k}
                          </p>
                          <p className="text-[10px] uppercase tracking-wider text-slate-500">
                            {s.v}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 space-y-2.5">
                      <a
                        href={buildWhatsAppLink(
                          `Hola ${siteConfig.advisor.name}! He visto tu perfil en la web y quiero agendar una asesoría personalizada sobre los lotes disponibles.`,
                          {
                            source: "advisor_card",
                            medium: "website",
                            campaign: "asesor_whatsapp",
                          }
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-whatsapp w-full"
                        onClick={async () => {
                          trackEvent({
                            name: "whatsapp_click",
                            params: { button_location: "advisor_card" },
                          });
                          await saveLead({
                            name: "",
                            phone: "",
                            source: "advisor_card",
                            message: "Contacto desde tarjeta de asesor",
                          });
                        }}
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>WhatsApp corporativo</span>
                      </a>
                      <a
                        href={siteConfig.advisor.calendly}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary w-full"
                        onClick={() => {
                          trackEvent({
                            name: "cta_click",
                            params: {
                              cta_label: "Agendar visita/videollamada",
                              cta_location: "advisor_card",
                            },
                          });
                        }}
                      >
                        <Calendar className="h-4 w-4" />
                        <span>Agendar videollamada o visita</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-7"
        >
          <p className="section-heading">
            <ShieldCheck className="mr-1.5 inline h-4 w-4" />
            Seguridad Jurídica
          </p>
          <h2 className="section-title max-w-2xl">
            Proceso 100%{" "}
            <span className="gradient-text">transparente</span> y documentado
          </h2>
          <p className="section-subtitle">
            Tu inversión está respaldada por un equipo legal con más de 15 años
            de experiencia en proyectos inmobiliarios.
          </p>

          <div className="mt-10 space-y-4">
            {LEGAL_STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:shadow-lg hover:border-slate-300"
              >
                <div
                  className={`absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b ${step.color} opacity-0 group-hover:opacity-100 transition-opacity`}
                />
                <div className="flex items-start gap-4 sm:gap-5">
                  <div
                    className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl ${step.bg} ${step.text} shadow-sm`}
                  >
                    <step.icon className="h-7 w-7" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-display text-lg font-bold text-slate-900">
                      {step.title}
                    </h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                      {step.description}
                    </p>
                  </div>
                  <div className="hidden sm:block">
                    <span
                      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-xs font-bold text-slate-500`}
                    >
                      0{i + 1}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-10 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 sm:p-8 text-white shadow-xl"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h4 className="font-display text-xl font-bold">
                  Descarga el documento legal del proyecto
                </h4>
                <p className="mt-1.5 text-sm text-slate-300">
                  Ficha técnica, memoria descriptiva y planos oficiales.
                </p>
              </div>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  trackEvent({
                    name: "plan_download",
                    params: { plan_type: "legal_documentation" },
                  });
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
              >
                <Download className="h-4 w-4" />
                <span>Descargar PDF (1.2 MB)</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
