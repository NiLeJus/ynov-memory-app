export interface ChainLink {
  setNext(handler: ChainLink): ChainLink;
  validate(value: string): string | null;
}

