import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ForumMessage} from "../models/forum-message";

@Injectable()
export class ForumMessageService {


  constructor(private httpClient: HttpClient) {
  }

  readonly controllerPath = "/forum-message";


  save(object: ForumMessage): Observable<ForumMessage> {
    return this.httpClient.post<ForumMessage>(this.controllerPath + '/save', JSON.stringify(object)).catch(err =>
      Observable.throw(err));
  }
  saveId(object: ForumMessage): Observable<ForumMessage> {
    return this.httpClient.post<ForumMessage>(this.controllerPath + '/save/'+object.forumTopic.id, JSON.stringify(object)).catch(err =>
      Observable.throw(err));
  }

  update(object: ForumMessage): Observable<ForumMessage> {
    return this.httpClient.post<ForumMessage>(this.controllerPath + '/update', JSON.stringify(object)).catch(err =>
      Observable.throw(err));
  }


  delete(objectId: number): Observable<ForumMessage> {
    return this.httpClient.delete<ForumMessage>(this.controllerPath + '/delete' + '/' + objectId).catch(err =>
      Observable.throw(err));
  }


  findAll(): Observable<ForumMessage[]> {
    return this.httpClient.get<ForumMessage[]>(this.controllerPath + '/find-all').catch(err =>
      Observable.throw(err));
  }

  findOne(objectId: number): Observable<ForumMessage> {
    return this.httpClient.get<ForumMessage>(this.controllerPath + '/find-one/' + objectId).catch(err =>
      Observable.throw(err));
  }

  findOneAvailable(objectId: number): Observable<ForumMessage> {
    return this.httpClient.get<ForumMessage>(this.controllerPath + '/find-one-available/' + objectId).catch(err =>
      Observable.throw(err));
  }

  findAllAvailable(): Observable<ForumMessage[]> {
    return this.httpClient.get<ForumMessage[]>(this.controllerPath + '/find-all-available').catch(err =>
      Observable.throw(err));
  }
  findAllAvailablePageableByTopic(page:number, count:number, topicId:number): Observable<ForumMessage[]> {
    return this.httpClient.get<ForumMessage[]>(this.controllerPath + '/find-all-pageable-by-topic/'+page+'/'+count+'/'+topicId).catch(err =>
      Observable.throw(err));
  }

  findAllByFromId(userId: number): Observable<ForumMessage[]> {
    return this.httpClient.get<ForumMessage[]>(this.controllerPath + '/find-by-from-id/' + userId).catch(err =>
      Observable.throw(err));
  }

}
