const DOLAR_API_URL = 'https://bo.dolarapi.com/v1/dolares/binance';
const FALLBACK_RATE = 6.96;
const CACHE_TTL_MS = 3600_000; // 1 hour

interface DolarApiResponse {
  compra: number;
  venta: number;
  casa: string;
  nombre: string;
  moneda: string;
  fechaActualizacion: string;
}

interface CachedRate {
  rate: number;
  timestamp: number;
}

let cached: CachedRate | null = null;

/**
 * Obtiene el tipo de cambio USD → Bs desde dolarapi.com (dólar binance).
 * Cachea por 1 hora. Si falla, usa fallback 6.96.
 */
export async function getExchangeRate(): Promise<{ rate: number; source: string; updatedAt: string | null }> {
  // Servir de cache si aún es válido
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return { rate: cached.rate, source: 'dolarapi (cache)', updatedAt: new Date(cached.timestamp).toISOString() };
  }

  try {
    const res = await fetch(DOLAR_API_URL, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data: DolarApiResponse = await res.json();
    const rate = data.venta; // Usamos la tasa de venta (la que paga el comprador)

    if (typeof rate !== 'number' || rate <= 0) {
      throw new Error(`Tasa inválida: ${rate}`);
    }

    cached = { rate, timestamp: Date.now() };
    console.log(`✅ Tipo de cambio actualizado: ${rate} Bs/USD (fuente: ${data.nombre}, ${data.fechaActualizacion})`);
    return { rate, source: 'dolarapi', updatedAt: data.fechaActualizacion };
  } catch (err: any) {
    console.error(`⚠️ Error al obtener tipo de cambio: ${err.message}. Usando fallback ${FALLBACK_RATE}`);
    return { rate: FALLBACK_RATE, source: 'fallback', updatedAt: null };
  }
}

/** Obtiene la tasa en caché (sin llamada HTTP) */
export function getCachedRate(): number {
  return cached?.rate ?? FALLBACK_RATE;
}
