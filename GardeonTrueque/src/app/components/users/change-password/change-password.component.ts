import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../../../services/auth.service';
import { UserInterface } from '../../../models/user';
import { DataApiService } from '../../../services/data-api.service';
import SimpleCrypto from 'simple-crypto-js';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  user: UserInterface = {
    user_name: '',
    uid: '',
    useremail: '',
    userpassword: ''
  };
  isError = false;
  isReLogged = false;
  havePass = false;
  msgError = '';
  password = '';
  confirmPassword = '';

  constructor(
    private authService: AuthService,
    private dataapi: DataApiService,
    private router: Router,
    private afsAuth: AngularFireAuth
    ) {
      this.authService.isAuth().subscribe( userLogged => {
        if (userLogged) {
          this.user.uid = userLogged.uid;
          const found = userLogged.providerData.find( element => {
            return element.providerId === 'password';
          });
          if (found) {
            this.havePass = true;
            console.log('password');
          } else {
            this.onIsError('Usuario no tiene configurada una contraseña. Configura una contraseña. Necesitara iniciar sesion nuevamente');
            console.log('no encontrado');
          }
          this.user.user_name = userLogged.displayName;
          this.user.useremail = userLogged.email;
        } else {
          console.log('NO User Logged');
        }
      });
    }

  ngOnInit() {
    console.log(this.havePass);
  }
  onContinue() {
    this.authService.loginEmailUser(this.user.useremail, this.user.userpassword)
      .then( res => {
        this.isReLogged = true;
        this.isError = false;
      }).catch( err => {
        this.onIsError('Contraseña incorrecta');
        console.log(err.mesagge);
      });
  }
  onAddPass() {
    if (this.password === this.confirmPassword) {
      this.user.userpassword = this.password;
      this.authService.isAuth().subscribe( async userLogged => {
        // userLogged.cre
        await userLogged.reauthenticateWithPopup(new auth.GoogleAuthProvider());
        const credential = auth.EmailAuthProvider.credential(this.user.useremail, this.user.userpassword);
        userLogged.linkWithCredential(credential).then( userCred => {
          // const user = userCred.user;
          this.onCryptoPass();
          this.dataapi.updateUser(this.user.uid, this.user)
          .subscribe(
            res => {
              console.log(res);
            },
            err => console.log(err.message)
          );
          this.havePass = true;
          this.onRedirect('/user/profile');
        });
      });
    } else {
      this.onIsError('Contraseñas no coinciden');
    }
  }
  onSave() {
    if (this.password === this.confirmPassword) {
      this.afsAuth.auth.currentUser.updatePassword(this.password)
        .then( () => {
          this.isError = false;
          console.log('Se actualizo la contraseña');
          this.onCryptoPass();
        }).catch( err => {
          this.onIsError('No se pudo cambiar la contraseña');
        });
      this.dataapi.updateUser(this.user.uid, this.user)
        .subscribe(
          res => {
            console.log(res);
          },
          err => console.log(err.message)
        );
      this.onRedirect('/user/profile');
      // window.location.reload();
    } else {
      this.onIsError('Contraseñas no coinciden');
    }
  }
  onCryptoPass() {
    const simplecrypto = new SimpleCrypto(this.user.uid);
    this.user.userpassword = simplecrypto.encrypt(this.user.userpassword);
  }
  onRedirect(route: string) {
    this.router.navigate([route]);
  }
  onIsError(msgError: string): void {
    this.msgError = msgError;
    this.isError = true;
  }

}
