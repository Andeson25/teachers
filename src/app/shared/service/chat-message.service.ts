import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ChatMessage} from '../models/chat-message';


@Injectable()
export class ChatMessageService {


  constructor(private httpClient: HttpClient) {
  }

  readonly controllerPath = '/chat-message';


  save(object: ChatMessage): Observable<ChatMessage> {
    return this.httpClient.post<ChatMessage>(this.controllerPath + '/save', JSON.stringify(object)).catch(err =>
      Observable.throw(err));
  }

  delete(objectId: number): Observable<ChatMessage> {
    return this.httpClient.delete<ChatMessage>(this.controllerPath + '/delete' + '/' + objectId).catch(err =>
      Observable.throw(err));
  }

  update(object: ChatMessage): Observable<ChatMessage> {
    return this.httpClient.put<ChatMessage>(this.controllerPath + '/update', JSON.stringify(object)).catch(err =>
      Observable.throw(err));
  }

  findAll(): Observable<ChatMessage[]> {
    return this.httpClient.get<ChatMessage[]>(this.controllerPath + '/find-all').catch(err =>
      Observable.throw(err));
  }

  findOne(objectId: number): Observable<ChatMessage> {
    return this.httpClient.get<ChatMessage>(this.controllerPath + '/find-one/' + objectId).catch(err =>
      Observable.throw(err));
  }

  findOneAvailable(objectId: number): Observable<ChatMessage> {
    return this.httpClient.get<ChatMessage>(this.controllerPath + '/find-one-available/' + objectId).catch(err =>
      Observable.throw(err));
  }

  findAllAvailable(): Observable<ChatMessage[]> {
    return this.httpClient.get<ChatMessage[]>(this.controllerPath + '/find-all-available').catch(err =>
      Observable.throw(err));
  }

  findAllByRoomId(roomId: number): Observable<ChatMessage[]> {
    return this.httpClient.get<ChatMessage[]>(this.controllerPath + '/find-all-by-room-id' + roomId).catch(err => Observable.throw(err));
  }

  sendMessage(message: ChatMessage, idChatRoom: number): Observable<ChatMessage> {
    return this.httpClient.post(this.controllerPath + /send/ + idChatRoom, JSON.stringify(message), {headers: new HttpHeaders()}).catch(err => Observable.throw(err));
  }
  getUnRead():Observable<number>{
    return this.httpClient.get<number>(this.controllerPath+'/count-all-unread').catch(err => Observable.throw(err));
  }
}
