import { computed, Injectable, signal } from "@angular/core";
import { User, UserApiService } from "../services/user-api.service";

@Injectable({ providedIn: 'root' })
export class UserStore {
    // State
    users = signal<User[]>([]);
    loading = signal(false);
    error = signal<string | null>(null);

    // Pagination state
    page = signal(1);
    pageSize = signal(4);

    // (0 1 2 3 4) (5 6 7 8 9) (10 11 12 13 14) ...

    // Dervied state
    totalUsers = computed(() => this.users().length);
    totalPages = computed(() => Math.ceil(this.totalUsers() / this.pageSize()));
    paginatedUsers = computed(() => {
        const start = (this.page() - 1) * this.pageSize();
        return this.users().slice(start, start + this.pageSize()); // exclusive -> [0,4]
    });

    constructor(private api: UserApiService) { }

    loadUsers() {
        this.loading.set(true);
        this.error.set(null);

        this.api.getUsers().subscribe({
            next: (data) => {
                this.users.set([...data]);  // NEW array ensures UI updates
                this.page.set(1); // Reset to first page on load
                this.loading.set(false);
            },
            error: () => {
                this.error.set('Failed to load users');
                this.loading.set(false);
            }
        });
    }

    // nextPage() {
    //     // if (this.page() < this.totalPages()) {
    //     //     this.page.update(p => p + 1); // this is equivalent to below code
    //     // }
    //     if(this.page() > 1) {
    //         this.page.update(p => p - 1);
    //     }
    // }

    // prevPage() {
    //     // if (this.page() < this.totalPages()) {
    //     //     this.page.update(p => p + 1);
    //     // }
    //     if(this.page() > 1) {
    //         this.page.update(p => p - 1);
    //     }
    // }

    goToPage(page: number) {
        if (page >= 1 && page <= this.totalPages()) { // not required but good to have
            this.page.set(page);
        }
    }

    removeUser(id: number) {
        this.users.update(users => users.filter(u => u.id !== id));
    }
}