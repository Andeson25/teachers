import { Component, OnInit } from '@angular/core';
import {MetaRxService} from '../../../../shared/service/meta-rx/meta-rx.service';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor(private _metaRxService:MetaRxService,meta: Meta, title: Title) {
    this._metaRxService.title$.subscribe(next=>{
        title.setTitle(next);
    });
    _metaRxService.meta$.subscribe(next=>{
      for(let i=0;i<next.length;i++){
        meta.updateTag(next[i]);
      }
    })
  }


  ngOnInit() {
  }

}
