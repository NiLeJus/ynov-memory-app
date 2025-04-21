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

@Injectable({
  providedIn: 'root',
})
export class AppStateRepo {
  constructor() {}

  //Run Store
  runAppState = {
    wasRunning: true,
    runData: '',
  };
  //Creation Store

  manageContent: any = {
    unsavedMemcard: '',
    unsavedThemeName: '',
  };

  //User Store

  appState = {
    selectedUser: 0,
    lastSelectedUser: 0,
    lastUserPostition: 'oui',
  };

  writeState() {

  }

  
}
