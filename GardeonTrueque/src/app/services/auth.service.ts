import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afsAuth: AngularFireAuth) { }
  public msgError = '';

  registerUser(username: string, email: string, pass: string) {
    const register = this.afsAuth.auth.createUserWithEmailAndPassword( email, pass);
    return register;
  }
  loginEmailUser(email: string, pass: string) {
    return this.afsAuth.auth.signInWithEmailAndPassword(email, pass);
  }
  async loginGoogleUser() {
    return await this.afsAuth.auth.signInWithPopup( new auth.GoogleAuthProvider());
    // return this.afsAuth.auth.getRedirectResult();
  }
  logoutUser() {
    return this.afsAuth.auth.signOut();
  }

  isAuth() {
    return this.afsAuth.authState.pipe( map( auth => auth) );
  }
}
