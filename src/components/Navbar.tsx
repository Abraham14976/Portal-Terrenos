"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Map, Phone, ChevronDown, Home, MessageSquareHeart, Mail, LayoutGrid, User, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { PROJECTS } from "@/data/projects";

const NAV_LINKS: { label: string; href: string; icon: any; exact?: boolean }[] = [
  { label: "Inicio", href: "/", icon: Home, exact: true },
  { label: "Nuestros Proyectos", href: "/proyectos", icon: LayoutGrid },
  { label: "Testimonios", href: "/testimonios", icon: MessageSquareHeart },
  { label: "Nosotros", href: "/nosotros", icon: User },
  { label: "Contacto", href: "/contacto", icon: Mail },
];

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

  const isActive = (link: (typeof NAV_LINKS)[number]) => {
    if (link.exact) return pathname === link.href;
    if (link.href === "/proyectos")
      return pathname === "/proyectos" || pathname?.startsWith("/proyectos/");
    return pathname === link.href;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[90] transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200/70"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <nav className="container-app flex h-20 items-center justify-between">
        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() =>
            trackEvent({
              name: "cta_click",
              params: { cta_label: "Logo", cta_location: "navbar" },
            })
          }
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0f4c81] to-[#1460a6] text-white shadow-lg shadow-[#0f4c81]/30">
            <Map className="h-6 w-6" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg md:text-xl font-extrabold tracking-tight text-[#0f4c81]">
              PORTAL TERRENOS
            </div>
            <div className="text-[10px] md:text-[11px] font-semibold tracking-[0.18em] text-slate-500 uppercase">
              Cajamarca · Abraham Portal
            </div>
          </div>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(link);
            if (link.href === "/proyectos") {
              return (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setProjectsOpen(true)}
                  onMouseLeave={() => setProjectsOpen(false)}
                >
                  <button
                    type="button"
                    className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
                      active
                        ? "bg-[#0f4c81] text-white shadow-sm shadow-[#0f4c81]/30"
                        : "text-slate-700 hover:bg-[#0f4c81]/5 hover:text-[#0f4c81]"
                    }`}
                    onClick={() => setProjectsOpen((v) => !v)}
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        projectsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {projectsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-0 top-full mt-2 w-[680px] rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/10"
                      >
                        <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-4">
                          <div>
                            <div className="font-display text-lg font-black text-[#0f4c81]">
                              {PROJECTS.length} proyectos en Cajamarca
                            </div>
                            <div className="text-xs text-slate-500 mt-1">
                              Cada uno con su plano interactivo e inventario
                              actualizado
                            </div>
                          </div>
                          <Link
                            href="/proyectos"
                            className="rounded-xl bg-[#0f4c81] px-4 py-2 text-xs font-black uppercase tracking-wider text-white hover:bg-[#1460a6] transition-colors"
                            onClick={() =>
                              trackEvent({
                                name: "cta_click",
                                params: {
                                  cta_label: "Ver todos proyectos",
                                  cta_location: "navbar_dropdown",
                                },
                              })
                            }
                          >
                            Ver página completa →
                          </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-2 max-h-[60vh] overflow-y-auto no-scrollbar">
                          {PROJECTS.map((p) => {
                            const pct = Math.round(
                              ((p.totalLots - p.availableLots) / p.totalLots) *
                                100
                            );
                            return (
                              <Link
                                key={p.id}
                                href={`/proyectos/${p.slug}`}
                                className="group flex items-start gap-3 rounded-2xl border border-slate-100 p-3 transition-all hover:-translate-y-0.5 hover:border-[#0f4c81]/30 hover:bg-[#0f4c81]/[0.03]"
                                onClick={() =>
                                  trackEvent({
                                    name: "cta_click",
                                    params: {
                                      cta_label: `Ver proyecto: ${p.name}`,
                                      cta_location: "navbar_dropdown",
                                    },
                                  })
                                }
                              >
                                <div className="h-14 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                                  <img
                                    src={p.heroImage}
                                    alt={p.name}
                                    className="h-full w-full object-cover opacity-95 group-hover:scale-110 transition-transform"
                                    loading="lazy"
                                  />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="truncate font-black text-slate-900 text-sm group-hover:text-[#0f4c81]">
                                    {p.name}
                                  </div>
                                  <div className="truncate text-[11px] text-slate-500 font-semibold">
                                    {p.location} · {p.type}
                                  </div>
                                  <div className="mt-2 flex items-center justify-between gap-2">
                                    <div className="text-xs font-black text-[#0f4c81]">
                                      S/ {p.minPrice.toLocaleString()}
                                    </div>
                                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                                      <div
                                        className="h-full rounded-full bg-gradient-to-r from-amber-300 to-amber-500"
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
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-colors ${
                  active
                    ? "bg-[#0f4c81] text-white shadow-sm shadow-[#0f4c81]/30"
                    : "text-slate-700 hover:bg-[#0f4c81]/5 hover:text-[#0f4c81]"
                }`}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* CTA DESKTOP */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={buildWhatsAppLink(undefined, {
              source: "navbar_wa",
              medium: "website",
              campaign: "contacto_navbar",
            })}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
            onClick={() =>
              trackEvent({
                name: "whatsapp_click",
                params: { button_location: "navbar_wa" },
              })
            }
          >
            <MessageCircle className="h-4 w-4" />
            <span>WhatsApp</span>
          </a>
          <a
            href="tel:+51926301972"
            className="flex items-center gap-2 rounded-xl bg-[#0f4c81] px-5 py-2.5 text-sm font-black text-white shadow-lg shadow-[#0f4c81]/25 transition-all hover:-translate-y-0.5 hover:bg-[#1460a6] hover:shadow-xl active:translate-y-0"
            onClick={() =>
              trackEvent({
                name: "cta_click",
                params: {
                  cta_label: "Llamar Ahora",
                  cta_location: "navbar_phone",
                },
              })
            }
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
            className="overflow-hidden border-t border-slate-200 bg-white lg:hidden shadow-2xl"
          >
            <div className="container-app flex flex-col gap-1 py-5">
              {NAV_LINKS.map((link) => {
                const active = isActive(link);
                if (link.href === "/proyectos") {
                  return (
                    <div key={link.href}>
                      <button
                        type="button"
                        className={`flex w-full items-center justify-between gap-3 rounded-2xl px-4 py-3.5 text-base font-bold transition-colors ${
                          active
                            ? "bg-[#0f4c81] text-white"
                            : "text-slate-800 hover:bg-[#0f4c81]/5 hover:text-[#0f4c81]"
                        }`}
                        onClick={() => setMobileProjectsOpen((v) => !v)}
                      >
                        <span className="flex items-center gap-3">
                          <link.icon className="h-5 w-5" /> {link.label}
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
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="ml-3 mt-2 space-y-1.5 pl-4 border-l-2 border-[#0f4c81]/20 max-h-[50vh] overflow-y-auto no-scrollbar">
                              {PROJECTS.map((p) => (
                                <Link
                                  key={p.id}
                                  href={`/proyectos/${p.slug}`}
                                  className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-slate-700 hover:bg-[#0f4c81]/10 hover:text-[#0f4c81]"
                                  onClick={() => setMobileOpen(false)}
                                >
                                  <span className="font-bold truncate pr-2">
                                    {p.shortName}
                                  </span>
                                  <span className="font-black text-[#0f4c81] whitespace-nowrap text-xs">
                                    S/ {p.minPrice.toLocaleString()}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 text-base font-bold transition-colors ${
                      active
                        ? "bg-[#0f4c81] text-white"
                        : "text-slate-800 hover:bg-[#0f4c81]/5 hover:text-[#0f4c81]"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    <link.icon className="h-5 w-5" /> {link.label}
                  </Link>
                );
              })}

              <div className="mt-5 px-2 space-y-3">
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
                  <MessageCircle className="h-5 w-5" />
                  <span>Chatear por WhatsApp</span>
                </a>
                <a
                  href="tel:+51926301972"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0f4c81] px-4 py-3.5 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-[#0f4c81]/25 hover:bg-[#1460a6] transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  <Phone className="h-5 w-5" />
                  Llamar ahora
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
