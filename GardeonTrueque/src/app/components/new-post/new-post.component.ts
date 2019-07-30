import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { AuthService } from '../../services/auth.service';
import { UserInterface } from '../../models/user';
import { PlantInterface } from '../../models/plant';
import { AdInterface } from '../../models/ad';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  constructor(private authService: AuthService, private dataapi: DataApiService) { }

  user: UserInterface;
  plant: PlantInterface = {
    name: '',
    type: '',
    image: '',
    description: '',
    user: { id: 0},
  };
  ad: AdInterface = {
    status: true,
    plant: { id: 0},
    user: {id: 0},
  };
  file: File;
  urlimage: string;

  ngOnInit() {
    this.getCurrentUser();
  }

  onChange(e) {
    this.file = e.target.files[0];
    this.urlimage = e.target.files[0].mozFullPath;
    console.log(this.urlimage);
    console.log(e);
    console.log(this.file);
  }

  uploadImg() {
    this.dataapi.uploadImage(this.file, 'uploads/' + this.file.name, '')
      .subscribe( url => this.urlimage = url);
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

  uploadData() {
    if (this.file !== null) {
      this.plant.user.id = this.user.id;
      this.dataapi.uploadImage(this.file, 'uploads/' + this.file.name, '')
        .subscribe( url => {
          this.plant.image = url;
          this.dataapi.savePlant(this.plant)
            .subscribe(plantSaved => {
              this.plant = plantSaved.plant;
              this.ad.plant.id = this.plant.id;
              this.ad.user.id = this.user.id;
              this.dataapi.saveAd(this.ad)
                .subscribe(adSaved => {
                  console.log(adSaved);
                }, err => console.log(err));
            }, err => console.log(err));
        });
    }
  }
}
