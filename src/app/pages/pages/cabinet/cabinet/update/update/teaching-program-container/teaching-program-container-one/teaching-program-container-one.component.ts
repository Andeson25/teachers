import { Component, OnInit } from '@angular/core';
import {TeachingProgramContainerService} from "../../../../../../../../shared/service/teaching-program-container.service";
import {TeachingProgramContainer} from "../../../../../../../../shared/models/teaching-program-container";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {fromNullOrUndefined} from "../../../../../../../../shared/utils/utils";
import {TeachingProgramService} from '../../../../../../../../shared/service/teaching-program.service';
import {TeachingProgram} from '../../../../../../../../shared/models/teaching-program';

@Component({
  selector: 'app-teaching-program-container-one',
  templateUrl: './teaching-program-container-one.component.html',
  styleUrls: ['./teaching-program-container-one.component.css'],
  providers: [TeachingProgramContainerService, TeachingProgramService]
})
export class TeachingProgramContainerOneComponent implements OnInit {

  teachingProgramContainer: TeachingProgramContainer = new TeachingProgramContainer();
  teachingProgramContainerForm: FormGroup;
  programs: TeachingProgram[] = [];

  constructor(private _teachingProgramContainerService: TeachingProgramContainerService, private _activatedRoute: ActivatedRoute, private _teachingProgram: TeachingProgramService) {
    this._activatedRoute.params.subscribe(next => {
      this._teachingProgramContainerService.findOneAvailable(next['id']).subscribe(next => {
        this.teachingProgramContainer = next;
        this._teachingProgram.findAllByContainerId(this.teachingProgramContainer.id).subscribe(next => {
          this.programs=next;
          this.initForm();
          console.log(next);
        });

      }, err => {
        console.error(err);
      });
    });
  }

  load(event:any){
    this._teachingProgram.findAllByContainerId(this.teachingProgramContainer.id).subscribe(next => {
      this.programs=next;
      this.initForm();
    });
  }

  updateContainer() {
    // console.log(this.teachingProgramContainer);
    this._teachingProgramContainerService.update(this.teachingProgramContainer).subscribe(next => {
      this.teachingProgramContainer = next;
      this.initForm();
    }, err => {
      console.error(err);
    },()=>{
      alert("Готово")
    });
  }

  initForm() {
    this.teachingProgramContainerForm.setValue({
      id: fromNullOrUndefined(this.teachingProgramContainer.id),
      name: fromNullOrUndefined(this.teachingProgramContainer.name)
    });
    this.teachingProgramContainerForm.valueChanges.subscribe(next => {
      this.teachingProgramContainer = next;
    });
  }

  ngOnInit() {
    this.teachingProgramContainerForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.required)
    });
  }

}
