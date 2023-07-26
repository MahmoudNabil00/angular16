import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter, withComponentInputBinding } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { InputRoutesComponent } from './input-routes/input-routes.component';
import { AngularMaterialComponent } from './angular-material/angular-material.component';


const routes: Routes = [
  {path:'', redirectTo:'products', pathMatch:'full'},
  {path:'products', component: ProductListComponent},
  {path:'cart', component: CartComponent},
  {path:'material', component: AngularMaterialComponent},
  {path:'input-routes/:id',component:InputRoutesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[provideRouter(
    routes,
    withComponentInputBinding() // <-- enable the feature
  ),]
})
export class AppRoutingModule { }

// bootstrapApplication(AppRoutingModule, {
//   providers: [

//   ],
// });