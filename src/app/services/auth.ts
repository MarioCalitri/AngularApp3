import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private apiUrl = 'http://localhost/AngularApp3API';

  currentUser = signal<string | null>(this.getStoredUsername());

  constructor(private http: HttpClient) {}

  private getStoredUsername(): string | null {
    const rawUser = localStorage.getItem('user');
    if (!rawUser) return null;

    try {
      const parsed = JSON.parse(rawUser);
      return parsed?.username || parsed?.userName || (typeof parsed === 'string' ? parsed : null);
    } catch {
      return rawUser;
    }
  }

  login(credentials: { username: string; password: string }) {
    return this.http.post(`${this.apiUrl}/login.php`, credentials);
  }

  register(userData: any) {
    return this.http.post(`${this.apiUrl}/register.php`, userData);
  }

  getAuth(): boolean {
    return !!this.currentUser() || !!localStorage.getItem('token');
  }

  setAuth(isAuthenticated: boolean, username?: string) {
    if (isAuthenticated) {
      const resolvedName = username || this.getStoredUsername();
      if (resolvedName) {
        localStorage.setItem('username', resolvedName);
        this.currentUser.set(resolvedName);
      }
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('username');
      this.currentUser.set(null);
    }
  }

  isLoggedIn(): boolean {
    return this.getAuth();
  }
}