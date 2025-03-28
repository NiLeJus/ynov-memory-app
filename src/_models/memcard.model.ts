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
    public cardType: eMemcardType | null,
    public recto: tMemcardContent[],
    public verso: tMemcardContent[],
    public validationLevel: number = 0,
    public Historic: tHistoricEntry[],
    public Statistics?: tMemCardStatistics,
  ) {}
}

export type tMemcard = InstanceType<typeof MemcardObj>;

export class MemcardPrototype {
  constructor(
    public cardType?: eMemcardType | null,
    public title: string = '',
    public recto: tMemcardContent[] | null = null,
    public verso: tMemcardContent[] | null = null,
  ) {}
}

export type tMemorycardPrototype = InstanceType<typeof MemcardPrototype>;

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
    public value: string | Blob | null,
    public mediaType: eContentType | null,
    public description?: string | null,
  ) {}
}

export type tMemcardContent = InstanceType<typeof MemcardContentObj>;

//#endregion

//#region  STATISTICS & HISTORIC ENTRY

export interface tMemCardStatistics {
  validationTotal: number;
  devaluationTotal: number;
  maxLevelReached: number;
  totalPoints: number;
}

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
