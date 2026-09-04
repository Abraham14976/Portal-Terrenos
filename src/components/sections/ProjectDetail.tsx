"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Filter,
  LayoutGrid,
  Map as MapIcon,
  MapPin,
  MessageCircle,
  Ruler,
  Search,
  ShieldCheck,
  Sparkles,
  ArrowUpDown,
  ExternalLink,
  Phone,
  Award,
  X,
  Home,
  Sprout,
  Droplets,
  Hammer,
  Zap,
  TrendingUp,
  FileCheck2,
  Users,
  Leaf,
  Trees,
  Maximize2,
  Car,
  Mountain,
  Image,
  Bike,
  Footprints,
  Waves,
  Camera,
  Dumbbell,
} from "lucide-react";
import {
  Lot,
  Project,
  LOT_STATUS_COLORS,
  formatPEN,
  formatM2,
  PROJECTS,
} from "@/data/projects";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

type SortKey =
  | "price_asc"
  | "price_desc"
  | "area_desc"
  | "area_asc"
  | "code";

interface Props {
  project: Project;
}

const STATUS_LABEL: Record<Lot["status"], string> = {
  available: "Disponible",
  reserved: "Reservado",
  sold: "Vendido",
  premium: "Premium",
  promo: "Promoción",
};

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "price_asc", label: "Precio: menor a mayor" },
  { value: "price_desc", label: "Precio: mayor a menor" },
  { value: "area_desc", label: "Área: m² más grandes primero" },
  { value: "area_asc", label: "Área: m² más pequeños primero" },
  { value: "code", label: "Orden: por código de lote" },
];

const FEATURE_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  Sprout,
  Droplets,
  Hammer,
  Zap,
  TrendingUp,
  FileCheck2,
  Users,
  Leaf,
  Trees,
  Maximize2,
  Car,
  Mountain,
  Image,
  Bike,
  Footprints,
  Waves,
  Camera,
  Dumbbell,
  ShieldCheck,
  Award,
  BadgeCheck,
  Sparkles,
  Home,
  Ruler,
  MapPin,
  LayoutGrid,
  CheckCircle2,
};

