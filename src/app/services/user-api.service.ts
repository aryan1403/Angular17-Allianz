import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, timeout, catchError, tap } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  private cache: User[] | null = null;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    // If already loaded, return instantly
    if (this.cache) {
      return of(this.cache);
    }

    return this.http.get<User[]>(this.apiUrl).pipe(
      timeout(2000),  // If API takes more than 2 sec -> timeout
      tap(data => this.cache = data),
      catchError(() => of([]))   // gracefully handle errors
    );
  }

  deleteUser(id: number) {
    // Update cache immediately for instant UI
    if (this.cache) {
      this.cache = this.cache.filter(u => u.id !== id);
    }
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
