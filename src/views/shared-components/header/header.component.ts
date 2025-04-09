import { Component, computed, inject, input, Input } from '@angular/core';

import { Router } from '@angular/router';
import { tProfileStats } from 'src/_models/profile.model';
import { ProfileActionService } from 'src/services/actions/profile.actions';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public profileAction = inject(ProfileActionService);

  _username = input<string>();
  _profileStats = input<tProfileStats>();
  

  _userScore = computed(() => {
    let profile = this._profileStats();
    return profile?.scoreNow;
  });

  constructor(private router: Router) {}
  returnToProfileSelection() {
    this.router.navigate(['']);
  }
}
