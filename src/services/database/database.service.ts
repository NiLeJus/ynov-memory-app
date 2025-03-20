import { StoreGlobalService } from './../store-global.service';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  computed,
  inject,
  Injectable,
  Injector,
  Resource,
  signal,
  WritableSignal,
} from '@angular/core';
import { liveQuery, Observable } from 'dexie';
import { db } from '../../_data/db';
import { iProfile } from '../../_models/domains/profile.models';
import { iMemoryTheme } from 'src/_models/domains/theme.models';
import { UserController } from './controllers/user.controller';
import { ThemesController } from './controllers/themes.controller';

@Injectable({
  providedIn: 'root',
})

/**
 * Service pour CRUD les données.
 * Utilise Dexie(IDB)
 *
 */
export class DatabaseService {
  public storeGlobalService = inject(StoreGlobalService);

  async registerNewTheme(
    name: string,
  ): Promise<{ status: 'ok' | 'error'; error?: any }> {
    try {
      const newTheme: iMemoryTheme = {
        id: crypto.randomUUID(),
        name: name,
        cards: [],
        themes: [],
      };

      // Assuming you want to add this theme to a specific user
      const userId = this.storeGlobalService.getCurrentUserId(); // Example method to get current user ID

      if (userId) {
        await db.transaction('rw', db.users, async () => {
          const user = await db.users.get(userId);
          if (!user) throw new Error('User not found');

          user.themes = [...(user.themes || []), newTheme]; // Add the new theme to user's themes
          await db.users.put(user); // Save updated user object
        });
      }

      return { status: 'ok' };
    } catch (error) {
      console.error('Error registering new theme:', error);
      return { status: 'error', error };
    }
  }

  async deleteTheme(
    themeId: string,
  ): Promise<{ status: 'ok' | 'error'; error?: any }> {
    try {
      const userId = this.storeGlobalService.getCurrentUserId();

      if (userId) {
        await db.transaction('rw', db.users, async () => {
          const user = await db.users.get(userId);
          if (!user) throw new Error('User not found');

          if (user.themes) {
            // Vérifie si user.themes est défini
            user.themes = user.themes.filter((theme) => theme.id !== themeId);
          } else {
            console.log('No themes found for this user.');
          }

          await db.users.put(user); // Save updated user object
        });
      }

      return { status: 'ok' };
    } catch (error) {
      console.error('Error deleting theme:', error);
      return { status: 'error', error };
    }
  }

  async modifyTheme(
    themeId: string,
    newName: string,
  ): Promise<{ status: 'ok' | 'error'; error?: any }> {
    try {
      const userId = this.storeGlobalService.getCurrentUserId();

      if (userId) {
        await db.transaction('rw', db.users, async () => {
          const user = await db.users.get(userId);
          if (!user) throw new Error('User not found');

          if (user.themes) {
            // Vérifie si user.themes est défini
            const themeIndex = user.themes.findIndex(
              (theme) => theme.id === themeId,
            );
            if (themeIndex !== -1) {
              user.themes[themeIndex].name = newName;
            } else {
              throw new Error('Theme not found');
            }
          } else {
            throw new Error('No themes found for this user.');
          }

          await db.users.put(user); // Save updated user object
        });
      }

      return { status: 'ok' };
    } catch (error) {
      console.error('Error modifying theme:', error);
      return { status: 'error', error };
    }
  }

  async registerCard() {
    
  }

  //#endregion

  // Observable that emits user data whenever it changes
  _USERSDATA$: Observable<iProfile[]> = liveQuery(() => db.users.toArray());
  // _SELECTED_USERID$ = computed(() => {
  //   return this.storeGlobalService.getCurrentUserId();
  // });

  _SELECTED_USERID$ = this.storeGlobalService.currentUserId;
  //#region USER RELATED

  async getAllUsers(): Promise<iProfile[]> {
    const users: iProfile[] = await db.users.toArray();
    console.log(users);
    return users;
  }

  async getMainUser(userId: number) {
    const user = await db.users.get(userId);
    return;
  }

  async getUser(userId: number) {
    const user = await db.users.get(userId);
    return;
  }

  //#endregion

  async getSelectedUser() {
    const selectedUserId = this._SELECTED_USERID$();
    if (selectedUserId) {
      const result = await db.users.get(selectedUserId);
      return result;
    }
    return;
  }

  getAllUsers$(): Observable<iProfile[]> {
    return liveQuery(() => db.users.toArray());
  }

  getSelectedUser$(): Observable<iProfile | undefined> {
    let selectedUserId = this._SELECTED_USERID$();
    if (selectedUserId == null) {
      selectedUserId = 0;
    }
    return liveQuery(() => db.users.get(selectedUserId));
  }

  async getUserByUsername(username: string): Promise<iProfile | undefined> {
    try {
      const user = await db.users.where('name').equals(username).first(); // Recherche par index
      return user; // Retourne l'utilisateur ou undefined s'il n'existe pas
    } catch (error) {
      console.error(
        `Erreur lors de la récupération de l'utilisateur "${username}":`,
        error,
      );
      return undefined;
    }
  }

  async modifyUsername(
    userId: number,
    newName: string,
  ): Promise<{ status: 'ok' | 'error'; error?: any }> {
    try {
      const updated = await db.users.update(userId, { name: newName }); // Update the user's name
      if (updated) {
        console.log(
          `User with ID ${userId} updated successfully to name: ${newName}`,
        );
        return { status: 'ok' }; // Return success status
      } else {
        console.error(`User with ID ${userId} not found.`);
        return { status: 'error', error: 'User not found' }; // Return error if user not found
      }
    } catch (error) {
      console.error(`Error updating user with ID ${userId}:`, error);
      return { status: 'error', error }; // Return error status and the error itself
    }
  }

  async registerNewUser(
    name: string,
  ): Promise<{ status: 'ok' | 'error'; error?: any }> {
    const newUser = {
      id: Date.now(), // TIMESTAMP POUR UID
      name: name,
      selected: true,
      nextSession: null,
      themes: [], // Initialize with empty themes
      statistics: { runsDone: 0, scoreAllTime: 0, scoreNow: 0 }, // Default statistics
    };

    try {
      await db.users.put(newUser); // Add the user to the database
      console.log('New user added:', newUser);
      return { status: 'ok' }; // Return success status
    } catch (error) {
      console.error('Error adding user:', error);
      return { status: 'error', error }; // Return error status and the error itself
    }
  }

  async getThemesForUserId() {
    const user = await db.users.get(this._SELECTED_USERID$);

    if (user?.themes) {
      console.log(`Themes for user ${user.name}:`, user.themes);

      for (const theme of user.themes) {
        console.log(`Cards in theme ${theme.name}:`, theme.cards);
      }
    }
  }

  async clearWholeDB() {
    await db.users.clear();
  }

  async deleteUserById(userId: number): Promise<void> {
    try {
      await db.users.delete(userId); // Delete the user by their primary key (ID)
      console.log(`User with ID ${userId} deleted successfully.`);
    } catch (error) {
      console.error(`Failed to delete user with ID ${userId}:`, error);
    }
  }


}
