import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ResearcherFilter } from '../domain/researchersFilter';
import { Observable } from 'rxjs';
import { Researcher } from '../domain/researcher.domain';
import { Page } from '../domain/page';

const RESEARCHERS_API_URL = 'http://localhost:8000/api/researchers';


@Injectable({
  providedIn: 'root',
})
export class ResearchersService {
  private http = inject(HttpClient);
  constructor() {}
  getResearchersPage(
    page: number,
    size: number,
    filter: ResearcherFilter
  ): Observable<Page<Researcher>> {
    const url = `${RESEARCHERS_API_URL}/filterPaginate?page=${
      page 
    }&size=${size}`;
    const body = `{"cityId":${filter.cityId}}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    // console.log(url);
    return this.http.post<Page<Researcher>>(url, body, { headers });
  }
}
