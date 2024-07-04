import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  constructor() { }
  canActivate(token: string | null): boolean {
    let canActivate: boolean = false;
    if (token) canActivate = true;
    return canActivate;
  }
}
