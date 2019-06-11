import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UserInterface } from "../models/user";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  //API_URI = 'http://localhost:3000/api';
  API_URI = 'https://us-central1-gardeon-trueque.cloudfunctions.net/serverdb/api';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(`${this.API_URI}/users`);
  }
  getUser(id: string){
    return this.http.get(`${this.API_URI}/users/${id}`);
  }
  deleteUser(id: string) {
    return this.http.delete(`${this.API_URI}/users/${id}`);
  }

  saveUser(user: UserInterface) {
    return this.http.post(`${this.API_URI}/users`, user);
  }

  updateUser(id: string|number, updatedUser: UserInterface): Observable<UserInterface> {
    return this.http.put(`${this.API_URI}/users/${id}`, updatedUser);
  }
}
