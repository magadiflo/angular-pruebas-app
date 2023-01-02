import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { StorageService } from './storage.service';
import { User } from './user.model';

@Injectable()
export class LoginService {

  readonly URL_AUTH: string = '/api/auth';
  readonly USER_TOKEN: string = 'user';
  private _user?: User;

  get isLoggedIn(): boolean {
    return !!this._user;
  }

  constructor(
    private _http: HttpClient,
    private _storage: StorageService) { }


  setUser(userData: User): void {
    this._user = userData;
    this._storage.setItem(this.USER_TOKEN, this._user);
  }

  getUser() {
    return this._storage.getItem(this.USER_TOKEN) || this._user;
  }

  authenticate(email: string, password: string): Observable<boolean> {
    const user: User = { email, password };
    return this._http.post<User>(this.URL_AUTH, user)
      .pipe(
        map(userData => {
          this.setUser(userData);
          return this.isLoggedIn;
        })
      );
  }


}
