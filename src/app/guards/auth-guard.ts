import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

// Route guard that protects authenticated routes from unauthenticated access
export const authGuard: CanActivateFn = () => {
  // Inject the Auth service and Router inside the functional guard context
  const auth = inject(Auth);
  const router = inject(Router);

  // Check active auth state or fall back to a stored token in localStorage
  const isAuthenticated = auth.getAuth() || !!localStorage.getItem('token');

  // Allow navigation if the user is authenticated
  if (isAuthenticated) {
    return true;
  }

  // Otherwise redirect to the login route via a UrlTree
  return router.createUrlTree(['/login']);
};