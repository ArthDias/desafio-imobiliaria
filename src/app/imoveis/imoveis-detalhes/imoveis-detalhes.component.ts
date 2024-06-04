import { Component, OnInit } from '@angular/core';
import { ImovelService } from '../../services/imovel.service';
import { ActivatedRoute } from '@angular/router';
import { Imovel } from '../models/imovel';

@Component({
  selector: 'app-imoveis-detalhes',
  templateUrl: './imoveis-detalhes.component.html',
  styleUrl: './imoveis-detalhes.component.css'
})
export class ImoveisDetalhesComponent implements OnInit {
  imovel: Imovel | undefined;

  constructor(
    private route: ActivatedRoute,
    private imovelService: ImovelService
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.imovelService.getImovel(id).subscribe(imovel => this.imovel = imovel);
  }
}
