"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  DollarSign,
  Calendar,
  TrendingDown,
  FileText,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { LOTS_DATA } from "@/data/lots";
import { formatCurrencyDollars, buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { saveLead } from "@/lib/supabase";

const MIN_PRICE = Math.min(...LOTS_DATA.map((l) => l.price_usd));
const MAX_PRICE = Math.max(...LOTS_DATA.map((l) => l.price_usd));
const DEFAULT_PRICE = Math.round((MIN_PRICE + MAX_PRICE) / 2);

const TEAPY: number = 0.012;

export function FinancialSimulator() {
  const [totalPrice, setTotalPrice] = useState<number>(DEFAULT_PRICE);
  const [initialPercent, setInitialPercent] = useState<number>(20);
  const [months, setMonths] = useState<number>(36);
  const [includeITF, setIncludeITF] = useState<boolean>(true);

  const calculations = useMemo(() => {
    const initialAmount = Math.round(totalPrice * (initialPercent / 100));
    const financed = totalPrice - initialAmount;
    const monthlyRate = TEAPY;
    const n = months;

    let monthlyFee = 0;
    if (monthlyRate === 0) {
      monthlyFee = financed / n;
    } else {
      monthlyFee =
        (financed * monthlyRate * Math.pow(1 + monthlyRate, n)) /
        (Math.pow(1 + monthlyRate, n) - 1);
    }

    const totalWithITF = includeITF ? monthlyFee * 1.00005 : monthlyFee;
    const totalPaid = initialAmount + monthlyFee * n;
    const totalInterest = totalPaid - totalPrice;
    const itfTotal = totalPaid * 0.00005;

    return {
      initialAmount: Math.round(initialAmount),
      financed: Math.round(financed),
      monthlyFee: Math.round(monthlyFee),
      monthlyFeeWithITF: Math.round(totalWithITF),
      totalPaid: Math.round(totalPaid),
      totalInterest: Math.round(totalInterest),
      itfTotal: Math.round(itfTotal),
    };
  }, [totalPrice, initialPercent, months, includeITF]);

  const trackSim = () => {
    trackEvent({
      name: "financial_simulator_use",
      params: {
        initial_amount: calculations.initialAmount,
        months,
        monthly_fee: calculations.monthlyFee,
        total_price: totalPrice,
      },
    });
  };

  const handlePreEvaluation = async () => {
    trackEvent({
      name: "pre_evaluation_request",
      params: {
        initial_amount: calculations.initialAmount,
        months,
        monthly_fee: calculations.monthlyFee,
      },
    });
    await saveLead({
      name: "",
      phone: "",
      message: `Simulación: ${formatCurrencyDollars(totalPrice)} total, inicial ${initialPercent}%, ${months} meses, cuota ${formatCurrencyDollars(calculations.monthlyFee)}`,
      source: "simulator",
      financial_plan: {
        initial_amount: calculations.initialAmount,
        months,
        monthly_fee: calculations.monthlyFee,
        total_price: totalPrice,
      },
    });
  };

  const whatsappMsg = `Hola! Quisiera una pre-evaluación con este plan:\n\n💰 Precio lote: ${formatCurrencyDollars(totalPrice)}\n🏦 Inicial (${initialPercent}%): ${formatCurrencyDollars(calculations.initialAmount)}\n📅 Plazo: ${months} meses\n💳 Cuota mensual aprox.: ${formatCurrencyDollars(calculations.monthlyFee)}`;

  const pricePct = (totalPrice - MIN_PRICE) / (MAX_PRICE - MIN_PRICE);
  const sliderBg = (val: number) => `linear-gradient(to right, #22c55e ${val}%, #e2e8f0 ${val}%)`;

  return (
    <section id="simulador" className="relative py-20 md:py-28 bg-white">
      <div className="container-app">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-heading"
          >
            <Calculator className="mr-1.5 inline h-4 w-4" />
            Simulador Financiero
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            Calcula tu <span className="gradient-text">cuota ideal</span> en segundos
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto"
          >
            Ajusta los parámetros y encuentra el plan perfecto para tu presupuesto. Sin compromiso.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-5"
        >
          <div className="lg:col-span-3 space-y-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
            <div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <DollarSign className="h-4 w-4 text-brand-600" />
                  Precio total del lote
                </label>
                <span className="rounded-full bg-brand-50 px-3 py-1 font-display text-lg font-bold text-brand-700">
                  {formatCurrencyDollars(totalPrice)}
                </span>
              </div>
              <div className="mt-4">
                <input
                  type="range"
                  min={MIN_PRICE}
                  max={MAX_PRICE}
                  step={500}
                  value={totalPrice}
                  onChange={(e) => {
                    setTotalPrice(Number(e.target.value));
                    trackSim();
                  }}
                  className="w-full"
                  style={{ background: sliderBg(pricePct * 100) }}
                />
                <div className="mt-2 flex justify-between text-xs text-slate-500">
                  <span>{formatCurrencyDollars(MIN_PRICE)}</span>
                  <span>{formatCurrencyDollars(MAX_PRICE)}</span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <TrendingDown className="h-4 w-4 text-gold-600" />
                  Inicial ({initialPercent}%)
                </label>
                <span className="rounded-full bg-gold-50 px-3 py-1 font-display text-lg font-bold text-gold-700">
                  {formatCurrencyDollars(calculations.initialAmount)}
                </span>
              </div>
              <div className="mt-4">
                <input
                  type="range"
                  min={10}
                  max={50}
                  step={5}
                  value={initialPercent}
                  onChange={(e) => {
                    setInitialPercent(Number(e.target.value));
                    trackSim();
                  }}
                  className="w-full"
                  style={{
                    background: sliderBg(
                      ((initialPercent - 10) / (50 - 10)) * 100
                    ),
                  }}
                />
                <div className="mt-2 flex justify-between text-xs text-slate-500">
                  <span>10% Mínimo</span>
                  <span>50% Máximo</span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  Plazo en meses
                </label>
                <span className="rounded-full bg-blue-50 px-3 py-1 font-display text-lg font-bold text-blue-700">
                  {months} meses
                </span>
              </div>
              <div className="mt-4">
                <input
                  type="range"
                  min={12}
                  max={72}
                  step={6}
                  value={months}
                  onChange={(e) => {
                    setMonths(Number(e.target.value));
                    trackSim();
                  }}
                  className="w-full"
                  style={{
                    background: sliderBg(((months - 12) / (72 - 12)) * 100),
                  }}
                />
                <div className="mt-2 flex justify-between text-xs text-slate-500">
                  <span>12 meses</span>
                  <span>72 meses</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
              <label className="flex cursor-pointer select-none items-center gap-3">
                <input
                  type="checkbox"
                  checked={includeITF}
                  onChange={(e) => setIncludeITF(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                />
                <span className="text-sm font-medium text-slate-700">
                  Incluir ITF (0.005%)
                </span>
              </label>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="rounded-full bg-white px-3 py-1 border border-slate-200">
                  TEA 1.2% mensual
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-brand-900 text-white shadow-2xl shadow-slate-900/20"
            >
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-500/20 blur-3xl" />
              <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-gold-500/20 blur-3xl" />

              <div className="relative p-6 md:p-8">
                <div className="flex items-center gap-2 text-brand-300">
                  <Calculator className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Tu plan financiero
                  </span>
                </div>

                <div className="mt-6">
                  <p className="text-sm text-slate-300">Cuota mensual estimada</p>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="font-display text-5xl font-extrabold">
                      {formatCurrencyDollars(calculations.monthlyFeeWithITF)}
                    </span>
                    <span className="text-sm text-slate-400">/mes</span>
                  </div>
                  {includeITF && (
                    <p className="mt-1 text-xs text-slate-400">
                      Incluye ITF. Sin ITF: {formatCurrencyDollars(calculations.monthlyFee)}
                    </p>
                  )}
                </div>

                <div className="mt-8 space-y-4 border-t border-white/10 pt-6 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Precio lote</span>
                    <span className="font-semibold">
                      {formatCurrencyDollars(totalPrice)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Inicial</span>
                    <span className="font-semibold text-brand-300">
                      - {formatCurrencyDollars(calculations.initialAmount)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Monto financiado</span>
                    <span className="font-semibold">
                      {formatCurrencyDollars(calculations.financed)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Intereses totales</span>
                    <span className="font-semibold text-gold-300">
                      + {formatCurrencyDollars(calculations.totalInterest)}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between rounded-xl bg-white/5 p-4 border border-white/10">
                    <span className="text-sm font-semibold text-white">Total a pagar</span>
                    <span className="font-display text-xl font-bold text-white">
                      {formatCurrencyDollars(calculations.totalPaid)}
                    </span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <a
                    href={buildWhatsAppLink(whatsappMsg, {
                      source: "simulator",
                      medium: "simulator_cta",
                      campaign: "pre_evaluation",
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handlePreEvaluation}
                    className="btn-whatsapp w-full !bg-white !text-slate-900 hover:!bg-slate-100"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Solicitar pre-evaluación</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <ul className="grid grid-cols-2 gap-2 pt-2 text-xs text-slate-300">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-brand-400" />
                      Sin compromiso
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-brand-400" />
                      Respuesta {"<"} 24h
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
