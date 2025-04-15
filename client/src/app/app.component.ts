import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'lost-and-found-portal';
  showNavbar: boolean = true;
  showLogout: boolean = false;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentRoute = this.router.url;

        // Hide navbar on login/signup
        this.showNavbar = !(
          currentRoute === '/login' || currentRoute === '/signup'
        );

        // Check token existence on each navigation
        this.showLogout = localStorage.getItem('token') !== null;
      });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
