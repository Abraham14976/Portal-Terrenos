"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Calculator,
  CheckCircle2,
  ChevronDown,
  Map,
  MapPin,
  Maximize2,
  MessageCircle,
  Phone,
  Ruler,
  Sparkles,
  Star,
  TrendingUp,
  Trees,
  Zap,
  FileCheck2,
  ShieldCheck,
  Filter,
  Search,
  Users,
  Layers,
  Store,
  Calendar,
  Crown,
  Maximize2 as MaximizeIcon,
  Leaf,
  Building2,
  DollarSign,
  Footprints,
  Wifi,
} from "lucide-react";
import { PROJECTS, getProjectBySlug, LOT_STATUS_COLORS, LotStatus } from "@/data/projects";
import { buildWhatsAppLink, formatUSD, formatPEN } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

interface ProjectDetailProps {
  slug: string;
}

export function ProjectDetail({ slug }: ProjectDetailProps) {
  const router = useRouter();
  const project = getProjectBySlug(slug);
  const [statusFilter, setStatusFilter] = useState<"todos" | LotStatus>("todos");
  const [search, setSearch] = useState("");
  const [itf, setItf] = useState(false);
  const [initialPercent, setInitialPercent] = useState(
    project?.financial.minInitialPercent ?? 20
  );
  const [months, setMonths] = useState(project ? Math.min(60, project.financial.maxMonths) : 60);
  const [selectedLotCode, setSelectedLotCode] = useState<string | null>(null);

  const idx = project
    ? PROJECTS.findIndex((p) => p.slug === project.slug)
    : -1;
  const prev = idx > 0 ? PROJECTS[idx - 1] : PROJECTS[PROJECTS.length - 1];
  const next = idx < PROJECTS.length - 1 ? PROJECTS[idx + 1] : PROJECTS[0];

  const filteredLots = useMemo(() => {
    if (!project) return [];
    return project.lots.filter((l) => {
      if (statusFilter !== "todos" && l.status !== statusFilter) return false;
      if (search.trim()) {
        const s = search.toLowerCase();
        if (
          !l.code.toLowerCase().includes(s) &&
          !l.features?.some((f) => f.toLowerCase().includes(s))
        )
          return false;
      }
      return true;
    });
  }, [project, project?.lots, statusFilter, search]);

  const selectedLot = project
    ? project.lots.find((l) => l.code === selectedLotCode) ||
      project.lots.find((l) => l.status === "disponible") ||
      project.lots[0]
    : null;

  const financed = selectedLot
    ? selectedLot.price_usd * (1 - initialPercent / 100)
    : 0;
  const i = project?.financial.monthlyRate ?? 0;
  const monthlyFee =
    financed > 0 && i > 0
      ? (financed * i * Math.pow(1 + i, months)) /
        (Math.pow(1 + i, months) - 1)
      : 0;
  const itfFee = itf ? monthlyFee * 0.005 : 0;
  const totalMonthly = monthlyFee + itfFee;
  const initial = selectedLot ? selectedLot.price_usd * (initialPercent / 100) : 0;

  if (!project || !selectedLot) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-6 px-4 text-center pt-24">
        <div className="font-display text-4xl font-black text-slate-900">
          Proyecto no encontrado
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-2xl bg-[#0f4c81] px-6 py-3.5 font-bold text-white shadow-lg hover:bg-[#1460a6]"
        >
          <ArrowLeft className="h-5 w-5" /> Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* HEADER / BREADCRUMB */}
      <div className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
        <div className="container-app py-6">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
            <Link href="/" className="hover:text-[#0f4c81] transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <Link
              href="/#proyectos-destacados"
              className="hover:text-[#0f4c81] transition-colors"
            >
              Proyectos
            </Link>
            <span>/</span>
            <span className="font-bold text-[#0f4c81]">{project.name}</span>
          </div>
        </div>
      </div>

      {/* HERO PROYECTO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={project.heroImage}
            alt={project.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/95" />
        </div>

        <div className="container-app py-20 md:py-28 text-white">
          <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-widest mb-5">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-400/20 px-4 py-1.5 text-amber-200 ring-1 ring-amber-400/40">
              <MapPin className="h-3.5 w-3.5" />
              {project.location} · {project.region}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-white/90 ring-1 ring-white/20">
              <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
              {project.availableLots} lotes disponibles
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-black tracking-tight leading-[1.05] max-w-4xl">
            {project.name}
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-white/85 leading-relaxed">
            {project.tagline} — {project.description}
          </p>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl">
            {project.highlights.map((h) => (
              <div
                key={h.label}
                className="rounded-2xl border border-white/15 bg-white/8 p-4 backdrop-blur"
              >
                <div className="text-[11px] font-bold uppercase tracking-wider text-white/60">
                  {h.label}
                </div>
                <div className="mt-1.5 font-display text-2xl md:text-3xl font-black text-amber-300">
                  {h.value}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={buildWhatsAppLink(
                `Hola Abraham! Quiero más información del proyecto ${project.name}. ¿Cuáles lotes están disponibles?`,
                {
                  source: `proyecto_${project.slug}`,
                  medium: "website",
                  campaign: `proyecto_hero`,
                }
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp !py-4 !text-base"
              onClick={() =>
                trackEvent({
                  name: "whatsapp_click",
                  params: { button_location: `proyecto_hero_${project.slug}` },
                })
              }
            >
              <MessageCircle className="h-5 w-5" />
              <span>Cotizar este proyecto</span>
            </a>
            <a
              href="#plano-google"
              className="inline-flex items-center gap-3 rounded-2xl border-2 border-white/30 bg-white/10 px-7 py-4 font-bold text-white backdrop-blur hover:bg-white/20 transition-all"
            >
              <Map className="h-5 w-5" />
              Ver plano Google My Maps
            </a>
          </div>
        </div>
      </section>

      {/* CARACTERÍSTICAS + AMENITIES */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-app grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3 space-y-10">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-black tracking-tight text-slate-900">
                Sobre {project.shortName}
              </h2>
              <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                {project.longDescription}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {project.features.map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-5 hover:shadow-lg transition-shadow"
                >
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0f4c81] to-[#1460a6] text-white shadow-md shadow-[#0f4c81]/30">
                    {(() => {
                      const Icon =
                        (
                          {
                            Zap,
                            ShieldCheck,
                            FileCheck2,
                            MapPin,
                            Sparkles,
                            CheckCircle2,
                            Users,
                            Layers: Map,
                            Store: Map,
                            Calendar: Map,
                            Crown: Sparkles,
                            Maximize2: Ruler,
                            Leaf: Trees,
                            Building2: Map,
                            DollarSign: Zap,
                            TrendingUp,
                          } as Record<string, any>
                        )[f.icon] || Sparkles;
                      return <Icon className="h-6 w-6" />;
                    })()}
                  </div>
                  <div className="font-bold text-slate-900">{f.title}</div>
                  <div className="mt-2 text-sm text-slate-600">
                    {f.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 sticky top-24">
              <div className="font-display text-xl font-black text-slate-900 mb-5 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-500" />
                Amenidades incluidas
              </div>
              <ul className="space-y-3">
                {project.amenities.map((a) => (
                  <li
                    key={a}
                    className="flex items-start gap-3 text-sm text-slate-700"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />
                    <span className="font-medium">{a}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-2xl bg-gradient-to-br from-[#0f4c81] to-[#1460a6] p-5 text-white">
                <div className="text-xs font-bold uppercase tracking-widest text-amber-300/90">
                  ¿Listo para invertir?
                </div>
                <div className="mt-2 font-display text-lg font-black leading-snug">
                  Agenda una visita guiada al proyecto
                </div>
                <a
                  href={buildWhatsAppLink(
                    `Hola Abraham! Quiero agendar una visita guiada al proyecto ${project.name} para ver los lotes disponibles.`,
                    {
                      source: `proyecto_${project.slug}_aside`,
                      medium: "website",
                      campaign: `agendar_visita`,
                    }
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-300 px-4 py-3 text-sm font-black uppercase tracking-wide text-[#0b2e4c] shadow-lg hover:bg-amber-200 transition-all"
                  onClick={() =>
                    trackEvent({
                      name: "cta_click",
                      params: {
                        cta_label: `Agendar visita ${project.name}`,
                        cta_location: `proyecto_aside`,
                      },
                    })
                  }
                >
                  <Phone className="h-4 w-4" />
                  Agenda por WhatsApp
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* GOOGLE MY MAPS */}
      <section
        id="plano-google"
        className="py-16 md:py-20 bg-gradient-to-b from-slate-50 to-white border-t border-slate-200"
      >
        <div className="container-app">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-800 mb-4">
                <Map className="h-3.5 w-3.5" />
                Plano oficial
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                Plano interactivo · Google My Maps
              </h2>
              <p className="mt-3 text-slate-600 max-w-2xl">
                Visualiza el trazado oficial del proyecto, calles, lotes y
                áreas comunes. Puedes hacer zoom, ver coordenadas y abrirlo en
                Maps completo.
              </p>
            </div>
            <a
              href={project.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#0f4c81] px-6 py-3.5 text-sm font-bold text-white shadow-lg hover:bg-[#1460a6] hover:-translate-y-0.5 transition-all"
            >
              <Maximize2 className="h-4 w-4" />
              Abrir plano completo
            </a>
          </div>

          <div className="relative overflow-hidden rounded-3xl border-2 border-slate-200 bg-white shadow-2xl shadow-slate-900/5">
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full bg-white/95 backdrop-blur px-4 py-2 text-xs font-bold text-[#0f4c81] shadow-lg ring-1 ring-black/5">
              <BadgeCheck className="h-4 w-4 text-emerald-600" />
              Plano verificado · {project.name}
            </div>
            <div className="aspect-[16/9] w-full">
              <iframe
                src={project.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Plano de ${project.name}`}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2 text-emerald-600">
                <MapPin className="h-4 w-4" />
                <div className="text-xs font-bold uppercase tracking-wider">
                  Lotes totales
                </div>
              </div>
              <div className="mt-2 font-display text-3xl font-black text-slate-900">
                {project.totalLots}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2 text-amber-600">
                <CheckCircle2 className="h-4 w-4" />
                <div className="text-xs font-bold uppercase tracking-wider">
                  Disponibles
                </div>
              </div>
              <div className="mt-2 font-display text-3xl font-black text-slate-900">
                {project.availableLots}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2 text-[#0f4c81]">
                <Ruler className="h-4 w-4" />
                <div className="text-xs font-bold uppercase tracking-wider">
                  Tamaño
                </div>
              </div>
              <div className="mt-2 font-display text-3xl font-black text-slate-900">
                {project.minArea}-{project.maxArea} m²
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LISTADO DE LOTES + SIMULADOR */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-app grid gap-8 lg:grid-cols-12">
          {/* LISTADO DE LOTES */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#0f4c81]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#0f4c81] mb-3">
                <BadgeCheck className="h-3.5 w-3.5" />
                Inventario actualizado
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                Catálogo de Lotes — {project.shortName}
              </h2>
              <p className="mt-3 text-slate-600">
                {filteredLots.length} de {project.lots.length} lotes{" "}
                {statusFilter === "todos"
                  ? "mostrados"
                  : LOT_STATUS_COLORS[statusFilter].label.toLowerCase() + "s"}
                . Haz clic en cualquier lote para ver su cuota mensual y
                consultar.
              </p>
            </div>

            {/* FILTROS */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar lote (ej. SM-03, esquina, frente…)"
                  className="w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0f4c81] focus:outline-none focus:ring-2 focus:ring-[#0f4c81]/20 transition-all"
                />
              </div>
              <div className="flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-slate-50 p-1.5">
                <Filter className="ml-2 h-4 w-4 text-slate-400" />
                {(["todos", "disponible", "separado", "vendido"] as const).map(
                  (k) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setStatusFilter(k)}
                      className={`rounded-xl px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                        statusFilter === k
                          ? "bg-[#0f4c81] text-white shadow"
                          : "text-slate-600 hover:bg-white hover:text-[#0f4c81]"
                      }`}
                    >
                      {k === "todos" ? "Todos" : LOT_STATUS_COLORS[k].label}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* TABLA/LISTA DE LOTES */}
            <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm">
              <div className="hidden md:grid md:grid-cols-12 gap-3 border-b border-slate-200 bg-slate-50 px-5 py-3.5 text-xs font-black uppercase tracking-widest text-slate-500">
                <div className="md:col-span-2">Lote</div>
                <div className="md:col-span-1">Área</div>
                <div className="md:col-span-2">Precio USD</div>
                <div className="md:col-span-2">Precio Soles</div>
                <div className="md:col-span-2">Estado</div>
                <div className="md:col-span-3 text-right">Acciones</div>
              </div>
              <div className="divide-y divide-slate-100">
                {filteredLots.map((l) => {
                  const colors = LOT_STATUS_COLORS[l.status];
                  const isSelected = selectedLot.code === l.code;
                  return (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => setSelectedLotCode(l.code)}
                      className={`w-full text-left grid md:grid-cols-12 gap-3 px-5 py-4 text-sm items-center transition-colors ${
                        isSelected
                          ? "bg-[#0f4c81]/5 ring-2 ring-[#0f4c81]/20 ring-inset"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      <div className="md:col-span-2 flex items-center justify-between md:justify-start">
                        <div className="font-display text-lg font-black text-[#0f4c81]">
                          {l.code}
                        </div>
                        <span className="md:hidden">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase`}
                            style={{
                              backgroundColor: colors.fill + "55",
                              color: colors.stroke,
                            }}
                          >
                            {colors.label}
                          </span>
                        </span>
                      </div>
                      <div className="md:col-span-1 font-semibold text-slate-800">
                        {l.area} m²
                      </div>
                      <div className="md:col-span-2">
                        <div className="font-bold text-slate-900">
                          {formatUSD(l.price_usd)}
                        </div>
                      </div>
                      <div className="md:col-span-2 text-slate-600">
                        {formatPEN(l.price_pen)}
                      </div>
                      <div className="hidden md:block md:col-span-2">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-black uppercase`}
                          style={{
                            backgroundColor: colors.fill + "40",
                            color: colors.stroke,
                          }}
                        >
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: colors.stroke }}
                          />
                          {colors.label}
                        </span>
                      </div>
                      <div className="md:col-span-3 flex flex-wrap gap-2 md:justify-end">
                        {l.status !== "vendido" ? (
                          <>
                            <span
                              onClick={(e) => e.stopPropagation()}
                              className="hidden sm:inline-flex"
                            >
                              <a
                                href={buildWhatsAppLink(
                                  `Hola Abraham! Estoy interesado/a en el lote ${l.code} del proyecto ${project.name}. ${
                                    l.features ? `( ${l.features.join(", ")} )` : ""
                                  } Área ${l.area}m², precio ${formatUSD(
                                    l.price_usd
                                  )}. ¿Está disponible?`,
                                  {
                                    source: `proyecto_${project.slug}`,
                                    medium: "website",
                                    campaign: `lote_${l.code}`,
                                    content: `lote_row`,
                                  }
                                )}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2 text-[11px] font-black uppercase text-white hover:bg-emerald-700 transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  trackEvent({
                                    name: "whatsapp_click",
                                    params: {
                                      button_location: `lote_${l.code}_${project.slug}`,
                                    },
                                  });
                                }}
                              >
                                <MessageCircle className="h-3.5 w-3.5" />
                                Consultar
                              </a>
                            </span>
                          </>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-xl bg-red-50 px-3 py-2 text-[11px] font-black uppercase text-red-700">
                            Vendido
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
                {filteredLots.length === 0 && (
                  <div className="p-10 text-center text-slate-500">
                    No se encontraron lotes con esos filtros.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SIMULADOR FINANCIERO */}
          <aside className="lg:col-span-5 order-1 lg:order-2">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-3xl bg-gradient-to-br from-[#0f4c81] via-[#1460a6] to-[#0b2e4c] p-7 text-white shadow-2xl shadow-[#0f4c81]/20">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest ring-1 ring-white/20 mb-2">
                      <Calculator className="h-3.5 w-3.5 text-amber-300" />
                      Simulador del lote
                    </div>
                    <h3 className="font-display text-2xl font-black leading-tight">
                      Lote seleccionado: {selectedLot.code}
                    </h3>
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-white/5 p-3">
                    <div className="text-[10px] uppercase tracking-widest text-white/60 font-bold">
                      Precio
                    </div>
                    <div className="font-display text-2xl font-black text-amber-300">
                      {formatUSD(selectedLot.price_usd)}
                    </div>
                  </div>
                </div>

                <div className="mt-7 space-y-7">
                  {/* Inicial % */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-bold text-white/90">
                        Inicial
                      </label>
                      <div className="font-display text-lg font-black text-amber-300">
                        {initialPercent}% · {formatUSD(initial)}
                      </div>
                    </div>
                    <input
                      type="range"
                      min={project.financial.minInitialPercent}
                      max={50}
                      step={1}
                      value={initialPercent}
                      onChange={(e) =>
                        setInitialPercent(Number(e.target.value))
                      }
                      className="w-full accent-amber-400 h-2 cursor-pointer"
                    />
                    <div className="mt-1 flex justify-between text-[11px] font-semibold text-white/60">
                      <span>{project.financial.minInitialPercent}%</span>
                      <span>50%</span>
                    </div>
                  </div>

                  {/* Meses */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-bold text-white/90">
                        Plazo
                      </label>
                      <div className="font-display text-lg font-black text-amber-300">
                        {months} meses
                      </div>
                    </div>
                    <input
                      type="range"
                      min={12}
                      max={project.financial.maxMonths}
                      step={6}
                      value={months}
                      onChange={(e) => setMonths(Number(e.target.value))}
                      className="w-full accent-amber-400 h-2 cursor-pointer"
                    />
                    <div className="mt-1 flex justify-between text-[11px] font-semibold text-white/60">
                      <span>12m</span>
                      <span>{project.financial.maxMonths}m</span>
                    </div>
                  </div>

                  {/* ITF */}
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={itf}
                      onChange={(e) => setItf(e.target.checked)}
                      className="h-5 w-5 rounded accent-amber-400 cursor-pointer"
                    />
                    <span className="text-sm text-white/90">
                      Incluir ITF (0.005% por pago mensual)
                    </span>
                  </label>
                </div>

                {/* RESUMEN */}
                <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/70">Precio del lote</span>
                    <span className="font-bold text-white">
                      {formatUSD(selectedLot.price_usd)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/70">
                      Cuota inicial ({initialPercent}%)
                    </span>
                    <span className="font-bold text-emerald-300">
                      {formatUSD(initial)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/70">Monto financiado</span>
                    <span className="font-semibold text-white">
                      {formatUSD(financed)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/70">
                      Tasa · Plazo
                    </span>
                    <span className="font-semibold text-white/80 text-xs">
                      {(project.financial.monthlyRate * 100).toFixed(2)}% mensual · {months} meses
                    </span>
                  </div>
                  <div className="h-px bg-white/10 my-2" />
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-amber-300">
                        Cuota mensual aproximada
                      </div>
                      <div className="text-[10px] text-white/50 font-medium">
                        {itf ? "Incluye ITF" : "Sin ITF"}
                      </div>
                    </div>
                    <div className="font-display text-3xl md:text-4xl font-black text-amber-300 leading-none">
                      {formatUSD(totalMonthly)}
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <a
                    href={buildWhatsAppLink(
                      `Hola Abraham! Tengo interés en el LOTE ${selectedLot.code} del proyecto ${project.name}.
📏 Área: ${selectedLot.area}m²
💲 Precio: ${formatUSD(selectedLot.price_usd)}
💰 Cuota inicial (${initialPercent}%): ${formatUSD(initial)}
📅 Plazo: ${months} meses
💳 Cuota mensual aprox: ${formatUSD(totalMonthly)}${itf ? " (+ITF)" : ""}

¿Se puede reservar ahora?`,
                      {
                        source: `proyecto_${project.slug}_simulador`,
                        medium: "website",
                        campaign: `pre_evaluacion_lote`,
                        content: `lote_${selectedLot.code}`,
                      }
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-300 px-5 py-4 text-sm font-black uppercase tracking-wide text-[#0b2e4c] shadow-xl hover:-translate-y-0.5 hover:bg-amber-200 transition-all"
                    onClick={() =>
                      trackEvent({
                        name: "cta_click",
                        params: {
                          cta_label: `Solicitar pre-evaluación lote ${selectedLot.code}`,
                          cta_location: `simulador_proyecto_${project.slug}`,
                        },
                      })
                    }
                  >
                    <Sparkles className="h-5 w-5" />
                    Solicitar pre-evaluación
                  </a>
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={buildWhatsAppLink(
                        `Hola Abraham! Quiero separar el lote ${selectedLot.code} del proyecto ${project.name}.`,
                        {
                          source: `proyecto_${project.slug}`,
                          medium: "website",
                          campaign: `separar_lote`,
                          content: selectedLot.code,
                        }
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-white/20 bg-white/10 px-4 py-3 text-xs font-bold uppercase tracking-wide text-white hover:bg-white/20 transition-all"
                      onClick={() =>
                        trackEvent({
                          name: "cta_click",
                          params: {
                            cta_label: `Separar lote ${selectedLot.code}`,
                            cta_location: `simulador_footer_${project.slug}`,
                          },
                        })
                      }
                    >
                      <Star className="h-4 w-4 text-amber-300" />
                      Separar este lote
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        trackEvent({
                          name: "financial_simulator_use",
                          params: {
                            initial_amount: Math.round(initial),
                            months,
                            monthly_fee: Math.round(totalMonthly),
                            total_price: selectedLot.price_usd,
                          },
                        });
                        trackEvent({
                          name: "pre_evaluation_request",
                          params: {
                            lot_code: selectedLot.code,
                            initial_amount: Math.round(initial),
                            months,
                            monthly_fee: Math.round(totalMonthly),
                          },
                        });
                        alert(
                          "Simulación guardada en Analytics. Abraham ya la verá por WhatsApp."
                        );
                      }}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-white/20 bg-white/10 px-4 py-3 text-xs font-bold uppercase tracking-wide text-white hover:bg-white/20 transition-all"
                    >
                      <Calculator className="h-4 w-4 text-emerald-300" />
                      Guardar plan
                    </button>
                  </div>
                </div>
              </div>

              {selectedLot.features && selectedLot.features.length > 0 && (
                <div className="rounded-3xl border border-slate-200 bg-white p-6">
                  <div className="font-bold text-slate-900 mb-3">
                    Características del lote
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedLot.features.map((f) => (
                      <span
                        key={f}
                        className="rounded-full bg-[#0f4c81]/10 px-3 py-1 text-xs font-bold text-[#0f4c81]"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>

      {/* SIGUIENTE / ANTERIOR */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="container-app grid gap-4 md:grid-cols-2">
          <Link
            href={`/proyectos/${prev.slug}`}
            className="group flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-5 hover:border-[#0f4c81]/30 hover:shadow-md transition-all"
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-[#0f4c81]/10 text-[#0f4c81] group-hover:bg-[#0f4c81] group-hover:text-white transition-all">
              <ArrowLeft className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Proyecto anterior
              </div>
              <div className="font-bold text-slate-900 group-hover:text-[#0f4c81]">
                {prev.name}
              </div>
              <div className="text-xs text-slate-500">
                {prev.location} · {prev.region}
              </div>
            </div>
          </Link>
          <Link
            href={`/proyectos/${next.slug}`}
            className="group flex items-center justify-end gap-4 rounded-3xl border border-slate-200 bg-white p-5 hover:border-[#0f4c81]/30 hover:shadow-md transition-all"
          >
            <div className="text-right">
              <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Siguiente proyecto
              </div>
              <div className="font-bold text-slate-900 group-hover:text-[#0f4c81]">
                {next.name}
              </div>
              <div className="text-xs text-slate-500">
                {next.location} · {next.region}
              </div>
            </div>
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-[#0f4c81]/10 text-[#0f4c81] group-hover:bg-[#0f4c81] group-hover:text-white transition-all">
              <ArrowRight className="h-5 w-5" />
            </div>
          </Link>
        </div>
        <div className="container-app mt-6 text-center">
          <Link
            href="/#proyectos-destacados"
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-sm font-bold text-white hover:bg-slate-800 transition-colors"
          >
            ← Volver a todos los proyectos
          </Link>
        </div>
      </section>
    </div>
  );
}
