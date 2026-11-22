import { supabase } from '../lib/supabase';

export type VisitorCountryStat = {
  country_code: string;
  country_name: string;
  visitors: number;
};

export type VisitorStats = {
  total_visitors: number;
  countries: VisitorCountryStat[];
};

const VISITOR_ID_KEY = 'turots_visitor_id';
const SESSION_RECORDED_KEY = 'turots_site_visitor_recorded';

function formatCountryNameId(code: string): string {
  const upper = code.trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(upper)) return 'Indonesia';
  try {
    const display = new Intl.DisplayNames(['id'], { type: 'region' });
    return display.of(upper) || upper;
  } catch {
    return upper;
  }
}

export function getOrCreateVisitorId(): string {
  try {
    const existing = localStorage.getItem(VISITOR_ID_KEY);
    if (existing && /^[0-9a-f-]{36}$/i.test(existing)) return existing;
    const next = typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : '00000000-0000-4000-8000-' + Math.random().toString(16).slice(2, 14).padEnd(12, '0');
    localStorage.setItem(VISITOR_ID_KEY, next);
    return next;
  } catch {
    return '';
  }
}

export async function recordSiteVisitor(): Promise<void> {
  if (!supabase) return;
  try {
    if (sessionStorage.getItem(SESSION_RECORDED_KEY)) return;
  } catch {
    // Continue if sessionStorage is unavailable.
  }
  const visitorId = getOrCreateVisitorId();
  if (!visitorId) return;

  // SEC-09: Negara dideteksi murni di server dari header proxy (cf-ipcountry), tanpa parameter klien.
  const { error } = await supabase.rpc('record_turots_site_visitor', {
    p_visitor_id: visitorId,
  });
  if (!error) {
    try {
      sessionStorage.setItem(SESSION_RECORDED_KEY, '1');
    } catch {
      // Ignore storage write errors.
    }
  }
}

export async function getVisitorStats(): Promise<VisitorStats> {
  if (!supabase) return { total_visitors: 0, countries: [] };
  const { data, error } = await supabase.rpc('get_turots_visitor_stats');
  if (error || !data || typeof data !== 'object') {
    return { total_visitors: 0, countries: [] };
  }
  const raw = data as { total_visitors?: number; countries?: Array<{ country_code?: string; country_name?: string; visitors?: number }> };
  return {
    total_visitors: Number(raw.total_visitors || 0),
    countries: Array.isArray(raw.countries)
      ? raw.countries.slice(0, 4).map(item => {
          const code = String(item.country_code || 'ID').toUpperCase();
          return {
            country_code: code,
            country_name: String(item.country_name || formatCountryNameId(code)),
            visitors: Number(item.visitors || 0),
          };
        })
      : [],
  };
}

export function countryFlagUrl(code: string): string {
  const clean = code.trim().toLowerCase();
  return /^[a-z]{2}$/.test(clean) ? `https://flagcdn.com/w40/${clean}.png` : '';
}
