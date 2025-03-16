import { StoreGlobalService } from './../../services/store-global.service';
import { DatabaseService } from '../../services/database/database.service';
import {
  Component,
  computed,
  inject,
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

@Component({
  selector: 'app-manage-screen',
  imports: [
    CommonModule,
    MemorycardTabComponent,
    CreateMemorycardComponent,
    CreateNewThemeComponent,
  ],
  templateUrl: './manage-screen.html',
  styleUrl: './manage-screen.scss',
})
export class ManageScreenComponent {
  isCreatingANewTheme: WritableSignal<boolean> = signal(false);
  public databaseService = inject(DatabaseService);

  constructor(
    private route: ActivatedRoute,
    private storeGlobalService: StoreGlobalService,
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
  // // Resource to fetch the user by username
  // userResource: ResourceRef<iProfile | undefined> = resource({
  //   loader: ({ request }) =>
  //     this.databaseService.getUserByUsername(this._usernameRouteParam()),
  // });

  // ngOnInit(): void {
  //   // Subscribe to route parameters and update the username signal
  //   this.route.paramMap.subscribe((params) => {
  //     const username = params.get('username');
  //     if (username) {
  //       console.error('UserName');
  //       this._usernameRouteParam.set(username);
  //     } else {
  //       console.error('No username found in route parameters.');
  //     }
  //   });
  // }
}
