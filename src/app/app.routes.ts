import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { Contact } from './contact/contact';
import { UsersApiComponent } from './users/users';
import { Orders } from './orders/orders';
import { SearchBar } from './components/search-bar/search-bar';
import { LoginComponent } from './login/login';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', component: Home, canActivate: [authGuard] },  // default route,
  { path: 'home', redirectTo: '', pathMatch: 'full' }, 
  { path: 'orders', component: Orders, canActivate: [authGuard]},
  { path: 'users', component: UsersApiComponent, canActivate: [authGuard] },
  { path: 'contact', component: Contact },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
