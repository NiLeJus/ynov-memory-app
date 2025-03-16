import { eContentType, eMemorycardType } from 'src/_models/app.enums';
import {
  iMemorycard,
  iMemorycardContent,
  MemorycardObject,
  MemorycardPrototype,
  tMemorycardPrototype,
} from './../_models/domains/memorycard.models';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FactoriesService {
  constructor() {}

  //#region Core

  ENUM_MEMORYCARD_TYPE = eMemorycardType;
  ENUM_MEMORYCARD_CONTENT = eContentType;
  readonly memorycardTypes = Object.values(this.ENUM_MEMORYCARD_TYPE); // Transforme en tableau pour itéré

  //#endregion

  /**
   * Show a Bootstrap alert dynamically.
   * @param message The message to display in the alert.
   * @param type The type of alert (e.g., 'success', 'danger', 'info', etc.).
   */
  makeMemoryCard(
    title: string,
    cardType: eMemorycardType,
    recto: iMemorycardContent[],
    verso: iMemorycardContent[],
  ) {
    // :MemorycardObject
    const args = [...arguments];
    let newMemoryCard = new MemorycardObject(
      null,
      title,
      cardType,
      null,
      null,
      recto,
      verso,
      0,
      null,
    );

    console.log(newMemoryCard);
  }
}
