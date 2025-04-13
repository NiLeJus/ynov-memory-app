import {
  Component,
  computed,
  inject,
  input,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from 'src/services/database/database.service';
import { AlertService } from 'src/services/displayer/alert.service';
import { StoreGlobalService } from 'src/services/stores/global-store/global-store.service';
import { tMemTheme, tProfile } from 'src/_models/profile.model';
import { ProfileCreationComponent } from '../profile-creation/profile-creation.component';
import { ProfileExportService } from 'src/services/json-services/export/profile-export.service';
import { IndicatorHasRunComponent } from '../../../../atoms/indicator-has-run/indicator-has-run.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { DateTime } from 'luxon';
import { tMemcard } from 'src/_models/memcard.model';
import { DateStore } from 'src/services/stores/date-store.service';
import { TextHasRunComponent } from '../../../../atoms/text-has-run/text-has-run.component';

@Component({
  selector: 'app-profile-tab',
  imports: [
    FormsModule,
    RouterLink,
    ProfileCreationComponent,
    IndicatorHasRunComponent,
    TextHasRunComponent,
  ],
  templateUrl: './profile-tab.component.html',
  styleUrl: './profile-tab.component.scss',
})
export class ProfileTabComponent {
  readonly _user = input<tProfile>();
  newUsername = '';

  public dateStore = inject(DateStore);
  databaseService = inject(DatabaseService);
  alertService = inject(AlertService);
  storeGlobalService = inject(StoreGlobalService);
  profileExportService = inject(ProfileExportService);

  isRenaming: WritableSignal<boolean> = signal(false);

  onUserSelection(): void {
    const userId = this._user()?.id;
    if (userId != undefined) {
      this.storeGlobalService.changeCurrentUserId(userId);
    }
  }

  onModifyProfile(state: boolean) {
    this.isRenaming.set(state);
    this.newUsername = this._user()!.name;
  }

  onDeleteProfile(): any {
    const user = this._user();
    if (user && user.id) {
      this.databaseService
        .deleteUserById(user.id)
        .then(() => {
          console.log(`User with ID ${user.id} deleted successfully.`);
        })
        .catch((error) => {
          console.error(`Failed to delete user with ID ${user.id}:`, error);
        });
    } else {
      console.error('User or User ID is undefined.');
    }
  }

  async onDownload(userId: tProfile['id']) {
    await this.profileExportService.exportUserData(userId);
  }

  onCancelRenaiming() {
    this.isRenaming.set(false);
  }

  async onValidateRenaiming(): Promise<void> {
    this.isRenaming.set(false);
    const userId: tProfile['id'] = this._user()!.id;
    const newName: string = this.newUsername;
    const result = await this.databaseService.modifyUsername(userId, newName);

    if (result.status === 'ok') {
      console.log('Utilisateur enregistré avec succès.');
      this.alertService.showAlert(
        'Utilisateur enregistré avec succès.',
        'success',
      );
    } else {
      console.error(
        "Erreur lors de l'enregistrement de l'utilisateur :",
        result.error,
      );
      this.alertService.showAlert(
        'Utilisateur enregistré avec succès.',
        'danger',
      );
    }
  }

  _userThemes$ = computed(() => {
    return this._user()?.themes;
  });

  hasUserRunToDo(): boolean {
    const themes = this._userThemes$() ?? [];

    return themes.some((theme) => {
      const cards = this.cardsToValidate(theme);
      return Array.isArray(cards) && cards.length > 0;
    });
  }

  cardsToValidate(theme: tMemTheme): tMemcard[] | false {
    const _now = DateTime.fromISO(this.dateStore.now()).startOf('day');
    if (!_now.isValid) {
      throw new Error('Invalid date: _now is not a valid DateTime');
    }

    let filteredMemcard = theme.cards.filter((memcard) => {
      if (!memcard.Historic || !memcard.Historic[0].nexValidationDate) {
        throw new Error('Invalid : memcard.Historic is null');
      }

      const nextValidationDate = DateTime.fromISO(
        memcard.Historic[0].nexValidationDate,
      );

      if (!nextValidationDate.isValid) {
        throw new Error('Invalid date: _now is not a valid DateTime');
      }

      return nextValidationDate.startOf('day').hasSame(_now, 'day');
    });

    return filteredMemcard;
  }
}
