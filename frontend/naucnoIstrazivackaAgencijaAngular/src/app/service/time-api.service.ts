import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentTime } from '../domain/timeApi';

const TIME_API_URL = 'https://timeapi.io/api/Time/current/zone?timeZone=Europe/Belgrade';
@Injectable({
  providedIn: 'root'
})
export class TimeApiService {
  private http = inject(HttpClient);

  constructor() { }

  getTime(): Observable<CurrentTime> {
    const url = TIME_API_URL;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<CurrentTime>(url, { headers });
  }
}