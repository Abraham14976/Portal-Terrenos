import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { ProjectsListPage } from "@/components/sections/ProjectsListPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Proyectos Inmobiliarios en Cajamarca · 10 Planos Oficiales | Portal Terrenos",
  description:
    "Santa Margarita, Alameda La Colpa, La Finca, Planicies del Valle, Valle 4, 5, 6 y 7 + La Pirca. 10 proyectos de lotes urbanos y campestres en Cajamarca. Planos interactivos, inventario actualizado y asesoría personalizada de Abraham Portal.",
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
      "10 proyectos residenciales en Cajamarca. Planos interactivos, lotes disponibles y asesoría personalizada de Abraham Saul Portal Garcia.",
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
