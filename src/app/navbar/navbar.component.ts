import { Component, OnInit } from '@angular/core';
import {RegisterService} from './../register.service';
import {Router} from '@angular/router';

import {FacebookService, LoginResponse, LoginOptions, UIResponse, UIParams, FBVideoComponent} from 'ng2-facebook-sdk';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private auth:RegisterService,private router:Router,private fb: FacebookService) { }

  ngOnInit() {
  }

  logoutClick()
{ 
this.auth.logout();


  this.fb.logout().then(()=>{console.log('Logged Out')});

this.router.navigate(['/login']);
alert('Succesfully Logged out');
return false;


}

}
