import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImovelService } from '../../services/imovel.service';
import { ViaCepService } from '../../services/via-cep.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Imovel } from '../models/imovel';

@Component({
  selector: 'app-imoveis-form',
  templateUrl: './imoveis-form.component.html',
  styleUrl: './imoveis-form.component.css'
})
export class ImoveisFormComponent implements OnInit {
  public imovel!: Imovel;
  public form!: FormGroup;
  public url: any

  constructor(
    private router: Router,
    private imovelService: ImovelService,
    private viaCepService: ViaCepService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb?.group({
      nome: ['', Validators.required],
      tipo: ['', Validators.required],
      valor: [0, Validators.required],
      condominio: [0],
      quartos: [0, Validators.required],
      banheiros: [0, Validators.required],
      mobiliado: [false],
      area: [0, Validators.required],
      venda: [false],
      aluguel: [false],
      dataAnuncio: [new Date(), Validators.required],
      imageUrl: [],
      cep: ['', Validators.required],
      numero: [0, Validators.required],
      complemento: [''],
      rua: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      uf: ['', Validators.required],
      proprietarioNome: ['', Validators.required],
    });
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

    this.form = new FormGroup({

    })
  }

  onSubmit(): void {
    let imovel = Object.assign({}, this.imovel, this.form.value);

    this.imovelService.addImovel(imovel).subscribe(() => {
      this.router.navigate(['/imoveis']);
    });
  }
}
