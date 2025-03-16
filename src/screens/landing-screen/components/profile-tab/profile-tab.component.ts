import { StoreGlobalService } from './../../../../services/store-global.service';
import {
  Component,
  computed,
  input,
  signal,
  WritableSignal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../../../../services/database/database.service';
import { AlertService } from '../../../../services/alert.service';
import { iProfile } from 'src/_models/domains/profile.models';

@Component({
  selector: 'app-profile-tab',
  imports: [FormsModule, RouterLink],
  templateUrl: './profile-tab.component.html',
  styleUrl: './profile-tab.component.scss',
})
export class ProfileTabComponent {
  readonly _user = input<iProfile>();
  newUsername = '';
  constructor(
    private databaseService: DatabaseService,
    private router: Router,
    private alertService: AlertService,
    private storeGlobalService: StoreGlobalService,
  ) {}

  isRenaming: WritableSignal<boolean> = signal(false);

  onUserSelection(): void {
    const userId = this._user()?.id;
    if (userId != undefined) {
      this.storeGlobalService.changeCurrentUserId(userId);
    }
  }

  onModifyProfile(state: boolean) {
    this.isRenaming.set(state);
  }

  onDeleteProfile(): void {
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

  async onValidateRenaiming(): Promise<void> {
    this.isRenaming.set(false);
    const userId: number = this._user()!.id;
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
