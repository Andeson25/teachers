import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Category} from "../models/category";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class CategoryService {


  constructor(private httpClient: HttpClient) {
  }

  readonly controllerPath = "/courseCategory";


  save(object: Category): Observable<Category> {
    return this.httpClient.post<Category>(this.controllerPath + '/save', JSON.stringify(object)).catch(err =>
      Observable.throw(err));
  }

  delete(objectId: number): Observable<Category> {
    return this.httpClient.delete<Category>(this.controllerPath + '/delete' + '/' + objectId).catch(err =>
      Observable.throw(err));
  }

  update(object: Category): Observable<Category> {
    return this.httpClient.put<Category>(this.controllerPath + '/update', JSON.stringify(object)).catch(err =>
      Observable.throw(err));
  }

  findAll(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.controllerPath + '/find-all').catch(err =>
      Observable.throw(err));
  }

  findOne(objectId: number): Observable<Category> {
    return this.httpClient.get<Category>(this.controllerPath + '/find-one/' + objectId).catch(err =>
      Observable.throw(err));
  }

  findOneAvailable(objectId: number): Observable<Category> {
    return this.httpClient.get<Category>(this.controllerPath + '/find-one-available/' + objectId).catch(err =>
      Observable.throw(err));
  }

  findAllAvailable(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.controllerPath + '/find-all-available').catch(err =>
      Observable.throw(err));
  }



  findByName(name: string): Observable<Category> {
    return this.httpClient.get<Category>(this.controllerPath + '/find-by-name/', {params: new HttpParams().set("name", name)}).catch(err =>
      Observable.throw(err));
  }
}
