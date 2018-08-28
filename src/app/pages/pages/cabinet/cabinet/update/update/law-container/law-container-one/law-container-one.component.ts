import {Component, OnInit} from '@angular/core';
import {LawContainerService} from '../../../../../../../../shared/service/law-container.service';
import {LawContainer} from '../../../../../../../../shared/models/law-container';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {fromNullOrUndefined} from '../../../../../../../../shared/utils/utils';
import {LawService} from '../../../../../../../../shared/service/law.service';
import {Law} from '../../../../../../../../shared/models/law';

@Component({
  selector: 'app-law-container-one',
  templateUrl: './law-container-one.component.html',
  styleUrls: ['./law-container-one.component.css'],
  providers: [LawContainerService,LawService]
})
export class LawContainerOneComponent implements OnInit {

  lawContainer: LawContainer = new LawContainer();
  laws: Law[]=[];
  containerForm: FormGroup;

  constructor(private _lawContainerService: LawContainerService, private _activatedRoute: ActivatedRoute, private _law :LawService) {
    this._activatedRoute.params.subscribe(next => {
      this._lawContainerService.findOneAvailable(next['law']).subscribe(next => {
        this.lawContainer = next;
        this._law.findAllByContainer(next.id).subscribe(next=>{
          this.laws=next;
          this.initForm();
        })
        this.initForm();
      }, err => {
        console.error(err);
      });
    });
  }

  load(any){
    this._law.findAllByContainer(this.lawContainer.id).subscribe(next=>{
      this.laws=next;
      this.initForm();
    })
  }

  updateContainer() {
    this._lawContainerService.update(this.lawContainer).subscribe(next => {
      this.lawContainer = next;
      this.initForm();
    }, err => {
      console.error(err);
    },()=>{
      alert("Готово")
    });
  }

  initForm() {
    this.containerForm.setValue({
      name: fromNullOrUndefined(this.lawContainer.name)
    });
    this.containerForm.valueChanges.subscribe(next => {
      this.lawContainer.name = next.name;
    });
  }

  ngOnInit() {
    this.containerForm = new FormGroup({
      name: new FormControl('', Validators.required)
    });
  }

}
