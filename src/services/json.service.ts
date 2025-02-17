import { tMemoryCard } from './../_models/app.interfaces';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class JsonService {
  private jsonFilePath = '/memory-cards.data.json';

  //* Set up de l'observable pour les données
  private data: tMemoryCard[] = []; // Stock localement
  private dataSubject = new BehaviorSubject<tMemoryCard[]>([]); // Observable pour suivre les mises à jour

  constructor(private http: HttpClient) {
    this.loadData(); // Charger les données au démarrage du service
  }

  private loadData(): void {
    this.http.get(this.jsonFilePath).subscribe((jsonData) => {
      this.data = JSON.parse(JSON.stringify(jsonData)); // Copy
      this.dataSubject.next(this.data); // Met à jour lobservable
    });
  }

  getData(): Observable<any> {
    return this.dataSubject.asObservable();
  }

  changeCardValidation(uid: any) {
    console.log("Entered change card validation");

    const response = this.pickUpCard(uid);
    console.log(response);

    if (!response.success) {
      console.error('Card not found');
    } else if (response.card) {

      console.log("Entré")

      // Met à jour la carte
      response.card.validationLevel = 10;
      // Met à jour le BehaviorSubject avec les données modifiées
      this.dataSubject.next([...this.data]); // Crée une nouvelle copie de data avec la modification
    } else {
      console.error('Unexpected error: Card is undefined');
    }
  }


  pickUpCard(uid: string): { success: boolean; card?: tMemoryCard } {
    const card = this.data.find((card) => card.uid === uid);
    if (card) {
      return { success: true, card };
    } else {
      return { success: false };
    }
  }
}
