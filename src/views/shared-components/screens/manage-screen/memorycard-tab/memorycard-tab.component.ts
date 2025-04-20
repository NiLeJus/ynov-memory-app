import { Component, computed, input, Input } from '@angular/core';
import { MemorycardValLevelComponent } from '../../../shared-components/memory-card/memorycard-val-level/memorycard-val-level-val.component';
import { tMemcard } from 'src/_models/memcard.model';

@Component({
  selector: 'app-memorycard-tab',
  imports: [MemorycardValLevelComponent],
  templateUrl: './memorycard-tab.component.html',
  styleUrl: './memorycard-tab.component.scss',
})
export class MemorycardTabComponent {
  _memorycardData$ = input<tMemcard>();

  _card = computed<tMemcard>((): tMemcard => {
    //handler
    return this._card();
  });

  getCardValidationLevel() {
    return this._memorycardData$()?.validationLevel;
  }
}
