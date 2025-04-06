import { DatabaseService } from 'src/services/database/database.service';
import { inject, Injectable } from '@angular/core';
import { db } from 'src/_data/db';
import { tProfile } from 'src/_models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileExportService {
  constructor() {}

  databaseService = inject(DatabaseService);

  async exportUserData(userId: tProfile['id']): Promise<void> {
    try {
      const user = await this.databaseService.getUserByID(userId);
      if (!user) throw new Error('User not found');

      const file = JSON.stringify(user, null, 2);

      this.downloadJson(file, `${user.name}_data.memjson`);
    } catch (error) {
      console.error('Error exporting user data:', error);
      throw error;
    }
  }

  private downloadJson(json: string, filename: string): void {
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    window.URL.revokeObjectURL(url);
  }
}
