import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss']
})
export class ResetPassComponent {
  errors: string[] | null = null;
  submitted = false;

  complexPassword = "(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$";

  resetForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.pattern(this.complexPassword)]),
    confirmPassword: new FormControl('', [Validators.required]),
  })

  constructor(private accountService: AccountService, private router: Router) {
  }

  onSubmit() {
    this.submitted = true;

    if (!this.resetForm.invalid && this.resetForm.value.password != null && this.resetForm.value.confirmPassword != null){
      console.log(this.resetForm.value)
      this.router.navigateByUrl('/account/login')
    }


  }
}
