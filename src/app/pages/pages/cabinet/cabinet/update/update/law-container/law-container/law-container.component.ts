import {Component, OnInit} from '@angular/core';
import {LawContainerService} from '../../../../../../../../shared/service/law-container.service';
import {LawContainer} from '../../../../../../../../shared/models/law-container';

@Component({
  selector: 'app-law-container',
  templateUrl: './law-container.component.html',
  styleUrls: ['./law-container.component.css'],
  providers: [LawContainerService]
})
export class LawContainerComponent implements OnInit {

  lawContainerList: LawContainer[] = [];

  constructor(private _lawContainerService: LawContainerService) {
    this._lawContainerService.findAllAvailable().subscribe(next => {
      this.lawContainerList = next;
    }, err => {
      console.error(err);
    });
  }

  ngOnInit() {
  }

}
