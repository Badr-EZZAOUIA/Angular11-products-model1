import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Products} from "../modules/products.module";

@Injectable({providedIn: "root"})
export class ProductsService{
  constructor(private http:HttpClient) {
  }

  getAllProducts():Observable<Products[]>{
    let host=environment.host;
    return this.http.get<Products[]>(host+"products/");
  }

  getSelectedProducts():Observable<Products[]>{
    let host=environment.host;
    return this.http.get<Products[]>(host+"products/?selected=true");
  }

  getAvailbleProducts():Observable<Products[]>{
    let host=environment.host;
    return this.http.get<Products[]>(host+"products/?availble=true");
  }

  searchProducts(keyword: string):Observable<Products[]>{
    let host=environment.host;
    return this.http.get<Products[]>(host+"products/?name_like="+keyword);
  }
  selected(product: Products):Observable<Products>{
    let host=environment.host;
    product.selected=!product.selected;
    return this.http.put<Products>(host+"products/"+product.id,product);
  }
  delet(product: Products):Observable<Products>{
    let host=environment.host;
    product.selected=!product.selected;
    return this.http.delete<Products>(host+"products/"+product.id);
  }
  save(product: Products):Observable<Products>{
    let host=environment.host;
    return this.http.post<Products>(host+"products/",product);
  }

  getProduct(id:number):Observable<Products>{
    let host=environment.host;
    return this.http.get<Products>(host+"products/"+id);
  }

  editeProduct(product: Products):Observable<Products>{
    let host=environment.host;
    return this.http.put<Products>(host+"products/"+product.id, product);
  }
}
