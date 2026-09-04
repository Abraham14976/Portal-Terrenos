export type LotStatus = "available" | "reserved" | "sold" | "premium" | "promo";

export interface Lot {
  code: string;
  area: number;
  price_pen: number;
  price_by_m2: number;
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
  mapsEmbedLink: string;
  mapsViewerLink: string;
  minPrice: number;
  maxPrice: number;
  minArea: number;
  maxArea: number;
  totalLots: number;
  availableLots: number;
  amenities: string[];
  features: { title: string; description: string; icon: string }[];
  lots: Lot[];
  highlights: string[];
  type: "Urbano" | "Campestre" | "Mixto";
}

export const LOT_STATUS_COLORS: Record<
  LotStatus,
  { bg: string; text: string; dot: string; ring: string }
> = {
  available: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
    ring: "ring-emerald-200",
  },
  reserved: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-500",
    ring: "ring-amber-200",
  },
  sold: {
    bg: "bg-slate-100",
    text: "text-slate-600",
    dot: "bg-slate-400",
    ring: "ring-slate-200",
  },
  premium: {
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    dot: "bg-indigo-500",
    ring: "ring-indigo-200",
  },
  promo: {
    bg: "bg-rose-50",
    text: "text-rose-700",
    dot: "bg-rose-500",
    ring: "ring-rose-200",
  },
};

