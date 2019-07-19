import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../../../services/auth.service';
import { UserInterface } from '../../../models/user';
import { DataApiService } from '../../../services/data-api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: UserInterface = {
    username: '',
    uid: '',
    email: '',
    address: '',
    facebook: '',
    fullname: '',
    phone: '',
    phone2: '',
    cedula: '',
    password: '',
    createdAt: ''
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private afsAuth: AngularFireAuth,
    private dataapi: DataApiService) { }

  ngOnInit() {
    this.authService.isAuth().subscribe( userLogged => {
      if (userLogged) {
        this.user.uid = userLogged.uid;
        this.user.displayName = userLogged.displayName;
        this.user.email = userLogged.email;
        this.dataapi.getUser(this.user.uid)
          // .then( res => {
          //   console.log(res);
          // });
          .subscribe(
            result => {
              // console.log(result);
              this.user = result;
              const date = new Date(result.createdAt.toString());
              this.user.createdAt = date.getFullYear() +
              '-' + (date.getUTCMonth() + 1) +
              '-' + date.getUTCDate() +
              ' ' + date.toLocaleTimeString();
            }, error => {
              console.log(error.message);
            }
          );
      } else {
        console.log('NO User Logged');
      }
    });
    // console.log(this.user);
  }
  onUpdateUser() {
    this.authService.isAuth().subscribe( userLogged => {
      if (userLogged) {
        userLogged.updateProfile({
          displayName: this.user.displayName
        }).then( res => console.log('user name update'));
      } else {
        console.log('NO User Logged');
      }
    });
    this.dataapi.updateUser(this.user.uid, this.user)
      .subscribe(
        res => {
          console.log(res);
          window.location.reload();
        }
      );
  }

}
