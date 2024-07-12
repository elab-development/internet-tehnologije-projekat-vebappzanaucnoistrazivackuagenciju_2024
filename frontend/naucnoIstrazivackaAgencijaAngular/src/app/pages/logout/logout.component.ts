import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../service/local-storage.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  template: `
  <div class="publicView">
    <h2>Logout</h2>
    <p>Do you want to logout?</p>
    <input type="button" value="Yes" (click)="logout()" />
    <br />
    <input type="button" value="No" (click)="back()" />
  </div>
`,
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {

  constructor(
    private location: Location,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}
  back() {
    // this.location.back();
    this.router.navigate(['/home']);
  }
  logout() {
    this.localStorageService.remove('userToken');
    
    this.router.navigate(['/home/account']);
    window.location.reload();

  }
}
