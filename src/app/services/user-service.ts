import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../interfaces/user';
import {lastValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = "http://localhost:8090/users";

  constructor(
    private http: HttpClient
  ) {}

  public async getUsers(): Promise<User[]> {
    return await lastValueFrom(this.http.get<User[]>(`${this.baseUrl}`));
  }

}
