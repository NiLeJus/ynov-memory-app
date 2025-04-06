import {
  computed,
  inject,
  Injectable,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { tMemTheme, tProfile } from 'src/_models/profile.model';
import { DatabaseService } from 'src/services/database/database.service';

@Injectable({
  providedIn: 'root',
})
export class StoreGlobalService implements OnInit {
  currentUserId: WritableSignal<string | null> = signal(null);
  slcThemeId: WritableSignal<string | null> = signal(null);

  constructor(private route: ActivatedRoute) {
    if (this.currentUserId()?.valueOf == null) {
      const lastKnownUser = localStorage.getItem('lastKnownUser');
      console.log(lastKnownUser);
      this.changeCurrentUserId(String(lastKnownUser));
    }
  }

  changeCurrentUserId(newValue: tProfile['id']) {
    this.currentUserId.set(newValue);
    console.log('Changed currentUserId to ', newValue);
    localStorage.setItem('lastKnownUser', newValue.toString());
  }

  setSelectedTheme(newValue: string | null) {
    this.slcThemeId.set(newValue);
  }

  getSlcThemeId(): string | null {
    return this.slcThemeId();
  }

  getCurrentUserId(): string | null {
    return this.currentUserId();
  }

  hasUserRunToDo(): boolean {
    return true;
  }

  ngOnInit() {}

  // // Conversion du flux constant en signal Angular pour une gestion réactive
  // _user$: Signal<tProfile | null | undefined> = toSignal(
  //   this.databaseService.getSelectedUser$(),
  //   { initialValue: null as tProfile | null },
  // );

  // // Conversion du flux constant en signal Angular pour une gestion réactive
  // _userThemes$ = computed(() => {
  //   return this._user()?.themes;
  // });
}
