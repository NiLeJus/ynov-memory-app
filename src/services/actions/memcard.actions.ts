import { DateStore } from '../stores/date-store.service';
import { HistoricEntryObj, tHistoricEntry } from '../../_models/memcard.model';
import { inject, Injectable, OnInit } from '@angular/core';
import { eMemcardStatus } from 'src/_models/enums/app.enums';
import { tMemcard } from 'src/_models/memcard.model';
import { DateTime } from 'luxon';
import { _DAYS_SPACING } from 'src/_data/days-spacing.table';
import { DatabaseService } from '../database/database.service';

@Injectable({
  providedIn: 'root',
})
export class MemcardActionsService {
  //#region DEPENDENCIES
  ENUM_MEMCARD_STATUS = eMemcardStatus;
  readonly memcardStatus = Object.values(this.ENUM_MEMCARD_STATUS); // Transforme en tableau pour itéré

  dateStore = inject(DateStore);
  databaseService = inject(DatabaseService);

  //#endregion

  /**
   * Calculate next date only and return it
   */
  private processNextDate(newValLevel: number): string {
    const daysSpacing = _DAYS_SPACING;

    const initialDate = DateTime.fromISO(this.dateStore.now());
    if (!initialDate.isValid) {
      throw new Error(
        `Date invalide dans this.dateStore.now() : ${this.dateStore.now()}`,
      );
    }

    let nextDate = initialDate.plus({ days: daysSpacing[newValLevel] + 2 });

    console.log(nextDate.toISODate()); // Format YYYY-MM-DD

    if (nextDate) {
      return nextDate.toISODate();
    } else {
      throw new Error('nextDate is not a valid date');
    }
  }

  /**
   * Update card data
   */
  public processCard(memcardData: tMemcard, hasPassed: boolean): tMemcard {
    const memcard = {
      ...memcardData,
      Historic: [...(memcardData.Historic || [])],
    };
    let newValLevel = memcard.Historic[0].valLevel;
    const currHistoric = memcard.Historic;
    const minValLevel = 0;

    if (!Array.isArray(memcardData.Historic)) {
      throw new Error('Invalid memcard data: Historic must be an array.');
    }

    const newStatus = () => {
      if (hasPassed) {
        ++newValLevel;
        return this.ENUM_MEMCARD_STATUS.Validated;
      } else {
        --newValLevel;
        if (newValLevel < 0) {
          newValLevel = minValLevel;
        }
        return this.ENUM_MEMCARD_STATUS.NotValidated;
      }
    };

    let nextDate = this.processNextDate(newValLevel);

    // Création d'une nouvelle entrée historique
    const newHistoricEntry: tHistoricEntry = new HistoricEntryObj(
      newStatus(),
      DateTime.now().toISODate(),
      newValLevel,
      nextDate,
    );

    // Ajout immuable de la nouvelle entrée historique
    const newHistoric = [newHistoricEntry, ...currHistoric];

    // Retour d'un nouvel objet memcard avec les modifications
    return {
      ...memcard,
      Historic: newHistoric,
    };
  }

  createNewHistory() {
    return new HistoricEntryObj(
      eMemcardStatus.Creation,
      DateTime.now().toISODate(),
      0,
      this.processNextDate(0),
    );
  }

  updateMemcardInDB(memcardToUpdate: tMemcard) {
    console.log('updating data in db');
    this.databaseService.updateMemcardByID(memcardToUpdate);
  }
}

//! Old sans immuabilité
// oldProcessNextDate(memcardData: tMemcard, hasPassed: boolean) {
//   let memcard = memcardData;
//   let historic = memcard.Historic;
//   const defaultValLevel = 0;
//   let newValLevel = historic[0]?.valLevel ?? defaultValLevel;

//   const newStatus: eMemcardStatus = this.memcardStatus[+hasPassed];

//   let newHistoricEntry: tHistoricEntry = new HistoricEntryObj(
//     newStatus,
//     DateTime.now().toISODate(),
//     newValLevel,
//     this.processNewDate(hasPassed)!,
//   );
//   memcard.Historic?.unshift(newHistoricEntry);

//   return memcard;
// }
