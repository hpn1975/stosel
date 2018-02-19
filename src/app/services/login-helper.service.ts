import { Observable } from 'rxjs/Rx';
import { RequestOptions, Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { config } from './../config';
import { LoginService } from './login.service';

@Injectable()
export class LoginHelpersService {

  constructor(
    private http: Http
  ) { }

  getXsrf(): Observable<any> {
    const options = new RequestOptions({ withCredentials: true });
    const XsrfToken = localStorage.getItem('XSRF-TOKEN');
    if (!XsrfToken) {
      return this.http.get(`${config.api}/api/auth/csrf`, options)
        .first()
        .map(res => res.json())
        .do(res => localStorage.setItem('XSRF-TOKEN', res.data));
    }
    return Observable.of(XsrfToken);
  }

  //This is no longer needed if we are using HTTPClient.  
  //I will remove this once the XSRF is working.
  createHeaders(): RequestOptions {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'X-CSRFToken': localStorage.getItem('XSRF-TOKEN')
    });
    const options = new RequestOptions({ headers, withCredentials: true });
    return options;
  }
}