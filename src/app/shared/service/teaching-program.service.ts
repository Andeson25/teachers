import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {TeachingProgram} from "../models/teaching-program";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {isNullOrUndefined} from "util";

@Injectable()
export class TeachingProgramService {

  constructor(private httpClient: HttpClient) {
  }

  readonly controllerPath = "/teaching-program";


  save(object: TeachingProgram): Observable<TeachingProgram> {
    return this.httpClient.post<TeachingProgram>(this.controllerPath + '/save', JSON.stringify(object)).catch(err =>
      Observable.throw(err));
  }

  saveWithFile(object: HTMLFormElement, article:string): Observable<TeachingProgram> {
    let formData:FormData= new FormData(object);
    formData.append('teachingProgramJson',article);
    console.log(formData.get('teachingProgramJson'));
    return this.httpClient.post<TeachingProgram>(this.controllerPath + '/save', formData ,{headers: new HttpHeaders().append('enctype', 'multipart/form-data')} ).catch(err =>
      Observable.throw(err));
  }

  update(programDto:string ,object?: HTMLFormElement): Observable<TeachingProgram> {
    let formData: FormData = new FormData(isNullOrUndefined(object) ? null : object);
    formData.append('teachingProgramJson',programDto);
    console.log(formData.get('file'));
    return this.httpClient.post<TeachingProgram>(this.controllerPath + '/update', formData,{headers:new HttpHeaders().set('enctype','')}).catch(err =>
      Observable.throw(err));
  }


  delete(objectId: number): Observable<TeachingProgram> {
    return this.httpClient.delete<TeachingProgram>(this.controllerPath + '/delete' + '/' + objectId).catch(err =>
      Observable.throw(err));
  }


  findAll(): Observable<TeachingProgram[]> {
    return this.httpClient.get<TeachingProgram[]>(this.controllerPath + '/find-all').catch(err =>
      Observable.throw(err));
  }


  findOne(objectId: number): Observable<TeachingProgram> {
    return this.httpClient.get<TeachingProgram>(this.controllerPath + '/find-one/' + objectId).catch(err =>
      Observable.throw(err));
  }

  findOneAvailable(objectId: number): Observable<TeachingProgram> {
    return this.httpClient.get<TeachingProgram>(this.controllerPath + '/find-one-available/' + objectId).catch(err =>
      Observable.throw(err));
  }

  findAllAvailable(): Observable<TeachingProgram[]> {
    return this.httpClient.get<TeachingProgram[]>(this.controllerPath + '/find-all-available').catch(err =>
      Observable.throw(err));
  }

  findAllByContainerId(containerId: number): Observable<TeachingProgram[]> {
    return this.httpClient.get<TeachingProgram[]>(this.controllerPath + '/find-all-by-container/' + containerId).catch(err =>
      Observable.throw(err));
  }


}
