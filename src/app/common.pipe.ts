import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'common'
})
export class CommonPipe implements PipeTransform {

  private transformations: { [key: string]: (value: any, ...args: any[]) => any } = {
    sort: (value: number[], direction: 'asc' | 'desc') => this.sort(value, direction),
    temperature: (value: number, scale: string) => this.temperature(value, scale)
  };

  transform(value: number[] | number, type: 'sort' | 'temperature', ...args: unknown[]) {
    const transformFunction = this.transformations[type];
    if (transformFunction) {
      return transformFunction(value, ...args);
    }
    return value;
  }

  private sort(value: number[], direction: 'asc' | 'desc'): number[] {
    const sorted = [...value];
    sorted.sort((a, b) => direction === 'asc' ? a - b : b - a);
    return sorted;
  }

  private temperature(value: number, scale: string): string {
    if (isNaN(value)) {
      return '';
    }

    let temperature: number;
    let unit: string;

    switch (scale) {
      case 'C':
        temperature = value;
        unit = '°C';
        break;
      case 'F':
        temperature = (value * 9/5) + 32;
        unit = '°F';
        break;
      case 'K':
        temperature = value + 273.15;
        unit = 'K';
        break;
      default:
        temperature = value;
        unit = '°C';
    }

    return `${temperature.toFixed(2)} ${unit}`;
  }
}
