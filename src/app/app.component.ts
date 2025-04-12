import { ProfileObj, tProfile } from './../_models/profile.model';
import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  Signal,
  untracked,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DevBarComponent } from '../_dev/dev-bar/dev-bar.component';
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

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    LandingScreenComponent,
    DevBarComponent,
    CreateMemorycardComponent,
    ManageScreenComponent,
    ModalDispComponent,
    CardDisplayerComponent,
    BrandHeaderComponent,
    InputListenerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [fadeAnimation],
})
export class AppComponent implements OnInit {
  title = 'memory-app';

  //! Need rework for prod

  private notifService = inject(NotificationService);
  private memcardActionsService = inject(MemcardActionsService);
  databaseService = inject(DatabaseService);
  dateStore = inject(DateStore);
  notificationService = inject(NotificationService);

  _users: Signal<tProfile[]> = toSignal(this.databaseService.getAllUsers$(), {
    initialValue: [],
  });

  async ngOnInit() {
    this.notifService.init();

    this.updates.versionUpdates.subscribe((evt) => {
      if (evt.type === 'VERSION_READY') {
        this.updates.activateUpdate().then(() => document.location.reload());
      }
    });
  }

  constructor(private updates: SwUpdate) {
    effect(() => {
      const users = this._users();
      untracked(() => this.processAllUsers(users));
    });

    //Ecoute les changement de date pour rerun en dev
    //! remove in prod
    // Réaction aux changements de date
    effect(() => {
      this.dateStore.$nowFormatted(); // Écoute les changements de date
      untracked(() => this.processAllUsers(this._users()));
    });
  }

  private async processAllUsers(users: ProfileObj[]): Promise<void> {
    for (const user of users) {
      console.log('in user', user);
      for (const theme of user.themes) {
        console.log('in theme', theme);
        for (const memcard of theme.cards) {
          console.log('in memcard', memcard);

          await this.processCardUntilValid(memcard);
        }
      }
    }
  }

  async processCardUntilValid(memcard: MemcardObj): Promise<MemcardObj> {
    let currentCard = memcard;

    while (this.isValidationDatePast(currentCard)) {
      try {
        currentCard = await this.memcardActionsService.processCard(
          currentCard,
          false,
        );
      } catch (error) {
        console.error('Erreur lors du traitement de la carte', error);
        break;
      }
    }

    return currentCard;
  }

  private isValidationDatePast(card: MemcardObj): boolean {
    if (!card.Historic?.length) return false;

    const mostRecentEntry: tHistoricEntry = card.Historic[0];
    const nextValidationDate = DateTime.fromISO(
      mostRecentEntry.nexValidationDate!,
    );

    // const today = DateTime.local().startOf('day');
    const today = DateTime.fromISO(this.dateStore.now());

    console.log('mostRecentEntry', mostRecentEntry);
    console.log('nextValidationDate', nextValidationDate);

    console.log(
      'Is Past',
      nextValidationDate.isValid && nextValidationDate < today,
    );
    return nextValidationDate.isValid && nextValidationDate < today;
  }

  permissionGranted = false;
  permissionDenied = false;

  async askPermission(): Promise<void> {
    const granted = await this.notificationService.requestPermission();
    if (granted) {
      this.permissionGranted = true;
      console.log('Permission accordée pour les notifications.');
    } else {
      this.permissionDenied = true;
      console.log('Permission refusée pour les notifications.');
    }
  }
}
