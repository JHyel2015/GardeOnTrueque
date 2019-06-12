import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from 'firebase/app';
import { Router } from "@angular/router";

@Component({
  selector: 'app-password-forgot',
  templateUrl: './password-forgot.component.html',
  styleUrls: ['./password-forgot.component.css']
})
export class PasswordForgotComponent implements OnInit {

  constructor(private router: Router, private afsAuth: AngularFireAuth) { }
  public email: string = '';
  public password: string = '';
  public confirmPass: string = '';
  public isError: boolean = false;
  public msgError: string = '';

  ngOnInit() {
  }
  onRecover() {
    this.onSendPassReset();
  }
  onSendPassReset() {
    var emailAddress = this.email;

    this.afsAuth.auth.sendPasswordResetEmail(emailAddress).then(res => {
      this.onLoginRedirect('/');
    }).catch((error) => {
      console.log(error.message);
      this.isError = true;
      this.msgError = 'El usuario no esta registrado'
    });
  }
  onLoginRedirect(route: string) {
    this.router.navigate([route]);
  }
  onCancel(){
    this.onLoginRedirect('/');
  }

}
