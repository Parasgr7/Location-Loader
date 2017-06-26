import { Component, OnInit } from '@angular/core';
import {RegisterService} from './../register.service';
import {Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private register:RegisterService,private router:Router) { }

  ngOnInit() {
  }
onsubmit(val){
  console.log(val);
  this.register.register(val).subscribe(bro => {
     if(bro.success)
     {
       alert('Registered Successfully');
       this.router.navigate(['/login']);

     }else{
       alert('Error!!!');
       this.router.navigate(['/register']);

     }
   });
}
}
