import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  errors: string[] | null = null;
  submitted = false;

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) {
  }

  complexPassword = "(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$";

  registerForm = new FormGroup({
    displayName: new FormControl ('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(this.complexPassword)]),
  })

  onSubmit(){
    this.submitted = true;

    this.accountService.register(this.registerForm.value).subscribe({
      next: () => this.router.navigateByUrl('/articles-manager'),
      error: error => this.errors = error.errors
    })
  }
}
