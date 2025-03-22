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
import { ProfileTabComponent } from './components/profile-tab/profile-tab.component';
import { ProfileCreationComponent } from './components/profile-creation/profile-creation.component';
import { DatabaseService } from '../../services/database/database.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { iProfile } from 'src/_models/domains/profile.models';
import { BrandHeaderComponent } from "../../atoms/brand-header/brand-header.component";

@Component({
  selector: 'app-landing-screen',
  imports: [CommonModule, ProfileTabComponent, ProfileCreationComponent, BrandHeaderComponent],
  templateUrl: './landing.screen.html',
  styleUrl: './landing.screen.scss',
})
export class LandingScreenComponent implements OnInit {
  public databaseService = inject(DatabaseService);

  // Conversion du flux constant en signal Angular pour une gestion réactive
  _users: Signal<iProfile[]> = toSignal(this.databaseService.getAllUsers$(), { initialValue: [] });

  // Writable signal to hold user data

  ngOnInit(): void {
  }

  isCreatingNewUser: WritableSignal<boolean> = signal(false);

  onCreateUser() {
    this.isCreatingNewUser.set(!this.isCreatingNewUser());
  }

  onProfileCreationEnd() {
    this.isCreatingNewUser.set(false);
  }
}
