import { Injectable } from '@angular/core';
import { iProfile } from 'src/_models/domains/profile.models';
import { iMemoryTheme } from 'src/_models/domains/theme.models';
import { Controller } from 'src/_models/systems/controller.models';
import { db } from '../../../_data/db';

@Injectable({
  providedIn: 'root',
})
export class ThemesController implements Controller {
  constructor() {}
  [key: string]: any;


}
