import { Component, computed, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserStore } from '../store/user.store';

@Component({
  selector: 'app-users-api',
  standalone: true,
  templateUrl: './users.html',
  styleUrls: ['./users.css'],
  imports: [RouterLink]
})
export class UsersApiComponent {
  constructor(public store: UserStore) {
    this.store.loadUsers();
  }

  isAdmin = computed(() => {
    // In real app, get user role from AuthService
    return false; // assuming admin for demo
  });

  get users() {
    return this.store.users();
  }

  get loading() {
    return this.store.loading();
  }

  get error() {
    return this.store.error();
  }

  get totalUsers() {
    return this.store.totalUsers();
  }

  removeUser(id: number) {
    this.store.removeUser(id);
  }
}
