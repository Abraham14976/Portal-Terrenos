import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { AboutPage } from "@/components/sections/AboutPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Nosotros · Abraham Saul Portal Garcia | Portal Terrenos",
  description:
    "Conoce a Abraham Saul Portal Garcia, asesor inmobiliario con +15 años de experiencia y +1,200 lotes vendidos en Cajamarca. Transparencia, confianza y resultados comprobados.",
  keywords: [
    "abraham saul portal garcia",
    "asesor inmobiliario cajamarca",
    "inmobiliaria cajamarca",
    "portal terrenos",
    "empresa lotes cajamarca",
  ],
};

export default function Nosotros() {
  return (
    <div className="relative overflow-x-hidden">
      <Navbar />
      <AboutPage />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
