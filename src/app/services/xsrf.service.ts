import { Http, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { config } from './../config';


@Injectable()
export class XsrfService {

  constructor(
    private http: Http
  ) { }

  load(): Promise<any> {
    return this.getXsrf()
      .toPromise()
      .catch(() => Promise.resolve());
  }

  getXsrf(): Observable<any> {
    //const options = new RequestOptions({ withCredentials: true });
    const xsrfToken = localStorage.getItem('XSRF-TOKEN');
    if (!xsrfToken) {
      //return this.http.get(`${config.api}/api/auth/csrf`, options)
      return this.http.get(`${config.api}/api/auth/csrf`)
        .first()
        .map(res => res.json())
        .do(res => localStorage.setItem('XSRF-TOKEN', res.data));
    }
    console.log("my token:" + xsrfToken);
    return Observable.of(xsrfToken);
  }
}