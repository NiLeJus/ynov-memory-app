import { tMemcard } from './memcard.model';

export type dateFormatDMY = `${number}-${number}-${number}`;

export type tEventPayload = {
  memcardId: tMemcard['id'];
  hasPassed: boolean;
};

export class GenericIconsPathObj {
  [key: string]: string;

  constructor(properties: { [key: string]: string }) {
    Object.keys(properties).forEach((key) => {
      this[key] = properties[key];
    });
  }
}
export class TimestampTrigger {
  constructor(triggerAt: number) {}
}

declare global {
  export interface NotificationOptions {
    showTrigger?: TimestampTrigger;
  }
}
