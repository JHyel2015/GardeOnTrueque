import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

import { UserInterface } from '../models/user';
import { AdInterface } from '../models/ad';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  // API_URI = 'http://www.camespa.net/api'; fue de prueba
  API_URI = 'http://localhost:3000';
  // API_URI = 'https://us-central1-gardeon-trueque.cloudfunctions.net/serverdb/api';

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  constructor(private http: HttpClient, private storage: AngularFireStorage) { }

  uploadImage(file: File, filePath: string, uid: string): Observable<string> {
    const id = uid.substring(0, 5);
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL()));
    return this.urlImage;
  }

  getUsers(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(`${this.API_URI}/users`);
  }

  getUser(uid: string|number): Observable<UserInterface> {
    // console.log(`${this.API_URI}/getUser.php?uid=${uid}`);
    // return this.http.get<UserInterface>(`${this.API_URI}/getUser.php?uid=${uid}`);
    return this.http.get<UserInterface>(`${this.API_URI}/users/${uid}`);
  }
  // deleteUser(uid: string) {
  //   return this.http.delete(`${this.API_URI}/users/${uid}`);
  // }

  saveUser(user: UserInterface): Observable<UserInterface> {
    const createduser = JSON.stringify(user);
    // return this.http.jsonp(`${this.API_URI}/users/create`, createduser);
    return this.http.post<UserInterface>(`${this.API_URI}/users/create`, user);
  }

  updateUser(uid: string|number, updatedUser: UserInterface): Observable<any> {
    return this.http.put<UserInterface>(`${this.API_URI}/users/update?id=${uid}`, updatedUser);
    // return this.http.put<UserInterface>(`${this.API_URI}/updateUser.php`, updatedUser);
  }

  getAds(): Observable<AdInterface[]> {
    const ads = this.http.get<AdInterface[]>(`${this.API_URI}/ads`);
    return ads;
  }
}
