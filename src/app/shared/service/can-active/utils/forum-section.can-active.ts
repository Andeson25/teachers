import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {UserDetailsService} from '../../user-details-service';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {isNullOrUndefined} from 'util';

@Injectable()
export class UserCanActive {
  constructor(private _router: Router, private _userDetailsService: UserDetailsService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this._userDetailsService.checkAuth()) {
      return true;
    } else {
      this._router.navigateByUrl("/sign-in");
      return false;
    }
  }
}
