import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { NotificadorService } from '../../services/notificador.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificador: NotificadorService
    ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    const notificacao = localStorage.getItem('loginNotification');
    if (notificacao) {
        this.notificador.mostraNotificacao(notificacao, 'Fechar');
        localStorage.removeItem('loginNotification');
    }
  }

onSubmit() {
  if (this.loginForm.valid) {
    const { username, password } = this.loginForm.value;
    this.authService.login(username, password).subscribe({
      next: (response) => {
        console.log(response);
        localStorage.setItem("token", response.token)
      },
      error: (error) => {
        if (error.status === 400) {
          this.notificador.mostraNotificacao('Usuário ou Senha incorreto(os).', 'Fechar');
        } else if (error.status === 401) {
          this.notificador.mostraNotificacao('Usuário ou Senha incorreto(os).', 'Fechar');
        } else if (error.status === 500) {
          this.notificador.mostraNotificacao('Erro ao salvar o usuário.', 'Fechar');
        } else {
          this.notificador.mostraNotificacao('Erro desconhecido.', 'Fechar');
        }
      },
      complete: () => {
        console.log('Login request completed');
        this.router.navigate(['/imoveis']).then(() => {
          location.reload();
        });
      }
    });
  }
}
}
