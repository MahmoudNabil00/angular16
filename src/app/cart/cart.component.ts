import { Component, OnInit, computed, effect, signal } from '@angular/core';
import { GeneralService, IProduct } from '../general.service';
import { repeat } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  cartItems: IProduct[] = [];
  checked = false
  value !: number
  quantity = signal<any>(null)
  qtyAvailable = signal<any>([
    'one','two','three','four'
  ])
  addText:any
  NgModelWithSignal = signal<any>(null)
  NgModelValue:any
  x = signal<any>(5)
  y = signal<any>(5)
  z = computed(()=>this.x()+this.y())
  signalAsFunction = effect(()=>console.log(this.x()))
  constructor(public service:GeneralService){
    for(let i in this.service){console.log(i)}
    console.log('---'.repeat(10));
    console.log(Object.keys(this.service))
    console.log('---'.repeat(10));
    console.log(this.service)
    
  }
  ngOnInit(): void {
    console.log(this.z);
    console.log('Effect : -',this.signalAsFunction);
    
    // this.NgModelWithSignal.set(this.NgModelValue)
    this.quantity.set(5)
    // console.log(this.quantity());
  }
  testToggle(){
    console.log(this.checked,this.value)
  }
    //using behavior subject
  // remove(i: number){
  //   this.service.removeProduct(i);
  // }

  //using signal
  remove(i: number,product:IProduct){
    this.service.signal_RemoveProduct(i,product)
  }
  testViewChild(text:any){
    alert(text)
    console.log('amer')
  }
  onQuantitySelected(value:any){
    this.quantity.set(value)
    console.log(value);
    console.log(this.quantity);
  }
  addOption(){
    this.qtyAvailable().push(this.addText)
    this.addText = ''
  }
  testInput(testInput:any){
    this.NgModelWithSignal.set(testInput)
  }
  changeTheValueOfZ(){
    this.x.set(10)
    // this.z = this.y()+this.x()
  }
}
