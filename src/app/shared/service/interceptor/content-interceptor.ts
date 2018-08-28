import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {url} from '../../config/url';
import {isNull} from 'util';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {isPlatformBrowser} from '@angular/common';

@Injectable()
export class ContentInterceptor implements HttpInterceptor {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  }

  intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    req = req.clone({url: url + req.url});
    if (isPlatformBrowser(this.platformId)) {
      req = req.clone({headers: this.getHeaders(req)});
    }
    return next.handle(req);
  }

  getHeaders(req: HttpRequest<any>): HttpHeaders {
    let headers = new HttpHeaders();
    let temp: HttpRequest<any>;
    if (isNull(req.headers)) {
      temp = req.clone({headers});
    } else {
      temp = req.clone();
    }
    headers = temp.headers;
    if (temp.headers.keys().indexOf('enctype') != -1) {
      // headers = headers.set('Content-type', 'application/x-www-form-urlencoded');
      headers = headers.set('enctype', 'form-data/multipart');
    } else if (temp.headers.keys().indexOf('Content-Type') != -1) {
      if (temp.headers.get('Content-Type').indexOf('application/json') == -1) {
        headers = headers.set('Content-Type', temp.headers.get('Content-Type') + ';application/json');
      }
    }
    else {
      headers = headers.append('Content-Type', 'application/json');
    }

    headers = headers.append('Accept', 'application/json');
    return headers;
  }

}
