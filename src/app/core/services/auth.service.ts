import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { User } from 'src/app/shared/models/User.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentLoggedInUser:User|null;

  private isAuthenticated$:Subject<boolean> = new Subject();
  private loginError$:Subject<HttpErrorResponse> = new Subject();

  isAuthenticatedSource = this.isAuthenticated$.asObservable();
  loginErrorSource = this.loginError$.asObservable();

  constructor(private http: HttpClient) {
    this.autoLogin();
  }

  authenticate(email:string, password:string) {
    let body = {
      email,
      password
    }
    this.http.post(
      environment.apiURL + '/api/login',
      body
    ).pipe(take(1)).subscribe((res:any) => {
      this.currentLoggedInUser = new User(res.user.email, res.user.firstName, res.user.lastName);
      this.currentLoggedInUser.Id = res.user.id;
      this.currentLoggedInUser.Token = {
        Value: res.token.value,
        Expires: res.token.expires
      }
      // save user to local storage
      localStorage.setItem("user", JSON.stringify(this.currentLoggedInUser));

      this.isAuthenticated$.next(true);
    }, (error) => {
      this.isAuthenticated$.next(false);
      this.loginError$.next(error);
    });
  };

  register(registrationFormModel:RegistrationFormModel) {
    let body = registrationFormModel;
    return this.http.post(
      environment.apiURL + '/api/register',
      body
    );
  }

  autoLogin() {
      // load user from local storage
      this.currentLoggedInUser = JSON.parse(localStorage.getItem("user")!);
      if(this.isCurrentUserTokenValid() && this.currentLoggedInUser != null) {
        this.isAuthenticated$.next(true);
      }
  }

  isCurrentUserTokenValid() {
    if(this.currentLoggedInUser == null) {
      return false;
    }

    let tokenExpiration = new Date(this.currentLoggedInUser.Token.Expires);
    let today = new Date();
    if(tokenExpiration.getTime() < today.getTime()) {
      return false;
    } else {
      return true;
    }
  }

  logout() {
    localStorage.removeItem("user");
    this.currentLoggedInUser = null;
    this.isAuthenticated$.next(false);
  }
}

export class UserWithTokenResponse {
  user : {
    password?: any;
    lastName: string;
    firstName: string;
    id: string;
    email: string;
  };
  token : {
    token: string;
    expires: string;
  }
}

export class RegistrationFormModel
{
    email:string;
    password:string;
    lastName:string;
    firstName:string;
}
