import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {url} from "../../config/url";
import {isNull} from "util";
import {isPlatformBrowser} from "@angular/common";
import {Inject, PLATFORM_ID} from "@angular/core";


export class MultiPartInterceptor implements HttpInterceptor {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  }

  intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {

    if (isPlatformBrowser(this.platformId)) {
      req = req.clone({headers: this.getHeaders(req)});
    }
    return next.handle(req)
  }

  getHeaders(req: HttpRequest<any>): HttpHeaders {
    let headers = new HttpHeaders();
    if (isNull(req.headers)) {
      req = req.clone({headers});
    } else {
      req = req.clone();
    }
    if (req.headers.keys().indexOf("multipart") != -1 || req.headers.keys().indexOf("enctype") != -1) {
      headers = headers.append("enctype", "form-data/multipart")
        // .append("Authorization", "Bearer " + localStorage.getItem("access_token"));
    }
    headers = headers.append("Accept", "application/json");
    return headers;
  }
}

