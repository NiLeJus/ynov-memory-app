import { DatabaseService } from 'src/services/database/database.service';
import {
  Component,
  EventEmitter,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { AddContentComponent } from './add-content/add-content.component';
import { LockedContentComponent } from './locked-content/locked-content.component';

import { FormsModule } from '@angular/forms';
import { eMemcardType, eContentType } from 'src/_models/enums/app.enums';
import { tMemcardContent } from 'src/_models/memcard.model';
import { FactoriesService } from 'src/services/factories/factories.service';
import { InputValidator } from 'src/services/validator/input-validator.service';

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
  ENUM_MEMORYCARD_TYPE = eMemcardType;
  ENUM_MEMORYCARD_CONTENT = eContentType;
  readonly memorycardTypes = Object.values(this.ENUM_MEMORYCARD_TYPE); // Transforme en tableau pour itéré

  //States pour display le composant d'ajout d'entrée
  isAddingRectoContent = signal(false);
  isAddingVersoContent = signal(false);

  constructor(
    public factoriesService: FactoriesService,
    public databaseService: DatabaseService,
    private iptValidator: InputValidator,
  ) {}
  //#endregion

  //#region MEMORYCARD DATA HOLDERS

  rectoContent: tMemcardContent[] = [];
  versoContent: tMemcardContent[] = [];

  //#endregion

  //#region USER INPUT & FORMS
  newCardTitle: string = '';
  selCardType: eMemcardType = this.ENUM_MEMORYCARD_TYPE.Classic; //Default

  @Output() notifyProcessEnded = new EventEmitter<boolean>();

  onInputChange(newValue: eMemcardType): void {
    this.selCardType = newValue;
    console.log('Valeur sélectionnée :', this.selCardType);
  }
  //#endregion

  //#region RECEIVE EVENT & DATA
  handleData(event: tMemcardContent, rectoOrVerso: 'verso' | 'recto'): boolean {
    console.log('Received Data', event);
    switch (rectoOrVerso) {
      case 'verso':
        console.log(`received verso`);
        this.isAddingVersoContent.set(false);
        this.versoContent.push(event);
        break;
      case 'recto':
        console.log(`received recto`);

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

  isInputValid(): boolean {
    if (
      this.iptValidator.isMinLengthMet(this.newCardTitle, 8) ||
      this.iptValidator.isMaxLengthMet(this.newCardTitle, 50)
    ) {
      return false;
    } else {
      return true;
    }
  }

  onValidate() {
    console.log('recto', this.rectoContent);
    console.log('verso', this.versoContent);

    const newMemcard = this.factoriesService.makeMemcard(
      this.newCardTitle,
      this.selCardType,
      this.rectoContent,
      this.versoContent,
    );

    if (newMemcard === false) {
      console.error('this.factoriesService.makeMemcard returned false wtf');
    } else {
      this.databaseService.addNewCard(newMemcard);
    }
    this.onQuit();
  }

  onQuit() {
    this.notifyProcessEnded.emit(false);
  }

  onPreview() {
    console.log(this.rectoContent);
  }
}
