import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { DashboardActions } from './dashboard.actions';
import { SimulatorApiService } from '../../../simulator/data-access/services/simulator-api.service';

@Injectable()
export class DashboardEffects {
  private actions$ = inject(Actions);
  private api = inject(SimulatorApiService);

  loadSimulations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.loadSimulations),
      switchMap(({ cursor }) =>
        this.api.getSimulations(cursor).pipe(
          map(response => DashboardActions.loadSimulationsSuccess(response)),
          catchError(error => of(DashboardActions.loadSimulationsFailure({
            error: 'Error al cargar simulaciones'
          })))
        )
      )
    )
  );
}
