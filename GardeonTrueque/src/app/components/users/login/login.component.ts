import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { AppComponent } from '../../../app.component';
import { DataApiService } from '../../../services/data-api.service';
import { UserInterface } from 'src/app/models/user';
import SimpleCrypto from 'simple-crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserInterface = {
    user_name: '',
    uid: '',
    useremail: '',
    userpassword: ''
  };

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService,
    private appComponent: AppComponent,
    private location: Location,
    private dataapi: DataApiService
    ) { }

  public isLogged = false;
  public isError = false;
  public msgError = '';

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
    });
  }
  onLogin(): void {
    this.authService.loginEmailUser(this.user.useremail, this.user.userpassword)
    .then((res) => {
      this.onLoginRedirect('/');
    }).catch( err => {
      this.onIsError(err.message);
      console.log('err', err.message);
      // this.onLoginRedirect('/user/register');
    });
  }
  onLoginGoogle(): void {
    this.authService.loginGoogleUser().then( (res) => {
      const user = res.user;
      this.user.uid = user.uid;
      this.user.user_name = user.displayName;
      this.user.useremail = user.email;
      this.dataapi.getUser(this.user.uid)
        .subscribe(
          res => {
            console.log('suscribe', res);
          },
          err => {
            console.log(err.error.text)
            var simplecrypto = new SimpleCrypto(this.user.uid);
            this.user.userpassword = simplecrypto.encrypt(this.user.userpassword);
            this.dataapi.saveUser(this.user)
              .subscribe(
                res => {
                  console.log(res);
                },
                err => console.log(err.message)
              )
          }
        )

      this.onLoginRedirect('/');
    }).catch( err => {
      this.onIsError(err.message);
      console.log('err', err.message);
    });
  }

  onLogout(): void {
    this.authService.logoutUser();
  }

  onLoginRedirect(route: string) {
    this.router.navigate([route]);
  }
  onIsError(msgError): void {
    this.msgError = msgError;
    this.isError = true;
  }
}
