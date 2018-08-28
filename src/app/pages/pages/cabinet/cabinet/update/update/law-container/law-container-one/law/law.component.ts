import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {LawService} from '../../../../../../../../../shared/service/law.service';
import {ActivatedRoute} from '@angular/router';
import {Law} from '../../../../../../../../../shared/models/law';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {fromNullOrUndefined} from '../../../../../../../../../shared/utils/utils';
import {LawContainer} from "../../../../../../../../../shared/models/law-container";
import {LawContainerService} from "../../../../../../../../../shared/service/law-container.service";

@Component({
  selector: 'app-law',
  templateUrl: './law.component.html',
  styleUrls: ['./law.component.css'],
  providers: [LawService,LawContainerService]
})
export class LawComponent implements OnInit {
  @Input('law') law: Law;
  @Input('cont') cont: LawContainer;
  @Output() event: EventEmitter<any> = new EventEmitter<any>();
  lawForm: FormGroup;
  lawCons: LawContainer[]=[];


  constructor(private _lawService: LawService, private _activateRoute: ActivatedRoute, private _conServ: LawContainerService) {

      this._conServ.findAllAvailable().subscribe(next => {
        this.lawCons = next;
      }, error2 => {
        console.log(error2)
      });
  }

  updateLaw() {
    this._lawService.update(this.law).subscribe(next => {
      console.log(JSON.stringify(next));
      this.law = next;
      this.event.emit(this.law);
      // this.initForm();
    }, err => {
      console.error(err);
    },()=>{
      alert("Готово")
    });
  }

  initForm() {

    this.law.container = this.cont;
    this.lawForm.setValue({
      name: fromNullOrUndefined(this.law.name),
      path: fromNullOrUndefined(this.law.path),
      container: {id: fromNullOrUndefined(this.law.container).id}
    });

  }

  ngOnInit() {
    this.lawForm = new FormGroup({
      name: new FormControl('', Validators.required),
      path: new FormControl('', Validators.required),
      container: new FormGroup({
        id: new FormControl()
      })
    });
    this.lawForm.valueChanges.subscribe(next => {
      this.law.name = next.name;
      this.law.path = next.path;
      this.law.container = next.container;
      console.log(this.law);
    });
    this.initForm();
    console.log(this.law);
  }

}
