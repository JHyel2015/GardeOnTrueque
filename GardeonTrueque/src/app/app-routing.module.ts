import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { Page404Component } from './components/page404/page404.component';
import { PasswordForgotComponent } from './components/users/password-forgot/password-forgot.component';
import { AuthGuard } from './guards/auth.guard';
import { ChangePasswordComponent } from './components/users/change-password/change-password.component';
import {MypostsComponent} from './components/myposts/myposts.component';
import { AuctionsComponent } from './components/auctions/auctions.component';
import { NewPostComponent} from './components/new-post/new-post.component';
import { InfoPostComponent } from './components/info-post/info-post.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'user/login', component: LoginComponent },
  { path: 'user/passwordforgot', component: PasswordForgotComponent},
  { path: 'user/register', component: RegisterComponent},
  { path: 'user/profile', component: ProfileComponent, canActivate: [AuthGuard] }, // TODO: only user auth
  { path: 'user/security', component: ChangePasswordComponent, canActivate: [AuthGuard] },
  { path: 'mispublicaciones', component: MypostsComponent },
  { path: 'auctions', component: AuctionsComponent, canActivate: [AuthGuard] },
  { path: 'info-post/:id', component: InfoPostComponent, canActivate: [AuthGuard] },
  { path: 'newPost', component: NewPostComponent, canActivate: [AuthGuard]  },
  { path: '**', component: Page404Component }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
