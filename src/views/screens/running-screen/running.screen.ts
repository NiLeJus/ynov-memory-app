import {
  Component,
  computed,
  inject,
  Signal,
  WritableSignal,
} from '@angular/core';
import { tMemcard } from 'src/_models/memcard.model';
import { RunStore } from 'src/services/stores/run-store.service';
import { CardDisplayerComponent } from '../../sections/card-displayer/card-displayer.component';
import { tEventPayload } from 'src/_models/generics.model';
import { RunEndingComponent } from 'src/views/sections/run-ending/run-ending.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-running-screen',
  imports: [CardDisplayerComponent, RunEndingComponent],
  templateUrl: './running.screen.html',
  styleUrl: './running.screen.scss',
})
export class RunningScreenComponent {
  //#region Dependencies

  public runStore = inject(RunStore);
  readonly cardLeftToRun: Signal<tMemcard[]> = this.runStore.cardsLeftToRun;
  readonly cardToRun: Signal<tMemcard | undefined> = this.runStore.currentCard;
  //#endregion

  constructor(private router: Router) {
    this.notRunningFallback();
  }

  //#region USER EVENTS

  receivedPayload!: tEventPayload;

  handleNextCard($event: tEventPayload) {}

  //#endregion

  onQuit() {
    console.log('Not Implemented');
  }

  notRunningFallback() {
    if (!this.runStore.isPlayerRunning()) {
      this.router.navigate(['/run']);
    }
  }
}
