import { eContentType, eMemorycardStatus, eMemorycardType } from '../app.enums';
import { ISODateString } from '../generics.models';

//*MEMORYCARD
export class MemorycardObject {
  constructor(
    public id: string | null,
    public cardType?: typeof eMemorycardType | null,
    public lastValidationDate?: ISODateString | null | number,
    public nextValidationDate?: ISODateString | null | number,
    public title: string = '',
    public recto: iMemorycardContent[] | null = null,
    public verso: iMemorycardContent[] | null = null,
    public validationLevel: number = 0,
    public Statistics?: iMemoryCardStatistics,
    public Historic: iHistoricEntry[] | null = null
  ) {}
}

export type iMemorycard = InstanceType<typeof MemorycardObject>;
export type tMemorycard = InstanceType<typeof MemorycardObject>;

export class MemorycardPrototype {
  constructor(
    public cardType?: eMemorycardType | null,
    public title: string = '',
    public recto: iMemorycardContent[] | null = null,
    public verso: iMemorycardContent[] | null = null
  ) {}
}

export type iMemorycardPrototype = InstanceType<typeof MemorycardPrototype>;
export type tMemorycardPrototype = InstanceType<typeof MemorycardPrototype>;

//*MEMORYCARD CONTENT
export class MemorycardContent {
  constructor(
    public value: string,
    public mediaType: eContentType,
    public description?: string | null
  ) {}
}

export type iMemorycardContent = InstanceType<typeof MemorycardContent>;

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
