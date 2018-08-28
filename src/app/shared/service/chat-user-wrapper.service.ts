import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {HttpClient} from '@angular/common/http';
import { ChatUserWrapper} from "../models/chat-user-wrapper";


@Injectable()
export class ChatUserWrapperService {


  constructor(private httpClient: HttpClient) {
  }
  readonly controllerPath="/chat-user-wrapper";

  findByUserId(userId: number): Observable<ChatUserWrapper> {
    return this.httpClient.get<ChatUserWrapper>(this.controllerPath+'/find-by-user-id/' + userId).catch(err => Observable.throw(err));
  }

  save(object: ChatUserWrapper): Observable<ChatUserWrapper> {
    return this.httpClient.post<ChatUserWrapper>(this.controllerPath + '/save', JSON.stringify(object)).catch(err =>
      Observable.throw(err));
  }

  delete(objectId: number): Observable<ChatUserWrapper> {
    return this.httpClient.delete<ChatUserWrapper>( this.controllerPath + '/delete' + '/' + objectId).catch(err =>
      Observable.throw(err));
  }

  update(object: ChatUserWrapper ): Observable<ChatUserWrapper> {
    return this.httpClient.put<ChatUserWrapper>(this.controllerPath + '/update', JSON.stringify(object)).catch(err =>
      Observable.throw(err));
  }

  findAll(): Observable<ChatUserWrapper[]> {
    return this.httpClient.get<ChatUserWrapper[]>(this.controllerPath + '/find-all').catch(err =>
      Observable.throw(err));
  }

  findOne( objectId: number): Observable<ChatUserWrapper> {
    return this.httpClient.get<ChatUserWrapper>( this.controllerPath + '/find-one/' + objectId).catch(err =>
      Observable.throw(err));
  }

  findOneAvailable( objectId: number): Observable<ChatUserWrapper> {
    return this.httpClient.get<ChatUserWrapper>( this.controllerPath + '/find-one-available/' + objectId).catch(err =>
      Observable.throw(err));
  }

  findAllAvailable(): Observable<ChatUserWrapper[]> {
    return this.httpClient.get<ChatUserWrapper[]>(  this.controllerPath + '/find-all-available').catch(err =>
      Observable.throw(err));
  }

}
