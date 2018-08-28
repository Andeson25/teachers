import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Router} from "@angular/router";
import {UserDetailsService} from "../user-details-service";
import {isNullOrUndefined} from "util";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private  _router: Router, private _userDetailsService: UserDetailsService) {
  }

  intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    return next.handle(req).catch(err => {
      console.log(err.status);
      if(err.status===404){
        this._router.navigateByUrl('/error/404');
      }
      if (err.status === 401) {
        this._userDetailsService.logout();
        this._router.navigateByUrl('/sign-in');
        if (isNullOrUndefined(sessionStorage.getItem("refresh_token"))||isNullOrUndefined(localStorage.getItem("refresh_token"))) {
          return Observable.throw(err);
        }
      } else {
        return Observable.throw(err);
      }
    });
  }
}

