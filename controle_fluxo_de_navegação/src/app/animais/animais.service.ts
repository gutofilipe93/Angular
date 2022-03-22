import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TokenService } from '../autenticacao/token.service';
import { Animais, Animal } from './animais';

const API = environment.apiURL;
const NOT_MODIFIED = "304";

@Injectable({
  providedIn: 'root'
})
export class AnimaisService {

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  listaDoUsuario(nomeDoUsuario: string): Observable<Animais>{    
    return this.httpClient.get<Animais>(`${API}/${nomeDoUsuario}/photos`);
  }

  buscarPorID(id: number): Observable<Animal>{    
    return this.httpClient.get<Animal>(`${API}/photos/${id}`);
  }

  excluirAnimais(id: number): Observable<Animal>{
    return this.httpClient.delete<Animal>(`${API}/photos/${id}`);
  }

  curtir(id:number): Observable<boolean>{
    return this.httpClient.post(`${API}/photos/${id}/like`, {}, {observe: "response"})
    .pipe(mapTo(true), 
      catchError((error) => {
      return error.status === NOT_MODIFIED ? of(false) : throwError(error);
    }));
  }
}
