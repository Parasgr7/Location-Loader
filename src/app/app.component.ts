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

    }
   
 





}
  