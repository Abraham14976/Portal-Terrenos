import { siteConfig } from "@/config/site";

export function buildWhatsAppLink(
  customMessage?: string,
  utmParams?: {
    source?: string;
    medium?: string;
    campaign?: string;
    content?: string;
  }
): string {
  const number = siteConfig.whatsappNumber.replace(/\D/g, "");
  const message = customMessage || siteConfig.whatsappDefaultMessage;
  const encodedMessage = encodeURIComponent(message);

  let url = `https://wa.me/${number}?text=${encodedMessage}`;

  if (utmParams) {
    const params = new URLSearchParams();
    if (utmParams.source) params.set("utm_source", utmParams.source);
    if (utmParams.medium) params.set("utm_medium", utmParams.medium);
    if (utmParams.campaign) params.set("utm_campaign", utmParams.campaign);
    if (utmParams.content) params.set("utm_content", utmParams.content);
    const utmString = params.toString();
    if (utmString) url += `&${utmString}`;
  }

  return url;
}

export function formatCurrencySoles(amount: number): string {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatCurrencyDollars(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("es-PE").format(value);
}
