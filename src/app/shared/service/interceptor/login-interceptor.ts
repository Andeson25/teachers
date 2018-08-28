import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {url} from '../../config/url';
import {isNull, isNullOrUndefined} from 'util';
import {isPlatformBrowser} from '@angular/common';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';

@Injectable()
export class LoginInterceptor implements HttpInterceptor {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  }

  intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {




    if (isPlatformBrowser(this.platformId)) {
      req = req.clone({headers: this.getHeaders(req)});
    }
    return next.handle(req);
  }

  getHeaders(req: HttpRequest<any>): HttpHeaders {
    let authKey = '';
    let headers = new HttpHeaders();
    let temp: HttpRequest<any>;
    if (isNull(req.headers)) {
      temp = req.clone({headers});
    } else {
      temp = req.clone();
    }
    headers = temp.headers;
    if ((isNullOrUndefined(localStorage.getItem('access_token')) ||  localStorage.getItem('access_token') == '') && (isNullOrUndefined(sessionStorage.getItem('access_token')) || sessionStorage.getItem('access_token') == '')) {
      if (req.params.get('grant_type') != null) {
        authKey = 'Basic  Y2xpZW50X2d1aWxkX29mX3RlYWNoZXJzLmNvbTpzZWNyZXRfMDEwc2VydmVyLmNvbQ==';
        headers = headers.set('Content-Type', 'application/x-www-form-urlencoded;application/json');
      }
    } else {
      if (!isNullOrUndefined(sessionStorage.getItem('access_token')))
        authKey = 'Bearer ' + sessionStorage.getItem('access_token');
      else
      if (!isNullOrUndefined(localStorage.getItem('access_token')))
        authKey = 'Bearer ' + localStorage.getItem('access_token');
    }
    headers = headers.set('Authorization', authKey);
    headers = headers.set('Accept', 'application/json');
    return headers;
  }
}
