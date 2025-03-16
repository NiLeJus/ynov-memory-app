import { iMemorycard } from './memorycard.models';

export interface iMemoryTheme {
  id: string;
  name: string;
  cards: iMemorycard[] | [];
  themes?: iMemoryTheme[];
}
