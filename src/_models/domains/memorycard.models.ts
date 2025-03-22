import { eContentType, eMemorycardStatus, eMemorycardType } from '../app.enums';

//#region MEMORYCARD

export class MemorycardObject {
  constructor(
    public id: number | null,
    public title: string = '',
    public cardType: eMemorycardType | null,
    public recto: iMemorycardContent[],
    public verso: iMemorycardContent[],
    public validationLevel: number = 0,
    public Historic: iHistoricEntry[] | null[],
    public Statistics?: iMemoryCardStatistics,
  ) {}
}

export type iMemorycard = InstanceType<typeof MemorycardObject>;
export type tMemorycard = InstanceType<typeof MemorycardObject>;

export class MemorycardPrototype {
  constructor(
    public cardType?: eMemorycardType | null,
    public title: string = '',
    public recto: iMemorycardContent[] | null = null,
    public verso: iMemorycardContent[] | null = null,
  ) {}
}

export type iMemorycardPrototype = InstanceType<typeof MemorycardPrototype>;
export type tMemorycardPrototype = InstanceType<typeof MemorycardPrototype>;

//#endregion

//#region TYPES

// Votre code ici

//#endregion
export class MemorycardContentObj {
  constructor(
    public value: string | Blob,
    public mediaType: eContentType,
    public description?: string,
  ) {}
}

export class MemorycardContentPrototype {
  constructor(
    public value: string | Blob | null,
    public mediaType: eContentType | null,
    public description?: string | null,
  ) {}
}

export type iMemorycardContent = InstanceType<typeof MemorycardContentObj>;

export interface iMemoryCardStatistics {
  validationTotal: number;
  devaluationTotal: number;
  maxLevelReached: number;
  totalPoints: number;
}

export interface iHistoricEntry {
  statusAt: eMemorycardStatus;
  validationLevel: number;
  date: string;
}
export class HistoricEntryObj {
  constructor(
    statusAt: eMemorycardStatus,
    validationLevel: number,
    date: string,
  ) {}
}
export type tHistoricEntry = InstanceType<typeof HistoricEntryObj>;
