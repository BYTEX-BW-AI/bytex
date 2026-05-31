import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { ApiResponse, PaginatedResponse } from '../models/api-response.model';
import { AppError } from '../models/app-error.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  get<T>(path: string, params?: Record<string, string>): Observable<ApiResponse<T>> {
    return this.http.get<ApiResponse<T>>(`${this.baseUrl}${path}`, {
      params: new HttpParams({ fromObject: params || {} }),
      headers: { 'x-correlation-id': crypto.randomUUID() }
    }).pipe(
      timeout(30000),
      catchError(err => this.handleError(err))
    );
  }

  post<T>(path: string, body: unknown): Observable<ApiResponse<T>> {
    return this.http.post<ApiResponse<T>>(`${this.baseUrl}${path}`, body, {
      headers: { 'x-correlation-id': crypto.randomUUID() }
    }).pipe(
      timeout(60000),
      catchError(err => this.handleError(err))
    );
  }

  put<T>(path: string, body: unknown): Observable<ApiResponse<T>> {
    return this.http.put<ApiResponse<T>>(`${this.baseUrl}${path}`, body, {
      headers: { 'x-correlation-id': crypto.randomUUID() }
    }).pipe(
      timeout(30000),
      catchError(err => this.handleError(err))
    );
  }

  delete<T>(path: string): Observable<ApiResponse<T>> {
    return this.http.delete<ApiResponse<T>>(`${this.baseUrl}${path}`, {
      headers: { 'x-correlation-id': crypto.randomUUID() }
    }).pipe(
      timeout(30000),
      catchError(err => this.handleError(err))
    );
  }

  getPaginated<T>(path: string, cursor?: string, limit = 20): Observable<PaginatedResponse<T>> {
    const params: Record<string, string> = { limit: limit.toString() };
    if (cursor) params['cursor'] = cursor;
    return this.http.get<PaginatedResponse<T>>(`${this.baseUrl}${path}`, {
      params: new HttpParams({ fromObject: params }),
      headers: { 'x-correlation-id': crypto.randomUUID() }
    }).pipe(
      timeout(30000),
      catchError(err => this.handleError(err))
    );
  }

  upload<T>(path: string, file: File, fieldName = 'file'): Observable<ApiResponse<T>> {
    const formData = new FormData();
    formData.append(fieldName, file);
    return this.http.post<ApiResponse<T>>(`${this.baseUrl}${path}`, formData, {
      headers: { 'x-correlation-id': crypto.randomUUID() }
    }).pipe(
      timeout(120000),
      catchError(err => this.handleError(err))
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let appError: AppError;
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      appError = new AppError('CLIENT_ERROR', 'Error de conexión. Verifica tu internet.');
    } else {
      // Error del servidor
      const serverError = error.error?.error;
      appError = new AppError(
        serverError?.code || `HTTP_${error.status}`,
        serverError?.message || this.getDefaultMessage(error.status),
        serverError?.details
      );
    }
    return throwError(() => appError);
  }

  private getDefaultMessage(status: number): string {
    const messages: Record<number, string> = {
      400: 'Solicitud inválida',
      401: 'No autorizado. Inicia sesión de nuevo.',
      403: 'No tenés permisos para esta acción',
      404: 'Recurso no encontrado',
      409: 'Conflicto. El recurso ya existe.',
      429: 'Demasiadas solicitudes. Esperá un momento.',
      500: 'Error del servidor. Intentá de nuevo.',
      502: 'Servicio temporalmente no disponible',
      503: 'Servicio en mantenimiento',
    };
    return messages[status] || 'Error inesperado del servidor';
  }
}
