import { MockerService } from './../../services/mocker.service';
import { DateStore } from './../../services/stores/date-store.service';
import { DatabaseService } from '../../services/database/database.service';
import { Component, inject, WritableSignal } from '@angular/core';
import { DevModeService } from './../dev-mode.service';
import { MemcardActionsService } from 'src/services/actions/memcard.actions';
import { DateTime } from 'luxon';
import { tMemcard } from 'src/_models/memcard.model';

@Component({
  selector: 'app-dev-bar',
  imports: [],
  templateUrl: './dev-bar.component.html',
  styleUrl: './dev-bar.component.scss',
})
export class DevBarComponent {
  public dateStore = inject(DateStore);
  formatedActualDate = this.dateStore.$nowFormatted;

  constructor(
    public devModeService: DevModeService,
    public memecardActions: MemcardActionsService,
    public databaseService: DatabaseService,
    public mockerService: MockerService,
  ) {}

  dev() {}

  async onPopulateDB() {
    const results = await this.databaseService.addMockUser(
      this.mockerService.generateMockData(),
    );
  }

  onClearDB() {}

  onPrintNow() {
    console.log(this.dateStore.now());
  }
}
