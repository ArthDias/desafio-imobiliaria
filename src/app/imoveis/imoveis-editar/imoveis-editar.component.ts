import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ViaCepService } from '../../services/via-cep.service';
import { ImovelService } from '../../services/imovel.service';
import { Imovel } from '../models/imovel';

@Component({
  selector: 'app-imoveis-editar',
  templateUrl: './imoveis-editar.component.html',
  styleUrls: ['./imoveis-editar.component.css']
})
export class ImoveisEditarComponent implements OnInit {
  public imovel!: Imovel;
  public form!: FormGroup;
  public url: any

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private imovelService: ImovelService,
    private viaCepService: ViaCepService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    if (id) {
      this.imovelService.getImovel(id).subscribe(imovel => {
        if (imovel) {
          this.imovel = imovel;
          this.preencheForm(imovel);
        }
      });
    }

    this.form = this.fb?.group({
      nome: [''],
      tipo: [''],
      valor: [0],
      condominio: [0],
      quartos: [0],
      banheiros: [0],
      mobiliado: [false],
      area: [0],
      venda: [false],
      aluguel: [false],
      dataAnuncio: [new Date()],
      imageUrl: [],
      cep: [''],
      numero: [0],
      complemento: [''],
      rua: [''],
      bairro: [''],
      cidade: [''],
      uf: [''],
      proprietarioNome: [''],
    });
  }

  preencheForm(imovel: Imovel) {
    this.imovel = imovel;
    this.form.patchValue({
      nome: imovel.nome,
      tipo: imovel.tipo,
      valor: imovel.valor,
      condominio: imovel.condominio,
      quartos: imovel.quartos,
      banheiros: imovel.banheiros,
      mobiliado: imovel.mobiliado,
      area: imovel.area,
      venda: imovel.venda,
      aluguel: imovel.aluguel,
      dataAnuncio: imovel.dataAnuncio,
      imageUrl: imovel.imageUrl,
      cep: imovel.endereco.cep,
      numero: imovel.endereco.numero,
      complemento: imovel.endereco.complemento,
      rua: imovel.endereco.rua,
      bairro: imovel.endereco.bairro,
      cidade: imovel.endereco.cidade,
      uf: imovel.endereco.uf,
      proprietarioNome: imovel.proprietario.proprietarioNome
    })
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

    this.imovelService.updateImovel(imovel).subscribe(() => {
      this.router.navigate(['/imoveis']);
    });

  }

}
