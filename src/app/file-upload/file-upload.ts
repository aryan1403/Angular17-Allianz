import { Component, signal } from '@angular/core';
import { UploadService } from '../services/upload.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  imports: [],
  templateUrl: './file-upload.html',
  styleUrl: './file-upload.css',
})
export class FileUpload {
  selectedFile: File | null = null;
  uploading = signal(false);
  progress = signal(0);
  previewUrl = signal<string | null>(null);
  success = signal(false);
  error = signal<string | null>(null);

  constructor(private uploadService: UploadService) {}

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length == 0) return;
    const file = input.files[0];
    
    // basic validation
    if(file.size > 2 * 1024 * 1024) { // max size 2MB
      this.error.set('File size exceeds 2MB');
      return;
    }

    this.selectedFile = file;
    this.error.set(null);
    this.success.set(false);

    // Preview
    const reader = new FileReader();
    reader.onload = () => this.previewUrl.set(reader.result as string);
    reader.readAsDataURL(file);
  }

  upload() {
    if(!this.selectedFile) return;

    this.uploading.set(true);
    this.progress.set(0);
    this.error.set(null);

    this.uploadService.uploadFile(this.selectedFile).subscribe({
      next: event => {
        if(event.type === HttpEventType.UploadProgress && event.total) {
          const percent = Math.round((event.loaded / event.total) * 100);
          this.progress.set(percent);
        }
        if(event.type == HttpEventType.Response) {
          this.uploading.set(false);
          this.success.set(true);
        }
      },
      error: () => {
        this.uploading.set(false);
        this.error.set('Upload Failed');
      }
    });
  }

}
