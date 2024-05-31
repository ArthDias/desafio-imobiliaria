import { Component, OnInit } from '@angular/core';
import { Imovel, ImovelService } from '../imovel.service';

@Component({
  selector: 'app-imoveis-lista',
  templateUrl: './imoveis-lista.component.html',
  styleUrl: './imoveis-lista.component.css'
})
export class ImoveisListaComponent implements OnInit {
  imoveis: Imovel[] = [];

  constructor(private imovelService: ImovelService) { }

  ngOnInit(): void {
    this.imovelService.getImoveis().subscribe(imoveis => this.imoveis = imoveis);
  }

  deleteImovel(id: number): void {
    this.imovelService.deleteImovel(id).subscribe(() => {
      this.imoveis = this.imoveis.filter(imovel => imovel.id !== id);
    });
  }
}