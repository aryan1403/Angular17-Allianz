import { Component, signal } from '@angular/core';

interface User {
  id: number,
  name: string
}

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {
  users = signal<User[]>([
    { id: 1, name: "Aaryan"},
    { id: 2, name: "Arush"},
    { id: 3, name: "Kirti"},
    { id: 4, name: "Laksh"}
  ]);

  addUser = (name: string) => this.users.update(list => [...list, {id: list.length + 1, name: name}]);

  clearUser = () => this.users.set([]);

  removeUser = (id: Number) => this.users.update(users => users.filter(u => u.id !== id));
}
