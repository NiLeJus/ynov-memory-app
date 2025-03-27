import { DateStore } from './../../services/stores/date-store.service';
import { DatabaseService } from '../../services/database/database.service';
import { Component, resource } from '@angular/core';
import { DevModeService } from './../dev-mode.service';
import { MemcardActions } from 'src/services/stores/actions/memcard.actions';

@Component({
  selector: 'app-dev-bar',
  imports: [],
  templateUrl: './dev-bar.component.html',
  styleUrl: './dev-bar.component.scss',
})
export class DevBarComponent {
  constructor(
    public devModeService: DevModeService,
    public memecardActions: MemcardActions,
    public databaseService: DatabaseService,
    public dateStore: DateStore,
  ) {}

  dev() {
    this.memecardActions.processNewDate();
  }

  onClearDB() {}

  onPrintNow() {
    console.log(this.dateStore.now());
  }
}
