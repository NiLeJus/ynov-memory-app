import { Component, computed, input, Input } from '@angular/core';
import {
  iMemoryCard,
  iUser,
  iProfileStatistics,
} from '../../_models/app.interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  _username = input<string>();
  _profileStats = input<iProfileStatistics>();
  _userScoreAllTime = computed(() => {
    let profile = this._profileStats();
    return profile?.scoreAllTime;
  });

  _userScore = computed(() => {
    let profile = this._profileStats();
    return profile?.scoreNow;
  });

  constructor(private router: Router) {}
  returnToProfileSelection() {

    this.router.navigate(['']);
  }
}
