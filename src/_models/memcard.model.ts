//#region MEMCARD

import {
  eMemcardType,
  eContentType,
  eMemcardStatus as eMemcardStatus,
} from './enums/app.enums';

export class MemcardObj {
  constructor(
    public id: string,
    public title: string = '',
    public cardType: eMemcardType,
    public recto: tMemcardContent[],
    public verso: tMemcardContent[],
    public validationLevel: number = 0,
    public Historic: tHistoricEntry[],
    public Statistics: tMemCardStatistics,
  ) {}
}

export type tMemcard = InstanceType<typeof MemcardObj>;

export class MemcardPrototype {
  constructor(
    public title: string = '',
    public cardType: eMemcardType,
    public recto: tMemcardContent[],
    public verso: tMemcardContent[],
    public validationLevel: number = 0, //! To delete
  ) {}
}

export type tMemcardPrototype = InstanceType<typeof MemcardPrototype>;

//#endregion

//#region MEMCARD CONTENT

export class MemcardContentObj {
  constructor(
    public value: string | Blob,
    public mediaType: eContentType,
    public description?: string,
  ) {}
}

export class MemcardContentPrototype {
  constructor(
    public value: string | Blob,
    public mediaType: eContentType,
    public description?: string,
  ) {}
}

export type tMemcardContent = InstanceType<typeof MemcardContentObj>;

//#endregion

//#region  STATISTICS & HISTORIC ENTRY

export class StatisticsObj {
  constructor(
    // public validationTotal: number,
    // public devaluationTotal: number,
    // public maxLevelReached: number,
    public totalPoints: number,
  ) {}
}

export type tMemCardStatistics = {
  // validationTotal: number;
  // devaluationTotal: number;
  // maxLevelReached: number;
  totalPoints: number;
};

export class HistoricEntryObj {
  constructor(
    public statusAt: eMemcardStatus,
    public date: string,
    public valLevel: number,
    public nexValidationDate?: string,
  ) {}
}
export type tHistoricEntry = InstanceType<typeof HistoricEntryObj>;

//#endregion

//Used for displaying streak
export class StreakStatObj {
  constructor(
    public status: eMemcardStatus,
    public streak: number,
  ) {}
}
