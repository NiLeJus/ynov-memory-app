import { Injectable, signal } from '@angular/core';
import { tModalContent } from './modal-disp/modals.prefabs';

@Injectable({ providedIn: 'root' })
export class ValidationDisplayerService {
  public readonly _modal = signal<null | tModalContent>(null);

  constructor() {}

  showModal(toDisplay: tModalContent) {
    this._modal.set(toDisplay);
    return;
  }

  dismissModal() {
    this._modal.set(null);
  }
}
