import { NovoUsuario } from './novo-usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NovoUsuarioService {

  constructor(private http: HttpClient) {}

  cadastrarNovoUsuario(usuario: NovoUsuario){
    return this.http.post('http://localhost:3000/user/signup',usuario);
  }
}
