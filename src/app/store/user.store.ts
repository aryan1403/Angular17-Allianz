import { computed, Injectable, signal } from "@angular/core";
import { User, UserApiService } from "../services/user-api.service";

@Injectable({ providedIn: 'root' })
export class UserStore {
    // State
    users = signal<User[]>([]);
    loading = signal(false);
    error = signal<string | null>(null);

    // Dervied state
    totalUsers = computed(() => this.users().length);

    constructor(private api: UserApiService) { }

    loadUsers() {
        this.loading.set(true);
        this.error.set(null);

        this.api.getUsers().subscribe({
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