import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../../../../core/services/api.service';
import { ExtractedBillData, PanelOption, SimulationResult } from '../models/simulation.model';

interface CalculateRequest {
  simulationId: string;
  monthlyConsumptionKwh: number;
  peakPowerKw?: number;
  irradianceKwhM2Day: number;
  panelId: string;
  latitude: number;
  longitude: number;
  monthlyCostBs?: number;
}

@Injectable({ providedIn: 'root' })
export class SimulatorApiService {
  private api = inject(ApiService);

  /** Extract bill data and analyze with Gemini */
  extractBill(imageBase64: string): Observable<any> {
    let rawBase64 = imageBase64;
    let mimeType = 'image/jpeg';

    if (imageBase64.startsWith('data:')) {
      const matches = imageBase64.match(/^data:([^;]+);base64,(.+)$/);
      if (matches) {
        mimeType = matches[1];
        rawBase64 = matches[2];
      }
    }

    return this.api.post<any>('/api/simulation/extract-and-analyze', {
      image: rawBase64,
      mimeType,
      context: {
        sectorId: null,
        zoneId: null,
        latitude: null,
        longitude: null,
      }
    }).pipe(map(res => res.data!));
  }

  /** Get solar irradiance from NASA POWER */
  getSolarData(lat: number, lng: number): Observable<number> {
    return this.api.get<{ irradiance: number }>('/api/solar-data', {
      lat: lat.toString(),
      lng: lng.toString(),
    }).pipe(map(res => res.data!.irradiance));
  }

  /** Calculate complete microgrid sizing */
  calculateMicrogrid(request: CalculateRequest): Observable<SimulationResult> {
    return this.api.post<SimulationResult>('/api/simulation/calculate', request)
      .pipe(map(res => res.data!));
  }

  /** Save simulation to Firestore */
  saveSimulation(result: SimulationResult): Observable<string> {
    return this.api.post<{ id: string }>('/api/simulation/create', result)
      .pipe(map(res => res.data!.id));
  }

  /** Get panel catalog */
  getPanels(): Observable<PanelOption[]> {
    return this.api.get<PanelOption[]>('/api/panels')
      .pipe(map(res => res.data!));
  }

  /** Get user's saved simulations */
  getSimulations(cursor?: string): Observable<{
    items: SimulationResult[];
    cursor: string | null;
    hasMore: boolean;
  }> {
    return this.api.getPaginated<SimulationResult>('/api/simulation/list', cursor);
  }

  /** Ask question about simulation */
  chatAsk(simulationId: string, question: string): Observable<{ answer: string; sources: string[] }> {
    return this.api.post<{ answer: string; sources: string[] }>(
      '/api/chat/ask',
      { simulationId, question }
    ).pipe(map(res => res.data!));
  }
}
