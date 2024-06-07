import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificadorService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  mostraNotificacao(mensagem: string, botao: string) {
    this.snackBar.open(mensagem, botao), {
      duration: 5000,
    }
  }
}
