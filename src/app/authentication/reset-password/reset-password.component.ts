import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IResetPassword } from 'src/app/interfaces/IResetPassword';
import { CustomPasswordValidatorService } from 'src/app/shared/custom-validators/custom-password-validator.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  showSuccess: boolean = false;
  showError: boolean = true;
  errorMessage: string = '';

  private token: string = '';
  private email: string = '';

  constructor(private authService: AuthenticationService,
    private customPasswordValidator: CustomPasswordValidatorService,
    private route: ActivatedRoute) {
    this.resetPasswordForm = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
        customPasswordValidator.patternValidator(/[$&+,:;=?@#|'<>.^*()%!-]/, { hasNonAlphaNumeric: true }),
        customPasswordValidator.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        customPasswordValidator.patternValidator(/\d/, { hasNumber: true }),
      ]),
      confirm: new FormControl('')
    });

    this.resetPasswordForm.controls['confirm'].setValidators([Validators.required,
    this.customPasswordValidator.validateConfirmPassword(this.resetPasswordForm.controls['password'])]);

    this.token = this.route.snapshot.queryParams['token'];
    this.email = this.route.snapshot.queryParams['email'];
  }

  ngOnInit(): void {
  }

  public Control = (controlName: string) => {
    return this.resetPasswordForm.controls[controlName] as FormControl;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.resetPasswordForm.controls[controlName].hasError(errorName)
  }

  public resetPassword = (resetPasswordFormValue: any) => {
    this.showError = this.showSuccess = false;
    const resetPass = { ... resetPasswordFormValue };

    const resetPassDto: IResetPassword = {
      password: resetPass.password,
      confirmPassword: resetPass.confirm,
      token: this.token,
      email: this.email
    }

    this.authService.resetPassword(resetPassDto)
    .subscribe({
      next:(_) => this.showSuccess = true,
    error: (err: HttpErrorResponse) => {
      this.showError = true;
      this.errorMessage = err.message;
    }})
  }

}
