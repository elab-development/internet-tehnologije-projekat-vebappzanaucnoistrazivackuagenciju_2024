import { Component, inject } from '@angular/core';
import { LoginOrRegisterComponent } from '../../components/login-or-register/login-or-register.component';
import { CommonModule } from '@angular/common';
import { PermissionsService } from '../../service/permissions.service';
import { LocalStorageService } from '../../service/local-storage.service';
import { LogoutComponent } from '../logout/logout.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [LoginOrRegisterComponent,CommonModule,LogoutComponent],
  template:`
    <app-login-or-register *ngIf="!loggedIn"></app-login-or-register>
    <!-- <div *ngIf="loggedIn">ulogovali ste</div> -->
    <app-logout *ngIf="loggedIn"></app-logout>
  `,
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  loggedIn = inject(PermissionsService).canActivate(inject(LocalStorageService).get("userToken"));
}
