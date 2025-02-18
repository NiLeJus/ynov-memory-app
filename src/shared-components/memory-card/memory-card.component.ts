import { Component, input, computed } from '@angular/core';
import { iMemoryCard } from '../../_models/app.interfaces';
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
  _memoryCard = input<iMemoryCard>();
  cardId?: string = this._memoryCard()?.id;

  //User related
  userAnswer: string = ''; // Variable liée au textarea
  hasUserAnswered: boolean = false;

  userValidation() {
    console.log(this.userAnswer);

    if (!this.userAnswer) {
      console.error('No answer provided or answer is null / undefined');
    }

    this.hasUserAnswered = true;
    if (this.isAnswerValid()) {
      this.jsonService.changeCardValidation(this.cardId, 'add');
    } else {
      this.jsonService.changeCardValidation(this.cardId, 'sub');
    }
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
