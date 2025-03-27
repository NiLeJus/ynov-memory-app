import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';

@Injectable({
  providedIn: 'root',
})
export class DateStore {
  constructor() {}

  daysToAdd = 0;

  now(): string {
    return DateTime.now().plus({ days: this.daysToAdd }).toISO();
  }

  passOneDay() {
    ++this.daysToAdd;
  }

}
