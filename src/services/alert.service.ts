import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AlertService {
  private alertPlaceholder: HTMLElement | null;

  constructor() {
    // Dynamically create a placeholder for alerts if it doesn't exist
    this.alertPlaceholder = document.getElementById('alertPlaceholder');
    if (!this.alertPlaceholder) {
      this.alertPlaceholder = document.createElement('div');
      this.alertPlaceholder.id = 'alertPlaceholder';
      document.body.appendChild(this.alertPlaceholder);
    }
  }

  /**
   * Show a Bootstrap alert dynamically.
   * @param message The message to display in the alert.
   * @param type The type of alert (e.g., 'success', 'danger', 'info', etc.).
   */
  showAlert(
    message: string,
    type:
      | 'primary'
      | 'secondary'
      | 'success'
      | 'danger'
      | 'warning'
      | 'info'
      | 'light'
      | 'dark'
  ) {
    if (!this.alertPlaceholder) return;

    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <div class="alert alert-${type} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;

    this.alertPlaceholder.append(wrapper);

    // Automatically remove the alert after a timeout
    setTimeout(() => {
      wrapper.remove();
    }, 5000); // Adjust timeout as needed
  }
}
