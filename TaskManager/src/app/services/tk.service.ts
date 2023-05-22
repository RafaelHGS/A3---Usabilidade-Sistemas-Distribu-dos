import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

// import { Plugins } from '@capacitor/core/types/global';
// const { Storage } = Plugins;

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
    this.setTarefaToStorage();
    
   }

   public limparTarefa(index: number){
    this.tarefas.splice(index, 1);
    this.setTarefaToStorage();
   }

   public atualizarTarefa(index: number, value: string, date: string){
    let tarefa: Tarefa = this.tarefas[index];
    date = date.replace("-", "/");
    tarefa.value = value;
    tarefa.date = new Date(date);
    this.tarefas.splice(index, 1, tarefa);
    this.setTarefaToStorage();
   }


  public async setTarefaToStorage(){
    await Preferences.set({
      key: 'Tarefas',
      value: JSON.stringify(this.tarefas),
    });

  };
  


  public async getTarefaFromStorage() {
    const resposta = await Preferences.get({ key: 'Tarefas' });
    if (resposta !== null && typeof resposta.value === 'string') {
      let auxTarefas: any[] = JSON.parse(resposta.value);
      // Restante da lógica com o array auxTarefas
      if (Array.isArray(auxTarefas)) {
        for (let i of auxTarefas) {
          console.log(i);
          if (i.date != null) {
            i.date = i.date.substring(0, 10);
            i.date = i.date.replace(/-/g, "/");
          } else {
            i.date = "";
          }
          let atarefa: Tarefa = { value: i.value, date: new Date(i.date), done: i.done };
          this.tarefas.push(atarefa);
        }
      }

    } else {
      // Lidar com o caso em que o valor não está disponível ou não é uma string válida
      console.error("Valor inválido ou não encontrado no storage.");
    }
  };

}

interface Tarefa {
  value: String;
  date: Date;
  done?: boolean;

}