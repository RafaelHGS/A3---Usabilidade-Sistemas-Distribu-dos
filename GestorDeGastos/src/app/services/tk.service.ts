import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { FinancesAPIService } from './finances-api.service';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})

export class TkService {

  private gastoGanhos: any[] = [];
  private Saldo: Number = 0;

  constructor(public financeApi: FinancesAPIService,
    public profileService: ProfileService) {

  }


  public async setGastoGanhos() {
    try {
      const financesData: any = await this.financeApi.getFinance();
      for (let finance of financesData) {
        if (finance.clientId == this.profileService.getUserId()) {
          this.setSaldo(finance.financeValue);
          this.gastoGanhos.push(finance);
        }
      }
    } catch (error: any) {
      console.log(error)
    }
  }


  public getSaldo(): Number {
    return this.Saldo;
  }

  public setSaldo(novaEntrada: Number) {
    this.Saldo = Number(this.Saldo) + Number(novaEntrada);
  }


  public getGastoGanho(): any[] {
    return this.gastoGanhos;
  }


  public adicionarGastoGanho(nome: string, valor: number) {
    let gastoGanho = { financeName: nome, financeValue: valor };
    this.gastoGanhos.push(gastoGanho);
    this.financeApi.financeData.financeName = nome;
    this.financeApi.financeData.financeValue = valor;
    this.financeApi.financeData.clientId = Number(this.profileService.getUserId());
    this.financeApi.addFinance();
    // this.setGastoGanhoToStorage();
    this.setSaldo(valor);

  }

  public limparGastoGanho(index: number, valor: Number) {
    this.gastoGanhos.splice(index, 1);
    // this.setGastoGanhoToStorage();
    this.setSaldo(valor);
  }

  public atualizarGastoGanho(index: number, nome: string, valor: number) {
    let gastoGanho = this.gastoGanhos[index];
    gastoGanho.financeName = nome;
    gastoGanho.financeValue = valor;
    this.gastoGanhos.splice(index, 1, gastoGanho);

    this.financeApi.editFinance(gastoGanho);
    console.log(valor);
    this.setSaldo(Number(valor));

  }


  public async setGastoGanhoToStorage() {
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
          let gastoGanho = { financeId: i.financeId, financeName: i.financeName, financeValue: i.financeValue, clientId: i.clientId };
          this.gastoGanhos.push(gastoGanho);
          this.setSaldo(gastoGanho.financeValue)
        }
      }

    } else {
      // Lidar com o caso em que o valor não está disponível ou não é uma string válida
      console.error("Valor inválido ou não encontrado no storage.");
    }
  }


  public confereValor(valor: Number): boolean {
    return Number(valor) >= 0;
  }

}
