import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AccountRoutingModule} from "./account-routing.module";
import {SharedModule} from "../shared/shared.module";
import { ResetPassComponent } from './reset-pass/reset-pass.component';
import { LostPassComponent } from './lost-pass/lost-pass.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ResetPassComponent,
    LostPassComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule
  ]
})
export class AccountModule { }
