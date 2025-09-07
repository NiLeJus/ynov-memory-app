import { inject, Injectable, signal } from '@angular/core';
import { liveQuery, Observable } from 'dexie';
import { StoreGlobalService } from 'src/common/stores/global-store/global-store.service';
import { db } from 'src/models/_data/db';
import { tMemcard } from 'src/models/business/memcard.model';
import { tMemTheme, tProfile } from 'src/models/business/profile.model';

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

  private _USERSDATA$$ = liveQuery(() => db.users.toArray());
  private usersSignal = signal<tProfile[]>([]);

  constructor() {
    this._USERSDATA$.subscribe((users) => {
      this.usersSignal.set([...users]);
    });
  }

  users$ = this.usersSignal.asReadonly();

  _USERSDATA$: Observable<tProfile[]> = liveQuery(() => db.users.toArray());
  _SELECTED_USERID$ = this.storeGlobalService.currentUserId;

  _selectedThemeId() {
    return this.storeGlobalService.getSlcThemeId();
  }

  async updateMemcardByID(
    updatedMemcard: tMemcard,
  ): Promise<{ status: 'ok' | 'error'; error?: any }> {
    const userId = this.storeGlobalService.getCurrentUserId();

    if (userId === null) {
      throw new Error('user id is not defined');
    }

    try {
      await db.transaction('rw', db.users, async () => {
        const user = await db.users.get(userId);
        if (!user) throw new Error('User not found');

        // Parcourt les thèmes pour trouver la carte à mettre à jour
        if (user.themes) {
          for (const theme of user.themes) {
            const cardIndex = theme.cards.findIndex(
              (card) => card.id === updatedMemcard.id,
            );
            if (cardIndex !== -1) {
              // Remplace la carte trouvée par le nouvel objet Memcard
              theme.cards[cardIndex] = updatedMemcard;
              await db.users.put(user); // Sauvegarde l'utilisateur mis à jour
              console.log(updatedMemcard);
              return { status: 'ok' };
            }
          }
        }

        throw new Error('Memcard not found in any theme');
      });

      return { status: 'ok' };
    } catch (error) {
      console.error(
        `Error updating memcard with ID ${updatedMemcard.id}:`,
        error,
      );
      return { status: 'error', error };
    }
  }

  async updateMemcardByIDWithUserID(
    updatedMemcard: tMemcard,
    userId: tProfile['id'],
  ): Promise<{ status: 'ok' | 'error'; error?: any }> {
    if (userId === null) {
      throw new Error('user id is not defined');
    }

    try {
      await db.transaction('rw', db.users, async () => {
        const user = await db.users.get(userId);
        if (!user) throw new Error('User not found');

        if (user.themes) {
          for (const theme of user.themes) {
            const cardIndex = theme.cards.findIndex(
              (card) => card.id === updatedMemcard.id,
            );
            if (cardIndex !== -1) {
              theme.cards[cardIndex] = updatedMemcard;
              await db.users.put(user);
              console.log(updatedMemcard);
              return { status: 'ok' };
            }
          }
        }

        throw new Error('Memcard not found in any theme');
      });

      return { status: 'ok' };
    } catch (error) {
      console.error(
        `Error updating memcard with ID ${updatedMemcard.id}:`,
        error,
      );
      return { status: 'error', error };
    }
  }

  async addMockUser(
    mockProfile: tProfile,
  ): Promise<{ status: 'ok' | 'error'; error?: any }> {
    try {
      await db.transaction('rw', db.users, async () => {
        // Vérifie si l'utilisateur existe déjà
        const existingUser = await db.users.get(mockProfile.id);
        if (!existingUser) {
          // Ajoute l'utilisateur avec ses thèmes et cartes
          await db.users.put({
            ...mockProfile,
            id: mockProfile.id,
            themes: mockProfile.themes?.map((theme) => ({
              ...theme,
              cards: theme.cards?.map((card) => ({
                ...card,
              })),
            })),
          });
        }
      });
      return { status: 'ok' };
    } catch (error) {
      console.error("Erreur lors de l'ajout du mock user:", error);
      return { status: 'error', error };
    }
  }

  //#region THEME CRUD

  async registerNewTheme(
    name: string,
  ): Promise<
    { status: 'ok'; themeId: string } | { status: 'error'; error: any }
  > {
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

      return { status: 'ok', themeId: newTheme.id };
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

        const targetTheme = user.themes?.find((t: { id: string | null; }) => t.id === themeId);
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
  private async selectActiveUserInDb(userId?: string) {
    const activeUserId = this.storeGlobalService.getCurrentUserId();

    if (userId) {
      await db.transaction('rw', db.users, async () => {
        const user = await db.users.get(userId);
        if (!user) throw new Error('User not found');
      });
    }
  }

  private async getActiveUser(userId: string): Promise<any> {
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

  async getMainUser(userId: string) {
    const user = await db.users.get(userId);
    return;
  }

  async getUser(userId: string) {
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

  async getUserByID(userID: tProfile['id']): Promise<tProfile | undefined> {
    const result = await db.users.get(userID);
    return result;
  }

  getAllUsers$(): Observable<tProfile[]> {
    return liveQuery(() => db.users.toArray());
  }

  getSelectedUser$(): Observable<tProfile | undefined> {
    let selectedUserId = this._SELECTED_USERID$();
    if (selectedUserId == null) {
      selectedUserId = '0';
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

  async isNameTakenInDB(username: string): Promise<boolean> {
    try {
      const user = await this.getUserByUsername(username);
      return !!user;
    } catch (error) {
      console.error(
        `Erreur lors de la vérification du nom d'utilisateur "${username}":`,
        error,
      );
      return false;
    }
  }

  async modifyUsername(
    userId: tProfile['id'],
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
      id: String(Date.now()), // TIMESTAMP POUR UID
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

  async registerUserFromJSON(userData: tProfile) {
    try {
      await db.users.put(userData);
    } catch (error) {
      throw new Error("Erreur pour l'ajout d'utilisateur from json");
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

  async deleteUserById(userId: tProfile['id']): Promise<void> {
    try {
      await db.users.delete(userId);
      console.log(`User with ID ${userId} deleted successfully.`);
    } catch (error) {
      console.error(`Failed to delete user with ID ${userId}:`, error);
    }
  }

  //#endregion
}
