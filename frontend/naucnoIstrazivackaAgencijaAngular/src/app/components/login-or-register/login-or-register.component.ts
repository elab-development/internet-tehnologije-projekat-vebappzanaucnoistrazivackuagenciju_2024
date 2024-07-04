import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-login-or-register',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  template: `
    <div class="publicView">
      <h2>Login or Register</h2>
      <div>
        <a routerLink="../login"><input type="button" value="Login" /></a>
        <br />
        <a routerLink="../register"
          ><input type="button" value="Register"
        /></a>
      </div>
    </div>
  `,
  styleUrl: './login-or-register.component.scss',
})
export class LoginOrRegisterComponent {}
