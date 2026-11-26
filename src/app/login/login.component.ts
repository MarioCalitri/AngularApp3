import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {
  userName = '';
  password = '';
  submitting = false;
  error = '';

  private readonly maxAttempts = 3;
  private readonly lockoutDurationSeconds = 30;
  private countdownTimer: ReturnType<typeof setInterval> | null = null;

  failedAttempts = 0;
  attemptsRemaining = 3;
  isLockedOut = false;
  lockoutSeconds = 0;

  constructor(
    private auth: Auth,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnDestroy() {
    this.clearLockoutTimer();
  }

  private clearLockoutTimer() {
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
      this.countdownTimer = null;
    }
  }

  private startLockoutTimer() {
    this.clearLockoutTimer();
    this.isLockedOut = true;
    this.lockoutSeconds = this.lockoutDurationSeconds;
    this.error = `Account locked after ${this.maxAttempts} failed attempts.`;
    this.cdr.detectChanges();

    this.countdownTimer = setInterval(() => {
      this.lockoutSeconds--;

      if (this.lockoutSeconds <= 0) {
        this.clearLockoutTimer();
        this.isLockedOut = false;
        this.failedAttempts = 0;
        this.attemptsRemaining = this.maxAttempts;
        this.lockoutSeconds = 0;
        this.error = '';
      }

      this.cdr.detectChanges();
    }, 1000);
  }

  private handleFailedLogin(message?: string) {
    this.failedAttempts++;
    this.attemptsRemaining = Math.max(0, this.maxAttempts - this.failedAttempts);

    if (this.attemptsRemaining === 0) {
      this.startLockoutTimer();
    } else {
      this.error = message || 'Invalid username or password.';
      this.cdr.detectChanges();
    }
  }

  onLogin() {
    if (this.isLockedOut || this.submitting) {
      return;
    }

    this.error = '';
    this.submitting = true;
    this.cdr.detectChanges();

    this.auth.login({ username: this.userName, password: this.password })
      .pipe(
        finalize(() => {
          this.submitting = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (res: any) => {
          if (res?.success === false) {
            this.handleFailedLogin(res?.message);
            return;
          }

          this.clearLockoutTimer();
          this.failedAttempts = 0;
          this.attemptsRemaining = this.maxAttempts;
          this.isLockedOut = false;
          this.lockoutSeconds = 0;

          if (res?.token) {
            localStorage.setItem('token', res.token);
          }
          if (res?.user) {
            localStorage.setItem('user', JSON.stringify(res.user));
          }

          this.auth.setAuth(true, res?.user?.username || this.userName);
          this.router.navigate(['/list']);
        },
        error: (err: any) => {
          this.handleFailedLogin(err?.error?.message || err?.message);
        }
      });
  }
}