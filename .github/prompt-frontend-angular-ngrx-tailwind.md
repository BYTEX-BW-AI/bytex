# 🏗️ Prompt de Arquitectura: Frontend Angular + NgRx + TailwindCSS
## Rol: Arquitecto de Software Senior | Frontend Lead

---

## 📋 CONTEXTO DEL PROYECTO
Eres un arquitecto de software senior especializado en aplicaciones enterprise con Angular. Vas a construir un frontend completo y funcional del 0 al 100% usando **Angular 17+** (standalone components, signals, new control flow), **NgRx** para state management (store, effects, entity, router-store), **TailwindCSS** para diseño, y **Angular Material** como librería de componentes base donde sea necesario. El código debe ser producción-ready, con arquitectura feature-based, lazy loading, manejo de errores global, interceptores HTTP, guards de autenticación y testing unitario.

---

## 🧱 STACK TECNOLÓGICO
| Capa | Tecnología |
|------|-----------|
| Framework | Angular 17+ (standalone, no NgModules) |
| Lenguaje | TypeScript 5.4+ (strict mode) |
| State Management | NgRx Store 17+, Effects, Entity, Router Store, Store Devtools |
| Reactividad | Angular Signals (preferido sobre RxJS donde aplique) |
| HTTP | Angular HttpClient con interceptores |
| UI Framework | TailwindCSS 3.4+ |
| Componentes | Angular Material 17+ (selectivo, tree-shakeable) |
| Íconos | Heroicons / Lucide Angular |
| Formularios | Reactive Forms + Validators custom |
| Validación | Zod (validación cruzada cliente-servidor) |
| Testing | Jest + Angular Testing Library + jest-preset-angular |
| E2E | Playwright |
| Linting | ESLint (@angular-eslint) + Prettier |
| Build | Angular CLI + esbuild |
| i18n | $localize o @ngx-translate (según requerimiento) |

---

## 📁 ESTRUCTURA DE CARPETAS (Arquitectura Feature-Based / Screaming Architecture)

```
src/
├── app/
│   ├── core/                          # Singleton services, interceptors, guards, singletons
│   │   ├── guards/                    # AuthGuard, RoleGuard, FeatureFlagGuard
│   │   ├── interceptors/            # AuthInterceptor, ErrorInterceptor, LoadingInterceptor, RetryInterceptor
│   │   ├── services/                # Singletons: AuthService, ApiService, LoggerService, NotificationService
│   │   ├── models/                  # Interfaces/types globales (User, ApiResponse, AppError)
│   │   ├── constants/               # Constantes globales (routes, localStorage keys)
│   │   ├── config/                  # AppConfig, environment providers
│   │   └── core.config.ts           # Proveedores core (provideCore())
│   │
│   ├── shared/                        # Componentes, pipes, directives reutilizables (dumb components)
│   │   ├── components/
│   │   │   ├── ui/                  # Atómicos: Button, Input, Card, Modal, Toast, Spinner, EmptyState
│   │   │   ├── layout/              # Shell: Header, Sidebar, Footer, Breadcrumbs
│   │   │   └── data-display/        # Table, List, Grid, Chart wrappers
│   │   ├── directives/              # ClickOutside, Autofocus, Permission, Tooltip
│   │   ├── pipes/                   # DateFormat, Currency, SafeHtml, Truncate
│   │   ├── utils/                   # Funciones puras reutilizables
│   │   └── shared.config.ts         # Proveedores shared
│   │
│   ├── features/                      # Cada feature es un dominio de negocio autocontenido
│   │   ├── auth/
│   │   │   ├── data-access/         # Store, effects, selectors, services específicos de auth
│   │   │   │   ├── auth.actions.ts
│   │   │   │   ├── auth.effects.ts
│   │   │   │   ├── auth.reducer.ts
│   │   │   │   ├── auth.selectors.ts
│   │   │   │   ├── auth.facade.ts   # Facade pattern: única interfaz pública del feature
│   │   │   │   └── auth.service.ts  # HTTP calls específicas
│   │   │   ├── pages/               # Smart components (rutas)
│   │   │   │   ├── login/
│   │   │   │   ├── register/
│   │   │   │   └── forgot-password/
│   │   │   ├── components/          # Componentes específicos del feature
│   │   │   ├── models/              # Interfaces del feature (LoginRequest, RegisterRequest)
│   │   │   ├── auth.routes.ts       # Lazy-loaded routes
│   │   │   └── auth.config.ts       # Proveedores del feature
│   │   │
│   │   ├── dashboard/
│   │   │   ├── data-access/
│   │   │   ├── pages/
│   │   │   ├── components/
│   │   │   ├── models/
│   │   │   ├── dashboard.routes.ts
│   │   │   └── dashboard.config.ts
│   │   │
│   │   ├── users/                     # CRUD completo como ejemplo
│   │   │   ├── data-access/
│   │   │   │   ├── users.actions.ts
│   │   │   │   ├── users.effects.ts
│   │   │   │   ├── users.reducer.ts
│   │   │   │   ├── users.selectors.ts
│   │   │   │   ├── users.facade.ts
│   │   │   │   └── users.service.ts
│   │   │   ├── pages/
│   │   │   │   ├── user-list/
│   │   │   │   ├── user-detail/
│   │   │   │   └── user-create/
│   │   │   ├── components/
│   │   │   │   ├── user-card/
│   │   │   │   ├── user-form/
│   │   │   │   └── user-filter/
│   │   │   ├── models/
│   │   │   │   ├── user.model.ts
│   │   │   │   ├── user-dto.model.ts
│   │   │   │   └── user-filter.model.ts
│   │   │   ├── users.routes.ts
│   │   │   └── users.config.ts
│   │   │
│   │   └── [feature]/               # Patrón repetible para cada nuevo dominio
│   │
│   ├── shell/                         # Layout principal y routing de nivel app
│   │   ├── shell.component.ts         # Layout con sidebar + header + router-outlet
│   │   └── shell.routes.ts            # Carga lazy de todas las features
│   │
│   ├── app.component.ts               # Root component (standalone)
│   ├── app.config.ts                  # AppConfig con providers globales
│   └── app.routes.ts                  # Root routing con guards
│
├── environments/                      # environment.ts, environment.prod.ts
├── styles/
│   ├── tailwind.css                 # @tailwind directives + custom base
│   ├── theme.css                    # Variables CSS: colores, spacing, tipografía
│   └── utilities.css                # Clases utilitarias custom
├── assets/
│   ├── i18n/                        # Archivos de traducción JSON
│   ├── images/
│   └── icons/
└── index.html
```

