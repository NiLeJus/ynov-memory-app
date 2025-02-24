export interface iMemoryCard {
  id: string;
  validationLevel: number; // Niveau de validation (entier)
  lastValidationDate: number; // Date dernière validation (timestamp)
  nextValidationDate: number; // Date prochaine validation (timestamp)
  recto: (string | iCardMedia)[];
  verso: (string | iCardMedia)[];
}
export interface iCardMedia {
  path: string;
  mediaType: 'img' | 'audio' | 'video';
  description?: string;
}
export interface iMemoryTheme {
  id?: number;
  name: string;
  cardFW: number[];
  cards?: iMemoryCard[];
}
export interface iUser {
  id: number;
  selected: boolean;
  name: string; // Niveau de validation (entier)
  nextSession?: number | null ; // Date dernière validation (timestamp) | null  quand il n'y en a pas encore de prévu
  themes?: iMemoryTheme[];
  statistics: iProfileStatistics;
}
export interface iProfileStatistics {
  runsDone: number;
  scoreAllTime: number;
  scoreNow: number;
}


