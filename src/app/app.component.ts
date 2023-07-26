import { Component, OnInit } from '@angular/core';
import { mergeMap, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  // data1$:any = of([1,2,3])
  // data2$:any = of(['a','b','c'])
  // result : any
  ngOnInit(): void {
    // this.data1$.pipe(mergeMap((num:any) => this.data2$))
    // console.log('iam work !')
  }
  title = 'angularLastVersion';
}
