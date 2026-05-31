# 🏗️ Plan de Implementación Frontend — Bytex (Soberanía Energética)
## Rol: Arquitecto de Software Senior | Frontend Lead
## Stack: Angular 17+ Standalone + NgRx + TailwindCSS + Gemini

---

## 📋 CONTEXTO DEL PROYECTO
Simulador de Soberanía Energética — PWA que permite a empresas de Santa Cruz, Bolivia comparar el costo de mantenerse conectados a CRE vs instalar una microred solar. Frontend Angular + NgRx + TailwindCSS.

### Stack Tecnológico
| Capa | Tecnología |
|------|-----------|
| Framework | Angular 17+ (standalone, signals, new control flow) |
| Lenguaje | TypeScript 5.4+ (strict mode) |
| State Management | NgRx Store 17+, Effects, Entity, Router Store |
| Reactividad | Angular Signals + RxJS |
| UI Framework | TailwindCSS 3.4+ |
| Componentes | Angular Material 17+ (selectivo) |
| Íconos | Lucide Angular |
| Formularios | Reactive Forms + Zod validators |
| Gráficos | Chart.js / ng2-charts |
| Testing | Jest + Angular Testing Library |
| E2E | Playwright |
| PWA | @angular/pwa |

---

## 📁 ESTRUCTURA DE CARPETAS

