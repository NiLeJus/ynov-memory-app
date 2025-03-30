import { computed, Injectable, Signal, signal } from '@angular/core';
import { DateTime } from 'luxon';

@Injectable({
  providedIn: 'root',
})
export class DateStore {
  constructor() {}

  daysToAdd = signal(0);

  now(): string {
    return DateTime.now().plus({ days: this.daysToAdd() }).toISO();
  }

  $now: Signal<string> = computed(() =>
    DateTime.now().plus({ days: this.daysToAdd() }).toISO(),
  );

  passOneDay() {
    this.daysToAdd.update((value) => ++value);
  }
}
