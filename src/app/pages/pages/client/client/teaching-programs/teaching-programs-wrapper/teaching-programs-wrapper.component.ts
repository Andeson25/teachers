import {Component, OnDestroy, OnInit} from '@angular/core';
import {TeachingProgramContainer} from '../../../../../../shared/models/teaching-program-container';
import {TeachingProgramContainerService} from '../../../../../../shared/service/teaching-program-container.service';
import {MetaRxService} from '../../../../../../shared/service/meta-rx/meta-rx.service';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-teaching-programs-wrapper',
  templateUrl: './teaching-programs-wrapper.component.html',
  styleUrls: ['./teaching-programs-wrapper.component.css'],
  providers: [TeachingProgramContainerService]
})
export class TeachingProgramsWrapperComponent implements OnInit,OnDestroy {

  teachingProgramsContainers: TeachingProgramContainer [] = [];
  constructor(private  _teachingProgramsContainerService: TeachingProgramContainerService,private meta: MetaRxService) {
    this._teachingProgramsContainerService.findAllAvailable().subscribe(next => {
        this.teachingProgramsContainers = next;
        let content: string='';
        next.forEach(next=>{
          if(content.length<=174)
           content+=next.name+'\n';
        });
        let keywords =  !isNullOrUndefined(this.teachingProgramsContainers[0])?this.teachingProgramsContainers[0].name:'';
        let one:any =[{ name: 'description', content: content}, { name: 'keywords', content: keywords }];
        meta.updateTitle('Навчальні програми');
        meta.updateMeta(one);
      }, error => {
        console.log(error);
      }
    )
  }

  ngOnDestroy(): void {
    this.meta.setDefaultAll();
  }



  delete(cont: TeachingProgramContainer){
    cont.available=false;
    this._teachingProgramsContainerService.delete(cont.id).subscribe(next=>{
      this.teachingProgramsContainers.splice(this.teachingProgramsContainers.indexOf(cont),1);
    },error => {
        console.log(error);
    })
  }

  ngOnInit() {
  }

}
