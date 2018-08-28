import {Component, Input, OnInit} from '@angular/core';
import {Article} from '../../../../../../../shared/models/article';
import {isNullOrUndefined} from 'util';
import {Comment} from '../../../../../../../shared/models/comment';

@Component({
  selector: 'app-popular-article',
  templateUrl: './popular-article.component.html',
  styleUrls: ['./popular-article.component.css'],
  preserveWhitespaces:false
})
export class PopularArticleComponent implements OnInit {

  @Input() popularArticle: Article = new Article();
  show:boolean = false;
  constructor() {

    this.show=true;
  }

  ngOnInit() {
    if(isNullOrUndefined(this.popularArticle.comments)){
      this.popularArticle.comments = [];
    }

  }

}
