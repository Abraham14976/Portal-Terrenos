"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Map, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/config/site";

const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Plano", href: "#plano" },
  { label: "Simulador", href: "#simulador" },
  { label: "Proyecto", href: "#proyecto" },
  { label: "Contacto", href: "#contacto" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-lg shadow-sm border-b border-slate-200/60"
          : "bg-transparent"
      }`}
    >
      <nav className="container-app flex h-16 items-center justify-between">
        <Link
          href="#inicio"
          className="flex items-center gap-2 font-display text-lg font-bold tracking-tight"
          onClick={() => {
            trackEvent({
              name: "cta_click",
              params: { cta_label: "Logo", cta_location: "navbar" },
            });
          }}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-md shadow-brand-500/30">
            <Map className="h-5 w-5" />
          </div>
          <span
            className={`hidden sm:block ${
              isScrolled ? "text-slate-900" : "text-slate-900"
            }`}
          >
            {siteConfig.projectName}
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-brand-50 hover:text-brand-700"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={buildWhatsAppLink(undefined, {
              source: "navbar",
              medium: "website",
              campaign: "contacto_navbar",
            })}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
            onClick={() => {
              trackEvent({
                name: "whatsapp_click",
                params: { button_location: "navbar" },
              });
            }}
          >
            <Phone className="h-4 w-4" />
            <span>Contactar</span>
          </a>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-slate-700 transition-colors hover:bg-slate-100 md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-slate-200 bg-white md:hidden"
          >
            <div className="container-app flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-4 py-3 text-base font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-700"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 px-4">
                <a
                  href={buildWhatsAppLink(undefined, {
                    source: "navbar_mobile",
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full"
                  onClick={() => {
                    trackEvent({
                      name: "whatsapp_click",
                      params: { button_location: "navbar_mobile" },
                    });
                    setMobileOpen(false);
                  }}
                >
                  <Phone className="h-4 w-4" />
                  <span>Contactar por WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
