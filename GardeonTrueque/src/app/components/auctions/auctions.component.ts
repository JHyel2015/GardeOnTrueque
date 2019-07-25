import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataApiService } from '../../services/data-api.service';
import { AuthService } from '../../services/auth.service';
import { AdInterface } from '../../models/ad';

@Component({
  selector: 'app-auctions',
  templateUrl: './auctions.component.html',
  styleUrls: ['./auctions.component.css']
})
export class AuctionsComponent implements OnInit {

  constructor(private authService: AuthService, private dataapi: DataApiService, private router: Router) { }

  private ads: AdInterface[];
  public date;

  ngOnInit() {
    this.getCurrentUser();
    this.getAds();
    this.date = new Date();
    console.log(this.date);
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe( auth => {
      if (auth) {
        console.log('User Logged NB');
      } else {
        console.log('NO User Logged');
      }
    });
  }

  getAds() {
    this.dataapi.getAds().subscribe(
      gottenAds => {
        this.ads = gottenAds;
        console.log(this.ads);
      }
    );
  }
}
