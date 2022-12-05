import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserRegistration } from 'src/app/interfaces/IUserRegistration';
import { CustomEncoder } from '../helpers/custom-encoder';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

  public registerUser = (body: IUserRegistration) => {
    return this.http.post<IUserRegistration>(this.createCompleteRoute('api/Account/Register'), body);
  }

  public confirmEmail = (token: string, email: string) => {
    debugger;
    let params = new HttpParams({ encoder: new CustomEncoder() })
    params = params.append('token', token);
    params = params.append('email', email);

    return this.http.get(this.createCompleteRoute('api/Account/ConfirmEmail'), { params: params });
  }

  private createCompleteRoute = (route: string) => {
    return `${this.envUrl.baseUrl}/${route}`;
  }

}
