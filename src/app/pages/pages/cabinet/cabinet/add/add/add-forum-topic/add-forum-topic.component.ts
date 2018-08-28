import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ForumSectionService} from "../../../../../../../shared/service/forum-section.service";
import {ForumTopicService} from "../../../../../../../shared/service/forum-topic.service";
import {ForumTopic} from "../../../../../../../shared/models/forum-topic";
import {ForumSection} from "../../../../../../../shared/models/forum-section";

@Component({
  selector: 'app-add-forum-topic',
  templateUrl: './add-forum-topic.component.html',
  styleUrls: ['./add-forum-topic.component.css'],
  providers: [ForumTopicService,ForumSectionService]
})
export class AddForumTopicComponent implements OnInit {

  forumTopic: ForumTopic = new ForumTopic;
  forumTopicForm: FormGroup;
  forumSections: ForumSection[] = [];

  constructor(private _forumTopic: ForumTopicService,private _forumSectionService: ForumSectionService) {
    this._forumSectionService.findAll().subscribe(next =>{
      this.forumSections = next
    })
  }

  ngOnInit() {
    this.forumTopicForm = new FormGroup({
      header : new FormControl('',Validators.required),
      time : new FormControl('',Validators.required),
      forumSections : new FormControl('',Validators.required),
    });
    this.forumTopicForm.valueChanges.subscribe(next=>{
      this.forumTopic = next;
    })
  }

  addForumTopic(){
    this._forumTopic.save(this.forumTopic).subscribe(next =>{
      console.log(JSON.stringify(next))
    },error2 => {
      console.log(error2)
    })

  }

}
