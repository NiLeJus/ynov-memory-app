import {
  AfterViewInit,
  ChangeDetectorRef,
  OnDestroy,
  resource,
} from '@angular/core';
import {
  ResponsiveIconsService,
  IconsPathObj,
} from './../../../services/responsive-icons.service';
import {
  Component,
  computed,
  effect,
  EventEmitter,
  HostListener,
  inject,
  input,
  Input,
  OnInit,
  Output,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {
  eMemcardType,
  eContentType,
  eMemcardStatus,
} from 'src/_models/enums/app.enums';
import { GenericIconsPathObj, tEventPayload } from 'src/_models/generics.model';
import {
  MemcardContentObj,
  MemcardObj,
  StreakStatObj,
  tMemcard,
} from 'src/_models/memcard.model';
import { InputModDetector } from 'src/services/input-mod-detector.service';
import { MediaTreatmentService } from 'src/services/media-treatment.service';
import { MemcardIconService } from 'src/services/memcard-icon.service';
import { MemcardStatsService } from 'src/services/memcard-stats.service';
import { RunStore } from 'src/services/stores/run-store.service';
import { CommonModule, ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-card-displayer',
  imports: [CommonModule],
  templateUrl: './card-displayer.component.html',
  styleUrl: './card-displayer.component.scss',
})
export class CardDisplayerComponent implements OnInit {
  runStore = inject(RunStore);
  private modalityService = inject(InputModDetector); //Laisser unused
  public memcardStats = inject(MemcardStatsService);
  public memcardIcon = inject(MemcardIconService);
  constructor(private viewportScroller: ViewportScroller) {}

  public responsiveIconsService = inject(ResponsiveIconsService);
  //#region DEPENDENCIES ENUMS
  ENUM_MEMOCARD_TYPE = eMemcardType;
  ENUM_MEMCARD_CONTENT = eContentType;
  ENUM_MEMCARD_STATUS = eMemcardStatus;
  readonly memcardStatus = Object.values(this.ENUM_MEMCARD_STATUS); // Transforme en Array pour itérer

  //#endregion

  iconsPathObj: GenericIconsPathObj = this.responsiveIconsService.getIcons();
  mediaTreatmentService = inject(MediaTreatmentService);

  //#region INPUT / DATA
  @Input('currentMemcard') memcard?: tMemcard;
  @Output() onNotifyParent = new EventEmitter<tEventPayload>();

  val = signal(0);
  deval = signal(0);

  async dev(versoContent: MemcardContentObj) {
    console.log('versoContent', versoContent);
  }

  get historic(): MemcardObj['Historic'] {
    return this.memcard?.Historic ?? [];
  }
  //#endregion

  //#region COMPONENT STATE
  isRevealed: WritableSignal<boolean> = signal(false);

  switchIsRevealed(newState?: boolean) {
    this.isRevealed.set(newState ?? !this.isRevealed());
  }

  toFalse() {
    this.isRevealed.set(false);
  }
  //#endregion

  //#region COMPONENT LIFECYCLE
  //#endregion

  //#region EVENTS & USERINPUT

  onValidate(hasPassed: boolean, memecard: tMemcard) {
    this.switchIsRevealed();
    this.runStore.notifyValidation(hasPassed, memecard);
  }

  onReveal() {
    this.scrollToAnchor('anchor');
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

  previewUrlsRecto: Map<number, string> = new Map();
  previewUrlsVerso: Map<number, string> = new Map();

  isValidBlob(content: any): content is Blob {
    return content instanceof Blob && content.size > 0;
  }

  async generatePreviewRecto(index: number, blob: Blob): Promise<void> {
    const url = await this.mediaTreatmentService.generatePreviewUrl(blob);
    this.previewUrlsRecto.set(index, url);
  }
  async generatePreviewVerso(index: number, blob: Blob): Promise<void> {
    const url = await this.mediaTreatmentService.generatePreviewUrl(blob);
    this.previewUrlsVerso.set(index, url);
  }

  async loadPreviewsRecto(memcardRecto: any[]): Promise<void> {
    for (let index = 0; index < memcardRecto.length; index++) {
      const rectoContent = memcardRecto[index];
      if (
        rectoContent.mediaType === this.ENUM_MEMCARD_CONTENT.Image &&
        this.isValidBlob(rectoContent.value)
      ) {
        await this.generatePreviewRecto(index, rectoContent.value);
      }
    }
  }

  scrollToAnchor(anchor: string): void {
    setTimeout(() => {
      this.viewportScroller.scrollToAnchor(anchor);
    }, 1000);
  }

  async loadPreviewsVerso(memcardRecto: any[]): Promise<void> {
    for (let index = 0; index < memcardRecto.length; index++) {
      const rectoContent = memcardRecto[index];
      if (
        rectoContent.mediaType === this.ENUM_MEMCARD_CONTENT.Image &&
        this.isValidBlob(rectoContent.value)
      ) {
        await this.generatePreviewVerso(index, rectoContent.value);
      }
    }
  }

  ngOnInit(): void {
    const memcardRecto = this.memcard?.recto;
    this.loadPreviewsRecto(memcardRecto!);
    const memcardVerso = this.memcard?.verso;
    this.loadPreviewsVerso(memcardVerso!);
  }
}
