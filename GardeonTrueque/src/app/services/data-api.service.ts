import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserInterface } from '../models/user';
import { Observable } from 'rxjs';


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

  constructor(private http: HttpClient) { }

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
}
