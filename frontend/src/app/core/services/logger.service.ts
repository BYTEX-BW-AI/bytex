import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

@Injectable({ providedIn: 'root' })
export class LoggerService {
  private isProduction = environment.production;

  debug(context: string, message: string, data?: Record<string, unknown>): void {
    this.log('debug', context, message, data);
  }

  info(context: string, message: string, data?: Record<string, unknown>): void {
    this.log('info', context, message, data);
  }

  warn(context: string, message: string, data?: Record<string, unknown>): void {
    this.log('warn', context, message, data);
  }

  error(context: string, message: string, data?: Record<string, unknown>): void {
    this.log('error', context, message, data);
  }

  private log(level: LogLevel, context: string, message: string, data?: Record<string, unknown>): void {
    if (this.isProduction && level === 'debug') return;

    const entry = {
      timestamp: new Date().toISOString(),
      level,
      context,
      message,
      ...(data ? { data } : {}),
    };

    switch (level) {
      case 'debug': console.debug(`[${context}]`, message, data || ''); break;
      case 'info': console.info(`[${context}]`, message, data || ''); break;
      case 'warn': console.warn(`[${context}]`, message, data || ''); break;
      case 'error': console.error(`[${context}]`, message, data || ''); break;
    }
  }
}
