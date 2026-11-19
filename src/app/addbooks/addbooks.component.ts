import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { BookService, Book } from '../services/book.service';

@Component({
  selector: 'app-addbooks',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './addbooks.component.html',
  styleUrl: './addbooks.component.css',
  providers: [BookService]
})
export class AddbooksComponent {
  book: Book = {
    title: '',
    author: '',
    description: '',
    imageName: ''
  };

  selectedFile: File | null = null;
  previewUrl: string | null = null;
  error = '';
  success = '';

  constructor(
    private bookService: BookService,
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.book.imageName = file.name;

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    }
  }

  addBook(form: NgForm): void {
    this.error = '';

    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile, this.selectedFile.name);

      this.http.post('http://localhost/AngularApp3API/upload.php', formData).subscribe({
        next: () => {
          this.saveBookRecord();
        },
        error: (err: any) => {
          this.error = err.error?.error || 'Image upload failed.';
          this.cdr.detectChanges();
        }
      });
    } else {
      this.saveBookRecord();
    }
  }

  private saveBookRecord(): void {
    this.bookService.add(this.book).subscribe({
      next: () => {
        this.success = 'Book added successfully.';
        this.router.navigate(['/list']);
      },
      error: (err: any) => {
        this.error = err.error?.message || 'Failed to add book.';
        this.cdr.detectChanges();
      }
    });
  }
}