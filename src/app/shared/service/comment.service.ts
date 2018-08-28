import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {HttpClient} from '@angular/common/http';
import {Comment} from "../models/comment";


@Injectable()
export class CommentService {


  constructor(private httpClient: HttpClient) {
  }

  readonly controllerPath = "/comment";


  save(object: Comment): Observable<Comment> {
    return this.httpClient.post<Comment>(this.controllerPath + '/save', JSON.stringify(object)).catch(err =>
      Observable.throw(err));
  }
  saveCourse(object: Comment,id:number): Observable<Comment> {
    return this.httpClient.post<Comment>(this.controllerPath + '/save/course/'+id, JSON.stringify(object)).catch(err =>
      Observable.throw(err));
  }
  saveArticle(object: Comment,id:number): Observable<Comment> {
    return this.httpClient.post<Comment>(this.controllerPath + '/save/article/'+id, JSON.stringify(object)).catch(err =>
      Observable.throw(err));
  }
  delete(objectId: number): Observable<Comment> {
    return this.httpClient.delete<Comment>(this.controllerPath + '/delete' + '/' + objectId).catch(err =>
      Observable.throw(err));
  }

  update(object: Comment): Observable<Comment> {
    return this.httpClient.post<Comment>(this.controllerPath + '/update', JSON.stringify(object)).catch(err =>
      Observable.throw(err));
  }

  findAll(): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(this.controllerPath + '/find-all').catch(err =>
      Observable.throw(err));
  }

  findOne(objectId: number): Observable<Comment> {
    return this.httpClient.get<Comment>(this.controllerPath + '/find-one/' + objectId).catch(err =>
      Observable.throw(err));
  }

  findOneAvailable(objectId: number): Observable<Comment> {
    return this.httpClient.get<Comment>(this.controllerPath + '/find-one-available/' + objectId).catch(err =>
      Observable.throw(err));
  }

  findAllAvailable(): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(this.controllerPath + '/find-all-available').catch(err =>
      Observable.throw(err));
  }

  findAllByFromId(userId: number): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(this.controllerPath + '/find-all-by-from-id').catch(err =>
      Observable.throw(err));
  }
}
