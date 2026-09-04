export type LotStatus = "disponible" | "separado" | "vendido";

export interface Lot {
  code: string;
  area: number;
  price_usd: number;
  price_pen: number;
  monthly_fee_usd: number;
  status: LotStatus;
  features?: string[];
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  longDescription: string;
  heroImage: string;
  gallery: string[];
  location: string;
  region: string;
  googleMapsEmbed: string;
  googleMapsLink: string;
  minPrice: number;
  maxPrice: number;
  minArea: number;
  maxArea: number;
  totalLots: number;
  availableLots: number;
  amenities: string[];
  features: { title: string; description: string; icon: string }[];
  lots: Lot[];
  financial: {
    minInitialPercent: number;
    maxMonths: number;
    monthlyRate: number;
  };
  highlights: { label: string; value: string }[];
}

const GOOGLE_EMBED_BASE =
  "https://www.google.com/maps/d/embed?mid=1PvoWFwx1KCVgwRaXNZgagA2QB5IDPy0&hl=es";
const GOOGLE_VIEW_BASE =
  "https://www.google.com/maps/d/u/0/viewer?mid=1PvoWFwx1KCVgwRaXNZgagA2QB5IDPy0&ll&z=16";

const generateLots = (
  prefix: string,
  total: number,
  minArea: number,
  maxArea: number,
  minPrice: number,
  maxPrice: number
): Lot[] => {
  const out: Lot[] = [];
  const statuses: LotStatus[] = [
    "disponible",
    "disponible",
    "disponible",
    "disponible",
    "separado",
    "vendido",
  ];
  for (let i = 1; i <= total; i++) {
    const area = Math.round(minArea + Math.random() * (maxArea - minArea));
    const priceByM2 =
      minPrice / minArea + Math.random() * (maxPrice / maxArea - minPrice / minArea);
    const price = Math.round(area * priceByM2);
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    out.push({
      code: `${prefix}-${String(i).padStart(2, "0")}`,
      area,
      price_usd: price,
      price_pen: Math.round(price * 3.8),
      monthly_fee_usd: Math.round(price * 0.015),
      status,
      features: [
        ["Frente a vía principal", "Interior", "Esquina", "Frente a área verde"][
          Math.floor(Math.random() * 4)
        ],
      ],
    });
  }
  return out;
};

