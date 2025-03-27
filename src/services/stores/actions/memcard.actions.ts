import { DateStore } from './../date-store.service';
import {
  HistoricEntryObj,
  tHistoricEntry,
} from './../../../_models/memcard.model';
import { Injectable, OnInit } from '@angular/core';
import {
  eMemcardType,
  eContentType,
  eMemcardStatus,
} from 'src/_models/enums/app.enums';
import { tMemcard } from 'src/_models/memcard.model';
import { DateTime } from 'luxon';
import { _MOCK_Memcard } from 'src/_data/mocks/mockProfile.data';
import { _DAYS_SPACING } from 'src/_data/days-spacing.table';

@Injectable({
  providedIn: 'root',
})
export class MemcardActions implements OnInit {
  //#region CORE STATE
  ENUM_MEMCARD_STATUS = eMemcardStatus;
  readonly memcardStatus = Object.values(this.ENUM_MEMCARD_STATUS); // Transforme en tableau pour itéré

  mock_memcard = _MOCK_Memcard;

  //#endregion

  constructor(public dateStore: DateStore) {}

  process(memcardData: tMemcard, hasPassed: boolean) {
    let memcard = memcardData;
    let historic = memcard.Historic;
    const defaultValLevel = 0;
    let newValLevel = historic[0]?.valLevel ?? defaultValLevel;

    if (hasPassed) {
      ++newValLevel;
    } else {
      --newValLevel;
    }

    const newStatus: eMemcardStatus = this.memcardStatus[+hasPassed];

    let newHistoricEntry: tHistoricEntry = new HistoricEntryObj(
      newStatus,
      DateTime.now().toISODate(),
      newValLevel,
      this.processNewDate(hasPassed)!, // Si ne retourne pas null
    );
    memcard.Historic?.unshift(newHistoricEntry);

    return memcard;
  }

  processNewDate(hasPassed: boolean = true): string | null {
    const daysSpacing = _DAYS_SPACING;
    const actualValLevel = 2;
    const newValLevel = actualValLevel + 1;

    let nextDate = DateTime.fromISO(this.dateStore.now()); // Value to be retured
    //Determine si il faut appliquer un downgrade ou upgrade
    if (hasPassed) {
      nextDate = nextDate.plus({ days: daysSpacing[newValLevel] + 1 });
      console.log(nextDate);
    } else {
      nextDate = nextDate.plus({ days: daysSpacing[newValLevel] + 1 });
      console.log(nextDate);
    }

    if (nextDate) {
      // Return the ISO string (or null if invalid)
      return nextDate.toISODate();
    } else {
      console.error('next Date at memcard.actions is null wtfbro');
      return null;
    }
  }

  ngOnInit(): void {
    this.processNewDate();
  }
}
