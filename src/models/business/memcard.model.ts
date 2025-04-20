import { MemcardObj } from 'src/_models/memcard.model';
//#region MEMCARD

import { DateFormatYMD } from './app.types';
import {
  eMemcardType,
  eContentType,
  eMemcardStatus,
  eOrderFilter,
} from './business.enums';
import { DateTime } from 'luxon';

const datePh: DateFormatYMD = '2024-04-19';

/* Used for use case
 *
 *
 */
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
    this.Historic = new HandlerHistoric([]);
    this.Statistics = new HandlerStatistics();
  }

  static constructFromTemplate(
    memcardTemplate: MemcardTemplate,
  ): tMemcard | void {}

  get historics(): tHistoricEntry[] {
    return this.Historic.entries;
  }

  get valLevel(): number {
    return this.historics[0].valLevel;
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

  processNewValLevel(hasPassed: boolean) {}
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
/* To manipulate historic
 *
 */
export class HandlerHistoric {
  constructor(public entries: tHistoricEntry[]) {
    this.onCreation(datePh);
  }

  /* Return the amount of spaced day
   * A utiliser à la création de l'historique pour la première fois
   */
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
  constructor() {}

  get streak(): StreakStatObj {
    return new StreakStatObj(eMemcardStatus.Validated, 10);
  }

  get devalAmount(): number {
    return 0;
  }
  get valAmount(): number {
    return 0;
  }

  get runnedAmount(): number {
    return 0;
  }

  getStatObj() {}
}
//#endregion

//#region MEMCARD CONTENT

export class MemcardContentObj {
  constructor(
    public value: string | Blob,
    public mediaType: eContentType,
    public description?: string,
  ) {}
}

export type tMemcardContent = InstanceType<typeof MemcardContentObj>;

//#endregion

//#region  HandlerStatistics

//#endregion

//Used for displaying streak
export class StreakStatObj {
  constructor(
    public status: eMemcardStatus,
    public streak: number,
  ) {}
}
