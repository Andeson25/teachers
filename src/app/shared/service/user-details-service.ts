import {isNullOrUndefined} from 'util';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Router} from '@angular/router';
import {User} from '../models/user';
import {Observable} from 'rxjs/Observable';
import {isPlatformBrowser} from '@angular/common';


@Injectable()
export class UserDetailsService {
  incumbency = {
    'DIRECTOR': 'Директор',
    'TEACHER': 'Вчитель',
    'COUCH_MENTOR': 'Коуч',
    'HEAD_TEACHER': 'Завуч',
    'OTHER': 'Інша'
  };

  public user: User = new User();
  public isAuth: boolean = false;
  public isAdmin: boolean = false;

  loaded: boolean = false;
  loadedAuth: boolean = false;

  private _user = new Subject<User>();
  $user = this._user.asObservable();
  private _isAuth = new Subject<boolean>();
  $isAuth = this._isAuth.asObservable();
  private _isAdmin = new Subject<boolean>();
  $isAdmin = this._isAdmin.asObservable();

  constructor(private _router: Router, @Inject(PLATFORM_ID) private platformId: Object) {

  }

  updateUser(user: User) {
    this.user = user;
    this._user.next(this.user);
  }

  isLocal(): boolean {
    if (isPlatformBrowser(this.platformId))
      return !isNullOrUndefined(localStorage.getItem('access_token'));
    else
      return false;
  }

  isSession(): boolean {
    if (isPlatformBrowser(this.platformId))
      return !isNullOrUndefined(sessionStorage.getItem('access_token'));
    else
      return false;
  }

  login(user: User, storage: Storage) {
    if (this.isLocal())
      sessionStorage.clear();
    else
      localStorage.clear();
    this.user = user;
    this._user.next(this.user);
    storage.setItem('ROLE', user.role);
    storage.setItem('INCUMBENCY', user.incumbency);
    this.isAuth = !isNullOrUndefined(localStorage.getItem('access_token'));
    this._isAuth.next(this.isAuth);
  }

  public loginWithLocal(user: User) {
    this.login(user, localStorage);
  }

  public loginWithSession(user: User) {
    this.login(user, sessionStorage);
  }

  loadUser(user: User){
    if(this.loaded==false){
          this.user=user;
          this._user.next(this.user);
          this.isAuth=true;
          this._isAuth.next(this.isAuth);
     this.loaded=true;
    }
  }

  public logout() {
    this.rmTokenParseInLocalStorage();
    localStorage.clear();
    sessionStorage.clear();
    this.user = new User();
    this.isAuth = false;
    this._isAuth.next(this.isAuth);
    this.loadedAuth=false;
    this.isAdmin = false;
    this._user.next(this.user);
  }

  checkAll() {
    // if (this.checkAuth()) {
    //   this._userService.get().subscribe(next => {
    //     this.user = next;
    //     this._user.next(this.user);
    //   });
    // }
    // this.isAuth = !isNullOrUndefined(localStorage.getItem('user')) || !isNullOrUndefined(sessionStorage.getItem('user'));
    // this._isAuth.next(this.isAuth);
    // if (!isNullOrUndefined(sessionStorage.getItem('user'))) {
    //   this.user = JSON.parse(sessionStorage.getItem('user'));
    //   this._user.next(this.user);
    // }
    // if (!isNullOrUndefined(localStorage.getItem('user'))) {
    //   this.user = JSON.parse(localStorage.getItem('user'));
    //   this._user.next(this.user);
    // }
  }

  checkAuth() {
    if (isPlatformBrowser(this.platformId))
      return this.checkAuthentication(localStorage) || this.checkAuthentication(sessionStorage);
    else
      return false;
  }

  checkAuthStorage(): Observable<boolean> {
    if (!this.isAuth && !this.loadedAuth) {
      this.isAuth = this.checkAuth();
      this._isAuth.next(this.isAuth);
      this.loadedAuth = true;
    }
    return this.$isAuth;
  }

  getUser(): Observable<User> {
    return this.$user;
  }

  tokenParseInLocalStorage(data: any) {
    this.parseInStorage(data, localStorage);
  }

  tokenParseInSessionStorage(data: any) {
    this.parseInStorage(data, sessionStorage);
  }

  checkPermissionAdmin(): boolean {
    if (!(isNullOrUndefined(localStorage.getItem('ROLE'))) || !isNullOrUndefined(sessionStorage.getItem('ROLE'))) {
      return false;
    }
    return localStorage.getItem('ROLE') == 'MODERATOR' || sessionStorage.getItem('ROLE') == 'MODERATOR';
  }

  private parseInStorage(data: any, storage: Storage) {
    storage.removeItem('access_token');
    storage.removeItem('token_type');
    storage.removeItem('expires_in');
    storage.removeItem('scope');
    storage.removeItem('jti');
    storage.removeItem('refresh_token');
    storage.setItem('access_token', data.access_token);
    storage.setItem('token_type', data.token_type);
    storage.setItem('expires_in', new Date().setSeconds(data.expires_in) + '');
    storage.setItem('scope', data.scope);
    storage.setItem('jti', data.jti);
    storage.setItem('refresh_token', data.refresh_token);
  }

  private checkAuthentication(storage: Storage): boolean {
    return !isNullOrUndefined(storage.getItem('access_token'));
  }

  private rmTokenParseInLocalStorage() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('token_type');
    localStorage.removeItem('expires_in');
    localStorage.removeItem('scope');
    localStorage.removeItem('jti');
    localStorage.removeItem('refresh_token');
  }
}
