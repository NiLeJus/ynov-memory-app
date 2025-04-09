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
import { MemcardObj, StreakStatObj, tMemcard } from 'src/_models/memcard.model';
import { InputModDetector } from 'src/services/input-mod-detector.service';
import { MemcardIconService } from 'src/services/memcard-icon.service';
import { MemcardStatsService } from 'src/services/memcard-stats.service';
import { RunStore } from 'src/services/stores/run-store.service';

@Component({
  selector: 'app-card-displayer',
  imports: [],
  templateUrl: './card-displayer.component.html',
  styleUrl: './card-displayer.component.scss',
})
export class CardDisplayerComponent implements OnInit {
  runStore = inject(RunStore);
  private modalityService = inject(InputModDetector); //Laisser unused
  public memcardStats = inject(MemcardStatsService);
  public memcardIcon = inject(MemcardIconService);

  //#region DEPENDENCIES ENUMS
  ENUM_MEMOCARD_TYPE = eMemcardType;
  ENUM_MEMCARD_CONTENT = eContentType;
  ENUM_MEMCARD_STATUS = eMemcardStatus;
  readonly memcardStatus = Object.values(this.ENUM_MEMCARD_STATUS); // Transforme en Array pour itérer

  //#endregion

  //#region INPUT / DATA
  @Input('currentMemcard') memcard?: tMemcard;
  @Output() onNotifyParent = new EventEmitter<tEventPayload>();

  val = signal(0);
  deval = signal(0);

  get historic(): MemcardObj['Historic'] {
    return this.memcard?.Historic ?? [];
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
  ngOnInit(): void {}
  //#endregion

  //#region EVENTS & USERINPUT

  onValidate(hasPassed: boolean, memecard: tMemcard) {
    this.switchIsRevealed();
    this.runStore.notifyValidation(hasPassed, memecard);
  }

  onReveal() {
    this.switchIsRevealed();
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
      this.onValidate(false, this.memcard!);
    } else {
      return;
    }
  }

  onArrowRight(): void {
    if (this.isRevealed()) {
      this.onValidate(true, this.memcard!);
    } else {
      return;
    }
  }

  onSwipeUp(event?: HammerInput): void {
    console.log('Swipe haut', event?.deltaY);
    this.onArrowUp();
  }

  onSwipeDown(event?: HammerInput): void {
    console.log('Swipe bas', event?.deltaY);
    this.onArrowDown();
  }

  onSwipeLeft(event?: HammerInput): void {
    console.log('Swipe gauche', event?.deltaX);
    this.onArrowLeft();
  }

  onSwipeRight(event?: HammerInput): void {
    console.log('Swipe droit', event?.deltaX);
    this.onArrowRight();
  }

  //#endregion

  streakHandler(memcardHistoric: tMemcard['Historic']): StreakStatObj | void {
    return this.memcardStats.calculateStreak(memcardHistoric);
  }
}
