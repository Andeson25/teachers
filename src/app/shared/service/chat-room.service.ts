import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {HttpClient} from '@angular/common/http';
import {ChatRoom} from '../models/chat-room';
import {ChatRoomIntegerWrapper} from '../models/chat-room-integer-wrapper';


@Injectable()
export class ChatRoomService {

  readonly controllerPath = '/chat-room';

  constructor(private httpClient: HttpClient) {
  }

  save(object: ChatRoom): Observable<ChatRoom> {
    return this.httpClient.post<ChatRoom>(this.controllerPath + '/save', JSON.stringify(object)).catch(err =>
      Observable.throw(err));
  }

  delete(objectId: number): Observable<ChatRoom> {
    return this.httpClient.delete<ChatRoom>(this.controllerPath + '/delete' + '/' + objectId).catch(err =>
      Observable.throw(err));
  }

  update(object: ChatRoom): Observable<ChatRoomIntegerWrapper> {
    return this.httpClient.post<ChatRoomIntegerWrapper>(this.controllerPath + '/update', JSON.stringify(object)).catch(err =>
      Observable.throw(err));
  }

  findAll(): Observable<ChatRoom[]> {
    return this.httpClient.get<ChatRoom[]>(this.controllerPath + '/find-all').catch(err =>
      Observable.throw(err));
  }

  findOne(objectId: number): Observable<ChatRoom> {
    return this.httpClient.get<ChatRoom>(this.controllerPath + '/find-one/' + objectId).catch(err =>
      Observable.throw(err));
  }

  findOneAvailable(objectId: number): Observable<ChatRoom> {
    return this.httpClient.get<ChatRoom>(this.controllerPath + '/find-one-available/' + objectId).catch(err =>
      Observable.throw(err));
  }
  findOneWithMessagesPageable(objectId: number,count:number): Observable<ChatRoomIntegerWrapper> {
    return this.httpClient.get<ChatRoomIntegerWrapper>(this.controllerPath + '/find-one-with-messages-pageable/' + objectId+'/'+count).catch(err =>
      Observable.throw(err));
  }

  findAllAvailable(): Observable<ChatRoom[]> {
    return this.httpClient.get<ChatRoom[]>(this.controllerPath + '/find-all-available').catch(err =>
      Observable.throw(err));
  }

  findAllByUserId(userId: number): Observable<ChatRoom[]> {
    return this.httpClient.get<ChatRoom[]>(this.controllerPath + '/find-all-by-user-id/' + userId,).catch(err =>
      Observable.throw(err));
  }

  findAllByRoomId(roomId: number): Observable<ChatRoom[]> {
    return this.httpClient.get<ChatRoom[]>(this.controllerPath + '/find-all-by-room-id/' + roomId).catch(err => Observable.throw(err));
  }

  createOrFindChatRoom(userId: number): Observable<ChatRoom> {
    return this.httpClient.get<ChatRoom>(this.controllerPath + '/create-or-find-chat-room/' + userId).catch(err => Observable.throw(err));
  }

}
