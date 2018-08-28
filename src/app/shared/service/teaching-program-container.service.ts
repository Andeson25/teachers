import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {TeachingProgramContainer} from "../models/teaching-program-container";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class TeachingProgramContainerService {

  constructor(private httpClient: HttpClient) {
  }

  readonly controllerPath = "/teaching-program-container";


  save(object: TeachingProgramContainer): Observable<TeachingProgramContainer> {
    return this.httpClient.post<TeachingProgramContainer>(this.controllerPath + '/save', JSON.stringify(object)).catch(err =>
      Observable.throw(err));
  }

  update(object: TeachingProgramContainer): Observable<TeachingProgramContainer> {
    return this.httpClient.post<TeachingProgramContainer>(this.controllerPath + '/update', JSON.stringify(object)).catch(err =>
      Observable.throw(err));
  }


  delete(objectId: number): Observable<TeachingProgramContainer> {
    return this.httpClient.delete<TeachingProgramContainer>(this.controllerPath + '/delete' + '/' + objectId).catch(err =>
      Observable.throw(err));
  }


  findAll(): Observable<TeachingProgramContainer[]> {
    return this.httpClient.get<TeachingProgramContainer[]>(this.controllerPath + '/find-all').catch(err =>
      Observable.throw(err));
  }


  findOne(objectId: number): Observable<TeachingProgramContainer> {
    return this.httpClient.get<TeachingProgramContainer>(this.controllerPath + '/find-one/' + objectId).catch(err =>
      Observable.throw(err));
  }

  findOneAvailable(objectId: number): Observable<TeachingProgramContainer> {
    return this.httpClient.get<TeachingProgramContainer>(this.controllerPath + '/find-one-available/' + objectId).catch(err =>
      Observable.throw(err));
  }

  findAllAvailable(): Observable<TeachingProgramContainer[]> {
    return this.httpClient.get<TeachingProgramContainer[]>(this.controllerPath + '/find-all-available').catch(err =>
      Observable.throw(err));
  }

  findByName(name: string): Observable<TeachingProgramContainer> {
    return this.httpClient.get<TeachingProgramContainer>(this.controllerPath + '/find-by-name/' + name).catch(err =>
      Observable.throw(err));
  }

  findAllByCategoryId(categoryId: number): Observable<TeachingProgramContainer[]> {
    return this.httpClient.get<TeachingProgramContainer[]>(this.controllerPath + '/find-all-by-courseCategory/' + categoryId).catch(err =>
      Observable.throw(err));
  }


}
