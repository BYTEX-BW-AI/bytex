import { Injectable, inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';
import { AppError } from '../models/app-error.model';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notification = inject(NotificationService);

  return next(req).pipe(
    catchError(error => {
      if (error instanceof AppError) {
        notification.error(error.message);
      } else if (error.status === 401) {
        notification.warning('Sesión expirada. Iniciá sesión de nuevo.');
      } else if (error.status === 403) {
        notification.error('No tenés permisos para esta acción.');
      } else if (error.status === 429) {
        notification.warning('Demasiadas solicitudes. Esperá un momento.');
      } else if (error.status >= 500) {
        notification.error('Error del servidor. Intentá de nuevo más tarde.');
      }
      return throwError(() => error);
    })
  );
};
