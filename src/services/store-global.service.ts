import { Injectable, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class StoreGlobalService implements OnInit {
  currentUserId: WritableSignal<number | null> = signal(null);
  constructor(private route: ActivatedRoute) {
    if (this.currentUserId()?.valueOf == null) {
      const lastKnownUser = localStorage.getItem('lastKnownUser');
      console.log(lastKnownUser);
      this.changeCurrentUserId(Number(lastKnownUser));
    }
  }

  changeCurrentUserId(newValue: number) {
    this.currentUserId.set(newValue);
    console.log('Changed currentUserId to ', newValue);
    localStorage.setItem('lastKnownUser', newValue.toString());
  }

  getCurrentUserId(): number | null {
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

  ngOnInit() {}
}
