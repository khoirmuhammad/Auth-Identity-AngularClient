import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuthResponse } from 'src/app/interfaces/IAuthResponse';
import { IUserLogin } from 'src/app/interfaces/IUserLogin';
import { IUserRegistration } from 'src/app/interfaces/IUserRegistration';
import { CustomEncoder } from '../helpers/custom-encoder';
import { EnvironmentUrlService } from './environment-url.service';
import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IForgotPassword } from 'src/app/interfaces/IForgotPassword';
import { IResetPassword } from 'src/app/interfaces/IResetPassword';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authChangeSub = new Subject<boolean>()
  public authChanged = this.authChangeSub.asObservable();

  constructor(private http: HttpClient,
              private envUrl: EnvironmentUrlService,
              private jwtHelper: JwtHelperService) { }

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

  public loginUser = (body: IUserLogin) => {
    return this.http.post<IAuthResponse>(this.createCompleteRoute('api/Account/Login'), body);
  }

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this.authChangeSub.next(isAuthenticated);
  }

  public logout = () => {
    localStorage.removeItem("token");
    this.sendAuthStateChangeNotification(false);
  }

  public isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("token");

    return (token != null) && (!this.jwtHelper.isTokenExpired(token));
  }

  public isUserAdmin = (): boolean => {
    const token = localStorage.getItem("token");

    if (token === null)
      return false;

    const decodedToken = this.jwtHelper.decodeToken(token);
    const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    return role === 'Administrator';
  }

  public forgotPassword = (body: IForgotPassword) => {
    return this.http.post(this.createCompleteRoute('api/Account/ForgotPassword'), body);
  }

  public resetPassword = (body: IResetPassword) => {
    return this.http.post(this.createCompleteRoute('api/Account/ResetPassword'), body);
  }

  private createCompleteRoute = (route: string) => {
    return `${this.envUrl.baseUrl}/${route}`;
  }

}
