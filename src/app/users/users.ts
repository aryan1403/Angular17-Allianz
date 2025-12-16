import { Component, computed, OnInit, signal } from '@angular/core';
import { UserApiService, User } from '../services/user-api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users-api',
  standalone: true,
  templateUrl: './users.html',
  styleUrls: ['./users.css'],
  imports: [RouterLink]
})
export class UsersApiComponent implements OnInit {
  // State
  users = signal<User[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  // Dervied state
  totalUsers = computed(() => this.users().length);

  constructor(private userService: UserApiService) {
    this.loadUsers();
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading.set(true);
    this.error.set(null);

    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users.set([...data]);  // NEW array ensures UI updates
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load users');
        this.loading.set(false);
      }
    });
  }

  removeUser(id: number) {
    this.users.update(users => users.filter(u => u.id !== id));
  }
}
