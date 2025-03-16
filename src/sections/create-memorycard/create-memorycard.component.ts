import { FactoriesService } from './../../services/factories.service';
import { Component, signal, WritableSignal } from '@angular/core';
import { eContentType, eMemorycardType } from 'src/_models/app.enums';
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
  //#region STATICS DATA
  pickedCardTypeDescr = {
    CLASSIC: 'Déterminez vous même si vous aviez juste',
    QCM: 'Plusieurs réponses, une ou plusieures de bonnes',
    QUIZZ: 'Vous devez taper la réponse, avec une orthographe juste !',
  };
  //#endregion

  //#region CORE STATE
  ENUM_MEMORYCARD_TYPE = eMemorycardType;
  ENUM_MEMORYCARD_CONTENT = eContentType;
  readonly memorycardTypes = Object.values(this.ENUM_MEMORYCARD_TYPE); // Transforme en tableau pour itéré

  //States pour display le composant d'ajout d'entrée
  isAddingRectoContent = signal(false);
  isAddingVersoContent = signal(false);

  constructor(public factoriesService: FactoriesService) {}
  //#endregion

  //#region MEMORYCARD DATA HOLDERS

  rectoContent: iMemorycardContent[] = [];
  versoContent: iMemorycardContent[] = [];

  //#endregion

  //#region USER INPUT & FORMS
  newCardTitle: string = '';
  selCardType: eMemorycardType = this.ENUM_MEMORYCARD_TYPE.Classic; //Default

  onInputChange(newValue: eMemorycardType): void {
    this.selCardType = newValue;
    console.log('Valeur sélectionnée :', this.selCardType);
  }
  //#endregion

  //#region RECEIVE EVENT & DATA

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

  onRectoContent(newValue: boolean) {
    this.isAddingRectoContent.set(newValue);
  }

  onVersoContent(newValue: boolean) {
    this.isAddingVersoContent.set(newValue);
  }

  handleDeleteEntry($event: any, $index: any, rectoOrVerso: 'verso' | 'recto') {
    console.log('received');
    switch (rectoOrVerso) {
      case 'verso':
        this.versoContent.splice($index);
        break;
      case 'recto':
        this.rectoContent.splice($index);
        break;
    }
    return true;
  }
  //#endregion

  onValidate() {
    console.log(this.rectoContent);
    console.log(this.versoContent);

    this.factoriesService.makeMemoryCard(
      this.newCardTitle,
      this.selCardType,
      this.rectoContent,
      this.versoContent,
    );
  }

  onPreview() {
    console.log(this.rectoContent);
  }

  dev() {}
}
