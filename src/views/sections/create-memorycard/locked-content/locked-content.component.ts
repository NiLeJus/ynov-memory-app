import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  Input,
  input,
  InputSignal,
  output,
  Signal,
  signal,
  SimpleChanges,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { eContentType } from 'src/_models/enums/app.enums';
import { tMemcard, tMemcardContent } from 'src/_models/memcard.model';
import { MediaTreatmentService } from 'src/services/media-treatment.service';

@Component({
  selector: 'app-locked-content',
  imports: [],
  templateUrl: './locked-content.component.html',
  styleUrl: './locked-content.component.scss',
})
export class LockedContentComponent {
  //#region CORE
  readonly _CONTENT_TYPE = input<eContentType>();

  @Input() _entry!: tMemcardContent;

  //#endregion
  mediaTreatmentService = inject(MediaTreatmentService);

  //#region EMIT EVENT & DATA
  onDeleteMeEvent = output<true>();

  isPlaying = signal(false);

  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

  playPause() {
    if (this.isPlaying()) {
      this.audioPlayer.nativeElement.pause();
    } else {
      this.audioPlayer.nativeElement.play();
    }
    this.isPlaying.set(!this.isPlaying());
  }

  uniqueId = `modal-${Math.random().toString(36).substr(2, 9)}`;
  //#endregion
  isImage = false;
  fileName = '';
  fileType = '';
  //#region USER INPUTS / EVENTS
  blob: Signal<Blob | undefined> = computed(() => {
    const value = this._entry.value;
    return (this._entry.mediaType === 'IMAGE' ||
      this._entry.mediaType === 'AUDIO') &&
      value instanceof Blob
      ? value
      : undefined;
  });

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['_entry'] && this.blob()) {
      await this.handlePreview(this.blob()!);
    }
  }
  previewUrl = signal<string | null>(null);

  constructor() {
    effect(() => {
      const currentBlob = this.blob();
      if (currentBlob) {
        this.handlePreview(currentBlob);
      }
    });
  }

  private async handlePreview(blob: Blob) {
    try {
      const url = await this.mediaTreatmentService.generatePreviewUrl(blob);
      this.previewUrl.set(url);

      //force le reload du lecteur
      if (blob.type.startsWith('audio/')) {
        setTimeout(() => {
          if (this.audioPlayer?.nativeElement) {
            this.audioPlayer.nativeElement.load();
            this.isPlaying.set(false);
          }
        }, 100);
      }
    } catch (error) {
      this.previewUrl.set(null);
    }
  }

  isBlob(value: any): value is Blob {
    return value instanceof Blob;
  }

  onDev() {
    console.log('Type MIME:', this.blob()?.type);
    console.log('Taille:', this.blob()?.size);
    console.log('URL:', this.previewUrl());
  }

  onModify() {
    console.log('');
  }

  onSupr() {
    console.log('Onsupr');
    this.onDeleteMeEvent.emit(true);
  }

  //#endregion

  dev() {
    console.log(this.getIconToDisplay());
  }

  getIconToDisplay(): string {
    const contentType = this._CONTENT_TYPE()?.toLowerCase();
    return `app-icons/ico-${contentType}-file.svg`;
  }
}
