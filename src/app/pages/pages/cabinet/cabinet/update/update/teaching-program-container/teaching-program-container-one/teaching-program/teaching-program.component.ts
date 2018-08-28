import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TeachingProgramContainerService} from "../../../../../../../../../shared/service/teaching-program-container.service";
import {TeachingProgram} from "../../../../../../../../../shared/models/teaching-program";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TeachingProgramContainer} from "../../../../../../../../../shared/models/teaching-program-container";
import {ActivatedRoute} from "@angular/router";
import {TeachingProgramService} from "../../../../../../../../../shared/service/teaching-program.service";
import {fromNullOrUndefined} from "../../../../../../../../../shared/utils/utils";

@Component({
  selector: 'app-teaching-program',
  templateUrl: './teaching-program.component.html',
  styleUrls: ['./teaching-program.component.css'],
  providers: [TeachingProgramService,TeachingProgramContainerService]
})
export class TeachingProgramComponent implements OnInit {
  @Input('program') program: TeachingProgram;
  @Input('container') container: TeachingProgramContainer;
  @Output() event: EventEmitter<any> = new EventEmitter<any>();

  teachingProgramJson: string;
  teachingProgramForm: FormGroup;
  tPC: TeachingProgramContainer[]=[];

  fileName = '';

  constructor(private _teachingProgramService: TeachingProgramService, private _tPC: TeachingProgramContainerService) {
    this._tPC.findAllAvailable().subscribe(next => {
        this.tPC= next;
        this.initForm();
      }, error2 => {
        console.log(error2)
    })
  }

  getFileName(file: HTMLInputElement){
    this.fileName=file.files.item(0).name;
  }


  updateTeachingProgram(imageForm: HTMLFormElement) {
    this.teachingProgramJson = JSON.stringify(this.program);
    this._teachingProgramService.update(this.teachingProgramJson,imageForm).subscribe(next => {
      console.log(next);
      this.program = next;
      this.event.emit(this.program);
      this.teachingProgramJson = JSON.stringify(this.program);
      this.initForm();
    }, err => {
      console.error(err);
    },()=>{
      alert("Готово")
    });
  }

  initForm() {
    this.program.container=this.container;
    this.fileName = this.program.file.name;
    this.teachingProgramForm.setValue({
      id: fromNullOrUndefined(this.program.id),
      name: fromNullOrUndefined(this.program.name),
      container: {id: fromNullOrUndefined(this.container).id},
    });
    this.teachingProgramForm.valueChanges.subscribe(next => {
      this.program = next;
      this.teachingProgramJson = JSON.stringify(this.program);
    });
  }

  ngOnInit() {
    this.teachingProgramForm = new FormGroup({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      container: new FormGroup({
        id: new FormControl()
      }),
    });


  }

}
