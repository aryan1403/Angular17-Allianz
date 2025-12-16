import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { Contact } from './contact/contact';
import { LoginComponent } from './login/login';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', component: Home, canActivate: [authGuard] },  // default route,
  { path: 'home', redirectTo: '', pathMatch: 'full' }, 
  { path: 'orders', loadComponent: () => import('./orders/orders').then(m => m.Orders), canActivate: [authGuard]},
  { path: 'users', loadComponent: () => import('./users/users').then(m => m.UsersApiComponent), canActivate: [authGuard] },
  { path: 'users/:id', loadComponent: () => import('./users/user-details.component').then(m => m.UserDetailsComponent), canActivate: [authGuard] },
  { path: 'contact', component: Contact },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent }
];