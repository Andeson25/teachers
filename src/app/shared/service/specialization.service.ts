import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Specialization} from "../models/specialization";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {LawContainer} from "../models/law-container";

@Injectable()
export class SpecializationService {

  constructor(private httpClient: HttpClient) {
  }

  readonly controllerPath = "/specialization";


  save(object: Specialization): Observable<Specialization> {
    return this.httpClient.post<Specialization>(this.controllerPath + '/save', JSON.stringify(object)).catch(err =>
      Observable.throw(err));
  }

  update(object: Specialization): Observable<Specialization> {
    return this.httpClient.put<Specialization>(this.controllerPath + '/update', JSON.stringify(object)).catch(err =>
      Observable.throw(err));
  }


  delete(objectId: number): Observable<Specialization> {
    return this.httpClient.delete<Specialization>(this.controllerPath + '/delete' + '/' + objectId).catch(err =>
      Observable.throw(err));
  }


  findAll(): Observable<Specialization[]> {
    return this.httpClient.get<Specialization[]>(this.controllerPath + '/find-all').catch(err =>
      Observable.throw(err));
  }


  findOne(objectId: number): Observable<Specialization> {
    return this.httpClient.get<Specialization>(this.controllerPath + '/find-one/' + objectId).catch(err =>
      Observable.throw(err));
  }

  findOneAvailable(objectId: number): Observable<Specialization> {
    return this.httpClient.get<Specialization>(this.controllerPath + '/find-one-available/' + objectId).catch(err =>
      Observable.throw(err));
  }

  findAllAvailable(): Observable<Specialization[]> {
    return this.httpClient.get<Specialization[]>(this.controllerPath + '/find-all-available').catch(err =>
      Observable.throw(err));
  }

  findByName(name: string): Observable<LawContainer> {
    return this.httpClient.get<LawContainer>(this.controllerPath + '/find-by-name/' + name).catch(err =>
      Observable.throw(err));
  }


}
