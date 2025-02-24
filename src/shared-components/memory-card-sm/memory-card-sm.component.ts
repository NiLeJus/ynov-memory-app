import { Component, input } from '@angular/core';
import { iMemoryCard } from '../../_models/app.interfaces';

@Component({
  selector: 'app-memory-card-sm',
  imports: [],
  templateUrl: './memory-card-sm.component.html',
  styleUrl: './memory-card-sm.component.scss',
})
export class MemoryCardSmComponent {
  _memoryCard = input<iMemoryCard>();
}
