import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IAuthResponse } from 'src/app/interfaces/IAuthResponse';
import { IUserLogin } from 'src/app/interfaces/IUserLogin';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private returnUrl: string = '';

  loginForm: FormGroup;
  errorMessage: string = '';
  showError: boolean = false;

  constructor(private authService: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute) {

                this.loginForm = new FormGroup({
                  email: new FormControl("", [Validators.required, Validators.email]),
                  password: new FormControl("", [Validators.required])
                })

              }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  public Control = (controlName: string) => {
    return this.loginForm.controls[controlName] as FormControl;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName)
  }

  loginUser = (loginFormValue: any) => {
    debugger;
    this.showError = false;

    const login = {... loginFormValue };

    const userForAuth: IUserLogin = {
      email: login.email,
      password: login.password,
      rememberMe: false
    }

    this.authService.loginUser(userForAuth)
    .subscribe({
      next: (res:IAuthResponse) => {
        debugger;
       localStorage.setItem("token", res.data);
       this.authService.sendAuthStateChangeNotification(res.data != null ? true : false);
       this.router.navigate([this.returnUrl]);
    },
    error: (err: HttpErrorResponse) => {
      debugger;
      this.errorMessage = err.message;
      this.showError = true;
    }})
  }

}
