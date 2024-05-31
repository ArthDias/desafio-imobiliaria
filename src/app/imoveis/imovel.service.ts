import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ImovelService {

  private apiUrl = 'http://localhost:5875';

  constructor(private http: HttpClient) { }
  
  getImoveis(): Observable<Imovel[]> {
    return this.http.get<Imovel[]>(`${this.apiUrl}/imovel/`);
  }

  getImovel(id: number): Observable<Imovel | undefined> {
    return this.http.get<Imovel>(`${this.apiUrl}/imovel/${id}`);
  }

  addImovel(imovel: Imovel): Observable<Imovel> {
    return this.http.post<Imovel>(`${this.apiUrl}/imovel`, imovel);
  }

  updateImovel(imovel: Imovel): Observable<Imovel> {
    return this.http.put<Imovel>(`${this.apiUrl}/imovel/${imovel.id}`, imovel);
  }

  deleteImovel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/imovel/${id}`);
  }
}
