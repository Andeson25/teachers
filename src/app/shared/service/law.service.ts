import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Law} from "../models/law";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {ForumTopic} from "../models/forum-topic";

@Injectable()
export class LawService {

  constructor(private httpClient: HttpClient) {
  }

  readonly controllerPath = "/law";


  save(object: Law): Observable<Law> {
    return this.httpClient.post<Law>(this.controllerPath + '/save', JSON.stringify(object)).catch(err =>
      Observable.throw(err));
  }
  saveWithId(object: Law, id: number): Observable<Law> {
    return this.httpClient.post<Law>(this.controllerPath + '/save/' + object.container.id, JSON.stringify(object)).catch(err =>
      Observable.throw(err));
  }


  update(object: Law): Observable<Law> {
    return this.httpClient.post<Law>(this.controllerPath + '/update', JSON.stringify(object)).catch(err =>
      Observable.throw(err));
  }


  delete(objectId: number): Observable<Law> {
    return this.httpClient.delete<Law>(this.controllerPath + '/delete' + '/' + objectId).catch(err =>
      Observable.throw(err));
  }


  findAll(): Observable<Law[]> {
    return this.httpClient.get<Law[]>(this.controllerPath + '/find-all').catch(err =>
      Observable.throw(err));
  }


  findOne(objectId: number): Observable<Law> {
    return this.httpClient.get<Law>(this.controllerPath + '/find-one/' + objectId).catch(err =>
      Observable.throw(err));
  }



  findOneAvailable(objectId: number): Observable<Law> {
    return this.httpClient.get<Law>(this.controllerPath + '/find-one-available/' + objectId).catch(err =>
      Observable.throw(err));
  }

  findAllAvailable(): Observable<Law[]> {
    return this.httpClient.get<Law[]>(this.controllerPath + '/find-all-available').catch(err =>
      Observable.throw(err));
  }



  findAllSort(): Observable<Law[]> {
    return this.httpClient.get<Law[]>(this.controllerPath + '/find-all-sort').catch(err =>
      Observable.throw(err));
  }

  findAllByContainer(id: number): Observable<Law[]> {
    return this.httpClient.get<Law[]>(this.controllerPath + '/find-all-by-container/' + id).catch(err =>
      Observable.throw(err));
  }





}
