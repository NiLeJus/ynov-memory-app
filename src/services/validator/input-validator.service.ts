import { Injectable } from '@angular/core';

export type val = string[] | string | null | undefined;

@Injectable({ providedIn: 'root' })
export class InputValidatorService {

  isNotEmpty(valToCheck: val) {}

  isLongEnought(valToCheck: val, ) {}



  constructor() {}
}
