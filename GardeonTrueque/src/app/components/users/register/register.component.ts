import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFireStorage } from '@angular/fire/storage';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { AuthService } from '../../../services/auth.service';
import { AppComponent } from '../../../app.component';
import { UserInterface } from '../../../models/user';
import { DataApiService } from '../../../services/data-api.service';
import SimpleCrypto from 'simple-crypto-js';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/observable';

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
  };
  credential?;
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private app: AppComponent,
    private afsAuth: AngularFireAuth,
    private dataapi: DataApiService,
    private storage: AngularFireStorage
    ) { }

  public confirmpassword = '';
  public msgError = '';
  public isError = false;

  ngOnInit() {
    console.log('Hola');
    this.authService.isAuth().subscribe( userLogged => {
      if (userLogged) {
        this.user.user_name = userLogged.displayName;
        this.user.useremail = userLogged.email;
      } else {
        console.log('NO User Logged');
      }
    });
  }
  onAddUser() {
    if (this.user.userpassword.match(this.confirmpassword)) {
      if (this.credential !== undefined) {
        auth.GoogleAuthProvider.credential(this.credential);
      }
      this.authService.isAuth().subscribe( user => {
        if (user) {
          this.user.uid = user.uid;
          this.user.user_name = user.displayName;
          this.user.useremail = user.email;
          const credential = auth.EmailAuthProvider.credential(this.user.useremail, this.user.userpassword);
          this.afsAuth.auth.currentUser.linkWithCredential(credential).then( userCred => {
            // const user = userCred.user;
            this.onSaveNewUser();
            this.onLoginRedirect('/');
          }).catch( err => {
            console.log('El usuario ya existe: ' + err.message );
            this.onIsError( 'Usuario ya existe');
            this.onLogout();
          });

        } else {
          this.authService.registerUser( this.user.user_name, this.user.useremail, this.user.userpassword)
            .then(( userReg ) => {
              if (userReg) {
                  this.user.uid = userReg.user.uid;
                  userReg.user.updateProfile({
                  displayName: this.user.user_name
                  }).then((res) => {
                    console.log('Username Updated');
                  });
              }
              console.log(this.user.uid);
              this.onSaveNewUser();
              this.onLoginRedirect('/');
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
        this.credential = res.credential;
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
    this.authService.logoutUser();
    console.log(this.user);
  }
  onUploadImage(img) {
    const id = Math.random().toString(36).substring(2);
    const file = img.target.files[0];
    const filePath = `upload/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe( finalize(() => this.urlImage = ref.getDownloadURL()) ).subscribe();
  }
  onLoginGoogle(): void {
    // this.afAuth.auth.signInWithPopup( new auth.GoogleAuthProvider());
    this.authService.loginGoogleUser().then( (res) => {
      this.onLoginRedirect('/');
    }).catch( err => {
      this.onIsError(err.message);
      console.log('err', err.message);
    });
  }
  onLoginRedirect(link: string) {
    this.router.navigate([link]);
  }
  onSaveNewUser() {
    const simplecrypto = new SimpleCrypto(this.user.uid);
    this.user.userpassword = simplecrypto.encrypt(this.user.userpassword);
    this.dataapi.getUser(this.user.uid)
      .subscribe(
        res => {
          console.log('suscribe', res);
          this.dataapi.updateUser(this.user.uid, this.user)
            .subscribe(
              result => {
                console.log(result);
              },
              error => console.log(error.message)
            );
        },
        err => {
          console.log(err.error.text);
          this.dataapi.saveUser(this.user)
            .subscribe(
              res => {
                console.log(res);
              },
              error => console.log(error.message)
            );
        }
      );
  }
  onCancel() {
    this.authService.logoutUser();
    this.router.navigate(['/']);
  }
  onIsError(error: string): void {
    this.isError = true;
    this.msgError = error;
  }
  onLogout(): void {
    this.authService.logoutUser();
  }

}
