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
  public imovel: Imovel = {
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
    enderecoId: '',
    proprietario: {
      id: 0,
      proprietarioNome: '',
      imovelId: 0
    },
    proprietarioId: '',
    imageUrl: ''
  };
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
      endereco: this.fb.group({
        cep: ['', Validators.required],
        numero: ['', Validators.required],
        complemento: [''],
        rua: ['', Validators.required],
        bairro: ['', Validators.required],
        cidade: ['', Validators.required],
        uf: ['', Validators.required]
      }),
      proprietario: this.fb.group({
        proprietarioNome: ['', Validators.required]
      }),
    });
  }

  resetaEnderecoForm() {
    this.form.patchValue({
      cep: '',
      numero: 0,
      complemento: '',
      rua: '',
      bairro: '',
      cidade: '',
      uf: ''
    });
  }

  onCepChange(cep: string): void {
    cep = cep.replace(/\D/g, '');
    if (cep != "") {
      //Expressão regular para validar o CEP.
      var validaCep = /^[0-9]{8}$/;

      // this.resetaEnderecoForm();
      if (validaCep.test(cep)) {
        this.viaCepService.getEnderecoPeloCep(cep).subscribe({
          next: (dadosCep) => {
            this.form.patchValue({
              endereco: {
                rua: dadosCep.logradouro,
                bairro: dadosCep.bairro,
                cidade: dadosCep.localidade,
                uf: dadosCep.uf
              }
            });
          }
        });
      }
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event:any) => {
        this.form.patchValue({
          imageUrl: event.target.result as string
        });
      };
      console.log(this.form.value.imageUrl);
    }
  }

  onSubmit(): void {
    let imovel = Object.assign({}, this.imovel, this.form.value);

    this.imovelService.addImovel(imovel).subscribe(() => {
      this.router.navigate(['/imoveis']);
    });
  }
}
