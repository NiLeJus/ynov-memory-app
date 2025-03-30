import { DateStore } from '../stores/date-store.service';
import {
  HistoricEntryObj,
  tHistoricEntry,
} from '../../_models/memcard.model';
import { Injectable, OnInit } from '@angular/core';
import {
  eMemcardType,
  eContentType,
  eMemcardStatus,
} from 'src/_models/enums/app.enums';
import { tMemcard } from 'src/_models/memcard.model';
import { DateTime } from 'luxon';
import { _DAYS_SPACING } from 'src/_data/days-spacing.table';

@Injectable({
  providedIn: 'root',
})
export class MemcardActions implements OnInit {
  //#region CORE STATE
  ENUM_MEMCARD_STATUS = eMemcardStatus;
  readonly memcardStatus = Object.values(this.ENUM_MEMCARD_STATUS); // Transforme en tableau pour itéré

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
      this.processNewDate(hasPassed)!,
    );
    memcard.Historic?.unshift(newHistoricEntry);

    return memcard;
  }

  processNewDate(hasPassed: boolean = true): string {
    const daysSpacing = _DAYS_SPACING;
    const actualValLevel = 2;
    const newValLevel = actualValLevel + 1;

    let nextDate: any = DateTime.fromISO(this.dateStore.now()); // Value to be retured
    //Determine si il faut appliquer un downgrade ou upgrade
    if (hasPassed) {
      nextDate = nextDate.plus({ days: daysSpacing[newValLevel] + 1 });
      console.log(nextDate);
    } else {
      nextDate = nextDate.plus({ days: daysSpacing[newValLevel] + 1 });
      console.log(nextDate);
    }

    nextDate = nextDate.toISODate();
    if (nextDate) {
      // Return the ISO string (or null if invalid)
      return nextDate.toISODate();
    } else {
      console.error('next Date at memcard.actions is null wtfbro');
      return '';
    }
  }

  nextDate() {}

  createNewHistory() {
    const _nextDate: string = this.processNewDate();
    return new HistoricEntryObj(
      eMemcardStatus.Creation,
      DateTime.now().toISODate(),
      0,
      _nextDate,
    );
  }

  ngOnInit(): void {
    this.processNewDate();
  }
}