export const PROJECTS: Project[] = [
  {
    id: "santa-margarita",
    slug: "santa-margarita-polloc",
    name: "Santa Margarita – Polloc",
    shortName: "Santa Margarita",
    tagline: "Lotes urbanos en zona de alto crecimiento",
    description:
      "Proyecto residencial con servicios básicos listos, áreas verdes y acceso pavimentado. Ubicación estratégica en Polloc.",
    longDescription:
      "Santa Margarita es un proyecto residencial ubicado en Polloc, pensado para familias que buscan tranquilidad y plusvalía. Cuenta con todos los servicios básicos, vías pavimentadas, áreas comunes y cercanía a colegios, mercados y centros de salud. Ideal para construir la casa de tus sueños o invertir con alta rentabilidad.",
    heroImage:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&h=900&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop",
    ],
    location: "Polloc",
    region: "Lambayeque",
    googleMapsEmbed: GOOGLE_EMBED_BASE,
    googleMapsLink: GOOGLE_VIEW_BASE,
    minPrice: 18000,
    maxPrice: 42000,
    minArea: 120,
    maxArea: 220,
    totalLots: 52,
    availableLots: 38,
    amenities: [
      "Calles pavimentadas",
      "Agua potable",
      "Desagüe",
      "Luz eléctrica",
      "Áreas verdes",
      "Cercado perimetral",
    ],
    features: [
      {
        title: "Servicios integrales",
        description: "Agua, luz y desagüe desde el día 1.",
        icon: "Zap",
      },
      {
        title: "Plusvalía garantizada",
        description: "Zona de crecimiento comercial y habitacional.",
        icon: "TrendingUp",
      },
      {
        title: "Escrituración inmediata",
        description: "Títulos de propiedad individuales.",
        icon: "FileCheck2",
      },
    ],
    lots: generateLots("SM", 52, 120, 220, 18000, 42000),
    financial: { minInitialPercent: 15, maxMonths: 72, monthlyRate: 0.012 },
    highlights: [
      { label: "Precio desde", value: "$18,000 USD" },
      { label: "Lotes", value: "52 unidades" },
      { label: "Áreas", value: "120 - 220 m²" },
      { label: "Entrega", value: "Inmediata" },
    ],
  },
  {
    id: "alameda-la-colpa",
    slug: "alameda-la-colpa",
    name: "Alameda La Colpa",
    shortName: "Alameda La Colpa",
    tagline: "Vive rodeado de naturaleza y familia",
    description:
      "Proyecto residencial familiar con amplias áreas verdes, piscina y zona de recreación infantil. Alameda La Colpa combina diseño y calidad de vida.",
    longDescription:
      "Alameda La Colpa es un proyecto residencial de alta gama pensado en el bienestar familiar. Con más de 5 hectáreas de áreas verdes, piscina semi-olímpica, gimnasio al aire libre y acceso controlado 24/7, cada lote está diseñado para maximizar la plusvalía y el disfrute diario.",
    heroImage:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1600&h=900&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop",
    ],
    location: "La Colpa",
    region: "Lambayeque",
    googleMapsEmbed: GOOGLE_EMBED_BASE,
    googleMapsLink: GOOGLE_VIEW_BASE,
    minPrice: 28000,
    maxPrice: 58000,
    minArea: 140,
    maxArea: 280,
    totalLots: 58,
    availableLots: 44,
    amenities: [
      "Piscina semi-olímpica",
      "Parque central 3,000 m²",
      "Gimnasio al aire libre",
      "Seguridad 24/7",
      "Circuito cerrado",
      "Sala de eventos",
    ],
    features: [
      {
        title: "Piscina y áreas sociales",
        description: "Disfruta todo el año con tu familia.",
        icon: "Waves",
      },
      {
        title: "Seguridad total",
        description: "Control de acceso y CCTV.",
        icon: "ShieldCheck",
      },
      {
        title: "Financiamiento directo",
        description: "Hasta 72 meses con cuotas accesibles.",
        icon: "Calculator",
      },
    ],
    lots: generateLots("AC", 58, 140, 280, 28000, 58000),
    financial: { minInitialPercent: 20, maxMonths: 72, monthlyRate: 0.011 },
    highlights: [
      { label: "Precio desde", value: "$28,000 USD" },
      { label: "Lotes", value: "58 unidades" },
      { label: "Áreas", value: "140 - 280 m²" },
      { label: "Piscina", value: "Semi-olímpica" },
    ],
  },
  {
    id: "la-finca",
    slug: "la-finca",
    name: "La Finca",
    shortName: "La Finca",
    tagline: "Estilo campo, cerca de la ciudad",
    description:
      "Lotes estilo finca con amplios terrenos, idea para construir tu casa quinta o invertir en un proyecto eco-sostenible.",
    longDescription:
      "La Finca es un proyecto campestre único, con lotes desde 400 m², ubicados a solo 15 minutos del centro urbano. Perfectos para construir tu casa de descanso, realizar proyectos agropecuarios o invertir en alojamiento vacacional. Cercanía a servicios y vias principales.",
    heroImage:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&h=900&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop",
    ],
    location: "Zona rural",
    region: "Lambayeque",
    googleMapsEmbed: GOOGLE_EMBED_BASE,
    googleMapsLink: GOOGLE_VIEW_BASE,
    minPrice: 22000,
    maxPrice: 70000,
    minArea: 400,
    maxArea: 1500,
    totalLots: 46,
    availableLots: 39,
    amenities: [
      "Vías de acceso afirmado",
      "Pozo comunitario",
      "Red eléctrica",
      "Vivero forestal",
      "Club House",
    ],
    features: [
      {
        title: "Terrenos amplios",
        description: "Desde 400 m² hasta 1,500 m².",
        icon: "Trees",
      },
      {
        title: "Estilo vida de campo",
        description: "Tranquilidad y aire puro.",
        icon: "Sun",
      },
      {
        title: "Alta plusvalía",
        description: "Zona de expansión urbana.",
        icon: "TrendingUp",
      },
    ],
    lots: generateLots("LF", 46, 400, 1500, 22000, 70000),
    financial: { minInitialPercent: 15, maxMonths: 60, monthlyRate: 0.013 },
    highlights: [
      { label: "Precio desde", value: "$22,000 USD" },
      { label: "Lotes", value: "46 unidades" },
      { label: "Áreas", value: "400 - 1500 m²" },
      { label: "Ubicación", value: "Campestre" },
    ],
  },
  {
    id: "planicies-del-valle",
    slug: "planicies-del-valle",
    name: "Planicies del Valle",
    shortName: "Planicies del Valle",
    tagline: "Conecta con la naturaleza y la ciudad",
    description:
      "Proyecto moderno con concepto open-space, amplias zonas comunes y vías vehiculares y peatonales. Vive al mejor estilo contemporáneo.",
    longDescription:
      "Planicies del Valle redefine la vivienda contemporánea: lotes urbanos pensados para arquitectura moderna, ciclo vías internas, parque lineal, coworking y plaza comercial. Todo integrado para ofrecerte una experiencia premium.",
    heroImage:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&h=900&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
    ],
    location: "Valle",
    region: "Lambayeque",
    googleMapsEmbed: GOOGLE_EMBED_BASE,
    googleMapsLink: GOOGLE_VIEW_BASE,
    minPrice: 32000,
    maxPrice: 62000,
    minArea: 150,
    maxArea: 320,
    totalLots: 64,
    availableLots: 51,
    amenities: [
      "Parque lineal",
      "Ciclovías",
      "Plaza comercial",
      "Coworking",
      "Pet park",
      "Zona BBQ",
    ],
    features: [
      {
        title: "Concepto smart city",
        description: "Internet fibra óptica comunitario.",
        icon: "Wifi",
      },
      {
        title: "Plusvalía premium",
        description: "Diseño arquitectónico de alto nivel.",
        icon: "Sparkles",
      },
      {
        title: "Conectividad total",
        description: "Ciclovías y acceso a vías principales.",
        icon: "Footprints",
      },
    ],
    lots: generateLots("PV", 64, 150, 320, 32000, 62000),
    financial: { minInitialPercent: 18, maxMonths: 72, monthlyRate: 0.0115 },
    highlights: [
      { label: "Precio desde", value: "$32,000 USD" },
      { label: "Lotes", value: "64 unidades" },
      { label: "Áreas", value: "150 - 320 m²" },
      { label: "Smart", value: "Fibra óptica" },
    ],
  },
  {
    id: "valle-4-etapa-1",
    slug: "valle-4-etapa-1",
    name: "Valle 4 - Etapa 1",
    shortName: "Valle 4 Etapa 1",
    tagline: "La primera etapa de una gran comunidad",
    description:
      "Valle 4 Etapa 1 inaugura la ciudadela con los mejores lotes, áreas comunes y servicios completos. Plusvalía asegurada desde el primer día.",
    longDescription:
      "Valle 4 Etapa 1 es el inicio de una ciudadela integral. Los lotes más buscados, con la mejor ubicación y frente directo al parque central. Servicios listos, acceso pavimentado y financiamiento flexible.",
    heroImage:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1600&h=900&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop",
    ],
    location: "Valle",
    region: "Lambayeque",
    googleMapsEmbed: GOOGLE_EMBED_BASE,
    googleMapsLink: GOOGLE_VIEW_BASE,
    minPrice: 25000,
    maxPrice: 48000,
    minArea: 140,
    maxArea: 260,
    totalLots: 55,
    availableLots: 32,
    amenities: [
      "Servicios públicos completos",
      "Cercado perimetral",
      "Parque central",
      "Ciclovía perimetral",
    ],
    features: [
      {
        title: "Ubicación VIP",
        description: "Mejores frentes del proyecto.",
        icon: "MapPin",
      },
      {
        title: "Entrega inmediata",
        description: "Listos para escriturar.",
        icon: "CheckCircle2",
      },
      {
        title: "Alta demanda",
        description: "Más del 40% vendido en etapa 1.",
        icon: "Users",
      },
    ],
    lots: generateLots("V4A", 55, 140, 260, 25000, 48000),
    financial: { minInitialPercent: 15, maxMonths: 72, monthlyRate: 0.012 },
    highlights: [
      { label: "Precio desde", value: "$25,000 USD" },
      { label: "Lotes", value: "55 unidades" },
      { label: "Áreas", value: "140 - 260 m²" },
      { label: "Vendido", value: "40%" },
    ],
  },
  {
    id: "valle-4-etapa-2-3",
    slug: "valle-4-etapa-2-3",
    name: "Valle 4 - Etapas 2 y 3",
    shortName: "Valle 4 E. 2 y 3",
    tagline: "La continuación de una comunidad consolidada",
    description:
      "Valle 4 Etapas 2 y 3 amplían la ciudadela con nuevos lotes, más áreas verdes y zona comercial. Planos oficiales disponibles para ambos proyectos.",
    longDescription:
      "Continuación exitosa de Valle 4. Nuevas manzanas, nuevos servicios, zona comercial integrada y acceso exclusivo. La inversión segura para tu patrimonio familiar.",
    heroImage:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1600&h=900&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop",
    ],
    location: "Valle",
    region: "Lambayeque",
    googleMapsEmbed: GOOGLE_EMBED_BASE,
    googleMapsLink: GOOGLE_VIEW_BASE,
    minPrice: 27000,
    maxPrice: 52000,
    minArea: 140,
    maxArea: 280,
    totalLots: 118,
    availableLots: 86,
    amenities: [
      "Zona comercial",
      "Nuevo parque temático",
      "Iglesia comunitaria",
      "Ingreso 100% pavimentado",
    ],
    features: [
      {
        title: "2 proyectos en 1",
        description: "Etapa 2 y 3 con planos diferenciados.",
        icon: "Layers",
      },
      {
        title: "Zona comercial",
        description: "Comercios y servicios integrados.",
        icon: "Store",
      },
      {
        title: "Fases escalonadas",
        description: "Entregas en 2025 y 2026.",
        icon: "Calendar",
      },
    ],
    lots: generateLots("V4B", 118, 140, 280, 27000, 52000),
    financial: { minInitialPercent: 15, maxMonths: 72, monthlyRate: 0.012 },
    highlights: [
      { label: "Precio desde", value: "$27,000 USD" },
      { label: "Lotes", value: "118 unidades" },
      { label: "Áreas", value: "140 - 280 m²" },
      { label: "2 planos", value: "Etapa 2 y 3" },
    ],
  },
  {
    id: "valle-5",
    slug: "valle-5",
    name: "Valle 5",
    shortName: "Valle 5",
    tagline: "La nueva etapa premium del Valle",
    description:
      "Valle 5 es la quinta entrega con mejoras premium: piscina privada de la etapa, cancha de fútbol, gimnasio techado y más.",
    longDescription:
      "Valle 5 es el proyecto más exclusivo de la serie Valle. Amenidades de primer nivel, lotes amplios y diseño vanguardista. La joya de la corona para inversionistas y familias que buscan lo mejor.",
    heroImage:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&h=900&fit=crop",
    gallery: [],
    location: "Valle",
    region: "Lambayeque",
    googleMapsEmbed: GOOGLE_EMBED_BASE,
    googleMapsLink: GOOGLE_VIEW_BASE,
    minPrice: 35000,
    maxPrice: 72000,
    minArea: 180,
    maxArea: 360,
    totalLots: 60,
    availableLots: 48,
    amenities: [
      "Piscina exclusiva",
      "Gimnasio techado",
      "Cancha de fútbol",
      "SUM",
      "Spa",
      "Zona gourmet",
    ],
    features: [
      {
        title: "Amenidades premium",
        description: "Clase turista en tu ciudadela.",
        icon: "Crown",
      },
      {
        title: "Lotes XL",
        description: "Desde 180 m² hasta 360 m².",
        icon: "Maximize2",
      },
      {
        title: "Renta turística",
        description: "Ideal alquiler Airbnb.",
        icon: "Building2",
      },
    ],
    lots: generateLots("V5", 60, 180, 360, 35000, 72000),
    financial: { minInitialPercent: 18, maxMonths: 84, monthlyRate: 0.011 },
    highlights: [
      { label: "Precio desde", value: "$35,000 USD" },
      { label: "Lotes", value: "60 unidades" },
      { label: "Áreas", value: "180 - 360 m²" },
      { label: "Nivel", value: "Premium" },
    ],
  },
  {
    id: "valle-6",
    slug: "valle-6",
    name: "Valle 6",
    shortName: "Valle 6",
    tagline: "Innovación social y vanguardia",
    description:
      "Valle 6 apuesta por la sustentabilidad, paneles solares comunitarios, áreas de huerto urbano y transporte interno.",
    longDescription:
      "Primer proyecto eco-sustentable de la serie. Energía solar comunitario, reciclaje de aguas, huerto urbano y movilidad eléctrica. Perfecto para familias conscientes y rentabilidad ESG.",
    heroImage:
      "https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=1600&h=900&fit=crop",
    gallery: [],
    location: "Valle",
    region: "Lambayeque",
    googleMapsEmbed: GOOGLE_EMBED_BASE,
    googleMapsLink: GOOGLE_VIEW_BASE,
    minPrice: 29000,
    maxPrice: 55000,
    minArea: 150,
    maxArea: 280,
    totalLots: 64,
    availableLots: 58,
    amenities: [
      "Paneles solares comunitarios",
      "Sistema de aguas grises",
      "Huerto urbano",
      "Estación de carga eléctrica",
      "E-bikes",
    ],
    features: [
      {
        title: "Eco-sustentable",
        description: "Ahorros del 30% en recibos.",
        icon: "Leaf",
      },
      {
        title: "Tecnología limpia",
        description: "Energía solar y vehículos eléctricos.",
        icon: "Zap",
      },
      {
        title: "Tendencia ESG",
        description: "Alta valorización de mercado.",
        icon: "TrendingUp",
      },
    ],
    lots: generateLots("V6", 64, 150, 280, 29000, 55000),
    financial: { minInitialPercent: 15, maxMonths: 72, monthlyRate: 0.0118 },
    highlights: [
      { label: "Precio desde", value: "$29,000 USD" },
      { label: "Lotes", value: "64 unidades" },
      { label: "Áreas", value: "150 - 280 m²" },
      { label: "Tipo", value: "Eco smart" },
    ],
  },
  {
    id: "valle-7",
    slug: "valle-7",
    name: "Valle 7",
    shortName: "Valle 7",
    tagline: "Tu lote al mejor precio",
    description:
      "Valle 7 ofrece la oportunidad perfecta de ingresar al mercado inmobiliario. Pagos flexibles y excelentes condiciones de financiamiento.",
    longDescription:
      "Diseñado para tu primer inmueble. Lotes accesibles, financiamiento con inicial mínima y todos los servicios listos. Invierte hoy, construye mañana.",
    heroImage:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&h=900&fit=crop",
    gallery: [],
    location: "Valle",
    region: "Lambayeque",
    googleMapsEmbed: GOOGLE_EMBED_BASE,
    googleMapsLink: GOOGLE_VIEW_BASE,
    minPrice: 15000,
    maxPrice: 32000,
    minArea: 120,
    maxArea: 220,
    totalLots: 66,
    availableLots: 60,
    amenities: [
      "Servicios básicos",
      "Calles afirmadas",
      "Parques comunales",
      "Postes de alumbrado",
    ],
    features: [
      {
        title: "Inversión inicial baja",
        description: "Desde el 10% de inicial.",
        icon: "DollarSign",
      },
      {
        title: "Financiamiento super flexible",
        description: "Cuotas que se ajustan a ti.",
        icon: "CreditCard",
      },
      {
        title: "Alquiler seguro",
        description: "Gran demanda de lotes económicos.",
        icon: "TrendingUp",
      },
    ],
    lots: generateLots("V7", 66, 120, 220, 15000, 32000),
    financial: { minInitialPercent: 10, maxMonths: 96, monthlyRate: 0.013 },
    highlights: [
      { label: "Precio desde", value: "$15,000 USD" },
      { label: "Lotes", value: "66 unidades" },
      { label: "Áreas", value: "120 - 220 m²" },
      { label: "Inicial", value: "10%" },
    ],
  },
  {
    id: "la-pirca",
    slug: "la-pirca",
    name: "La Pirca",
    shortName: "La Pirca",
    tagline: "Tradición y futuro en un solo lugar",
    description:
      "La Pirca combina el encanto tradicional con servicios modernos. Ubicación céntrica, lotes listos para escriturar.",
    longDescription:
      "Ubicado en una de las zonas con mayor tradición de la región, La Pirca ofrece lotes con títulos de propiedad antiguos, cercanía a mercados, terminales y centros de salud. Perfecto para vivienda o alquiler de locales comerciales.",
    heroImage:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1600&h=900&fit=crop",
    gallery: [],
    location: "La Pirca",
    region: "Lambayeque",
    googleMapsEmbed: GOOGLE_EMBED_BASE,
    googleMapsLink: GOOGLE_VIEW_BASE,
    minPrice: 22000,
    maxPrice: 45000,
    minArea: 120,
    maxArea: 280,
    totalLots: 48,
    availableLots: 31,
    amenities: [
      "Ubicación céntrica",
      "Escrituración inmediata",
      "Alta rentabilidad comercial",
      "Rápida plusvalía",
    ],
    features: [
      {
        title: "Zona consolidada",
        description: "Crecimiento establecido.",
        icon: "MapPin",
      },
      {
        title: "Mixto comercial",
        description: "Apto vivienda o local.",
        icon: "Store",
      },
      {
        title: "Partidas listas",
        description: "Títulos antiguos, cero riesgos.",
        icon: "FileCheck2",
      },
    ],
    lots: generateLots("LP", 48, 120, 280, 22000, 45000),
    financial: { minInitialPercent: 20, maxMonths: 60, monthlyRate: 0.0115 },
    highlights: [
      { label: "Precio desde", value: "$22,000 USD" },
      { label: "Lotes", value: "48 unidades" },
      { label: "Áreas", value: "120 - 280 m²" },
      { label: "Zona", value: "Céntrica" },
    ],
  },
];

export const getProjectBySlug = (slug: string) =>
  PROJECTS.find((p) => p.slug === slug) || null;

export const LOT_STATUS_COLORS: Record<
  LotStatus,
  { fill: string; stroke: string; label: string }
> = {
  disponible: {
    fill: "#86efac",
    stroke: "#15803d",
    label: "Disponible",
  },
  separado: {
    fill: "#fde68a",
    stroke: "#d97706",
    label: "Separado",
  },
  vendido: {
    fill: "#fecaca",
    stroke: "#b91c1c",
    label: "Vendido",
  },
};
