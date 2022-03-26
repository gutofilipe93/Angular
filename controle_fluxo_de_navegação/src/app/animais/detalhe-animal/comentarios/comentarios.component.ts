import { switchMap, tap } from 'rxjs/operators';
import { ComentariosService } from './comentarios.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { Comentarios } from './comentarios';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {
  @Input() id!: number;
  comentarios$!: Observable<Comentarios>;
  comentarioForm!: FormGroup;

  constructor(private comentarioService: ComentariosService, private formBuider: FormBuilder) { }

  ngOnInit(): void {
    this.comentarios$ = this.comentarioService.buscarComentario(this.id);
    this.comentarioForm = this.formBuider.group({
      comentario: ['',Validators.maxLength(300)],
    })
  }

  gravar(): void {
    const comentario = this.comentarioForm.get("comentario")?.value ?? '';
    this.comentarios$ = this.comentarioService.incluirComentario(this.id,comentario)
                                              .pipe(switchMap(() => this.comentarioService.buscarComentario(this.id)),
                                              tap(() => {
                                                this.comentarioForm.reset();
                                                alert("Comentario salvo");
                                              })
                                              );
  }

}
