import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../domain/page';
import { Publication } from '../domain/publication.domain';
import { PublicationFullInfo } from '../domain/publicationFullInfo';

const PUBLICATIONS_API_URL = 'http://localhost:8000/api/publications';

@Injectable({
  providedIn: 'root',
})
export class PublicationsService {
  private http = inject(HttpClient);
  constructor() {}
  public getAll(): Observable<Publication[]> {
    const url = PUBLICATIONS_API_URL;
    return this.http.get<Publication[]>(url);
  }
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
  updatePublication(publication: Publication): Observable<Publication> {
    const url = `${PUBLICATIONS_API_URL}/update`;
    const date = `${publication.date.getFullYear()}-${
      publication.date.getMonth() + 1
    }-${publication.date.getDate()}`;
    const body = `{"id":${publication.id},"name":"${publication.name}","text":"${publication.text}","date":"${date}"}`;
    console.log(body);
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put<Publication>(url, body, { headers });
  }
  savePublication(publication: Publication): Observable<Publication> {
    const url = `${PUBLICATIONS_API_URL}/store`;
    const date = `${publication.date.getFullYear()}-${
      publication.date.getMonth() + 1
    }-${publication.date.getDate()}`;
    const body = `{"name":"${publication.name}","text":"${publication.text}","date":"${date}"}`;
    console.log(body);
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<Publication>(url, body, { headers });
  }
  savePublicationFullInfo(
    publication: PublicationFullInfo
  ): Observable<string> {
    const url = `${PUBLICATIONS_API_URL}/saveFullPublicationInfoDeleteAndStore`;
    console.log(
      '*********************************************************************'
    );
    const datePubl = `${publication.publication.date.getFullYear()}-${
      publication.publication.date.getMonth() + 1
    }-${publication.publication.date.getDate()}`;
    const body = `{"publication":{"name":"${publication.publication.name}",
    "text":"${publication.publication.text}","date":"${datePubl}"},
    "publicationResearchersToDelete":${JSON.stringify(
      publication.publicationResearchersToDelete
    )},
    "publicationResearchersToSave":${JSON.stringify(
      publication.publicationResearchersToSave
    )},
    "referencesToSave":${JSON.stringify(publication.referencesToSave)},
    "referencesToDelete":${JSON.stringify(publication.referencesToDelete)}}`;
    console.log(body);
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<string>(url, body, { headers });
  }
  updatePublicationFullInfo(
    publication: PublicationFullInfo
  ): Observable<string> {
    const url = `${PUBLICATIONS_API_URL}/updateFullPublicationInfoDeleteAndStore`;
    console.log(
      '*******UPDATE**************************************************************'
    );
    console.log(url);
    const someDate = new Date(publication.publication.date);

    // const datePubl = `${publication.publication.date.getFullYear()}-${
    const datePubl = `${someDate.getFullYear()}-${
      someDate.getMonth() + 1
    }-${someDate.getDate()}`;
    const body = `{"publication":{"id":${publication.publication.id},
    "name":"${publication.publication.name}",
    "text":"${publication.publication.text}","date":"${datePubl}"},
    "publicationResearchersToDelete":${JSON.stringify(
      publication.publicationResearchersToDelete
    )},
    "publicationResearchersToSave":${JSON.stringify(
      publication.publicationResearchersToSave
    )},
    "referencesToSave":${JSON.stringify(publication.referencesToSave)},
    "referencesToDelete":${JSON.stringify(publication.referencesToDelete)}}`;
    console.log(JSON.stringify(body));
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put<string>(url, body, { headers });
  }
}
