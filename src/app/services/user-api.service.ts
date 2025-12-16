import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, timeout, of, retry } from 'rxjs';

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

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      timeout(4000), // hang forever
      retry(1), // retry once on failure
      catchError(() => {
        console.error('Error loading users');
        return of([]);
      })
    );
  }

  getUserById(id: number): Observable<User | null> {
    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(
      timeout(3000),
      catchError(() => {
        console.error('Error loading user with id', id);
        return of(null);
      }
    ));
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      timeout(3000),
      catchError(() => {
        console.error('Delete failed');
        return of(null);
      })
    );
  }
}
