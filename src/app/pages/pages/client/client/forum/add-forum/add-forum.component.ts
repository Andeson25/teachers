import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ForumTopic} from '../../../../../../shared/models/forum-topic';
import {ForumTopicService} from '../../../../../../shared/service/forum-topic.service';
import {ForumSection} from '../../../../../../shared/models/forum-section';
import {ForumSectionService} from '../../../../../../shared/service/forum-section.service';
import {Router} from '@angular/router';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-add-forum',
  templateUrl: './add-forum.component.html',
  styleUrls: ['./add-forum.component.css'],
  providers: [ForumTopicService, ForumSectionService]
})
export class AddForumComponent implements OnInit {

  addForumForm: FormGroup;
  themes: ForumTopic = new ForumTopic();
  date: Date = new Date();
  forumSections: ForumSection[] = [];


  @ViewChild('input') inp: ElementRef;
  invalidInp = false;
  @ViewChild('text') text: ElementRef;
  invalidText = false;


  constructor(private _forumTopicService: ForumTopicService, private _forumSectionService: ForumSectionService, private route: Router) {
    _forumSectionService.findAll().subscribe(next => {
      this.forumSections = next;
    }, error => {
      console.error(error);
    });
  }

  validationAddForm() {
    this.addForumForm = new FormGroup({
      header: new FormControl('', [Validators.required, Validators.minLength(5)]),
      text: new FormControl('', [Validators.required, Validators.minLength(5)]),
      forumSection: new FormControl(['', Validators.required])
    });
    this.addForumForm.valueChanges.subscribe(next => {
      this.themes = next;
    });
  }

  sendForm() {
    this.themes.datetime = this.date.toISOString().substring(0, this.date.toISOString().length - 5);
    // if (!isNullOrUndefined(localStorage.getItem('user'))) {
    //   this.themes.author = JSON.parse(localStorage.getItem('user'));
    // } else {
    //   if (!isNullOrUndefined(sessionStorage.getItem('user'))) {
    //     this.themes.author = JSON.parse(sessionStorage.getItem('user'));
    //   }
    // }
    // console.log(JSON.stringify(this.themes));
    this._forumTopicService.saveId(this.themes,this.themes.forumSection.id).subscribe(next => {
      this.addForumForm.clearValidators();
      this.route.navigateByUrl('/forum/' + this.themes.forumSection.id + '/topic/' + next.id);
      this.themes = new ForumTopic();
    }, error => {
      alert('error:[' + error.status + ']');
      console.error(error);
    });


    // console.log(JSON.stringify(this.themes));
    // console.log(this.themes);
    // console.log(this.themes.header);
    // console.log(this.themes.forumSection);
    // console.log(this.themes.text);
  }

  checkValid() {
    if (this.inp.nativeElement.classList.contains('ng-invalid') && this.inp.nativeElement.classList.contains('ng-dirty'))
      this.invalidInp = true;
    if (this.inp.nativeElement.classList.contains('ng-valid') && this.inp.nativeElement.classList.contains('ng-dirty'))
      this.invalidInp = false;
    if (this.text.nativeElement.classList.contains('ng-valid') && this.text.nativeElement.classList.contains('ng-dirty'))
      this.invalidText = false;
    if (this.text.nativeElement.classList.contains('ng-invalid') && this.text.nativeElement.classList.contains('ng-dirty'))
      this.invalidText = true;
  }

  ngOnInit() {
    this.validationAddForm();
  }

}
