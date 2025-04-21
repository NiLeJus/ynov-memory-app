import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { count, last } from 'rxjs';
import {
  eMemcardType,
  eContentType,
  eMemcardStatus,
} from 'src/models/business/business.enums';
import {
  tMemcard,
  StreakStatObj,
} from 'src/models/business/memcard.model';

@Injectable({
  providedIn: 'root',
})
export class MemcardStatsService {
  ENUM_MEMOCARD_TYPE = eMemcardType;
  ENUM_MEMCARD_CONTENT = eContentType;
  ENUM_MEMCARD_STATUS = eMemcardStatus;
  readonly memcardStatus = Object.values(this.ENUM_MEMCARD_STATUS); // Transforme en Array pour itérer

  constructor() {}







  getCreationDate(memcardHistoric: tMemcard['Historic']): string {
    const firstHistoric = memcardHistoric[memcardHistoric.length - 1];
    let toReturn: string;

    if (firstHistoric.statusAt === this.ENUM_MEMCARD_STATUS.Creation) {
      toReturn = firstHistoric.date;
    } else {
      toReturn =
        memcardHistoric.find((entry) => {
          entry.statusAt === this.ENUM_MEMCARD_STATUS.Creation;
        })?.date ?? '';
    }

    toReturn = DateTime.fromISO(toReturn).toLocaleString() ?? '';

    return toReturn;
  }

  getScore(memcarStats: tMemCardStatistics) {}
}
