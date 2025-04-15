import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css',
})
export class ItemListComponent implements OnInit {
  items: any[] = []; // Empty array for server data

  ngOnInit(): void {
    this.fetchItems(); // Call this when component loads
  }

  async fetchItems() {
    const baseUrl = 'http://localhost:5000/api'; // Replace with your real base URL

    try {
      const response = await fetch(`${baseUrl}/items`); // Make GET request
      const result = await response.json(); // Convert response to JSON

      if (result.success) {
        // Map and format items
        this.items = result.data.items.map((item: any) => ({
          image: item.image,
          description: item.description,
          location: item.location,
          tag: item.tag,
          email: item.email,
          date: item.foundDate
            ? new Date(item.foundDate).toLocaleDateString()
            : new Date(item.createdAt).toLocaleDateString(),
        }));
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  }
}
