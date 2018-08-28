import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TeachingProgram} from '../../../../../../../shared/models/teaching-program';
import {TeachingProgramService} from '../../../../../../../shared/service/teaching-program.service';
import {TeachingProgramContainer} from '../../../../../../../shared/models/teaching-program-container';
import {TeachingProgramContainerService} from '../../../../../../../shared/service/teaching-program-container.service';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-add-teaching-program',
  templateUrl: './add-teaching-program.component.html',
  styleUrls: ['./add-teaching-program.component.css'],
  providers: [TeachingProgramService, TeachingProgramContainerService]
})
export class AddTeachingProgramComponent implements OnInit {

  teachingProgramContainerForm: FormGroup;
  teachingProgramForm: FormGroup;
  teachingProgram: TeachingProgram = new TeachingProgram();
  teachingProgramJson: string;
  teachingProgramContainer: TeachingProgramContainer = new TeachingProgramContainer();
  containers: TeachingProgramContainer[] = [];
  checkForm: boolean = false;

  fileName='';



  constructor(private _teachingProgramContainerService: TeachingProgramContainerService,
              private _teachingProgramService: TeachingProgramService) {
    this._teachingProgramContainerService.findAllAvailable().subscribe(next => {
      this.containers = next;
    }, error => {
      console.error(error);
    });
  }

  getFileName(file: HTMLInputElement){
    this.fileName=file.files.item(0).name;
  }

  addTeachingProgramContainer(el: HTMLSelectElement) {
    // el.value='';
    this._teachingProgramContainerService.save(this.teachingProgramContainer).subscribe(next => {
      this.containers.push(next);
      this.teachingProgram.container = next;
      this.teachingProgramContainerForm.reset();
      console.log(JSON.stringify(next));
      this.checkForm = false;
    }, error2 => {
      console.log(error2);
    },()=>{
      alert("Готово")
    });
  }

  addTeachingProgram(form: HTMLFormElement,file:HTMLInputElement) {
    console.log("afsfsafs");
    this._teachingProgramService.saveWithFile(form, this.teachingProgramJson).subscribe(next => {
      this.teachingProgram = next;
      console.log(JSON.stringify(next));
      this.teachingProgramForm.reset();
      file.value='';
      this.fileName='';
    }, error => {
      console.error(error);
    },()=>{
      alert('Готово');
    });
  }


  validSelect(el: HTMLSelectElement) {
    if (el.value == '1' || el.value == '') {
      return false;
    }
  }

  ngOnInit() {
    this.teachingProgramContainerForm = new FormGroup({
      name: new FormControl('', Validators.required),
    });
    this.teachingProgramContainerForm.valueChanges.subscribe(next => {
      this.teachingProgramContainer = next;
    });

    this.teachingProgramForm = new FormGroup({
      name: new FormControl('', Validators.required),
      container: new FormControl('', Validators.required)
    });
    this.teachingProgramForm.valueChanges.subscribe(next => {
      this.teachingProgram = next;
      // console.log(next.container.replace('\\', ''));
      if (!isNullOrUndefined(next.container) && next.container != '')
        this.teachingProgram.container = JSON.parse(next.container.replace('\\', ''));
      this.teachingProgramJson = JSON.stringify(this.teachingProgram);
    });
  }

  showForm(el: HTMLSelectElement) {
    if (el.value == '1')
      this.checkForm = true;
    else
      this.checkForm = false;
  }

  stringify(obj: any): string {
    return JSON.stringify(obj);
  }

}
