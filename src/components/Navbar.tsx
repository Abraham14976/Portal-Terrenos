"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Map, Phone, ChevronDown, Home, Calculator, MessageSquareHeart, Mail, LayoutGrid } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/config/site";
import { PROJECTS } from "@/data/projects";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProjectsOpen(false);
    setMobileProjectsOpen(false);
  }, [pathname]);

  const isHome = pathname === "/" || pathname === "";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/70"
          : "bg-white/60 backdrop-blur-sm"
      }`}
    >
      <nav className="container-app flex h-20 items-center justify-between">
        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => {
            trackEvent({
              name: "cta_click",
              params: { cta_label: "Logo", cta_location: "navbar" },
            });
          }}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0f4c81] to-[#1460a6] text-white shadow-lg shadow-[#0f4c81]/30">
            <Map className="h-6 w-6" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg font-extrabold tracking-tight text-[#0f4c81]">
              PORTAL TERRENOS
            </div>
            <div className="text-[11px] font-semibold tracking-widest text-slate-500 uppercase">
              Tu Inversión Segura
            </div>
          </div>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden items-center gap-1 lg:flex">
          <Link
            href="/"
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              isHome
                ? "bg-[#0f4c81] text-white shadow-sm shadow-[#0f4c81]/30"
                : "text-slate-700 hover:bg-[#0f4c81]/5 hover:text-[#0f4c81]"
            }`}
          >
            <Home className="h-4 w-4" />
            Inicio
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setProjectsOpen(true)}
            onMouseLeave={() => setProjectsOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-[#0f4c81]/5 hover:text-[#0f4c81]"
              onClick={() => setProjectsOpen((v) => !v)}
            >
              <LayoutGrid className="h-4 w-4" />
              Nuestros Proyectos
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  projectsOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {projectsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-1/2 top-full mt-2 w-[640px] -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-900/10"
                >
                  <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <div className="font-display text-base font-bold text-[#0f4c81]">
                        {PROJECTS.length} Proyectos
                      </div>
                      <div className="text-xs text-slate-500">
                        Explora lotes disponibles en todas las etapas
                      </div>
                    </div>
                    <Link
                      href="#proyectos-destacados"
                      className="rounded-lg bg-[#0f4c81]/10 px-3 py-1.5 text-xs font-semibold text-[#0f4c81] hover:bg-[#0f4c81]/20"
                    >
                      Ver todos →
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {PROJECTS.map((p) => {
                      const pct = Math.round(
                        ((p.totalLots - p.availableLots) / p.totalLots) * 100
                      );
                      return (
                        <Link
                          key={p.id}
                          href={`/proyectos/${p.slug}`}
                          className="group flex items-start gap-3 rounded-xl border border-slate-100 p-3 transition-all hover:-translate-y-0.5 hover:border-[#0f4c81]/30 hover:bg-[#0f4c81]/5"
                          onClick={() => {
                            trackEvent({
                              name: "cta_click",
                              params: {
                                cta_label: `Ver proyecto: ${p.name}`,
                                cta_location: "navbar_dropdown",
                              },
                            });
                          }}
                        >
                          <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-[#0f4c81] to-[#1460a6]">
                            <img
                              src={p.heroImage}
                              alt={p.name}
                              className="h-full w-full object-cover opacity-90 group-hover:scale-110 transition-transform"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="truncate font-semibold text-slate-900 group-hover:text-[#0f4c81]">
                              {p.name}
                            </div>
                            <div className="truncate text-xs text-slate-500">
                              {p.region} · {p.location}
                            </div>
                            <div className="mt-1.5 flex items-center justify-between gap-2">
                              <div className="text-xs font-bold text-[#0f4c81]">
                                ${p.minPrice.toLocaleString()}
                              </div>
                              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                                <div
                                  className="h-full rounded-full bg-gradient-to-r from-[#0f4c81] to-[#1460a6]"
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/#financiamiento"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-[#0f4c81]/5 hover:text-[#0f4c81]"
          >
            <Calculator className="h-4 w-4" />
            Financiamiento
          </Link>
          <Link
            href="/#testimonios"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-[#0f4c81]/5 hover:text-[#0f4c81]"
          >
            <MessageSquareHeart className="h-4 w-4" />
            Testimonios
          </Link>
          <Link
            href="/#contacto"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-[#0f4c81]/5 hover:text-[#0f4c81]"
          >
            <Mail className="h-4 w-4" />
            Contacto
          </Link>
        </div>

        {/* CTA DESKTOP */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={buildWhatsAppLink(undefined, {
              source: "navbar",
              medium: "website",
              campaign: "contacto_navbar",
            })}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl bg-[#0f4c81] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#0f4c81]/25 transition-all hover:-translate-y-0.5 hover:bg-[#1460a6] hover:shadow-xl active:translate-y-0"
            onClick={() => {
              trackEvent({
                name: "whatsapp_click",
                params: { button_location: "navbar" },
              });
            }}
          >
            <Phone className="h-4 w-4" />
            Llamar Ahora
          </a>
        </div>

        {/* MOBILE BUTTON */}
        <button
          type="button"
          className="rounded-xl border border-slate-200 p-2.5 text-slate-700 transition-colors hover:bg-slate-100 lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden border-t border-slate-200 bg-white lg:hidden"
          >
            <div className="container-app flex flex-col gap-1 py-4">
              <Link
                href="/"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold text-slate-800 hover:bg-[#0f4c81]/5 hover:text-[#0f4c81]"
                onClick={() => setMobileOpen(false)}
              >
                <Home className="h-5 w-5" /> Inicio
              </Link>

              <div>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3 text-base font-semibold text-slate-800 hover:bg-[#0f4c81]/5 hover:text-[#0f4c81]"
                  onClick={() => setMobileProjectsOpen((v) => !v)}
                >
                  <span className="flex items-center gap-3">
                    <LayoutGrid className="h-5 w-5" /> Nuestros Proyectos
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      mobileProjectsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {mobileProjectsOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="ml-4 space-y-1 overflow-hidden pl-4 border-l-2 border-[#0f4c81]/20"
                    >
                      {PROJECTS.map((p) => (
                        <Link
                          key={p.id}
                          href={`/proyectos/${p.slug}`}
                          className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-slate-700 hover:bg-[#0f4c81]/10 hover:text-[#0f4c81]"
                          onClick={() => setMobileOpen(false)}
                        >
                          <span className="font-medium">{p.name}</span>
                          <span className="font-bold text-[#0f4c81]">
                            ${p.minPrice.toLocaleString()}
                          </span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/#financiamiento"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold text-slate-800 hover:bg-[#0f4c81]/5 hover:text-[#0f4c81]"
                onClick={() => setMobileOpen(false)}
              >
                <Calculator className="h-5 w-5" /> Financiamiento
              </Link>
              <Link
                href="/#testimonios"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold text-slate-800 hover:bg-[#0f4c81]/5 hover:text-[#0f4c81]"
                onClick={() => setMobileOpen(false)}
              >
                <MessageSquareHeart className="h-5 w-5" /> Testimonios
              </Link>
              <Link
                href="/#contacto"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold text-slate-800 hover:bg-[#0f4c81]/5 hover:text-[#0f4c81]"
                onClick={() => setMobileOpen(false)}
              >
                <Mail className="h-5 w-5" /> Contacto
              </Link>

              <div className="mt-3 px-4">
                <a
                  href={buildWhatsAppLink(undefined, {
                    source: "navbar_mobile",
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full justify-center"
                  onClick={() => {
                    trackEvent({
                      name: "whatsapp_click",
                      params: { button_location: "navbar_mobile" },
                    });
                    setMobileOpen(false);
                  }}
                >
                  <Phone className="h-5 w-5" />
                  <span>Chatear por WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
