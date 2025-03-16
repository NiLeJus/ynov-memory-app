import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MediaTreatmentService {
  /**
   * Transforme un fichier en Blob
   * @param file - Le fichier à convertir
   * @returns Un objet Blob
   */
  fileToBlob(file: File): Blob {
    if (!(file instanceof File)) {
      throw new Error("Le fichier fourni n'est pas valide.");
    }

    // Retourner directement le fichier comme Blob
    return new Blob([file], { type: file.type });
  }
}
