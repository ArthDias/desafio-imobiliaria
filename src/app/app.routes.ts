import { Routes } from '@angular/router';
import { LoginComponent } from './autenticacao/login/login.component';
import { RegisterComponent } from './autenticacao/register/register.component';

export const routes: Routes = [
  {
    path: 'imoveis', loadChildren: () => import('./imoveis/imoveis.module').then(m => m.ImoveisModule)
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: '', redirectTo: '/imoveis', pathMatch: 'full'
  }
];
