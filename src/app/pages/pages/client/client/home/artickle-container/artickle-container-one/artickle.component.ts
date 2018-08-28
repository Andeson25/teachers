import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Article} from '../../../../../../../shared/models/article';
import {isNullOrUndefined} from 'util';
import {User} from '../../../../../../../shared/models/user';
import {ArticleService} from '../../../../../../../shared/service/article.service';
import {UserDetailsService} from '../../../../../../../shared/service/user-details-service';

@Component({
  selector: 'app-artickle-container-one',
  templateUrl: './artickle.component.html',
  styleUrls: ['./artickle.component.css'],
  providers:[ArticleService]
})
export class ArtickleContainerOne implements OnInit {
  @Output() deleteArt: EventEmitter<Article> = new EventEmitter<Article>();
  @Input() article: Article = new Article();
  user: User = new User();

  constructor(private _artServ: ArticleService,private _user: UserDetailsService) {
    this.user=this._user.user;
      this._user.getUser().subscribe(next=>{
          this.user=next;
      })
  }

  ngOnInit() {
    if (!isNullOrUndefined(this.article.text)) {
      let text = this.article.text;
      this.article.text = '';
      for (let i = 0; i < 2; i++) {
        if (isNullOrUndefined(text.split('.')[i])) {

        } else {
          this.article.text += text.split('.')[i] + '.';
        }
      }
      this.article.text += '...';
    }
  }
  delete(){
   this.deleteArt.emit(this.article);
  }

}
