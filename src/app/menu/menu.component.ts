import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isCollapsed: boolean = false;
  public isUserAuthenticated: boolean = false;

  constructor(private authService: AuthenticationService,
    private router: Router) {
    debugger;
    this.authService.authChanged
      .subscribe(res => {
        debugger;
        this.isUserAuthenticated = res;
      })
  }

  ngOnInit() {
    debugger;
    this.authService.authChanged
      .subscribe(res => {
        debugger;
        this.isUserAuthenticated = res;
      })
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/"]);
  }

}
