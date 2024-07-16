import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../service/users.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../service/local-storage.service';
import { AuthenticatingUser } from '../../domain/user.domain';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="publicView">
      <h2>Login form</h2>
      <form [formGroup]="loginGroup">
        <div>
          <label for="email">Email: </label>
          <input type="email" name="email" id="email" formControlName="email" />
        </div>
        <div *ngIf="loginGroup.get('email')?.errors?.['required']">
          email is required.
        </div>
        <br />
        <div>
          <label for="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            formControlName="password"
          />
        </div>
        <div *ngIf="loginGroup.get('password')?.errors?.['required']">
          password is required.
        </div>
        <br />
        <input type="button" value="Login" (click)="login()" />
      </form>
    </div>
  `,
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private usersService: UsersService = inject(UsersService);
  private router: Router = inject(Router);
  constructor(
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService
  ) {}
  loginGroup = this.formBuilder.group({
    email: ['', { nonNullable: true, validators: [Validators.required] }],
    password: ['', { nonNullable: true, validators: [Validators.required] }],
  });
  protected myError: any;
  login(): void {
    let email = this.loginGroup.get('email')?.getRawValue();
    let password = this.loginGroup.get('password')?.getRawValue();
    let user: AuthenticatingUser = { email: email, password: password };
    this.localStorageService.remove('userToken');
    this.usersService
      .authenticate(user)
      .pipe(
        catchError((err) => {
          throw 'error in source. Details: ' + err;
        })
      )
      .subscribe({
        next: (x) => {
          console.log(x);
          this.localStorageService.set('userToken', x);
          let token = this.localStorageService.get('userToken');
          console.log("MOJ TOKEN:::");
          console.log(token);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.log(err);
          window.location.reload();
        },
      });
  }
}
