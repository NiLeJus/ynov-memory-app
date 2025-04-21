import { DateTime } from 'luxon';

type YYYY = `${number}${number}${number}${number}`;
type MM = `0${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}` | `1${0 | 1 | 2}`;
type DD =
  | `0${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
  | `1${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
  | `2${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
  | `3${0 | 1}`;
export type DateFormatYMD = `${YYYY}-${MM}-${DD}`;

class HandlerDate {
  private date: DateTime;

  constructor(date: string | Date | DateTime) {
    if (typeof date === 'string') {
      // On suppose que le format d'entrée est ISO ou YMD
      this.date = DateTime.fromISO(date);
      if (!this.date.isValid) {
        throw new Error('Invalid date string');
      }
    } else if (date instanceof Date) {
      this.date = DateTime.fromJSDate(date);
    } else if (date instanceof DateTime) {
      this.date = date;
    } else {
      throw new Error('Invalid date input');
    }
  }

  toLuxonObject(): DateTime {
    return this.date;
  }

  toFormatISOYMD(): DateFormatYMD {
    const iso = this.date.toISODate();
    return iso as DateFormatYMD;
  }

  daysSpacing(valLevel: number): number {
    let spaceDays: number = 0;

    for (let i = valLevel; i == 0; i--) {
      spaceDays = spaceDays * 2;
    }

    return spaceDays;
  }

  isTomorow() {}

  static convertor() {}
}

export { HandlerDate };

export enum eRepetitionType {
  debbinghaus = 'DEBBINGHAUS',
  Leitner = 'LEITNER',
}
