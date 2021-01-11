import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/auth/login/login.component';
import { ChatComponent } from './views/home/chat/chat.component';
import { RegistrationComponent } from './views/auth/registration/registration.component';
import { SecureInnerPagesGuard } from './jwtAuth/secure-inner-pages.guard';
import { AuthGuard } from './jwtAuth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'registration', component: RegistrationComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
