import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotificadorService } from '../services/notificador.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  constructor(
    private notificador: NotificadorService
  ){ }

  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('token');

    const notificacao = localStorage.getItem('logoutNotification');
    if (notificacao) {
        this.notificador.mostraNotificacao(notificacao, 'Fechar');
        localStorage.removeItem('logoutNotification');
    }
  }

  logOut() {
    localStorage.setItem('logoutNotification', 'Usuário desconectado!');
    localStorage.removeItem('token');
    location.reload();
  }
}
