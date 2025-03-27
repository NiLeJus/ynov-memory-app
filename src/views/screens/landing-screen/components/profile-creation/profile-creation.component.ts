import { InputValidator } from './../../../../../services/validator/input-validator.service';
import { FormsModule } from '@angular/forms';
import { Component, EventEmitter, Output } from '@angular/core';
import { DatabaseService } from 'src/services/database/database.service';
import { AlertService } from 'src/services/displayer/alert.service';

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
    private alertService: AlertService,
    private iptValidator: InputValidator,
  ) {}

  @Output() notifyProcessEnded = new EventEmitter<boolean>();

  isInputValid(): boolean {
    console.log(this.iptValidator.isMaxLengthMet(this.inputUsername, 15));
    console.log(this.iptValidator.isMinLengthMet(this.inputUsername, 3));

    return (
      this.iptValidator.isMaxLengthMet(this.inputUsername, 15) &&
      this.iptValidator.isMinLengthMet(this.inputUsername, 3)
    );
  }

  async onValidate() {
    const result = await this.databaseService.registerNewUser(
      this.inputUsername,
    );

    if (result.status === 'ok') {
      console.log('Utilisateur enregistré avec succès.');
      this.alertService.showAlert(
        'Utilisateur enregistré avec succès.',
        'success',
      );
      this.notifyProcessEnded.emit(true);
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
