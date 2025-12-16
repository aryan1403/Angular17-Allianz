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
  constructor(private store: UserStore) {
    this.store.loadUsers();
  }

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
