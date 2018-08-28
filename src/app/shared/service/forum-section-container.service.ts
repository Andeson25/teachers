import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {ForumSectionContainer} from "../models/forum-section-container";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class ForumSectionContainerService {

  constructor(private httpClient: HttpClient) {
  }

  readonly controllerPath = "/forum-section-container";


  save(object: ForumSectionContainer): Observable<ForumSectionContainer> {
    return this.httpClient.post<ForumSectionContainer>(this.controllerPath + '/save', JSON.stringify(object)).catch(err =>
      Observable.throw(err));
  }

  update(object: ForumSectionContainer): Observable<ForumSectionContainer> {
    return this.httpClient.post<ForumSectionContainer>(this.controllerPath + '/update', JSON.stringify(object)).catch(err =>
      Observable.throw(err));
  }


  delete(objectId: number): Observable<ForumSectionContainer> {
    return this.httpClient.delete<ForumSectionContainer>(this.controllerPath + '/delete' + '/' + objectId).catch(err =>
      Observable.throw(err));
  }


  findAll(): Observable<ForumSectionContainer[]> {
    return this.httpClient.get<ForumSectionContainer[]>(this.controllerPath + '/find-all').catch(err =>
      Observable.throw(err));
  }

  findOne(objectId: number): Observable<ForumSectionContainer> {
    return this.httpClient.get<ForumSectionContainer>(this.controllerPath + '/find-one/' + objectId).catch(err =>
      Observable.throw(err));
  }

  findOneAvailable(objectId: number): Observable<ForumSectionContainer> {
    return this.httpClient.get<ForumSectionContainer>(this.controllerPath + '/find-one-available/' + objectId).catch(err =>
      Observable.throw(err));
  }

  findAllAvailable(): Observable<ForumSectionContainer[]> {
    return this.httpClient.get<ForumSectionContainer[]>(this.controllerPath + '/find-all-available').catch(err =>
      Observable.throw(err));
  }


  findByHeader(header: string): Observable<ForumSectionContainer> {
    return this.httpClient.get<ForumSectionContainer>(this.controllerPath + '/find-by-header/' + header).catch(err =>
      Observable.throw(err));
  }

}
