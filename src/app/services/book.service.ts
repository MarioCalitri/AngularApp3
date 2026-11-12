import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface representing the Book data structure
export interface Book {
  id?: number;
  title: string;
  author: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
private apiUrl = 'http://localhost/AngularApp3API/api.php';
  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book);
  }
}