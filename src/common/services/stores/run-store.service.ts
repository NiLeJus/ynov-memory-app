import { tMemTheme } from './../../_models/profile.model';
import { computed, inject, Injectable, signal } from '@angular/core';
import { DateTime } from 'luxon';
import { Observable } from 'rxjs';
import { tMemcard } from 'src/_models/memcard.model';
import { MemcardActionsService } from '../actions/memcard.service';

@Injectable({
  providedIn: 'root',
})
export class RunStore {
  public cardsLeftToRun = signal<tMemcard[]>([]);
  public cardRunned = signal<tMemcard[]>([]);
  public isPlayerRunning = signal<boolean>(false);
  themesLeftToRun = signal<tMemTheme[]>([]);

  memcardActions = inject(MemcardActionsService);

  switchIsPlayerRunning(newState?: boolean) {
    this.isPlayerRunning.set(newState ?? !this.isPlayerRunning());
  }

  // Calculer la carte actuelle (première du tableau)
  public currentCard = computed<tMemcard | undefined>(() => {
    return this.cardsLeftToRun()[0];
  });

  constructor() {}

  private removeFirstCard(): void {
    this.cardsLeftToRun.update((cards) => {
      if (cards.length === 0) return [];
      const [removed, ...remaining] = cards;
      this.cardRunned.update((runned) => [...runned, removed]);
      return remaining;
    });
  }

  notifyValidation(hasPassed: boolean, memcard: tMemcard) {
    const updatedMemcard: tMemcard = this.memcardActions.processCard(
      memcard,
      hasPassed,
    );

    this.memcardActions.updateMemcardInDB(updatedMemcard);

    this.cardsLeftToRun.update((cards) => {
      return [{ ...updatedMemcard }, ...cards.slice(1)];
    });

    this.removeFirstCard();
  }

  initRun() {
    this.switchIsPlayerRunning(false);
  }

  setMemcardsToRun(memCards: tMemcard[]): boolean {
    console.log(memCards);
    // this.flattenEntry(memThemes);
    this.cardsLeftToRun.set(memCards);
    console.log(this.cardsLeftToRun());

    return true;
  }

  flattenEntry(themes: tMemTheme[]): tMemcard[] {
    // Aplatir toutes les cartes en un seul tableau
    const flattenCards: tMemcard[] = themes.map((theme) => theme.cards).flat();

    return flattenCards;
  }

  updateMemcardInDB() {}

  hasBeenProceed(memcardId: tMemcard['id'], hasPassed: boolean) {}

  onRunFinished() {
    this.cardRunned.set([]);
    this.cardsLeftToRun.set([]);
    this.isPlayerRunning.set(false);
  }
}
