import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { TestimonialsPage } from "@/components/sections/TestimonialsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimonios · +900 familias felices en Cajamarca | Portal Terrenos",
  description:
    "Historias reales de inversionistas y compradores de lotes en Cajamarca. +900 familias ya confiaron en Abraham Saul Portal Garcia. Lee sus experiencias.",
  keywords: [
    "testimonios asesor inmobiliario cajamarca",
    "opiniones lotes cajamarca",
    "abraham portal opiniones",
    "experiencias compra lote cajamarca",
  ],
};

export default function Testimonios() {
  return (
    <div className="relative overflow-x-hidden">
      <Navbar />
      <TestimonialsPage />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
