import {
  Component,
  computed,
  inject,
  input,
  signal,
  WritableSignal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from 'src/services/database/database.service';
import { AlertService } from 'src/services/displayer/alert.service';
import { StoreGlobalService } from 'src/services/stores/global-store/global-store.service';
import { tProfile } from 'src/_models/profile.model';
import { ProfileCreationComponent } from '../profile-creation/profile-creation.component';
import { ProfileExportService } from 'src/services/json-services/export/profile-export.service';

@Component({
  selector: 'app-profile-tab',
  imports: [FormsModule, RouterLink, ProfileCreationComponent],
  templateUrl: './profile-tab.component.html',
  styleUrl: './profile-tab.component.scss',
})
export class ProfileTabComponent {
  readonly _user = input<tProfile>();
  newUsername = '';

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
    const user = this._user(); // Get the user object from the input signal
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
}
