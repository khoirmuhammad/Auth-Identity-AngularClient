import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterUserComponent } from './register-user/register-user.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';

const routes = [
  { path: 'register', component: RegisterUserComponent },
  { path: 'emailconfirmation', component: EmailConfirmationComponent }
]

@NgModule({
  declarations: [
    RegisterUserComponent,
    EmailConfirmationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthenticationModule { }
