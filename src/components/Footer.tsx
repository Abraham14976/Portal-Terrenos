"use client";

import Link from "next/link";
import { Map, Phone, Mail, MapPin, Facebook, Instagram, Linkedin, MessageCircle, ExternalLink, Building2 } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/config/site";
import { PROJECTS } from "@/data/projects";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-950 text-slate-400">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950 to-[#04131f]" />
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0f4c81] via-amber-400 to-[#0f4c81]" />
      <div className="pointer-events-none absolute -left-40 top-20 h-72 w-72 rounded-full bg-[#0f4c81]/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="container-app relative py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* BRAND */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0f4c81] to-[#1460a6] text-white shadow-lg shadow-[#0f4c81]/50">
                <Map className="h-6 w-6" />
              </div>
              <div>
                <div className="font-display text-xl font-extrabold text-white tracking-tight">
                  PORTAL TERRENOS
                </div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300/80">
                  Abraham Saul Portal Garcia
                </div>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-slate-400">
              {siteConfig.description}
            </p>

            <div className="mt-6 flex gap-3">
              {[
                {
                  href: "https://facebook.com",
                  icon: Facebook,
                  hover: "hover:bg-blue-600",
                  label: "Facebook",
                },
                {
                  href: "https://instagram.com",
                  icon: Instagram,
                  hover: "hover:bg-pink-600",
                  label: "Instagram",
                },
                {
                  href: "https://linkedin.com",
                  icon: Linkedin,
                  hover: "hover:bg-blue-700",
                  label: "LinkedIn",
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-slate-400 ring-1 ring-white/10 transition-all hover:text-white ${s.hover} hover:-translate-y-0.5 hover:shadow-xl`}
                >
                  <s.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* PROYECTOS */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-amber-300" />
              <h4 className="font-display text-sm font-black uppercase tracking-widest text-white">
                Nuestros Proyectos
              </h4>
            </div>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
              {PROJECTS.slice(0, 10).map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/proyectos/${p.slug}`}
                    className="group inline-flex items-center gap-1.5 text-slate-400 transition-colors hover:text-amber-300"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#0f4c81] group-hover:bg-amber-300 transition-colors" />
                    <span className="truncate">{p.shortName}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="#proyectos-destacados"
              className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#67b7f3] hover:text-amber-300 transition-colors"
            >
              Ver todos los {PROJECTS.length} proyectos
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* CONTACTO */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-amber-300" />
                <h4 className="font-display text-sm font-black uppercase tracking-widest text-white">
                  Contacto
                </h4>
              </div>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white/5 text-amber-300 ring-1 ring-white/10">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <span>{siteConfig.address}</span>
                </li>
                <li className="flex items-start gap-3">
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="group flex items-start gap-3 transition-all"
                  >
                    <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white/5 text-[#67b7f3] ring-1 ring-white/10 group-hover:bg-emerald-600/20 group-hover:text-emerald-300">
                      <Phone className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="text-xs text-slate-500">
                        Llámanos al
                      </div>
                      <div className="font-bold text-white group-hover:text-emerald-300">
                        {siteConfig.phone}
                      </div>
                    </div>
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="group flex items-start gap-3"
                  >
                    <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white/5 text-[#67b7f3] ring-1 ring-white/10 group-hover:bg-[#0f4c81]/30 group-hover:text-white">
                      <Mail className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="text-xs text-slate-500">
                        Escríbenos a
                      </div>
                      <div className="font-bold text-white group-hover:text-amber-300">
                        {siteConfig.email}
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-[#0f4c81]/40 via-[#1460a6]/30 to-transparent p-5 ring-1 ring-white/10 backdrop-blur">
              <div className="text-xs font-black uppercase tracking-widest text-amber-300">
                Atención rápida
              </div>
              <div className="mt-1.5 text-base font-bold text-white leading-snug">
                ¿Prefieres WhatsApp? Te respondemos en minutos.
              </div>
              <a
                href={buildWhatsAppLink(undefined, {
                  source: "footer",
                  campaign: "contacto_footer",
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp mt-4 w-full justify-center"
                onClick={() => {
                  trackEvent({
                    name: "whatsapp_click",
                    params: { button_location: "footer" },
                  });
                }}
              >
                <MessageCircle className="h-5 w-5" />
                <span>Chatear por WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados. Hecho con 🇵🇪 por Abraham Saul Portal Garcia.
          </p>
          <div className="flex flex-wrap gap-5 text-xs text-slate-500">
            <Link href="#" className="transition-colors hover:text-white">
              Términos y Condiciones
            </Link>
            <Link href="#" className="transition-colors hover:text-white">
              Política de Privacidad
            </Link>
            <Link href="#" className="transition-colors hover:text-white">
              Libro de Reclamaciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
