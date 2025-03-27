import { Component, input, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { tMemcard } from 'src/_models/memcard.model';

@Component({
  selector: 'app-memory-card',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './memory-card.component.html',
  styleUrls: ['./memory-card.component.scss'],
})
export class MemoryCardComponent {
  //Memory Card
  _memoryCard = input<tMemcard>();
  // cardId?: string = this._memoryCard()?.id;

  //User related
  userAnswer: string = ''; // Variable liée au textarea
  hasUserAnswered: boolean = false;

  userValidation() {
    console.log(this.userAnswer);

    if (!this.userAnswer) {
      console.error('No answer provided or answer is null / undefined');
    }

    this.hasUserAnswered = true;
  }
}
