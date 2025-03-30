import { tMemcard } from 'src/_models/memcard.model';
import { MockerService } from './../../../services/mocker.service';
import { StoreGlobalService } from 'src/services/stores/global-store/global-store.service';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../atoms/button/button.component';
import { ButtonQuitComponent } from '../../atoms/button-quit/button-quit.component';
import { eRunTypes } from 'src/_models/enums/app.enums';
import { tMemTheme } from 'src/_models/profile.model';
import { DateStore } from 'src/services/stores/date-store.service';
import { DateTime } from 'luxon';
import { RunStore } from 'src/services/stores/run-store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-run-screen',
  imports: [ButtonComponent, ButtonQuitComponent],
  templateUrl: './run.screen.html',
  styleUrl: './run.screen.scss',
})
export class RunScreenComponent {
  //#region Core

  isRunComplete: boolean = true;

  ENUM_RUN_TYPES = eRunTypes;
  readonly eRunTypes = Object.values(this.ENUM_RUN_TYPES); // Transforme en Array pour itérer
  public mockerService = inject(MockerService);

  constructor(
    private router: Router,
    public storeRun: RunStore,
    public dateStore: DateStore,
  ) {}

  userThemes: tMemTheme[] = this.mockerService.getMockThemeData();

  hasUserRunToDo(): boolean {
    const arr = this.userThemes.map((theme) => {
      return this.cardsToValidate(theme);
    });

    return arr.some((theme) => {
      theme = false;
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
  }

  pushMemcardToDo(themes: tMemTheme[]) {
    // 1. Récupération des cartes à valider
    const allCardsToValidate = themes
      .map((theme) => this.cardsToValidate(theme)) // Retourne un tableau de (false | MemcardObj[])
      .flatMap((result) => (result === false ? [] : result)); // Filtre les false et aplatit

    // 2. Vérification du résultat
    if (allCardsToValidate.length === 0) {
      console.log('Aucune carte à valider');
      return;
    }

    // 3. Logique de traitement
    console.log('Cartes à valider:', allCardsToValidate);

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

  switchRunType(newRunType: eRunTypes) {
    this.userWantsTo = newRunType;
  }

  onValidateRun() {
    this.pushMemcardToDo(this.userThemes);
  }

  handleNextCard() {
    
  }

  //#endregion
}
