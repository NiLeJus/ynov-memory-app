import { Component, input, computed } from '@angular/core';
import { tMemoryCard } from '../../_models/app.interfaces';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-memory-card',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './memory-card.component.html',
  styleUrls: ['./memory-card.component.scss'],
})
export class MemoryCardComponent {
  //Memory Card
  _memoryCard = input<tMemoryCard | undefined>();

  lastValidationDate = computed(() => {
    const memoryCard = this._memoryCard();
    if (memoryCard && memoryCard.lastValidationDate) {
      return new Date(memoryCard.lastValidationDate);
    }
    return console.error(
      'memoryCard et/ou memoryCard.lastValidationDate are Null'
    );
  });

  nextValidationDate = computed(() => {
    const memoryCard = this._memoryCard();
    if (memoryCard && memoryCard.nextValidationDate) {
      return new Date(memoryCard.nextValidationDate);
    }
    return console.error(
      'memoryCard et/ou memoryCard.nextValidationDate are Null'
    );
  });

  //User related
  userAnswer: string = ''; // Variable liée au textarea
  hasUserAnswered: boolean = false;

  UserValidation() {
    console.log(this.userAnswer);
    this.hasUserAnswered = true;
  }

  //Need to Implement letter Case compatiility
  IsAnswerValid(): boolean {
    const trueAnswer = this._memoryCard()?.answer;
    if (trueAnswer == this.userAnswer) {
      console.log('this answer is valid');
      return true;
    }
    return false;
  }
}
