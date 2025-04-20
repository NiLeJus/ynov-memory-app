import { DatabaseService } from 'src/services/database/database.service';
import { inject, Injectable } from '@angular/core';
import { db } from 'src/_data/db';
import { tProfile } from 'src/_models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileImportService {
  databaseService = inject(DatabaseService);

  async importJsonFile(file: File): Promise<string> {
    try {
      const jsonData = await this.readFile(file);
      const userData = this.validateJson(jsonData);
      await this.saveUserDataToDB(userData);
      return 'Import réussi !';
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Erreur inconnue',
      );
    }
  }

  private readFile(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          resolve(JSON.parse(e.target?.result as string));
        } catch (error) {
          reject(new Error('Fichier JSON invalide'));
        }
      };
      reader.onerror = () => reject(new Error('Erreur de lecture du fichier'));
      reader.readAsText(file);
    });
  }

  private validateJson(data: any): tProfile {
    if (!data.id || !data.name) {
      throw new Error('Structure JSON invalide');
    }

    return {
      id: crypto.randomUUID(),
      name: data.name,
      nextSession: data.nextSession || null,
      themes: data.themes || [],
      statistics: data.statistics || {},
    };
  }

  private async saveUserDataToDB(userData: tProfile): Promise<void> {
    await this.databaseService.registerUserFromJSON(userData);
  }
}
