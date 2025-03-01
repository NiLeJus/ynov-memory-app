import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export abstract class SvgLoadStrategy {
  abstract load(url: string): Observable<string>;
}
