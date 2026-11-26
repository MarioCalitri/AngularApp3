import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userName = '';
  password = '';
  submitting = false;
  error = '';

  constructor(private auth: Auth, private router: Router) {}

  onLogin() {
    this.error = '';
    this.submitting = true;

    this.auth.login({ username: this.userName, password: this.password }).subscribe({
      next: (res: any) => {
        if (res?.token) {
          localStorage.setItem('token', res.token);
        }
        if (res?.user) {
          localStorage.setItem('user', JSON.stringify(res.user));
        }
        this.auth.setAuth(true);
        this.submitting = false;
        this.router.navigate(['/list']);
      },
      error: (err: any) => {
        this.error = err?.error?.message || 'Invalid username or password.';
        this.submitting = false;
      }
    });
  }
}