//#region MEMCARD

import { DateFormatYMD } from './app.types';
import {
  eMemcardType,
  eContentType,
  eMemcardStatus,
  eOrderFilter,
  ineligibleMemcardStatus,
} from './business.enums';
import { DateTime } from 'luxon';

const datePh: DateFormatYMD = '2024-04-19';

export class MemcardObj {
  public Historic: HandlerHistoric;
  public Statistics: HandlerStatistics;

  constructor(
    public id: string,
    public title: string,
    public cardType: eMemcardType,
    public recto: tMemcardContent[],
    public verso: tMemcardContent[],
  ) {
    this.Historic = new HandlerHistoric(this, []);
    this.Statistics = new HandlerStatistics(this);
  }

  static constructFromTemplate(
    memcardTemplate: MemcardTemplate,
  ): tMemcard | void {
    return new MemcardObj(
      crypto.randomUUID(),
      memcardTemplate.title,
      memcardTemplate.cardType,
      memcardTemplate.recto,
      memcardTemplate.verso,
    );
  }

  get historics(): tHistoricEntry[] {
    return this.Historic.entries;
  }

  get creationDate(): DateTime {
    return this.historics[this.historics.length - 1].date;
  }

  get valLevel(): number {
    return this.historics[0].valLevel;
  }

  get recentHistoEntry(): tHistoricEntry {
    return this.historics[0];
  }

  get oldestHistoEntry(): tHistoricEntry {
    console.warn('oldest histo entry is not', eMemcardStatus.Creation);
    return this.historics[this.historics.length - 1];
  }

  onValidate() {
    this.processMemcard(false);
  }

  onDevalidate() {
    this.processMemcard(false);
  }

  private processMemcard(hasPassed: boolean) {
    return {};
  }

  processNewValLevel(hasPassed: boolean): number {
    if (this.valLevel <= 0) {
      return 0;
    } else {
      return hasPassed ? this.valLevel + 1 : this.valLevel - 1;
    }
  }
}

export type tMemcard = InstanceType<typeof MemcardObj>;

/* Class to store templates data for sharing content
 * Only content no config
 */
export class MemcardTemplate {
  constructor(
    public title: string = '',
    public cardType: eMemcardType,
    public recto: tMemcardContent[],
    public verso: tMemcardContent[],
    public validationLevel: number,
  ) {}
}

export type tMemcardTemplate = InstanceType<typeof MemcardTemplate>;

//#endregion

//#region  HISTORIC REL
/* To manipulate historic */
export class HandlerHistoric {
  constructor(
    private parent: MemcardObj,
    public entries: tHistoricEntry[],
  ) {
    this.onCreation(datePh);
  }

  private daysSpacing(valLevel: number): number {
    let spaceDays: number = 0;

    for (let i = valLevel; i == 0; i--) {
      spaceDays = spaceDays * 2;
    }

    console.log('Space days is', spaceDays);
    return spaceDays;
  }

  isTomorrow(): DateTime {
    return DateTime.now().plus({ days: 1 });
  }

  addNewEntry(
    statusAt: eMemcardStatus,
    newValLevel: number,
    nexValidationDate?: string | undefined,
  ) {
    let date = DateTime.now();

    this.entries.unshift(
      new HistoricEntry(
        statusAt,
        DateTime.now(),
        newValLevel,
        this.processNextDate(),
      ),
    );
  }

  onCreation(dateNow: string) {
    const newHistoricEntry = new HistoricEntryObj(
      eMemcardStatus.Creation,
      dateNow,
      0,
      dateNow,
    );
    this.entries.unshift(newHistoricEntry);
  }

  /* Initialise l'historique
   * A utiliser à la création de l'historique pour la première fois
   */
  init() {
    if (this.entries.length < 0) {
      throw new Error(
        'Method init has been called, but historic has already values in',
      );
    } else {
    }
  }

  /** Return the next date
   * @param newValLevel
   */
  private processNextDate(newValLevel: number): DateTime {
    //is Tomorrow
    if (newValLevel === 0) {
      return DateTime.now().plus({ days: 1 });
    }

    let date = DateTime.now();
    date.plus({ days: this.daysSpacing(newValLevel) + 1 });
    return date;
  }

  debbinghaus() {
    return DateTime.now().plus({ minutes: 10 });
  }
}

export class HistoricEntry {
  constructor(
    public statusAt: eMemcardStatus,
    public date: DateTime,
    public valLevel: number,
    public nexValidationDate?: DateTime,
  ) {}
}
export type tHistoricEntry = InstanceType<typeof HistoricEntry>;

//#endregion

//#region  STATISTICS REL
/* Used for getting statistics about the card
 *
 *
 */
export class HandlerStatistics {
  constructor(private _parent: MemcardObj) {}

  get streak(): StreakStatObj {
    const historic: HistoricEntry[] = this._parent.historics;
    return new StreakStatObj(
      eMemcardStatus.Validated,
      this._countStreak(historic[0].statusAt),
    );
  }

  get devalAmount(): number {
    return this._count(eMemcardStatus.NotValidated);
  }
  get valAmount(): number {
    return this._count(eMemcardStatus.Validated);
  }
  get runnedAmount(): number {
    return this._countFromArray([
      eMemcardStatus.NotValidated,
      eMemcardStatus.Validated,
    ]);
  }

  getStatObj() {}

  /* Count the number of
   *
   */
  private _count(toCount: eMemcardStatus): number {
    let acc = 0;

    this._parent.historics.forEach((entry: tHistoricEntry) => {
      switch (entry?.statusAt) {
        case toCount:
          acc++;
          break;
        default:
          break;
      }
    });
    return acc;
  }

  private _countFromArray(toCount: eMemcardStatus[]): number {
    return this._parent.historics.filter((entry: tHistoricEntry) =>
      toCount.includes(entry?.statusAt),
    );
  }

  private _countStreak(toCount: eMemcardStatus): number {
    const historic = this._parent.historics;

    let count = (): number => {
      let count = 0;

      for (const entry of historic) {
        if (entry?.statusAt === toCount) {
          count++;
        } else {
          break;
        }
      }
      return count;
    };

    return count();
  }

  private _streak(): number {
    const historic: HistoricEntry[] = this._parent.historics;

    function isEligible(): boolean {
      const mostRecentStatus = historic[0].statusAt;
      return ineligibleMemcardStatus.includes(mostRecentStatus);
    }

    if (isEligible()) {
      return {};
    } else {
      return {};
    }
  }
}
//#endregion

//#region MEMCARD CONTENT

export class MemcardContentObj {
  constructor(
    public value: string | Blob, //^ check db performance, Should use file ref + dependencies
    public mediaType: eContentType,
    public description?: string,
    public alt?: string,
    public source?: string,
  ) {}
}

export type tMemcardContent = InstanceType<typeof MemcardContentObj>;

//#endregion

//#region  HandlerStatistics

//#endregion

//Used for displaying streak
export class StreakStatObj {
  constructor(
    public status: eMemcardStatus | 'none',
    public streak: number,
  ) {}
}
