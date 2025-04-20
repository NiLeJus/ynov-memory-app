//Utilisée pour le chainage des vérification d'input

export interface ChainLink {
  setNext(handler: ChainLink): ChainLink;
  validate(value: string): string | null;
}
