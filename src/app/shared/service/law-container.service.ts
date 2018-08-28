import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {LawContainer} from "../models/law-container";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class LawContainerService {

  constructor(private httpClient: HttpClient) {
  }

  readonly controllerPath = "/law-container";


  save(object: LawContainer): Observable<LawContainer> {
    return this.httpClient.post<LawContainer>(this.controllerPath + '/save', JSON.stringify(object)).catch(err =>
      Observable.throw(err));
  }

  update(object: LawContainer): Observable<LawContainer> {
    return this.httpClient.post<LawContainer>(this.controllerPath + '/update', JSON.stringify(object)).catch(err =>
      Observable.throw(err));
  }


  delete(objectId: number): Observable<LawContainer> {
    return this.httpClient.delete<LawContainer>(this.controllerPath + '/delete' + '/' + objectId).catch(err =>
      Observable.throw(err));
  }


  findAll(): Observable<LawContainer[]> {
    return this.httpClient.get<LawContainer[]>(this.controllerPath + '/find-all').catch(err =>
      Observable.throw(err));
  }


  findOne(objectId: number): Observable<LawContainer> {
    return this.httpClient.get<LawContainer>(this.controllerPath + '/find-one/' + objectId).catch(err =>
      Observable.throw(err));
  }

  findOneAvailable(objectId: number): Observable<LawContainer> {
    return this.httpClient.get<LawContainer>(this.controllerPath + '/find-one-available/' + objectId).catch(err =>
      Observable.throw(err));
  }

  findAllAvailable(): Observable<LawContainer[]> {
    return this.httpClient.get<LawContainer[]>(this.controllerPath + '/find-all-available').catch(err =>
      Observable.throw(err));
  }


  findByHeader(header: string): Observable<LawContainer> {
    return this.httpClient.get<LawContainer>(this.controllerPath + '/find-by-header/' + header).catch(err =>
      Observable.throw(err));
  }


}
