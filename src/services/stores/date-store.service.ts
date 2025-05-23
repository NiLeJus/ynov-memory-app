import {
  computed,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { DateTime } from 'luxon';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DateStore {
  constructor() {}
  dateChanged$ = toObservable(computed(() => this.daysToAdd()));

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

  getCurrentDate(): string {
    return DateTime.now().plus({ days: this.daysToAdd() }).toISODate();
  }

  passOneDay() {
    this.daysToAdd.update((value) => ++value);
    this.triggerAction();
  }

  //Fire event

  private triggerSubject = new Subject<void>();

  triggerObservable = this.triggerSubject.asObservable();

  triggerAction(): void {
    this.triggerSubject.next();
  }
}
