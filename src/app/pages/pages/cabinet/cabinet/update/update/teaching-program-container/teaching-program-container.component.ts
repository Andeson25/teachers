import { Component, OnInit } from '@angular/core';
import {TeachingProgramContainerService} from "../../../../../../../shared/service/teaching-program-container.service";
import {TeachingProgramContainer} from "../../../../../../../shared/models/teaching-program-container";

@Component({
  selector: 'app-teaching-program-container',
  templateUrl: './teaching-program-container.component.html',
  styleUrls: ['./teaching-program-container.component.css'],
  providers: [TeachingProgramContainerService]
})
export class TeachingProgramContainerComponent implements OnInit {

  teachingProgramContainerList: TeachingProgramContainer[] = [];

  constructor(private _teachingProgramContainerService: TeachingProgramContainerService) {
    this._teachingProgramContainerService.findAllAvailable().subscribe(next => {
      this.teachingProgramContainerList = next;
    }, err => {
      console.error(err);
    });
  }
  ngOnInit() {
  }

}
