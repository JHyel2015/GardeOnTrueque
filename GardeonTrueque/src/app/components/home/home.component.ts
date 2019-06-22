import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private router: Router, private authService: AuthService)  { }
  public isLogged = false;

  ngOnInit() {
    this.authService.isAuth().subscribe( user => {
      if (user) {
        console.log('User Logged');
        console.log(user.uid);
        this.isLogged = true;
      } else {
        console.log('NO User Logged');
        this.isLogged = false;
      }
    });
  }

  onLogout() {
    this.afAuth.auth.signOut();
  }
}
