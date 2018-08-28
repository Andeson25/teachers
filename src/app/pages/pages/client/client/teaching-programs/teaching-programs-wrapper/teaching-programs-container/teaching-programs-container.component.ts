import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TeachingProgramContainer} from "../../../../../../../shared/models/teaching-program-container";
import {UserDetailsService} from '../../../../../../../shared/service/user-details-service';
import {User} from '../../../../../../../shared/models/user';

@Component({
  selector: 'app-teaching-programs-container',
  templateUrl: './teaching-programs-container.component.html',
  styleUrls: ['./teaching-programs-container.component.css']
})
export class TeachingProgramsContainerComponent implements OnInit {
  @Input() teachingProgramsContainer: TeachingProgramContainer;
  @Output() deleteCont: EventEmitter<TeachingProgramContainer> = new EventEmitter<TeachingProgramContainer>();
  user: User = new User();
  constructor(private _user :UserDetailsService) {
    this.user=this._user.user;
    this._user.getUser().subscribe(next=>{
        this.user=next;
    })
  }


  delete(){
    this.deleteCont.emit(this.teachingProgramsContainer);
  }
  ngOnInit() {
  }

}
