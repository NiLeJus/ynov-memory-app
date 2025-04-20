import { StoreGlobalService } from 'src/services/stores/global-store/global-store.service';
import { RunStore } from 'src/services/stores/run-store.service';
import {
  Component,
  computed,
  inject,
  OnInit,
  resource,
  ResourceRef,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared-components/header/header.component';
import { MemoryCardSmComponent } from '../../shared-components/memory-card-sm/memory-card-sm.component';
import { RunPreviewSectionComponent } from '../../sections/run-preview.section/run-preview.section.component';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { BrandHeaderComponent } from '../../organism/brand-header/brand-header.component';
import { tMemcard } from 'src/_models/memcard.model';
import { tProfile } from 'src/_models/profile.model';
import { tMemTheme } from 'src/_models/profile.model';
import { DatabaseService } from 'src/services/database/database.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-board-screen',
  imports: [RouterLink, CommonModule, HeaderComponent, MemoryCardSmComponent],
  templateUrl: './board.screen.html',
  styleUrl: './board.screen.scss',
})
export class BoardScreenComponent implements OnInit {
  // _usernameRouteParam = signal('');
  // userResource: ResourceRef<tProfile | undefined> = resource({
  //   loader: ({ request }) =>
  //     this.databaseService.getUserByUsername(this._usernameRouteParam()),
  // });

  // Computed signal for the user object
  databaseService = inject(DatabaseService);
  storeGlobal = inject(StoreGlobalService);

  _user$: Signal<tProfile | null | undefined> = toSignal(
    this.databaseService.getSelectedUser$(),
    { initialValue: null as tProfile | null },
  );

  _userThemes: Signal<tMemTheme[] | undefined> = computed(
    () => this._user$()?.themes,
  );

  constructor(private route: ActivatedRoute) {}

  hasUserRunToDo(): boolean {
    return this.storeGlobal.hasUserRunToDo();
  }

  isBtnRunDisabled: boolean = false;

  async ngOnInit(): Promise<void> {
    this.isBtnRunDisabled = await !this.storeGlobal.hasUserRunToDo();
    console.log('isBtnRunDisabled:', this.isBtnRunDisabled);
  }

  dev() {}
}
