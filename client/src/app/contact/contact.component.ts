import { Component } from '@angular/core';
import {ToastService} from "../shared/components/toast/toast.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm: FormGroup;
  submitted=false

  constructor(private fb: FormBuilder, private toast: ToastService) { }

  ngOnInit() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true

    if(this.contactForm.invalid){
      return
    }
    console.log('Your form data : ', this.contactForm.value );
    this.toast.initiate({
      title: `Success`,
      content: `Message has been sent`,
      type: 1,
    });
  }

}
