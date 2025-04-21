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

  blobToFile(blob: Blob, fileName: string) {
    return new File([blob], fileName, {
      type: blob.type,
      lastModified: new Date().getTime(),
    });
  }

  async generatePreviewUrl(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(blob);
    });
  }

  isBlobImage(blob: Blob): boolean {
    return blob.type.startsWith('image/');
  }

  isImageType(file: File | Blob): boolean {
    return file.type.startsWith('image/');
  }

  isAudioType(file: File | Blob): boolean {
    return file.type.startsWith('audio/');
  }

  async blobToSafeUrl(blob: File | Blob): Promise<string> {
    return this.generatePreviewUrl(blob);
  }
}