---

## 🎯 REGLAS DE IMPLEMENTACIÓN (OBLIGATORIAS)

### 1. Angular Standalone (NO NgModules)
- Todos los componentes, pipes, directives y guards deben ser `standalone: true`.
- Usa `import` en lugar de `declarations`/`exports`.
- Configuración de la app vía `app.config.ts` con `provideRouter`, `provideStore`, `provideEffects`, etc.

### 2. Signals First
- Usa **signals** (`signal()`, `computed()`, `effect()`) para estado local de componentes.
- Usa **RxJS** solo para: HTTP calls, eventos del DOM complejos, streams de tiempo real.
- Conecta NgRx con signals vía `toSignal()` donde sea apropiado.
- Nunca uses `ChangeDetectorRef.detectChanges()` manualmente.

### 3. NgRx Estricto
- **Actions**: usa `createActionGroup` con event-based naming (`[Auth] Login Success`).
- **Reducers**: usa `createReducer` + `on`. Maneja siempre `loading`, `error`, `success`.
- **Effects**: usa `createEffect` con `dispatch: false` para efectos secundarios sin acción.
- **Selectors**: usa `createFeatureSelector` + `createSelector`. Memoización obligatoria.
- **Entity**: usa `@ngrx/entity` para colecciones (users, orders, products) con `adapter`.
- **Router Store**: conecta `@ngrx/router-store` para navegación reactiva.
- **DevTools**: configura Store Devtools solo en development.

### 4. Facade Pattern
- Cada feature expone UNA sola clase `*Facade` como interfaz pública.
- Los componentes NUNCA acceden directamente al Store ni a los Services del feature.
- El Facade expone: `selectors$` (observables o signals), `dispatchers` (métodos que disparan acciones).
- Esto desacopla la UI del state management y facilita testing.

### 5. Smart vs Dumb Components
- **Smart Components** (pages): conocen el Facade, manejan lógica de negocio, no reutilizables.
- **Dumb Components** (ui): reciben `@Input()` signals, emiten `@Output()` eventos, puros y reutilizables.
- Nunca hagas llamadas HTTP desde dumb components.