export function ProjectDetail({ project }: Props) {
  const [filterStatus, setFilterStatus] = useState<
    "all" | "available" | "reserved" | "premium" | "promo"
  >("all");
  const [minArea, setMinArea] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(project.maxPrice);
  const [minPrice, setMinPrice] = useState<number>(project.minPrice);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("price_asc");
  const [selectedLot, setSelectedLot] = useState<Lot | null>(null);
  const [showGallery, setShowGallery] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const idx = PROJECTS.findIndex((p) => p.slug === project.slug);
  const prev = idx > 0 ? PROJECTS[idx - 1] : null;
  const next = idx < PROJECTS.length - 1 ? PROJECTS[idx + 1] : null;

  const available = useMemo(
    () => project.lots.filter((l) => l.status === "available").length,
    [project.lots]
  );
  const reserved = useMemo(
    () => project.lots.filter((l) => l.status === "reserved").length,
    [project.lots]
  );
  const sold = project.lots.length - available - reserved;
  const soldPct = Math.round((sold / project.lots.length) * 100);

  const filteredLots = useMemo(() => {
    let arr = [...project.lots];
    if (filterStatus !== "all") {
      if (filterStatus === "available")
        arr = arr.filter(
          (l) => l.status === "available" || l.status === "promo" || l.status === "premium"
        );
      else arr = arr.filter((l) => l.status === filterStatus);
    }
    if (minArea > 0) arr = arr.filter((l) => l.area >= minArea);
    if (maxPrice < project.maxPrice) arr = arr.filter((l) => l.price_pen <= maxPrice);
    if (minPrice > project.minPrice) arr = arr.filter((l) => l.price_pen >= minPrice);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      arr = arr.filter(
        (l) =>
          l.code.toLowerCase().includes(q) ||
          (l.features || []).some((f) => f.toLowerCase().includes(q))
      );
    }
    arr.sort((a, b) => {
      switch (sort) {
        case "price_asc":
          return a.price_pen - b.price_pen;
        case "price_desc":
          return b.price_pen - a.price_pen;
        case "area_desc":
          return b.area - a.area;
        case "area_asc":
          return a.area - b.area;
        case "code":
        default:
          return a.code.localeCompare(b.code);
      }
    });
    return arr;
  }, [
    project.lots,
    filterStatus,
    minArea,
    maxPrice,
    minPrice,
    search,
    sort,
    project.maxPrice,
    project.minPrice,
  ]);

  const stats = [
    {
      label: "Lotes totales",
      value: String(project.totalLots),
      icon: LayoutGrid,
      tone: "from-[#0f4c81] to-[#1460a6]",
    },
    {
      label: "Disponibles",
      value: String(available),
      icon: ShieldCheck,
      tone: "from-emerald-500 to-emerald-700",
    },
    {
      label: "Reservados",
      value: String(reserved),
      icon: BadgeCheck,
      tone: "from-amber-400 to-amber-600",
    },
    {
      label: "Vendidos",
      value: String(sold),
      icon: CheckCircle2,
      tone: "from-slate-500 to-slate-700",
    },
  ];

  return (
    <main className="pt-20">
      {/* BREADCRUMB + NAV */}
      <div className="bg-gradient-to-r from-slate-50 via-white to-slate-50 border-b border-slate-200">
        <div className="container-app flex flex-wrap items-center justify-between gap-3 py-4 text-sm">
          <div className="flex flex-wrap items-center gap-2 text-slate-500 font-semibold">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 hover:text-[#0f4c81] transition-colors"
            >
              <Home className="h-3.5 w-3.5" /> Inicio
            </Link>
            <span className="text-slate-300">/</span>
            <Link
              href="/proyectos"
              className="hover:text-[#0f4c81] transition-colors"
            >
              Todos los proyectos
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-[#0f4c81] font-black truncate max-w-[35ch]">
              {project.shortName}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {prev && (
              <Link
                href={`/proyectos/${prev.slug}`}
                onClick={() =>
                  trackEvent({
                    name: "cta_click",
                    params: {
                      cta_label: `Proyecto anterior: ${prev.name}`,
                      cta_location: "breadcrumb_prev",
                    },
                  })
                }
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:border-[#0f4c81] hover:text-[#0f4c81] transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Anterior</span>
              </Link>
            )}
            {next && (
              <Link
                href={`/proyectos/${next.slug}`}
                onClick={() =>
                  trackEvent({
                    name: "cta_click",
                    params: {
                      cta_label: `Proyecto siguiente: ${next.name}`,
                      cta_location: "breadcrumb_next",
                    },
                  })
                }
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#0f4c81] px-3 py-2 text-xs font-black uppercase tracking-wider text-white hover:bg-[#1460a6] transition-colors"
              >
                <span className="hidden sm:inline">Siguiente</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* HERO PROJECT */}
      <section className="relative isolate bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={project.heroImage}
            alt={project.name}
            className="h-full w-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0b2e4c]/95 via-[#0f4c81]/85 to-[#0b2e4c]/98" />
        </div>
        <div className="container-app relative py-14 md:py-20 lg:py-24 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-amber-300 ring-1 ring-amber-300/30">
                <Sparkles className="h-3.5 w-3.5" />
                Proyecto oficial · Portal Terrenos
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-white/90 ring-1 ring-white/20">
                <MapPin className="h-3.5 w-3.5" />
                {project.location}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-emerald-300 ring-1 ring-emerald-400/30">
                {project.type}
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.02] drop-shadow-2xl">
              {project.name}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/85 leading-relaxed max-w-3xl">
              {project.tagline}
            </p>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4 hover:bg-white/10 transition-all"
                >
                  <div
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${s.tone} shadow`}
                  >
                    <s.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="mt-3 font-display text-2xl md:text-3xl font-black text-white leading-none">
                    {s.value}
                  </div>
                  <div className="mt-1 text-[11px] md:text-xs font-bold text-white/70 leading-tight">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 max-w-2xl">
              <div className="flex items-center justify-between mb-2 text-xs font-black uppercase tracking-widest text-white/70">
                <span>Avance de ventas</span>
                <span className="text-white/90">{soldPct}% completado</span>
              </div>
              <div className="h-4 overflow-hidden rounded-full bg-white/10 backdrop-blur">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-400 shadow-lg shadow-amber-400/20"
                  style={{ width: `${soldPct}%` }}
                />
              </div>
              <div className="mt-2 flex items-center justify-between text-[11px] md:text-xs font-bold text-white/60">
                <span>
                  Reservas rápidas:{" "}
                  <span className="text-emerald-300 font-black">
                    {available +
                      project.lots.filter((l) => l.status === "promo" || l.status === "premium").length}{" "}
                    disponibles
                  </span>
                </span>
                <span>
                  {available <= Math.round(project.totalLots * 0.2)
                    ? "🔥 ¡Últimos lotes!"
                    : "Inventario disponible"}
                </span>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={buildWhatsAppLink(
                  `Hola Abraham! Estoy MUY interesado en ${project.name} (${project.location}). Quiero ${available} lotes disponibles, desde S/ ${project.minPrice.toLocaleString()} soles. ¿Tienes una visita guiada esta semana?`,
                  {
                    source: `proyecto_hero_${project.slug}`,
                    medium: "website",
                    campaign: "proyecto_whatsapp",
                    content: project.id,
                  }
                )}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent({
                    name: "whatsapp_click",
                    params: { button_location: `proyecto_hero_${project.slug}` },
                  })
                }
                className="btn-whatsapp !py-4 !text-sm md:!text-base shadow-2xl shadow-emerald-700/20"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp para este proyecto
              </a>
              <a
                href="tel:+51926301972"
                className="inline-flex items-center gap-2 rounded-2xl border-2 border-white/30 bg-white/10 px-6 py-4 text-sm md:text-base font-black uppercase tracking-wide text-white backdrop-blur transition-all hover:bg-white/20 hover:-translate-y-0.5"
              >
                <Phone className="h-5 w-5" />
                Llamar ahora
              </a>
            </div>
          </div>

          {/* GALLERY PREVIEW */}
          <div className="lg:col-span-4">
            <div className="relative">
              <div className="absolute -inset-2 rounded-[2.5rem] bg-gradient-to-br from-amber-300/30 to-white/10 blur-xl" />
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-2 border-white/20 backdrop-blur">
                <button
                  type="button"
                  onClick={() => {
                    setGalleryIndex(0);
                    setShowGallery(true);
                  }}
                  className="group block w-full aspect-[4/3]"
                >
                  <img
                    src={project.gallery[0]}
                    alt={`${project.name} - Vista principal`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute left-5 bottom-5 right-5 flex items-end justify-between">
                    <div>
                      <div className="text-[11px] font-black uppercase tracking-widest text-white/70">
                        Galería del proyecto
                      </div>
                      <div className="mt-1 font-display text-2xl font-black text-white">
                        Ver fotos reales
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-black uppercase text-slate-900 shadow-lg">
                      {project.gallery.length} fotos
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </button>
                <div className="grid grid-cols-4 gap-1 p-1.5 bg-black/30">
                  {project.gallery.slice(1, 5).map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => {
                        setGalleryIndex(i + 1);
                        setShowGallery(true);
                      }}
                      className="group relative aspect-square rounded-lg overflow-hidden ring-1 ring-white/10"
                    >
                      <img
                        src={src}
                        alt={`Foto ${i + 2} de ${project.name}`}
                        className="h-full w-full object-cover group-hover:scale-110 transition-transform"
                        loading="lazy"
                      />
                      {i === 3 && project.gallery.length > 5 && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-xs font-black">
                          +{project.gallery.length - 5}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFICIOS + AMENITIES */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-app grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#0f4c81]/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#0f4c81] mb-4">
              Sobre este proyecto
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              Todo lo que incluye{" "}
              <span className="bg-gradient-to-r from-[#0f4c81] to-[#1460a6] bg-clip-text text-transparent">
                {project.shortName}
              </span>
            </h2>
            <p className="mt-5 text-lg text-slate-600 leading-relaxed">
              {project.description}
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              {project.highlights.map((h) => (
                <div
                  key={h}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-gradient-to-r from-white to-slate-50 p-4 hover:border-[#0f4c81]/30 hover:bg-[#0f4c81]/[0.03] transition-all"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 flex-shrink-0">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <span className="font-bold text-slate-800 leading-snug pt-0.5">
                    {h}
                  </span>
                </div>
              ))}
            </div>

            {project.features?.length > 0 && (
              <div className="mt-12">
                <div className="flex items-center gap-2 mb-6">
                  <div className="h-9 w-1 rounded-full bg-gradient-to-b from-[#0f4c81] to-[#1460a6]" />
                  <div>
                    <div className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                      3 razones clave
                    </div>
                    <h3 className="font-display text-2xl font-black text-slate-900">
                      Por qué elegir {project.shortName}
                    </h3>
                  </div>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  {project.features.map((f) => {
                    const Icon =
                      FEATURE_ICON[f.icon] || FEATURE_ICON["Sparkles"];
                    return (
                      <div
                        key={f.title}
                        className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-[#0f4c81]/40 hover:shadow-xl hover:shadow-[#0f4c81]/10"
                      >
                        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-amber-300/20 to-transparent blur-2xl transition-opacity group-hover:opacity-80" />
                        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0f4c81] to-[#1460a6] text-white shadow-lg shadow-[#0f4c81]/25 mb-5">
                          <Icon className="h-7 w-7" />
                        </div>
                        <div className="relative">
                          <div className="font-display text-lg font-black text-slate-900 mb-1.5">
                            {f.title}
                          </div>
                          <div className="text-sm leading-relaxed text-slate-600">
                            {f.description}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-7 md:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                    Amenidades y servicios
                  </div>
                  <h3 className="mt-1 font-display text-2xl font-black text-slate-900">
                    {project.amenities.length} beneficios incluidos
                  </h3>
                </div>
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#0f4c81] to-[#1460a6] text-white flex items-center justify-center shadow-lg shadow-[#0f4c81]/25">
                  <Award className="h-7 w-7" />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {project.amenities.map((a) => (
                  <div
                    key={a}
                    className="flex items-center gap-3 rounded-xl bg-white border border-slate-200 px-4 py-3 hover:border-[#0f4c81]/40 transition-all"
                  >
                    <div className="h-2 w-2 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 shadow-sm" />
                    <span className="font-bold text-slate-800">{a}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GOOGLE MAPS EMBED */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-y border-slate-200">
        <div className="container-app">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-amber-800 mb-4">
                <MapIcon className="h-3.5 w-3.5" />
                Plano oficial interactivo
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                Ubicación exacta ·{" "}
                <span className="text-[#0f4c81]">Plano interactivo</span>
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Visualiza todos los lotes del proyecto, calles, accesos y
                ubicación en tiempo real. Haz clic en &ldquo;Abrir en Maps&rdquo; para
                enviar la ubicación a tu cliente.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {project.mapsEmbedLink && (
                <a
                  href={project.mapsViewerLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3.5 text-sm font-black uppercase tracking-wider text-white shadow-lg hover:bg-slate-800 hover:-translate-y-0.5 transition-all"
                >
                  Abrir en Maps completo
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
              <a
                href={buildWhatsAppLink(
                  `Abraham, por favor envíame el mapa y ubicación exacta de ${project.name} (${project.location}). Gracias!`,
                  { source: `proyecto_mapa_${project.slug}`, content: project.id }
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
                onClick={() =>
                  trackEvent({
                    name: "whatsapp_click",
                    params: { button_location: `proyecto_mapa_${project.slug}` },
                  })
                }
              >
                <MessageCircle className="h-4 w-4" />
                Pedir ubicación por WhatsApp
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] overflow-hidden border-2 border-slate-200 shadow-2xl bg-slate-100 p-3">
            <div className="flex items-center justify-between px-3 py-3 mb-2">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-amber-400" />
                <div className="h-3 w-3 rounded-full bg-emerald-500" />
                <div className="ml-4 text-xs font-black uppercase tracking-widest text-slate-500 truncate max-w-[60ch]">
                  Plano interactivo · {project.name} · {project.location}
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-inner aspect-[16/9]">
              {project.mapsEmbedLink ? (
                <iframe
                  src={project.mapsEmbedLink}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Plano de ${project.name} - Portal Terrenos`}
                  className="w-full h-full bg-white"
                />
              ) : (
                <div className="h-full w-full flex flex-col items-center justify-center text-center p-10 bg-white">
                  <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-[#0f4c81]/10 text-[#0f4c81] mb-5">
                    <MapIcon className="h-10 w-10" />
                  </div>
                  <div className="font-display text-2xl font-black text-slate-900">
                    Mapa próximamente
                  </div>
                  <p className="mt-3 max-w-md text-slate-600">
                    Abraham está cargando el plano interactivo oficial de{" "}
                    {project.shortName}. Mientras tanto, pide la ubicación por
                    WhatsApp.
                  </p>
                  <a
                    href={buildWhatsAppLink(
                      `Hola Abraham, quiero la ubicación exacta y plano de ${project.name} (${project.location}).`,
                      { source: `proyecto_nomap_${project.slug}` }
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 btn-whatsapp"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Pedir mapa por WhatsApp
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* INVENTARIO LOTES */}
      <section className="py-16 md:py-24 bg-white" id="inventario">
        <div className="container-app">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#0f4c81]/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#0f4c81] mb-4">
                <LayoutGrid className="h-3.5 w-3.5" />
                Inventario oficial · {project.lots.length} lotes
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                Busca el{" "}
                <span className="bg-gradient-to-r from-[#0f4c81] to-[#1460a6] bg-clip-text text-transparent">
                  lote ideal
                </span>{" "}
                para ti
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                {filteredLots.length} de {project.lots.length} lotes
                coinciden con tus filtros. Haz clic en cualquier fila para ver
                el detalle y contactar con Abraham.
              </p>
            </div>
            <div className="inline-flex items-center gap-3 text-sm font-bold text-slate-500 bg-slate-50 rounded-2xl p-2 border border-slate-200">
              {(Object.keys(LOT_STATUS_COLORS) as (keyof typeof LOT_STATUS_COLORS)[]).map(
                (k) => (
                  <div
                    key={k}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white ring-1 ring-slate-200"
                  >
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${LOT_STATUS_COLORS[k].dot}`}
                    />
                    <span>{STATUS_LABEL[k]}</span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* FILTROS */}
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 md:p-7 shadow-sm mb-8">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6 items-start">
              <label className="lg:col-span-2 flex flex-col gap-2">
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
                  <Search className="h-3.5 w-3.5" />
                  Buscar lote
                </span>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Código (ej: A-05) o característica"
                    className="w-full rounded-2xl border-2 border-slate-200 bg-white pl-11 pr-4 py-3.5 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:border-[#0f4c81] focus:outline-none focus:ring-4 focus:ring-[#0f4c81]/10 transition-all"
                  />
                </div>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
                  <Filter className="h-3.5 w-3.5" />
                  Estado
                </span>
                <select
                  value={filterStatus}
                  onChange={(e) =>
                    setFilterStatus(e.target.value as typeof filterStatus)
                  }
                  className="rounded-2xl border-2 border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold text-slate-900 focus:border-[#0f4c81] focus:outline-none focus:ring-4 focus:ring-[#0f4c81]/10 transition-all"
                >
                  <option value="all">Todos los estados</option>
                  <option value="available">Solo disponibles</option>
                  <option value="premium">Premium</option>
                  <option value="promo">Promoción</option>
                  <option value="reserved">Reservados</option>
                </select>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
                  <ArrowUpDown className="h-3.5 w-3.5" />
                  Ordenar
                </span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="rounded-2xl border-2 border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold text-slate-900 focus:border-[#0f4c81] focus:outline-none focus:ring-4 focus:ring-[#0f4c81]/10 transition-all"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
                  <Ruler className="h-3.5 w-3.5" />
                  Área mín (m²)
                </span>
                <input
                  type="number"
                  min={project.minArea}
                  max={project.maxArea}
                  value={minArea || ""}
                  placeholder={`${project.minArea} m²`}
                  onChange={(e) =>
                    setMinArea(e.target.value ? Number(e.target.value) : 0)
                  }
                  className="rounded-2xl border-2 border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:border-[#0f4c81] focus:outline-none focus:ring-4 focus:ring-[#0f4c81]/10 transition-all"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-500">
                  Precio máx (S/)
                </span>
                <input
                  type="number"
                  min={project.minPrice}
                  max={project.maxPrice}
                  step={1000}
                  value={maxPrice === project.maxPrice ? "" : maxPrice}
                  placeholder={`${project.maxPrice.toLocaleString()} máx`}
                  onChange={(e) =>
                    setMaxPrice(
                      e.target.value ? Number(e.target.value) : project.maxPrice
                    )
                  }
                  className="rounded-2xl border-2 border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:border-[#0f4c81] focus:outline-none focus:ring-4 focus:ring-[#0f4c81]/10 transition-all"
                />
              </label>
            </div>
            <div className="mt-5 grid md:grid-cols-2 gap-3">
              <div>
                <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
                  <span>Rango de precios (S/)</span>
                  <span>
                    desde S/ {minPrice.toLocaleString()} hasta S/{" "}
                    {maxPrice.toLocaleString()}
                  </span>
                </div>
                <div className="rounded-full h-2 bg-slate-200 relative">
                  <div
                    className="absolute h-full rounded-full bg-gradient-to-r from-[#0f4c81] via-[#1460a6] to-amber-400"
                    style={{
                      left: `${
                        ((minPrice - project.minPrice) /
                          (project.maxPrice - project.minPrice)) *
                        100
                      }%`,
                      right: `${
                        ((project.maxPrice - maxPrice) /
                          (project.maxPrice - project.minPrice)) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2 md:justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setFilterStatus("all");
                    setMinArea(0);
                    setMaxPrice(project.maxPrice);
                    setMinPrice(project.minPrice);
                    setSearch("");
                    setSort("price_asc");
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-white ring-1 ring-slate-200 px-4 py-2 text-xs font-black uppercase tracking-wider text-slate-600 hover:border-[#0f4c81] hover:text-[#0f4c81] transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                  Limpiar filtros
                </button>
              </div>
            </div>
          </div>

          {/* INVENTARIO TABLA */}
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-4 bg-gradient-to-r from-slate-50 to-white border-b border-slate-200 text-[11px] font-black uppercase tracking-[0.14em] text-slate-500">
              <div className="col-span-2">Código lote</div>
              <div className="col-span-2">Estado</div>
              <div className="col-span-1 text-right">Área (m²)</div>
              <div className="col-span-2 text-right">Precio (S/)</div>
              <div className="col-span-1 text-right">S/ x m²</div>
              <div className="col-span-2">Características</div>
              <div className="col-span-2 text-right">Acción</div>
            </div>

            <div className="divide-y divide-slate-100 max-h-[75vh] overflow-y-auto no-scrollbar">
              {filteredLots.length === 0 ? (
                <div className="px-6 py-16 text-center">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mb-5">
                    <Filter className="h-8 w-8" />
                  </div>
                  <div className="font-display text-xl md:text-2xl font-black text-slate-900">
                    No se encontraron lotes con estos filtros
                  </div>
                  <p className="mt-2 text-slate-600">
                    Prueba con otro rango de precio, área mayor o limpia los
                    filtros.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setFilterStatus("all");
                      setMinArea(0);
                      setMaxPrice(project.maxPrice);
                      setMinPrice(project.minPrice);
                      setSearch("");
                    }}
                    className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#0f4c81] px-6 py-3.5 text-sm font-black uppercase tracking-wider text-white hover:bg-[#1460a6] transition-colors"
                  >
                    Mostrar todos los lotes
                  </button>
                </div>
              ) : (
                filteredLots.map((lot) => (
                  <motion.button
                    key={lot.code}
                    type="button"
                    onClick={() => setSelectedLot(lot)}
                    whileHover={{ backgroundColor: "rgba(15, 76, 129, 0.02)" }}
                    className="w-full grid grid-cols-12 gap-3 md:gap-4 px-4 md:px-6 py-4 md:py-5 text-left items-center transition-colors border-l-4 border-transparent hover:border-l-[#0f4c81] hover:bg-slate-50"
                  >
                    <div className="col-span-12 lg:col-span-2 flex lg:block items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-9 w-9 md:hidden items-center justify-center rounded-lg bg-slate-100 text-[#0f4c81] font-black text-xs">
                          {lot.code.slice(0, 2)}
                        </span>
                        <span className="font-display text-lg md:text-xl font-black text-slate-900 tracking-tight">
                          {lot.code}
                        </span>
                      </div>
                      <StatusBadge status={lot.status} size="sm" />
                    </div>
                    <div className="hidden lg:flex col-span-2">
                      <StatusBadge status={lot.status} />
                    </div>
                    <div className="col-span-6 lg:col-span-1 flex lg:block items-center justify-between gap-3">
                      <span className="text-xs lg:hidden text-slate-500 font-black uppercase tracking-wider">
                        Área
                      </span>
                      <div className="inline-flex items-center gap-1.5 font-display text-base md:text-lg font-black text-slate-900">
                        {formatM2(lot.area)}
                        <Ruler className="h-4 w-4 text-slate-400" />
                      </div>
                    </div>
                    <div className="col-span-6 lg:col-span-2 flex lg:block items-center justify-between gap-3">
                      <span className="text-xs lg:hidden text-slate-500 font-black uppercase tracking-wider">
                        Precio
                      </span>
                      <div className="text-right lg:pr-4">
                        <div className="font-display text-xl md:text-2xl font-black text-[#0f4c81] leading-none">
                          {formatPEN(lot.price_pen)}
                        </div>
                        {(lot.status === "promo" || lot.status === "premium") && (
                          <div className="mt-1 text-[10px] md:text-xs font-black uppercase tracking-wider text-amber-700 lg:text-right">
                            {lot.status === "promo" ? "⚡ Precio promocional" : "⭐ Lote premium"}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-span-6 lg:col-span-1 flex lg:block items-center justify-between gap-3">
                      <span className="text-xs lg:hidden text-slate-500 font-black uppercase tracking-wider">
                        Precio m²
                      </span>
                      <div className="inline-flex items-center rounded-xl bg-slate-100 px-2.5 py-1.5 text-xs md:text-sm font-black text-slate-700">
                        S/ {lot.price_by_m2.toLocaleString()}/m²
                      </div>
                    </div>
                    <div className="col-span-6 lg:col-span-2 flex lg:block items-center justify-between gap-3">
                      <span className="text-xs lg:hidden text-slate-500 font-black uppercase tracking-wider">
                        Características
                      </span>
                      <div className="flex flex-wrap gap-1.5 lg:justify-start">
                        {(lot.features || []).slice(0, 3).map((f) => (
                          <span
                            key={f}
                            className="rounded-lg bg-slate-50 border border-slate-200 px-2 py-1 text-[10px] md:text-[11px] font-bold text-slate-700 line-clamp-1"
                          >
                            {f}
                          </span>
                        ))}
                        {(lot.features || []).length > 3 && (
                          <span className="rounded-lg bg-[#0f4c81]/10 px-2 py-1 text-[10px] font-black uppercase text-[#0f4c81]">
                            +{(lot.features || []).length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-span-12 lg:col-span-2 flex lg:justify-end gap-2 mt-1 lg:mt-0">
                      <span className="inline-flex items-center gap-1.5 rounded-xl bg-[#0f4c81] px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white lg:hidden w-full justify-center">
                        Ver detalle del lote
                        <ChevronRight className="h-4 w-4" />
                      </span>
                      <span className="hidden lg:inline-flex items-center gap-1.5 rounded-xl bg-[#0f4c81] px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white hover:bg-[#1460a6] transition-colors shadow-lg shadow-[#0f4c81]/20">
                        Ver lote
                        <ChevronRight className="h-4 w-4" />
                      </span>
                    </div>
                  </motion.button>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA PREV / NEXT */}
      <section className="py-14 md:py-16 bg-gradient-to-b from-slate-50 to-white border-t border-slate-200">
        <div className="container-app grid md:grid-cols-2 gap-4">
          {prev ? (
            <Link
              href={`/proyectos/${prev.slug}`}
              onClick={() =>
                trackEvent({
                  name: "cta_click",
                  params: {
                    cta_label: `Ver proyecto anterior ${prev.name}`,
                    cta_location: "proyecto_footer_prev",
                  },
                })
              }
              className="group rounded-3xl border-2 border-slate-200 bg-white p-5 md:p-7 flex items-center gap-4 md:gap-6 transition-all hover:-translate-y-0.5 hover:border-[#0f4c81]/40 hover:shadow-xl"
            >
              <div className="flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0f4c81]/10 text-[#0f4c81] group-hover:bg-[#0f4c81] group-hover:text-white transition-colors">
                <ArrowLeft className="h-6 w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                  ← Proyecto anterior
                </div>
                <div className="mt-1 font-display text-lg md:text-xl font-black text-slate-900 truncate">
                  {prev.shortName}
                </div>
                <div className="mt-0.5 text-sm text-slate-500 font-semibold truncate">
                  {prev.location} · desde {formatPEN(prev.minPrice)}
                </div>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/proyectos/${next.slug}`}
              onClick={() =>
                trackEvent({
                  name: "cta_click",
                  params: {
                    cta_label: `Ver proyecto siguiente ${next.name}`,
                    cta_location: "proyecto_footer_next",
                  },
                })
              }
              className="group rounded-3xl border-2 border-[#0f4c81]/30 bg-gradient-to-br from-[#0f4c81] to-[#1460a6] text-white p-5 md:p-7 flex items-center gap-4 md:gap-6 transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-[#0f4c81]/25 md:flex-row-reverse md:text-right"
            >
              <div className="flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white group-hover:bg-white group-hover:text-[#0f4c81] transition-colors">
                <ArrowRight className="h-6 w-6" />
              </div>
              <div className="min-w-0 flex-1 md:pr-2">
                <div className="text-[11px] font-black uppercase tracking-widest text-white/70">
                  Siguiente proyecto →
                </div>
                <div className="mt-1 font-display text-lg md:text-xl font-black truncate">
                  {next.shortName}
                </div>
                <div className="mt-0.5 text-sm text-white/80 font-semibold truncate">
                  {next.location} · desde {formatPEN(next.minPrice)}
                </div>
              </div>
            </Link>
          ) : (
            <div className="md:justify-self-end">
              <Link
                href="/proyectos"
                className="group rounded-3xl bg-slate-900 text-white p-5 md:p-7 flex items-center gap-4 md:gap-6 hover:bg-slate-800 transition-colors"
              >
                <div className="flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white">
                  <LayoutGrid className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-[11px] font-black uppercase tracking-widest text-white/70">
                    ← Volver a todos
                  </div>
                  <div className="mt-1 font-display text-lg md:text-xl font-black">
                    Ver {PROJECTS.length} proyectos
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* MODAL DETALLE LOTE */}
      {selectedLot && (
        <LotModal
          lot={selectedLot}
          project={project}
          onClose={() => setSelectedLot(null)}
        />
      )}

      {/* MODAL GALERIA */}
      {showGallery && (
        <GalleryModal
          images={project.gallery}
          initialIndex={galleryIndex}
          onClose={() => setShowGallery(false)}
          onChange={(i) => setGalleryIndex(i)}
        />
      )}
    </main>
  );
}

function StatusBadge({
  status,
  size = "md",
}: {
  status: Lot["status"];
  size?: "sm" | "md";
}) {
  const s = LOT_STATUS_COLORS[status];
  const text = size === "sm" ? "text-[11px] px-2.5 py-1" : "text-xs px-3.5 py-1.5";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-black uppercase tracking-wider ${s.bg} ${s.text} ${text} ring-1 ${s.ring} shadow-sm`}
    >
      <span className={`h-2 w-2 rounded-full ${s.dot}`} />
      {STATUS_LABEL[status]}
    </span>
  );
}

function LotModal({
  lot,
  project,
  onClose,
}: {
  lot: Lot;
  project: Project;
  onClose: () => void;
}) {
  const isAvailable =
    lot.status === "available" || lot.status === "promo" || lot.status === "premium";
  return (
    <div
      className="fixed inset-0 z-[120] bg-slate-950/70 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-5"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 80 }}
        transition={{ type: "spring", duration: 0.4, bounce: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-white rounded-t-[2rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        <div className="relative h-56 md:h-72 bg-gradient-to-br from-[#0f4c81] to-[#1460a6] text-white">
          <img
            src={project.heroImage}
            alt={`Lote ${lot.code} - ${project.name}`}
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0b2e4c]/60 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur text-white ring-1 ring-white/30 hover:bg-white/25 transition-colors"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="relative z-10 p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[10px] font-black uppercase tracking-widest ring-1 ring-white/30">
                <MapPin className="h-3 w-3" />
                {project.shortName}
              </span>
              <StatusBadge status={lot.status} />
            </div>
            <h3 className="font-display text-4xl md:text-6xl font-black leading-none tracking-tight drop-shadow-xl">
              Lote {lot.code}
            </h3>
            <div className="mt-2 md:mt-3 font-bold text-white/90 md:text-lg">
              {project.location} · {project.type}
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
            <StatMini
              label="Precio"
              value={formatPEN(lot.price_pen)}
              tone="from-[#0f4c81] to-[#1460a6]"
            />
            <StatMini
              label="Área"
              value={formatM2(lot.area)}
              tone="from-indigo-500 to-indigo-700"
            />
            <StatMini
              label="Precio x m²"
              value={`S/ ${lot.price_by_m2.toLocaleString()}`}
              tone="from-emerald-500 to-emerald-700"
            />
            <StatMini
              label="Estado"
              value={STATUS_LABEL[lot.status]}
              tone="from-amber-400 to-amber-600"
            />
          </div>

          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 md:p-7 mb-6">
            <div className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">
              Características del lote
            </div>
            <div className="flex flex-wrap gap-2">
              {(lot.features || []).length === 0 ? (
                <span className="text-sm text-slate-500 font-semibold">
                  Consulta características por WhatsApp
                </span>
              ) : (
                (lot.features || []).map((f) => (
                  <span
                    key={f}
                    className="rounded-xl bg-white border border-slate-200 px-3.5 py-2 text-sm font-bold text-slate-700"
                  >
                    {f}
                  </span>
                ))
              )}
            </div>
          </div>

          <div className="rounded-3xl border-2 border-[#0f4c81]/15 bg-gradient-to-br from-[#0f4c81]/[0.04] to-white p-6 md:p-7 mb-7">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 h-14 w-14 rounded-2xl bg-gradient-to-br from-[#0f4c81] to-[#1460a6] text-white flex items-center justify-center shadow-lg shadow-[#0f4c81]/25">
                <MessageCircle className="h-7 w-7" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-display text-xl md:text-2xl font-black text-slate-900">
                  {isAvailable
                    ? "¡Este lote está disponible HOY!"
                    : "Consulta disponibilidad"}
                </div>
                <p className="mt-2 text-slate-600 leading-relaxed">
                  Abraham te confirmará en menos de 2 horas, te enviará el
                  plano con la ubicación del lote {lot.code} y agendará una
                  visita guiada sin costo.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={buildWhatsAppLink(
                `Hola Abraham! QUIERO RESERVAR el lote ${lot.code} de ${project.name} (${project.location}).\n\n📐 Área: ${lot.area} m²\n💰 Precio: S/ ${lot.price_pen.toLocaleString()} soles (S/ ${lot.price_by_m2.toLocaleString()} x m²)\n📋 Estado: ${STATUS_LABEL[lot.status]}\n${(lot.features || []).length ? `✨ Características: ${(lot.features || []).join(", ")}` : ""}\n\nPor favor, dime qué documentación necesito y si hay promoción esta semana. Gracias!`,
                {
                  source: `proyecto_lote_${project.slug}_${lot.code}`,
                  medium: "website",
                  campaign: `reserva_lote_${project.slug}`,
                  content: `${project.id}_${lot.code}`,
                }
              )}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackEvent({
                  name: "whatsapp_click",
                  params: {
                    button_location: `lote_modal_${project.slug}_${lot.code}`,
                  },
                });
                onClose();
              }}
              className="btn-whatsapp !py-4 justify-center !text-sm md:!text-base flex-1 shadow-xl shadow-emerald-700/15"
            >
              <MessageCircle className="h-5 w-5" />
              Reservar lote {lot.code} por WhatsApp
            </a>
            <a
              href="tel:+51926301972"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-6 py-4 text-sm md:text-base font-black uppercase tracking-wide text-slate-700 hover:border-[#0f4c81] hover:text-[#0f4c81] transition-colors"
            >
              <Phone className="h-5 w-5" />
              Llamar
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function StatMini({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition-all">
      <div className={`inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${tone} shadow`}>
        <span className="text-white font-black text-[10px]">
          {label.slice(0, 2).toUpperCase()}
        </span>
      </div>
      <div className="mt-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
        {label}
      </div>
      <div className="mt-1 font-display text-lg md:text-xl font-black text-slate-900 leading-tight">
        {value}
      </div>
    </div>
  );
}

function GalleryModal({
  images,
  initialIndex,
  onClose,
  onChange,
}: {
  images: string[];
  initialIndex: number;
  onClose: () => void;
  onChange: (i: number) => void;
}) {
  const [i, setI] = useState(initialIndex);
  const prev = () => {
    const n = (i - 1 + images.length) % images.length;
    setI(n);
    onChange(n);
  };
  const next = () => {
    const n = (i + 1) % images.length;
    setI(n);
    onChange(n);
  };
  return (
    <div
      className="fixed inset-0 z-[120] bg-black/90 backdrop-blur flex items-center justify-center p-3 md:p-8"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-20 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/30 hover:bg-white/20 transition-colors backdrop-blur"
        aria-label="Cerrar galería"
      >
        <X className="h-6 w-6" />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
        className="absolute left-3 md:left-6 z-20 inline-flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/30 hover:bg-white/20 transition-colors backdrop-blur"
        aria-label="Foto anterior"
      >
        <ChevronLeft className="h-7 w-7" />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        className="absolute right-3 md:right-6 z-20 inline-flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/30 hover:bg-white/20 transition-colors backdrop-blur"
        aria-label="Foto siguiente"
      >
        <ChevronRight className="h-7 w-7" />
      </button>

      <div
        className="relative w-full max-w-6xl aspect-video"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={images[i]}
          src={images[i]}
          alt={`Foto ${i + 1} de ${images.length}`}
          className="w-full h-full object-contain rounded-2xl"
        />
        <div className="absolute bottom-3 md:bottom-5 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 rounded-full bg-black/50 backdrop-blur px-5 py-2 text-white ring-1 ring-white/20">
          <span className="font-black">{i + 1}</span>
          <span className="text-white/60">/</span>
          <span className="font-bold text-white/80">{images.length}</span>
        </div>
      </div>

      <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 flex flex-wrap items-center justify-center gap-1.5 max-w-[80%]">
        {images.map((src, idx) => (
          <button
            key={src}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setI(idx);
              onChange(idx);
            }}
            className={`h-10 w-14 md:h-14 md:w-20 rounded-lg overflow-hidden ring-2 transition-all ${
              idx === i ? "ring-amber-400 scale-105" : "ring-white/20 opacity-70 hover:opacity-100"
            }`}
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
