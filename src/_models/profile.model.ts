import { MemcardContentObj, tMemcard } from './memcard.model';

export class ProfileObj {
  constructor(
    public id: number,
    public name: string,
    public nextSession?: number | null,
    public themes?: tMemTheme[],
    public statistics?: tProfileStatistics,
  ) {}
}

export type tProfile = InstanceType<typeof ProfileObj>;

export interface tProfileStatistics {
  runsDone: number;
  scoreAllTime: number;
  scoreNow: number;
}

export interface tMemTheme {
  id: string;
  name: string;
  cards: tMemcard[] | [];
  themes?: tMemTheme[];
}
