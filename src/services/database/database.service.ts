import { toSignal } from '@angular/core/rxjs-interop';
import {
  iMemoryCard,
  iMemoryTheme,
  iUser,
  iProfileStatistics,
} from '../../_models/app.interfaces';
import {
  computed,
  inject,
  Injectable,
  signal,
  WritableSignal,
} from '@angular/core';
import { MockProfileData } from '../../_data/mockProfile.data';
import { liveQuery, Observable } from 'dexie';
import { db } from '../../_data/db';

@Injectable({
  providedIn: 'root',
})

/**
 * Service pour CRUD les données.
 * Utilise Dexie(IDB)
 *
 * Description. (use period)
 * @param {very_long_type} name           Description.
 * @param {type}           very_long_name Description.
 */
export class DatabaseService {
  // Observable that emits user data whenever it changes
  _USERSDATA$: Observable<iUser[]> = liveQuery(() => db.users.toArray());
  _SELECTED_USERID: WritableSignal<null | number> = signal(null);

  async getAllUsers(): Promise<iUser[]> {
    const users: iUser[] = await db.users.toArray();
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
    const selectedUserId = this._SELECTED_USERID();
    if (selectedUserId) {
      const result = await db.users.get(selectedUserId);
      return result;
    }
    return;
  }

  setSelectedUserId(newUserId: number) {
    this._SELECTED_USERID.set(newUserId);
  }

  getAllUsers$(): Observable<iUser[]> {
    return liveQuery(() => db.users.toArray());
  }

  async getUserByUsername(username: string): Promise<iUser | undefined> {
    try {
      const user = await db.users.where('name').equals(username).first(); // Recherche par index
      return user; // Retourne l'utilisateur ou undefined s'il n'existe pas
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'utilisateur "${username}":`, error);
      return undefined;
    }
  }

  async modifyUsername(
    userId: number,
    newName: string
  ): Promise<{ status: 'ok' | 'error'; error?: any }> {
    try {
      const updated = await db.users.update(userId, { name: newName }); // Update the user's name
      if (updated) {
        console.log(
          `User with ID ${userId} updated successfully to name: ${newName}`
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
    name: string
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

  async getThemesForUser(userId: number) {
    const user = await db.users.get(userId);

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
