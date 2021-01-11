import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LoginComponent } from './views/auth/login/login.component';
import { ChatComponent } from './views/home/chat/chat.component';
import { RegistrationComponent } from './views/auth/registration/registration.component';
import { AuthService } from "./jwtAuth/auth.service";
import { AuthGuard } from "./jwtAuth/auth.guard";
import { SecureInnerPagesGuard } from "./jwtAuth/secure-inner-pages.guard";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [AuthService, AuthGuard, SecureInnerPagesGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
