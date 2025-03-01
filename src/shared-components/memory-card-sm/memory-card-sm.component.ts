import { Component, input } from '@angular/core';
import { iMemorycard } from 'src/_models/domains/memorycard.models';

@Component({
  selector: 'app-memory-card-sm',
  imports: [],
  templateUrl: './memory-card-sm.component.html',
  styleUrl: './memory-card-sm.component.scss',
})
export class MemoryCardSmComponent {
  _memoryCard = input<iMemorycard>();
}