### 6. TailwindCSS + Diseño
- Usa **Tailwind utility classes** directamente en templates. NO crees CSS custom innecesario.
- Configura `tailwind.config.js` con:
  - Colores de marca en `theme.extend.colors`
  - Fuentes custom
  - Breakpoints estándar
  - Plugins: `@tailwindcss/forms`, `@tailwindcss/typography`
- Usa `container queries` donde sea apropiado.
- Dark mode vía `class` strategy con toggle en settings.
- Responsive design mobile-first obligatorio.

### 7. Formularios Reactivos
- Siempre usa `FormBuilder` + `FormGroup`/`FormArray`.
- Validación síncrona y asíncrona custom.
- Mapea errores de Zod del backend a mensajes de UI amigables.
- Componente `FormErrorComponent` reutilizable para mostrar errores de campo.

### 8. HTTP & API
- **ApiService** centralizado que envuelve `HttpClient` con:
  - Base URL configurable por environment.
  - Manejo automático de `correlationId` (header `x-correlation-id`).
  - Tipado estricto de requests/responses.
- **Interceptores**:
  - `AuthInterceptor`: añade `Authorization: Bearer <token>` a cada request.
  - `ErrorInterceptor`: captura errores HTTP, mapea a `AppError`, muestra toast, loguea.
  - `LoadingInterceptor`: activa/desactiva spinner global basado en requests pendientes.
  - `RetryInterceptor`: reintentar requests idempotentes (GET) con exponential backoff.

### 9. Manejo de Errores Global
- `ErrorHandler` custom que capture errores no atrapados y los envíe a servicio de logging.
- Toast/Notification system para feedback al usuario.
- Página `ErrorComponent` para errores de routing (404).
- Página `GlobalErrorComponent` para errores críticos de la app.

### 10. Autenticación & Autorización
- `AuthService` integrado con **Firebase Authentication** (o backend JWT).
- `AuthGuard`: redirige a login si no hay token válido.
- `RoleGuard`: verifica claims/roles antes de activar ruta.
- `PermissionDirective`: `*appPermission="'users:write'"` para mostrar/ocultar elementos.
- Token refresh automático antes de expirar.
- Persistencia de sesión: `localStorage` para token, `sessionStorage` para datos sensibles temporales.

### 11. Testing
- **Unit tests** con Jest + Angular Testing Library:
  - Testear lógica de componentes smart (interacción con Facade).
  - Testear reducers (puros, fáciles).
  - Testear selectors con estado mock.
  - Testear effects con `provideMockActions`.
- **E2E** con Playwright:
  - Flujo crítico: login → dashboard → CRUD → logout.
  - Tests de accesibilidad (axe-core).
- Cobertura mínima: **80%** en reducers, effects, services y facades.

### 12. Performance
- Lazy loading de TODAS las features vía `loadComponent` o `loadChildren`.
- `OnPush` change detection en dumb components.
- Virtual scrolling (`cdk-virtual-scroll`) para listas >100 items.
- `defer` blocks (Angular 17) para contenido below-the-fold.
- Preconnect y prefetch de recursos críticos en `index.html`.
- Budgets de bundle en `angular.json` (warning >500kb, error >1MB).

---

## 📦 PLAN DE IMPLEMENTACIÓN (0% → 100%)

### FASE 0: Fundamentos (0% - 10%)
1. **Inicializar proyecto** Angular 17+ standalone (`ng new --standalone --ssr=false`).
2. **Configurar TypeScript estricto** (`strict`, `noImplicitAny`, `strictNullChecks`).
3. **Configurar ESLint** (`@angular-eslint`) + Prettier con import sorting.
4. **Instalar y configurar TailwindCSS**: `tailwind.config.js`, `postcss.config.js`, `styles/tailwind.css`.
5. **Configurar tema**: variables CSS en `styles/theme.css` (colores de marca, spacing, tipografía).
6. **Instalar Angular Material** (tree-shakeable, importar solo módulos necesarios: `MatButtonModule`, `MatDialogModule`, etc.).
7. **Instalar NgRx**: `@ngrx/store`, `@ngrx/effects`, `@ngrx/entity`, `@ngrx/router-store`, `@ngrx/store-devtools`.
8. **Configurar `app.config.ts`**: proveedores de Router, Store, Effects, RouterStore, HttpClient.
9. **Crear estructura de carpetas**: `core/`, `shared/`, `features/`, `shell/`.
10. **Configurar environments** y `AppConfigService` para variables de entorno.

