import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { ContactPage } from "@/components/sections/ContactPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto · Abraham Portal | Portal Terrenos Cajamarca",
  description:
    "Contacta directamente a Abraham Saul Portal Garcia. WhatsApp 24/7 al +51 926 301 972. Llamadas, email o formulario. Respuesta menor a 2 horas.",
  keywords: [
    "contacto portal terrenos",
    "abraham portal whatsapp",
    "asesor inmobiliario whatsapp",
    "consultar lotes cajamarca",
  ],
};

export default function Contacto() {
  return (
    <div className="relative overflow-x-hidden">
      <Navbar />
      <ContactPage />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
