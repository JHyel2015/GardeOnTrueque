import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private router: Router, private authService: AuthService) { }
  public isLogged = false;
  public username = '';
  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe( auth => {
      if (auth) {
        this.username = auth.displayName;
        this.isLogged = true;
        console.log('User Logged NB ', this.username);
      } else {
        console.log('NO User Logged');
        this.isLogged = false;
      }
    });
  }

  onLogout() {
    this.afAuth.auth.signOut();
    window.location.reload();
  }
  toShowNavbar() {
    return window.location.pathname === ('/GardeonTrueque' + '/user/register') || window.location.pathname === '/user/register' ||
     window.location.pathname === ('/GardeonTrueque' + '/user/login') || window.location.pathname === '/user/login';
  }
}
