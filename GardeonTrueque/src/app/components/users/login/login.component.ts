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
    username: '',
    uid: '',
    email: '',
    password: ''
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
    this.authService.loginEmailUser(this.user.email, this.user.password)
    .then((res) => {
      const userLogged = res.user;
      this.user.uid = userLogged.uid;
      this.user.displayName = userLogged.displayName;
      this.user.email = userLogged.email;
      this.dataapi.getUser(this.user.uid)
        .subscribe(
          result => {
            console.log('suscribe', result);
            if (result.password !== this.user.password) {
              const simplecrypto = new SimpleCrypto(this.user.uid);
              this.user.password = simplecrypto.encrypt(this.user.password);
              this.dataapi.updateUser(result.uid, this.user)
                .subscribe(upRes => console.log(upRes), upErr => console.log(upErr));
            }
          },
          err => {
            console.log(err.error.message);
            const simplecrypto = new SimpleCrypto(this.user.uid);
            this.user.password = simplecrypto.encrypt(this.user.password);
            this.dataapi.saveUser(this.user)
              .subscribe(
                rs => {
                  console.log(rs);
                },
                error => console.log(error.message)
              );
          }
        );
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
      this.user.displayName = user.displayName;
      this.user.email = user.email;
      this.dataapi.getUser(this.user.uid)
        .subscribe(
          result => {
            console.log('suscribe', result);
          },
          err => {
            console.log(err.error.text);
            this.dataapi.saveUser(this.user)
              .subscribe(
                rs => {
                  console.log(rs);
                },
                error => console.log(error.message)
              );
          }
        );
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
