import { Injectable } from '@angular/core';

import { DateTime } from 'luxon';
import { _DAYS_SPACING } from 'src/models/_data/days-spacing.table';
import {
  eMemcardStatus,
  eMemcardType,
  eContentType,
} from 'src/models/business/business.enums';
import {
  tMemcard,
  tMemcardContent,
  MemcardObj,
  tMemcardPrototype,
  tHistoricEntry,
  HistoricEntryObj,
  tMemCardStatistics,
  HandlerStatistics,
} from 'src/models/business/memcard.model';
import {
  tProfile,
  tMemTheme,
  ProfileObj,
  MemThemeObj,
  ProfileStatsObj,
} from 'src/models/business/profile.model';

@Injectable({ providedIn: 'root' })
export class FactoriesService {
  constructor(public dateStore: DateStore) {}

  //#region ENUMS DEPENDENCIES
  ENUM_MEMCARD_STATUS = eMemcardStatus;
  readonly memcardStatus = Object.values(this.ENUM_MEMCARD_STATUS); // Transforme en tableau pour itéré
  ENUM_MEMORYCARD_TYPE = eMemcardType;
  ENUM_MEMORYCARD_CONTENT = eContentType;
  readonly memorycardTypes = Object.values(this.ENUM_MEMORYCARD_TYPE); // Transforme en tableau pour itéré

  //#endregion

  //#region PROFILE

  makeProfile(name: tProfile['name'], profileThemes: tMemTheme[]): tProfile {
    return new ProfileObj(
      crypto.randomUUID(),
      name,
      profileThemes,
      this.makeStatObj(),
    );
  }

  //#endregion

  //#region THEMES

  makeMemTheme(name: tMemTheme['name'], cards: tMemcard[]): tMemTheme {
    return new MemThemeObj(crypto.randomUUID(), name, cards);
  }

  //#endregion

  //#region MEMCARDS

  /**
   * Créer une carte
   */
  makeMemcard(
    title: string,
    cardType: eMemcardType,
    recto: tMemcardContent[],
    verso: tMemcardContent[],
  ): tMemcard | false {
    let newMemoryCard = new MemcardObj(
      crypto.randomUUID(),
      title,
      cardType,
      recto,
      verso,
      0,
      this.createNewHistoric(),
      this.createNewStatistic(),
    );
    console.log('Created Memory Card', newMemoryCard);
    return newMemoryCard;
  }

  /**
   * To make memcard obj from cold data
   * @param payload
   */
  makeMemcardFromProto(
    payload: tMemcardPrototype | tMemcardPrototype[],
  ): tMemcard[] {
    if (Array.isArray(payload)) {
      return payload.map((memcard: tMemcardPrototype) => {
        return new MemcardObj(
          crypto.randomUUID(),
          memcard.title,
          memcard.cardType,
          memcard.recto,
          memcard.verso,
          0,
          this.createNewHistoric(),
          this.createNewStatistic(),
        );
      });
    } else {
      //arr => array
      return [
        new MemcardObj(
          crypto.randomUUID(),
          payload.title,
          payload.cardType,
          payload.recto,
          payload.verso,
          0,
          this.createNewHistoric(),
          this.createNewStatistic(),
        ),
      ];
    }
  }

  createNewHistoric(): tHistoricEntry[] {
    const _nextDate: string = this.processNewDate();
    return [
      new HistoricEntryObj(
        eMemcardStatus.Creation,
        DateTime.now().toISODate(),
        0,
        _nextDate,
      ),
    ];
  }

  createNewStatistic(): tMemCardStatistics {
    return new HandlerStatistics(0);
  }

  processNewDate(hasPassed: boolean = true): string {
    const daysSpacing = _DAYS_SPACING;
    const actualValLevel = 2;
    const newValLevel = actualValLevel + 1;

    let nextDate: any = DateTime.fromISO(this.dateStore.now());

    //Determine si il faut appliquer un downgrade ou upgrade
    if (hasPassed) {
      nextDate = nextDate.plus({ days: 1 });
    } else {
      nextDate = nextDate.minus({ days: 1 });
    }

    nextDate = nextDate.toISODate();
    if (nextDate) {
      return nextDate;
    } else {
      console.error('next Date at memcard.actions is null wtfbro');
      return '';
    }
  }

  //#endregion

  makeStatObj() {
    return new ProfileStatsObj(0, 0, 0);
  }
}
