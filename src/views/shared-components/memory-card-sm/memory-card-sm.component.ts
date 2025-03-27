import { Component, input } from '@angular/core';
import { tMemcard } from 'src/_models/memcard.model';

@Component({
  selector: 'app-memory-card-sm',
  imports: [],
  templateUrl: './memory-card-sm.component.html',
  styleUrl: './memory-card-sm.component.scss',
})
export class MemoryCardSmComponent {
  _memoryCard = input<tMemcard>();
}
