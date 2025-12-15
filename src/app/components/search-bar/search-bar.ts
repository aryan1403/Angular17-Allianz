import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, ɵInternalFormsSharedModule } from "@angular/forms";
import { debounceTime, distinctUntilChanged, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { User, UserApiService } from '../../services/user-api.service';

@Component({
  selector: 'app-search-bar',
  imports: [ReactiveFormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar {
  search = new FormControl('');
  users: User[] = [];
  loading = false;

  private destroy$ = new Subject<void>();

  constructor(private api: UserApiService) {
    this.search.valueChanges.pipe(
      debounceTime(400), // waits for 400ms of silence after typing
      distinctUntilChanged(), // ignores same value
      tap(() => this.loading = true),
      switchMap(() => this.api.getUsers()), // cancel the previous request
      takeUntil(this.destroy$)
    ).subscribe(value => {
      console.log('Search term from SearchBar:', value);
      this.users = value.filter(user =>
        user.name.toLowerCase().startsWith(this.search.value?.toLowerCase() ?? '')
      );
      this.loading = false;
    });

    this.search.setValue('');
  }

  ngonDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
