import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {url} from "../../config/url";
import {isNullOrUndefined} from "util";
import {isPlatformBrowser} from "@angular/common";
import {Inject, PLATFORM_ID} from "@angular/core";


export class TockenActiveInterceptor implements HttpInterceptor {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  }

  intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {

    if (isPlatformBrowser(this.platformId)) {
      req = req.clone({headers: this.getHeaders()});
    }
    return next.handle(req)
  }

  getHeaders(): HttpHeaders {
    let authKey = "";
    let headers = new HttpHeaders();
    if (!isNullOrUndefined(localStorage.getItem("access_token")) && localStorage.getItem("access_token") != "") {
      authKey = "Bearer " + localStorage.getItem("access_token");
      headers = headers.append("Authorization", authKey);
      headers = headers.append("Accept", "application/json");
      return  headers
    }
  }
}

