import { Component, inject } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { Auth } from './services/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  auth = inject(Auth);
  private router = inject(Router);

  onLogout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}