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

const TIMEZONE_COUNTRY_MAP: Record<string, string> = {
  'Asia/Jakarta': 'ID',
  'Asia/Pontianak': 'ID',
  'Asia/Makassar': 'ID',
  'Asia/Jayapura': 'ID',
  'Asia/Kuala_Lumpur': 'MY',
  'Asia/Kuching': 'MY',
  'Asia/Singapore': 'SG',
  'Asia/Riyadh': 'SA',
  'Africa/Cairo': 'EG',
  'Europe/London': 'GB',
  'Europe/Amsterdam': 'NL',
  'Europe/Berlin': 'DE',
  'Asia/Tokyo': 'JP',
  'Australia/Sydney': 'AU',
};

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

async function detectCountry(): Promise<{ code: string; name: string }> {
  try {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 2500);
    const response = await fetch('https://api.country.is/', { signal: controller.signal });
    window.clearTimeout(timer);
    if (response.ok) {
      const data = await response.json() as { country?: string };
      const code = String(data?.country || '').trim().toUpperCase();
      if (/^[A-Z]{2}$/.test(code) && code !== 'XX') {
        return { code, name: formatCountryNameId(code) };
      }
    }
  } catch {
    // Fall back to timezone/locale heuristic when offline or blocked.
  }

  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (TIMEZONE_COUNTRY_MAP[tz]) {
      const code = TIMEZONE_COUNTRY_MAP[tz];
      return { code, name: formatCountryNameId(code) };
    }
    const langRegion = (navigator.language || '').split('-')[1]?.toUpperCase() || '';
    if (/^[A-Z]{2}$/.test(langRegion)) {
      return { code: langRegion, name: formatCountryNameId(langRegion) };
    }
  } catch {
    // Ignore environment lookup errors.
  }
  return { code: 'ID', name: 'Indonesia' };
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

  const { code, name } = await detectCountry();
  const { error } = await supabase.rpc('record_turots_site_visitor', {
    p_visitor_id: visitorId,
    p_country_code: code,
    p_country_name: name,
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
