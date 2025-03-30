import { tMemcard } from './memcard.model';

export type dateFormatDMY = `${number}-${number}-${number}`;

export type tEventPayload = {
  memcardId: tMemcard['id'];
  hasPassed: boolean;
};
