import { InputModDetector } from './input-mod-detector.service';
import { Injectable, inject } from '@angular/core';
import { GenericIconsPathObj } from 'src/_models/generics.model';

export class IconsPathObj {
  constructor(
    public left: [string],
    public right: [string],
    public top: [string],
    public down: [string],
  ) {}
}

@Injectable({
  providedIn: 'root',
})
export class ResponsiveIconsService {
  inputModDetector = inject(InputModDetector);

  isMobile = () => !this.inputModDetector.isKeyboardInput();

  private mobileIcons(): GenericIconsPathObj {
    return new GenericIconsPathObj({
      left: 'app-icons/ico-double-arrow-right.svg',
      right: 'app-icons/ico-double-arrow-left.svg',
      top: 'icon4',
      down: 'icon5',
    });
  }

  private keyboardIcons(): GenericIconsPathObj {
    return new GenericIconsPathObj({
      left: 'app-icons/ico-key-left.svg',
      right: 'app-icons/ico-key-right.svg',
      top: 'app-icons/ico-key-up.svg',
      down: 'app-icons/ico-key-down.svg',
    });
  }

  getIcons(): GenericIconsPathObj {
    if (this.isMobile()) {
      return this.mobileIcons();
    } else {
      return this.keyboardIcons();
    }
  }

  constructor() {}
}
