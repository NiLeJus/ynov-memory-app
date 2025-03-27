import { InputValidator } from './../../../../services/validator/input-validator.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from 'src/services/database/database.service';

@Component({
  selector: 'app-create-new-theme',
  imports: [FormsModule],
  templateUrl: './create-new-theme.component.html',
  styleUrl: './create-new-theme.component.scss',
})
export class CreateNewThemeComponent {
  constructor(
    public databaseService: DatabaseService,
    private iptValidator: InputValidator,
  ) {}

  @Output() notifyProcessEnded = new EventEmitter<boolean>();


  //#region USER INPUTS

  newThemeName: string = '';

  //#endregion

  isInputValid(): boolean {
    return (
      this.iptValidator.isMaxLengthMet(this.newThemeName, 25) &&
      this.iptValidator.isMinLengthMet(this.newThemeName, 5)
    );
  }

  onValidate() {
    this.databaseService.registerNewTheme(this.newThemeName);
    this.onCancel();
  }

  onCancel() {
    this.notifyProcessEnded.emit(true);
  }
}
