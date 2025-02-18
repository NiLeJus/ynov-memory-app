export interface iMemoryCard  {
  id: string;
  validationLevel: number; // Niveau de validation (entier)
  lastValidationDate: number; // Date dernière validation (timestamp)
  nextValidationDate: number; // Date prochaine validation (timestamp)
  question: string; // Question sous forme de texte
  media?: { content: string; mediaType: 'img' | 'audio' | 'video' }; // Média optionnel avec son type et contenu
  answer: string; // Réponse sous forme de texte
};

export interface iMemoryTheme {
  id?: string;
  title: string;
  cardsRef : string[];
};

  