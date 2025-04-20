import { MemcardContentObj, tMemcard } from './memcard.model';

export class ProfileObj {
  constructor(
    public id: string,
    public name: string,
    public Themes: HandlerThemeObj,
    public statistics: tProfileStats,
    public config?: ConfigObj,
    public nextSession?: number | null,
  ) {}

  get themes(): MemThemeObj[] {
    return this.Themes.payload;
  }
}

class ConfigObj {
  constructor(
    public notificationsEnabled: boolean,
    public preferDarkMode: boolean,
  ) {}
}

class StatisticsObj {
  constructor() {}
}

export type tProfile = InstanceType<typeof ProfileObj>;

export class ProfileStatsObj {
  constructor(
    public runsDone: number,
    public cardsRunned?: number,
  ) {}

  cardHasBeenRunned() {}

  scoreAllTime() {}

  cardAmountPerLevel() {}
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

export class HandlerThemeObj {
  constructor(public payload: tMemTheme[]) {}
}

export class MemThemeEntry {
  constructor(
    public id: string,
    public name: string,
    public cards: tMemcard[] | [],
    public themes?: tMemTheme[],
  ) {}
}

export type tMemthemeEntry = InstanceType<typeof MemThemeEntry>;
