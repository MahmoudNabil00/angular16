import { Component, DestroyRef, Input, OnInit, computed, inject, signal } from '@angular/core';
import { GeneralService, IProduct } from '../general.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit{
  // @Input({required:true,alias:'v16'}) requiredInput:any
  testSignalArr = signal<any>([1,2,3,4,5,6,7])
  test = [1,2,3,4,5,6,7]
  data:any
  destroyRef = inject(DestroyRef)
  signalOne = signal<any>(5)
  signalTwo = signal<any>(5)
  // private route = inject(ActivatedRoute)

  constructor(public service:GeneralService , private route : ActivatedRoute){}

  ngOnInit(): void {
    let testIfSignal = computed(()=>this.signalOne() + this.signalTwo())
    // let testIfSignal = this.signalOne() + this.signalTwo()
    console.log(testIfSignal());
    this.testSignalArr().push(10)
    console.log(this.testSignalArr());
    
    let splicedElement = this.test.splice(1,1)
    this.testSignalArr().forEach((ele:any)=>{
      ele = ele*2
      // console.log(ele)
    })
    this.service.products$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res=>{
      this.data = res
    })
    console.log(splicedElement);
  }

  //using behavior subject
  // addToCart(product: IProduct){
  //   this.service.addProduct(product);
  // }
  
  //using signal
  addToCart(product: IProduct){
    this.service.signal_AddProductToCart(product)
  }
}
