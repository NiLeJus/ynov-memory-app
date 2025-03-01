import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  output,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { eContentType } from 'src/_models/app.enums';
import { iMemorycardContent } from 'src/_models/domains/memorycard.models';

@Component({
  selector: 'app-add-content',
  imports: [FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './add-content.component.html',
  styleUrl: './add-content.component.scss',
})
export class AddContentComponent {
  _CONTENT_TYPE_ENUM = eContentType;
  selContentType: WritableSignal<eContentType> = signal(
    this._CONTENT_TYPE_ENUM.text
  );
  readonly memorycardTypes = Object.values(this._CONTENT_TYPE_ENUM); // Transforme en tableau pour itérer dessus

  destroyComponent = signal(false);

  returned_content = signal({
    value: '',
    mediaType: this.selContentType(),
    description: '',
  });

  onChangeMedia(newContentType: eContentType) {
    this.selContentType.set(newContentType);
  }

  dataSent = output<iMemorycardContent>();

  isMediaSelected(media: eContentType): boolean {
    return media === this.selContentType();
  }
  async onValidate() {
    this.isContentValid();
    this.dataSent.emit(this.returned_content());
    const isDestroyed = await this.destroyComponent();

    if (isDestroyed === true) {
     this.ngOnDestroy()
    }
  }
  ngOnDestroy() {}
  isContentValid() {}
}
