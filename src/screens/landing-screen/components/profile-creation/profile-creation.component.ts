import { DatabaseService } from '../../../../services/database/database.service';
import { FormsModule } from '@angular/forms';
import { Component, computed, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../../services/alert.service';

@Component({
  selector: 'app-profile-creation',
  imports: [FormsModule],
  templateUrl: './profile-creation.component.html',
  styleUrl: './profile-creation.component.scss',
})
export class ProfileCreationComponent {
  inputUsername: string = '';
  constructor(
    private databaseService: DatabaseService,
    private alertService: AlertService
  ) {}

  userGuide = computed;

  isMinLengthMet(minValue = 3): boolean {
    return this.inputUsername.length > minValue;
  }

  isMaxLengthMet(maxValue = 20): boolean {
    return this.inputUsername.length < maxValue;
  }

  @Output() notifyProcessEnded = new EventEmitter<boolean>();

  async onValidate() {
    const result = await this.databaseService.registerNewUser(
      this.inputUsername
    );

    if (result.status === 'ok') {
      console.log('Utilisateur enregistré avec succès.');
      this.alertService.showAlert(
        'Utilisateur enregistré avec succès.',
        'success'
      );
      this.notifyProcessEnded.emit(true);
    } else {
      console.error(
        "Erreur lors de l'enregistrement de l'utilisateur :",
        result.error
      );
      this.alertService.showAlert(
        'Utilisateur enregistré avec succès.',
        'danger'
      );
    }
  }
}
