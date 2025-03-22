import { DatabaseService } from './../../services/database/database.service';
import { StoreGlobalService } from './../../services/store-global.service';
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
import { ActivatedRoute } from '@angular/router';
import { MemorycardTabComponent } from './memorycard-tab/memorycard-tab.component';
import { iMemorycard } from 'src/_models/domains/memorycard.models';
import { iProfile } from 'src/_models/domains/profile.models';
import { iMemoryTheme } from 'src/_models/domains/theme.models';
import { CreateMemorycardComponent } from '../../sections/create-memorycard/create-memorycard.component';
import { CreateNewThemeComponent } from './create-new-theme/create-new-theme.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { AddContentComponent } from '../../sections/create-memorycard/add-content/add-content.component';

@Component({
  selector: 'app-manage-screen',
  imports: [
    CommonModule,
    MemorycardTabComponent,
    CreateMemorycardComponent,
    CreateNewThemeComponent,
    AddContentComponent,
  ],
  templateUrl: './manage-screen.html',
  styleUrl: './manage-screen.scss',
})
export class ManageScreenComponent implements OnInit {
  isCreatingTheme: WritableSignal<boolean> = signal(false);
  isCreatingCard: WritableSignal<boolean> = signal(false);
  public databaseService = inject(DatabaseService);

  constructor(
    private route: ActivatedRoute,
    public storeGlobalService: StoreGlobalService,
  ) {}

  // Conversion du flux constant en signal Angular pour une gestion réactive
  _user: Signal<iProfile | null | undefined> = toSignal(
    this.databaseService.getSelectedUser$(),
    { initialValue: null as iProfile | null },
  );

  // Conversion du flux constant en signal Angular pour une gestion réactive
  _userThemes = computed(() => {
    return this._user()?.themes;
  });

  onSelect(themeId: string) {
    this.storeGlobalService.setSelectedTheme(Number(themeId));
  }

  isThereAnActiveUser() {}

  switchIsCreating() {
    this.isCreatingTheme.set(!this.isCreatingTheme());
  }

  dev() {
    console.log(this.isCreatingTheme());
    this.switchIsCreating();
  }

  ngOnInit(): void {
    // Subscribe to route parameters and update the username signal
    this.route.paramMap.subscribe((params) => {
      const username = params.get('username');

      if (username && this.storeGlobalService.getCurrentUserId() == null) {
        console.log('UserName', username);
      } else {
        console.error('No username found in route parameters.');
      }
    });
  }
}
