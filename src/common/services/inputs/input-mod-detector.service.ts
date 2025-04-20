import { DOCUMENT } from '@angular/common';
import { inject, Injectable, NgZone, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InputModDetector {
  private _document = inject(DOCUMENT);
  private _ngZone = inject(NgZone);

  private lastTouchTime = 0;
  private modality = signal<'keyboard' | 'touch' | null>(null);

  constructor() {
    this._ngZone.runOutsideAngular(() => {
      this._document.addEventListener('touchstart', () => this._handleTouch());
      this._document.addEventListener('keydown', () => this._handleKeyboard());
      this._document.addEventListener('mousedown', (e) => this._handleMouse(e));
    });
  }

  private _handleTouch() {
    this.lastTouchTime = Date.now();
    this.modality.set('touch');
  }

  private _handleKeyboard() {
    this.modality.set('keyboard');
  }

  private _handleMouse(event: MouseEvent) {
    const isFakeTouch = Date.now() - this.lastTouchTime < 500;
    this.modality.set(isFakeTouch ? 'touch' : 'keyboard');
  }

  isTouchInput() {
    return this.modality() === 'touch';
  }

  isKeyboardInput() {
    return this.modality() === 'keyboard';
  }
}
