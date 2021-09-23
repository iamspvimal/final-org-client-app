import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LogService {
 httpOptions;
 username:String='';
 usertype:String='';
 token:string='';
 email:string='';
 status:boolean=false;
  constructor(private http:HttpClient) {
      let username=sessionStorage.getItem("username");
      let usertype=sessionStorage.getItem("usertype");
      let token=sessionStorage.getItem("token");
      let email=sessionStorage.getItem("email");
      if(username&&usertype){
        this.status=true;
        this.username=username;
        this.usertype=usertype;
        this.token=token;
        this.email=email;
      }
   }

  getStatus():boolean{
    return this.status;
  }

  // To Register a User
  register(obj):Observable<object>{
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
        })
    }
    return this.http.post("https://organic-api-management.azure-api.net/users/signup",obj,this.httpOptions);
  }

  //To check avalailability of mail id and username

  check(str):Observable<object>{
    return this.http.get("https://organic-api-management.azure-api.net/userlog/"+str,this.httpOptions);
  }

// to Login
  login(username,password):Observable<object>{
    let authstring='Basic '+btoa(username+":"+password);
    console.log(authstring)
    console.log(username,password)
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': authstring
      })
    }
    return this.http.post("https://organic-api-management.azure-api.net/users/signin",
    {username:username,password:password,usertype:"user"},
    this.httpOptions);
  }

  logout():void{
     this.token="";
     this.username="";
     this.usertype="";
     sessionStorage.removeItem("token");
     sessionStorage.removeItem("username");
     sessionStorage.removeItem("usertype");
     sessionStorage.removeItem("email");
  }
}
