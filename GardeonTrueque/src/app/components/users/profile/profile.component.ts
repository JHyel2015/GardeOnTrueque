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
    user_name: '',
    uid: '',
    useremail: '',
    useraddress: '',
    userfacebook: '',
    userfullname: '',
    userphone: '',
    userphone2: '',
    usercedula: '',
    userpassword: '',
    created_at: ''
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
        this.user.user_name = userLogged.displayName;
        this.user.useremail = userLogged.email;
        this.dataapi.getUser(this.user.uid)
          // .then( res => {
          //   console.log(res);
          // });
          .subscribe(
            result => {
              // console.log(result);
              this.user = result;
              // console.log(this.user);
              const date = new Date(result.created_at.toString());
              this.user.created_at = date.getFullYear() +
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
          displayName: this.user.user_name
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