```
frontend/
├── src/
│   ├── app/
│   │   ├── core/                              # Singleton services, interceptors, guards
│   │   │   ├── guards/
│   │   │   │   ├── auth.guard.ts
│   │   │   │   └── simulation-owner.guard.ts
│   │   │   ├── interceptors/
│   │   │   │   ├── auth.interceptor.ts
│   │   │   │   ├── error.interceptor.ts
│   │   │   │   ├── loading.interceptor.ts
│   │   │   │   └── correlation-id.interceptor.ts
│   │   │   ├── services/
│   │   │   │   ├── auth.service.ts             # Firebase Auth wrapper
│   │   │   │   ├── api.service.ts              # HttpClient centralizado
│   │   │   │   ├── notification.service.ts     # Toast/snackbar system
│   │   │   │   ├── logger.service.ts
│   │   │   │   └── loading.service.ts          # Spinner global
│   │   │   ├── models/
│   │   │   │   ├── api-response.model.ts
│   │   │   │   ├── user.model.ts
│   │   │   │   └── app-error.model.ts
│   │   │   ├── constants/
│   │   │   │   ├── app-routes.ts
│   │   │   │   ├── storage-keys.ts
│   │   │   │   └── business-sectors.data.ts
│   │   │   └── core.config.ts                 # provideCore()
│   │   │
│   │   ├── shared/                             # Dumb components reutilizables
│   │   │   ├── components/
│   │   │   │   ├── ui/                         # Atómicos
│   │   │   │   │   ├── button/
│   │   │   │   │   ├── input/
│   │   │   │   │   ├── card/
│   │   │   │   │   ├── modal/
│   │   │   │   │   ├── toast/
│   │   │   │   │   ├── spinner/
│   │   │   │   │   ├── empty-state/
│   │   │   │   │   ├── file-uploader/          # ⭐ Subir factura (dropzone + cámara)
│   │   │   │   │   └── progress-steps/         # ⭐ Pasos del simulador
│   │   │   │   ├── layout/                     # Estructurales
│   │   │   │   │   ├── shell/
│   │   │   │   │   ├── header/
│   │   │   │   │   ├── footer/
│   │   │   │   │   └── mobile-nav/
│   │   │   │   └── data-display/              # Datos
│   │   │   │       ├── comparison-table/       # ⭐ CRE vs Solar lado a lado
│   │   │   │       ├── financial-chart/        # ⭐ Gráfico payback 25 años
│   │   │   │       ├── panel-selector-card/    # ⭐ Selector de paneles
│   │   │   │       ├── tech-badge/             # Tecnología label (ABC, TOPCon, etc)
│   │   │   │       └── stat-card/              # Tarjeta de métrica
│   │   │   ├── directives/
│   │   │   │   ├── click-outside.directive.ts
│   │   │   │   └── format-number.directive.ts
│   │   │   ├── pipes/
│   │   │   │   ├── currency-bs.pipe.ts         # Bs formato boliviano
│   │   │   │   ├── currency-usd.pipe.ts
│   │   │   │   ├── number-format.pipe.ts
│   │   │   │   └── percentage.pipe.ts
│   │   │   └── shared.config.ts
│   │   │
│   │   ├── features/                           # Cada feature = dominio autocontenido
│   │   │   ├── landing/                        # 🏠 Landing page (sin lazy load)
│   │   │   │   ├── pages/
│   │   │   │   │   └── landing.page.ts         # Hero + CTA + Cómo funciona
│   │   │   │   ├── components/
│   │   │   │   │   ├── hero-section/
│   │   │   │   │   ├── how-it-works/
│   │   │   │   │   ├── sectors-grid/
│   │   │   │   │   ├── success-story/
│   │   │   │   │   └── cta-section/
│   │   │   │   └── landing.routes.ts
│   │   │   │
│   │   │   ├── simulator/                      # ⭐⭐ FLUJO PRINCIPAL (5 pasos)
│   │   │   │   ├── data-access/
│   │   │   │   │   ├── store/
│   │   │   │   │   │   ├── simulator.actions.ts
│   │   │   │   │   │   ├── simulator.effects.ts
│   │   │   │   │   │   ├── simulator.reducer.ts
│   │   │   │   │   │   └── simulator.selectors.ts
│   │   │   │   │   ├── services/
│   │   │   │   │   │   ├── simulator-api.service.ts
│   │   │   │   │   │   └── simulator-facade.ts  # Interfaz pública
│   │   │   │   │   └── models/
│   │   │   │   │       ├── simulation.model.ts
│   │   │   │   │       ├── bill-data.model.ts
│   │   │   │   │       ├── microgrid-result.model.ts
│   │   │   │   │       ├── panel-option.model.ts
│   │   │   │   │       └── simulation-state.model.ts
│   │   │   │   ├── pages/
│   │   │   │   │   ├── select-type.page.ts         # Paso 1: Existente vs Nuevo
│   │   │   │   │   ├── upload-bill.page.ts          # Paso 2A: Subir factura
│   │   │   │   │   ├── select-sector.page.ts        # Paso 2B: Rubro + Zona
│   │   │   │   │   ├── processing.page.ts           # Paso 3: Carga con IA
│   │   │   │   │   ├── results.page.ts              # Paso 4: Comparativa CRE vs Solar
│   │   │   │   │   └── detail.page.ts               # Paso 5: Desglose técnico
│   │   │   │   ├── components/
│   │   │   │   │   ├── bill-uploader/               # Dropzone + preview
│   │   │   │   │   ├── sector-picker/               # Grid de sectores
│   │   │   │   │   ├── zone-picker/                  # Selector de zona SCZ
│   │   │   │   │   ├── processing-status/           # ✅ Pasos en vivo
│   │   │   │   │   ├── comparison-side-by-side/     # CRE vs Solar
│   │   │   │   │   ├── cost-breakdown/              # Desglose de costos
│   │   │   │   │   ├── financial-timeline/          # Gráfico interactivo
│   │   │   │   │   ├── environmental-impact/        # CO2, árboles
│   │   │   │   │   ├── panel-recommendation/        # Panel sugerido
│   │   │   │   │   └── export-actions/               # Guardar, PDF, compartir
│   │   │   │   └── simulator.routes.ts
│   │   │   │
│   │   │   ├── dashboard/                          # 📊 Mis simulaciones
│   │   │   │   ├── data-access/
│   │   │   │   │   ├── store/
│   │   │   │   │   │   ├── dashboard.actions.ts
│   │   │   │   │   │   ├── dashboard.effects.ts
│   │   │   │   │   │   ├── dashboard.reducer.ts
│   │   │   │   │   │   └── dashboard.selectors.ts
│   │   │   │   │   ├── services/
│   │   │   │   │   │   └── dashboard-facade.ts
│   │   │   │   │   └── models/
│   │   │   │   │       └── simulation-summary.model.ts
│   │   │   │   ├── pages/
│   │   │   │   │   ├── simulation-list.page.ts
│   │   │   │   │   └── simulation-detail.page.ts
│   │   │   │   ├── components/
│   │   │   │   │   ├── simulation-card/
│   │   │   │   │   └── simulation-filter/
│   │   │   │   └── dashboard.routes.ts
│   │   │   │
│   │   │   ├── learn/                             # 📖 Centro de aprendizaje
│   │   │   │   ├── pages/
│   │   │   │   │   ├── learn-home.page.ts
│   │   │   │   │   ├── panel-guide.page.ts         # Guía de paneles
│   │   │   │   │   ├── regulation.page.ts          # Marco regulatorio
│   │   │   │   │   ├── financing.page.ts           # Leasing, PPA
│   │   │   │   │   ├── irradiation-map.page.ts     # Mapa solar SCZ
│   │   │   │   │   └── success-cases.page.ts       # Casos de éxito
│   │   │   │   ├── components/
│   │   │   │   │   ├── article-card/
│   │   │   │   │   ├── tech-comparison-table/
│   │   │   │   │   └── faq-accordion/
│   │   │   │   └── learn.routes.ts
│   │   │   │
│   │   │   └── auth/                              # 🔐 Autenticación
│   │   │       ├── data-access/
│   │   │       │   ├── store/
│   │   │       │   │   ├── auth.actions.ts
│   │   │       │   │   ├── auth.effects.ts
│   │   │       │   │   ├── auth.reducer.ts
│   │   │       │   │   └── auth.selectors.ts
│   │   │       │   └── services/
│   │   │       │       └── auth-facade.ts
│   │   │       ├── pages/
│   │   │       │   └── login.page.ts
│   │   │       └── auth.routes.ts
│   │   │
│   │   ├── shell/                                 # Layout principal
│   │   │   ├── shell.component.ts
│   │   │   ├── shell.routes.ts
│   │   │   └── components/
│   │   │       ├── top-nav/
│   │   │       ├── bottom-nav/
│   │   │       └── mobile-menu/
│   │   │
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   │
│   ├── environments/
│   │   ├── environment.ts
│   │   └── environment.prod.ts
│   ├── styles/
│   │   ├── tailwind.css
│   │   ├── theme.css
│   │   └── utilities.css
│   ├── assets/
│   │   ├── images/
│   │   │   ├── logo.svg
│   │   │   ├── hero-solar.svg
│   │   │   └── sectors/                    # Iconos por rubro
│   │   └── icons/
│   ├── index.html
│   └── main.ts
│
├── angular.json
├── tailwind.config.js
├── tsconfig.json
├── jest.config.js
├── playwright.config.ts
└── package.json
```

