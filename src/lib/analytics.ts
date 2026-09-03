"use client";

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
  }
}

export type AnalyticsEvent =
  | {
      name: "whatsapp_click";
      params: {
        lot_code?: string;
        utm_source?: string;
        button_location: string;
      };
    }
  | {
      name: "lot_view";
      params: {
        lot_code: string;
        lot_status: "disponible" | "separado" | "vendido";
        lot_area: number;
        lot_price: number;
      };
    }
  | {
      name: "financial_simulator_use";
      params: {
        initial_amount: number;
        months: number;
        monthly_fee: number;
        total_price: number;
      };
    }
  | {
      name: "pre_evaluation_request";
      params: {
        lot_code?: string;
        initial_amount: number;
        months: number;
        monthly_fee: number;
      };
    }
  | {
      name: "plan_download";
      params: {
        plan_type: string;
      };
    }
  | {
      name: "lead_form_submit";
      params: {
        source: string;
        has_lot_code: boolean;
      };
    }
  | {
      name: "cta_click";
      params: {
        cta_label: string;
        cta_location: string;
      };
    };

export function trackEvent(event: AnalyticsEvent) {
  if (typeof window === "undefined") return;

  if (window.dataLayer) {
    window.dataLayer.push({ event: event.name, ...event.params });
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", event.name, event.params);
  }

  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", event.name, event.params);
  }
}

export function trackPageView(url: string) {
  if (typeof window === "undefined") return;

  if (typeof window.gtag === "function") {
    const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;
    if (ga4Id) {
      window.gtag("config", ga4Id, {
        page_path: url,
      });
    }
  }

  if (typeof window.fbq === "function") {
    window.fbq("track", "PageView");
  }
}
