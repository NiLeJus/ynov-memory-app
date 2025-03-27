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

@Component({
  selector: 'app-board-screen',
  imports: [
    RouterLink,
    CommonModule,
    HeaderComponent,
    MemoryCardSmComponent,
    RunPreviewSectionComponent,
    BrandHeaderComponent,
  ],
  templateUrl: './board.screen.html',
  styleUrl: './board.screen.scss',
})
export class BoardScreenComponent implements OnInit {
  // Signal to hold the username from the route
  _usernameRouteParam = signal('');

  // Resource to fetch the user by username
  userResource: ResourceRef<tProfile | undefined> = resource({
    loader: ({ request }) =>
      this.databaseService.getUserByUsername(this._usernameRouteParam()),
  });

  // Computed signal for the user object
  _user = computed(() => this.userResource.value());

  // Computed signal for the user's themes
  _userThemes: Signal<tMemTheme[] | undefined> = computed(
    () => this._user()?.themes,
  );

  constructor(
    private databaseService: DatabaseService,
    private route: ActivatedRoute,
  ) {}

  dev() {}

  ngOnInit(): void {
    // Subscribe to route parameters and update the username signal
    this.route.paramMap.subscribe((params) => {
      const username = params.get('username');
      if (username) {
        console.error('UserName');
        this._usernameRouteParam.set(username);
      } else {
        console.error('No username found in route parameters.');
      }
    });
  }

  memoryCards: tMemcard[] = []; // Stocke les données localement
  ngOnDestroy(): void {}
}
