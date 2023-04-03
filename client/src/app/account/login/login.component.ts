import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  submitted = false;


  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  })

  constructor(private accountService: AccountService, private router: Router) {
  }

  onSubmit() {
    this.submitted = true;

    if (!this.loginForm.invalid && this.loginForm.value.email != null && this.loginForm.value.password != null)
    this.accountService.login(this.loginForm.value).subscribe({
      next: user => this.router.navigateByUrl('/articles-manager')
    })

  }
}
