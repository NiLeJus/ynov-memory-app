import { DatabaseService } from './../../services/database/database.service';
import { Component, resource } from '@angular/core';
import { DevModeService } from './../dev-mode.service';

@Component({
  selector: 'app-dev-bar',
  imports: [],
  templateUrl: './dev-bar.component.html',
  styleUrl: './dev-bar.component.scss',
})
export class DevBarComponent {
  constructor(
    public devModeService: DevModeService,
    public databaseService: DatabaseService
  ) {}

  dev() {}

  onClearDB() {}
}
