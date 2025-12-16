import { Component, OnInit, signal } from "@angular/core";
import { User, UserApiService } from "../services/user-api.service";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { CommonModule, NgIf } from "@angular/common";

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `<h2>User Details Component</h2>
    @if(user()) {
        <p>User: {{user()!.name}} {{user()!.email}}</p>
    } @else {
        <p>No User Found</p>
    }`
})
export class UserDetailsComponent {
    user = signal<User | null>(null);
    constructor(private route: ActivatedRoute) {
        const resolvedUser = this.route.snapshot.data['user'] as User | null;
        this.user.set(resolvedUser);
    }
}