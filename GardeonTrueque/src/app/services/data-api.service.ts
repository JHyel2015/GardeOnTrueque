import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

import { UserInterface } from '../models/user';
import { AdInterface } from '../models/ad';
import { PlantInterface } from '../models/plant';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  API_URI = 'http://localhost:3000';

  uploadPercent: Observable<number>;
  urlImage: Observable<any> ;

  constructor(private http: HttpClient, private storage: AngularFireStorage) { }

  uploadImage(file: File, filePath: string, uid: string): Observable<any> {
    const id = uid.substring(0, 5);
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    // this.uploadPercent = task.percentageChanges();
    // task.snapshotChanges().pipe(finalize(() => {
    //   this.urlImage = ref.getDownloadURL();
    //   return this.urlImage;
    // })).subscribe();
    this.urlImage = ref.getDownloadURL();
    return this.urlImage;
  }

  getUsers(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(`${this.API_URI}/users`);
  }

  getUser(uid: string|number): Observable<UserInterface> {
    return this.http.get<UserInterface>(`${this.API_URI}/users/${uid}`);
  }
  // deleteUser(uid: string) {
  //   return this.http.delete(`${this.API_URI}/users/${uid}`);
  // }

  saveUser(user: UserInterface): Observable<UserInterface> {
    const createduser = JSON.stringify(user);
    return this.http.post<UserInterface>(`${this.API_URI}/users/create`, user);
  }

  updateUser(uid: string|number, updatedUser: UserInterface): Observable<any> {
    return this.http.put<UserInterface>(`${this.API_URI}/users/update?id=${uid}`, updatedUser);
  }

  getAds(): Observable<AdInterface[]> {
    const ads = this.http.get<AdInterface[]>(`${this.API_URI}/ads`);
    return ads;
  }

  getAd(id: string|number): Observable<AdInterface> {
    return this.http.get<AdInterface>(`${this.API_URI}/ads/${id}`);
  }

  saveAd(ad: AdInterface): Observable<any> {
    return this.http.post<any>(`${this.API_URI}/ads/create`, ad);
  }
  updateAd(id: string|number, updatedAd: AdInterface): Observable<any> {
    return this.http.put<any>(`${this.API_URI}/ads/update?id=${id}`, updatedAd);
  }
  deleteAd(id: string | number): Observable<any> {
    return this.http.delete<any>(`${this.API_URI}/ads/delete?id=${id}`);
  }

  savePlant(plant: PlantInterface): Observable<any> {
    return this.http.post<any>(`${this.API_URI}/plants/create`, plant);
  }

  updatePlant(id: string|number, updatedPlant: PlantInterface): Observable<any> {
    return this.http.put<any>(`${this.API_URI}/plants/update?id=${id}`, updatedPlant);
  }

}
