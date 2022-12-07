import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IClaimList } from 'src/app/interfaces/IClaimList';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class PrivacyService {

  constructor(private http: HttpClient,
    private envUrl: EnvironmentUrlService) { }

    public getPrivacy() {
      return this.http.get<IClaimList>(this.createCompleteRoute('api/Account/Privacy'));
    }

    private createCompleteRoute = (route: string) => {
      return `${this.envUrl.baseUrl}/${route}`;
    }

}
