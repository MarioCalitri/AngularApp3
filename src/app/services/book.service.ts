import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  // Points to your local PHP backend API
  private apiUrl = 'http://localhost/AngularApp3API/api.php';

  constructor(private http: HttpClient) {}

  // Fetch list of books from MySQL via PHP
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }
}