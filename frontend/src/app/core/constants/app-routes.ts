export const APP_ROUTES = {
  HOME: '/',
  LANDING: {
    ROOT: '/',
    SALES: '/sales',
    PROVIDERS: '/providers',
  },
  SIMULATOR: {
    ROOT: '/simulador',
    TYPE: '/simulador/tipo',
    INPUT: '/simulador/entrada',
    PROCESSING: '/simulador/procesando',
    RESULTS: '/simulador/resultados',
    DETAIL: '/simulador/detalle',
  },
  DASHBOARD: '/dashboard',
  LEARN: {
    ROOT: '/aprender',
    PANELS: '/aprender/paneles',
    REGULATION: '/aprender/regulacion',
    FINANCING: '/aprender/financiamiento',
    IRRADIATION: '/aprender/irradiacion',
    CASES: '/aprender/casos',
  },
  AUTH: {
    LOGIN: '/login',
  },
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'bytex_auth_token',
  SIMULATION_DRAFT: 'bytex_simulation_draft',
  THEME: 'bytex_theme',
} as const;
