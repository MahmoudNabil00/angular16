import { HttpClient } from '@angular/common/http';
import {toSignal,toObservable} from '@angular/core/rxjs-interop'
import { Injectable, computed, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  //test hash # new feature instead of private
  #hashProperty:any = 'hash'
  public url = 'https://fakestoreapi.com/products'

  // get All Data-----+-----------------------------
  public products$ = this.http.get<IProduct[]>(this.url)
  // create signal from Observable -> the api will return list as signal
  public signal_GetAllProducts = toSignal<IProduct[]>(this.http.get<IProduct[]>(this.url))
  ///-------------------------------------------

  // Cart items behaviorSubject and Signal //
  public cartItems$ = new BehaviorSubject<IProduct[]>([])
  public signal_cartItems = signal<IProduct[]>([])
  // -------------------------------

  // Cart items behaviorSubject and Signal //
  public subTotal$ = new BehaviorSubject<any>(0)
  public signal_subTotal = computed(()=>this.signal_cartItems().reduce((prev:any,curr:any) => {
    return prev+curr.price
  },0))
   // -------------------------------

  // total items behaviorSubject and Signal //
  public TotalItems$ = new BehaviorSubject<any>(0)
  public signal_totalItems = computed(() => this.signal_cartItems().length) //computed -> do some calculation for signal 
  //---------------------

  public products:IProduct[] = []
  constructor(private http: HttpClient) {}
  addProduct(product:IProduct){
    this.products.push(product)
    this.cartItems$.next(this.products)
    this.TotalItems$.next(this.products.length)
    this.mapTotal();
  }
  removeProduct(id:any){
    this.products.splice(id, 1);
    this.cartItems$.next(this.products)
    this.TotalItems$.next(this.products.length)
    this.mapTotal();
  }
  mapTotal(){
    const total = this.products.reduce((prev:any,curr:any) => {
      return prev+curr.price
    },0)
    this.subTotal$.next(total)
  }

  //*-*-*-*-*-*-*-*-*-Signal*-*-*-*-*-*-*-*-*-*-* :-

  signal_AddProductToCart(product:IProduct){
    // mutate : detect if there is any change in the signal and emit it 
    // val : the existing signal 

    this.signal_cartItems.mutate(((val:any)=>{
      val.push(product)
    }))
    
    //Cannot work .
    // this.signal_cartItems().push(product)

    this.signal_GetAllProducts()?.forEach(ele=>{
      if(ele.id==product.id){
        ele.rating.count = ele.rating.count-1
      }
    })
  }
  signal_RemoveProduct(id:any,product:IProduct){
    this.signal_cartItems.mutate((val:any)=>{
      // const spliced = 
      val.splice(id, 1);
    })
    this.signal_GetAllProducts()?.forEach(ele=>{
      if(ele.id==product.id){
        ele.rating.count = ele.rating.count+1
      }
    })
  }
}

export interface IProduct {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
  rating: IRating;
}

interface IRating {
  rate: number;
  count: number;
}