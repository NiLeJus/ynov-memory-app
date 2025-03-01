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
import { ActivatedRoute } from '@angular/router';
import { MemorycardTabComponent } from './memorycard-tab/memorycard-tab.component';
import { iMemorycard } from 'src/_models/domains/memorycard.models';
import { iProfile } from 'src/_models/domains/profile.models';
import { iMemoryTheme } from 'src/_models/domains/theme.models';

@Component({
  selector: 'app-manage-screen',
  imports: [CommonModule, MemorycardTabComponent],
  templateUrl: './manage-screen.html',
  styleUrl: './manage-screen.scss',
})
export class ManageScreenComponent {
  //Placeholder
  _data: iMemorycard[] = [
    // {
    //   id: '1',
    //   validationLevel: 3,
    //   title: 'Quelle est la capitale de la France ?',
    //   lastValidationDate: 1708400000000,
    //   nextValidationDate: 1709000000000,
    //   recto: ['Quelle est la capitale de la France ?'],
    //   verso: ['Paris'],
    // },
    // {
    //   id: 'card-002',
    //   validationLevel: 5,
    //   lastValidationDate: 1707800000000,
    //   nextValidationDate: 1708400000000,
    //   title: 'Qui a peint La Joconde ?',
    //   recto: [
    //     'Qui a peint La Joconde ?',
    //     {
    //       path: 'joconde.jpg',
    //       mediaType: 'img',
    //       description: 'Tableau de Léonard de Vinci',
    //     },
    //   ],
    //   verso: ['Léonard de Vinci'],
    // },
    // {
    //   id: 'card-003',
    //   validationLevel: 2,
    //   lastValidationDate: 1707000000000,
    //   nextValidationDate: 1707600000000,
    //   title: "Quel est l'hymne national des États-Unis ?",
    //   recto: [
    //     "Quel est l'hymne national des États-Unis ?",
    //     {
    //       path: 'us_anthem.mp3',
    //       mediaType: 'audio',
    //       description: "Extrait de l'hymne américain",
    //     },
    //   ],
    //   verso: ['The Star-Spangled Banner'],
    // },
  ];

  _themes: any = [{ name: 'Astrogomie' }, { name: 'Bernardisdatop' }];

  // Signal to hold the username from the route
  _usernameRouteParam = signal('');

  // Resource to fetch the user by username
  userResource: ResourceRef<iProfile | undefined> = resource({
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
