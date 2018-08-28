import {Component, OnInit, ViewChild} from '@angular/core';
import {ForumSectionService} from '../../../../../../../shared/service/forum-section.service';
import {ForumSectionContainerService} from '../../../../../../../shared/service/forum-section-container.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ForumSection} from '../../../../../../../shared/models/forum-section';
import {ForumSectionContainer} from '../../../../../../../shared/models/forum-section-container';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-add-forum-section',
  templateUrl: './add-forum-section.component.html',
  styleUrls: ['./add-forum-section.component.css'],
  providers: [ForumSectionService, ForumSectionContainerService]
})
export class AddForumSectionComponent implements OnInit {

  forumSectionForm: FormGroup;
  forumSectionContainerForm: FormGroup;
  forumSection: ForumSection = new ForumSection();
  forumSectionContainer: ForumSectionContainer = new ForumSectionContainer();
  containers: ForumSectionContainer[] = [];
  checkForm: boolean = false;
  forumSectionJson: string;
  @ViewChild('select') select:HTMLSelectElement;

  constructor(private _forumSectionService: ForumSectionService,
              private _forumSectionContainerService: ForumSectionContainerService) {
    this._forumSectionContainerService.findAllAvailable().subscribe(next => {
      this.containers = next;
    }, error => {
      console.error(error);
    });
  }

  ngOnInit() {
    this.select.value='';
    this.forumSectionForm = new FormGroup({
      header: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      container: new FormControl(),

    });
    this.forumSectionForm.valueChanges.subscribe(next => {
      this.forumSection = next;
      if ((!isNullOrUndefined(next.container)) && next.container != ''){
        // this.forumSection.container = JSON.parse(next.container.replace('\\', ''));
        console.log(this.forumSection);
      }
      this.forumSectionJson = JSON.stringify(this.forumSection);
    });
    this.forumSectionContainerForm = new FormGroup({
      header: new FormControl('', Validators.required),
    });
    this.forumSectionContainerForm.valueChanges.subscribe(next => {
      this.forumSectionContainer = next;
    });
  }

  validSelect(el: HTMLSelectElement){
    if(el.value == '1' || el.value == ''){
      return false;
    }
  }

  addForumSectionContainer(el: HTMLSelectElement) {
    el.value='';
    this._forumSectionContainerService.save(this.forumSectionContainer).subscribe(next => {
      this.containers.push(next);
      this.forumSection.container = next;
      this.forumSectionContainerForm.reset();
      this.checkForm = false;
    }, error => {
      console.error(error);
    },()=>{
      alert("Готово")
    });
  }

  addForumSection() {
    this._forumSectionService.save(this.forumSection).subscribe(next => {
      this.forumSection = next;
      this.forumSectionForm.reset();
      console.log(next);
      this.forumSectionForm.reset();
    }, error => {
      console.error(error);
    },()=>{
      alert("Готово")
    });
  }

  showForm(el: HTMLSelectElement) {
    if (el.value == '1'){
      this.checkForm = true;
      el.value='';
    }
    else
      this.checkForm = false;
  }

  stringify(obj: any): string {
    return JSON.stringify(obj);
  }

}
