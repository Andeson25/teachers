import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Article} from '../models/article';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {isNullOrUndefined} from 'util';
import {ArticlePageableWrapper} from '../models/article-pageable-wrapper';

@Injectable()
export class ArticleService {


  constructor(private httpClient: HttpClient) {
  }

  readonly controllerPath = '/article';


  save(object: Article): Observable<Article> {
    return this.httpClient.post<Article>(this.controllerPath + '/save', JSON.stringify(object)).catch(err =>
      Observable.throw(err));
  }



  saveWithImg(object: HTMLFormElement, article: string): Observable<Article> {
    let formData: FormData = new FormData(object);
    formData.append('article', article);
    console.log(formData.get('article'));
    return this.httpClient.post<Article>(this.controllerPath + '/save', formData, {headers: new HttpHeaders().append('enctype', 'multipart/form-data')}).catch(err =>
      Observable.throw(err));
  }

  delete(objectId: number): Observable<Article> {
    return this.httpClient.delete<Article>(this.controllerPath + '/delete/' + objectId).catch(err =>
      Observable.throw(err));
  }

  update(article: string, object?: HTMLFormElement): Observable<Article> {
    let formData: FormData = new FormData(isNullOrUndefined(object) ? null : object);
    formData.append('articleJson', article);
    return this.httpClient.post<Article>(this.controllerPath + '/update', formData,{headers:new HttpHeaders().set('enctype','')}).catch(err =>
      Observable.throw(err));
  }

  findAll(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(this.controllerPath + '/find-all').catch(err =>
      Observable.throw(err));
  }

  findOne(objectId: number): Observable<Article> {
    return this.httpClient.get<Article>(this.controllerPath + '/find-one/' + objectId).catch(err =>
      Observable.throw(err));
  }

  findOneAvailable(objectId: number): Observable<Article> {
    return this.httpClient.get<Article>(this.controllerPath + '/find-one-available/' + objectId).catch(err =>
      Observable.throw(err));
  }

  findAllAvailable(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(this.controllerPath + '/find-all-available').catch(err =>
      Observable.throw(err));
  }

  findAllAvailablePageable(page: number, count: number): Observable<ArticlePageableWrapper> {
    return this.httpClient.get<ArticlePageableWrapper>(this.controllerPath + '/find-all-pageable-available/' + page +'/'+ count).catch(err =>
      Observable.throw(err));
  }

  findByHeader(header: string): Observable<Article> {
    return this.httpClient.get<Article>(this.controllerPath + '/find-by-header/', {params: new HttpParams().set('header', header)}).catch(err =>
      Observable.throw(err));
  }

  findByText(text: string): Observable<Article> {
    return this.httpClient.get<Article>(this.controllerPath + '/find-by-text', {params: new HttpParams().set('text', text)}).catch(err =>
      Observable.throw(err));
  }

  findAllByUserId(userId: number): Observable<Article[]> {
    return this.httpClient.get<Article[]>(this.controllerPath + '/find-all-by-user-id/' + userId).catch(err => Observable.throw(err));
  }
  findPopular(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(this.controllerPath + '/find-top-five').catch(err => Observable.throw(err));
  }

}
