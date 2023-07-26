import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faFilm } from '@fortawesome/free-solid-svg-icons';



const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'app-angular-material',
  templateUrl: './angular-material.component.html',
  styleUrls: ['./angular-material.component.scss']
})
export class AngularMaterialComponent implements OnInit{
  exampleOne !: FormGroup
  filmIcon:any = 'filmIcon'
  faHouse:any = 'fa-house'
  arrow : any = 'keyboard_arrow_down'
  date : any 
  faFilm = faFilm
  campaignOne = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  campaignTwo = new FormGroup({
    start: new FormControl(new Date(year, month, 15)),
    end: new FormControl(new Date(year, month, 19)),
  });
  constructor(public formGroup:FormBuilder){
  }
  ngOnInit(): void {
    this.exampleOne = this.formGroup.group({
      normalDate : new FormControl(new Date())
    })
  }
  showResult(){
    console.log('*'.repeat(30));
    console.log(this.campaignOne);
    console.log('*'.repeat(30));
    // console.log(this.campaignTwo);
    console.log('*'.repeat(30));
    console.log(this.campaignOne.get('start')?.touched);
    console.log('*'.repeat(30));
    console.log(this.campaignOne.controls.start.touched);
  }
  clearData(){
    this.campaignOne.get('start')?.setValue(null)
    this.campaignOne.controls['end'].setValue(null)
    // this.campaignOne.get('start')?.value = ''
  }
  showNormalResult(){
    console.log(this.exampleOne);
    
  }
}
