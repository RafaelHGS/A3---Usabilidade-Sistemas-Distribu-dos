import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TkService {

  private tarefas: Tarefa[] = [];

  constructor() {

   }

   public getTarefa() : Tarefa[]{
    return this.tarefas;
   }


   public adicionarTarefa(value: string, date: string){
    date = date.replace("-", "/");
    let tarefa : Tarefa = {value: value, date: new Date(date), done: false};
    this.tarefas.push(tarefa);
    console.log(this.tarefas);
   }

   public limparTarefa(){}

   public atualizarTarefa(){}


}

interface Tarefa {
  value: String;
  date: Date;
  done?: boolean;

}