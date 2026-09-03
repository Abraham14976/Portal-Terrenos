"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/config/site";

interface FloatingWhatsAppProps {
  prefilledMessage?: string;
  utmSource?: string;
}

export function FloatingWhatsApp({
  prefilledMessage,
  utmSource = "floating_button",
}: FloatingWhatsAppProps) {
  const [showBadge, setShowBadge] = useState(true);
  const [showTooltip, setShowTooltip] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBadge(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 6000);
    }, 45000);
    return () => clearInterval(interval);
  }, []);

  const message =
    prefilledMessage || siteConfig.whatsappDefaultMessage;

  return (
    <>
      <div className="fixed bottom-24 right-6 z-[60] md:bottom-28 md:right-8">
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="mb-3 max-w-[260px rounded-2xl rounded-br-sm border border-slate-200 bg-white p-4 shadow-2xl"
            >
              <div className="flex items-start gap-3">
                <img
                  src={siteConfig.advisor.photo}
                  alt="Asesor"
                  className="h-10 w-10 rounded-full border-2 border-[#25D366] object-cover"
                />
                <div className="flex-1">
                  <p className="text-xs font-bold text-slate-900">
                    {siteConfig.advisor.name}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {siteConfig.advisor.role}
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    👋 ¡Hola! ¿Tengo un lote perfecto para ti.
                  </p>
                </div>
                <button
                  onClick={() => setShowTooltip(false)}
                  className="text-slate-400 hover:text-slate-600"
                  aria-label="Cerrar"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#25D366]" />
                </span>
                <span className="text-xs font-medium text-slate-600">
                  En línea · Responde en 2 min
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.a
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: scrolled ? 1 : 1,
          opacity: scrolled ? 1 : 1,
        }}
        transition={{ duration: 0.4, delay: 1 }}
        href={buildWhatsAppLink(message, {
          source: utmSource,
          medium: "floating_cta",
          campaign: "floating_whatsapp",
        })}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[60] md:bottom-8 md:right-8 group"
        onClick={() => {
          setShowTooltip(false);
          trackEvent({
            name: "whatsapp_click",
            params: {
              utm_source: utmSource,
              button_location: "floating",
            },
          });
        }}
      >
        <span className="relative inline-flex items-center justify-center">
          <span className="absolute inline-flex h-16 w-16 animate-ping rounded-full bg-[#25D366]/40 md:h-20 md:w-20" />
          <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-xl shadow-[#25D366]/40 transition-all duration-300 group-hover:scale-110 md:h-16 md:w-16">
            <MessageCircle className="h-7 w-7 text-white md:h-8 md:w-8" strokeWidth={2.5} />
          </span>

          <AnimatePresence>
            {showBadge && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-lg md:h-7 md:w-7"
              >
                1
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </motion.a>
    </>
  );
}
