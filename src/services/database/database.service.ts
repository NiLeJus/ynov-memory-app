import { inject, Injectable } from '@angular/core';
import { liveQuery, Observable } from 'dexie';
import { db } from '../../_data/db';
import { tMemTheme, tProfile } from 'src/_models/profile.model';
import { StoreGlobalService } from '../stores/global-store/global-store.service';
import { tMemcard } from 'src/_models/memcard.model';

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

  _USERSDATA$: Observable<tProfile[]> = liveQuery(() => db.users.toArray());
  _SELECTED_USERID$ = this.storeGlobalService.currentUserId;

  _selectedThemeId() {
    return this.storeGlobalService.getSlcThemeId();
  }

  //#region THEME CRUD

  async registerNewTheme(
    name: string,
  ): Promise<{ status: 'ok' | 'error'; error?: any }> {
    try {
      const newTheme: tMemTheme = {
        id: crypto.randomUUID(),
        name: name,
        cards: [],
        themes: [],
      };

      const userId = this.storeGlobalService.getCurrentUserId();

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
            user.themes = user.themes.filter(
              (theme: tMemTheme) => theme.id !== themeId,
            );
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
              (theme: tMemTheme) => theme.id === themeId,
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

  //#endregion

  //#region MEMCARD CRUD

  async addNewCard(
    newCard: tMemcard,
  ): Promise<{ status: 'ok' | 'error'; error?: any }> {
    const themeId = this.storeGlobalService.getSlcThemeId();

    try {
      const userId = this.storeGlobalService.getCurrentUserId();

      if (!userId) {
        throw new Error('Utilisateur non connecté');
      }

      console.log(themeId);

      await db.transaction('rw', db.users, async () => {
        const user = await db.users.get(userId);
        if (!user) throw new Error('Utilisateur introuvable');

        const targetTheme = user.themes?.find((t) => t.id === themeId);
        if (!targetTheme) throw new Error('Thème introuvable');

        targetTheme.cards = [...(targetTheme.cards || []), newCard];
        await db.users.put(user);
      });

      return { status: 'ok' };
    } catch (error) {
      console.error("Erreur lors de l'ajout de la carte:", error);
      return { status: 'error', error };
    }
  }

  /**
   * Delete
   *
   */
  async deleteMemcard(memcardId: string) {
    const themeId: tMemTheme['id'] | null =
      this.storeGlobalService.getSlcThemeId();

    if (!themeId) {
      throw new Error('Selected ThemeId is null');
    }

    const userId = this.storeGlobalService.getCurrentUserId();

    try {
      if (userId) {
        await db.transaction('rw', db.users, async () => {
          const user = await db.users.get(userId);
          if (!user) throw new Error('User not found');
          if (!user.themes?.length)
            throw new Error('This user.themes is empty');

          const themeIndex = user.themes.findIndex(
            (theme) => theme.id === themeId,
          );

          if (themeIndex === -1) throw new Error(`Theme ${themeId} not found`);

          user.themes[themeIndex].cards = user.themes[themeIndex].cards?.filter(
            (card) => card.id !== memcardId,
          );

          await db.users.put(user);
        });
      }
      return { status: 'ok' };
    } catch (error) {
      console.error(`Error deleting card ${memcardId}:`, error);
      return {
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  //#endregion

  //#region USER CRUD

  /**
   * Select a User in the database  by its ID
   * @param userId user id of the user we wanna get
   */
  private async selectActiveUserInDb(userId?: string | number) {
    if (userId === undefined || userId === null) {
      //Get active user id
    } else if (typeof userId === 'string') {
      userId = Number(userId);
    }
    const activeUserId = this.storeGlobalService.getCurrentUserId();

    if (userId) {
      await db.transaction('rw', db.users, async () => {
        const user = await db.users.get(userId);
        if (!user) throw new Error('User not found');
      });
    }
  }

  private async getActiveUser(userId: string | number): Promise<any> {
    if (typeof userId === 'string') userId = Number(userId);

    try {
      await db.transaction('rw', db.users, async () => {
        const user = await db.users.get(userId);
        if (!user) throw new Error('User not found');
        return user;
      });
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  }

  async getAllUsers(): Promise<tProfile[]> {
    const users: tProfile[] = await db.users.toArray();
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

  async getSelectedUser() {
    const selectedUserId = this._SELECTED_USERID$();
    if (selectedUserId) {
      const result = await db.users.get(selectedUserId);
      return result;
    }
    return;
  }

  getAllUsers$(): Observable<tProfile[]> {
    return liveQuery(() => db.users.toArray());
  }

  getSelectedUser$(): Observable<tProfile | undefined> {
    let selectedUserId = this._SELECTED_USERID$();
    if (selectedUserId == null) {
      selectedUserId = 0;
    }
    return liveQuery(() => db.users.get(selectedUserId));
  }

  async getUserByUsername(username: string): Promise<tProfile | undefined> {
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
    const newUser: tProfile = {
      id: Date.now(), // TIMESTAMP POUR UID
      name: name,
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
  //#endregion

  //#region RFTW CRUD

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

  //#endregion
}
