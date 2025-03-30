import { MockerService } from './../../services/mocker.service';
import { DateStore } from './../../services/stores/date-store.service';
import { DatabaseService } from '../../services/database/database.service';
import { Component, inject, WritableSignal } from '@angular/core';
import { DevModeService } from './../dev-mode.service';
import { MemcardActions } from 'src/services/actions/memcard.actions';
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
  formatedActualDate = this.dateStore.$now;

  constructor(
    public devModeService: DevModeService,
    public memecardActions: MemcardActions,
    public databaseService: DatabaseService,
    public mockerService: MockerService,
  ) {}

  dev() {
    this.memecardActions.processNewDate();
  }

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
