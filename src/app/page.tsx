import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { HomePremium } from "@/components/sections/HomePremium";

export default function Home() {
  return (
    <div className="relative overflow-x-hidden">
      <Navbar />
      <HomePremium />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
