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
  // Model holding the book record fields bound to the form
  book: any = {
    id: '',
    title: '',
    author: '',
    description: '',
    imageName: ''
  };

  // Selected replacement image file and cache-busted/data-URL preview source
  selectedFile: File | null = null;
  previewUrl: string | null = null;

  // Feedback messages and backend API base URL
  error = '';
  success = '';
  private baseUrl = 'http://localhost/AngularApp3API';

  constructor(
    private route: ActivatedRoute,    // Reads the book `id` route parameter
    private http: HttpClient,         // Sends HTTP requests to PHP endpoints
    private router: Router,           // Navigates back to `/list` after saving
    private cdr: ChangeDetectorRef    // Manually triggers view updates after async callbacks
  ) {}

  // Fetch existing book details when the component initializes
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get(`${this.baseUrl}/view.php?id=${id}`).subscribe({
        next: (data: any) => {
          this.book = data;
          // Append a timestamp query param to bypass browser image caching
          if (this.book.imageName) {
            this.previewUrl = `${this.baseUrl}/uploads/${this.book.imageName}?v=${Date.now()}`;
          }
          this.cdr.detectChanges();
        },
        error: () => {
          this.error = 'Failed to load book details.';
          this.cdr.detectChanges();
        }
      });
    }
  }

  // Handle new file selection and generate a local image preview
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.book.imageName = file.name;

      // Convert file to a base64 data URL for immediate UI preview
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    }
  }

  // Upload replacement image first if chosen, then update the book record
  updateBook(): void {
    this.error = '';

    if (this.selectedFile) {
      const uploadData = new FormData();
      uploadData.append('image', this.selectedFile, this.selectedFile.name);

      this.http.post<any>(`${this.baseUrl}/upload.php`, uploadData).subscribe({
        next: (res) => {
          // Normalize whichever filename key the upload endpoint returns
          if (res?.filename) {
            this.book.imageName = res.filename;
          } else if (res?.fileName) {
            this.book.imageName = res.fileName;
          } else if (res?.imageName) {
            this.book.imageName = res.imageName;
          }
          this.sendUpdateRecord();
        },
        error: () => {
          this.error = 'Image upload failed.';
          this.cdr.detectChanges();
        }
      });
    } else {
      // No new file selected—proceed straight to updating the record
      this.sendUpdateRecord();
    }
  }

  // Submit updated book fields as multipart FormData to `update.php`
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
      error: () => {
        this.error = 'Failed to update book record.';
        this.cdr.detectChanges();
      }
    });
  }
}