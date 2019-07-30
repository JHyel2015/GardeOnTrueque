import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { AuthService } from '../../services/auth.service';
import { AdInterface } from '../../models/ad';
import {UserInterface} from '../../models/user';


@Component({
  selector: 'app-myposts',
  templateUrl: './myposts.component.html',
  styleUrls: ['./myposts.component.css']
})
export class MypostsComponent implements OnInit {

  constructor(private dataapi: DataApiService, private authService: AuthService) { }
  ads: AdInterface[] = [];

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

  userId = 0;

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe( async userLogged => {
      if (userLogged) {
        this.user.uid = userLogged.uid;
        this.user.displayName = userLogged.displayName;
        this.user.email = userLogged.email;
        await this.dataapi.getUser(this.user.uid)
          .subscribe(
            result => {
              this.user = result;
              this.getAds();
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
  }

  getAds() {
    this.dataapi.getAds().subscribe(
      gottenAds => {
        this.ads = gottenAds.filter(res => {
          return res.user.id === this.user.id;
        });
      }
    );
  }

}
