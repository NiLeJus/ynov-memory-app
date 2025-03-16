import { Injectable } from '@angular/core';
import * as AppEnums from '../_models/app.enums';

@Injectable({
  providedIn: 'root',
})
export class EnumsService {
  readonly ENUM_CONTENT_TYPE = AppEnums.eContentType; // Expose l'enum
  readonly memorycardTypes = Object.values(AppEnums.eContentType); // Transforme en tableau pour itérer dessus

  constructor() {}

  getEnumContentType() {
    return this.ENUM_CONTENT_TYPE;
  }

  getTableContentType() {
    return this.memorycardTypes;
  }
}
