import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/from';
@Injectable()
export class FetchDataService {

  constructor(private http: Http) { }
  header = new Headers();
  setHeader() {
  this.header.append('Content-Type', 'application/json');
  }
  
  getData(ApiUrl: string): Observable<any> { 
    return this.http.get(ApiUrl)
      .map(res => res.json()
      );
  };

  postData(ApiUrl: string, content: string, headerArray: any[]): Observable<any> {
    this.setHeader();
    return this.http.post(ApiUrl, content, { headers:this.header});
  };
}
