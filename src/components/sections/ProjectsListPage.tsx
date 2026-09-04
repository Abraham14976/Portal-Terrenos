"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Filter,
  Map,
  MapPin,
  MessageCircle,
  Ruler,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { PROJECTS, Project, formatPEN, formatM2, LOT_STATUS_COLORS } from "@/data/projects";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

type FilterType = "todos" | "Urbano" | "Campestre" | "Mixto";

export function ProjectsListPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<FilterType>("todos");
  const [order, setOrder] = useState<"menor" | "mayor" | "area" | "vendido">("menor");

  const filtered = useMemo(() => {
    let list = [...PROJECTS];
    if (typeFilter !== "todos") list = list.filter((p) => p.type === typeFilter);
    if (search.trim()) {
      const s = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(s) ||
          p.shortName.toLowerCase().includes(s) ||
          p.location.toLowerCase().includes(s) ||
          p.region.toLowerCase().includes(s) ||
          p.tagline.toLowerCase().includes(s)
      );
    }
    if (order === "menor") list.sort((a, b) => a.minPrice - b.minPrice);
    if (order === "mayor") list.sort((a, b) => b.maxPrice - a.maxPrice);
    if (order === "area") list.sort((a, b) => b.maxArea - a.maxArea);
    if (order === "vendido")
      list.sort(
        (a, b) => b.totalLots - b.availableLots - (a.totalLots - a.availableLots)
      );
    return list;
  }, [search, typeFilter, order]);

  return (
    <div className="pt-20">
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#0f4c81] via-[#1460a6] to-[#0b2e4c] text-white">
        <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-amber-300/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="container-app relative py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest ring-1 ring-white/20 mb-5">
              <Map className="h-3.5 w-3.5 text-amber-300" />
              Carteras activas
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-black leading-[1.05] tracking-tight">
              Explora todos los{" "}
              <span className="bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
                proyectos en Cajamarca
              </span>
            </h1>
            <p className="mt-5 text-lg md:text-xl text-white/85 leading-relaxed max-w-2xl">
              {PROJECTS.length} proyectos residenciales. Urbanos, campestres y
              mixtos. Cada uno con su plano interactivo, inventario de
              lotes y asesoría personalizada de Abraham Saul Portal Garcia.
            </p>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl">
              {[
                { v: `${PROJECTS.length}`, l: "Proyectos" },
                {
                  v: `S/ ${(
                    Math.min(...PROJECTS.map((p) => p.minPrice)) / 1000
                  ).toFixed(0)}k`,
                  l: "Lote mínimo",
                },
                {
                  v: `${PROJECTS.reduce((a, b) => a + b.totalLots, 0)}`,
                  l: "Lotes totales",
                },
                {
                  v: `${PROJECTS.reduce((a, b) => a + b.availableLots, 0)}`,
                  l: "Disponibles",
                },
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
        </div>
      </section>

      {/* FILTROS + GRID */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container-app">
          <div className="flex flex-col lg:flex-row lg:items-stretch gap-3 mb-10">
            <div className="relative flex-1">
              <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Busca por nombre de proyecto, distrito (Polloc, La Colpa, Valle...) o característica"
                className="w-full rounded-2xl border border-slate-200 bg-white pl-14 pr-5 py-4 text-sm md:text-base text-slate-900 placeholder:text-slate-400 focus:border-[#0f4c81] focus:outline-none focus:ring-4 focus:ring-[#0f4c81]/10 transition-all"
              />
            </div>

            <div className="flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm overflow-x-auto no-scrollbar">
              <Filter className="ml-2 h-4 w-4 text-slate-400 flex-shrink-0" />
              {(["todos", "Urbano", "Campestre", "Mixto"] as FilterType[]).map(
                (t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTypeFilter(t)}
                    className={`rounded-xl px-4 py-2 text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all ${
                      typeFilter === t
                        ? "bg-[#0f4c81] text-white shadow"
                        : "text-slate-600 hover:bg-slate-50 hover:text-[#0f4c81]"
                    }`}
                  >
                    {t === "todos" ? "Todos los tipos" : t}
                  </button>
                )
              )}
            </div>

            <div className="flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm">
              {[
                { id: "menor", l: "Menor precio" },
                { id: "mayor", l: "Mayor" },
                { id: "area", l: "Área XL" },
                { id: "vendido", l: "Más vendidos" },
              ].map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => setOrder(o.id as typeof order)}
                  className={`rounded-xl px-3 py-2 text-xs font-bold tracking-wider transition-all ${
                    order === o.id
                      ? "bg-gradient-to-r from-amber-300 to-amber-400 text-[#0b2e4c] shadow"
                      : "text-slate-600 hover:bg-slate-50 hover:text-[#0f4c81]"
                  }`}
                >
                  {o.l}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-3xl border-2 border-dashed border-slate-300 bg-white p-16 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <Search className="h-8 w-8" />
              </div>
              <div className="font-display text-2xl font-black text-slate-900">
                No encontramos proyectos con esos filtros
              </div>
              <p className="mt-2 text-slate-500">
                Prueba limpiar el buscador o seleccionar otro tipo de
                proyecto.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setTypeFilter("todos");
                  setOrder("menor");
                }}
                className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-[#0f4c81] px-5 py-3 text-sm font-bold text-white hover:bg-[#1460a6] transition-colors"
              >
                Quitar filtros
              </button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p, idx) => {
                const pct = Math.round(
                  ((p.totalLots - p.availableLots) / p.totalLots) * 100
                );
                return (
                  <motion.article
                    key={p.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: idx * 0.04 }}
                    whileHover={{ y: -8 }}
                    className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-2xl hover:shadow-slate-900/10"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <img
                        src={p.heroImage}
                        alt={p.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute left-4 top-4 flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur px-3 py-1.5 text-[11px] font-black uppercase text-[#0f4c81] shadow-md ring-1 ring-black/5">
                          <MapPin className="h-3.5 w-3.5" />
                          {p.location}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/70 backdrop-blur px-3 py-1.5 text-[11px] font-black uppercase text-white shadow-md">
                          {p.type}
                        </span>
                      </div>
                      <div className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3.5 py-1.5 text-xs font-black uppercase text-white shadow-lg">
                        desde {formatPEN(p.minPrice)}
                      </div>
                      <div className="absolute inset-x-4 bottom-4">
                        <div className="flex items-center justify-between text-[11px] font-black text-white/90 mb-1.5">
                          <span>Ocupación</span>
                          <span>
                            {pct}% · {p.totalLots - p.availableLots}/
                            {p.totalLots}
                          </span>
                        </div>
                        <div className="h-2.5 overflow-hidden rounded-full bg-white/30 backdrop-blur">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 shadow"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="font-display text-xl md:text-2xl font-black text-slate-900 group-hover:text-[#0f4c81] transition-colors truncate">
                            {p.name}
                          </h3>
                          <p className="mt-1 text-sm text-slate-500 line-clamp-2">
                            {p.tagline}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-1 flex-shrink-0">
                          <span className="inline-flex items-center gap-1 rounded-lg bg-amber-50 px-2.5 py-1 text-[11px] font-black uppercase text-amber-800">
                            <BadgeCheck className="h-3.5 w-3.5" />
                            Verificado
                          </span>
                          <span className="text-[11px] font-bold text-slate-400">
                            ID: {p.id}
                          </span>
                        </div>
                      </div>

                      <div className="mt-5 grid grid-cols-3 gap-2">
                        <MiniStat
                          icon={<Ruler className="h-4 w-4" />}
                          label={`${p.minArea}-${p.maxArea} m²`}
                          sub="Tamaño"
                          color="[#0f4c81]"
                        />
                        <MiniStat
                          icon={<Map className="h-4 w-4" />}
                          label={`${p.totalLots}`}
                          sub="Lotes totales"
                          color="indigo-600"
                        />
                        <MiniStat
                          icon={<CheckCircle2 className="h-4 w-4" />}
                          label={`${p.availableLots}`}
                          sub="Disp. hoy"
                          color="emerald-600"
                        />
                      </div>

                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {p.amenities.slice(0, 4).map((a) => (
                          <span
                            key={a}
                            className="rounded-lg bg-slate-50 border border-slate-200 px-2.5 py-1 text-[11px] font-bold text-slate-700"
                          >
                            {a}
                          </span>
                        ))}
                        {p.amenities.length > 4 && (
                          <span className="rounded-lg bg-[#0f4c81]/10 px-2.5 py-1 text-[11px] font-black uppercase text-[#0f4c81]">
                            +{p.amenities.length - 4}
                          </span>
                        )}
                      </div>

                      <div className="mt-6 grid grid-cols-5 gap-2 pt-5 border-t border-slate-100">
                        <Link
                          href={`/proyectos/${p.slug}`}
                          className="col-span-3 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0f4c81] px-4 py-3 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-[#0f4c81]/20 transition-all hover:-translate-y-0.5 hover:bg-[#1460a6] hover:shadow-xl"
                          onClick={() =>
                            trackEvent({
                              name: "cta_click",
                              params: {
                                cta_label: `Ver proyecto: ${p.name}`,
                                cta_location: "listado_proyectos",
                              },
                            })
                          }
                        >
                          Ver proyecto
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                        <a
                          href={buildWhatsAppLink(
                            `Hola Abraham! Quiero más información del proyecto ${p.name} (${p.location}, Cajamarca). ${p.availableLots} lotes disponibles. ¿Cuáles son los mejores?`,
                            {
                              source: `listado_proyectos`,
                              medium: "website",
                              campaign: `lista_proyectos_${p.slug}`,
                            }
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="col-span-2 inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-[#0f4c81]/15 bg-[#0f4c81]/[0.04] px-3 py-3 text-xs font-black uppercase tracking-wide text-[#0f4c81] transition-all hover:border-emerald-500/50 hover:bg-emerald-500 hover:text-white"
                          onClick={() =>
                            trackEvent({
                              name: "whatsapp_click",
                              params: {
                                button_location: `lista_proyectos_${p.slug}`,
                              },
                            })
                          }
                        >
                          <MessageCircle className="h-4 w-4" />
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}

          <div className="mt-16 rounded-3xl bg-gradient-to-br from-amber-400 via-amber-300 to-yellow-300 p-8 md:p-12 text-[#0b2e4c] shadow-2xl shadow-amber-300/30 overflow-hidden relative isolate">
            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/40 blur-3xl" />
            <div className="pointer-events-none absolute -right-16 -bottom-20 h-72 w-72 rounded-full bg-[#0f4c81]/10 blur-3xl" />
            <div className="relative grid gap-8 md:grid-cols-5 items-center">
              <div className="md:col-span-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/60 backdrop-blur px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-[#0b2e4c] ring-1 ring-white mb-5">
                  <Sparkles className="h-3.5 w-3.5" />
                  ¿No sabes cuál elegir?
                </div>
                <h3 className="font-display text-3xl md:text-4xl font-black leading-tight tracking-tight">
                  Abraham te recomienda el proyecto IDEAL para ti
                </h3>
                <p className="mt-3 text-sm md:text-base text-[#0b2e4c]/80 leading-relaxed">
                  Cuéntale tu presupuesto, el tipo de lote que buscas y
                  tu objetivo. En menos de 2 horas te pasa sus 3 mejores
                  recomendaciones PERSONALIZADAS.
                </p>
              </div>
              <div className="md:col-span-2 flex flex-col gap-3">
                <a
                  href={buildWhatsAppLink(
                    "Hola Abraham! Vi tu listado de proyectos y no sé cuál elegir. ¿Me recomiendas 3 opciones según presupuesto y objetivo?",
                    {
                      source: "listado_proyectos_cta",
                      medium: "website",
                      campaign: "asesoria_personalizada",
                    }
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp justify-center !py-4 !text-base shadow-2xl shadow-emerald-700/20"
                  onClick={() =>
                    trackEvent({
                      name: "cta_click",
                      params: {
                        cta_label: "Asesoría personalizada",
                        cta_location: "listado_proyectos_bottom",
                      },
                    })
                  }
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Asesoría gratuita por WhatsApp</span>
                </a>
                <Link
                  href="/contacto"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/90 px-5 py-3.5 text-sm font-black uppercase tracking-wide text-[#0b2e4c] ring-1 ring-white shadow-md transition-all hover:bg-white hover:-translate-y-0.5"
                >
                  Rellenar formulario
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function MiniStat({
  icon,
  label,
  sub,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  sub: string;
  color: string;
}) {
  return (
    <div className="rounded-2xl bg-slate-50 border border-slate-100 p-3 transition-all hover:bg-white hover:border-slate-200 hover:shadow-sm">
      <div className={`flex justify-center text-${color}`}>{icon}</div>
      <div className="mt-1 text-center font-display text-sm font-black text-slate-900">
        {label}
      </div>
      <div className="text-center text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {sub}
      </div>
    </div>
  );
}
