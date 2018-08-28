import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Meta, Title} from '@angular/platform-browser';

@Injectable()
export class MetaRxService {
  public meta: any[] = [];
  private _meta = new Subject<any>();
  meta$ = this._meta.asObservable();


  title: string = '';
  private _title = new Subject<string>();
  title$ = this._title.asObservable();

  constructor() {
  }

  setDefaultAll(){
    this.title = 'Гільдія вчителів';
    this._title.next(this.title);
    this.meta = [
      {
        name: 'description',
        content: 'Гільдія вчителів - соціальна мережа для викладачів'
      },
      {
        name: 'keywords', content: 'гільдія вчителів, соціальна мережа, вчитель, для вчителя, викладач, для викладача,\n' +
        'новини про освіту, курси для вчителів, форум вчителів, форум, навчальні програми'
      },
    ];
    this._meta.next(this.meta);
  }


  updateTitle(str: string) {
    this.title = str;
    this._title.next(this.title);
  }

  updateMeta(obj: any[]) {
    this.meta = obj;
    this._meta.next(this.meta);
    console.log(this.meta);
  }

}
