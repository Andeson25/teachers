import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {PlaceOfWork} from "../models/place-of-work";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {LawContainer} from "../models/law-container";

@Injectable()
export class PlaceOfWorkService {

  constructor(private httpClient: HttpClient) {
  }

  readonly controllerPath = "/place-of-work";


  save(object: PlaceOfWork): Observable<PlaceOfWork> {
    return this.httpClient.post<PlaceOfWork>(this.controllerPath + '/save', JSON.stringify(object)).catch(err =>
      Observable.throw(err));
  }

  update(object: PlaceOfWork): Observable<PlaceOfWork> {
    return this.httpClient.put<PlaceOfWork>(this.controllerPath + '/update', JSON.stringify(object)).catch(err =>
      Observable.throw(err));
  }


  delete(objectId: number): Observable<PlaceOfWork> {
    return this.httpClient.delete<PlaceOfWork>(this.controllerPath + '/delete' + '/' + objectId).catch(err =>
      Observable.throw(err));
  }


  findAll(): Observable<PlaceOfWork[]> {
    return this.httpClient.get<PlaceOfWork[]>(this.controllerPath + '/find-all').catch(err =>
      Observable.throw(err));
  }


  findOne(objectId: number): Observable<PlaceOfWork> {
    return this.httpClient.get<PlaceOfWork>(this.controllerPath + '/find-one/' + objectId).catch(err =>
      Observable.throw(err));
  }

  findOneAvailable(objectId: number): Observable<PlaceOfWork> {
    return this.httpClient.get<PlaceOfWork>(this.controllerPath + '/find-one-available/' + objectId).catch(err =>
      Observable.throw(err));
  }

  findAllAvailable(): Observable<PlaceOfWork[]> {
    return this.httpClient.get<PlaceOfWork[]>(this.controllerPath + '/find-all-available').catch(err =>
      Observable.throw(err));
  }


  findByAddress(address: string): Observable<LawContainer> {
    return this.httpClient.get<LawContainer>(this.controllerPath + '/find-by-address/' + address).catch(err =>
      Observable.throw(err));
  }

  findByName(name: string): Observable<LawContainer> {
    return this.httpClient.get<LawContainer>(this.controllerPath + '/find-by-name/' + name).catch(err =>
      Observable.throw(err));
  }


}
