import {Component, OnInit} from '@angular/core';
import {ForumSectionContainerService} from '../../../../../../../../shared/service/forum-section-container.service';
import {ForumSectionContainer} from '../../../../../../../../shared/models/forum-section-container';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {fromNullOrUndefined} from '../../../../../../../../shared/utils/utils';

@Component({
  selector: 'app-forum-section-container-one',
  templateUrl: './forum-section-container-one.component.html',
  styleUrls: ['./forum-section-container-one.component.css'],
  providers: [ForumSectionContainerService]
})
export class ForumSectionContainerOneComponent implements OnInit {

  sectionContainer: ForumSectionContainer = new ForumSectionContainer();
  sectionContainerForm: FormGroup;

  constructor(private _forumSectionContainerService: ForumSectionContainerService, private _activatedRoute: ActivatedRoute) {
    this._activatedRoute.params.subscribe(next => {
      this._forumSectionContainerService.findOneAvailable(next['id']).subscribe(next => {
        this.sectionContainer = next;
        this.initForm();
      }, err => {
        console.error(err);
      });
    });
  }

  initForm() {
    this.sectionContainerForm.setValue({
      header: fromNullOrUndefined(this.sectionContainer.header)
    });
    this.sectionContainerForm.valueChanges.subscribe(next => {
      this.sectionContainer.header = next.header;
    });
  }

  ngOnInit() {
    this.sectionContainerForm = new FormGroup({
      header: new FormControl('', Validators.required)
    });
  }

  update() {
    this._forumSectionContainerService.update(this.sectionContainer).subscribe(next => {
      this.sectionContainer = next;
      this.initForm();
    }, err => {
      console.error(err);
    },()=>{
      alert("Готово")
    });
  }
}
