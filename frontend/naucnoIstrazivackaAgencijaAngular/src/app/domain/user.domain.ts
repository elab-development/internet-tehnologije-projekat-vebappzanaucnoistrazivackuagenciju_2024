export type AuthenticatingUser = {
    email: string;
    password:string;
  }
  export type RegistratingUser = {
    name: string;
    email: string;
    password:string;
  }
  export type UserToken = {
    token:string;
  }