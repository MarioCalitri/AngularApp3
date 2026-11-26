import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Book {
  id?: number;
  title: string;
  author: string;
  description: string;
  imageName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  // Update this folder name if your XAMPP htdocs folder uses a different name
  private baseUrl = 'http://localhost/AngularApp3API';

  constructor(private http: HttpClient) {}

  // Retrieve all books from list.php
  getAll(): Observable<Book[]> {
    return this.http.get(`${this.baseUrl}/list.php`).pipe(
      map((res: any) => res['data'] ? res['data'] : res)
    );
  }

  // Retrieve a single book by ID from view.php
  get(id: number): Observable<Book> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<Book>(`${this.baseUrl}/view.php`, { params });
  }

  // Add a new book via add.php
  add(book: Book): Observable<Book> {
    return this.http.post(`${this.baseUrl}/add.php`, { data: book }).pipe(
      map((res: any) => res['data'] ? res['data'] : res)
    );
  }

  // Update an existing book via update.php
  update(book: Book): Observable<Book> {
    return this.http.post<any>(`${this.baseUrl}/update.php`, { data: book }).pipe(
      map((res: any) => res['data'] ? res['data'] : res)
    );
  }

  // Delete a book by ID via delete.php
  delete(id: number): Observable<any> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.delete(`${this.baseUrl}/delete.php`, { params });
  }
}