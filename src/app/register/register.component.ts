import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  userName = '';
  email = '';
  password = '';

  submitting = false;
  error = '';

  constructor(
  private auth: Auth,
  private router: Router,
  private cdr: ChangeDetectorRef
) {}

onRegister() {
  this.error = '';
  this.submitting = true;

  this.auth.register({
    userName: this.userName.trim(),
    emailAddress: this.email.trim(),
    password: this.password
  } as any).subscribe({
    next: (res: any) => {
      this.submitting = false;
      if (res && res.success === false) {
        this.error = res.message || 'Registration failed.';
        this.cdr.detectChanges();
        return;
      }
      this.router.navigate(['/login']);
    },
    error: (err: any) => {
      this.error = err?.error?.message || 'Registration failed.';
      this.submitting = false;
      this.cdr.detectChanges();
    }
  });
}
}