### FASE 1: Core & Infraestructura UI (10% - 25%)
11. **Crear `ApiService`** con métodos genéricos: `get<T>`, `post<T>`, `put<T>`, `patch<T>`, `delete<T>`.
12. **Crear interceptores**:
    - `AuthInterceptor`: lee token de `AuthService`, añade header.
    - `ErrorInterceptor`: mapea errores HTTP a `AppError`, muestra notificación.
    - `LoadingInterceptor`: gestiona estado de carga global.
    - `RetryInterceptor`: reintentos con backoff para GET/PUT/DELETE.
13. **Crear `NotificationService`**: toast/snackbar system con cola de mensajes.
14. **Crear `LoggerService`**: logging estructurado (consola en dev, remote en prod).
15. **Crear `LoadingService`**: signal global `isLoading()` para spinner.
16. **Crear componentes UI base** en `shared/components/ui/`:
    - `ButtonComponent`, `InputComponent`, `CardComponent`, `ModalComponent`, `ToastComponent`, `SpinnerComponent`, `EmptyStateComponent`.
17. **Crear componentes de layout** en `shared/components/layout/`:
    - `ShellComponent` (sidebar + header + content), `HeaderComponent`, `SidebarComponent`, `FooterComponent`, `BreadcrumbsComponent`.
18. **Crear directives** útiles: `ClickOutsideDirective`, `AutofocusDirective`, `PermissionDirective`.
19. **Crear pipes**: `DateFormatPipe`, `CurrencyPipe` (custom), `TruncatePipe`.
20. **Configurar routing shell** con lazy loading de features.

### FASE 2: Auth Feature (25% - 40%)
21. **Crear modelos**: `User`, `LoginRequest`, `RegisterRequest`, `AuthState`.
22. **Crear `AuthService`**: integración con Firebase Auth (signIn, signUp, signOut, resetPassword, getIdToken).
23. **Crear NgRx Auth**:
    - Actions: `login`, `loginSuccess`, `loginFailure`, `logout`, `authStateChanged`.
    - Reducer: maneja `user`, `loading`, `error`, `isAuthenticated`.
    - Effects: login vía Firebase, almacenar token, redirigir post-login.
    - Selectors: `selectUser`, `selectIsAuthenticated`, `selectAuthLoading`.
    - Facade: `AuthFacade` con métodos `login()`, `logout()`, `selectors`.
24. **Crear páginas Auth**:
    - `LoginPage`: formulario con email/password, validación, error handling.
    - `RegisterPage`: formulario con confirmación de password, términos.
    - `ForgotPasswordPage`: email de recuperación.
25. **Crear `AuthGuard`**: verifica `selectIsAuthenticated`, redirige a login.
26. **Crear `RoleGuard`**: verifica claims del usuario.
27. **Integrar token refresh**: interceptor o effect que renueva token antes de expirar.

### FASE 3: Dashboard & Navegación (40% - 50%)
28. **Crear `DashboardFeature`** con lazy loading.
29. **Crear widgets reutilizables**: `StatsCardComponent`, `ChartWidgetComponent`, `RecentActivityComponent`.
30. **Crear `DashboardFacade`** conectado a servicios de métricas.
31. **Implementar breadcrumbs** dinámicos basados en router state.
32. **Implementar menú de navegación** en sidebar con permisos por rol.
33. **Crear página de perfil de usuario** (lectura/actualización de datos).

### FASE 4: CRUD Feature Ejemplo: Users (50% - 70%)
34. **Crear modelos**: `User`, `UserDto`, `UserFilter`, `UserState`.
35. **Crear `UsersService`**: HTTP calls a backend (`GET /users`, `POST /users`, etc.).
36. **Crear NgRx Users con Entity**:
    - Entity adapter para gestión de colección.
    - Actions: `loadUsers`, `loadUsersSuccess`, `createUser`, `updateUser`, `deleteUser`, `setFilter`.
    - Reducer con entity adapter.
    - Effects para cada operación CRUD + notificaciones de éxito/error.
    - Selectors: `selectAllUsers`, `selectUserById`, `selectUsersLoading`, `selectUsersError`, `selectUsersFiltered`.
    - Facade: `UsersFacade`.
