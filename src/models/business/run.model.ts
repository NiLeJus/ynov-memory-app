import { tMemcard } from "./memcard.model";

export class RunObj {
  constructor(
    public id: string,
    public date: string,
    public count: number,
    public cardToRun: tMemcard[] | [],
    public cardRunned: tMemcard[] | [],
  ) {}

  onProcesMemcard() {

  }

  provideCardToRun() {
    
  }



}
