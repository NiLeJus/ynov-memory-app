import { Injectable } from '@angular/core';
import { ChainLink } from '../_models/systems/chain-responsibility.models';

@Injectable({
  providedIn: 'root',
})
export class FormValidatorService {
  constructor() {}

  isUserNameValid(inputUsername: any) {
    const notEmpty = new NotEmptyHandler();
    const maxLength = new MaxLengthHandler(20);

    notEmpty.setNext(maxLength);

    const error = notEmpty.validate(inputUsername);

    if (error) {
      console.log('Erreur de validation :', error);
    } else {
      console.log('Validation réussie !');
    }
  }
}

class NotEmptyHandler implements ChainLink {
  private nextHandler?: ChainLink;

  setNext(handler: ChainLink): ChainLink {
    this.nextHandler = handler;
    return handler;
  }

  validate(value: string): string | null {
    if (!value || value.trim() === '') {
      return 'La valeur ne doit pas être vide.';
    }
    return this.nextHandler ? this.nextHandler.validate(value) : null;
  }
}

class MaxLengthHandler implements ChainLink {
  private maxLength: number;
  private nextHandler?: ChainLink;

  constructor(maxLength: number) {
    this.maxLength = maxLength;
  }

  setNext(handler: ChainLink): ChainLink {
    this.nextHandler = handler;
    return handler;
  }

  validate(value: string): string | null {
    if (value.length > this.maxLength) {
      return `La longueur maximale est ${this.maxLength} caractères.`;
    }
    return this.nextHandler ? this.nextHandler.validate(value) : null;
  }
}
