import { DatabaseService } from './../../../services/database/database.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-new-theme',
  imports: [FormsModule],
  templateUrl: './create-new-theme.component.html',
  styleUrl: './create-new-theme.component.scss',
})
export class CreateNewThemeComponent {
  constructor(public databaseService: DatabaseService) {}



  //#region USER INPUTS

  newThemeName: string = '';

  //#endregion
  onValidate() {
    this.databaseService.registerNewTheme(this.newThemeName);
  }
}
