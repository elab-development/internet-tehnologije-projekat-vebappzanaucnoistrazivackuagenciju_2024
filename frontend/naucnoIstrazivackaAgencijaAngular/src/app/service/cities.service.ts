import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../domain/city.domain';

const CITIES_API_URL = 'http://localhost:8000/api/cities';

@Injectable({
  providedIn: 'root',
})
export class CitiesService {
  private http = inject(HttpClient);
  constructor() {}
  public getAll(): Observable<City[]> {
    const url = CITIES_API_URL;
    return this.http.get<City[]>(url);
  }
}
