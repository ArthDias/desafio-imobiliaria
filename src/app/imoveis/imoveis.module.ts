import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ImoveisListaComponent } from './imoveis-lista/imoveis-lista.component';
import { ImoveisFormComponent } from './imoveis-form/imoveis-form.component';
import { ImoveisDetalhesComponent } from './imoveis-detalhes/imoveis-detalhes.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImovelService } from './imovel.service';
import { HttpClientModule } from '@angular/common/http';


const routes: Routes = [
  { path: '', component: ImoveisListaComponent },
  { path: 'novo', component: ImoveisFormComponent },
  { path: ':id', component: ImoveisDetalhesComponent },
  { path: ':id/editar', component: ImoveisFormComponent }
];

@NgModule({
  declarations: [
    ImoveisListaComponent,
    ImoveisDetalhesComponent,
    ImoveisFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    NgbModule,
    HttpClientModule
  ],
  providers: [ImovelService]
})
export class ImoveisModule { }
