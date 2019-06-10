import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { AppComponent } from "../../../app.component";
import { DataApiService } from "../../../services/data-api.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private router: Router, private authService: AuthService, private appComponent: AppComponent, private location: Location, private dataapi: DataApiService) { }

  public email: string = '';
  public password: string = '';
  public isLogged: boolean = false
  public isError: boolean = false;

  ngOnInit() {
    this.authService.isAuth().subscribe( auth => {
      if (auth) {
        console.log('User Logged');
        this.isLogged = true;
      } else {
        console.log('NO User Logged');
        this.isLogged = false;
      }
      console.log(this.isLogged);
    })
  }
  onLogin(): void {
    this.authService.loginEmailUser(this.email, this.password)
    .then((res) => {
      this.onLoginRedirect('/');
    }).catch( err => {
      this.onIsError();
      //this.authService.loginGoogleUser();
      // this.afAuth.auth.getRedirectResult().then(function(result) {
      //   if (result) {
      //     // This gives you a Google Access Token.
      //     var token = result.credential;
      //   }
      //   var user = result.user;
      // });
      
      // // Start a sign in process for an unauthenticated user.
      // var provider = new auth.GoogleAuthProvider();
      // provider.addScope('profile');
      // provider.addScope('email');
      // this.afAuth.auth.signInWithRedirect(provider);
      console.log('err', err.message);
      //this.onLoginRedirect('/user/register');
    });
  }
  onLoginGoogle(): void {
    this.authService.loginGoogleUser().then( (res) => {
      var credential = res.credential;
      var user = res.user;
      this.onLoginRedirect('/');
    }).catch( err => {
      this.onIsError();
      console.log('err', err.message);
    });
  }

  onLogout(): void {
    this.authService.logoutUser();
  }

  onLoginRedirect(route: string) {
    this.router.navigate([route]);
  }
  onIsError(): void {
    this.isError = true;
  }
}
