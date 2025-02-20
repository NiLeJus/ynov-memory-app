import { Component } from '@angular/core';
import { JsonService } from '../../services/json.service';
import { CommonModule } from '@angular/common';
import { MemoryCardComponent } from '../../shared-components/memory-card/memory-card.component';
import { Subscription } from 'rxjs';
import { iMemoryCard } from '../../_models/app.interfaces';
import { HeaderComponent } from "../../shared-components/header/header.component";
import { MemoryCardSmComponent } from "../../shared-components/memory-card-sm/memory-card-sm.component";

@Component({
  selector: 'app-landing-screen',
  imports: [CommonModule, MemoryCardComponent, HeaderComponent, MemoryCardSmComponent],
  templateUrl: './landing.screen.html',
  styleUrl: './landing.screen.scss',
})
export class LandingScreenComponent {
  data: any;
  private _user: any;
  private _themes: any;
public theme() {
  return this._themes
}
  memoryCards: iMemoryCard[] = []; // Stocke les données localement
  private subscription!: Subscription; // Pour gérer l'abonnement
  constructor(private jsonService: JsonService) {}

  ngOnInit(): void {
    // Abo observable
    this.subscription = this.jsonService.getData().subscribe((data) => {
      this.memoryCards = data; // Met à jour les cartes mémoire
      console.log('Données chargées :', this.memoryCards);
    });
    this._user = this.jsonService.getUserData()
    this._themes = this.jsonService.getThemeData()
  }



  ngOnDestroy(): void {
    // Desabo observable //?IMPORTANT
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
