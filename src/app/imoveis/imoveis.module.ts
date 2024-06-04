import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ImoveisListaComponent } from './imoveis-lista/imoveis-lista.component';
import { ImoveisFormComponent } from './imoveis-form/imoveis-form.component';
import { ImoveisDetalhesComponent } from './imoveis-detalhes/imoveis-detalhes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImovelService } from '../services/imovel.service';
import { HttpClientModule } from '@angular/common/http';
import { ImoveisEditarComponent } from './imoveis-editar/imoveis-editar.component';


const routes: Routes = [
  { path: '', component: ImoveisListaComponent },
  { path: 'novo', component: ImoveisFormComponent },
  { path: ':id', component: ImoveisDetalhesComponent },
  { path: ':id/editar', component: ImoveisEditarComponent }
];

@NgModule({
  declarations: [
    ImoveisListaComponent,
    ImoveisDetalhesComponent,
    ImoveisFormComponent,
    ImoveisEditarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgbModule,
    HttpClientModule
  ],
  providers: [ImovelService]
})
export class ImoveisModule { }
