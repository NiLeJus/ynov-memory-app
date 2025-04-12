import { Injectable, inject, NgZone } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { tMemcard } from '../_models/memcard.model';
import { DatabaseService } from './database/database.service';
import { tProfile } from 'src/_models/profile.model';
import { TimestampTrigger } from 'src/_models/generics.model';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private swPush = inject(SwPush);
  private dbService = inject(DatabaseService);
  private ngZone = inject(NgZone);
  private notificationShown = new Set<string>();

  init() {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => this.checkDueCards(), 3600000);
      this.checkDueCards();
    });
  }

  private async checkDueCards() {
    const today = new Date().toISOString().split('T')[0];

    const users: tProfile[] = await this.dbService.getAllUsers();
    for (const user of users) {
      for (const theme of user.themes || []) {
        for (const card of theme.cards || []) {
          const latestEntry = card.Historic?.[0];
          if (latestEntry?.nexValidationDate?.startsWith(today)) {
            this.showNotification('Carte à réviser', {
              body: `La carte "${card.title}" est due aujourd'hui.`,
              icon: '/assets/icon.png',
            });
          }
        }
      }
    }
  }

  async requestPermission(): Promise<boolean> {
    const result = await Notification.requestPermission();
    return result === 'granted';
  }

  scheduleNotification(
    title: string,
    options: NotificationOptions & { trigger?: Date },
  ): void {
    if ('showTrigger' in Notification.prototype) {
      this.ngZone.runOutsideAngular(() => {
        new Notification(title, {
          ...options,
          showTrigger: new TimestampTrigger(options.trigger!.getTime()),
        } as NotificationOptions);
      });
    } else {
      console.warn('Notification Triggers API non supportée');
      // Fallback avec service worker
    }
  }

  private scheduleViaServiceWorker(
    title: string,
    options: NotificationOptions & { trigger?: Date },
  ): void {
    const delay = options.trigger!.getTime() - Date.now();

    if (delay > 0) {
      setTimeout(() => {
        this.ngZone.run(() => {
          this.swPush
            .requestSubscription({
              serverPublicKey: 'local-notification',
            })
            .then(() => {
              const { trigger, ...swOptions } = options;
              this.showNotification(title, swOptions);
            });
        });
      }, delay);
    }
  }

  private showNotification(title: string, options: NotificationOptions): void {
    this.swPush.messages.subscribe(() => {
      new Notification(title, options);
    });
  }

  checkCondition(
    conditionFn: () => boolean,
    title: string,
    options: NotificationOptions,
  ): void {
    if (conditionFn()) {
      this.showNotification(title, options);
    }
  }


}
