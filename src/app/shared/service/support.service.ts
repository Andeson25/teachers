import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from '../models/user';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class SupportService {


  readonly controllerPath = "/support";

  constructor(private _httpClient: HttpClient) { }

  sendCallBack(text: string): Observable<User> {
    return this._httpClient.post<User>(this.controllerPath + "/send-message?text="+encodeURI(text), new FormData).catch(err =>
            Observable.throw(err));
  }

}
