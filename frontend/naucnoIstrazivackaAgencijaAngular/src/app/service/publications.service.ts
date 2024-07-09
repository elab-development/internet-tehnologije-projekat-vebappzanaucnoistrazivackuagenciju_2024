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
  updatePublication(publication:Publication):Observable<Publication> {
    const url = ${PUBLICATIONS_API_URL}/update;
    const date = ${publication.date.getFullYear()}-${publication.date.getMonth()+1}-${publication.date.getDate()};
    const body = {"id":${publication.id},"name":"${publication.name}","text":"${publication.text}","date":"${date}"};
    console.log(body);
    const headers = {'Content-Type': 'application/json'};
    return this.http.put<Publication>(url,body,{headers});
  }
  savePublication(publication:Publication):Observable<Publication> {
    const url = ${PUBLICATIONS_API_URL}/store;
    const date = ${publication.date.getFullYear()}-${publication.date.getMonth()+1}-${publication.date.getDate()};
    const body = {"name":"${publication.name}","text":"${publication.text}","date":"${date}"};
    console.log(body);
    const headers = {'Content-Type': 'application/json'};
    return this.http.post<Publication>(url,body,{headers});
  }
}
