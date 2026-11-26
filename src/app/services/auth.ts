import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private apiUrl = 'http://localhost/AngularApp3API';
  private authState = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  isLoggedIn$ = this.authState.asObservable();
  isLoggedIn = toSignal(this.isLoggedIn$, { initialValue: this.authState.value });

  private http = inject(HttpClient);
  getAuth(): boolean {
    return this.authState.value;
  }

  setAuth(value: boolean) {
    this.authState.next(value);
  }

  login(data: { username?: string; userName?: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login.php`, data);
  }

  register(data: { username?: string; userName?: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register.php`, data);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authState.next(false);
  }
}