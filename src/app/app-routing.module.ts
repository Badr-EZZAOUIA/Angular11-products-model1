import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductsComponent} from "./component/products/products.component";
import {HomeComponent} from "./component/home/home.component";
import {ProductAddComponent} from "./component/product-add/product-add.component";
import {ProductEditComponent} from "./component/product-edit/product-edit.component";

const routes: Routes = [
  {path: "products" , component: ProductsComponent},
  {path: "newProduct" , component: ProductAddComponent},
  {path: "editProduct/:id" , component: ProductEditComponent},
  {path: "" , component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
