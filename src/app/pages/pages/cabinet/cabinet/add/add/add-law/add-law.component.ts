import {Component, OnInit} from '@angular/core';
import {LawService} from "../../../../../../../shared/service/law.service";
import {LawContainerService} from "../../../../../../../shared/service/law-container.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Law} from "../../../../../../../shared/models/law";
import {LawContainer} from "../../../../../../../shared/models/law-container";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-add-law',
  templateUrl: './add-law.component.html',
  styleUrls: ['./add-law.component.css'],
  providers: [LawService, LawContainerService]
})
export class AddLawComponent implements OnInit {

  lawForm: FormGroup;
  lawContainerForm: FormGroup;
  law: Law = new Law();
  lawJson: string;
  lawContainer: LawContainer = new LawContainer();
  lawContainers: LawContainer[] = [];
  checkForm: boolean = false;


  constructor(private _lawService: LawService, private _lawContainerService: LawContainerService) {
    this._lawContainerService.findAllAvailable().subscribe(next => {
      this.lawContainers = next;
    }, error2 => {
      console.log(error2)
    })
  }

  addLawContainer(el: HTMLSelectElement) {
    el.value='';
    this._lawContainerService.save(this.lawContainer).subscribe(next => {
      this.lawContainers.push(next);
      this.law.container = next;
      console.log(JSON.stringify(next));
      this.lawContainerForm.reset();
      this.checkForm = false;
    }, error2 => {
      console.log(error2)
    })
  }

  addLaw() {

    this._lawService.saveWithId(this.law, this.law.container.id).subscribe(next => {
      this.law = next;
      console.log(this.law);
      console.log(JSON.stringify(next));
      this.lawForm.reset();
    }, error2 => {
      console.log(error2)
    },()=>{
      alert("Готово")
    })
  }

  validSelect(el: HTMLSelectElement){
    if(el.value == '1' || el.value == ''){
      return false;
    }
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

  ngOnInit() {
    this.lawContainerForm = new FormGroup({
      name: new FormControl('', Validators.required),
    });
    this.lawContainerForm.valueChanges.subscribe(next => {
      // console.log('-------lawContainerForm--------');
      // console.log('next '+this.lawContainerForm.valid);
      // console.log('name '+this.lawContainerForm.get('name').valid);
      // console.log('-------lawContainerForm--------');
      this.lawContainer = next;
    });
    this.lawForm = new FormGroup({
      name: new FormControl('', Validators.required),
      path: new FormControl('', Validators.required),
      container: new FormControl('', Validators.required)
    });
    this.lawForm.valueChanges.subscribe(next => {
      // console.log('------lawForm-------');
      // console.log('next '+this.lawForm.valid);
      // console.log('name '+this.lawForm.get('name').valid);
      // console.log('path '+this.lawForm.get('path').valid);
      // console.log('cont '+JSON.stringify(next.container)+this.lawForm.get('container').valid);
      // console.log('------lawForm-------');
      this.law = next;
      // if (!isNullOrUndefined(next.container) && next.container != '')
      //   this.law.container = JSON.parse(next.container.replace('\\', ''));
      this.lawJson = JSON.stringify(this.law);
    });
  }

}