---

## 🧠 NGÓRX: ESTADO GLOBAL

### Estructura del Store

```typescript
// Estado global de la aplicación
interface AppState {
  // Auth
  auth: AuthState;
  
  // Simulador (flujo principal)
  simulator: SimulatorState;
  
  // Dashboard
  dashboard: DashboardState;
  
  // Router
  router: RouterReducerState;
}

// --- Auth State ---
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// --- Simulator State (⭐⭐ Corazón del producto) ---
interface SimulatorState {
  // Paso actual del flujo (1-5)
  currentStep: number;
  
  // Tipo de simulación
  simulationType: 'existing' | 'new' | null;
  
  // Datos de la factura (extraídos por Gemini)
  billData: {
    imageBase64: string | null;
    extracted: ExtractedBillData | null;
    extracting: boolean;
    extractionError: string | null;
  };
  
  // Selección de rubro/zona (para nuevo emprendedor)
  sectorSelection: {
    sector: BusinessSector | null;
    zone: SantaCruzZone | null;
    estimatedConsumption: number | null;
  };
  
  // Datos de irradiación (NASA POWER)
  solarData: {
    irradiance: number | null;      // kWh/m²/día
    location: Coordinate | null;
    loading: boolean;
    error: string | null;
  };
  
  // Cálculo de microred
  calculation: {
    sizing: MicrogridSizing | null;
    financial: FinancialResult | null;
    environmental: EnvironmentalImpact | null;
    loading: boolean;
    error: string | null;
  };
  
  // Panel seleccionado (por defecto: Jinko Tiger NEO III 670W)
  selectedPanel: PanelOption;
  
  // Resultado final
  result: SimulationResult | null;
  saving: boolean; // Guardando en Firestore
  saved: boolean;
}

// --- Dashboard State ---
interface DashboardState {
  simulations: SimulationSummary[];
  selectedSimulationId: string | null;
  loading: boolean;
  error: string | null;
  filters: {
    sector: string | null;
    dateRange: [Date, Date] | null;
    minPayback: number | null;
  };
  pagination: {
    cursor: string | null;
    hasMore: boolean;
    pageSize: number;
  };
}
```

### Simulator Actions (Flujo Completo)

```typescript
// features/simulator/data-access/store/simulator.actions.ts
export const SimulatorActions = createActionGroup({
  source: 'Simulator',
  events: {
    // Paso 1: Tipo de usuario
    'Set Simulation Type': props<{ type: 'existing' | 'new' }>(),
    
    // Paso 2A: Subir factura
    'Upload Bill': props<{ file: File }>(),
    'Upload Bill Success': props<{ imageBase64: string }>(),
    'Upload Bill Failure': props<{ error: string }>(),
    
    // Extracción con Gemini
    'Extract Bill': props<{ imageBase64: string }>(),
    'Extract Bill Success': props<{ data: ExtractedBillData }>(),
    'Extract Bill Failure': props<{ error: string }>(),
    
    // Paso 2B: Seleccionar rubro + zona
    'Select Sector': props<{ sector: BusinessSector }>(),
    'Select Zone': props<{ zone: SantaCruzZone }>(),
    'Estimate Consumption': props<{ sector: BusinessSector; zone: SantaCruzZone }>(),
    'Estimate Consumption Success': props<{ consumptionKwh: number }>(),
    
    // Paso 3: Obtener datos solares (NASA)
    'Get Solar Data': props<{ lat: number; lng: number }>(),
    'Get Solar Data Success': props<{ irradiance: number }>(),
    'Get Solar Data Failure': props<{ error: string }>(),
    
    // Seleccionar panel
    'Select Panel': props<{ panel: PanelOption }>(),
    'Load Panel Catalog': emptyProps(),
    'Load Panel Catalog Success': props<{ panels: PanelOption[] }>(),
    
    // Calcular microred
    'Calculate Microgrid': emptyProps(),
    'Calculate Microgrid Success': props<{ result: SimulationResult }>(),
    'Calculate Microgrid Failure': props<{ error: string }>(),
    
    // Guardar simulación
    'Save Simulation': emptyProps(),
    'Save Simulation Success': props<{ simulationId: string }>(),
    'Save Simulation Failure': props<{ error: string }>(),
    
    // Navegación entre pasos
    'Next Step': emptyProps(),
    'Previous Step': emptyProps(),
    'Go To Step': props<{ step: number }>(),
    
    // Reset
    'Reset Simulation': emptyProps(),
  }
});
```

