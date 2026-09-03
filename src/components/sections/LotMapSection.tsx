"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  X,
  Ruler,
  Home,
  DollarSign,
  Calendar,
  CheckCircle2,
  Filter,
  Trees,
  Waves,
  Car,
} from "lucide-react";
import {
  LOTS_DATA,
  LOT_STATUS_COLORS,
  type Lot,
  type LotStatus,
} from "@/data/lots";
import { buildWhatsAppLink, formatCurrencyDollars } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { saveLead } from "@/lib/supabase";
import { siteConfig } from "@/config/site";
import clsx from "clsx";

const STATUS_FILTERS: (LotStatus | "todos")[] = [
  "todos",
  "disponible",
  "separado",
  "vendido",
];

const STATUS_LABELS: Record<LotStatus | "todos", string> = {
  todos: "Todos",
  disponible: "Disponibles",
  separado: "Separados",
  vendido: "Vendidos",
};

const SVG_VIEWBOX = { w: 700, h: 520 };

const POLYGON_POINTS = (coords: [number, number][]) =>
  coords.map(([x, y]) => `${x},${y}`).join(" ");

const getLotCenter = (coords: [number, number][]) => {
  const xs = coords.map((c) => c[0]);
  const ys = coords.map((c) => c[1]);
  return {
    x: (Math.min(...xs) + Math.max(...xs)) / 2,
    y: (Math.min(...ys) + Math.max(...ys)) / 2,
  };
};

