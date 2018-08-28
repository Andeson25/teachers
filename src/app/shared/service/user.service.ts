import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {isNullOrUndefined} from 'util';
import {UserPageableWrapper} from '../models/user-pageable-wrapper';

@Injectable()
export class UserService {

  readonly controllerPath = '/user';

  constructor(private httpClient: HttpClient) {
  }

  save(object: HTMLFormElement, user: string): Observable<User> {
    let formData: FormData = new FormData(object);
    formData.append('user', user);
    return this.httpClient.post<User>(this.controllerPath + '/save', formData, {headers: new HttpHeaders().append('enctype', 'enctype')}).catch(err =>
      Observable.throw(err));
  }

  update(user: string, object?: HTMLFormElement): Observable<User> {
    let formData: FormData = new FormData(isNullOrUndefined(object) ? null : object);
    formData.append('userJson', user);
    return this.httpClient.post<User>(this.controllerPath + '/update', formData, {headers: new HttpHeaders().set('enctype', 'enctype')}).catch(err =>
      Observable.throw(err));
  }

  sendEmail(email: string): Observable<any> {
    return this.httpClient.post<any>(this.controllerPath + '/reset-password', null, {params: new HttpParams().append('email', email)}).catch(err =>
      Observable.throw(err));
  }

  sendPassword(password: string, uuid: string): Observable<any> {
    return this.httpClient.post<any>(this.controllerPath + '/update-password', null, {params: new HttpParams().append('newPassword', password).append('uuid', uuid)}).catch(err =>
      Observable.throw(err));
  }

  get(): Observable<User> {
    console.log('get!');
    return this.httpClient.get<User>(this.controllerPath).catch(err =>
      Observable.throw(err));
  }


  delete(objectId: number): Observable<User> {
    return this.httpClient.delete<User>(this.controllerPath + '/delete' + '/' + objectId).catch(err =>
      Observable.throw(err));
  }

  findAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.controllerPath + '/find-all').catch(err =>
      Observable.throw(err));
  }


  findOne(objectId: number): Observable<User> {
    return this.httpClient.get<User>(this.controllerPath + '/find-one/' + objectId).catch(err =>
      Observable.throw(err));
  }

  findOneAvailable(objectId: number): Observable<User> {
    return this.httpClient.get<User>(this.controllerPath + '/find-one-available/' + objectId).catch(err =>
      Observable.throw(err));
  }

  findAllAvailable(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.controllerPath + '/find-all-available').catch(err =>
      Observable.throw(err));
  }

  findByName(name: string): Observable<User[]> {
    return this.httpClient.get<User[]>(this.controllerPath + '/find-by-name/' + name).catch(err =>
      Observable.throw(err));
  }


  findByLastName(name: string): Observable<User[]> {
    return this.httpClient.get<User[]>(this.controllerPath + '/find-by-last-name/' + name).catch(err =>
      Observable.throw(err));
  }

  findBySurnameName(name: string): Observable<User[]> {
    return this.httpClient.get<User[]>(this.controllerPath + '/find-by-surname/' + name).catch(err =>
      Observable.throw(err));
  }

  findByEmail(email: string): Observable<User> {
    return this.httpClient.get<User>(this.controllerPath + '/find-by-email/' + email).catch(err =>
      Observable.throw(err));
  }

  findByPhone(email: string): Observable<User> {
    return this.httpClient.get<User>(this.controllerPath + '/find-by-phone/' + email).catch(err =>
      Observable.throw(err));
  }

  findByPlaceOfWork(placeOfWorkId: number): Observable<User[]> {
    return this.httpClient.get<User[]>(this.controllerPath + '/find-by-place-of-work/' + placeOfWorkId).catch(err =>
      Observable.throw(err));
  }

  findByUuid(uuid: string): Observable<User[]> {
    return this.httpClient.get<User[]>(this.controllerPath + '/find-by-uuid/' + uuid).catch(err =>
      Observable.throw(err));
  }

  findByIncumbencyNumber(incumbencyNumber: number): Observable<User[]> {
    return this.httpClient.get<User[]>(this.controllerPath + '/find-by-incumbencyNumber/' + incumbencyNumber).catch(err =>
      Observable.throw(err));
  }

  findAllPageable(page: number, count: number): Observable<User[]> {
    return this.httpClient.get<User[]>(this.controllerPath + '/find-all-pageable/' + page + '/' + count).catch(err =>
      Observable.throw(err));
  }

  findAllPageableFiltering(spec: string, placeOfWork: string, page: number, count: number): Observable<UserPageableWrapper> {
    if (spec == 'Предмет')
      spec = 'empty';
    if (placeOfWork == '')
      placeOfWork = 'empty';
    console.log(this.controllerPath + '/filter/' + spec + '/' + placeOfWork + '/' + page + '/' + count);
    return this.httpClient.get<UserPageableWrapper>(this.controllerPath + '/filter/' + spec + '/' + placeOfWork + '/' + page + '/' + count).catch(err =>
      Observable.throw(err));
  }

  findAllNotPerevireno(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.controllerPath + '/find-all-not-perevireno').catch(err => Observable.throw(err));
  }

  pereviryty(user: User): Observable<User> {
    return this.httpClient.post<User>(this.controllerPath + '/pereviryty', JSON.stringify(user)).catch(err =>
      Observable.throw(err));
  }

}
