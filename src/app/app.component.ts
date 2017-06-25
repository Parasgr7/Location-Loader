import { Component,OnInit} from '@angular/core';
import{RegisterService} from './register.service';

import{Router} from '@angular/router';
import {FacebookService, LoginResponse, LoginOptions, UIResponse, UIParams, FBVideoComponent} from 'ng2-facebook-sdk';

 declare const gapi: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
 
 public token;
 public authToken;
 public userID;



  constructor( private fb: FacebookService,private service: RegisterService,private router:Router){ 

    
    fb.init({
      appId: '1415387291856002',
      version: 'v2.9'
    });
   }
 
login() {
 const loginOptions: LoginOptions = {
      enable_profile_selector: true,
      return_scopes: true,
      scope: 'public_profile,email,user_location'
    };

    this.fb.login(loginOptions)
      .then((res: LoginResponse) => {
        console.log('Logged in', res);
        this.authToken=res.authResponse.accessToken;
        this.userID=res.authResponse.userID;
        
   if(res){
     this.router.navigate(['/dashboard']);
     location.reload();
     this.service.auth(this.authToken,this.userID).subscribe(data=>{
       console.log(data);
     })
   }
      })
      .catch(err=>{console.log(err)});

 

  }

  

logout(){
  this.fb.logout().then(()=>{console.log('Logged Out')});
}






}
  