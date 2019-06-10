import { Component, OnInit, HostBinding } from '@angular/core';
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";
import { AppComponent } from "../../../app.component";
import { UserInterface } from "../../../models/user";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from 'firebase/app';
import { DataApiService } from "../../../services/data-api.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // @HostBinding('class') classes = 'row';

  user: UserInterface = {
    user_name: '',
    uid: '',
    useremail: '',
    userpassword: ''
  }

  constructor(private router: Router, private authService: AuthService, private app: AppComponent, private afsAuth: AngularFireAuth, private dataapi: DataApiService) { }
  
  public confirmpassword: string = '';
  public msgError: string = '';
  public isError: boolean = false;

  ngOnInit() {
    console.log('Hola');
    this.authService.isAuth().subscribe( userLogged => {
      if (userLogged) {
        this.user.user_name = userLogged.displayName;
        this.user.useremail = userLogged.email;
      } else {
        console.log('NO User Logged');
      }
    })
  }
  onAddUser() {
    if (this.user.userpassword.match(this.confirmpassword)) {
      this.authService.isAuth().subscribe( user => {
        if (user) {
          this.user.uid = user.uid;
          this.user.user_name = user.displayName;
          this.user.useremail = user.email;
          var credential = auth.EmailAuthProvider.credential(this.user.useremail, this.user.userpassword);
          this.afsAuth.auth.currentUser.linkWithCredential(credential).then( userCred => {
            var user = userCred.user;
            this.onSaveNewUser();
            this.onLoginRedirect();
          }).catch( err => {
            console.log('El usuario ya existe');
            this.onIsError( 'Usuario ya existe:\n' + err.message );
          })
          
        } else {
          this.authService.registerUser( this.user.user_name, this.user.useremail, this.user.userpassword)
            .then(( user ) => {
              if (user) {
                  this.user.uid = user.user.uid;
                  user.user.updateProfile({
                  displayName: this.user.user_name
                  }).then((res) => {
                    console.log('Username Updated')
                  });
              }
              console.log(this.user.uid);
              this.onSaveNewUser();
              this.onLoginRedirect();
            }).catch( err => {
              this.onIsError(err.message);
              console.log( 'err', err.message);
            });
          // console.log('Funciona!!',this.user.user_name,this.user.useremail,this.user.userpassword,this.confirmpassword);
        }
      });
    } else {
      this.onIsError('Las contraseñas no coinciden');
    }
  }
  onAddUserGoogle() {
    this.authService.loginGoogleUser().then((res) => {
      if (res.credential) {
        console.log(res.user);
      }
    });
    this.authService.isAuth().subscribe( user => {
      if (user) {
        this.user.uid = user.uid;
        this.user.user_name = user.displayName;
        this.user.useremail = user.email;
      }
    });
    console.log(this.user);
  }
  onLoginGoogle(): void {
    //this.afAuth.auth.signInWithPopup( new auth.GoogleAuthProvider());
    this.authService.loginGoogleUser().then( (res) => {
      this.onLoginRedirect();
    }).catch( err => {
      this.onIsError(err.message);
      console.log('err', err.message);
    });
  }
  onLoginRedirect() {
    this.router.navigate(['/']);
  }
  onSaveNewUser() {
    this.dataapi.saveUser(this.user)
      .subscribe(
        res => {
          console.log(res);
        },
        err => console.log(err.message)
      )
  }
  onCancel() {
    this.authService.logoutUser();
    this.router.navigate(['/']);
  }
  onIsError(error: string): void {
    this.isError = true;
    this.msgError = error;
  }

}
