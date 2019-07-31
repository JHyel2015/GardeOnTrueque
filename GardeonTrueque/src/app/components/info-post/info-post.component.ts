import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataApiService } from '../../services/data-api.service';
import { AuthService } from '../../services/auth.service';
import { UserInterface } from '../../models/user';
import { AdInterface } from '../../models/ad';

@Component({
  selector: 'app-info-post',
  templateUrl: './info-post.component.html',
  styleUrls: ['./info-post.component.css']
})
export class InfoPostComponent implements OnInit {
  id: number;

  constructor(private rutaActiva: ActivatedRoute, private authService: AuthService, private dataapi: DataApiService) { }

  user: UserInterface;
  ad: AdInterface = {
    plant: { id: 0 },
    user: { id: 0 },
  };

  ngOnInit() {
    this.id = this.rutaActiva.snapshot.params.id;
    this.getCurrentUser();
    this.getAd(this.id);
  }

  async getAd(id: number) {
    await this.dataapi.getAd(id)
      .subscribe( result => {
        this.ad = result;
      });
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe( auth => {
      if (auth) {
        this.user = auth;
        this.dataapi.getUser(this.user.uid)
          .subscribe(
            result => {
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
      }
    });
  }

}
