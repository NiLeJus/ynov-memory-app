import { Component } from '@angular/core';
import { JsonService } from '../../services/json.service';
import { CommonModule } from '@angular/common';
import { MemoryCardComponent } from '../../shared-components/memory-card/memory-card.component';
import { Subscription } from 'rxjs';
import { tMemoryCard } from '../../_models/app.interfaces';

@Component({
  selector: 'app-landing-screen',
  imports: [CommonModule, MemoryCardComponent],
  templateUrl: './landing.screen.html',
  styleUrl: './landing.screen.scss',
})
export class LandingScreenComponent {
  data: any;

  memoryCards: tMemoryCard[] = []; // Stocke les données localement
  private subscription!: Subscription; // Pour gérer l'abonnement

  constructor(private jsonService: JsonService) {}

  ngOnInit(): void {
    // Abo observable
    this.subscription = this.jsonService.getData().subscribe((data) => {
      this.memoryCards = data; // Met à jour les cartes mémoire
      console.log('Données chargées :', this.memoryCards);
    });
  }

  ngOnDestroy(): void {
    // Desabo observable //?IMPORTANT
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
