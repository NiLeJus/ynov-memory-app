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
  tMemCardStatistics,
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

  processValNb(memcardHistoric: tMemcard['Historic']): number {
    const historic = memcardHistoric;
    let valNb: number = 0;

    historic.forEach((entry: any) => {
      switch (entry?.statusAt) {
        case this.ENUM_MEMCARD_STATUS.Validated:
          ++valNb;
          break;
        default:
          break;
      }
    });

    return valNb;
  }

  processDevalNb(memcardHistoric: tMemcard['Historic']): number {
    const historic = memcardHistoric;
    let devalNb: number = 0;

    historic.forEach((entry: any) => {
      switch (entry?.statusAt) {
        case this.ENUM_MEMCARD_STATUS.NotValidated:
          ++devalNb;
          break;
        default:
          break;
      }
    });
    return devalNb;
  }

  processRunnedNb(memcardHistoric: tMemcard['Historic']): number {
    const historic = memcardHistoric;
    let runnedNb: number = 0;

    historic.forEach((entry: any) => {
      switch (entry?.statusAt) {
        case this.ENUM_MEMCARD_STATUS.Validated ||
          this.ENUM_MEMCARD_STATUS.NotValidated ||
          this.ENUM_MEMCARD_STATUS.Missed:
          ++runnedNb;
          break;
        default:
          break;
      }
    });
    return runnedNb;
  }

  calculateStreak(memcardHistoric: tMemcard['Historic']): StreakStatObj | void {
    const historic = memcardHistoric;
    const lastStatus = historic[0]?.statusAt;

    if (lastStatus === this.ENUM_MEMCARD_STATUS.Creation) {
      return;
    }

    let count = (): number => {
      let count = 0;

      for (const entry of historic) {
        if (entry?.statusAt === lastStatus) {
          count++;
        } else {
          break;
        }
      }
      return count;
    };

    return new StreakStatObj(lastStatus, count());
  }

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
