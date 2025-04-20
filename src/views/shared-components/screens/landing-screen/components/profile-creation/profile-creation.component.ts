import { InputValidator } from './../../../../../services/validator/input-validator.service';
import { FormsModule } from '@angular/forms';
import {
  Component,
  EventEmitter,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { DatabaseService } from 'src/services/database/database.service';
import { AlertService } from 'src/services/displayer/alert.service';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-profile-creation',
  imports: [FormsModule],
  templateUrl: './profile-creation.component.html',
  styleUrl: './profile-creation.component.scss',
})
export class ProfileCreationComponent {
  inputUsername: string = '';
  isNameTakenFlag: boolean = false;

  constructor(
    private databaseService: DatabaseService,
    private alertService: AlertService,
    private iptValidator: InputValidator,
  ) {
    this.inputChangeSubject
      .pipe(debounceTime(150)) //Délais
      .subscribe(() => this.checkUsernameAvailability());
  }

  @Output() notifyProcessEnded = new EventEmitter<boolean>();

  isInputValid(): boolean {
    return (
      this.iptValidator.isMaxLengthMet(this.inputUsername, 15) &&
      this.iptValidator.isMinLengthMet(this.inputUsername, 3)
    );
  }

  async checkUsernameAvailability() {
    this.isNameTakenFlag = await this.databaseService.isNameTakenInDB(
      this.inputUsername,
    );
  }

  private inputChangeSubject = new Subject<string>();

  handleInputChange() {
    this.inputChangeSubject.next(this.inputUsername);
  }

  async onValidate() {
    const result = await this.databaseService.registerNewUser(
      this.inputUsername,
    );

    if (result.status === 'ok') {
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
