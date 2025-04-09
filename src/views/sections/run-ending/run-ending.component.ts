import { RunStore } from 'src/services/stores/run-store.service';
import { Component, inject } from '@angular/core';
import { tMemcard } from 'src/_models/memcard.model';
import { Router } from '@angular/router';
import { MemcardIconService } from 'src/services/memcard-icon.service';
import {
  eMemcardType,
  eContentType,
  eMemcardStatus,
} from 'src/_models/enums/app.enums';

@Component({
  selector: 'app-run-ending',
  imports: [],
  templateUrl: './run-ending.component.html',
  styleUrl: './run-ending.component.scss',
})
export class RunEndingComponent {
  router = inject(Router);
  runStore = inject(RunStore);
  memcardIcon = inject(MemcardIconService);
  runnedMemcards: tMemcard[] = this.runStore.cardRunned();

  //#region DEPENDENCIES ENUMS
  ENUM_MEMOCARD_TYPE = eMemcardType;
  ENUM_MEMCARD_CONTENT = eContentType;
  ENUM_MEMCARD_STATUS = eMemcardStatus;
  readonly memcardStatus = Object.values(this.ENUM_MEMCARD_STATUS); // Transforme en Array pour itérer

  //#endregion

  onClickDev(memcard: tMemcard) {
    console.log(memcard.Historic);
  }

  onNext() {
    this.runStore.onRunFinished();
    this.router.navigate(['']);
  }
}
