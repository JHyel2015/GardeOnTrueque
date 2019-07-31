import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  id: number;

  constructor(
    private rutaActiva: ActivatedRoute, private authService: AuthService, private dataapi: DataApiService, private router: Router
    ) { }

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
  boton: string;
  title: string;

  ngOnInit() {
    this.id = this.rutaActiva.snapshot.params.id;
    if (this.id !== undefined) {
      this.getAd();
      this.boton = 'Actualizar';
      this.title = 'Actualizar';
    } else {
      this.boton = 'Guardar';
      this.title = 'Registrar';
    }
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

  loadData() {
    if (this.id !== undefined) {
      this.updateData();
    } else {
      this.uploadData();
    }
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
                  this.onRedirect('/auctions');
                }, err => console.log(err));
            }, err => console.log(err));
        });
    }
  }

  updateData() {
    if (this.file !== undefined) {
      this.dataapi.uploadImage(this.file, 'uploads/' + this.file.name, '')
        .subscribe( url => {
          this.plant.image = url;
          this.dataapi.updatePlant(this.plant.id, this.plant)
            .subscribe(plantSaved => {
              console.log(plantSaved);
              this.onRedirect('/auctions');
            }, err => console.log(err));
        });
    } else {
      this.dataapi.updatePlant(this.plant.id, this.plant)
        .subscribe(plantSaved => {
          console.log(plantSaved);
          this.onRedirect('/auctions');
        }, err => console.log(err));
    }
  }

  getAd() {
    this.dataapi.getAd(this.id).subscribe(
      res => {
        this.ad = res;
        this.plant = this.ad.plant;
      }
    );
  }

  onRedirect(route: string) {
    this.router.navigate([route]);
    window.location.reload();
  }
}
