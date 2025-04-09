import { Injectable } from '@angular/core';
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
  isMobile = true;

  private mobileIcons(): GenericIconsPathObj {
    return new GenericIconsPathObj({
      left: 'icon1',
      right: 'icon3',
      top: 'icon4',
      down: 'icon5',
    });
  }

  private keyboardIcons(): GenericIconsPathObj {
    return new GenericIconsPathObj({
      left: 'icon1',
      right: 'icon3',
      top: 'icon4',
      down: 'icon5',
    });
  }

  getIcons(): GenericIconsPathObj {
    return this.mobileIcons();
  }

  constructor() {}
}
