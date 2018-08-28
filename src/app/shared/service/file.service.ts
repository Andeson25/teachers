import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {File} from "../models/file";


@Injectable()
export class FileService {


  constructor(private httpClient: HttpClient) {
  }

  readonly controllerPath = "/file";


  save(fileForm: HTMLFormElement): Observable<File> {
    return this.httpClient.post<File>(this.controllerPath + "/save", new FormData(fileForm),
      {headers: new HttpHeaders().append("enctype", "")}).catch(err =>
      Observable.throw(err))
  }
  saveUser(fileForm: HTMLFormElement): Observable<File> {
    return this.httpClient.post<File>(this.controllerPath + "/save-user", new FormData(fileForm),
      {headers: new HttpHeaders().append("enctype", "")}).catch(err =>
      Observable.throw(err))
  }


  update(fileForm: HTMLFormElement): Observable<File> {
    return this.httpClient.put<File>(this.controllerPath + "/update", new FormData(fileForm),
      {headers: new HttpHeaders().append("enctype", "")}).catch(err =>
      Observable.throw(err))
  }


  delete(objectId: number): Observable<File> {
    return this.httpClient.delete<File>(this.controllerPath + '/delete' + '/' + objectId).catch(err =>
      Observable.throw(err));
  }


  findAll(): Observable<File[]> {
    return this.httpClient.get<File[]>(this.controllerPath + '/find-all').catch(err =>
      Observable.throw(err));
  }

  findOne(objectId: number): Observable<File> {
    return this.httpClient.get<File>(this.controllerPath + '/find-one/' + objectId).catch(err =>
      Observable.throw(err));
  }

  findOneAvailable(objectId: number): Observable<File> {
    return this.httpClient.get<File>(this.controllerPath + '/find-one-available/' + objectId).catch(err =>
      Observable.throw(err));
  }


  findByName(name: string): Observable<File> {
    return this.httpClient.get<File>(this.controllerPath + '/find-by-name/' + name).catch(err =>
      Observable.throw(err));
  }

  findAllByFileType(fleTypeNumber: number): Observable<File> {
    return this.httpClient.get<File>(this.controllerPath + '/find-by-type/' + fleTypeNumber).catch(err =>
      Observable.throw(err));
  }

  findAllByCategoryId(categoryId: number): Observable<File[]> {
    return this.httpClient.get<File[]>(this.controllerPath + '/find-by-courseCategory-id/' + categoryId).catch(err =>
      Observable.throw(err));
  }

}
