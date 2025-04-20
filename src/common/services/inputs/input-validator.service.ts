import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class InputValidator {

  isMinLengthMet(valToCheck: string, minValue = 3): boolean {
    return valToCheck.length > minValue;
  }

  isMaxLengthMet(valToCheck: string, maxValue = 20): boolean {
    return valToCheck.length < maxValue;
  }

  constructor() {}
}
