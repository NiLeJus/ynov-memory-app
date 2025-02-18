import { iMemoryCard } from './../_models/app.interfaces';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class JsonService {
  private jsonFilePath = '/memory-cards.data.json';

  //* Set up de l'observable pour les données
  private data: iMemoryCard[] = []; // Stock localement
  private dataSubject = new BehaviorSubject<iMemoryCard[]>([]); // Observable pour suivre les mises à jour

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

  changeCardValidation(uid: any, operation: 'add' | 'sub'): void {
    console.log('Entered change card validation');
    const response = this.pickUpCard(uid);
    console.log(response);

    if (!response.success) {
      console.error('Card not found');
      return;
    } else if (response.card) {

      //Met à jour la valeur de la carte
      switch (operation) {
        case 'add':
          response.card.validationLevel += 1;
          break;
        case 'sub':
          response.card.validationLevel -= 1;
          break;
        default:
          console.error('Default switch reached, should not be, frere reflechi stp');
      }


      // Met à jour le BehaviorSubject
      this.dataSubject.next([...this.data]); // Crée une nouvelle copie de data avec la modification
    } else {
      console.error('Unexpected error: Card is undefined');
      return;
    }
  }

  pickUpCard(id: string): { success: boolean; card?: iMemoryCard } {
    const card = this.data.find((card) => card.id === id);
    if (card) {
      return { success: true, card };
    } else {
      return { success: false };
    }
  }
}
