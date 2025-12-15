import { Component, OnInit } from '@angular/core';
import { UserApiService, User } from '../services/user-api.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  selector: 'app-users-api',
  standalone: true,
  templateUrl: './users.html',
  styleUrls: ['./users.css']
})
export class UsersApiComponent implements OnInit {

  users: User[] = [];
  loading = false;
  error = '';

  constructor(private userService: UserApiService) {
    
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.error = '';

    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = [...data];  // NEW array ensures UI updates
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load users';
        this.loading = false;
      }
    });
  }

  removeUser(id: number) {
    this.users = this.users.filter(u => u.id !== id);

    this.userService.deleteUser(id).subscribe();
  }
}
