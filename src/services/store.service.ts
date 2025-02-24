import { toSignal } from '@angular/core/rxjs-interop';
import {
  iMemoryCard,
  iMemoryTheme,
  iUser,
  iProfileStatistics,
} from '../_models/app.interfaces';
import {
  computed,
  inject,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { MockProfileData } from '../_data/mockProfile.data';
import { eOrderFilter } from '../_models/enums.model';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})


/**
 * Service pour stocker et distribuer les données partout dans l'application
 *
 *
 * Description. (use period)
 * @param {very_long_type} name           Description.
 * @param {type}           very_long_name Description.
 */
export class DataService {
  private _usersData = signal<iUser[]>(MockProfileData);

  private route = inject(ActivatedRoute);

  userID = toSignal(
    this.route.paramMap.pipe(
      map((paramMap) => {
        const userId = paramMap.get('userId'); // Extract the 'userId' parameter
        console.log('Route Parameter (userId):', userId);
        return userId ? parseInt(userId, 10) : undefined; // Parse it as an integer or set to undefined
      })
    )
  );

  setFocusedUser(user: iUser): boolean {
    this.userFocused.set(user);
    return true;
  }

  userFocused: WritableSignal<iUser | undefined> = signal(undefined);

  getFocusedUser(): Promise<iUser | undefined> {
    return Promise.resolve(this.userFocused());
  }

  getFocusedUser2(): any {
    return this.userFocused();
  }

  getFocusedThemes(): Promise<iMemoryTheme[] | undefined> {
    let allThemes: iMemoryTheme[] | undefined = this.userThemes();
    console.log(allThemes);
    return Promise.resolve(allThemes);
  }

  getAllFocusedCards(): Promise<iMemoryCard[] | undefined> {
    let allCards: iMemoryCard[] = [];
    const selectedUserThemes = this.userThemes();
    if (selectedUserThemes) {
      selectedUserThemes.forEach((theme: iMemoryTheme) => {
        // Ajouter les cartes du thème actuel s'il en contient
        if (theme.cards) {
          allCards = allCards.concat(theme.cards);
        }
      });

      return Promise.resolve(allCards);
    }
    return Promise.reject('No USER FOCUSED IN GETALLFOCUSEDCARD');
  }

  // Reactive user index position
  userIndexPos = computed(() => {
    const userId = this.userID();
    if (userId === undefined) return -1;
    return this._usersData().findIndex((user) => user.id === userId);
  });

  // Reactive themes of the focused user
  userThemes = computed(() => {
    const focusedUser = this.userFocused();
    return focusedUser ? focusedUser.themes : [];
  });

  // Reactive themes signal
  private _themes = computed(() => {
    const indexPos = this.userIndexPos();
    if (indexPos === -1) return [];
    return this._usersData()[indexPos].themes;
  });

  // Reactive statistics of the focused user
  _userStatistics = computed(() => {
    const focusedUser = this.userFocused();
    return focusedUser ? focusedUser.statistics : undefined;
  });

  //* Set up de l'observable pour les données
  private data: iMemoryCard[] = []; // Stock localement
  private dataSubject = new BehaviorSubject<iMemoryCard[]>([]); // Observable pour suivre les mises à jour
  private _themesFilter: { [key: string]: boolean } | undefined;

  constructor(private http: HttpClient) {}

  getThemeData(): any {
    return this._themes();
  }

  getData(): Observable<any> {
    return this.dataSubject.asObservable();
  }

  getUserData(userId: number): any {
    return this._usersData().find((user) => {
      user.id == userId;
    });
  }

  getUsersData(): any {
    return this._usersData();
  }

  getRunNumber(): number | undefined {
    let value = this._userStatistics()?.runsDone;
    return value;
  }

  setThemeFilter(themeFilter: any | undefined): any {
    this._themesFilter = themeFilter;
  }

  provideOrder(orderType: eOrderFilter): any {}

  changeCardValidation(uid: any, operation: 'add' | 'sub'): void {
    console.log('Entered change card validation');
    const response = this.pickCard(uid);
    console.log(response);

    if (!response.success) {
      console.error('Card not found');
      return;
    } else if (response.card) {
      //Met à jour la valeur de la carte
      switch (operation) {
        case 'add':
          response.card.validationLevel += 1;
          break;
        case 'sub':
          response.card.validationLevel -= 1;
          break;
        default:
          console.error(
            'Default switch reached, should not be, frere reflechi stp'
          );
      }

      // Met à jour le BehaviorSubject
      this.dataSubject.next([...this.data]); // Crée une nouvelle copie de data avec la modification
    } else {
      console.error('Unexpected error: Card is undefined');
      return;
    }
  }

  pickCard(id: string): { success: boolean; card?: iMemoryCard } {
    const card = this.data.find((card) => card.id === id);
    if (card) {
      return { success: true, card };
    } else {
      return { success: false };
    }
  }
}
