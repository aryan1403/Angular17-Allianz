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
export class UserDetailsComponent implements OnInit {
    user = signal<User | null>(null);
    constructor(private userApiService: UserApiService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            const id = Number(params.get('id'));
            if(!id) {
                this.user.set(null);
                return;
            }

            this.userApiService.getUserById(id).subscribe({
                next: user => this.user.set(user),
                error: () => this.user.set(null)
            });
        });
    }
}