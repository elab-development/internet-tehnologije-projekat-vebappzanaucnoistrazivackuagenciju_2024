import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../domain/page';
import { PublicationResearcher } from '../domain/publicationResearcher.domain';

const PUBLICATION_RESEARCHER_API_URL =
  'http://localhost:8000/api/publicationResearchers';

@Injectable({
  providedIn: 'root',
})
export class PublicationResearcherService {
  private http = inject(HttpClient);
  constructor() {}
  getPublicationResearchersPage(
    page: number,
    size: number,
    researcherId: number
  ): Observable<Page<PublicationResearcher>> {
    const url = `${PUBLICATION_RESEARCHER_API_URL}/filterPaginate?page=${page}&size=${size}&researcherId=${researcherId}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    // console.log(url);
    return this.http.get<Page<PublicationResearcher>>(url, { headers });
  }
}
