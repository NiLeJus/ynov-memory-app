import { eContentType } from './../../../_models/app.enums';
import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-locked-content',
  imports: [],
  templateUrl: './locked-content.component.html',
  styleUrl: './locked-content.component.scss',
})
export class LockedContentComponent {
  readonly _CONTENT_TYPE = input<eContentType>();
  readonly _VALUE = input<string>();

  _ICONS_PATH = 'app-icons/';

  dev() {
    console.log(this.getIconToDisplay());
  }

  getIconToDisplay(): string {
    return `${this._ICONS_PATH}${this._CONTENT_TYPE}.svg`;
  }

  onModify() {
    console.log('');
  }
}
