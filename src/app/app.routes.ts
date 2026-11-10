import { Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: BookListComponent }
];