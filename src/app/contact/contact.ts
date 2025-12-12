import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
validatereq = new FormControl('', [Validators.required, Validators.minLength(3)])
  submittedData: any = null;
  contactForm = new FormGroup({
    name: this.validatereq,
    // lastname: this.validatereq,
    email: new FormControl('', [Validators.required, Validators.email]),
    msg: new FormControl('', Validators.required)
  });
  status: string = 'pending';
  submit() {
    if(this.contactForm.valid) {
      this.submittedData = this.contactForm.value;
      const {name, email, msg} = this.submittedData;
      console.log(name, email, msg)
      this.contactForm.reset();
    }
  }
}
