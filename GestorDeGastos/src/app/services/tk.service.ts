import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

// import { Plugins } from '@capacitor/core/types/global';
// const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})

export class TkService {

  private gastoGanhos: GastoGanho[] = [];
  private Saldo : Number = 0;

  constructor() {

   }

   public getSaldo(): Number{
    return this.Saldo;
   }

   public setSaldo(novaEntrada: Number) {
    this.Saldo = Number(this.Saldo) + Number(novaEntrada);
  }


   public getGastoGanho() : GastoGanho[]{
    return this.gastoGanhos;
   }

   public adicionarGastoGanho(nome: string, valor: number){
    let gastoGanho : GastoGanho = {nome: nome, valor: valor};
    this.gastoGanhos.push(gastoGanho);
    this.setGastoGanhoToStorage();
    this.setSaldo(valor);
    
   }

   public limparGastoGanho(index: number, valor: Number){
    this.gastoGanhos.splice(index, 1);
    this.setGastoGanhoToStorage();
    this.setSaldo(valor);
   }

   public atualizarGastoGanho(index: number, nome: string, valor: number){
    let gastoGanho: GastoGanho = this.gastoGanhos[index];
    gastoGanho.nome = nome;
    gastoGanho.valor = valor;
    this.gastoGanhos.splice(index, 1, gastoGanho);
    this.setGastoGanhoToStorage();
    this.setSaldo(valor);
   }


  public async setGastoGanhoToStorage(){
    await Preferences.set({
      key: 'GastosGanhos',
      value: JSON.stringify(this.gastoGanhos),
    });

  }

  
  public async getGastoGanhoFromStorage() {
    const resposta = await Preferences.get({ key: 'GastosGanhos' });
    if (resposta !== null && typeof resposta.value === 'string') {
      let auxGastosGanhos: any[] = JSON.parse(resposta.value);
      // Restante da lógica com o array auxGastosGanhos
      if (Array.isArray(auxGastosGanhos)) {
        for (let i of auxGastosGanhos) {
          let gastoGanho : GastoGanho = {nome: i.nome, valor: i.valor};
          this.gastoGanhos.push(gastoGanho);
          this.setSaldo(gastoGanho.valor)
        }
      }
      
    } else {
      // Lidar com o caso em que o valor não está disponível ou não é uma string válida
      console.error("Valor inválido ou não encontrado no storage.");
    }
  }


  public confereValor(valor : Number) : boolean{
    return Number(valor) >=0 ;
  }
  
}


interface GastoGanho {
  nome: String;
  valor: Number;

}