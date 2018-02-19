import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginHelpersService } from './login-helper.service';
import { config } from './../config';

@Injectable()
export class LoginService {
    
  user$ = new BehaviorSubject<any>(this.getAuthDetails());
  user: any = false;

  constructor(
    public http: HttpClient,
    private hs: LoginHelpersService,
    public jwtHelper: JwtHelperService
  ) {
    this.setUserData();
  }

  authPost(url: string, data: any): Observable<any> {
    //const options = this.hs.createHeaders();
    const options = {headers:{
      'Content-Type': 'application/json'
      //commented out below as I am using HttpClientXSRFModule to overwrite the default header name.
      //'X-CSRFToken': localStorage.getItem('XSRF-TOKEN')
    }
  };
    
    return this.http.post(url, data, options);
  }

  getOrSetUsername(): string {
    let username = this.user.username || localStorage.getItem('username');
    if (!username) {
      username = btoa(Math.random().toString());
      localStorage.setItem('username', username);
    }
    return username;
  }

  usernameIsUnique(username: string): Observable<any> {
    return this.http.get(`${config.api}/api/auth/username-exists/?u=${username}`).first();
  }

  register(formData: any): Observable<any> {
    return this.authPost(`${config.api}/api/auth/register/`, formData)
      .do(res => this.setToken(res.data));
  }

  login(formData: any): Observable<any> {
    return this.authPost(`${config.api}/api/auth/login/`, formData)
      .do(res => this.setToken(res.data));
  }

  editProfile(formData: any): Observable<any> {
    // need to set withCredentials to send csrf token for Django
    return this.http.post(`${config.api}/api/user/update/`, formData, { withCredentials: true });
  }

  editPassword(formData: any): Observable<any> {
    return this.http.post(
      `${config.api}/api/user/update-password/`,
      formData,
      { withCredentials: true }
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    // Cookie.delete('token', '/');
    this.setUserData();
  }

  isAuth(): boolean {
    const cookieToken = this.getToken();
    if (cookieToken) {
      return !this.jwtHelper.isTokenExpired(cookieToken);
    } else {
      return false;
    }
  }

  getAuthDetails(): any {
    const cookieToken = this.getToken();
    if (cookieToken) {
      return this.jwtHelper.decodeToken(cookieToken);
    } else {
      return false;
    }
  }

  setUserData(): void {
    this.user$.next(this.getAuthDetails());
    this.user = this.getAuthDetails();
  }

  private setToken(token: any): void {
    localStorage.setItem('token', token);
  }

  private getToken(): string {
    return localStorage.getItem('token');
  }
}
