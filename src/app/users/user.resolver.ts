import { ResolveFn } from "@angular/router";
import { User, UserApiService } from "../services/user-api.service";
import { inject } from "@angular/core";
import { catchError, of } from "rxjs";

export const userResolver: ResolveFn<User | null> = (route) => {
    const userService = inject(UserApiService);
    const userId = route.paramMap.get('id');
    if (!userId) {
        return of(null);
    }
    return userService.getUserById(Number(userId)).pipe(catchError(() => of(null)));
};