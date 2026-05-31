import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyUsd',
  standalone: true,
})
export class CurrencyUsdPipe implements PipeTransform {
  transform(value: number | null | undefined, showCents = true): string {
    if (value == null) return '-';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: showCents ? 2 : 0,
      maximumFractionDigits: showCents ? 2 : 0,
    }).format(value);
  }
}

@Pipe({
  name: 'currencyBs',
  standalone: true,
})
export class CurrencyBsPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value == null) return '-';
    return `Bs ${new Intl.NumberFormat('es-BO', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)}`;
  }
}

@Pipe({
  name: 'numberFormat',
  standalone: true,
})
export class NumberFormatPipe implements PipeTransform {
  transform(value: number | null | undefined, digits = 0): string {
    if (value == null) return '-';
    return new Intl.NumberFormat('es-BO', {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    }).format(value);
  }
}

@Pipe({
  name: 'percentage',
  standalone: true,
})
export class PercentagePipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value == null) return '-';
    return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
  }
}

@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(value: string | null | undefined, maxLength = 50): string {
    if (!value) return '';
    return value.length > maxLength ? value.substring(0, maxLength) + '...' : value;
  }
}
