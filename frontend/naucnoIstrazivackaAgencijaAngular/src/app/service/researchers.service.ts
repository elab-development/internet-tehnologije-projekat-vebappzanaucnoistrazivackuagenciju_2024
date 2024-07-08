import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ResearcherFilter } from '../domain/researchersFilter';
import { Observable } from 'rxjs';
import { Researcher } from '../domain/researcher.domain';
import { Page } from '../domain/page';
import { LocalStorageService } from './local-storage.service';

const RESEARCHERS_API_URL = 'http://localhost:8000/api/researchers';


@Injectable({
  providedIn: 'root',
})
export class ResearchersService {
  private http = inject(HttpClient);
  // private ls = inject(LocalStorageService);
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
  getResearcher(id:number): Observable<Researcher> {
    const url = `${RESEARCHERS_API_URL}/${id}`;
    console.log(url);
    return this.http.get<Researcher>(url);
  }
  updateResearcher(researcher:Researcher):Observable<Researcher> {
    const url = `${RESEARCHERS_API_URL}/update`;
    // const city = `{"id":${researcher.city.id},"name":"${researcher.city.name}"}`;
    const birthday = `${researcher.birthday.getFullYear()}-${researcher.birthday.getMonth()+1}-${researcher.birthday.getDate()}`;
    const body = `{"id":${researcher.id},"firstname":"${researcher.firstname}","lastname":"${researcher.lastname}","birthday":"${birthday}","city_id":${researcher.city.id}}`;
    console.log(body);
    const headers = {'Content-Type': 'application/json'};
    return this.http.put<Researcher>(url,body,{headers});
  }
  saveResearcher(researcher:Researcher):Observable<Researcher> {
    const url = `${RESEARCHERS_API_URL}/store`;
    // const city = `{"id":${researcher.city.id},"name":"${researcher.city.name}"}`;
    const birthday = `${researcher.birthday.getFullYear()}-${researcher.birthday.getMonth()+1}-${researcher.birthday.getDate()}`;
    const body = `{"firstname":"${researcher.firstname}","lastname":"${researcher.lastname}","birthday":"${birthday}","city_id":${researcher.city.id}}`;
    const headers = {'Content-Type': 'application/json'};
    return this.http.post<Researcher>(url,body,{headers});
  }
}
