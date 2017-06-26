import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import {AuthGuard} from './guards/auth.guard';
import{EqualValidator} from './custom-validator';
import { RouterModule,Routes } from '@angular/router';
import { FacebookModule } from 'ng2-facebook-sdk';
import { DashboardComponent } from './dashboard/dashboard.component';
import {RegisterService} from './register.service';
import { MenuComponent } from './menu/menu.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MenuComponent,
    EqualValidator,
    RegisterComponent,
    LoginComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FacebookModule.forRoot(),
    RouterModule.forRoot([
      {path:'',component:MenuComponent},
      {path:'dashboard',component:DashboardComponent,canActivate: [AuthGuard]},
      {path:'register',component:RegisterComponent},
      {path:'login',component:LoginComponent}
    ])
  ],
  providers: [RegisterService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

