import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, tap } from 'rxjs/operators';
import { SimulatorActions } from './simulator.actions';
import { SimulatorApiService } from '../services/simulator-api.service';
import { selectSimulatorState } from './simulator.selectors';
import { NotificationService } from '../../../../core/services/notification.service';

@Injectable()
export class SimulatorEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private api = inject(SimulatorApiService);
  private notification = inject(NotificationService);

  // Extract bill with Gemini
  extractBill$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SimulatorActions.extractBill),
      switchMap(({ base64 }) =>
        this.api.extractBill(base64).pipe(
          map(data => SimulatorActions.extractBillSuccess({ data })),
          catchError(error => of(SimulatorActions.extractBillFailure({
            error: 'No pudimos leer tu factura. Verificá que la imagen sea clara.'
          })))
        )
      )
    )
  );

  // Get solar data from NASA
  getSolarData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SimulatorActions.getSolarData),
      switchMap(({ lat, lng }) =>
        this.api.getSolarData(lat, lng).pipe(
          map(irradiance => SimulatorActions.getSolarDataSuccess({ irradiance })),
          catchError(() => of(SimulatorActions.getSolarDataFailure({
            error: 'No se pudo obtener datos de irradiación solar'
          })))
        )
      )
    )
  );

  // Calculate microgrid
  calculate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SimulatorActions.calculate),
      withLatestFrom(this.store.select(selectSimulatorState)),
      switchMap(([_, state]) =>
        this.api.calculateMicrogrid({
          simulationId: state.simulationId || '',
          monthlyConsumptionKwh: state.billData?.consumoKwh || state.estimatedConsumption || 10000,
          peakPowerKw: state.billData?.potenciaMaximaKw || undefined,
          monthlyCostBs: state.billData?.costoTotalBs || undefined,
          irradianceKwhM2Day: state.irradiance || 4.8,
          panelId: state.selectedPanel?.id || 'jinko-tiger-neo-670w',
          latitude: state.location?.lat || -17.78,
          longitude: state.location?.lng || -63.18,
        }).pipe(
          map(result => {
            this.notification.success('Simulación completada');
            return SimulatorActions.calculateSuccess({ result });
          }),
          catchError(error => {
            this.notification.error('Error al calcular la microred');
            return of(SimulatorActions.calculateFailure({
              error: 'Error al calcular la microred'
            }));
          })
        )
      )
    )
  );

  // Save simulation
  saveSimulation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SimulatorActions.saveSimulation),
      withLatestFrom(this.store.select(selectSimulatorState)),
      switchMap(([_, state]) => {
        if (!state.result) {
          return of(SimulatorActions.saveSimulationFailure({
            error: 'No hay resultados para guardar'
          }));
        }
        return this.api.saveSimulation(state.result).pipe(
          map(id => {
            this.notification.success('Simulación guardada correctamente');
            return SimulatorActions.saveSimulationSuccess({ id });
          }),
          catchError(error => of(SimulatorActions.saveSimulationFailure({
            error: 'Error al guardar la simulación'
          })))
        );
      })
    )
  );

  // On calculate success, go to results step
  calculateSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SimulatorActions.calculateSuccess),
      map(() => SimulatorActions.nextStep())
    )
  );

  // Chat ask
  chatAsk$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SimulatorActions.chatAsk),
      switchMap(({ simulationId, question }) =>
        this.api.chatAsk(simulationId, question).pipe(
          map(({ answer }) => SimulatorActions.chatAskSuccess({ answer })),
          catchError(error => of(SimulatorActions.chatAskFailure({
            error: 'Error en chat. Intentá de nuevo.'
          })))
        )
      )
    )
  );
}
