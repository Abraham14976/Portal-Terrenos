import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { ProjectsListPage } from "@/components/sections/ProjectsListPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Proyectos Inmobiliarios en Cajamarca · 10 Planos Oficiales | Portal Terrenos",
  description:
    "Santa Margarita, Alameda La Colpa, La Finca, Planicies del Valle, Valle 4, 5, 6 y 7 + La Pirca. 10 proyectos de lotes urbanos y campestres en Cajamarca. 50-60 lotes por proyecto con planos interactivos Google My Maps.",
  keywords: [
    "proyectos inmobiliarios Cajamarca",
    "lotes Cajamarca",
    "terrenos Cajamarca",
    "proyectos lotizacion Cajamarca",
    "Santa Margarita Polloc",
    "La Finca Cajamarca",
    "Valle 4 5 6 7 Cajamarca",
  ],
  openGraph: {
    title: "10 Proyectos Inmobiliarios en Cajamarca | Portal Terrenos",
    description:
      "Lotes desde S/ 57,000 soles. 10 proyectos, 600+ lotes. Plano Google My Maps de cada uno incluido. Asesoría de Abraham Portal.",
  },
};

export default function Projects() {
  return (
    <div className="relative overflow-x-hidden">
      <Navbar />
      <ProjectsListPage />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
