export type tMemoryCard = {
  validationLevel: number; // Niveau de validation (entier)
  lastValidationDate: number; // Date de la dernière validation (timestamp)
  nextValidationDate: number; // Date de la prochaine validation (timestamp)
  question: string; // Question sous forme de texte
  answer: string; // Réponse sous forme de texte
  media?: { content: string; mediaType: 'img' | 'audio' | 'video' }; // Média optionnel avec son type et contenu
};
