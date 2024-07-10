import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Reference } from '../domain/reference.domain';

const REFERENCES_API_URL = 'http://localhost:8000/api/references';


@Injectable({
  providedIn: 'root'
})
export class ReferencesService {
  private http = inject(HttpClient);
  constructor() {}
  public getAll(): Observable<Reference[]> {
    const url = REFERENCES_API_URL;
    return this.http.get<Reference[]>(url);
  }
  getReferencesByPublicationId(
    publicationId: number
  ): Observable<Reference[]> {
    const url = `${REFERENCES_API_URL}/filterByPublicationId?publicationId=${publicationId}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Reference[]>(url, { headers });
  }
}
