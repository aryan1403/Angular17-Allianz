import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

interface User {
  id: number,
  name: string
}
@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  validatereq = new FormControl('', [Validators.required, Validators.minLength(3)])
  submittedData: any = null;
  contactForm = new FormGroup({
    name: this.validatereq,
    // lastname: this.validatereq,
    email: new FormControl('', [Validators.required, Validators.email]),
    msg: new FormControl('', Validators.required)
  });
  status: string = 'pending';

  users = signal<User[]>([
    { id: 1, name: "Aaryan"},
    { id: 2, name: "Arush"},
    { id: 3, name: "Kirti"},
    { id: 4, name: "Laksh"}
  ]);
  submit() {
    if(this.contactForm.valid) {
      this.submittedData = this.contactForm.value;
      const {name, email, msg} = this.submittedData;
      console.log(name, email, msg)
      this.contactForm.reset();
    }
  }

  addUser = (name: string) => this.users.update(list => [...list, {id: list.length + 1, name: name}]);

  clearUser = () => this.users.set([]);

  removeUser = (id: Number) => this.users.update(users => users.filter(u => u.id !== id));

  changeStatus = (newStatus: string) => this.status = newStatus;

  loadData = () => console.log('heavy content loaded')
}
