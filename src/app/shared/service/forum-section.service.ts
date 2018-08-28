import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {ForumSection} from "../models/forum-section";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class ForumSectionService {

  constructor(private httpClient: HttpClient) {
  }

  readonly controllerPath = "/forum-section";


  save(object: ForumSection): Observable<ForumSection> {
    return this.httpClient.post<ForumSection>(this.controllerPath + '/save/'+object.container.id, JSON.stringify(object)).catch(err =>
      Observable.throw(err));
  }

  update(object: ForumSection): Observable<ForumSection> {
    return this.httpClient.post<ForumSection>(this.controllerPath + '/update', JSON.stringify(object)).catch(err =>
      Observable.throw(err));
  }

  updateId(object: ForumSection,id:number): Observable<ForumSection> {
    return this.httpClient.post<ForumSection>(this.controllerPath + '/update/'+ id, JSON.stringify(object)).catch(err =>
      Observable.throw(err));
  }


  delete(objectId: number): Observable<ForumSection> {
    return this.httpClient.delete<ForumSection>(this.controllerPath + '/delete' + '/' + objectId).catch(err =>
      Observable.throw(err));
  }


  findAll(): Observable<ForumSection[]> {
    return this.httpClient.get<ForumSection[]>(this.controllerPath + '/find-all').catch(err =>
      Observable.throw(err));
  }

  findOne(objectId: number): Observable<ForumSection> {
    return this.httpClient.get<ForumSection>(this.controllerPath + '/find-one/' + objectId).catch(err =>
      Observable.throw(err));
  }

  findOneAvailable(objectId: number): Observable<ForumSection> {
    return this.httpClient.get<ForumSection>(this.controllerPath + '/find-one-available/' + objectId).catch(err =>
      Observable.throw(err));
  }

  findAllAvailable(): Observable<ForumSection[]> {
    return this.httpClient.get<ForumSection[]>(this.controllerPath + '/find-all-available').catch(err =>
      Observable.throw(err));
  }

  findByDescription(header: string): Observable<ForumSection> {
    return this.httpClient.get<ForumSection>(this.controllerPath + '/find-by-description/' + header).catch(err =>
      Observable.throw(err));
  }

  findByHeader(header: string): Observable<ForumSection> {
    return this.httpClient.get<ForumSection>(this.controllerPath + '/find-by-header/' + header).catch(err =>
      Observable.throw(err));
  }
  findAllByContainerId(containerId:number): Observable<ForumSection[]>{
    return this.httpClient.get<ForumSection[]>(this.controllerPath+'/find-all-by-container-id/'+containerId).catch(err=>
    Observable.throw(err))
  }

}
