export const siteConfig = {
  name: "Portal Terrenos",
  shortName: "Portal Terrenos",
  description:
    "Lotes urbanos residenciales en las mejores zonas del Perú. Invierte en tu futuro con asesoría personalizada de Abraham Saul Portal Garcia. Financiamiento directo sin complicaciones.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://portalterrenos.pe",
  ogImage: "/og-image.png",
  keywords: [
    "lotes",
    "terrenos",
    "inmobiliaria",
    "inversión inmobiliaria",
    "lotes urbanos",
    "terrenos en venta",
    "proyecto inmobiliario",
    "Abraham Portal",
    "asesor inmobiliario",
    "lima",
    "perú",
  ],
  author: "Abraham Saul Portal Garcia",
  locale: "es_PE",
  phone: "+51 926 301 972",
  email: "contacto@portalterrenos.pe",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "51926301972",
  whatsappDefaultMessage:
    process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ||
    "Hola Abraham! Vi tu web PortalTerrenos.pe y quiero más información sobre los lotes disponibles.",
  address: "Lima, Perú",
  projectName: "Residencial Las Verbenas",
  advisor: {
    name: "Abraham Saul Portal Garcia",
    role: "Asesor Inmobiliario Autorizado",
    credentials: "Registro Inmobiliario Oficial",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "51926301972",
    calendly: "https://calendly.com/portalterrenos/visita",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces",
  },
};

export type SiteConfig = typeof siteConfig;
