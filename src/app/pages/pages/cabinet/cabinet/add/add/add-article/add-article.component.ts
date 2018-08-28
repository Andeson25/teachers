import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ArticleService} from "../../../../../../../shared/service/article.service";
import {Article} from "../../../../../../../shared/models/article";


@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css'],
  providers: [ArticleService]
})
export class AddArticleComponent implements OnInit {

  articleForm: FormGroup;
  article: Article = new Article();
  articleJson: string;
  img:string;
  constructor(private _articleService: ArticleService) {

  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.img = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  addArticle(form: HTMLFormElement, file:HTMLInputElement) {
    this.img = null;
    this._articleService.saveWithImg(form, this.articleJson).subscribe(next => {
      this.articleForm.reset();
      console.log(JSON.stringify(next));
    }, error => {
      // console.log(JSON.stringify(this.article));
      // console.log(imageForm.files[0]);
      console.error(error);
    },()=>{
      alert('Готово');
    });
    file.value='';
  }

  ngOnInit() {
    this.articleForm = new FormGroup({
      header: new FormControl('', Validators.required),
      text: new FormControl('', Validators.required),
    });
    this.articleForm.valueChanges.subscribe(next => {
      this.article = next;
      this.articleJson = JSON.stringify(this.article);
    })
  }

}
