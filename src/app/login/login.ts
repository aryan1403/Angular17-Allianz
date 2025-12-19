import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ButtonComponent} from  'ui-kit';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  error = '';

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    if (this.email.invalid || this.password.invalid) return;

    const success = this.auth.login(
      this.email.value!,
      this.password.value!
    );

    if (success) {
      this.router.navigateByUrl('/home');
    } else {
      this.error = 'Invalid credentials';
    }
  }
}
