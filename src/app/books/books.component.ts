import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BookService, Book } from '../services/book.service';

@Component({
  selector: 'app-books',
  imports: [CommonModule, RouterLink],
  providers: [BookService],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit {

  title = 'BookManager2026AM';
  public books: Book[] = [];

  book: Book = {
    id: 0,
    title: '',
    author: '',
    description: ''
  };

  error = '';
  success = '';

  constructor(
    private bookService: BookService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getBooks();
  }

  // Retrieve all books from the backend API
  getBooks(): void {
    this.bookService.getAll().subscribe({
      next: (data: Book[]) => {
        this.books = data;
        this.success = 'Successful list retrieval';
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.error = err.message || 'Failed to load books';
        this.cdr.detectChanges();
      }
    });
  }

  // Delete a book by ID and remove it from the displayed list
  deleteBook(id: any): void {
    const confirmed = window.confirm('Are you sure you want to delete this book?');

    if (!confirmed) {
      return;
    }

    this.bookService.delete(id).subscribe({
      next: () => {
        this.books = this.books.filter(book => book.id && +book.id !== +id);
        this.success = 'Deleted successfully';
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.error = err.message || 'Delete failed';
        this.cdr.detectChanges();
      }
    });
  }

}