import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  onSubmit(): void {
    const data = {
      username: this.username,
      password: this.password,
    };

    // Step 2: Send a POST request to your backend
    fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          this.errorMessage = 'Login failed!';
        }
        return response.json(); // Convert response to JavaScript object
      })
      .then((result) => {
        if (!result.success) {
          this.errorMessage = result.message;
        } else {
          // console.log('Login Success:', result);
          localStorage.setItem('token', result.data.token);
          this.router.navigate(['/']);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        // You can show this error on your form also
        this.errorMessage = error.message;
      });
  }
}
