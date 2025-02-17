import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonService {
  private jsonFilePath = '/memory-cards.data.json'; // Chemin relatif au fichier JSON

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(this.jsonFilePath);
  }

  writeData(): any {
    return console.error("Write Data not implemented");
  }
}
