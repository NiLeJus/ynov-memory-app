import { Component, input, computed } from '@angular/core';
import { tMemoryCard } from '../../_models/app.interfaces';
import { FormsModule } from '@angular/forms';
import { JsonService } from '../../services/json.service';

@Component({
  selector: 'app-memory-card',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './memory-card.component.html',
  styleUrls: ['./memory-card.component.scss'],
})
export class MemoryCardComponent {
  constructor(private jsonService: JsonService) {}

  //Memory Card
  _memoryCard = input<tMemoryCard>();
   cardUid: string | undefined;


  //User related
  userAnswer: string = ''; // Variable liée au textarea
  hasUserAnswered: boolean = false;

  userValidation() {
    console.log(this.userAnswer);
    this.hasUserAnswered = true;
      this.jsonService.changeCardValidation(this.cardUid);
  }

  isAnswerValid(): boolean {
    const memoryCard = this._memoryCard();
    if (!memoryCard) {
      console.error('Memory card is undefined');
      return false;
    }

    const trueAnswer = memoryCard.answer;
    if (trueAnswer === this.userAnswer) {
      console.log('This answer is valid');
      return true;
    }

    return false;
  }
}

/*
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
*/
