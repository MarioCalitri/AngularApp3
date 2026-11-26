import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Auth } from './services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  constructor(
    public auth: Auth,
    private router: Router
  ) {}

  onLogout() {
    this.auth.setAuth(false);
    this.router.navigate(['/login']);
  }
}