import { Injectable } from '@angular/core';
import { eMemcardType, eContentType } from 'src/_models/enums/app.enums';
import {
  tMemcardContent,
  MemcardObj,
  tMemcard,
} from 'src/_models/memcard.model';

@Injectable({ providedIn: 'root' })
export class FactoriesService {
  constructor() {}

  //#region Core

  ENUM_MEMORYCARD_TYPE = eMemcardType;
  ENUM_MEMORYCARD_CONTENT = eContentType;
  readonly memorycardTypes = Object.values(this.ENUM_MEMORYCARD_TYPE); // Transforme en tableau pour itéré

  //#endregion

  /**
   * Créer une carte
   * @title Titre de la carte
   * @cardType Type de la card (cf enum_memcard_type)
   * @recto recto content
   * @verso verso content
   */
  makeMemcard(
    title: string,
    cardType: eMemcardType,
    recto: tMemcardContent[],
    verso: tMemcardContent[],
  ): tMemcard | false {
    const args = [...arguments];
    let newMemoryCard = new MemcardObj(
      crypto.randomUUID(),
      title,
      cardType,
      recto,
      verso,
      0,
      [],
    );
    console.log('Created Memory Card', newMemoryCard);
    return newMemoryCard;
  }

  /**
   * Show a Bootstrap alert dynamically.
   * @param message The message to display in the alert.
   * @param type The type of alert (e.g., 'success', 'danger', 'info', etc.).
   */
  makeMemTheme() {}
}
