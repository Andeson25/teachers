import {Component, OnInit} from '@angular/core';
import {ForumSectionContainerService} from '../../../../../../../shared/service/forum-section-container.service';
import {ForumSectionContainer} from '../../../../../../../shared/models/forum-section-container';

@Component({
  selector: 'app-forum-section-container',
  templateUrl: './forum-section-container.component.html',
  styleUrls: ['./forum-section-container.component.css'],
  providers: [ForumSectionContainerService]
})
export class ForumSectionContainerComponent implements OnInit {

  sectionContainerList: ForumSectionContainer[] = [];

  constructor(private _forumSectionContainerService: ForumSectionContainerService) {
    this._forumSectionContainerService.findAllAvailable().subscribe(next => {
      this.sectionContainerList = next;
    }, err => {
      console.error(err);
    });
  }

  ngOnInit() {
  }

}
