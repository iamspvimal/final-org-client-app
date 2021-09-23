import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  httpOptions;
  constructor(private http:HttpClient) { 
    
    }
  

  addProduct(obj):Observable<object>{

    //Url for azure function app
    const funUrl = "https://org-product-funapp.azurewebsites.net/api/ProductHttpTrigger?code=Enq51acwSWFbbJHS6MZ/BQ4dWxnD0HHf5PnVWdTiGCHVBufgkGdI7g==";
    //  //convert formData to json object
    const object = {};obj.forEach((value, key) => object[key] = value);
    //const jsonObj = JSON.stringify(object);

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

     console.log(object);
     return this.http.post(funUrl,object , { headers: headers });
     
     //return this.http.post("http://localhost:4500/products/add",obj);  
     //return this.http.post("http://52.191.81.59:4500/products/add",obj); 
     //return this.http.post("https://organic-node-0921.azurewebsites.net/products/add",obj);     


  }


  
  updateProduct(obj):Observable<object>{
   
    return this.http.post("https://organic-api-management.azure-api.net/products/update",obj);
 }


  removeProduct(obj):Observable<object>{
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
        })
      }
    return this.http.delete("https://organic-api-management.azure-api.net/products/remove/"+obj,this.httpOptions);
 }

  public getProducts():Observable<object>{
    return this.http.get("https://organic-api-management.azure-api.net/products/all");
  }

  public getProducts2(pattern:string):Observable<object>{
    return this.http.get("https://organic-api-management.azure-api.net/products/all/"+pattern);
  }


}
