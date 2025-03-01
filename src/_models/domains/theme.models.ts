import { iMemorycard } from './memorycard.models';

export interface iMemoryTheme {
  id?: number;
  name: string;
  cards: iMemorycard;
  themes?: iMemoryTheme[];
}
