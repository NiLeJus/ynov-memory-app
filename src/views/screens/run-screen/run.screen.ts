import { DatabaseService } from 'src/services/database/database.service';
import { tMemcard } from 'src/_models/memcard.model';
import { MockerService } from './../../../services/mocker.service';
import { Component, computed, inject, Signal } from '@angular/core';
import { ButtonQuitComponent } from '../../atoms/button-quit/button-quit.component';
import {
  eContentType,
  eMemcardStatus,
  eMemcardType,
  eRunTypes,
} from 'src/_models/enums/app.enums';
import { tMemTheme, tProfile } from 'src/_models/profile.model';
import { DateStore } from 'src/services/stores/date-store.service';
import { DateTime } from 'luxon';
import { RunStore } from 'src/services/stores/run-store.service';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { MemcardIconService } from 'src/services/memcard-icon.service';

@Component({
  selector: 'app-run-screen',
  imports: [ButtonQuitComponent],
  templateUrl: './run.screen.html',
  styleUrl: './run.screen.scss',
})
export class RunScreenComponent {
  //#region Core

  memcardIcon = inject(MemcardIconService);

  isRunComplete: boolean = true;
  ENUM_MEMOCARD_TYPE = eMemcardType;
  ENUM_MEMCARD_CONTENT = eContentType;
  ENUM_MEMCARD_STATUS = eMemcardStatus;
  readonly memcardStatus = Object.values(this.ENUM_MEMCARD_STATUS); // Transforme en Array pour itérer

  ENUM_RUN_TYPES = eRunTypes;
  readonly eRunTypes = Object.values(this.ENUM_RUN_TYPES); // Transforme en Array pour itérer
  public mockerService = inject(MockerService);
  public databaseService = inject(DatabaseService);

  constructor(
    private router: Router,
    public storeRun: RunStore,
    public dateStore: DateStore,
  ) {}

  // Conversion du flux constant en signal Angular pour une gestion réactive
  _user$: Signal<tProfile | null | undefined> = toSignal(
    this.databaseService.getSelectedUser$(),
    { initialValue: null as tProfile | null },
  );

  // Conversion du flux constant en signal Angular pour une gestion réactive
  _userThemes$ = computed(() => {
    return this._user$()?.themes;
  });

  hasUserRunToDo(): boolean {
    const themes = this._userThemes$() ?? [];

    return themes.some((theme) => {
      const cards = this.cardsToValidate(theme);
      return Array.isArray(cards) && cards.length > 0;
    });
  }

  cardsToValidate(theme: tMemTheme): tMemcard[] | false {
    const _now = DateTime.fromISO(this.dateStore.now()).startOf('day');
    if (!_now.isValid) {
      throw new Error('Invalid date: _now is not a valid DateTime');
    }

    let filteredMemcard = theme.cards.filter((memcard) => {
      if (!memcard.Historic || !memcard.Historic[0].nexValidationDate) {
        throw new Error('Invalid : memcard.Historic is null');
      }

      const nextValidationDate = DateTime.fromISO(
        memcard.Historic[0].nexValidationDate,
      );

      if (!nextValidationDate.isValid) {
        throw new Error('Invalid date: _now is not a valid DateTime');
      }

      return nextValidationDate.startOf('day').hasSame(_now, 'day');
    });

    return filteredMemcard;
  }

  countMemcardToValidate(theme: tMemTheme): number {
    const memcardToValidate = this.cardsToValidate(theme);
    if (memcardToValidate) return memcardToValidate.length;
    else return 0;
  }

  isMemThemeChecked(theme: tMemTheme): boolean {
    if (this.countMemcardToValidate(theme) > 0) {
      return true;
    }
    return false;
  }

  handlePassedMemcard(memcard: tMemcard) {
    console.log();
  }

  dev(theme: tMemTheme) {
    console.log('inputed Theme: ', theme);
    console.log(this.hasUserRunToDo());
  }

  pushMemcardToDo(themes: tMemTheme[]) {
    const allCardsToValidate = themes
      .map((theme) => this.cardsToValidate(theme)) // Retourne un tableau de (false | MemcardObj[])
      .flatMap((result) => (result === false ? [] : result)); // Filtre les false et aplatit

    if (allCardsToValidate.length === 0) {
      console.log('Aucune carte à valider');
      return;
    }

    const rep = this.storeRun.setMemcardsToRun(allCardsToValidate);
    console.log('Réponse du store:', rep);

    if (rep) {
      this.storeRun.switchIsPlayerRunning(true);
      this.router.navigate(['/running']);
    }
  }

  //#endregion

  //#region Component State
  userWantsTo: eRunTypes = eRunTypes.Train;

  onValidateRun() {
    if (this._userThemes$()) {
      this.pushMemcardToDo(this._userThemes$()!);
    }
  }
  //#endregion

  dev2(memcard: any) {}
}