### Simulator Effects (⭐ Lógica Reactiva)

```typescript
// features/simulator/data-access/store/simulator.effects.ts
export class SimulatorEffects {
  // ⭐ Effect: Extraer factura con Gemini
  extractBill$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SimulatorActions.extractBill),
      exhaustMap(({ imageBase64 }) =>
        this.simulatorApi.extractBill(imageBase64).pipe(
          map(data => SimulatorActions.extractBillSuccess({ data })),
          catchError(error => of(SimulatorActions.extractBillFailure({
            error: this.getErrorMessage(error)
          })))
        )
      )
    )
  );

  // ⭐ Effect: Obtener irradiación de NASA POWER
  getSolarData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SimulatorActions.getSolarData),
      switchMap(({ lat, lng }) =>
        this.simulatorApi.getSolarData(lat, lng).pipe(
          map(irradiance => SimulatorActions.getSolarDataSuccess({ irradiance })),
          catchError(error => of(SimulatorActions.getSolarDataFailure({
            error: 'No se pudo obtener datos de irradiación'
          })))
        )
      )
    )
  );

  // ⭐ Effect: Calcular microred completa
  calculateMicrogrid$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SimulatorActions.calculateMicrogrid),
      withLatestFrom(this.store.select(selectSimulatorState)),
      switchMap(([_, state]) => {
        const payload = this.buildCalculationPayload(state);
        return this.simulatorApi.calculateMicrogrid(payload).pipe(
          map(result => SimulatorActions.calculateMicrogridSuccess({ result })),
          catchError(error => of(SimulatorActions.calculateMicrogridFailure({
            error: 'Error al calcular la microred'
          })))
        );
      })
    )
  );

  // Effect: Guardar simulación en Firestore
  saveSimulation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SimulatorActions.saveSimulation),
      withLatestFrom(
        this.store.select(selectSimulatorResult),
        this.store.select(selectUser)
      ),
      exhaustMap(([_, result, user]) =>
        this.simulatorApi.saveSimulation(result!, user!.uid).pipe(
          map(id => SimulatorActions.saveSimulationSuccess({ simulationId: id })),
          tap(() => this.notification.success('Simulación guardada correctamente')),
          catchError(error => of(SimulatorActions.saveSimulationFailure({
            error: 'Error al guardar la simulación'
          })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private simulatorApi: SimulatorApiService,
    private notification: NotificationService
  ) {}
}
```

---

## 🎨 DISEÑO VISUAL (TailwindCSS)

