import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticatingUser, RegistratingUser, UserToken } from '../domain/user.domain';

const USERS_API_URL = 'http://localhost:8000/api';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http = inject(HttpClient);
  constructor() { }

  public authenticate(user: AuthenticatingUser): Observable<string> {
    const url = USERS_API_URL + '/login';
    const headers = { 'Content-Type': 'application/json' };
    const body = `{"email":"${user.email}","password":"${user.password}"}`;
    return this.http.post<string>(url, body, { headers });
  }

  public register(user: RegistratingUser): Observable<UserToken> {
    const url = USERS_API_URL + '/register';
    const headers = { 'Content-Type': 'application/json' };
    const body = `{"name":"${user.name}","email":"${user.email}","password":"${user.password}"}`;
    return this.http.post<UserToken>(url, body, { headers });
  }
}
