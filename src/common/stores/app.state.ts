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
import { MemcardObj } from 'src/models/business/memcard.model';
import { AppState, ManageContent, RunAppState } from './app.model';

@Injectable({
  providedIn: 'root',
})
export class AppStateRepo {
  constructor() {}

  //#region App
  appState = AppState.createDefault();
  //#endregion

  //#region Run
  runRelState = RunAppState.createDefault();
  //#endregion

  //#region Creation
  contentRelState = ManageContent.createDefault();
  //#endregion

  //#region Commons
  writeState(): boolean {
    return true;
  }

  readState(targets: any[] | 'all'): AppState | RunAppState | ManageContent {
    return new AppState(1, 1, '');
  }
  //#endregion
}
