import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImovelService, Imovel } from '../imovel.service';
import { ViaCepService } from '../../via-cep.service';

@Component({
  selector: 'app-imoveis-form',
  templateUrl: './imoveis-form.component.html',
  styleUrl: './imoveis-form.component.css'
})
export class ImoveisFormComponent implements OnInit {
  imovel: Imovel = {
    id: 0,
    nome: '',
    tipo: '',
    valor: 0,
    condominio: 0,
    quartos: 0,
    banheiros: 0,
    mobiliado: false,
    area: 0,
    venda: false,
    aluguel: false,
    dataAnuncio: new Date(),
    endereco: {
      id: 0,
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
      uf: '',
      cep: 0,
      complemento: ''
    },
    proprietario: {
      id: 0,
      nome: '',
      imovelId: 0
    },
    imageUrl: 'string'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private imovelService: ImovelService,
    private viaCepService: ViaCepService
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    if (id) {
      this.imovelService.getImovel(id).subscribe(imovel => {
        if (imovel) {
          this.imovel = imovel;
        }
      });
    }
  }

  resetaEnderecoForm() {
    this.imovel.endereco.rua = '';
    this.imovel.endereco.bairro = '';
    this.imovel.endereco.cidade = '';
    this.imovel.endereco.uf = '';
  }

  onCepChange(cep: string): void {
    cep = cep.replace(/\D/g, '');
    if (cep != "") {
      //Expressão regular para validar o CEP.
      var validaCep = /^[0-9]{8}$/;

      this.resetaEnderecoForm();
      if (validaCep.test(cep)) {
        this.viaCepService.getEnderecoPeloCep(cep).subscribe({
          next: (dadosCep) => {
            this.imovel.endereco.rua = dadosCep.logradouro;
            this.imovel.endereco.bairro = dadosCep.bairro;
            this.imovel.endereco.cidade = dadosCep.localidade;
            this.imovel.endereco.uf = dadosCep.uf;
          }
        });
      }
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imovel.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.imovel.id) {
      this.imovelService.updateImovel(this.imovel).subscribe(() => {
        this.router.navigate(['/imoveis']);
      });
    } else {
      this.imovel.id = new Date().getTime(); // Gerando ID simulado
      this.imovel.endereco.id = new Date().getTime(); // Gerando ID endereco simulado
      this.imovel.proprietario.id = new Date().getTime(); // Gerando ID Proprietario simulado, apenas se for definido
      this.imovel.proprietario.imovelId = this.imovel.id;

      this.imovelService.addImovel(this.imovel).subscribe(() => {
        this.router.navigate(['/imoveis']);
      });
    }
    this.router.navigate(['/imoveis']);
  }
}