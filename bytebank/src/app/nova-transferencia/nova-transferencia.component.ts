import { Transferencia } from './../../models/transferencia.model';
import { TransferenciaService } from './../services/transferencia.service';
import { Component, Output, EventEmitter } from "@angular/core";
import { Router } from '@angular/router';


@Component({
    selector: "app-nova-transferencia",
    templateUrl:"./nova-transferencia.component.html",
    styleUrls: ["./nova-transferencia.component.scss"]
})
export class NovaTransferenciaComponent{

  constructor(private service : TransferenciaService, private router: Router){}

  valor: number;
  destino: number;

  transferir(){
    console.log("Solicitada nova transaferencia");
    const valorEmitir: Transferencia  = {valor: this.valor, destino: this.destino, id: "", data: new Date()};
    this.service.adicionar(valorEmitir).subscribe((resultado) => {
      console.log(resultado);
      this.limparCampos();
      this.router.navigateByUrl('extrato');
    },(error) => {
      console.log(error);
    });
  }

  limparCampos(){
    this.valor = 0;
    this.destino = 0;
  }

}
