import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TkService {

  private tarefa: Tarefa[] = [];

  constructor() {

   }

   public getTarefa() : Tarefa[]{
    return this.tarefa;
   }

   public adicionarTarefa(){}
   

   public limparTarefa(){}

   public atualizarTarefa(){}


}

interface Tarefa {
  value: String;
  date: Date;
  done?: boolean;

}