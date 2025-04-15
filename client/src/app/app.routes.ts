import { Routes } from '@angular/router';
import { ItemListComponent } from './components/item-list/item-list.component';
import { LostItemFormComponent } from './components/lost-item-form/lost-item-form.component';
import { FoundItemFormComponent } from './components/found-item-form/found-item-form.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

export const routes: Routes = [
  { path: 'items', component: ItemListComponent },
  { path: 'lost', component: LostItemFormComponent },
  { path: 'found', component: FoundItemFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', redirectTo: '/items', pathMatch: 'full' },
];
