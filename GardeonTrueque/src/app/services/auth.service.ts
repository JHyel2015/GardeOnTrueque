import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { map } from "rxjs/operators";
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afsAuth: AngularFireAuth) { }
  public msgError: string = '';

  registerUser(username: string, email: string, pass: string) {
    var register = 
      this.afsAuth.auth.createUserWithEmailAndPassword( email, pass);
    return register;
  }
  loginEmailUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.signInWithEmailAndPassword(email, pass)
        .then( userData => resolve(userData), err => reject(err))
    });
  }
  loginGoogleUser() {
    return this.afsAuth.auth.signInWithPopup( new auth.GoogleAuthProvider());
    //return this.afsAuth.auth.getRedirectResult();
  }
  logoutUser() {
    return this.afsAuth.auth.signOut();
  }

  isAuth() {
    return this.afsAuth.authState.pipe(map(auth => auth));
  }
}
