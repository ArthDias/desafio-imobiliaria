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
  proprietarioNome: string;
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
  enderecoId: string;
  proprietario: Proprietario;
  proprietarioId: string;
  imageUrl: string;
}
