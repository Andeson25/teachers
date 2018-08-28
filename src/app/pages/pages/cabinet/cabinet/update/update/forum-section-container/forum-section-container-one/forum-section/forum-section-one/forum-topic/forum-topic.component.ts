import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ForumTopic} from '../../../../../../../../../../../shared/models/forum-topic';
import {ForumSection} from '../../../../../../../../../../../shared/models/forum-section';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ForumSectionService} from '../../../../../../../../../../../shared/service/forum-section.service';
import {ForumTopicService} from '../../../../../../../../../../../shared/service/forum-topic.service';

@Component({
  selector: 'app-update-forum-topic',
  templateUrl: './forum-topic.component.html',
  styleUrls: ['./forum-topic.component.css'],
  providers: [ForumTopicService, ForumSectionService]
})
export class ForumTopicComponent implements OnInit {

  @Input() topic: ForumTopic;
  @Input() section: ForumSection;
  forumTopicForm: FormGroup;
  forumSections: ForumSection[] = [];
  @ViewChild('sectSel') sectionSelect: ElementRef;

  constructor(private _forumTopic: ForumTopicService, private _forumSectionService: ForumSectionService) {
    this._forumSectionService.findAllAvailable().subscribe(next => {
      this.forumSections = next;
      this.initForm();
    });
  }

  ngOnInit() {
    this.forumTopicForm = new FormGroup({
      id: new FormControl(),
      header: new FormControl('', Validators.required),
      forumSection: new FormGroup({
        id: new FormControl()
        }
      ),
    });

  }

  initForm() {
    this.forumTopicForm.setValue({
      id: this.topic.id,
      header: this.topic.header,
      forumSection: {id:this.section.id},
    });
    this.forumTopicForm.valueChanges.subscribe(next => {
      this.topic = next;
    });
  }

  addForumTopic() {
    this._forumTopic.update(JSON.stringify(this.topic)).subscribe(next => {
      this.topic = next;
      this.initForm();
    }, error2 => {
      console.log(error2);
    },()=>{
      alert("Готово")
    });

  }
}