37. **Crear páginas**:
    - `UserListPage`: tabla con paginación, sorting, filtros, acciones (editar, eliminar).
    - `UserDetailPage`: vista de detalle con tabs.
    - `UserCreatePage`: formulario de creación con validación Zod.
38. **Crear componentes**:
    - `UserTableComponent` (dumb): recibe users, emite sort/filter/page events.
    - `UserFormComponent` (dumb): formulario reactivo, emite submit/validity.
    - `UserCardComponent` (dumb): vista tarjeta para grid.
    - `UserFilterComponent` (dumb): filtros de búsqueda.
39. **Implementar paginación** client-side o server-side según requerimiento.
40. **Implementar sorting** y filtering reactivos con signals.
41. **Implementar confirmación de eliminación** con `MatDialog`.
42. **Implementar exportación** a CSV/Excel (si aplica).

### FASE 5: Features Adicionales (70% - 85%)
43. **Replicar patrón CRUD** para cada dominio de negocio adicional (orders, products, etc.).
44. **Crear feature de notificaciones**: lista de notificaciones, badge de no leídas, marcar como leída.
45. **Crear feature de settings**: preferencias de usuario, tema oscuro/claro, idioma.
46. **Implementar búsqueda global** con debounce y sugerencias.
47. **Implementar offline support** básico: Service Worker + cache de API calls críticas.
48. **Implementar lazy loading de imágenes** con `NgOptimizedImage`.
49. **Crear página 404** y página de error global.
50. **Implementar feature flags** para desactivar funcionalidades en runtime.

### FASE 6: Testing & Calidad (85% - 95%)
51. **Tests unitarios de reducers**: todos los reducers deben tener tests (puros, 100% coverage fácil).
52. **Tests unitarios de selectors**: testear memoización y combinaciones.
53. **Tests unitarios de effects**: mockear servicios, testear flujos de acciones.
54. **Tests unitarios de facades**: verificar que métodos dispatchan acciones correctas.
55. **Tests de componentes smart**: interacción con facades vía mocks.
56. **Tests de componentes dumb**: inputs/outputs, renderizado condicional.
57. **Tests de servicios**: HTTP mocks con `HttpTestingController`.
58. **Tests de guards**: simular navegación con estados de auth.
59. **Tests de interceptores**: verificar headers y manejo de errores.
60. **E2E con Playwright**: flujo completo de login a CRUD.
61. **Configurar CI/CD** (GitHub Actions): lint → test unit → build → test e2e → deploy.

### FASE 7: Optimización & Producción (95% - 100%)
62. **Auditar bundle** con `webpack-bundle-analyzer`.
63. **Optimizar imports** de Angular Material (tree-shaking).
64. **Implementar defer blocks** en contenido no crítico.
65. **Configurar budgets de bundle** en `angular.json`.
66. **Revisar accesibilidad** (a11y): ARIA labels, focus management, color contrast.
67. **Revisar responsive**: testear en mobile, tablet, desktop.
68. **Configurar source maps** para producción (hidden source maps para debugging).
69. **Configurar Sentry** o similar para error tracking en producción.
70. **Documentación**: README con arquitectura, guía de contribución, decisiones de diseño (ADRs).
71. **Runbook**: procedimientos para deploy, rollback, troubleshooting.
72. **Final review**: auditoría de seguridad (XSS, CSRF, secrets en cliente), sign-off.

---

## 🔒 PATRONES DE DISEÑO OBLIGATORIOS

| Patrón | Uso |
|--------|-----|
| **Facade** | Interfaz única por feature hacia la UI |
| **Smart/Dumb Components** | Separación de responsabilidades |
| **Repository** (cliente) | Services que abstraen HTTP |
| **Adapter** | Mapeo entre DTOs del backend y modelos de dominio |
| **Command/Query** | Separar acciones que mutan vs lecturas en NgRx |
| **Observer** | RxJS para streams, Signals para estado local |
| **Strategy** | Múltiples algoritmos (ej: diferentes estrategias de filtrado) |

---

## 📝 EJEMPLO DE CÓDIGO BASE (Plantilla)

