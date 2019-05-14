import { HOST } from './../_shared/var.constants';
import { HttpClient } from '@angular/common/http';
import { SignosVitales } from './../_model/signosvitales';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignosvitalesService {

  signosvitalesCambio = new Subject<SignosVitales[]>();
  mensajeCambio = new Subject<string>();

  url: string = HOST;

  constructor(private http: HttpClient) { }
  listar() {
    return this.http.get<SignosVitales[]>(`${this.url}/signosvitales`);
  }

  listarPageable(p: number, s: number) {
    return this.http.get(`${this.url}/signosvitales/pageable?page=${p}&size=${s}`);
  }

  listarPorId(idSignosVitales: number) {
    return this.http.get<SignosVitales>(`${this.url}/signosvitales${idSignosVitales}`);
  }
n
  registrar(SignosVitales: SignosVitales) {
    return this.http.post(`${this.url}/signosvitales`, SignosVitales);
  }

  modificar(SignosVitales: SignosVitales) {
    return this.http.put(`${this.url}/signosvitales`, SignosVitales);
  }

  eliminar(idSignosVitales: number) {
    return this.http.delete(`${this.url}/signosvitales/${idSignosVitales}`);
  }
}
