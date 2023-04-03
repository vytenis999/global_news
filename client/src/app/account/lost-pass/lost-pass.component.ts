import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-lost-pass',
  templateUrl: './lost-pass.component.html',
  styleUrls: ['./lost-pass.component.scss']
})
export class LostPassComponent {
  submitted = false;


  lostForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  constructor(private accountService: AccountService, private router: Router) {
  }

  onSubmit() {
    this.submitted = true;

    if (!this.lostForm.invalid && this.lostForm.value.email != null){
      console.log(this.lostForm.value)
      this.router.navigateByUrl('/account/reset')
    }
  }
}
