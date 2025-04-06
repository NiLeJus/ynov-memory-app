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

  @Output() notifyProcessEnded = new EventEmitter<{
    status: boolean;
    themeId?: string;
  }>();

  //#region USER INPUTS

  newThemeName: string = '';

  //#endregion

  isInputValid(): boolean {
    return (
      this.iptValidator.isMaxLengthMet(this.newThemeName, 25) &&
      this.iptValidator.isMinLengthMet(this.newThemeName, 3)
    );
  }

  public async onValidate() {
    const result = await this.databaseService.registerNewTheme(
      this.newThemeName,
    );

    if (result.status != 'ok') {
      throw new Error(
        'Theme was not registered properly in the database service',
      );
    }
    this.onCancel(result.themeId);
  }

  onCancel(themeId?: string) {
    this.notifyProcessEnded.emit({ status: true, themeId });
  }
}
