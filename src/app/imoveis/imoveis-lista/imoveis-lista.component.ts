import { Component, OnInit } from '@angular/core';
import { ImovelService } from '../../services/imovel.service';
import { Imovel } from '../models/imovel';

@Component({
  selector: 'app-imoveis-lista',
  templateUrl: './imoveis-lista.component.html',
  styleUrl: './imoveis-lista.component.css'
})
export class ImoveisListaComponent implements OnInit {
  imoveis: Imovel[] = [];
  isLoggedIn: boolean = false;

  constructor(private imovelService: ImovelService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('token');
    this.imovelService.getImoveis().subscribe(imoveis => this.imoveis = imoveis);
  }

  deleteImovel(id: number): void {
    this.imovelService.deleteImovel(id).subscribe(() => {
      this.imoveis = this.imoveis.filter(imovel => imovel.id !== id);
    });
  }
}
