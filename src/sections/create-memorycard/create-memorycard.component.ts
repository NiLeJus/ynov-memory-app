import { Component, signal, WritableSignal } from '@angular/core';
import { eContentType, eMemorycardType } from '../../_models/app.enums';
import { AddContentComponent } from './add-content/add-content.component';
import { LockedContentComponent } from './locked-content/locked-content.component';
import {
  iMemorycardContent,
  MemorycardObject,
  MemorycardPrototype,
} from 'src/_models/domains/memorycard.models';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-memorycard',
  imports: [AddContentComponent, LockedContentComponent, FormsModule],
  templateUrl: './create-memorycard.component.html',
  styleUrl: './create-memorycard.component.scss',
})
export class CreateMemorycardComponent {
  ENUM_MEMORYCARD_TYPE = eMemorycardType;
  ENUM_MEMORYCARD_CONTENT = eContentType;
  selCardType: eMemorycardType = this.ENUM_MEMORYCARD_TYPE.Classic;
  readonly memorycardTypes = Object.values(this.ENUM_MEMORYCARD_TYPE); // Transforme en tableau pour itéré
  isAddingRectoContent = signal(false);
  isAddingVersoContent = signal(false);
  pickedCardTypeDescr = {
    CLASSIC: 'Déterminez vous même si vous aviez juste',
    QCM: 'Plusieurs réponses, une ou plusieures de bonnes',
    QUIZZ: 'Vous devez taper la réponse, avec une orthographe juste !',
  };

  rectoContent: iMemorycardContent[] = [];
  versoContent: iMemorycardContent[] = [];

  new_memorycard_prototype = new MemorycardPrototype();

  contentEntry: WritableSignal<iMemorycardContent> = signal({
    value: '',
    mediaType: this.ENUM_MEMORYCARD_CONTENT.text,
    description: 'oui',
  });

  onRectoContent(newValue: boolean) {
    this.isAddingRectoContent.set(newValue);
  }

  onVersoContent(newValue: boolean) {
    this.isAddingVersoContent.set(newValue);
  }

  enumToTable<T extends Record<string, T[keyof T]>>(
    enumObj: T,
  ): Array<T[keyof T]> {
    return Object.values(enumObj);
  }

  onInputChange(newValue: eMemorycardType): void {
    this.selCardType = newValue;
    console.log('Valeur sélectionnée :', this.selCardType);
  }

  onGenerate() {
    console.log('NOT IMPLEMENTED');
  }

  handleData(
    event: iMemorycardContent,
    rectoOrVerso: 'verso' | 'recto',
  ): boolean {
    console.log('Received Data', event);
    switch (rectoOrVerso) {
      case 'verso':
        this.isAddingVersoContent.set(false);

        this.versoContent.push(event);
        break;
      case 'recto':
        this.isAddingRectoContent.set(false);

        this.rectoContent.push(event);
        break;
    }
    return true;
  }

  dev() {}
}
