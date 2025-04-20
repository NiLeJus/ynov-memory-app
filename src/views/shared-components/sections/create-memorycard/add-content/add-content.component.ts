import {
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  inject,
  output,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { eContentType } from 'src/_models/enums/app.enums';
import { tMemcardContent, MemcardContentObj } from 'src/_models/memcard.model';
import { MediaTreatmentService } from 'src/services/media-treatment.service';

@Component({
  selector: 'app-add-content',
  imports: [FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './add-content.component.html',
  styleUrl: './add-content.component.scss',
})
export class AddContentComponent {
  //#region CORE
  ENUM_CONTENT_TYPE = eContentType; // Expose l'enum
  readonly memorycardTypes = Object.values(this.ENUM_CONTENT_TYPE); // Transforme en tableau pour itérer dessus
  //#endregion

  mediaTreatmentService = inject(MediaTreatmentService);

  //#region COMPONENT LIFECYCLES
  ngOnDestroy() {}
  previewUrl: string | null = null;
  isImage = false;
  fileName = '';
  fileType = '';
  error = '';
  //#endregion

  //#region FORMS & INPUT

  mediaTypeSlct: WritableSignal<eContentType> = signal(
    this.ENUM_CONTENT_TYPE.Text,
  );

  textValueInput: WritableSignal<string> = signal('');
  descrValueInput: WritableSignal<string> = signal('');
  fileBlobInput: WritableSignal<Blob> = signal(new Blob());

  onChangeMedia(newContentType: eContentType) {
    console.log('New Media type', newContentType);
    this.mediaTypeSlct.set(newContentType);
  }

  isMediaSelected(media: eContentType): boolean {
    return media === this.mediaTypeSlct();
  }

  async onValidate() {
    this.dataSent.emit(this.factoryContent());
    this.ngOnDestroy();
  }

  //#endregion

  //#region EVENT OUTPUT DATA
  destroyComponent = signal(false);
  dataSent = output<tMemcardContent>();

  //#endregion

  dev() {}

  clearFile() {
    this.previewUrl = null;
    this.fileType = '';
    this.error = '';
  }

  onImageSelected(event: Event): Promise<Blob> {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      return this.mediaTreatmentService.convertFileToBlob(input.files[0]);
    } else {
      throw new Error('OnimageSected Error');
    }
  }

  // Modification de la méthode onFileSelected
  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    try {
      const blob = await this.mediaTreatmentService.convertFileToBlob(file);
      this.fileBlobInput.set(blob);

      this.previewUrl =
        await this.mediaTreatmentService.generatePreviewUrl(blob);

      this.fileName = file.name;
      this.fileType = file.type;
      this.isImage = this.mediaTreatmentService.isImageType(file);
    } catch (err) {
      this.error = 'Erreur lors du traitement du fichier';
    }
  }
  //#region FACTORY CONTENT

  factoryContent() {
    if (this.mediaTreatmentService.isAudioType(this.fileBlobInput())) {
      this.mediaTypeSlct.set(this.ENUM_CONTENT_TYPE.Audio);
    }
    console.log('file is', this.mediaTypeSlct());

    switch (this.mediaTypeSlct()) {
      case this.ENUM_CONTENT_TYPE.Text:
        console.log('is text');
        return new MemcardContentObj(this.textValueInput(), eContentType.Text);
      default:
        console.log('is else');
        console.log(this.fileBlobInput());
        return new MemcardContentObj(
          this.fileBlobInput(),
          this.mediaTypeSlct(),
          this.descrValueInput(),
        );
    }
  }

  //#endregion
}
