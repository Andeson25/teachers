import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Course} from '../models/course';
import {isNullOrUndefined} from 'util';
import {CoursePageableWrapper} from '../models/course-pageable-wrapper';


@Injectable()
export class CourseService {

  readonly controllerPath = '/course';

  constructor(private httpClient: HttpClient) {
  }

  save(object: Course): Observable<Course> {
    return this.httpClient.post<Course>(this.controllerPath + '/save', JSON.stringify(object)).catch(err =>
      Observable.throw(err));
  }

  saveWithImg(object: HTMLFormElement, course: string): Observable<Course> {
    let formData: FormData = new FormData(object);
    formData.append('course', course);
    return this.httpClient.post<Course>(this.controllerPath + '/save', formData, {headers: new HttpHeaders().append('enctype', 'multipart/form-data')}).catch(err =>
      Observable.throw(err));
  }

  delete(objectId: number): Observable<Course> {
    return this.httpClient.delete<Course>(this.controllerPath + '/delete' + '/' + objectId).catch(err =>
      Observable.throw(err));
  }

  update(course: string, object?: HTMLFormElement): Observable<Course> {
    let formData: FormData = new FormData(isNullOrUndefined(object) ? null : object);
    formData.append('course', course);
    return this.httpClient.post<Course>(this.controllerPath + '/update', formData, {headers: new HttpHeaders().set('enctype', '')}).catch(err =>
      Observable.throw(err));
  }

  findAll(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(this.controllerPath + '/find-all').catch(err =>
      Observable.throw(err));
  }
  findAllAvailable(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(this.controllerPath + '/find-all-available').catch(err =>
      Observable.throw(err));
  }

  findOne(objectId: number): Observable<Course> {
    return this.httpClient.get<Course>(this.controllerPath + '/find-one/' + objectId).catch(err =>
      Observable.throw(err));
  }

  findOneAvailable(objectId: number): Observable<Course> {
    return this.httpClient.get<Course>(this.controllerPath + '/find-one-available/' + objectId).catch(err =>
      Observable.throw(err));
  }

  findByHeader(header: string): Observable<Course> {
    return this.httpClient.get<Course>(this.controllerPath + '/find-by-header/' + header).catch(err =>
      Observable.throw(err));
  }

  findByDescription(description: string): Observable<Course> {
    return this.httpClient.get<Course>(this.controllerPath + '/find-by-description/' + description).catch(err =>
      Observable.throw(err));
  }

  findAllByCourseType(courseType: string): Observable<Course[]> {
    return this.httpClient.get<Course[]>(this.controllerPath + '/find-all-by-course-type', {params: new HttpParams().set('courseType', courseType)}).catch(err =>
      Observable.throw(err));
  }

  findAllByCategoryId(categoryId: number): Observable<Course[]> {
    return this.httpClient.get<Course[]>(this.controllerPath + '/find-by-courseCategory-id/' + categoryId).catch(err =>
      Observable.throw(err));
  }

  findAllPageableAvailable(page: number, count: number): Observable<CoursePageableWrapper> {
    return this.httpClient.get<CoursePageableWrapper>(this.controllerPath + '/find-all-pageable-available/' + page + '/' + count).catch(err =>
      Observable.throw(err));
  }

  findPageableFilter(category: string, typeIndex: number, page: number, count: number): Observable<CoursePageableWrapper> {
    if(category=='')
      category='empty';
    console.log(this.controllerPath + '/filter/' + encodeURI(category)+ '/' + typeIndex + '/' + page + '/' + count);
    return this.httpClient.get<CoursePageableWrapper>(this.controllerPath + '/filter/' + encodeURI(category)+ '/' + typeIndex + '/' + page + '/' + count).catch(err =>
      Observable.throw(err));
  }
  findTopThree(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(this.controllerPath + '/find-top-three').catch(err =>
      Observable.throw(err));
  }


  vote(courseId: number, rating: number): Observable<Course> {
    return this.httpClient.post<Course>(this.controllerPath + '/vote/' + courseId + '/' + rating, null).catch(err =>
      Observable.throw(err));
  }

}
