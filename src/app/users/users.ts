import { Component, computed, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserStore } from '../store/user.store';
import { User } from '../services/user-api.service';

@Component({
  selector: 'app-users-api',
  standalone: true,
  templateUrl: './users.html',
  styleUrls: ['./users.css'],
  imports: [RouterLink]
})
export class UsersApiComponent {
  users;
  loading;
  error;
  totalUsers;

  constructor(private store: UserStore) {
    this.users = this.store.users;
    this.loading = this.store.loading;
    this.error = this.store.error;
    this.totalUsers = this.store.totalUsers;

    this.store.loadUsers();
  }

  removeUser(id: number) {
    this.store.removeUser(id);
  }
}
