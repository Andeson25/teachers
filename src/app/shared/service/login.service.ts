import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user';

@Injectable()
export class LoginService {

  static tokenName: string = "access_token";

  constructor(private _http: HttpClient) {
  }

  sendCredentials(model:User): Observable<any> {
    return this._http.post("/oauth/token", null, {
      params: new HttpParams()
        .set("username", model.email)
        .set("password", model.password)
        .set("grant_type", "password")
    }).catch((error) => Observable.throw(error));
  }
}
