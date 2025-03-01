import { Component, input } from '@angular/core';

@Component({
  selector: 'app-memorycard-val-level',
  imports: [],
  templateUrl: './memorycard-val-level.component.html',
  styleUrl: './memorycard-val-level.component.scss',
})
export class MemorycardValLevelComponent {
  // _lvlVal = Level Validation
  _valLvlToDisplay = input<number>();
  folderPath = '/assets/';

  dev() {
    console.log(this._valLvlToDisplay());
  }

  getValLevelIco(): string | null {
    const _valLvlToDisplay = this._valLvlToDisplay();
    return `${this.folderPath}Level=${_valLvlToDisplay}.svg`;
  }
}
