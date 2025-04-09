import { MemcardContentObj, tMemcard } from './memcard.model';

export class ProfileObj {
  constructor(
    public id: string,
    public name: string,
    public themes: tMemTheme[],
    public statistics: tProfileStats,
    public nextSession?: number | null,
  ) {}
}

export type tProfile = InstanceType<typeof ProfileObj>;

export class ProfileStatsObj {
  constructor(
    public runsDone: number,
    public scoreAllTime: number,
    public scoreNow: number,
  ) {}
}

export type tProfileStats = InstanceType<typeof ProfileStatsObj>;

export type tMemTheme = {
  id: string;
  name: string;
  cards: tMemcard[] | [];
  themes?: tMemTheme[];
};

export class MemThemeObj {
  constructor(
    public id: string,
    public name: string,
    public cards: tMemcard[] | [],
    public themes?: tMemTheme[],
  ) {}
}
