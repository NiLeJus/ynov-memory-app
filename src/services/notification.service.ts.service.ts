import { Injectable, inject, NgZone } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { tMemcard } from '../_models/memcard.model';
import { DatabaseService } from './database/database.service';
import { tProfile } from 'src/_models/profile.model';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private swPush = inject(SwPush);
  private dbService = inject(DatabaseService);
  private ngZone = inject(NgZone);
  private notificationShown = new Set<string>();

  init() {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => this.checkDueCards(), 3600000); // Vérification toutes les heures
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
            this.showNotification(card);
          }
        }
      }
    }
  }

  private async showNotification(card: tMemcard) {
    if (this.notificationShown.has(card.id)) return;

    const title = `Révision requise : ${card.title}`;
    const options = {
      body: `Niveau de validation actuel : ${card.validationLevel}`,
      icon: '/assets/icon-192x192.png',
      data: { cardId: card.id },
    };

    if (this.swPush.isEnabled) {
      await this.swPush.requestSubscription({
        serverPublicKey: 'VOTRE_CLE_VAPID',
      });
      this.swPush.messages.subscribe(() => {
        new Notification(title, options);
        this.notificationShown.add(card.id);
      });
    } else {
      Notification.requestPermission().then((perm) => {
        if (perm === 'granted') {
          new Notification(title, options);
          this.notificationShown.add(card.id);
        }
      });
    }
  }
}
