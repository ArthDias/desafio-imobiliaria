import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Endereco {
  id: number;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: number;
  complemento: string;
}

export interface Proprietario {
  id: number;
  nome: string;
  imovelId: number;
}

export interface Imovel {
  id: number;
  nome: string;
  tipo: string;
  valor: number;
  condominio: number;
  quartos: number;
  banheiros: number;
  mobiliado: boolean;
  area: number;
  venda: boolean;
  aluguel: boolean;
  dataAnuncio: Date;
  endereco: Endereco;
  proprietario: Proprietario;
}

@Injectable({
  providedIn: 'root'
})
export class ImovelService {

  private imoveis: Imovel[] = [
    {
      id: 1,
      nome: 'Apartamento Central',
      tipo: 'Apartamento',
      valor: 1200,
      condominio: 300,
      quartos: 2,
      banheiros: 1,
      mobiliado: false,
      area: 60,
      venda: false,
      aluguel: true,
      dataAnuncio: new Date('2024-01-01'),
      endereco: {
        id: 1,
        rua: 'Rua R',
        numero: '123',
        bairro: 'COHAB',
        cidade: 'Tucuruí',
        uf: 'PA',
        cep: 68459595,
        complemento: ''
      },
      proprietario: {
        id: 1,
        nome: 'João Silva',
        imovelId: 1
      }
    },
    {
      id: 2,
      nome: 'Casa com Piscina',
      tipo: 'Casa',
      valor: 1000000,
      condominio: 0,
      quartos: 4,
      banheiros: 3,
      mobiliado: true,
      area: 800,
      venda: true,
      aluguel: false,
      dataAnuncio: new Date('2024-02-15'),
      endereco: {
        id: 2,
        rua: 'Rua Maracanã',
        numero: '456',
        bairro: 'Centro Norte',
        cidade: 'Várzea Grande',
        uf: 'MT',
        cep: 78110560,
        complemento: ''
      },
      proprietario: {
        id: 2,
        nome: 'Maria Souza',
        imovelId: 2
      }
    }
  ];

  getImoveis(): Observable<Imovel[]> {
    return of(this.imoveis);
  }

  getImovel(id: number): Observable<Imovel | undefined> {
    return of(this.imoveis.find(imovel => imovel.id === id));
  }

  addImovel(imovel: Imovel): void {
    this.imoveis.push(imovel);
  }

  updateImovel(imovel: Imovel): void {
    const index = this.imoveis.findIndex(p => p.id === imovel.id);
    if (index !== -1) {
      this.imoveis[index] = imovel;
    }
  }

  deleteImovel(id: number): void {
    this.imoveis = this.imoveis.filter(imovel => imovel.id !== id);
  }
}
