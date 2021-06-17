import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user-interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = 'http://localhost:8005/api/systemusers/';

  constructor(private http: HttpClient) { }

  getUsersList(): Observable<any> {
    return this.http.get(this.url);
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get(this.url + userId);
  }

  createUser(dto: any): Observable<any> {
    return this.http.post(this.url, dto);
  }

  updateUser(userId: string, dto: any): Observable<any> {
    return this.http.put(this.url + userId, dto);
  }
}
