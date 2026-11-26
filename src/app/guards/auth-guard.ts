import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  const isAuthenticated = auth.getAuth() || !!localStorage.getItem('token');

  if (isAuthenticated) {
    return true;
  }

  return router.createUrlTree(['/login']);
};