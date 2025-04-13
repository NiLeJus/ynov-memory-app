import { ProfileObj, tProfile } from './../_models/profile.model';
import { Component, inject, OnInit, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalDispComponent } from '../services/displayer/modal-disp/modal-disp.component';
import { BrandHeaderComponent } from 'src/views/organism/brand-header/brand-header.component';
import { LandingScreenComponent } from 'src/views/screens/landing-screen/landing.screen';
import { ManageScreenComponent } from 'src/views/screens/manage-screen/manage-screen';
import { CardDisplayerComponent } from 'src/views/sections/card-displayer/card-displayer.component';
import { CreateMemorycardComponent } from 'src/views/sections/create-memorycard/create-memorycard.component';
import { NotificationService } from 'src/services/notification.service';
import { InputListenerComponent } from '../views/shared-components/input-listener/input-listener.component';
import { SwUpdate } from '@angular/service-worker';
import { DateTime } from 'luxon';
import { MemcardObj, tHistoricEntry } from 'src/_models/memcard.model';
import { MemcardActionsService } from 'src/services/actions/memcard.actions';
import { DateStore } from 'src/services/stores/date-store.service';
import { DatabaseService } from 'src/services/database/database.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { fadeAnimation } from 'src/anims/fade-animation';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    BrandHeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [fadeAnimation],
})
export class AppComponent implements OnInit {
  title = 'memory-app';

  private memcardActionsService = inject(MemcardActionsService);
  databaseService = inject(DatabaseService);
  dateStore = inject(DateStore);
  notificationService = inject(NotificationService);

  _users = this.databaseService.users$;

  async ngOnInit() {
    interval(3600000).subscribe(() => {
      this.safeProcessUsers();
    });
    this.safeProcessUsers();

    this.updates.versionUpdates.subscribe((evt) => {
      if (evt.type === 'VERSION_READY') {
        this.updates.activateUpdate().then(() => document.location.reload());
      }
    });

    this.dateStore.triggerObservable.subscribe(() => {
      this.safeProcessUsers();
    });
  }

  private async safeProcessUsers() {
    console.log('Mise à jour quotidienne effectuée');
    try {
      await this.processAllUsers(this._users());
    } catch (error) {
      console.error('Erreur lors de la mise à jour', error);
    }
  }

  private async processAllUsers(users: ProfileObj[]): Promise<void> {
    const usersCopy = structuredClone(users);

    for (const user of usersCopy) {
      for (const theme of user.themes) {
        theme.cards = await Promise.all(
          theme.cards.map(async (memcard) => {
            const updatedCard = await this.processCardUntilValid(memcard);
            await this.databaseService.updateMemcardByIDWithUserID(
              updatedCard,
              user.id,
            );
            return updatedCard;
          }),
        );
      }
    }
  }

  constructor(private updates: SwUpdate) {
    this.safeProcessUsers();
  }

  async processCardUntilValid(memcard: MemcardObj): Promise<MemcardObj> {
    let currentCard = structuredClone(memcard); //!important
    let iterations = 0;
    console.log('current card', currentCard);

    while (iterations < 10) {
      if (!this.isValidationDatePast(currentCard)) break;

      try {
        currentCard = this.memcardActionsService.processCard(
          currentCard,
          false,
        );
        return currentCard;
      } catch (error) {
        break;
      }
    }
    console.log('current card after', currentCard);

    return currentCard;
  }

  private isValidationDatePast(card: MemcardObj): boolean {
    const nextDate = card.Historic[0].nexValidationDate;
    const today = DateTime.fromISO(this.dateStore.$nowFormatted());
    return DateTime.fromISO(nextDate!).startOf('day') < today;
  }

  // permissionGranted = false;
  // permissionDenied = false;

  // async askPermission(): Promise<void> {
  //   const granted = await this.notificationService.requestPermission();
  //   if (granted) {
  //     this.permissionGranted = true;
  //     console.log('Permission accordée pour les notifications.');
  //   } else {
  //     this.permissionDenied = true;
  //     console.log('Permission refusée pour les notifications.');
  //   }
  // }
}
