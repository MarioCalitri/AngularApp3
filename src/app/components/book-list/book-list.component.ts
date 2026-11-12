import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService, Book } from '../../services/book.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {
  books: Book[] = [];

  constructor(
    private bookService: BookService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Failed to load books:', err)
    });
  }

  // Updated to accept 3 parameters including excuse
  addBook(title: string, author: string, description: string): void {
    if (!title || !author) return;
    this.bookService.addBook({ title, author, description } as Book).subscribe({
      next: () => this.fetchBooks(),
      error: (err) => console.error('Error adding book:', err)
    });
  }

  // Added trackById to fix the *ngFor trackBy reference in HTML
  trackById(index: number, book: Book): number | undefined {
    return book.id;
  }
}