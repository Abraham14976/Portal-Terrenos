import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

let _client: SupabaseClient | null = null;
let _triedInit = false;

function getClient(): SupabaseClient | null {
  if (_triedInit) return _client;
  _triedInit = true;
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
      "[PortalTerrenos] Supabase no configurado. Para habilitar almacenamiento de leads configura NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local"
    );
    return null;
  }
  try {
    _client = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false },
    });
  } catch (e) {
    console.warn("[PortalTerrenos] Error inicializando Supabase:", e);
    _client = null;
  }
  return _client;
}

export const supabase = getClient() as ReturnType<typeof createClient> | null;

export type LeadStatus = "nuevo" | "contactado" | "calificado" | "perdido" | "cerrado";

export interface Lead {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  message?: string;
  lot_code?: string;
  source: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  financial_plan?: {
    initial_amount: number;
    months: number;
    monthly_fee: number;
    total_price: number;
  };
  status?: LeadStatus;
  created_at?: string;
}

export async function saveLead(lead: Lead) {
  const client = getClient();
  if (!supabaseUrl || !supabaseAnonKey || !client) {
    console.warn("Supabase no configurado - Lead no guardado:", lead);
    return { data: null, error: null, skipped: true };
  }

  const { data, error } = await client.from("leads").insert([lead]).select();

  if (error) {
    console.error("Error al guardar lead:", error);
  }

  return { data, error, skipped: false };
}
