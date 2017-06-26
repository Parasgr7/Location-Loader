import { Injectable } from '@angular/core';
import {FacebookService, LoginResponse, LoginOptions, UIResponse, UIParams, FBVideoComponent} from 'ng2-facebook-sdk';
import {Http,Headers,Response} from '@angular/http';

import {tokenNotExpired} from 'angular2-jwt';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
@Injectable()
export class RegisterService {

  constructor(private http:Http) { }
public authToken;
public id;
public user;


auth(token,id)

  {  const body= {'id':id,'token':token};
   let headers= new Headers();
   console.log(body);
   headers.append('Content-Type','application/json'); 
   
    return this.http.post('http://localhost:3000/api/facebook',body,{headers:headers})
          .map(res=>res.json());


  }

register(value)
 {  const body= JSON.stringify(value);
   let headers= new Headers();
   headers.append('Content-Type','application/json'); 
   
    return this.http.post('http://localhost:3000/api/register',body,{headers:headers})
          .map(res=>res.json());


  }

  
login(value)
{
  const body= JSON.stringify(value);
   let headers= new Headers();

   headers.append('Content-Type','application/json');
   
    return this.http.post('http://localhost:3000/api/authenticate',body,{headers:headers})
          .map(res=>res.json());


}


fetchCoordinates()
{
   let headers= new Headers();
    this.loadToken();

  headers.append('Authorization',this.authToken);
   headers.append('Content-Type','application/json'); 
   
    return this.http.get('http://localhost:3000/api/fetchCoordinates',{headers:headers})
          .map(res=>res.json());
}

fetchUser()
{
   let headers= new Headers();
       this.loadToken();

  headers.append('Authorization',this.authToken);
   headers.append('Content-Type','application/json'); 
   
    return this.http.get('http://localhost:3000/api/fetchUser',{headers:headers})
          .map(res=>res.json());
}



 storeUserData(token,user)
 {
   localStorage.setItem('id_token',token);
   localStorage.setItem('user', JSON.stringify(user));
   this.authToken=token;
   this.user=user; 

    }
  logout()
  {
    this.authToken= null;
    this.user= null;
    localStorage.clear();
  
  }
  loggedIn(){
    return tokenNotExpired('id_token');
  }

  loadToken(){
    const token=localStorage.getItem('id_token');
    const user=localStorage.getItem('user');
    this.authToken=token; 
    this.id=JSON.parse(user);
    
  }

}
