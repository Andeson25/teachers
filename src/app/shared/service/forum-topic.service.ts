import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {ForumTopic} from "../models/forum-topic";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class ForumTopicService {

  constructor(private httpClient: HttpClient) {
  }

  readonly controllerPath = "/forum-topic";


  save(object: ForumTopic): Observable<ForumTopic> {
    return this.httpClient.post<ForumTopic>(this.controllerPath + '/save', JSON.stringify(object)).catch(err =>
      Observable.throw(err));
  }
  saveId(object: ForumTopic,id:number): Observable<ForumTopic> {
    return this.httpClient.post<ForumTopic>(this.controllerPath + '/save/'+id, JSON.stringify(object)).catch(err =>
      Observable.throw(err));
  }

  update(object: string): Observable<ForumTopic> {
    return this.httpClient.post<ForumTopic>(this.controllerPath + '/update',object).catch(err =>
      Observable.throw(err));
  }


  delete(objectId: number): Observable<ForumTopic> {
    return this.httpClient.delete<ForumTopic>(this.controllerPath + '/delete' + '/' + objectId).catch(err =>
      Observable.throw(err));
  }


  findAll(): Observable<ForumTopic[]> {
    return this.httpClient.get<ForumTopic[]>(this.controllerPath + '/find-all').catch(err =>
      Observable.throw(err));
  }
  findAllSort(): Observable<ForumTopic[]> {
    return this.httpClient.get<ForumTopic[]>(this.controllerPath + '/find-all-sort').catch(err =>
      Observable.throw(err));
  }

  findOne(objectId: number): Observable<ForumTopic> {
    return this.httpClient.get<ForumTopic>(this.controllerPath + '/find-one-available/' + objectId).catch(err =>
      Observable.throw(err));
  }

  findOneAvailable(objectId: number): Observable<ForumTopic> {
    return this.httpClient.get<ForumTopic>(this.controllerPath + '/find-one-available/' + objectId).catch(err =>
      Observable.throw(err));
  }

  findAllAvailable(): Observable<ForumTopic[]> {
    return this.httpClient.get<ForumTopic[]>(this.controllerPath + '/find-all-available').catch(err =>
      Observable.throw(err));
  }
  findAllPageableAvailable(id,page,count): Observable<ForumTopic[]> {
    return this.httpClient.get<ForumTopic[]>(this.controllerPath + '/find-all-available-forum-topic/'+ id +'/' + page +'/'+ count).catch(err =>
      Observable.throw(err));
  }


  findByHeader(header: string): Observable<ForumTopic> {
    return this.httpClient.get<ForumTopic>(this.controllerPath + '/find-by-header/' + header).catch(err =>
      Observable.throw(err));
  }
  findAllByAuthorId(userId: number): Observable<ForumTopic[]> {
    return this.httpClient.get<ForumTopic[]>(this.controllerPath + '/find-by-author/' + userId).catch(err =>
      Observable.throw(err));
  }

  findAllByFromSectionId(sectionId: number): Observable<ForumTopic[]> {
    return this.httpClient.get<ForumTopic[]>(this.controllerPath + '/find-all-by-forum-section/' + sectionId).catch(err =>
      Observable.throw(err));
  }

}
