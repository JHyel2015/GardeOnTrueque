import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private authService: AuthService) { }
  public isLogged = false;

  ngOnInit() {
    this.authService.isAuth().subscribe( auth => {
      if (auth) {
        console.log('User Logged');
        this.isLogged = true;
      } else {
        console.log('NO User Logged');
        this.isLogged = false;
      }
    });
  }

  toShowHeader(route: string) {
    return window.location.pathname === ('/GardeonTrueque' + route) || window.location.pathname === route;
  }

  onLogout() {
    this.afAuth.auth.signOut();
  }
}
