import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUserRegistration } from 'src/app/interfaces/IUserRegistration';
import { CustomPasswordValidatorService } from 'src/app/shared/custom-validators/custom-password-validator.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  registerForm: FormGroup;

  public errorMessage: string = '';
  public successMessage: string = '';
  public showError: boolean = false;


  constructor(private authService: AuthenticationService,
              private customPasswordValidator : CustomPasswordValidatorService) {
    this.registerForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
        customPasswordValidator.patternValidator(/[$&+,:;=?@#|'<>.^*()%!-]/, { hasNonAlphaNumeric: true }),
        customPasswordValidator.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        customPasswordValidator.patternValidator(/\d/, { hasNumber: true }),
      ]),
      confirm: new FormControl('', [Validators.required])
    });

    this.registerForm.controls['confirm'].setValidators([Validators.required,
      this.customPasswordValidator.validateConfirmPassword(this.registerForm.controls['password'])]);

   }

  ngOnInit(): void {

  }

  public Control = (controlName: string) => {
    return this.registerForm.controls[controlName] as FormControl;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName)
  }

  public registerUser = (registerFormValue: any) => {
    debugger;
    const formValues = { ...registerFormValue };

    const user: IUserRegistration = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      password: formValues.password,
      confirmPassword: formValues.confirm,
      clientURI: 'http://localhost:4200/authentication/emailconfirmation'
    };

    this.authService.registerUser(user)
    .subscribe({
      next: (_) => { debugger;
        this.successMessage = "Successful Registration. Please check your email to verify your new account";
        this.registerForm.reset();
      },
      error: (err: HttpErrorResponse) => {
        debugger;

        this.errorMessage = err.message;
        this.showError = true;

        // if (err.error.errors !== undefined) {
        //   console.log(err.error.errors.ConfirmPassword);
        // } else if (err.error.errorMessages != undefined) {
        //   console.log(err.error.errorMessages);
        // }
      }
    })
  }

}
