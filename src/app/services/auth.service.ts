import { computed, Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";

interface User {
    email: string;
    role: 'ADMIN' | 'USER';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    // AUTH state
    private tokenSignal = signal<string | null>(null);
    private userSignal = signal<User | null>(null);

    // Exposed Signals
    isLoggedIn = computed(() => !!this.tokenSignal());
    token = computed(() => this.tokenSignal());
    user = computed(() => this.userSignal());

    constructor(private router: Router) {
        const token = localStorage.getItem('jwt_token');
        const user = localStorage.getItem('jwt_user');

        if(token && user) {
            this.tokenSignal.set(token);
            this.userSignal.set(JSON.parse(user));
        }
    }

    login(email: string, password: string): boolean {
        // Simulate login API call
        // In real app, replace with actual HTTP request
        if(email === 'admin@example.com' && password === 'password') {
            const fakeJwt = 'ey.faje.jwt.token.123';

            this.tokenSignal.set(fakeJwt);
            this.userSignal.set({ email, role: 'ADMIN' });

            localStorage.setItem('jwt_token', fakeJwt);
            localStorage.setItem('jwt_user', JSON.stringify({ email, role: 'ADMIN' }));
            this.router.navigate(['/home']);
            return true;
        }
        return false;
    }

    logout() {
        this.tokenSignal.set(null);
        this.userSignal.set(null);
        localStorage.clear();
        
        this.router.navigate(['/login']);
    }
}