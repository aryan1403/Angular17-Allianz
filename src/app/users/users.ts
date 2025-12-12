import { Component, OnInit, signal } from '@angular/core';
import { User, UserApiService } from '../services/user-api.service';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  users: User[] = [];
  loading = false;
  error = '';

  constructor(private userApi: UserApiService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.error = '';

    this.userApi.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load users';
        this.loading = false;
      }
    })
  }

  removeUser(id: number) {
    this.userApi.deleteUser(id).subscribe({
      next: () => {
        this.users = this.users.filter(user => user.id !== id);
      },
      error: () => {
        this.error = 'Failed to delete user';
      }
    })
  }
}
