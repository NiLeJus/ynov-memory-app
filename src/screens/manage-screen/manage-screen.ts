import { DatabaseService } from './../../services/database/database.service';
import {
  Component,
  computed,
  resource,
  ResourceRef,
  Signal,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { iMemoryTheme, iUser } from '../../_models/app.interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-screen',
  imports: [CommonModule],
  templateUrl: './manage-screen.html',
  styleUrl: './manage-screen.scss',
})
export class ManageScreenComponent {
  // Signal to hold the username from the route
  _usernameRouteParam = signal('');

  // Resource to fetch the user by username
  userResource: ResourceRef<iUser | undefined> = resource({
    loader: ({ request }) =>
      this.databaseService.getUserByUsername(this._usernameRouteParam()),
  });

  // Computed signal for the user object
  _user = computed(() => this.userResource.value());

  // Computed signal for the user's themes
  _userThemes: Signal<iMemoryTheme[] | undefined> = computed(
    () => this._user()?.themes
  );

  constructor(
    private databaseService: DatabaseService,
    private route: ActivatedRoute
  ) {}

  dev() {}

  ngOnInit(): void {
    // Subscribe to route parameters and update the username signal
    this.route.paramMap.subscribe((params) => {
      const username = params.get('username');
      if (username) {
        console.error('UserName');
        this._usernameRouteParam.set(username);
      } else {
        console.error('No username found in route parameters.');
      }
    });
  }
}
