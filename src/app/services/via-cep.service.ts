import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {

  private url: string = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient) { }

  getEnderecoPeloCep(cep: string): Observable<any> {
    return this.http.get(`${this.url}/${cep}/json`).pipe(
      map((response: any) => {
        if (response.erro) {
          throw new Error('CEP não encontrado');
        }
        return response;
      })
    );
  }
}
