import {
  Component,
  computed,
  inject,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateMemorycardComponent } from '../../sections/create-memorycard/create-memorycard.component';
import { CreateNewThemeComponent } from './create-new-theme/create-new-theme.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { DatabaseService } from 'src/services/database/database.service';
import { StoreGlobalService } from 'src/services/stores/global-store/global-store.service';
import { tMemTheme, tProfile } from 'src/_models/profile.model';
import { ButtonComponent } from '../../atoms/button/button.component';
import { HeaderComponent } from '../../shared-components/header/header.component';
import { Router } from '@angular/router';
import {
  eMemcardType,
  eContentType,
  eMemcardStatus,
} from 'src/_models/enums/app.enums';
import { tMemcard } from 'src/_models/memcard.model';
import { MemcardIconService } from 'src/services/memcard-icon.service';
import { RunStore } from 'src/services/stores/run-store.service';

@Component({
  selector: 'app-manage-screen',
  imports: [
    CommonModule,
    CreateMemorycardComponent,
    CreateNewThemeComponent,
    ButtonComponent,
    HeaderComponent,
  ],
  templateUrl: './manage-screen.html',
  styleUrl: './manage-screen.scss',
})
export class ManageScreenComponent {
  //#region DEPENDENCIES
  public databaseService = inject(DatabaseService);
  public storeGlobalService = inject(StoreGlobalService);

  memcardIcon = inject(MemcardIconService);

  //#region DEPENDENCIES ENUMS
  ENUM_MEMOCARD_TYPE = eMemcardType;
  ENUM_MEMCARD_CONTENT = eContentType;
  ENUM_MEMCARD_STATUS = eMemcardStatus;
  readonly memcardStatus = Object.values(this.ENUM_MEMCARD_STATUS); // Transforme en Array pour itérer

  //#endregion

  //#region DATA
  _user$: Signal<tProfile | null | undefined> = toSignal(
    this.databaseService.getSelectedUser$(),
    { initialValue: null as tProfile | null },
  );

  _userThemes = computed(() => {
    return this._user$()?.themes;
  });

  _selected_theme = computed(() => {
    return this._userThemes()?.find((theme: tMemTheme) => {
      return theme.id == this.storeGlobalService.slcThemeId();
    });
  });
  //#endregion

  //#region MEMTHEME RELATED

  isCreatingTheme: WritableSignal<boolean> = signal(false);
  isRenamingTheme: WritableSignal<boolean> = signal(false);

  switchIsCreatingTheme() {
    this.isCreatingTheme.set(!this.isCreatingTheme());
  }

  onSelectTheme(themeId: string) {
    console.log('clicked');
    this.storeGlobalService.setSelectedTheme(themeId);
  }

  onDeleteTheme(themeId: string) {
    this.databaseService.deleteTheme(themeId);
    if (this.storeGlobalService.getSlcThemeId() === themeId) {
      console.log(this.storeGlobalService.getSlcThemeId());
      console.log(themeId);
      this.storeGlobalService.setSelectedTheme(null);
      this.isCreatingMemcard.set(false);
    }
  }

  onThemeCreationEnd() {
    this.isCreatingTheme.set(false);
  }

  onRenameTheme(newState?: boolean): void {
    this.isRenamingTheme.update((value: boolean) => newState ?? !value);
  }

  onValidateThemeRename() {
    this.isRenamingTheme.set(false);
  }

  onAddContentToTheme(themeId: string) {
    this.storeGlobalService.setSelectedTheme(themeId);
    this.isCreatingMemcard.set(!this.isCreatingMemcard());
  }

  lastThemeIDClicked: string | null = null;
  isOnLeaveMemThemeDesac: boolean = false;

  onHoverMemTheme(themeId: tMemTheme['id']) {
    if (this.lastThemeIDClicked === null) {
      this.storeGlobalService.setSelectedTheme(themeId);
    }
  }

  onLeaveMemTheme(themeId: tMemTheme['id']) {
    if (
      this.isCreatingMemcard() ||
      this.isOnLeaveMemThemeDesac ||
      this.lastThemeIDClicked != null
    ) {
      this.isOnLeaveMemThemeDesac = false;
      return;
    }
    this.storeGlobalService.setSelectedTheme(null);
  }

  handleClick(themeID: string) {
    if (this.lastThemeIDClicked === themeID) {
      this.lastThemeIDClicked = null;
      this.storeGlobalService.setSelectedTheme(null);
      this.isOnLeaveMemThemeDesac = false;
      return;
    }

    this.lastThemeIDClicked = themeID;
    this.isOnLeaveMemThemeDesac = true;
    this.onSelectTheme(themeID);
  }

  //#endregion

  //#region MEMCARD RELATED

  isCreatingMemcard: WritableSignal<boolean> = signal(false);
  isRenamingMemcard: WritableSignal<boolean> = signal(false);

  onRenameMemcard() {}

  onMemcardCreationEnd() {
    this.isCreatingMemcard.set(false);
  }

  onDeleteCard(memcardId: string) {
    this.databaseService.deleteMemcard(memcardId);
  }

  //#endregion

  //#region DEV

  dev() {
    console.log(this.storeGlobalService.slcThemeId());
  }

  //#endregion
}
