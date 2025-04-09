import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MediaTreatmentService {
  /**
   * Convertit un fichier image sélectionné par l'utilisateur en Blob.
   * doc : https://developer.mozilla.org/en-US/docs/Web/API/FileReader
   */
  async convertFileToBlob(file: File): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        try {
          const blob = new Blob([reader.result as ArrayBuffer], {
            type: file.type,
          });
          resolve(blob);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () =>
        reject(new Error('Erreur lors de la lecture du fichier'));
      reader.readAsArrayBuffer(file);
    });
  }
}