export function formatPEN(n: number): string {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatM2(n: number): string {
  return new Intl.NumberFormat("es-PE", { maximumFractionDigits: 0 }).format(n) + " m²";
}

const GOOGLE_EMBED_DEFAULT =
  "https://www.google.com/maps/d/embed?mid=1PvoWFwx1KCVgwRaXNZgagA2QB5IDPy0&hl=es";
const GOOGLE_VIEW_DEFAULT =
  "https://www.google.com/maps/d/u/0/viewer?mid=1PvoWFwx1KCVgwRaXNZgagA2QB5IDPy0&ll&z=16";

export const LOCAL_HERO = (slug: string) => `/proyectos/${slug}/hero.jpg`;
export const LOCAL_GALLERY = (slug: string): string[] =>
  Array.from({ length: 4 }).map((_, i) => `/proyectos/${slug}/g${i + 1}.jpg`);

const FALLBACK_HERO: Record<string, string> = {
  "santa-margarita-polloc":
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1800&h=1012&fit=crop",
  "alameda-la-colpa":
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1800&h=1012&fit=crop",
  "la-finca":
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1800&h=1012&fit=crop",
  "planicies-del-valle":
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1800&h=1012&fit=crop",
  "valle-4-etapa-1":
    "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1800&h=1012&fit=crop",
  "valle-4-etapa-2-3":
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1800&h=1012&fit=crop",
  "valle-5":
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1800&h=1012&fit=crop",
  "valle-6":
    "https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=1800&h=1012&fit=crop",
  "valle-7":
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1800&h=1012&fit=crop",
  "la-pirca":
    "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1800&h=1012&fit=crop",
};

const FALLBACK_GALLERY: Record<string, string[]> = {
  "santa-margarita-polloc": [
    "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=1400&h=900&fit=crop",
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&h=900&fit=crop",
    "https://images.unsplash.com/photo-1598228723793-52759bba239c?w=1400&h=900&fit=crop",
    "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1400&h=900&fit=crop",
  ],
  "alameda-la-colpa": [
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1400&h=900&fit=crop",
    "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1400&h=900&fit=crop",
    "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1400&h=900&fit=crop",
    "https://images.unsplash.com/photo-1605146768851-eda79da39897?w=1400&h=900&fit=crop",
  ],
  "la-finca": [
    "https://images.unsplash.com/photo-1501854140884-074bf8968a5d?w=1400&h=900&fit=crop",
    "https://images.unsplash.com/photo-1464146072230-91cabc968266?w=1400&h=900&fit=crop",
    "https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?w=1400&h=900&fit=crop",
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1400&h=900&fit=crop",
  ],
  "planicies-del-valle": [
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&h=900&fit=crop",
    "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1400&h=900&fit=crop",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&h=900&fit=crop",
    "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=1400&h=900&fit=crop",
  ],
  "valle-4-etapa-1": [
    "https://images.unsplash.com/photo-1430285561322-7808604715df?w=1400&h=900&fit=crop",
    "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1400&h=900&fit=crop",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1400&h=900&fit=crop",
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1400&h=900&fit=crop",
  ],
  "valle-4-etapa-2-3": [
    "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=1400&h=900&fit=crop",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1400&h=900&fit=crop",
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&h=900&fit=crop",
    "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1400&h=900&fit=crop",
  ],
  "valle-5": [
    "https://images.unsplash.com/photo-1459535653751-d571815e906b?w=1400&h=900&fit=crop",
    "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=1400&h=900&fit=crop",
    "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1400&h=900&fit=crop",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1400&h=900&fit=crop",
  ],
  "valle-6": [
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1400&h=900&fit=crop",
    "https://images.unsplash.com/photo-1578896611299-587e47df1b57?w=1400&h=900&fit=crop",
    "https://images.unsplash.com/photo-1472220625704-95d49a3c68e7?w=1400&h=900&fit=crop",
    "https://images.unsplash.com/photo-1598228723793-52759bba239c?w=1400&h=900&fit=crop",
  ],
  "valle-7": [
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1400&h=900&fit=crop",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1400&h=900&fit=crop",
    "https://images.unsplash.com/photo-1533106699674-c772c852d876?w=1400&h=900&fit=crop",
    "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=1400&h=900&fit=crop",
  ],
  "la-pirca": [
    "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1400&h=900&fit=crop",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1400&h=900&fit=crop",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1400&h=900&fit=crop",
    "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1400&h=900&fit=crop",
  ],
};

function galleryWithFallback(slug: string): string[] {
  const local = LOCAL_GALLERY(slug);
  const fb = FALLBACK_GALLERY[slug] || FALLBACK_GALLERY["santa-margarita-polloc"];
  return local.concat(fb);
}

function heroImageWithFallback(slug: string): string {
  return LOCAL_HERO(slug);
}

/**
 * onError helpers para componentes (para usarse en <img onError={...}>)
 * - setea el src al fallback si la foto local no existe en public/proyectos/...
 */
export function projectHeroOnError(slug: string) {
  return FALLBACK_HERO[slug] || FALLBACK_HERO["santa-margarita-polloc"];
}
export function projectGalleryOnError(slug: string, index: number): string {
  const fb = FALLBACK_GALLERY[slug] || FALLBACK_GALLERY["santa-margarita-polloc"];
  return fb[index % fb.length];
}
export const DEFAULT_ADVISOR_FB =
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=800&fit=crop";

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
    "available",
    "available",
    "available",
    "available",
    "available",
    "available",
    "premium",
    "promo",
    "reserved",
    "sold",
  ];
  const featuresPool = [
    "Frente a vía principal",
    "Interior tranquilo",
    "Esquina doble frente",
    "Frente a área verde",
    "Frente al parque del proyecto",
    "Cerca al ingreso principal",
    "Cerca a área social",
    "Vista a cerros",
    "Sin vecinos traseros",
    "Lote rectangular",
  ];
  for (let i = 1; i <= total; i++) {
    const area = Math.round(minArea + Math.random() * (maxArea - minArea));
    const ratioByM2 =
      minPrice / minArea + Math.random() * (maxPrice / maxArea - minPrice / minArea);
    let price_pen = Math.round(area * ratioByM2);
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    if (status === "promo") price_pen = Math.round(price_pen * 0.9);
    if (status === "premium") price_pen = Math.round(price_pen * 1.12);
    const nFeat = 1 + Math.floor(Math.random() * 3);
    const shuffled = [...featuresPool].sort(() => Math.random() - 0.5);
    out.push({
      code: `${prefix}-${String(i).padStart(2, "0")}`,
      area,
      price_pen,
      price_by_m2: Math.round(price_pen / area),
      status,
      features: shuffled.slice(0, nFeat),
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
    tagline: "Terrenos agrícolas aptos para cultivo de papa, maíz y hortalizas",
    description:
      "Terrenos amplios en Polloc (Cajamarca), suelo fértil y clima ideal para cultivo de papa amarilla, maíz amiláceo, trigo, cebada, hortalizas y pastos para ganado. Ideal para pequeños productores, familias campesinas o inversionistas agrícolas. Acceso directo desde vía principal, agua de acequia permanente y luz disponible para conexión.",
    longDescription:
      "Santa Margarita está ubicado en Polloc, una de las zonas agrícolas más productivas de Cajamarca, reconocida por su papa amarilla de alta calidad y rendimiento. El suelo es franco arcilloso con buen drenaje natural, lo que permite sembrar papa, maíz, haba, arveja, olluco, mashua y hortalizas durante todo el año. Cuenta con agua de riego permanente por acequia comunal, acceso vehicular de tierra afirmada durante los 12 meses, y cercanía a centros de acopio y mercados de Polloc y Cajamarca. Perfecto si quieres empezar tu propio fundo, diversificar tu producción o invertir en tierras agrícolas con alta rentabilidad.",
    heroImage: heroImageWithFallback("santa-margarita-polloc"),
    gallery: galleryWithFallback("santa-margarita-polloc"),
    location: "Polloc",
    region: "Cajamarca",
    mapsEmbedLink: GOOGLE_EMBED_DEFAULT,
    mapsViewerLink: GOOGLE_VIEW_DEFAULT,
    minPrice: 7000,
    maxPrice: 22000,
    minArea: 100,
    maxArea: 220,
    totalLots: 52,
    availableLots: 38,
    amenities: [
      "Suelo fértil para papa y maíz",
      "Agua de riego por acequia permanente",
      "Acceso vehicular todo el año",
      "Clima templado 14°C promedio",
      "Cercanía a centro de acopio",
      "Luz disponible para conexión",
    ],
    features: [
      { title: "Apto para cultivo", description: "Papa amarilla, maíz, haba, arveja, olluco, hortalizas y pastos.", icon: "Sprout" },
      { title: "Riego permanente", description: "Acequia con agua 12 meses al año sin interrupciones.", icon: "Droplets" },
      { title: "Escritura limpia", description: "Título individual inscrito en Sunarp con linderos claros.", icon: "FileCheck2" },
    ],
    lots: generateLots("SM", 52, 100, 220, 7000, 22000),
    highlights: [
      "Suelo fértil: papa, maíz, haba, olluco y hortalizas",
      "Agua de acequia permanente todo el año",
      "Acceso vehicular de tierra afirmada",
      "100 m² desde S/ 7,000 soles",
      "Títulos de propiedad individuales Sunarp",
      "Visita guiada al terreno con Abraham Portal",
    ],
    type: "Campestre",
  },
  {
    id: "alameda-la-colpa",
    slug: "alameda-la-colpa",
    name: "Alameda La Colpa",
    shortName: "Alameda La Colpa",
    tagline: "Lotes urbanos listos para construir o invertir con plusvalía",
    description:
      "Proyecto residencial en La Colpa (Cajamarca), ubicado en zona de alto crecimiento con todos los servicios listos para conexión inmediata. Lotes nivelados, linderos claros y vías principales pavimentadas. Ideal para construir tu casa propia desde el primer día o invertir con plusvalía asegurada a corto y mediano plazo.",
    longDescription:
      "Alameda La Colpa es un proyecto urbano ubicado en La Colpa, una de las zonas con mayor plusvalía y crecimiento de Cajamarca. Cuenta con vías pavimentadas, redes de agua potable, desagüe y luz eléctrica listas para conexión domiciliaria. Cada lote está totalmente nivelado, delimitado con mojones y con títulos de propiedad individuales inscritos en Sunarp. Perfecto si buscas construir tu vivienda familiar, edificios multifamiliares o invertir: la zona tiene una apreciación anual promedio de 10-15% por la expansión urbana y los nuevos accesos viales que conectan directamente con el centro de Cajamarca en menos de 15 minutos.",
    heroImage: heroImageWithFallback("alameda-la-colpa"),
    gallery: galleryWithFallback("alameda-la-colpa"),
    location: "La Colpa",
    region: "Cajamarca",
    mapsEmbedLink: "",
    mapsViewerLink: "",
    minPrice: 20000,
    maxPrice: 80000,
    minArea: 100,
    maxArea: 280,
    totalLots: 58,
    availableLots: 44,
    amenities: [
      "Agua potable red principal",
      "Desagüe cloacal listo",
      "Luz eléctrica disponible",
      "Calles pavimentadas",
      "Lotes nivelados y delimitados",
      "Conexión a internet vía cable",
    ],
    features: [
      { title: "Listo para construir", description: "Nivelado, servicios en vía. Empieza obra hoy mismo.", icon: "Hammer" },
      { title: "Alta plusvalía", description: "Zona de expansión urbana +15% anual promedio.", icon: "TrendingUp" },
      { title: "Títulos Sunarp", description: "Lindero claro, escritura pública inscrita sin gravámenes.", icon: "FileCheck2" },
    ],
    lots: generateLots("AC", 58, 100, 280, 20000, 80000),
    highlights: [
      "Servicios listos: agua, luz, desagüe e internet",
      "Calles pavimentadas y lotes 100% nivelados",
      "Listo para construir tu casa o invertir",
      "Plusvalía por expansión urbana a corto plazo",
      "100 m² desde S/ 20,000 soles",
      "Títulos individuales inscritos en Sunarp",
    ],
    type: "Urbano",
  },
  {
    id: "la-finca",
    slug: "la-finca",
    name: "La Finca",
    shortName: "La Finca",
    tagline: "Estilo de vida campestre con todos los servicios",
    description:
      "Lotes amplios estilo finca en entorno natural, pero con servicios urbanos completos. La Finca ofrece tranquilidad, aire puro y la mejor plusvalía de Cajamarca.",
    longDescription:
      "La Finca es un proyecto campestre exclusivo con lotes desde 180 m². Perfecto si quieres vivir lejos del ruido pero sin renunciar a agua, luz, desagüe y acceso pavimentado.",
    heroImage: heroImageWithFallback("la-finca"),
    gallery: galleryWithFallback("la-finca"),
    location: "Las Quintanas",
    region: "Cajamarca",
    mapsEmbedLink: "",
    mapsViewerLink: "",
    minPrice: 79000,
    maxPrice: 198000,
    minArea: 180,
    maxArea: 360,
    totalLots: 50,
    availableLots: 36,
    amenities: [
      "Senderos de caminata",
      "Laguna ornamental",
      "Parque central",
      "Agua 24 horas",
      "Luz subterránea",
      "Acceso asfaltado",
      "Club campestre",
    ],
    features: [
      { title: "Lotes XXL", description: "Desde 180 hasta 360 metros cuadrados.", icon: "Maximize2" },
      { title: "Entorno natural", description: "Vive rodeado de árboles y aire puro.", icon: "Trees" },
      { title: "Vías principales", description: "Acceso asfaltado desde la panamericana.", icon: "Car" },
    ],
    lots: generateLots("LF", 50, 180, 360, 79000, 198000),
    highlights: [
      "Lotes desde 180 m² estilo finca",
      "Entorno campestre 100% natural",
      "Senderos de caminata y laguna ornamental",
      "Agua y desagüe 100% operativos",
      "Escrituras limpias disponibles",
      "A 15 minutos del centro de Cajamarca",
    ],
    type: "Campestre",
  },
  {
    id: "planicies-del-valle",
    slug: "planicies-del-valle",
    name: "Planiecies del Valle",
    shortName: "Planicies del Valle",
    tagline: "Lotes urbanos con vista panorámica al valle",
    description:
      "Planiences del Valle cuenta con lotes en altura con espectacular vista panorámica al valle de Cajamarca. Calles pavimentadas y todos los servicios desde la primera etapa.",
    longDescription:
      "Disfruta de las mejores vistas de Cajamarca en cada lote. Planicies del Valle está ubicado en zona alta con brisa permanente y atardecer privilegiado.",
    heroImage: heroImageWithFallback("planicies-del-valle"),
    gallery: galleryWithFallback("planicies-del-valle"),
    location: "Zona Este",
    region: "Cajamarca",
    mapsEmbedLink: "",
    mapsViewerLink: "",
    minPrice: 72000,
    maxPrice: 175000,
    minArea: 130,
    maxArea: 250,
    totalLots: 56,
    availableLots: 42,
    amenities: [
      "Vista panorámica",
      "Calles en adoquín",
      "Alumbrado LED",
      "Parque mirador",
      "Área picnic",
      "Ciclovía",
    ],
    features: [
      { title: "Vista al valle", description: "Atardecer y vista 360 en altura.", icon: "Mountain" },
      { title: "Parque mirador", description: "Área común con bancos y asadores.", icon: "Image" },
      { title: "Ciclovía", description: "Recorrido seguro para bicicletas.", icon: "Bike" },
    ],
    lots: generateLots("PV", 56, 130, 250, 72000, 175000),
    highlights: [
      "Vista panorámica IMPAGABLE al valle",
      "Parque mirador con área de asadores",
      "Calles adoquinadas + alumbrado LED moderno",
      "Ciclovía interna de 1.2 km",
      "Lotes en altura con brisa permanente",
      "Precio desde S/ 72,000 soles",
    ],
    type: "Urbano",
  },
  {
    id: "valle-4-e1",
    slug: "valle-4-etapa-1",
    name: "Valle 4 · Etapa 1",
    shortName: "Valle 4 Etapa 1",
    tagline: "Primera etapa del complejo residencial más buscado",
    description:
      "Valle 4 Etapa 1 ya está entregada en su totalidad. Quedan los últimos lotes disponibles con descuentos especiales. ¡Consúltalos antes que se agoten!",
    longDescription:
      "El complejo Valle es el proyecto residencial más vendido de Cajamarca en los últimos 5 años. Etapa 1 ya cuenta con familias viviendo y servicios 100% operativos.",
    heroImage: heroImageWithFallback("valle-4-etapa-1"),
    gallery: galleryWithFallback("valle-4-etapa-1"),
    location: "Valle Verde",
    region: "Cajamarca",
    mapsEmbedLink: "",
    mapsViewerLink: "",
    minPrice: 68000,
    maxPrice: 162000,
    minArea: 120,
    maxArea: 240,
    totalLots: 54,
    availableLots: 15,
    amenities: [
      "Primera etapa entregada",
      "Familias ya viviendo",
      "Colegio al interior",
      "Local comercial",
      "Transporte público",
      "Área social techada",
    ],
    features: [
      { title: "Cercanía a colegios", description: "Colegio privado y público a 3 min.", icon: "GraduationCap" },
      { title: "Mall cercano", description: "Supermercados y farmacias a 5 min.", icon: "Store" },
      { title: "Entrega inmediata", description: "Lotes listos para escriturar HOY.", icon: "CheckCircle2" },
    ],
    lots: generateLots("V41", 54, 120, 240, 68000, 162000),
    highlights: [
      "¡ÚLTIMOS LOTES! Más del 70% ya vendido",
      "Familias ya viviendo, ambiente consolidado",
      "Colegio privado dentro del complejo",
      "Farmacia, minimarket y bus interno",
      "Descuentos especiales de hasta S/ 8,000 soles",
      "Entrega inmediata sin esperar construcción",
    ],
    type: "Urbano",
  },
  {
    id: "valle-4-e23",
    slug: "valle-4-etapa-2-3",
    name: "Valle 4 · Etapas 2 y 3",
    shortName: "Valle 4 Etapas 2 y 3",
    tagline: "Nuevas etapas, mismas 2 planificaciones completas",
    description:
      "Valle 4 Etapas 2 y 3 ofrecen 2 planos distintos (publico ambos en carpeta). Etapa 2 más privada, Etapa 3 con mayor área verde comunal. Consulta ambos mapas.",
    longDescription:
      "Dos planos oficiales, dos experiencias distintas. Etapa 2: más íntima. Etapa 3: más comunitaria. Ambas etapas conectadas entre sí y al complejo Valle 4 completo.",
    heroImage: heroImageWithFallback("valle-4-etapa-2-3"),
    gallery: galleryWithFallback("valle-4-etapa-2-3"),
    location: "Valle Verde (ampliación)",
    region: "Cajamarca",
    mapsEmbedLink: "",
    mapsViewerLink: "",
    minPrice: 74000,
    maxPrice: 186000,
    minArea: 140,
    maxArea: 260,
    totalLots: 60,
    availableLots: 47,
    amenities: [
      "2 planos oficiales",
      "Plaza principal",
      "Dos ingresos independientes",
      "Circuito cerrado",
      "Cámaras de seguridad",
      "Jardines comunes",
      "Búsqueda lotera personalizada",
    ],
    features: [
      { title: "2 planos disponibles", description: "Elige el que mejor se adapte a tu presupuesto.", icon: "Layers" },
      { title: "Circuito cerrado", description: "Seguridad con cámaras en todo el perímetro.", icon: "Cctv" },
      { title: "Dos ingresos", description: "Ingreso principal e independiente.", icon: "DoorOpen" },
    ],
    lots: generateLots("V42", 60, 140, 260, 74000, 186000),
    highlights: [
      "¡2 planos completos disponibles!",
      "Asesoría de Abraham para recomendarte la etapa ideal",
      "Circuito 100% cerrado y cámaras de seguridad",
      "Plaza principal con escenario para eventos",
      "Dos ingresos vehiculares independientes",
      "Títulos de propiedad listos para escriturar",
    ],
    type: "Mixto",
  },
  {
    id: "valle-5",
    slug: "valle-5",
    name: "Valle 5",
    shortName: "Valle 5",
    tagline: "El proyecto premium del complejo residencial Valle",
    description:
      "Valle 5 es la etapa de gama más alta del complejo. Lotes más grandes, mayor área verde, zona de huertos urbanos y la laguna artificial del proyecto.",
    longDescription:
      "Si buscas exclusividad, Valle 5 es tu opción. Huertos urbanos comunitarios, laguna ornamental, acceso vip y los lotes más amplios de todo el complejo.",
    heroImage: heroImageWithFallback("valle-5"),
    gallery: galleryWithFallback("valle-5"),
    location: "Valle Verde",
    region: "Cajamarca",
    mapsEmbedLink: "",
    mapsViewerLink: "",
    minPrice: 98000,
    maxPrice: 238000,
    minArea: 160,
    maxArea: 320,
    totalLots: 55,
    availableLots: 40,
    amenities: [
      "Laguna ornamental",
      "Huertos urbanos",
      "Casa club VIP",
      "Canchita de básquet",
      "Zona picnic techada",
      "Acceso VIP exclusivo",
      "Vivero comunitario",
    ],
    features: [
      { title: "Categoría premium", description: "El Valle de gama más alta del proyecto.", icon: "Crown" },
      { title: "Huertos urbanos", description: "Terrenos comunales para sembrar.", icon: "Sprout" },
      { title: "Casa club VIP", description: "Salón de eventos solo para Valle 5.", icon: "PartyPopper" },
    ],
    lots: generateLots("V5", 55, 160, 320, 98000, 238000),
    highlights: [
      "Gama premium del complejo residencial Valle",
      "Laguna ornamental + huertos urbanos comunitarios",
      "Casa club VIP con salón de eventos",
      "Acceso VIP peatonal y vehicular",
      "Lotes desde 160 hasta 320 m²",
      "Descuentos del 10% por apertura de etapa",
    ],
    type: "Campestre",
  },
  {
    id: "valle-6",
    slug: "valle-6",
    name: "Valle 6",
    shortName: "Valle 6",
    tagline: "Diseñado para familias jóvenes y primera compra",
    description:
      "Valle 6 es la etapa económica del complejo, pensado especialmente para familias jóvenes. Lotes desde S/ 62,000 soles. Facilidades de pago especiales.",
    longDescription:
      "Abraham diseñó Valle 6 pensando en quienes compran su primer lote. Lotes funcionales, servicios listos y accesos directos a vías rápidas.",
    heroImage: heroImageWithFallback("valle-6"),
    gallery: galleryWithFallback("valle-6"),
    location: "Valle Verde",
    region: "Cajamarca",
    mapsEmbedLink: "",
    mapsViewerLink: "",
    minPrice: 62000,
    maxPrice: 142000,
    minArea: 110,
    maxArea: 220,
    totalLots: 58,
    availableLots: 49,
    amenities: [
      "Facilidades de pago",
      "Primera compra",
      "Bus directo",
      "Lotes pequeños y medianos",
      "Área social",
      "Juegos infantiles",
    ],
    features: [
      { title: "Primera compra", description: "Diseñado para estrenar lote sin estrés.", icon: "Home" },
      { title: "Pagos flexibles", description: "Abraham te diseña plan a tu medida (interno!).", icon: "CreditCard" },
      { title: "Transporte directo", description: "Bus directo a centro Cajamarca.", icon: "Bus" },
    ],
    lots: generateLots("V6", 58, 110, 220, 62000, 142000),
    highlights: [
      "El más económico del complejo residencial",
      "Lotes desde S/ 62,000 soles (PROMOCION)",
      "Ideal para primera compra o inversionistas",
      "Bus directo al centro de Cajamarca cada 15 min",
      "Misma infraestructura que Etapas 4 y 5",
      "Pagos flexibles internos con Abraham Portal",
    ],
    type: "Urbano",
  },
  {
    id: "valle-7",
    slug: "valle-7",
    name: "Valle 7",
    shortName: "Valle 7",
    tagline: "Inversión de alta plusvalía · Nueva etapa 2025",
    description:
      "Valle 7 es la nueva etapa 2025 del complejo residencial. Mejor relación costo beneficio. ¡Aparta tu lote antes del lanzamiento oficial y paga menos!",
    longDescription:
      "Lanzamiento oficial 2025. Valle 7 ofrece acceso anticipado para inversionistas: precios por debajo del mercado, hasta que se inicie la construcción.",
    heroImage: heroImageWithFallback("valle-7"),
    gallery: galleryWithFallback("valle-7"),
    location: "Valle Verde - Ampliación Norte",
    region: "Cajamarca",
    mapsEmbedLink: "",
    mapsViewerLink: "",
    minPrice: 78000,
    maxPrice: 192000,
    minArea: 150,
    maxArea: 280,
    totalLots: 60,
    availableLots: 58,
    amenities: [
      "Pre-lanzamiento 2025",
      "Precios de apertura",
      "Crecimiento exponencial",
      "Zona universitaria cercana",
      "Futuro centro comercial",
      "Nuevo eje vial",
      "Reservas desde S/ 2,000 soles",
    ],
    features: [
      { title: "Precio de preventa", description: "Más bajo hasta antes del lanzamiento.", icon: "DollarSign" },
      { title: "Plusvalía segura", description: "Proyectado +25% en 24 meses.", icon: "TrendingUp" },
      { title: "Reserva baja", description: "Aparta desde S/ 2,000 soles.", icon: "Tag" },
    ],
    lots: generateLots("V7", 60, 150, 280, 78000, 192000),
    highlights: [
      "¡NUEVA ETAPA 2025! Pre-lanzamiento OFICIAL",
      "Precios de apertura (paga MUY MENOS que el público)",
      "Zona de alto crecimiento + nuevo eje vial",
      "Futuro centro comercial y universidad cercanos",
      "Plusvalía proyectada +25% en 2 años",
      "Aparta tu lote desde S/ 2,000 soles",
    ],
    type: "Mixto",
  },
  {
    id: "la-pirca",
    slug: "la-pirca",
    name: "La Pirca",
    shortName: "La Pirca",
    tagline: "Lotes campestres con tradición y naturaleza",
    description:
      "La Pirca es el proyecto campestre más antiguo y querido de la región. Ubicado en zona verde, cuna histórica. Perfecto para quienes buscan conexión con la tierra.",
    longDescription:
      "Con más de 10 años de historia, La Pirca es el proyecto campestre por excelencia de Cajamarca. Nombre tradicional y valores consolidados.",
    heroImage: heroImageWithFallback("la-pirca"),
    gallery: galleryWithFallback("la-pirca"),
    location: "La Encañada",
    region: "Cajamarca",
    mapsEmbedLink: "",
    mapsViewerLink: "",
    minPrice: 85000,
    maxPrice: 215000,
    minArea: 160,
    maxArea: 340,
    totalLots: 50,
    availableLots: 31,
    amenities: [
      "Proyecto histórico",
      "Vías adoquinadas",
      "Áreas de riego",
      "Zona de frutales",
      "Capilla al aire libre",
      "Ruta de caminatas",
    ],
    features: [
      { title: "Tradición", description: "El proyecto campestre más antiguo y querido.", icon: "Heart" },
      { title: "Naturaleza", description: "Rodeado de eucaliptos y zona de riego.", icon: "Flower2" },
      { title: "Valuación", description: "La marca 'Pirca' aumenta el valor de reventa.", icon: "Gem" },
    ],
    lots: generateLots("LP", 50, 160, 340, 85000, 215000),
    highlights: [
      "Proyecto campestre emblemático de Cajamarca",
      "Zona cuna histórica de La Encañada",
      "Lotes campestres grandes desde 160 m²",
      "Riego natural por temporada de lluvia",
      "Rutas de caminata y cabalgata",
      "Capilla al aire libre para eventos familiares",
    ],
    type: "Campestre",
  },
];

export function getProjectBySlug(slug: string): Project | null {
  return PROJECTS.find((p) => p.slug === slug) || null;
}
