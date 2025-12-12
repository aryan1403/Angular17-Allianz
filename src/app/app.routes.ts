import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { Users } from './users/users';
import { Orders } from './orders/orders';

export const routes: Routes = [
  { path: '', component: Home },  // default route,
  { path: 'orders', component: Orders},
  { path: 'users', component: Users },
  { path: 'contact', component: Contact },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
