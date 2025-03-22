import { MediaTreatmentService } from './../../../services/media-treatment.service';
import { Description } from './../../../../node_modules/@compodoc/compodoc/node_modules/jackspeak/dist/commonjs/index.d';
import {
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  output,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { eContentType } from 'src/_models/app.enums';
import {
  iMemorycardContent,
  MemorycardContentObj,
} from 'src/_models/domains/memorycard.models';

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
  constructor(public mediaTreatmentService: MediaTreatmentService) {}
  //#endregion

  //#region COMPONENT LIFECYCLES
  ngOnDestroy() {}

  //#endregion

  //#region FORMS & INPUT

  mediaTypeSlct: WritableSignal<eContentType> = signal(
    this.ENUM_CONTENT_TYPE.Text,
  );
  textValueInput2: string = '';

  textValueInput: WritableSignal<string> = signal('');
  descrValueInput: WritableSignal<string> = signal('');
  fileBlobInput: WritableSignal<Blob> = signal(new Blob());

  onChangeMedia(newContentType: eContentType) {
    this.mediaTypeSlct.set(newContentType);
  }

  isMediaSelected(media: eContentType): boolean {
    return media === this.mediaTypeSlct();
  }

  async onValidate() {
    // this.isContentValid();
    this.dataSent.emit(this.FactoryContent());
    this.ngOnDestroy();
  }
  //#endregion

  //#region EMIT EVENT & DATA
  destroyComponent = signal(false);
  dataSent = output<iMemorycardContent>();
  //#endregion

  dev() {}

  async onImageSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      try {
        const blob = await this.mediaTreatmentService.fileToBlob(file);

        // Exemple : Générer une URL pour afficher l'image
        console.log('URL Blob :', blob);

        // Afficher l'image dans le DOM
        this.fileBlobInput.set(blob);
      } catch (error) {
        console.error('Erreur lors du traitement de l’image :', error);
      }
    }
  }

  //#region FACTORY CONTENT

  FactoryContent() {
    switch (this.mediaTypeSlct()) {
      case this.ENUM_CONTENT_TYPE.Text:
        return new MemorycardContentObj(
          this.textValueInput(),
          eContentType.Text,
        );
      default:
        return new MemorycardContentObj(
          this.fileBlobInput(),
          this.mediaTypeSlct(),
        );
    }
  }

  //#endregion
}
