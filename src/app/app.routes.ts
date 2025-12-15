import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { Contact } from './contact/contact';
import { UsersApiComponent } from './users/users';
import { Orders } from './orders/orders';
import { SearchBar } from './components/search-bar/search-bar';

export const routes: Routes = [
  { path: '', component: Home },  // default route,
  { path: 'home', redirectTo: '', pathMatch: 'full' }, 
  { path: 'orders', component: Orders},
  { path: 'users', component: UsersApiComponent },
  { path: 'contact', component: SearchBar },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