export function LotMapSection() {
  const [selectedLot, setSelectedLot] = useState<Lot | null>(null);
  const [hoverLot, setHoverLot] = useState<Lot | null>(null);
  const [filter, setFilter] = useState<LotStatus | "todos">("todos");

  const filteredLots = useMemo(() => {
    if (filter === "todos") return LOTS_DATA;
    return LOTS_DATA.filter((l) => l.status === filter);
  }, [filter]);

  const statusCounts = useMemo(() => {
    return {
      todos: LOTS_DATA.length,
      disponible: LOTS_DATA.filter((l) => l.status === "disponible").length,
      separado: LOTS_DATA.filter((l) => l.status === "separado").length,
      vendido: LOTS_DATA.filter((l) => l.status === "vendido").length,
    };
  }, []);

  const handleLotClick = (lot: Lot) => {
    setSelectedLot(lot);
    trackEvent({
      name: "lot_view",
      params: {
        lot_code: lot.code,
        lot_status: lot.status,
        lot_area: lot.area,
        lot_price: lot.price_usd,
      },
    });
  };

  return (
    <section id="plano" className="relative py-20 md:py-28 bg-slate-50/60">
      <div className="container-app">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="section-heading"
          >
            <MapPin className="mr-1.5 inline h-4 w-4" />
            Plano Interactivo
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="section-title"
          >
            Encuentra el <span className="gradient-text">lote perfecto</span> para ti
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="section-subtitle mx-auto"
          >
            Haz clic en cualquier lote para ver su información detallada.
            Filtra por estado y elige el mejor para tu familia.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
        >
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm">
            <Filter className="ml-3 h-4 w-4 text-slate-400" />
            {STATUS_FILTERS.map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={clsx(
                  "relative px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all",
                  filter === s
                    ? s === "todos"
                      ? "bg-slate-900 text-white shadow-md"
                      : s === "disponible"
                      ? "bg-brand-600 text-white shadow-md shadow-brand-500/20"
                      : s === "separado"
                      ? "bg-gold-500 text-white shadow-md shadow-gold-500/20"
                      : "bg-red-500 text-white shadow-md shadow-red-500/20"
                    : "text-slate-600 hover:bg-slate-100"
                )}
              >
                {STATUS_LABELS[s]}{" "}
                <span className={clsx(filter === s ? "opacity-90" : "opacity-60")}>
                  ({statusCounts[s]})
                </span>
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
            {(Object.keys(LOT_STATUS_COLORS) as LotStatus[]).map((status) => (
              <div key={status} className="flex items-center gap-2">
                <span
                  className="h-4 w-4 rounded-sm border-2"
                  style={{
                    background: LOT_STATUS_COLORS[status].fill,
                    borderColor: LOT_STATUS_COLORS[status].stroke,
                  }}
                />
                <span className="font-medium text-slate-600">
                  {LOT_STATUS_COLORS[status].label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3"
        >
          <div className="lg:col-span-2">
            <div className="relative aspect-[700/520] w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
              <svg
                viewBox={`0 0 ${SVG_VIEWBOX.w} ${SVG_VIEWBOX.h}`}
                preserveAspectRatio="xMidYMid meet"
                className="h-full w-full select-none"
                role="img"
                aria-label="Plano de lotización"
              >
                <defs>
                  <linearGradient id="bgPlano" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ecfdf5" />
                    <stop offset="50%" stopColor="#f8fafc" />
                    <stop offset="100%" stopColor="#fefce8" />
                  </linearGradient>
                  <linearGradient id="streetGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#475569" />
                    <stop offset="50%" stopColor="#334155" />
                    <stop offset="100%" stopColor="#475569" />
                  </linearGradient>
                  <pattern
                    id="parkPattern"
                    x="0"
                    y="0"
                    width="16"
                    height="16"
                    patternUnits="userSpaceOnUse"
                  >
                    <rect width="16" height="16" fill="#86efac" />
                    <circle cx="8" cy="8" r="2.5" fill="#16a34a" />
                  </pattern>
                  <pattern
                    id="diagonalAmber"
                    patternUnits="userSpaceOnUse"
                    width="8"
                    height="8"
                    patternTransform="rotate(45)"
                  >
                    <line
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="8"
                      stroke="#92400e"
                      strokeWidth="2"
                      strokeOpacity="0.35"
                    />
                  </pattern>
                  <pattern
                    id="crossRed"
                    patternUnits="userSpaceOnUse"
                    width="10"
                    height="10"
                  >
                    <path
                      d="M0,0 l10,10 M10,0 l-10,10"
                      stroke="#991b1b"
                      strokeWidth="1.5"
                      strokeOpacity="0.45"
                    />
                  </pattern>
                </defs>

                <rect
                  width={SVG_VIEWBOX.w}
                  height={SVG_VIEWBOX.h}
                  fill="url(#bgPlano)"
                />

                <g>
                  <rect x="20" y="20" width="660" height="20" fill="url(#streetGrad)" />
                  <rect x="20" y="490" width="660" height="10" fill="url(#streetGrad)" />
                  <rect x="20" y="20" width="10" height="480" fill="url(#streetGrad)" />
                  <rect x="670" y="20" width="10" height="480" fill="url(#streetGrad)" />
                  <rect x="30" y="300" width="640" height="10" fill="url(#streetGrad)" />
                  <rect x="400" y="30" width="10" height="260" fill="url(#streetGrad)" />

                  {[30, 75, 120, 165, 210, 255, 300, 345, 390, 435, 480, 525, 570, 615, 660].map(
                    (x, i) => (
                      <line
                        key={`v-${i}`}
                        x1={x}
                        y1={20}
                        x2={x}
                        y2={30}
                        stroke="#e2e8f0"
                        strokeWidth="1"
                      />
                    )
                  )}
                  {[500, 470, 440, 410, 380, 350, 320, 40, 70, 100, 130, 160, 190, 220, 250, 280].map(
                    (y, i) => (
                      <line
                        key={`h-${i}`}
                        x1={20}
                        y1={y}
                        x2={30}
                        y2={y}
                        stroke="#e2e8f0"
                        strokeWidth="1"
                      />
                    )
                  )}
                </g>

                <g>
                  <rect
                    x="420"
                    y="210"
                    width="100"
                    height="80"
                    fill="url(#parkPattern)"
                    stroke="#166534"
                    strokeWidth="1.5"
                    rx="6"
                  />
                  <text x="470" y="245" textAnchor="middle" fontSize="18" fill="#15803d">
                    🌳
                  </text>
                  <text x="470" y="270" textAnchor="middle" fontSize="10" fontWeight="600" fill="#14532d">
                    PARQUE
                  </text>
                  <text x="470" y="283" textAnchor="middle" fontSize="8" fill="#166534">
                    Central
                  </text>
                </g>

                <g>
                  <rect
                    x="560"
                    y="195"
                    width="100"
                    height="90"
                    fill="#bae6fd"
                    stroke="#0369a1"
                    strokeWidth="1.5"
                    rx="6"
                  />
                  <text x="610" y="242" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0c4a6e">
                    PISCINA
                  </text>
                </g>

                <g>
                  <rect
                    x="560"
                    y="60"
                    width="80"
                    height="70"
                    fill="#fee2e2"
                    stroke="#991b1b"
                    strokeWidth="1"
                    rx="4"
                    strokeDasharray="3 2"
                  />
                  <text x="600" y="90" textAnchor="middle" fontSize="9" fontWeight="600" fill="#991b1b">
                    ESTACIONAMIENTO
                  </text>
                  <text x="600" y="105" textAnchor="middle" fontSize="8" fill="#991b1b">
                    Visitantes
                  </text>
                </g>

                {LOTS_DATA.map((lot) => {
                  const colors = LOT_STATUS_COLORS[lot.status];
                  const center = getLotCenter(lot.coordinates);
                  const isFiltered = filteredLots.some((f) => f.id === lot.id);
                  const isSelected = selectedLot?.id === lot.id;
                  const isHover = hoverLot?.id === lot.id;

                  const extraFill =
                    lot.status === "vendido"
                      ? "url(#crossRed)"
                      : lot.status === "separado"
                      ? "url(#diagonalAmber)"
                      : undefined;

                  return (
                    <g
                      key={lot.id}
                      className={clsx(
                        "cursor-pointer transition-all duration-200",
                        !isFiltered && "opacity-20"
                      )}
                      onClick={() => handleLotClick(lot)}
                      onMouseEnter={() => setHoverLot(lot)}
                      onMouseLeave={() => setHoverLot(null)}
                    >
                      <motion.polygon
                        points={POLYGON_POINTS(lot.coordinates)}
                        fill={colors.fill}
                        stroke={colors.stroke}
                        strokeWidth={isSelected ? 3.5 : 2}
                        initial={false}
                        animate={{
                          scale: isHover || isSelected ? 1.02 : 1,
                          transformOrigin: `${center.x}px ${center.y}px`,
                          opacity: lot.status === "vendido" ? 0.85 : 1,
                        }}
                        style={{
                          transformBox: "fill-box",
                        }}
                        rx="4"
                      />
                      {extraFill && (
                        <polygon
                          points={POLYGON_POINTS(lot.coordinates)}
                          fill={extraFill}
                          pointerEvents="none"
                        />
                      )}

                      {(isHover || isSelected) && (
                        <polygon
                          points={POLYGON_POINTS(lot.coordinates)}
                          fill="white"
                          fillOpacity="0.18"
                          pointerEvents="none"
                        />
                      )}

                      <text
                        x={center.x}
                        y={center.y - 4}
                        textAnchor="middle"
                        fontSize="14"
                        fontWeight="800"
                        fill={colors.stroke}
                        style={{
                          pointerEvents: "none",
                          fontFamily:
                            "Plus Jakarta Sans, Inter, sans-serif",
                        }}
                      >
                        {lot.code}
                      </text>
                      <text
                        x={center.x}
                        y={center.y + 13}
                        textAnchor="middle"
                        fontSize="9"
                        fontWeight="600"
                        fill={colors.stroke}
                        style={{ pointerEvents: "none" }}
                      >
                        {lot.area} m²
                      </text>
                    </g>
                  );
                })}
              </svg>

              <AnimatePresence>
                {hoverLot && !selectedLot && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="pointer-events-none absolute left-4 top-4 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-2xl backdrop-blur w-52"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-900">
                        Lote {hoverLot.code}
                      </span>
                      <span
                        className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                        style={{
                          background:
                            LOT_STATUS_COLORS[hoverLot.status].fill + "55",
                          color: LOT_STATUS_COLORS[hoverLot.status].stroke,
                        }}
                      >
                        {LOT_STATUS_COLORS[hoverLot.status].label}
                      </span>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-1.5 text-[11px]">
                      <div>
                        <span className="text-slate-500">Área</span>
                        <p className="font-bold text-slate-900">
                          {hoverLot.area} m²
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-500">Precio</span>
                        <p className="font-bold text-slate-900">
                          {formatCurrencyDollars(hoverLot.price_usd)}
                        </p>
                      </div>
                    </div>
                    <p className="mt-2 text-[10px] font-semibold text-brand-700 text-center">
                      Haz clic para ver detalles
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedLot?.id || "none"}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="lg:col-span-1"
            >
              {selectedLot ? (
                <LotDetailPanel
                  lot={selectedLot}
                  onClose={() => setSelectedLot(null)}
                />
              ) : (
                <EmptyLotPanel onPick={(code) => {
                  const l = LOTS_DATA.find((x) => x.code === code);
                  if (l) handleLotClick(l);
                }} />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function EmptyLotPanel({ onPick }: { onPick: (code: string) => void }) {
  return (
    <div className="flex h-full min-h-[480px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-white/80 p-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
        <MapPin className="h-8 w-8" />
      </div>
      <h3 className="mt-5 font-display text-xl font-bold text-slate-900">
        Selecciona un lote
      </h3>
      <p className="mt-2 text-sm text-slate-500">
        Haz clic en cualquier lote del plano para ver su información detallada,
        precio y características.
      </p>
      <div className="mt-6 grid grid-cols-2 gap-3 w-full">
        {LOTS_DATA.slice(0, 4).map((lot) => (
          <button
            key={lot.id}
            onClick={() => onPick(lot.code)}
            className="rounded-xl border border-slate-200 bg-white p-3 text-left transition-all hover:border-brand-400 hover:shadow-md"
          >
            <p className="text-xs font-bold text-slate-500">Lote</p>
            <p className="text-sm font-bold text-slate-900">{lot.code}</p>
            <p className="mt-1 text-xs" style={{ color: LOT_STATUS_COLORS[lot.status].stroke }}>
              {lot.area} m² · {LOT_STATUS_COLORS[lot.status].label}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

interface LotDetailProps {
  lot: Lot;
  onClose: () => void;
}

function LotDetailPanel({ lot, onClose }: LotDetailProps) {
  const colors = LOT_STATUS_COLORS[lot.status];
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [formSent, setFormSent] = useState(false);

  const buildMessage = `Hola ${siteConfig.advisor.name}, vi el lote ${lot.code} en tu web (${lot.area} m², ${formatCurrencyDollars(lot.price_usd)}) y me gustaría cotizarlo.`;

  const handleConsultClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    trackEvent({
      name: "whatsapp_click",
      params: {
        lot_code: lot.code,
        button_location: "lot_detail",
      },
    });
    const saved = await saveLead({
      name: "",
      phone: "",
      lot_code: lot.code,
      message: buildMessage,
      source: "lot_detail",
    });
    if (!saved.skipped) {
      setFormSent(true);
    }
    window.open(
      buildWhatsAppLink(buildMessage, {
        source: `lote_${lot.code.toLowerCase()}`,
        medium: "lot_detail",
        campaign: "consulta_lote",
        content: lot.code,
      }),
      "_blank"
    );
  };

  return (
    <div className="flex h-full min-h-[480px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
      <div
        className="relative p-6 border-b border-slate-100"
        style={{
          background: `linear-gradient(135deg, ${colors.fill}30 0%, transparent 60%)`,
        }}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Lote Seleccionado
            </p>
            <h3 className="mt-1 font-display text-3xl font-extrabold text-slate-900">
              {lot.code}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span
            className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold"
            style={{
              background: colors.fill + "40",
              color: colors.stroke,
            }}
          >
            {colors.label}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {lot.zone}
          </span>
        </div>
      </div>

      <div className="flex-1 space-y-4 p-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
            <Ruler className="h-5 w-5 text-brand-600" />
            <p className="mt-2 text-xs text-slate-500">Área</p>
            <p className="font-display text-lg font-bold text-slate-900">
              {lot.area} m²
            </p>
            <p className="text-xs text-slate-500">
              Frente {lot.front}m · Fondo {lot.depth}m
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
            <DollarSign className="h-5 w-5 text-gold-600" />
            <p className="mt-2 text-xs text-slate-500">Precio Total</p>
            <p className="font-display text-lg font-bold text-slate-900">
              {formatCurrencyDollars(lot.price_usd)}
            </p>
            <p className="text-xs text-slate-500">
              {formatCurrencyDollars(Math.round(lot.price_usd / lot.area))}/m²
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 col-span-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            <p className="mt-2 text-xs text-slate-500">Cuota mensual aprox.</p>
            <div className="flex items-end justify-between">
              <p className="font-display text-2xl font-extrabold text-slate-900">
                {formatCurrencyDollars(lot.monthly_fee_usd)}
              </p>
              <p className="mb-1 text-xs text-slate-500">hasta 60 meses</p>
            </div>
          </div>
        </div>

        {lot.features.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              Características
            </p>
            <ul className="space-y-2">
              {lot.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-brand-500" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="border-t border-slate-100 p-6 space-y-3">
        <a
          href="#"
          onClick={handleConsultClick}
          className={clsx(
            "w-full",
            lot.status === "vendido"
              ? "btn-secondary pointer-events-none opacity-60"
              : "btn-whatsapp"
          )}
        >
          <Home className="h-4 w-4" />
          <span>
            {lot.status === "vendido" ? "Lote vendido" : "Consultar este lote"}
          </span>
        </a>
        <button
          onClick={() => {
            setShowLeadForm(!showLeadForm);
            trackEvent({
              name: "cta_click",
              params: {
                cta_label: "Solicitar pre-evaluación",
                cta_location: "lot_detail",
              },
            });
          }}
          className="btn-secondary w-full"
          disabled={lot.status === "vendido"}
        >
          Solicitar pre-evaluación
        </button>

        <AnimatePresence>
          {showLeadForm && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <LeadForm
                lotCode={lot.code}
                onSent={() => setFormSent(true)}
                sent={formSent}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

interface LeadFormProps {
  lotCode?: string;
  onSent: () => void;
  sent: boolean;
}

function LeadForm({ lotCode, onSent, sent }: LeadFormProps) {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { skipped } = await saveLead({
      ...form,
      lot_code: lotCode,
      source: "pre_evaluation",
    });
    if (!skipped) {
      trackEvent({
        name: "lead_form_submit",
        params: { source: "pre_evaluation", has_lot_code: !!lotCode },
      });
    }
    setLoading(false);
    onSent();
  };

  if (sent) {
    return (
      <div className="mt-4 rounded-2xl border border-brand-200 bg-brand-50 p-4 text-center">
        <CheckCircle2 className="mx-auto h-8 w-8 text-brand-600" />
        <p className="mt-2 font-semibold text-brand-800">
          ¡Gracias! Te contactaremos pronto
        </p>
        <p className="text-xs text-brand-700">
          Mientras tanto, chatea directamente por WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-4 space-y-3 border-t border-slate-100 pt-4">
      <p className="text-xs font-semibold text-slate-600">
        Datos para pre-evaluación crediticia
      </p>
      <div>
        <input
          required
          type="text"
          placeholder="Nombre completo"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
        />
      </div>
      <div>
        <input
          required
          type="tel"
          placeholder="Teléfono / Celular"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="Correo (opcional)"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
        />
      </div>
      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? "Enviando..." : "Enviar datos"}
      </button>
    </form>
  );
}
