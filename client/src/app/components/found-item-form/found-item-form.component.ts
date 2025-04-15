import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-found-item-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './found-item-form.component.html',
  styleUrl: './found-item-form.component.css',
})
export class FoundItemFormComponent {
  showForm: boolean = false; // Flag to control visibility of the form
  message: string = ''; // Message to show when the user is not logged in
  isUploading: boolean = false; // for image upload
  isSubmitting: boolean = false; // for form submission

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Check if token is present in localStorage
    const token = localStorage.getItem('token');

    if (token) {
      this.showForm = true; // If token exists, show the form
    } else {
      this.message = 'Please log in first to report a lost item.';
    }
  }

  // Method to navigate to login page
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  formData = {
    name: '',
    image: '',
    description: '',
    location: '',
    tag: 'Found', // default value
    foundDate: '', // new field for date
  };

  async onImageSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'lostandfound');

    this.isUploading = true; // Start loader

    try {
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dfkodomj0/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      this.formData.image = data.secure_url;
    } catch (error) {
      console.error('Image upload failed', error);
      alert('Image upload failed, please try again.');
    } finally {
      this.isUploading = false; // Stop loader
    }
  }

  async onSubmit() {
    if (
      this.formData.name &&
      this.formData.image &&
      this.formData.description &&
      this.formData.location &&
      this.formData.tag &&
      this.formData.foundDate // Check foundDate too
    ) {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to submit!');
        return;
      }

      this.isSubmitting = true; // Start loader

      try {
        const response = await fetch('http://localhost:5000/api/items/report', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(this.formData),
        });

        const result = await response.json();

        if (response.ok) {
          alert('Item reported successfully!');
          console.log('Server Response:', result);
          this.formData = {
            name: '',
            image: '',
            description: '',
            location: '',
            tag: 'Found',
            foundDate: '',
          };
          this.router.navigate(['/']); // Redirect to home page
        } else {
          alert('Error: ' + result.message);
        }
      } catch (error) {
        console.error('Submission failed:', error);
        alert('Something went wrong, try again later.');
      } finally {
        this.isSubmitting = false; // Stop loader
      }
    } else {
      alert('Please fill all fields and upload an image!');
    }
  }
}
