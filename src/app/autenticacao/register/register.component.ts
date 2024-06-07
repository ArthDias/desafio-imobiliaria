import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificadorService } from '../../services/notificador.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificador: NotificadorService
    ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { username, password } = this.registerForm.value;
      this.authService.register(username, password).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error.error);
          if (error.status === 400) {
            this.notificador.mostraNotificacao('Usuário já existe.', 'Fechar');
          } else if (error.status === 500) {
            this.notificador.mostraNotificacao('Erro ao salvar o usuário.', 'Fechar');
          } else {
            this.notificador.mostraNotificacao('Erro desconhecido.', 'Fechar');
          }
        },
        complete: () => {
          localStorage.setItem('loginNotification', 'Usuário registrado com sucesso!');
          this.router.navigate(['/login']);
        }
      });
    }
  }
}
