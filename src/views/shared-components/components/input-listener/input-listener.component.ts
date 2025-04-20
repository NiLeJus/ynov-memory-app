import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-input-listener',
  imports: [],
  templateUrl: './input-listener.component.html',
  styleUrl: './input-listener.component.scss',
})
export class InputListenerComponent {
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp':
        console.log('Flèche haut pressée');
        this.onArrowUp();
        break;
      case 'ArrowDown':
        console.log('Flèche bas pressée');
        this.onArrowDown();
        break;
      case 'ArrowLeft':
        console.log('Flèche gauche pressée');
        this.onArrowLeft();
        break;
      case 'ArrowRight':
        console.log('Flèche droite pressée');
        this.onArrowRight();
        break;
    }
  }

  onArrowUp(): void {
    // Logique pour la flèche haut
    console.log('Action pour flèche haut');
  }

  onArrowDown(): void {
    // Logique pour la flèche bas
    console.log('Action pour flèche bas');
  }

  onArrowLeft(): void {
    // Logique pour la flèche gauche
    console.log('Action pour flèche gauche');
  }

  onArrowRight(): void {
    // Logique pour la flèche droite
    console.log('Action pour flèche droite');
  }
}
