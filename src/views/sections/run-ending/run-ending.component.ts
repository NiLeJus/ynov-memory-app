import { RunStore } from 'src/services/stores/run-store.service';
import { Component, inject } from '@angular/core';
import { tMemcard } from 'src/_models/memcard.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-run-ending',
  imports: [],
  templateUrl: './run-ending.component.html',
  styleUrl: './run-ending.component.scss',
})
export class RunEndingComponent {
  router = inject(Router);
  runStore = inject(RunStore);
  runnedMemcards: tMemcard[] = this.runStore.cardRunned();

  onClickDev(memcard: tMemcard) {
    console.log(memcard.Historic);
  }

  onNext() {
    this.runStore.onRunFinished();
    this.router.navigate(['']);
  }
}
