"use client";

import Link from "next/link";
import { Map, Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer id="contacto" className="relative overflow-hidden bg-slate-900 text-slate-300">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-500 via-gold-500 to-brand-500" />

      <div className="container-app relative py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white">
                <Map className="h-5 w-5" />
              </div>
              <span className="font-display text-xl font-bold text-white">
                {siteConfig.projectName}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-slate-400 transition-colors hover:bg-blue-600 hover:text-white"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-slate-400 transition-colors hover:bg-pink-600 hover:text-white"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-slate-400 transition-colors hover:bg-blue-700 hover:text-white"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-base font-bold text-white">Navegación</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                { label: "Inicio", href: "#inicio" },
                { label: "Plano Interactivo", href: "#plano" },
                { label: "Simulador Financiero", href: "#simulador" },
                { label: "Sobre el Proyecto", href: "#proyecto" },
                { label: "Asesoría", href: "#asesoria" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-slate-400 transition-colors hover:text-brand-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-base font-bold text-white">Contacto</h4>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-400" />
                <span className="text-slate-400">{siteConfig.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-400" />
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="text-slate-400 transition-colors hover:text-brand-400"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-400" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-slate-400 transition-colors hover:text-brand-400"
                >
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-base font-bold text-white">
              ¿Tienes dudas?
            </h4>
            <p className="mt-4 text-sm text-slate-400">
              Escríbenos directamente al WhatsApp y te atenderemos en menos de 5 minutos.
            </p>
            <a
              href={buildWhatsAppLink(undefined, {
                source: "footer",
                campaign: "contacto_footer",
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp mt-5 w-full"
              onClick={() => {
                trackEvent({
                  name: "whatsapp_click",
                  params: { button_location: "footer" },
                });
              }}
            >
              <Phone className="h-4 w-4" />
              <span>Chatear por WhatsApp</span>
            </a>
          </div>
        </div>

        <div className="mt-16 border-t border-slate-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-xs text-slate-500">
              <Link href="#" className="hover:text-slate-300">
                Términos y Condiciones
              </Link>
              <Link href="#" className="hover:text-slate-300">
                Política de Privacidad
              </Link>
              <Link href="#" className="hover:text-slate-300">
                Libro de Reclamaciones
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
