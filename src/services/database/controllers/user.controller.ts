import { Injectable } from '@angular/core';
import { Controller } from 'src/_models/systems/controller.models';

@Injectable({
  providedIn: 'root',
})
export class UserController implements Controller {
  constructor() {}
  [key: string]: any;
}
