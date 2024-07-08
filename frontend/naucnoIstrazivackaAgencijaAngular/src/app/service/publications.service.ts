import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../domain/page';
import { Researcher } from '../domain/researcher.domain';
import { Publication } from '../domain/publication.domain';

const PUBLICATIONS_API_URL = 'http://localhost:8000/api/publications';

@Injectable({
  providedIn: 'root',
})
export class PublicationsService {
  private http = inject(HttpClient);
  constructor() {}
  getPublicationsPage(
    page: number,
    size: number
  ): Observable<Page<Publication>> {
    const url = `${PUBLICATIONS_API_URL}/paginate?page=${page}&size=${size}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Page<Publication>>(url, { headers });
  }
  getPublication(id: number): Observable<Publication> {
    const url = `${PUBLICATIONS_API_URL}/${id}`;
    console.log(url);
    return this.http.get<Publication>(url);
  }
}
