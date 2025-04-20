import { MemcardObj, tMemcardPrototype } from './business/memcard.model';
import { ProfileObj, tMemTheme, tProfile } from './business/profile.model';

export class FactoryMemcard {
  constructor() {}

  FromPrototype(
    payload: tMemcardPrototype | tMemcardPrototype[],
  ): MemcardObj[] {
    return [];
  }

  FromData(): MemcardObj[] {
    return [];
  }
}

export class FactoryMemtheme {
  constructor() {}

  FromTemplate(
    payload: tMemcardPrototype | tMemcardPrototype[],
  ): MemcardObj[] {
    return [];
  }

  

  FromData(): MemcardObj[] {
    return [];
  }
}

export class FactoryProfile {
  constructor() {}

  FromData(name: tProfile['name'], profileThemes?: tMemTheme[]) {
    return new ProfileObj(
      crypto.randomUUID(),
      name,
      profileThemes ?? [],
      this.makeStatObj(),
    );
  }


  initStatObject() {}
}
