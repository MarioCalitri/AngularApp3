import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-updatebooks',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './updatebooks.component.html',
  styleUrl: './updatebooks.component.css'
})
export class UpdatebooksComponent implements OnInit {
  book: any = {
    id: '',
    title: '',
    author: '',
    description: '',
    imageName: ''
  };

  selectedFile: File | null = null;
  previewUrl: string | null = null;
  error = '';
  success = '';
  private baseUrl = 'http://localhost/AngularApp3API';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get(`${this.baseUrl}/view.php?id=${id}`).subscribe({
        next: (data: any) => {
          this.book = data;
          if (this.book.imageName) {
            this.previewUrl = `${this.baseUrl}/uploads/${this.book.imageName}`;
          }
          this.cdr.detectChanges();
        },
        error: (err: any) => {
          this.error = 'Failed to load book details.';
          this.cdr.detectChanges();
        }
      });
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.book.imageName = file.name;

      // Generate local preview URL
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    }
  }

  updateBook(): void {
    this.error = '';

    if (this.selectedFile) {
      const uploadData = new FormData();
      uploadData.append('image', this.selectedFile, this.selectedFile.name);

      this.http.post(`${this.baseUrl}/upload.php`, uploadData).subscribe({
        next: () => {
          this.sendUpdateRecord();
        },
        error: (err: any) => {
          this.error = 'Image upload failed.';
          this.cdr.detectChanges();
        }
      });
    } else {
      this.sendUpdateRecord();
    }
  }

  private sendUpdateRecord(): void {
    const formData = new FormData();
    formData.append('id', this.book.id);
    formData.append('title', this.book.title);
    formData.append('author', this.book.author);
    formData.append('description', this.book.description || '');
    formData.append('imageName', this.book.imageName || '');

    this.http.post(`${this.baseUrl}/update.php`, formData).subscribe({
      next: () => {
        this.success = 'Book updated successfully.';
        this.router.navigate(['/list']);
      },
      error: (err: any) => {
        this.error = 'Failed to update book record.';
        this.cdr.detectChanges();
      }
    });
  }
}