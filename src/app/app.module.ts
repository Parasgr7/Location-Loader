import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

import { RouterModule,Routes } from '@angular/router';
import { FacebookModule } from 'ng2-facebook-sdk';
import { DashboardComponent } from './dashboard/dashboard.component';
import {RegisterService} from './register.service';
import { MenuComponent } from './menu/menu.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MenuComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FacebookModule.forRoot(),
    RouterModule.forRoot([
      {path:'',component:AppComponent},
      {path:'dashboard',component:DashboardComponent},
      {path:'register',component:RegisterComponent},
      {path:'signup',component:LoginComponent}
    ])
  ],
  providers: [RegisterService],
  bootstrap: [AppComponent]
})
export class AppModule { }

