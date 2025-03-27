import { Component, input, output, signal } from '@angular/core';
import { eContentType } from 'src/_models/enums/app.enums';

@Component({
  selector: 'app-locked-content',
  imports: [],
  templateUrl: './locked-content.component.html',
  styleUrl: './locked-content.component.scss',
})
export class LockedContentComponent {

  //#region CORE
  readonly _CONTENT_TYPE = input<eContentType>();
  readonly _VALUE = input<string | Blob>();
  _ICONS_PATH = 'public/app-icons/ico-';
  //#endregion

  //#region EMIT EVENT & DATA
  onDeleteMeEvent = output<true>();

  //#endregion

  //#region USER INPUTS / EVENTS

  onModify() {
    console.log('');
  }

  onSupr() {
    console.log('Onsupr');
    this.onDeleteMeEvent.emit(true);
  }

  //#endregion

  dev() {
    console.log(this.getIconToDisplay());
  }

  getIconToDisplay(): string {
    const contentType = this._CONTENT_TYPE()?.toLowerCase();
    return `app-icons/ico-${contentType}-file.svg`;
  }
}
