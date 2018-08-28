import {Component, OnInit} from '@angular/core';
import {ForumSectionService} from '../../../../../../../../../../shared/service/forum-section.service';
import {ActivatedRoute} from '@angular/router';
import {ForumSection} from '../../../../../../../../../../shared/models/forum-section';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {fromNullOrUndefined} from '../../../../../../../../../../shared/utils/utils';
import {ForumSectionContainerService} from '../../../../../../../../../../shared/service/forum-section-container.service';
import {ForumSectionContainer} from '../../../../../../../../../../shared/models/forum-section-container';
import {ForumTopicService} from '../../../../../../../../../../shared/service/forum-topic.service';
import {ForumTopic} from '../../../../../../../../../../shared/models/forum-topic';

@Component({
  selector: 'app-forum-section-one',
  templateUrl: './forum-section-one.component.html',
  styleUrls: ['./forum-section-one.component.css'],
  providers: [ForumSectionService, ForumSectionContainerService,ForumTopicService]
})
export class ForumSectionOneComponent implements OnInit {

  section: ForumSection = new ForumSection();
  sectionForm: FormGroup;
  containers: ForumSectionContainer[] = [];
  topic: ForumTopic[]=[];
  bool=false;
  id: number;

  constructor(private _forumSectionService: ForumSectionService, private _activatedRoute: ActivatedRoute, private _container: ForumSectionContainerService, private _topic: ForumTopicService) {
    _activatedRoute.params.subscribe(param => {
      this._forumSectionService.findOneAvailable(param['id']).subscribe(next => {
        console.log(next);
        this.section = next;
        this.id=next.id;
        this._topic.findAllByFromSectionId(next.id).subscribe(next=>{
            this.topic=next;

        },error => {
            console.log(error);
        });
        this._container.findAllAvailable().subscribe(next => {
          this.containers = next;
          this.bool=true;
        }, err => {
          console.error(err);
        });
        this.initForm();
      }, err => {
        console.error(err);
      });

    });
  }

  initForm() {
    this.sectionForm.setValue({
      header: fromNullOrUndefined(this.section.header),
      description: fromNullOrUndefined(this.section.description),
      container: {id:fromNullOrUndefined(this.section.container).id},
    });
    this.sectionForm.valueChanges.subscribe(next => {
      this.section = next;
    });
  }

  ngOnInit() {
    this.sectionForm = new FormGroup({
      header: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      container: new FormGroup({
        id:new FormControl()
      })
    });
  }

  updateSection() {
    console.log(this.section);
    this.section.id=this.id;
      this._forumSectionService.update(this.section).subscribe(next => {
        this.section = next;
        this.initForm();
      }, err => {
        console.error(err);
      },()=>{
        alert("Готово")
      });
    }
}
