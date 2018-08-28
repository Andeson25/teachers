import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {CourseCategory} from '../models/course-category';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class CourseCategoryService {

  private controller = '/course-category';

  constructor(private _httpClient: HttpClient) {
  }

  save(obj: CourseCategory): Observable<CourseCategory> {
    return this._httpClient.post<CourseCategory>(this.controller + '/save', JSON.stringify(obj)).catch(err => Observable.throw(err));
  }

  update(obj: CourseCategory): Observable<CourseCategory> {
    return this._httpClient.put<CourseCategory>(this.controller + '/update', JSON.stringify(obj)).catch(err => Observable.throw(err));
  }

  delete(id: number): Observable<any> {
    return this._httpClient.delete(this.controller + '/delete/' + id).catch(err => Observable.throw(err));
  }

  findOne(id: number): Observable<CourseCategory> {
    return this._httpClient.get<CourseCategory>(this.controller + '/find-one/' + id).catch(err => Observable.throw(err));
  }

  findOneAvailable(id: number): Observable<CourseCategory> {
    return this._httpClient.get<CourseCategory>(this.controller + '/find-one-available/' + id).catch(err => Observable.throw(err));
  }

  findOneByName(name: string): Observable<CourseCategory> {
    return this._httpClient.get<CourseCategory>(this.controller + '/find-by-name', {
      params: new HttpParams().append('name', name)
    }).catch(err => Observable.throw(err));
  }

  findAll(): Observable<CourseCategory[]> {
    return this._httpClient.get<CourseCategory[]>(this.controller + '/find-all').catch(err => Observable.throw(err));
  }

  findAllAvailable(): Observable<CourseCategory[]> {
    return this._httpClient.get<CourseCategory[]>(this.controller + '/find-all-available').catch(err => Observable.throw(err));
  }

}
