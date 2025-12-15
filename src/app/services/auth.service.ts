import { computed, Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    // AUTH state
    private _isLoggedIn = signal(false);
    private _user = signal<{ email: string } | null>(null);

    // Exposed Signals
    isLoggedIn = computed(() => this._isLoggedIn());
    user = computed(() => this._user());

    constructor(private router: Router) {
        // restore auth state from localStorage if available
        const saved = localStorage.getItem('auth_user');
        if(saved) {
            this._user.set(JSON.parse(saved));
            this._isLoggedIn.set(true);
        }
    }

    login(email: string, password: string): boolean {
        // Simulate login API call
        // In real app, replace with actual HTTP request
        console.log('Attempting login for', email);
        if(email === 'admin@example.com' && password === 'password') {
            console.log('Login successful');
            const user = { email };
            this._user.set(user);
            this._isLoggedIn.set(true);
            localStorage.setItem('auth_user', JSON.stringify(user));
            this.router.navigate(['/home']);
            return true;
        }
        return false;
    }

    logout() {
        this._user.set(null);
        this._isLoggedIn.set(false);
        localStorage.removeItem('auth_user');
        this.router.navigate(['/login']);
    }
}