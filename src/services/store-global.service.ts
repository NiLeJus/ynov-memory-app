import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StoreGlobalService {
  currentUserId: WritableSignal<number | null> = signal(null);
  constructor() {}

  changeCurrentUserId(newValue: number | null) {
    this.currentUserId.set(newValue);
    console.log('Changed currentUserId to ', newValue);
  }

  getCurrentUserId(): number | null {
    return this.currentUserId();
  }
}
