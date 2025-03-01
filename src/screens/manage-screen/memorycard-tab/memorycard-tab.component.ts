import { Component, computed, input, Input } from '@angular/core';
import { MemorycardValLevelComponent } from '../../../shared-components/memory-card/memorycard-val-level/memorycard-val-level-val.component';
import { iMemorycard } from 'src/_models/domains/memorycard.models';

@Component({
  selector: 'app-memorycard-tab',
  imports: [MemorycardValLevelComponent],
  templateUrl: './memorycard-tab.component.html',
  styleUrl: './memorycard-tab.component.scss',
})
export class MemorycardTabComponent {
  _memorycardData$ = input<iMemorycard>();

  _card = computed<iMemorycard>((): iMemorycard => {
    //handler
    return this._card();
  });

  getCardValidationLevel() {
    return this._memorycardData$()?.validationLevel;
  }
}
