import { Component } from '@angular/core';
import { AuthenticationService } from './shared/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AuthIdentityAngular';

  constructor(private authService: AuthenticationService){}

  ngOnInit(): void {
    // Right now if we log in and right away refresh our application, we are going to see the Login and Register links, even though we have the valid token (not expired) in the Local Storage. This code to prevent the case
    if(this.authService.isUserAuthenticated())
      this.authService.sendAuthStateChangeNotification(true);
  }

}
