import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
httpOptions;
  constructor(private http:HttpClient) { }

  sendMessage(obj):Observable<object>{
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
        })
      }
     return this.http.post("https://organic-api-management.azure-api.net/messages/all",obj,this.httpOptions)
  } 
  
  getMessagesByUsername():Observable<object>{
    let user=sessionStorage.getItem("username");
    return this.http.get("https://organic-api-management.azure-api.net/messages/all/"+user);
  }

  getMessagesByReciever():Observable<object>{
    let user=sessionStorage.getItem("username");
    return this.http.get("https://organic-api-management.azure-api.net/messages/received/"+user);
  }
  
  getMessages():Observable<object>{
  
    return this.http.get("https://organic-api-management.azure-api.net/messages/all/");
  }

}
