import { Injectable } from '@angular/core';
import {FacebookService, LoginResponse, LoginOptions, UIResponse, UIParams, FBVideoComponent} from 'ng2-facebook-sdk';
import {Http,Headers,Response} from '@angular/http';

import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
@Injectable()
export class RegisterService {

  constructor(private http:Http) { }

auth(token,id)

  {  const body= {'id':id,'token':token};
   let headers= new Headers();
   console.log(body);
   headers.append('Content-Type','application/json'); 
   
    return this.http.post('http://localhost:3000/api/facebook',body,{headers:headers})
          .map(res=>res.json());


  }

fetchCoordinates()
{
   let headers= new Headers();
   
   headers.append('Content-Type','application/json'); 
   
    return this.http.get('http://localhost:3000/api/fetchCoordinates',{headers:headers})
          .map(res=>res.json());
}

fetchUser()
{
   let headers= new Headers();
   
   headers.append('Content-Type','application/json'); 
   
    return this.http.get('http://localhost:3000/api/fetchUser',{headers:headers})
          .map(res=>res.json());
}

}
