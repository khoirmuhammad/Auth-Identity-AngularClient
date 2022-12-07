import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserList } from 'src/app/interfaces/IUserList';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

  public getUser() {
    return this.http.get<IUserList>(this.createCompleteRoute('api/Account/GetSecureResource'));
  }

  private createCompleteRoute = (route: string) => {
    return `${this.envUrl.baseUrl}/${route}`;
  }

}
