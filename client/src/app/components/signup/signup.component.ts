import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private router: Router) {}

  onSubmit(): void {
    // Step 1: Check if password and confirmPassword match
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    // Step 2: Create data object
    const data = {
      username: this.username,
      email: this.email,
      password: this.password,
    };

    // Step 3: Send POST request to your backend API
    fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          this.errorMessage = 'Signup failed!';
        }
        return response.json();
      })
      .then((result) => {
        if (!result.success) {
          this.errorMessage = result.message;
        } else {
          this.successMessage = 'Signup successful! Please login.';
          this.router.navigate(['/login']);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        this.errorMessage = error.message;
      });
  }
}
