import {
  computed,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
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

  $nowFormatted: Signal<string> = computed(() =>
    DateTime.now().plus({ days: this.daysToAdd() }).toISODate(),
  );

  passOneDay() {
    this.daysToAdd.update((value) => ++value);
  }
}
