import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthService } from "../../../services/auth.service";
import { UserInterface } from "../../../models/user";
import { DataApiService } from "../../../services/data-api.service";
import { auth } from 'firebase/app';
import SimpleCrypto from 'simple-crypto-js';

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
  isError: boolean = false;
  isReLogged: boolean = false;
  msgError: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService, private dataapi: DataApiService, private router: Router) { }

  ngOnInit() {
    this.authService.isAuth().subscribe( userLogged => {
      if (userLogged) {
        this.user.uid = userLogged.uid;
        this.user.user_name = userLogged.displayName;
        this.user.useremail = userLogged.email;
      } else {
        console.log('NO User Logged');
      }
    });
    this.dataapi.getUser(this.user.uid)
      .subscribe(
        res => {
          this.user = res[0];
          this.user.userpassword = '';
        }
      );
  }
  onContinue(){
    this.authService.loginEmailUser(this.user.useremail, this.user.userpassword)
      .then( res => {
        this.isReLogged = true;
        window.location.reload;
      }).catch( err => {
        this.onIsError('Contraseña incorrecta');
        console.log(err.mesagge);
      })
  }
  onSave(){
    if (this.password === this.confirmPassword) {
      auth().currentUser.updatePassword(this.password)
        .then( () => {
          this.isError = false;
          console.log('Se actualizo la contraseña');
          var simplecrypto = new SimpleCrypto(this.user.uid);
          this.user.userpassword = simplecrypto.encrypt(this.password);
        }).catch( err => {
          this.onIsError('No se pudo cambiar la contraseña');
        })
      this.dataapi.updateUser(this.user.uid, this.user)
        .subscribe(
          res => {
            console.log(res);
          },
          err => console.log(err.message)
        );
      this.onRedirect('/user/profile');
      window.location.reload();
    } else {
      this.onIsError('Contraseñas no coinciden');
    }
  }
  onRedirect(route: string) {
    this.router.navigate([route]);
  }
  onIsError(msgError: string): void {
    this.msgError = msgError;
    this.isError = true;
  }

}
