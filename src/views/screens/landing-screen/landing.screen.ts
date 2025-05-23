import {
  Component,
  computed,
  inject,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemoryCardComponent } from '../../shared-components/memory-card/memory-card.component';
import { async, Subscription } from 'rxjs';
import { HeaderComponent } from '../../shared-components/header/header.component';
import { MemoryCardSmComponent } from '../../shared-components/memory-card-sm/memory-card-sm.component';
import { RunPreviewSectionComponent } from '../../sections/run-preview.section/run-preview.section.component';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { BrandHeaderComponent } from '../../organism/brand-header/brand-header.component';
import { DatabaseService } from 'src/services/database/database.service';
import { ProfileCreationComponent } from './components/profile-creation/profile-creation.component';
import { ProfileTabComponent } from './components/profile-tab/profile-tab.component';
import { tMemTheme, tProfile } from 'src/_models/profile.model';
import { MemcardActionsService } from 'src/services/actions/memcard.actions';
import { LoadJsonDataComponent } from './components/load-json-data/load-json-data.component';
import { DateTime } from 'luxon';
import { tMemcard } from 'src/_models/memcard.model';
import { DateStore } from 'src/services/stores/date-store.service';

@Component({
  selector: 'app-landing-screen',
  imports: [
    CommonModule,
    ProfileTabComponent,
    ProfileCreationComponent,
    LoadJsonDataComponent,
  ],
  templateUrl: './landing.screen.html',
  styleUrl: './landing.screen.scss',
})
export class LandingScreenComponent implements OnInit {
  public databaseService = inject(DatabaseService);
  public dateStore = inject(DateStore);

  // Conversion du flux constant en signal Angular pour une gestion réactive
  _users: Signal<tProfile[]> = toSignal(this.databaseService.getAllUsers$(), {
    initialValue: [],
  });

  ngOnInit(): void {}

  isCreatingNewUser: WritableSignal<boolean> = signal(false);

  onCreateUser() {
    this.isCreatingNewUser.set(!this.isCreatingNewUser());
  }

  onProfileCreationEnd() {
    this.isCreatingNewUser.set(false);
  }

  onUpload() {}


}
