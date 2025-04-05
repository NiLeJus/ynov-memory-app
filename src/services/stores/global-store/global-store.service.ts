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

  constructor(
    private route: ActivatedRoute,
  ) {
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

  setSelectedTheme(newValue: number | string) {
    this.slcThemeId.set(String(newValue));
    console.log('Changed Slc Theme id to ', newValue);
    console.log(this.slcThemeId());
  }

  getSlcThemeId(): string | null {
    return this.slcThemeId();
  }

  getCurrentUserId(): string | null {
    return this.currentUserId();
  }

  private computeUserId() {
    const currentRoute = this.route.snapshot.url.join('/');
    if (currentRoute === '/') {
      console.log('Vous êtes sur la bonne route');
    }
    const paramUserId = this.route.snapshot.paramMap.get('username');
    console.log(paramUserId, 'erfgz');
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
