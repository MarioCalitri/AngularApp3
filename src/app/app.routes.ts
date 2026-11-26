import { Routes } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { AddbooksComponent } from './addbooks/addbooks.component';
import { UpdatebooksComponent } from './updatebooks/updatebooks.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'list', component: BooksComponent, canActivate: [authGuard] },
  { path: 'add', component: AddbooksComponent, canActivate: [authGuard] },
  { path: 'update/:id', component: UpdatebooksComponent, canActivate: [authGuard] },
  { path: 'delete', component: BooksComponent, canActivate: [authGuard] },
  { path: 'delete/:id', component: UpdatebooksComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '/login' }
];