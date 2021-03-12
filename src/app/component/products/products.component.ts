import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {Products} from "../../modules/products.module";
import {Observable, of} from "rxjs";
import {catchError, map, startWith} from "rxjs/operators";
import {AppDataState, DataStateEnum} from "../../state/products.state";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  /*products?: Products[];*/
  products$: Observable<AppDataState<Products[]>> |null=null;
  readonly DataStateEnum= DataStateEnum;
  private submitted: boolean=false;

  constructor(private productsservice: ProductsService,private router: Router) { }

  ngOnInit(): void {
  }

  onGetAllProducts() {
    /*this.productsservice.getAllProducts().subscribe(data=>{
      this.products=data;
    }, error => {
      console.log(error);})*/
    console.log("test")
    this.products$=this.productsservice.getAllProducts().pipe(
      map(data=>{
        console.log(data);
        return ({dataState: DataStateEnum.LOADED, data:data})
      }),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR, erroreMessage: err.message}))
    );

  }

  onGetSelectedProducts() {
    this.products$=this.productsservice.getSelectedProducts().pipe(
      map(data=>{
        console.log(data);
        return ({dataState: DataStateEnum.LOADED, data:data})
      }),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR, erroreMessage: err.message}))
    );
  }

  onGetAvailbleProducts() {
    this.products$=this.productsservice.getAvailbleProducts().pipe(
      map(data=>{
        console.log(data);
        return ({dataState: DataStateEnum.LOADED, data:data})
      }),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR, erroreMessage: err.message}))
    );
  }

  onSearch(dataForm: any) {
    this.products$=this.productsservice.searchProducts(dataForm.keyword).pipe(
      map(data=>{
        console.log(data);
        return ({dataState: DataStateEnum.LOADED, data:data})
      }),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR, erroreMessage: err.message}))
    );
  }

  onSelect(p: Products) {
    this.productsservice.selected(p).subscribe(
      data=>{p.selected=data.selected;
      }
    )

  }

  onDelet(p: Products) {
    let v=confirm("Etez-vous sur");
    if(v==true)
    this.productsservice.delet(p).subscribe(
      data=>{this.onGetAllProducts();
      }
    )
  }

  onNewProduct() {
    this.router.navigateByUrl("newProduct")

  }

  onEditProduct(p: Products) {
    this.router.navigateByUrl("editProduct/"+p.id)
  }


}
