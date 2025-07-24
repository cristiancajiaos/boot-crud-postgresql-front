import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../classes/user';
import {lastValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = "http://localhost:8091/users";

  constructor(
    private http: HttpClient
  ) {}

  public async getUsers(): Promise<User[]> {
    return await lastValueFrom(this.http.get<User[]>(`${this.baseUrl}`));
  }

  public async createUser(user: User) {
    return await lastValueFrom(this.http.post<User>(
      `${this.baseUrl}`,
      user,
      {
      headers: {
        'Content-Type':'application/json'
      }
    }));
  }

}
