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
import { ActivatedRoute } from '@angular/router';
import { CreateMemorycardComponent } from '../../sections/create-memorycard/create-memorycard.component';
import { CreateNewThemeComponent } from './create-new-theme/create-new-theme.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { AddContentComponent } from '../../sections/create-memorycard/add-content/add-content.component';
import { DatabaseService } from 'src/services/database/database.service';
import { StoreGlobalService } from 'src/services/stores/global-store/global-store.service';
import { tMemTheme, tProfile } from 'src/_models/profile.model';

@Component({
  selector: 'app-manage-screen',
  imports: [
    CommonModule,
    CreateMemorycardComponent,
    CreateNewThemeComponent,
    AddContentComponent,
  ],
  templateUrl: './manage-screen.html',
  styleUrl: './manage-screen.scss',
})
export class ManageScreenComponent implements OnInit {
  isCreatingTheme: WritableSignal<boolean> = signal(false);
  isCreatingMemcard: WritableSignal<boolean> = signal(false);


  public databaseService = inject(DatabaseService);

  constructor(
    private route: ActivatedRoute,
    public storeGlobalService: StoreGlobalService,
  ) {}

  // Conversion du flux constant en signal Angular pour une gestion réactive
  _user: Signal<tProfile | null | undefined> = toSignal(
    this.databaseService.getSelectedUser$(),
    { initialValue: null as tProfile | null },
  );

  // Conversion du flux constant en signal Angular pour une gestion réactive
  _userThemes = computed(() => {
    return this._user()?.themes;
  });

  _selected_theme = computed(() => {
    return this._userThemes()?.find((theme: tMemTheme) => {
      return theme.id == this.storeGlobalService.slcThemeId();
    });
  });

  onMemcardCreationEnd() {
    this.isCreatingMemcard.set(false)
  }

  onSelect(themeId: string) {
    this.storeGlobalService.setSelectedTheme(themeId);

  }

  isThereAnActiveUser() {}

  switchIsCreating() {
    this.isCreatingTheme.set(!this.isCreatingTheme());
  }

  dev() {
    console.log(this._selected_theme());
  }

  ngOnInit(): void {}

  onDeleteTheme(themeId: string) {
    this.databaseService.deleteTheme(themeId)
  }

  onRenameTheme(themeId: string) {
    console.error('Not implementé yet');
  }

  onDeleteCard(memcardId: string) {
    this.databaseService.deleteMemcard(memcardId);
  }

  debbug(memcard: any) {
    console.log(memcard);
    console.log(JSON.stringify(this._selected_theme(), null, 2));
  }
}
