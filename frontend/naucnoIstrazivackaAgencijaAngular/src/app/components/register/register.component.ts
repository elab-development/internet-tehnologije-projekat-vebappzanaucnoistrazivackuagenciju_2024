import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../service/users.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../service/local-storage.service';
import { confirmedPassword } from '../../myValidators/myCustomValidatorFunctions';
import { RegistratingUser } from '../../domain/user.domain';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  template: `
  <div class="publicView">

    <h2>Register form</h2>
    <form [formGroup]="registrationGroup">
      <div>
        <label for="name">Name: </label>
        <input
        type="text"
        name="name"
        id="name"
        formControlName="name"
        />
      </div>
      <div *ngIf="registrationGroup.get('name')?.errors?.['required']">
      name is required.
      </div>
    <br>
    <div>
      <label for="email">Email: </label>
      <input
      type="email"
        name="email"
        id="email"
        formControlName="email"
        />
      </div>
      <div *ngIf="registrationGroup.get('email')?.errors?.['required']">
      email is required.
    </div>
      <div *ngIf="registrationGroup.get('email')?.errors?.['email']">
      email is not valid.
    </div>
    <br>
    <div>
      <label for="password">Password: </label>
      <input
      type="password"
      name="password"
      id="password"
      formControlName="password"
      />
    </div>
    <div *ngIf="registrationGroup.get('password')?.errors?.['required']">
      password is required.
    </div>
    <br />
    <div>
      <label for="confirmPassword">Confirm password: </label>
      <input
      type="password"
      name="confirmPassword"
      id="confirmPassword"
      formControlName="confirmPassword"
      />
    </div>
    <div *ngIf="registrationGroup.get('confirmPassword')?.errors?.['required']">
      confirmPassword is required.
    </div>
    <div *ngIf="registrationGroup?.errors?.['password not confirmed']">
      confirmPassword and password must match
    </div>
    <br />
    <input type="button" value="Register" (click)="register()" [disabled]="registrationGroup.valid == false" />
  </form>
  </div>
  `,
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private usersService: UsersService = inject(UsersService);
  private router: Router = inject(Router);
  constructor(private formBuilder: FormBuilder,private localStorageService: LocalStorageService){}
  registrationGroup = this.formBuilder.group({
    name:this.formBuilder.control("",{ nonNullable: true, validators: [Validators.required] }),
    email:this.formBuilder.control("",{ nonNullable: true, validators: [Validators.required,Validators.email] }),
    password:this.formBuilder.control("",{ nonNullable: true, validators: [Validators.required] }),
    confirmPassword:this.formBuilder.control("",{ nonNullable: true, validators: [Validators.required] }),
  },{validators:[confirmedPassword()]});
  
  register() {
    let name = this.registrationGroup.get("name")?.getRawValue();
    let email = this.registrationGroup.get("email")?.getRawValue();
    let password = this.registrationGroup.get("password")?.getRawValue();
    let user : RegistratingUser = {
      name: name,
      email: email,
      password:password
    }
    this.usersService
    .register(user)
    .pipe(
      catchError((err) => {
        throw 'error in source. Details: ' + JSON.stringify(err);
      })
    )
    .subscribe({
      next: (x) => {
        this.localStorageService.set("userToken",x.token);
        this.router.navigate(['/home/account']);
      },
      error: (err) => {
        console.log(JSON.stringify(err))
      }
    });

  }
}