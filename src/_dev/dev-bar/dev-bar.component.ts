import { Component, resource } from '@angular/core';
import { DatabaseService } from '../../services/database/database.service';

@Component({
  selector: 'app-dev-bar',
  imports: [],
  templateUrl: './dev-bar.component.html',
  styleUrl: './dev-bar.component.scss',
})

export class DevBarComponent {
  constructor(public databaseService: DatabaseService) {}

  dev() {

  }

  onClearDB() {
  }
}
