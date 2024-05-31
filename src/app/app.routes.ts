import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'imoveis', loadChildren: () => import('./imoveis/imoveis.module').then(m => m.ImoveisModule) },
    { path: '', redirectTo: '/imoveis', pathMatch: 'full' }
];
