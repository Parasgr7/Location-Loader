import { Component, OnInit } from '@angular/core';
import {RegisterService} from './../register.service';
import {Router } from '@angular/router';
import {FacebookService, LoginResponse, LoginOptions, UIResponse, UIParams, FBVideoComponent} from 'ng2-facebook-sdk';

 declare const gapi: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private register:RegisterService,private router:Router,private fb: FacebookService) {

      fb.init({
      appId: '1415387291856002',
      version: 'v2.9'
    });
   }
public token;
 public authToken;
 public userID;


  ngOnInit() {
  }



onlog(val){
  console.log(val);

  this.register.login(val).subscribe(data => {
    
     if(data.success)
     {
      this.register.storeUserData(data.token,data.user);
      console.log('Logged In');

     this.router.navigate(['dashboard']);
     console.log(data);

     }
     else{
 alert(data.msg);
     this.router.navigate(['login']);
     }

 });
}


loginFacebook() {
 const loginOptions: LoginOptions = {
      enable_profile_selector: true,
      return_scopes: true,
      scope: 'public_profile,email,user_location'
    };

    this.fb.login(loginOptions)
      .then((res: LoginResponse) => {
        console.log( res.status);
      if(res.status==='connected'){
        console.log('Logged In');
      }
      else {
        this.fb.login();
      }
        this.authToken=res.authResponse.accessToken;
        this.userID=res.authResponse.userID;
        
   if(res){
     this.register.auth(this.authToken,this.userID).subscribe(data=>{
       
       if(data)
       
       {
this.register.storeUserData(data.token,data.user);
      
     this.router.navigate(['dashboard']);
     location.reload();
       }
     })
   }
      })
      .catch(err=>{console.log(err)});

}




}
