import { Injectable } from '@angular/core';

export const valLevelxIco = [];

@Injectable({
  providedIn: 'root',
})
export class MemcardIconService {
  constructor() {}

  valIcoPath(valLevel: number): string {
    return `/app-icons/ico-levels/ico-valLevel-${valLevel}.svg`;
  }
}
