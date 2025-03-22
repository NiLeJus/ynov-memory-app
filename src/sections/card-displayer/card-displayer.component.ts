import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Entity } from 'dexie';
import {
  eContentType,
  eMemorycardStatus,
  eMemorycardType,
} from 'src/_models/app.enums';
import {
  MemorycardContentObj,
  MemorycardObject,
} from 'src/_models/domains/memorycard.models';

@Component({
  selector: 'app-card-displayer',
  imports: [],
  templateUrl: './card-displayer.component.html',
  styleUrl: './card-displayer.component.scss',
})
export class CardDisplayerComponent implements OnInit {
  //#region DATA PLACEHOLDER

  memorycard = new MemorycardObject(
    1,
    'What is the capital of France?',
    eMemorycardType.Classic,
    [
      new MemorycardContentObj(
        'What is the capital of France?',
        eContentType.Text,
        'A simple geography question.',
      ),
    ],
    [
      new MemorycardContentObj(
        'Paris',
        eContentType.Text,
        'The capital of France.',
      ),
    ],
    3,
    [
      {
        statusAt: eMemorycardStatus.Validated,
        validationLevel: 2,
        date: '2025-12-01',
      },
      {
        statusAt: eMemorycardStatus.Validated,
        validationLevel: 1,
        date: '2025-08-01',
      },
      {
        statusAt: eMemorycardStatus.NotValidated,
        validationLevel: 0,
        date: '2025-06-01',
      },
      {
        statusAt: eMemorycardStatus.Validated,
        validationLevel: 0,
        date: '2025-05-01',
      },
      {
        statusAt: eMemorycardStatus.Validated,
        validationLevel: 1,
        date: '2025-03-01',
      },
    ],
    {
      validationTotal: 4,
      devaluationTotal: 1,
      maxLevelReached: 3,
      totalPoints: 120,
    },
  );
  //#endregion

  ENUM_MEMOCARD_TYPE = eMemorycardType;
  ENUM_MEMCARD_CONTENT = eContentType;
  ENUM_MEMCARD_STATUS = eMemorycardStatus;
  readonly memcardStatus = Object.values(this.ENUM_MEMCARD_STATUS); // Transforme en tableau pour itéré

  historic = this.memorycard.Historic;

  val = signal(0);
  deval = signal(0);

  ngOnInit(): void {
    this.calculateStats();
    this.calculateStreak();
  }

  calculateStats() {
    this.historic.forEach((entry) => {
      switch (entry?.statusAt) {
        case this.ENUM_MEMCARD_STATUS.Validated:
          this.val.set(this.val() + 1);
          console.log(this.val());
          break;
        case eMemorycardStatus.NotValidated:
          this.deval.set(this.deval() + 1);
          console.log(this.deval());
          break;
      }
    });
  }

  calculateStreak(): number {
    const lastStatus = this.historic[0]?.statusAt; // Dernier statut
    let count = 0;

    if (lastStatus === this.ENUM_MEMCARD_STATUS.Creation) {
      return count;
    }

    // Parcour entries pour calculer la streak
    for (const entry of this.historic) {
      if (entry?.statusAt === lastStatus) {
        count++;
      } else {
        break;
      }
    }

    console.log(`This card has a streak of ${count} of ${lastStatus}`);
    return count;
  }

  isRevealed: WritableSignal<boolean> = signal(false);

  switchIsRevealed() {
    this.isRevealed.set(!this.isRevealed());
  }

  //Utilisé pour compter le nb de fois que la carte a étée jouée
  historicEntries() {
    if (this.memorycard.Historic) {
      return this.memorycard.Historic.length;
    } else return 0;
  }

  onReveal() {
    this.switchIsRevealed();
  }

  onRight() {}

  onWrong() {}
}
