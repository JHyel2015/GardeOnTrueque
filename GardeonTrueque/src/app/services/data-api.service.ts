import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UserInterface } from "../models/user";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  API_URI = 'http://localhost:3000/api';
  // API_URI = 'https://us-central1-gardeon-trueque.cloudfunctions.net/serverdb/api';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(`${this.API_URI}/users`);
  }
  getUser(uid: string){
    return this.http.get(`${this.API_URI}/users/${uid}`);
  }
  // deleteUser(uid: string) {
  //   return this.http.delete(`${this.API_URI}/users/${uid}`);
  // }
  saveUser(user: UserInterface) {
    return this.http.post(`${this.API_URI}/users`, user);
  }

  updateUser(uid: string|number, updatedUser: UserInterface): Observable<UserInterface> {
    return this.http.put(`${this.API_URI}/users/${uid}`, updatedUser);
  }
}