### Configuración de Tema

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class', // Estrategia: toggle manual
  theme: {
    extend: {
      colors: {
        // Marca
        primary: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B', // 🟠 Ambar (energía, sol)
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        secondary: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981', // 🟢 Esmeralda (ahorro, renovable)
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        surface: {
          DEFAULT: '#0F172A', // Azul profundo (dark mode)
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        accent: {
          DEFAULT: '#3B82F6', // Azul (links, botones sec)
        },
        danger: '#EF4444',  // Rojo (CRE, riesgo)
        success: '#10B981', // Verde (solar, ahorro)
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ],
};
```

### Paleta de Tecnologías (para badges)

```css
/* styles/theme.css */
.tech-perc    { @apply bg-blue-100 text-blue-800; }      /* 🟦 PERC */
.tech-topcon  { @apply bg-green-100 text-green-800; }    /* 🟩 TOPCon */
.tech-hjt     { @apply bg-yellow-100 text-yellow-800; }  /* 🟡 HJT */
.tech-abc     { @apply bg-purple-100 text-purple-800; }  /* 🟣 ABC/BC */
.tech-ibc     { @apply bg-gray-800 text-white; }         /* ⬛ IBC */
```

---

## 📄 PÁGINAS — PROTOTIPOS COMPLETOS

### Landing Page

```typescript
// features/landing/pages/landing.page.ts
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    HeroSectionComponent, 
    HowItWorksComponent, 
    SectorsGridComponent, 
    SuccessStoryComponent, 
    CtaSectionComponent,
    RouterLink
  ],
  template: `
    <!-- Hero -->
    <app-hero-section 
      (startSimulation)="onStartSimulation()"
      (uploadBill)="onUploadBill()"
      (selectSector)="onSelectSector()"
    />
    
    <!-- Cómo funciona (3 pasos) -->
    <app-how-it-works />
    
    <!-- Sectores industriales -->
    <app-sectors-grid (sectorSelected)="onSectorSelected($event)" />
    
    <!-- Caso de éxito: BFC 3MW -->
    <app-success-story />
    
    <!-- Call to action final -->
    <app-cta-section (start)="onStartSimulation()" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPage {
  private router = inject(Router);
  private facade = inject(SimulatorFacade);

  onStartSimulation(): void {
    this.router.navigate(['/simulador/tipo']);
  }

  onUploadBill(): void {
    this.facade.setSimulationType('existing');
    this.router.navigate(['/simulador/entrada']);
  }

  onSelectSector(): void {
    this.facade.setSimulationType('new');
    this.router.navigate(['/simulador/entrada']);
  }

  onSectorSelected(sector: string): void {
    this.facade.setSimulationType('new');
    this.facade.selectSector(sector as BusinessSector);
    this.router.navigate(['/simulador/entrada']);
  }
}
```

### Simulator — Results Page (⭐ La más importante)

```typescript
// features/simulator/pages/results.page.ts
@Component({
  selector: 'app-simulator-results',
  standalone: true,
  imports: [
    ComparisonSideBySideComponent,
    FinancialTimelineComponent,
    CostBreakdownComponent,
    PanelRecommendationComponent,
    EnvironmentalImpactComponent,
    ExportActionsComponent,
    ButtonComponent,
    CardComponent
  ],
  template: `
    <div class="min-h-screen bg-surface-900 text-white">
      <div class="max-w-7xl mx-auto px-4 py-8">
        
        <!-- Header: Empresa y resultado principal -->
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold mb-2">
            Resultados para tu empresa
          </h1>
          <p class="text-surface-200 text-lg">
            Basado en tu factura CRE y datos reales de Santa Cruz
          </p>
        </div>

        <!-- ⭐ Comparativa lado a lado: CRE vs Solar -->
        <app-comparison-side-by-side
          [creData]="facade.creData()"
          [solarData]="facade.solarResult()"
        />

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <!-- Inversión necesaria -->
          <app-stat-card 
            icon="💰"
            label="Inversión necesaria"
            [value]="facade.totalCapEx() | currencyUsd"
            variant="primary"
          />
          <!-- Payback -->
          <app-stat-card 
            icon="📈"
            label="Payback"
            [value]="facade.paybackYears() + ' años'"
            variant="success"
          />
          <!-- Ahorro 25 años -->
          <app-stat-card 
            icon="💵"
            label="Ahorro 25 años"
            [value]="facade.twentyFiveYearSavings() | currencyUsd"
            variant="success"
          />
        </div>

        <!-- ⭐ Gráfico interactivo: Timeline 25 años -->
        <app-card class="mt-8">
          <app-financial-timeline 
            [yearlyData]="facade.yearlyBreakdown()"
            (yearHover)="onYearHover($event)"
          />
        </app-card>

        <!-- ⭐ Desglose de costos detallado -->
        <app-card class="mt-8">
          <app-cost-breakdown [costs]="facade.costBreakdown()" />
        </app-card>

        <!-- ⭐ Panel recomendado -->
        <app-card class="mt-8">
          <app-panel-recommendation 
            [panel]="facade.selectedPanel()"
            [alternatives]="facade.alternativePanels()"
            (changePanel)="onChangePanel($event)"
          />
        </app-card>

        <!-- Impacto ambiental -->
        <app-card class="mt-8">
          <app-environmental-impact 
            [co2Avoided]="facade.co2AvoidedTons()"
            [treeEquivalent]="facade.treeEquivalent()"
          />
        </app-card>

        <!-- Acciones: Guardar, PDF, Compartir -->
        <div class="mt-8 flex justify-center gap-4">
          <app-export-actions
            (save)="onSave()"
            (pdf)="onExportPdf()"
            (share)="onShare()"
            (newSimulation)="onNewSimulation()"
          />
        </div>

      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimulatorResultsPage {
  facade = inject(SimulatorFacade);
  private notification = inject(NotificationService);

  constructor() {
    // Auto-guardar si el usuario está autenticado
    if (this.facade.isAuthenticated()) {
      this.facade.saveSimulation();
    }
  }

  onYearHover(year: number): void {
    // Tooltip con datos exactos del año
  }

  onChangePanel(panel: PanelOption): void {
    this.facade.selectPanel(panel);
    this.facade.calculateMicrogrid();
    this.notification.info('Panel actualizado. Recalculando...');
  }

  onSave(): void {
    if (!this.facade.isAuthenticated()) {
      this.notification.warning('Iniciá sesión para guardar');
      return;
    }
    this.facade.saveSimulation();
  }

  onExportPdf(): void {
    // Generar PDF con resultados
  }

  onShare(): void {
    // Copiar link único al portapapeles
  }

  onNewSimulation(): void {
    this.facade.resetSimulation();
  }
}
```

---

## 📦 PLAN DE IMPLEMENTACIÓN (0% → 100%)

### FASE 0: Fundamentos (0% - 10%)
| # | Tarea | Archivos | Estimación |
|---|---|---|---|
| 1 | Inicializar proyecto Angular 17+ standalone | `ng new`, `angular.json` | 1h |
| 2 | Configurar TypeScript strict | `tsconfig.json` | 0.5h |
| 3 | Configurar ESLint + Prettier | `.eslintrc.js`, `.prettierrc` | 0.5h |
| 4 | Instalar y configurar TailwindCSS | `tailwind.config.js`, `postcss.config.js` | 1h |
| 5 | Configurar tema: colores, tipografía, animaciones | `styles/theme.css` | 1h |
| 6 | Instalar NgRx + Store DevTools | `app.config.ts` | 0.5h |
| 7 | Instalar Angular Material (solo lo necesario) | `app.config.ts` | 0.5h |
| 8 | Instalar Chart.js / ng2-charts | `package.json` | 0.5h |
| 9 | Configurar PWA (service worker, manifest) | `ng add @angular/pwa` | 1h |
| 10 | Crear estructura de carpetas completa | `app/core/`, `shared/`, `features/`, `shell/` | 0.5h |
| **Subtotal** | | | **7h** |

### FASE 1: Core & UI Base (10% - 25%)
| # | Tarea | Archivos | Estimación |
|---|---|---|---|
| 11 | **ApiService** — HttpClient wrapper tipado | `core/services/api.service.ts` | **2h** |
| 12 | AuthInterceptor | `core/interceptors/auth.interceptor.ts` | 1h |
| 13 | ErrorInterceptor | `core/interceptors/error.interceptor.ts` | 1.5h |
| 14 | LoadingInterceptor + LoadingService | `core/interceptors/loading.interceptor.ts` + `core/services/loading.service.ts` | 1h |
| 15 | CorrelationIdInterceptor | `core/interceptors/correlation-id.interceptor.ts` | 0.5h |
| 16 | **NotificationService** (sistema de toasts) | `core/services/notification.service.ts` | **2h** |
| 17 | LoggerService | `core/services/logger.service.ts` | 0.5h |
| 18 | Componentes UI atómicos: Button, Input, Card | `shared/components/ui/*` | 3h |
| 19 | Componentes UI: Modal, Toast, Spinner, EmptyState | `shared/components/ui/*` | 3h |
| 20 | **FileUploaderComponent** (dropzone + cámara) | `shared/components/ui/file-uploader/` | **3h** |
| 21 | ProgressStepsComponent | `shared/components/ui/progress-steps/` | 1.5h |
| 22 | Layout: ShellComponent + Header + Footer | `shared/components/layout/*` | 3h |
| 23 | MobileNavComponent (bottom nav PWA) | `shared/components/layout/mobile-nav/` | 1.5h |
| 24 | Pipes: CurrencyBs, CurrencyUsd, NumberFormat | `shared/pipes/*` | 1.5h |
| 25 | Directives: ClickOutside, FormatNumber | `shared/directives/*` | 1h |
| **Subtotal** | | | **26h** |

### FASE 2: Auth Feature (25% - 33%)
| # | Tarea | Archivos | Estimación |
|---|---|---|---|
| 26 | **AuthService** — Firebase Auth (Google Sign-In) | `core/services/auth.service.ts` | **3h** |
| 27 | NgRx Auth: Actions + Reducer | `features/auth/data-access/store/auth.actions.ts`, `auth.reducer.ts` | 2h |
| 28 | NgRx Auth: Effects + Selectors | `features/auth/data-access/store/auth.effects.ts`, `auth.selectors.ts` | 2h |
| 29 | AuthFacade | `features/auth/data-access/services/auth-facade.ts` | 1h |
| 30 | LoginPage (Google Sign-In button) | `features/auth/pages/login.page.ts` | 2h |
| 31 | AuthGuard | `core/guards/auth.guard.ts` | 1h |
| **Subtotal** | | | **11h** |

### FASE 3: Simulator Feature — ⭐⭐ (33% - 60%)
| # | Tarea | Archivos | Estimación |
|---|---|---|---|
| 32 | Modelos del simulador | `features/simulator/data-access/models/*.ts` | 2h |
| 33 | **SimulatorApiService** (llamadas a backend) | `features/simulator/data-access/services/simulator-api.service.ts` | **3h** |
| 34 | **NgRx Simulator: Actions** | `features/simulator/data-access/store/simulator.actions.ts` | **2h** |
| 35 | **NgRx Simulator: Reducer** (complejo, maneja 5 pasos) | `features/simulator/data-access/store/simulator.reducer.ts` | **4h** |
| 36 | **NgRx Simulator: Effects** (Gemini + NASA + cálculo) | `features/simulator/data-access/store/simulator.effects.ts` | **4h** |
| 37 | **NgRx Simulator: Selectors** | `features/simulator/data-access/store/simulator.selectors.ts` | **2h** |
| 38 | **SimulatorFacade** | `features/simulator/data-access/services/simulator-facade.ts` | **2h** |
| 39 | SelectTypePage (Paso 1) | `features/simulator/pages/select-type.page.ts` | 2h |
| 40 | **UploadBillPage (Paso 2A)** — con FileUploader | `features/simulator/pages/upload-bill.page.ts` | **4h** |
| 41 | SectorPickerComponent + ZonePickerComponent | `features/simulator/components/` | 2h |
| 42 | SelectSectorPage (Paso 2B) | `features/simulator/pages/select-sector.page.ts` | 2h |
| 43 | **ProcessingPage (Paso 3)** — animación IA | `features/simulator/pages/processing.page.ts` | **3h** |
| 44 | ComparisonSideBySideComponent (⭐ CRE vs Solar) | `features/simulator/components/comparison-side-by-side/` | **4h** |
| 45 | **FinancialTimelineComponent** (⭐ gráfico 25 años) | `features/simulator/components/financial-timeline/` | **5h** |
| 46 | CostBreakdownComponent | `features/simulator/components/cost-breakdown/` | 2h |
| 47 | PanelRecommendationComponent | `features/simulator/components/panel-recommendation/` | 2h |
| 48 | EnvironmentalImpactComponent | `features/simulator/components/environmental-impact/` | 1.5h |
| 49 | **ResultsPage (Paso 4)** — ⭐ página principal | `features/simulator/pages/results.page.ts` | **5h** |
| 50 | DetailPage (Paso 5) | `features/simulator/pages/detail.page.ts` | 3h |
| 51 | ExportActionsComponent (guardar, PDF, compartir) | `features/simulator/components/export-actions/` | 2h |
| 52 | Simulator Routes + Config | `features/simulator/simulator.routes.ts` | 1h |
| **Subtotal** | | | **57h** |

### FASE 4: Dashboard Feature (60% - 70%)
| # | Tarea | Archivos | Estimación |
|---|---|---|---|
| 53 | NgRx Dashboard: Actions + Reducer | `features/dashboard/data-access/store/*` | 2h |
| 54 | NgRx Dashboard: Effects + Selectors | `features/dashboard/data-access/store/*` | 2h |
| 55 | DashboardFacade | `features/dashboard/data-access/services/dashboard-facade.ts` | 1h |
| 56 | SimulationListPage | `features/dashboard/pages/simulation-list.page.ts` | 3h |
| 57 | SimulationDetailPage | `features/dashboard/pages/simulation-detail.page.ts` | 2h |
| 58 | SimulationCardComponent | `features/dashboard/components/simulation-card/` | 1.5h |
| 59 | Dashboard Routes | `features/dashboard/dashboard.routes.ts` | 0.5h |
| **Subtotal** | | | **12h** |

### FASE 5: Learn Feature (70% - 77%)
| # | Tarea | Archivos | Estimación |
|---|---|---|---|
| 60 | LearnHomePage | `features/learn/pages/learn-home.page.ts` | 2h |
| 61 | PanelGuidePage (tabla de paneles completa) | `features/learn/pages/panel-guide.page.ts` | 3h |
| 62 | TechComparisonTableComponent | `features/learn/components/tech-comparison-table/` | 2h |
| 63 | RegulationPage (marco regulatorio Bolivia) | `features/learn/pages/regulation.page.ts` | 2h |
| 64 | IrradiationMapPage (mapa solar SCZ) | `features/learn/pages/irradiation-map.page.ts` | 2h |
| 65 | SuccessCasesPage | `features/learn/pages/success-cases.page.ts` | 1.5h |
| 66 | FaqAccordionComponent | `features/learn/components/faq-accordion/` | 1.5h |
| 67 | Learn Routes | `features/learn/learn.routes.ts` | 0.5h |
| **Subtotal** | | | **14.5h** |

### FASE 6: Shell & Routing (77% - 82%)
| # | Tarea | Archivos | Estimación |
|---|---|---|---|
| 68 | ShellComponent (layout principal) | `shell/shell.component.ts` | 3h |
| 69 | TopNavComponent (desktop) | `shell/components/top-nav/` | 2h |
| 70 | BottomNavComponent (mobile PWA) | `shell/components/bottom-nav/` | 1.5h |
| 71 | AppRoutes (root, lazy loading) | `app.routes.ts` | 1.5h |
| 72 | AppConfig con todos los providers | `app.config.ts` | 1h |
| **Subtotal** | | | **9h** |

### FASE 7: Testing (82% - 95%)
| # | Tarea | Archivos | Estimación |
|---|---|---|---|
| 73 | Configurar Jest + Angular Testing Library | `jest.config.js`, `setup.ts` | 1.5h |
| 74 | Tests: Auth Reducer + Selectors | `auth/*.spec.ts` | 2h |
| 75 | Tests: Auth Effects | `auth.effects.spec.ts` | 2h |
| 76 | **Tests: Simulator Reducer** (⭐ crítico) | `simulator.reducer.spec.ts` | **4h** |
| 77 | **Tests: Simulator Effects** (⭐ crítico) | `simulator.effects.spec.ts` | **3h** |
| 78 | Tests: Simulator Selectors | `simulator.selectors.spec.ts` | 1.5h |
| 79 | Tests: SimulatorFacade | `simulator-facade.spec.ts` | 1.5h |
| 80 | Tests: Dashboard Reducer + Effects | `dashboard/*.spec.ts` | 2h |
| 81 | Tests: Componentes UI (Button, Card, Modal, FileUploader) | `shared/components/ui/*.spec.ts` | 3h |
| 82 | Tests: Páginas (smart components) | `features/simulator/pages/*.spec.ts` | 3h |
| 83 | Tests: Guards + Interceptors | `core/guards/*.spec.ts`, `core/interceptors/*.spec.ts` | 2h |
| 84 | E2E Playwright: flujo completo | `e2e/simulator.spec.ts` | 4h |
| 85 | CI/CD: GitHub Actions (lint → test → build → e2e → deploy) | `.github/workflows/frontend-ci.yml` | 2h |
| **Subtotal** | | | **31.5h** |

### FASE 8: Optimización & Producción (95% - 100%)
| # | Tarea | Archivos | Estimación |
|---|---|---|---|
| 86 | Auditar bundle + optimizar imports Material | `angular.json` budgets | 1.5h |
| 87 | Implementar defer blocks en contenido crítico | Templates | 2h |
| 88 | Revisar accesibilidad (a11y) | Componentes | 2h |
| 89 | Revisar responsive (mobile, tablet, desktop) | Templates | 2h |
| 90 | Configurar Sentry / error tracking | `core/services/logger.service.ts` | 1h |
| 91 | Finalizar PWA: splash screen, icons, theme-color | `manifest.json`, `index.html` | 1h |
| 92 | Documentación técnica (README, ADRs) | `docs/` | 2h |
| 93 | Publicar en Firebase Hosting | `firebase deploy --only hosting` | 0.5h |
| **Subtotal** | | | **12h** |

---

## 📊 RESUMEN DE ESFUERZO

| Fase | Horas | % |
|---|---|---|
| FASE 0: Fundamentos | 7h | 4% |
| FASE 1: Core & UI Base | 26h | 15% |
| FASE 2: Auth Feature | 11h | 6% |
| FASE 3: Simulator Feature ⭐⭐ | 57h | 33% |
| FASE 4: Dashboard Feature | 12h | 7% |
| FASE 5: Learn Feature | 14.5h | 8% |
| FASE 6: Shell & Routing | 9h | 5% |
| FASE 7: Testing | 31.5h | 18% |
| FASE 8: Optimización & Producción | 12h | 7% |
| **TOTAL** | **180h** | **100%** |

---

## 🏆 ARCHIVOS CRÍTICOS (Prioridad Alta)

| Prioridad | Archivo | Por qué |
|---|---|---|
| 🔴 #1 | `features/simulator/data-access/store/simulator.reducer.ts` | Corazón del estado del simulador |
| 🔴 #2 | `features/simulator/data-access/store/simulator.effects.ts` | Orquestación Gemini + NASA + cálculo |
| 🔴 #3 | `features/simulator/pages/results.page.ts` | Lo que ve el decisor empresario |
| 🔴 #4 | `features/simulator/components/comparison-side-by-side/` | ⭐ Diferenciador del producto |
| 🔴 #5 | `features/simulator/components/financial-timeline/` | Gráfico payback 25 años |
| 🔴 #6 | `shared/components/ui/file-uploader/` | Subir factura (foto/PDF) |
| 🔴 #7 | `core/services/api.service.ts` | Comunicación con backend |

---

## 🔄 FLUJO COMPLETO (Frontend + Backend)

```
FRONTEND (Angular)                           BACKEND (Firebase)
══════════════════                           ═══════════════════

1. Landing Page                                    
   │                                              
   ├─ [Subir factura]                              
   │                                              
2. UploadBillPage                                  
   ├─ FileUpload → base64                          
   │                                              
3. ProcessingPage              ──POST──►   extractBill()
   │ ⏳ "Extrayendo datos..."        │     └─ Gemini Vision OCR
   │ ◄── { billData } ──────────────┘     └─ Devuelve kWh, kW, $
   │                                              
   │                             ──POST──►   getSolarData()
   │ ⏳ "Obteniendo irradiación"      │     └─ NASA POWER API
   │ ◄── { irradiance } ──────────────┘     └─ 4.8 kWh/m²/día
   │                                              
   │                             ──POST──►   calculateMicrogrid()
   │ ⏳ "Calculando microred"         │     ├─ MicrogridSizerService
   │                                 │     ├─ FinancialCalculatorService
   │                                 │     └─ PanelSelectorService
   │ ◄── { fullResult } ─────────────┘     
   │                                              
4. ResultsPage                                    
   ├─ Comparativa CRE vs Solar                    
   ├─ Gráfico payback 25 años                     
   ├─ Desglose de costos                          
   ├─ Panel recomendado                           
   └─ Impacto ambiental                           
      │                                           
      └─ [Guardar] ──POST──►   createSimulation()
                        └─ Firestore save
```

---

## ✅ CHECKLIST DE ENTREGA

- [ ] `ng serve` funciona con Firebase Emulator
- [ ] `ng build --prod` sin errores, budgets OK
- [ ] PWA installable en Chrome mobile
- [ ] Auth Google Sign-In funcional
- [ ] Flujo completo: landing → simulación → resultado → guardar
- [ ] Gemini extrae datos de factura real
- [ ] Gráfico financiero muestra datos correctos
- [ ] Dashboard carga simulaciones guardadas
- [ ] Centro de aprendizaje navegable
- [ ] Tests unitarios pasan (>80% coverage)
- [ ] E2E: flujo crítico funciona
- [ ] Responsive: mobile + tablet + desktop
- [ ] CI/CD pipeline verde
- [ ] README con instrucciones de setup
