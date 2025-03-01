import { eOrderFilter } from '../../_models/app.enums';
import {
  Component,
  input,
  OnInit,
  signal,
  WritableSignal,
  effect,
  computed,
  Signal,
  resource,
  ResourceRef,
} from '@angular/core';
import { MemoryCardComponent } from '../../shared-components/memory-card/memory-card.component';
import { MemoryCardSmComponent } from '../../shared-components/memory-card-sm/memory-card-sm.component';
import { ContentFiltersComponent } from '../../shared-components/content-filters/content-filters.component';
import { iMemoryTheme } from 'src/_models/domains/theme.models';
import { iMemorycard } from 'src/_models/domains/memorycard.models';

@Component({
  selector: 'app-run-preview-section',
  imports: [MemoryCardSmComponent, ContentFiltersComponent],
  templateUrl: './run-preview.section.component.html',
  styleUrl: './run-preview.section.component.scss',
})
export class RunPreviewSectionComponent implements OnInit {
  // readonly _themes = input<iMemoryTheme[] | undefined>([]);

  // _selectedThemes: ResourceRef<iMemoryTheme[] | undefined | void> = resource({
  //   loader: async () => {
  //     const response = this.dataService.getFocusedThemes();
  //     console.log(response);
  //     return response;
  //   },
  // });

  // _selectedCards: ResourceRef<iMemorycard[] | undefined | void> = resource({
  //   loader: async () => {
  //     const response = this.dataService.getAllFocusedCards();
  //     return response;
  //   },
  // });

  // _selectedLevels = computed(() => {
  //   const selectedCards = this._selectedCards.value();

  //   if (!selectedCards) {
  //     return [];
  //   }

  //   const initialData = [
  //     { validationLevel: 0, count: 0 },
  //     { validationLevel: 1, count: 0 },
  //     { validationLevel: 2, count: 0 },
  //     { validationLevel: 3, count: 0 },
  //     { validationLevel: 4, count: 0 },
  //   ];

  //   return selectedCards.reduce((acc, card) => {
  //     if (!card) {
  //       return acc;
  //     }
  //     const level = acc.find(
  //       (item) => item.validationLevel === card.validationLevel
  //     );

  //     if (level) {
  //       level.count++;
  //     }

  //     return acc;
  //   }, initialData);
  // });

  // _selectedPoints = computed(() => {
  //   const selectedLevels = this._selectedLevels();

  //   if (!selectedLevels) {
  //     return [];
  //   }

  //   let totalPoints = 0;

  //   selectedLevels.forEach((entry) => {
  //     totalPoints += entry.count * entry.validationLevel;
  //   });

  //   return totalPoints;
  // });

  // _selectedCardCount = computed(() => {
  //   return this._selectedCards.value.length;
  // });

  // _remainingTime = signal('13h');

  ngOnInit(): void {}
}
