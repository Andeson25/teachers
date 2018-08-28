import {Component, OnInit} from '@angular/core';
import {ArticleService} from '../../../../../../../../shared/service/article.service';
import {Article} from '../../../../../../../../shared/models/article';

@Component({
  selector: 'app-article-container',
  templateUrl: './article-container.component.html',
  styleUrls: ['./article-container.component.css'],
  providers: [ArticleService]
})
export class ArticleContainerComponent implements OnInit {

  articles: Article[] = [];

  constructor(private _articleService: ArticleService) {
    this._articleService.findAllAvailable().subscribe(next => {
      this.articles = next;
    }, error2 => {
      console.log(error2);
    });
  }

  ngOnInit() {
  }

}
