import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Contact } from './contact/contact';

export const routes: Routes = [
  { path: '', component: Home },  // default route
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, routes]
})
export class AppRoutingModule { }