```typescript
// features/users/data-access/users.facade.ts
@Injectable({ providedIn: 'root' })
export class UsersFacade {
  private store = inject(Store);

  // Selectors expuestos como signals o observables
  users = toSignal(this.store.select(selectAllUsers), { initialValue: [] });
  loading = toSignal(this.store.select(selectUsersLoading), { initialValue: false });
  error = toSignal(this.store.select(selectUsersError), { initialValue: null });

  loadUsers(): void {
    this.store.dispatch(UsersActions.loadUsers());
  }

  createUser(user: CreateUserDto): void {
    this.store.dispatch(UsersActions.createUser({ user }));
  }

  updateUser(id: string, changes: UpdateUserDto): void {
    this.store.dispatch(UsersActions.updateUser({ id, changes }));
  }

  deleteUser(id: string): void {
    this.store.dispatch(UsersActions.deleteUser({ id }));
  }
}

// features/users/pages/user-list/user-list.page.ts
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, UserTableComponent, UserFilterComponent, ButtonComponent],
  template: `
    <div class="container mx-auto p-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-900">Usuarios</h1>
        <app-button variant="primary" (click)="onCreate()">
          Nuevo Usuario
        </app-button>
      </div>

      <app-user-filter 
        (filterChange)="onFilterChange($event)" 
      />

      @if (facade.loading()) {
        <app-spinner class="flex justify-center py-12" />
      } @else if (facade.error()) {
        <app-empty-state 
          type="error" 
          [message]="facade.error()" 
          (retry)="facade.loadUsers()" 
        />
      } @else {
        <app-user-table 
          [users]="facade.users()" 
          (edit)="onEdit($event)"
          (delete)="onDelete($event)"
          (sort)="onSort($event)"
        />
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListPage {
  private facade = inject(UsersFacade);
  private router = inject(Router);

  constructor() {
    this.facade.loadUsers();
  }

  onCreate(): void {
    this.router.navigate(['/users/create']);
  }

  onEdit(user: User): void {
    this.router.navigate(['/users', user.id]);
  }

  onDelete(user: User): void {
    // Abrir modal de confirmación
    this.facade.deleteUser(user.id);
  }

  onFilterChange(filter: UserFilter): void {
    // Aplicar filtros
  }
}

// shared/components/ui/button/button.component.ts
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      [type]="type()"
      [disabled]="disabled() || loading()"
      [class]="buttonClasses()"
      (click)="onClick($event)"
    >
      @if (loading()) {
        <app-spinner size="sm" />
      }
      <ng-content />
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  variant = input<'primary' | 'secondary' | 'danger' | 'ghost'>('primary');
  size = input<'sm' | 'md' | 'lg'>('md');
  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);

  clicked = output<MouseEvent>();

  buttonClasses = computed(() => {
    const base = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    const variants = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
      ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500'
    };
    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg'
    };
    return `${base} ${variants[this.variant()]} ${sizes[this.size()]}`;
  });

  onClick(event: MouseEvent): void {
    if (!this.disabled() && !this.loading()) {
      this.clicked.emit(event);
    }
  }
}
```

---

## ✅ CHECKLIST DE ENTREGA
- [ ] Proyecto compila sin errores (`ng build --configuration production`)
- [ ] Tests unitarios pasan (`ng test` o `jest`) con >80% coverage en state + services
- [ ] Tests E2E pasan (`npx playwright test`)
- [ ] Linting pasa (`ng lint`) sin warnings
- [ ] Tailwind no genera clases duplicadas innecesarias (purge funciona)
- [ ] Lazy loading funciona (verificar chunks en network tab)
- [ ] Auth funciona: login, registro, logout, token refresh, guards
- [ ] CRUD funcional con NgRx: create, read, update, delete, filtros, sorting
- [ ] Manejo de errores global: toasts, página de error, logging
- [ ] Responsive design verificado en 320px, 768px, 1024px, 1440px
- [ ] Accesibilidad: navegación por teclado, ARIA, contraste WCAG AA
- [ ] Dark mode toggle funcional
- [ ] i18n básico implementado (si aplica)
- [ ] Performance: Lighthouse score >90 en performance, accesibilidad, best practices, SEO
- [ ] CI/CD pipeline verde en GitHub Actions
- [ ] README con instrucciones de setup, arquitectura y contribución

---

> **NOTA PARA COPILOT:** Genera código completo, funcional y listo para producción. Usa siempre Angular standalone, signals donde sea posible, y NgRx con facade pattern. Nunca omitas manejo de errores, loading states ni tipado estricto. Si una tarea requiere múltiples archivos, genera todos con imports correctos. Prioriza mantenibilidad, testabilidad y performance.
