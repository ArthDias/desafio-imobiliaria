import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ViaCepService } from '../../services/via-cep.service';
import { ImovelService } from '../../services/imovel.service';
import { Imovel } from '../models/imovel';
import { NotificadorService } from '../../services/notificador.service';

@Component({
  selector: 'app-imoveis-editar',
  templateUrl: './imoveis-editar.component.html',
  styleUrls: ['./imoveis-editar.component.css']
})
export class ImoveisEditarComponent implements OnInit {
  public imovel!: Imovel;
  public form!: FormGroup;
  public url: any
  //Expressão regular para validar o CEP.
  public validaCep = /^\d{2}\d{3}\d{3}$/;

  private caracteresRepetidosValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value;
      if (!value) {
        return null;
      }

      for (let i = 0; i < value.length - 1; i++) {
        if (value[i] === value[i + 1]) {
          return { caracteresRepetidos: true };
        }
      }

      return null;
    };
  }

  private dateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value;
      if (!value) {
        return null;
      }

      const inputDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Para ignorar a hora no comparativo

      if (inputDate > today) {
        return { invalidDate: 'A data não pode estar no futuro.' };
      }

      const hundredYearsAgo = new Date();
      hundredYearsAgo.setFullYear(hundredYearsAgo.getFullYear() - 100);

      if (inputDate < hundredYearsAgo) {
        return { invalidDate: 'A data não pode estar muito no passado.' };
      }

      return null;
    };
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private imovelService: ImovelService,
    private viaCepService: ViaCepService,
    private fb: FormBuilder,
    private notificador: NotificadorService
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

    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), this.caracteresRepetidosValidator()]],
      tipo: ['', [Validators.required, Validators.pattern(/^[^\d]+$/), Validators.maxLength(50), this.caracteresRepetidosValidator()]],
      valor: [0, [Validators.required, Validators.min(0)]],
      condominio: [0, [Validators.min(0)]],
      quartos: [0, [Validators.required, Validators.min(0)]],
      banheiros: [0, [Validators.required, Validators.min(0)]],
      mobiliado: [false],
      area: [0, [Validators.required, Validators.min(0)]],
      venda: [false],
      aluguel: [false],
      dataAnuncio: ['', [Validators.required, this.dateValidator()]], // Validador de data adicionado corretamente
      imageUrl: [],
      endereco: this.fb.group({
        cep: ['', [Validators.required, Validators.pattern(this.validaCep)]],
        numero: ['', [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]],
        complemento: [''],
        rua: ['', [Validators.required, Validators.maxLength(100), this.caracteresRepetidosValidator()]],
        bairro: ['', [Validators.required, Validators.maxLength(50), this.caracteresRepetidosValidator()]],
        cidade: ['', [Validators.required, Validators.maxLength(50), this.caracteresRepetidosValidator()]],
        uf: ['', [Validators.required, Validators.maxLength(2), Validators.pattern(/^[^\d]+$/)]]
      }),
      proprietario: this.fb.group({
        proprietarioNome: ['', [Validators.required, Validators.maxLength(100), this.caracteresRepetidosValidator()]]
      }),
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
      imageUrl: imovel.imageUrl
    });
    this.form.get('endereco')?.patchValue({
      cep: imovel.endereco.cep,
      numero: imovel.endereco.numero,
      complemento: imovel.endereco.complemento,
      rua: imovel.endereco.rua,
      bairro: imovel.endereco.bairro,
      cidade: imovel.endereco.cidade,
      uf: imovel.endereco.uf,
    });
    this.form.get('proprietario')?.patchValue({
      proprietarioNome: imovel.proprietario.proprietarioNome
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

      // this.resetaEnderecoForm();
      if (this.validaCep.test(cep)) {
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
      this.notificador.mostraNotificacao('Imóvel editado com sucesso!', 'Fechar');
      this.router.navigate(['/imoveis']);
    });
  }
}
