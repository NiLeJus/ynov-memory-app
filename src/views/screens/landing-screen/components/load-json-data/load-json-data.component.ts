import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProfileImportService } from 'src/services/json-services/import/profile-import.service';

@Component({
  selector: 'app-load-json-data',
  imports: [CommonModule],
  templateUrl: './load-json-data.component.html',
  styleUrl: './load-json-data.component.scss',
})
export class LoadJsonDataComponent {
  uploadedFile: File | null = null;
  uploadStatus: 'success' | 'error' | null = null;
  statusMessage = '';

  profileImportService = inject(ProfileImportService);

  onFileSelected(event: Event) {
    const inputFile = event.target as HTMLInputElement;
    if (inputFile.files?.length) {
      this.uploadedFile = inputFile.files[0];
      this.uploadStatus = null;
    }
  }

  async onUpload(): Promise<void> {
    if (!this.uploadedFile) return;

    try {
      await this.profileImportService.importJsonFile(this.uploadedFile);
      this.uploadStatus = 'success';
      this.clearFile();
      this.closeModal();
    } catch (error) {
      this.uploadStatus = 'error';
      this.statusMessage = "Erreur lors de l'upload";
    }
  }

  clearFile() {
    this.uploadedFile = null;
  }

  closeModal(): void {
    const closeButton = document.querySelector('[data-bs-dismiss="modal"]');
    if (closeButton) (closeButton as HTMLElement).click();
  }
}
