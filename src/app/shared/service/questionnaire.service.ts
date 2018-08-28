import {isNullOrUndefined} from 'util';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TeachingProgram} from '../models/teaching-program';
import {Injectable} from '@angular/core';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {Questionnaire} from '../models/questionnaire';

@Injectable()
export class QuestionnaireService {

  constructor(private httpClient: HttpClient) {
  }

  readonly controllerPath = '/questionnaire';

  save(object: Questionnaire): Observable<Questionnaire> {
    return this.httpClient.post<Questionnaire>(this.controllerPath + '/save', JSON.stringify(object)).catch(err =>
      Observable.throw(err));
  }

  update(object: Questionnaire): Observable<Questionnaire> {
    return this.httpClient.post<Questionnaire>(this.controllerPath + '/update', JSON.stringify(object)).catch(err =>
      Observable.throw(err));
  }

  delete(objectId: number): Observable<Questionnaire> {
    return this.httpClient.delete<Questionnaire>(this.controllerPath + '/delete' + '/' + objectId).catch(err =>
      Observable.throw(err));
  }

  findAll(): Observable<Questionnaire[]> {
    return this.httpClient.get<Questionnaire[]>(this.controllerPath + '/find-all').catch(err =>
      Observable.throw(err));
  }


  findOne(objectId: number): Observable<Questionnaire> {
    return this.httpClient.get<Questionnaire>(this.controllerPath + '/find-one/' + objectId).catch(err =>
      Observable.throw(err));
  }

  findOneAvailable(objectId: number): Observable<Questionnaire> {
    return this.httpClient.get<Questionnaire>(this.controllerPath + '/find-one-available/' + objectId).catch(err =>
      Observable.throw(err));
  }

  findAllAvailable(): Observable<Questionnaire[]> {
    return this.httpClient.get<Questionnaire[]>(this.controllerPath + '/find-all-available').catch(err =>
      Observable.throw(err));
  }

  vote(questionnaireId: number, courseCategoryId: number): Observable<Questionnaire> {
    return this.httpClient.post<Questionnaire>(this.controllerPath + '/vote/' + questionnaireId  +'/'+ courseCategoryId,null).catch(err=>
    Observable.throw(err));
  }

}
