import {
  Component,
  effect,
  EventEmitter,
  HostListener,
  inject,
  input,
  Input,
  OnInit,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  eMemcardType,
  eContentType,
  eMemcardStatus,
} from 'src/_models/enums/app.enums';
import { tEventPayload } from 'src/_models/generics.model';
import { MemcardObj, tMemcard } from 'src/_models/memcard.model';
import { RunStore } from 'src/services/stores/run-store.service';

@Component({
  selector: 'app-card-displayer',
  imports: [],
  templateUrl: './card-displayer.component.html',
  styleUrl: './card-displayer.component.scss',
})
export class CardDisplayerComponent implements OnInit {
  runStore = inject(RunStore);

  //#region DEPENDENCIES ENUMS
  ENUM_MEMOCARD_TYPE = eMemcardType;
  ENUM_MEMCARD_CONTENT = eContentType;
  ENUM_MEMCARD_STATUS = eMemcardStatus;
  readonly memcardStatus = Object.values(this.ENUM_MEMCARD_STATUS); // Transforme en Array pour itérer

  //#endregion

  //#region INPUT / DATA
  @Input('currentMemcard') memecard?: tMemcard;
  @Output() onNotifyParent = new EventEmitter<tEventPayload>();

  val = signal(0);
  deval = signal(0);

  get historic(): MemcardObj['Historic'] {
    return this.memecard?.Historic ?? [];
  }
  //#endregion

  //#region COMPONENT STATE
  isRevealed: WritableSignal<boolean> = signal(false);

  switchIsRevealed(newState?: boolean) {
    this.isRevealed.set(newState ?? !this.isRevealed());
  }
  //#endregion

  //#region COMPONENT LIFECYCLE
  constructor() {}
  ngOnInit(): void {
    this.calculateStats();
    this.calculateStreak();
  }
  //#endregion

  //#region EVENTS & USERINPUT

  onValidate(hasPassed: boolean, memecard: tMemcard) {
    this.switchIsRevealed();
    this.runStore.notifyValidation(hasPassed, memecard);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp':
        console.log('Fleche haut pressed');
        this.onArrowUp();
        break;
      case 'ArrowDown':
        console.log('Fleche bas pressed');
        this.onArrowDown();
        break;
      case 'ArrowLeft':
        console.log('Fleche gauche pressed');
        this.onArrowLeft();
        break;
      case 'ArrowRight':
        console.log('Flèche droite pressée');
        this.onArrowRight();
        break;
    }
  }

  onArrowUp(): void {
    if (this.isRevealed()) {
    } else {
      this.switchIsRevealed(true);
    }
  }

  onArrowDown(): void {
    if (this.isRevealed()) {
    } else {
      this.switchIsRevealed(true);
    }
  }

  onArrowLeft(): void {
    if (this.isRevealed()) {
      this.onValidate(false, this.memecard!);
    } else {
      this.switchIsRevealed();
    }
  }

  onArrowRight(): void {
    if (this.isRevealed()) {
      this.onValidate(true, this.memecard!);
    } else {
      this.switchIsRevealed();
    }
  }

  //#endregion

  calculateStats() {
    this.historic.forEach((entry: any) => {
      switch (entry?.statusAt) {
        case this.ENUM_MEMCARD_STATUS.Validated:
          this.val.set(this.val() + 1);
          console.log(this.val());
          break;
        case eMemcardStatus.NotValidated:
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

  //Utilisé pour compter le nb de fois que la carte a étée jouée
  historicEntries() {
    if (this.memecard?.Historic) {
      return this.memecard?.Historic.length;
    } else return 0;
  }

  onReveal() {
    this.switchIsRevealed();
  }
}
