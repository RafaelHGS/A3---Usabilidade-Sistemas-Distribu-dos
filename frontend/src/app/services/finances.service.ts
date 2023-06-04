import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { FinancesAPIService } from './finances-api.service';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class FinancesService {
  private gastoGanhos: any[] = [];
	saldo: number = 0;

	constructor(public financeApi: FinancesAPIService, public profileService: ProfileService) { }

	public async setGastoGanhos() {
		try {
			this.resetGastoGanho();
			const financesData: any = await this.financeApi.getFinance();
			for (let finance of financesData) {
				if (finance.clientId === this.profileService.getUserId()) {
					this.setSaldo(finance.financeValue);
					this.gastoGanhos.push(finance);
				}
			}
			this.setGastoGanhoToStorage();
		} catch (error: any) {
			console.log(error)
		}
	}

	public async pushLastFinance() {
		try {
			const financesData: any = await this.financeApi.getFinance();
			const financesFromThisClient: any[] = [];
			for (let finance of financesData) {
				if (finance.clientId === this.profileService.getUserId()) {
					financesFromThisClient.push(finance);
				}
			}
			this.gastoGanhos.push(financesFromThisClient[financesFromThisClient.length - 1]);
		} catch (error: any) {
			console.log(error)
		}
	}

	public setSaldo(novaEntrada: number) {
		this.saldo += novaEntrada;
	}

	public resetSaldo() {
		this.saldo = 0;
	}

	public getGastoGanho(): any[] {
		return this.gastoGanhos;
	}

	public resetGastoGanho() {
		this.gastoGanhos = [];
		this.clearStorage();
	}


	public async adicionarGastoGanho(nome: string, valor: number) {
		try {
			this.financeApi.financeData.financeName = nome;
			this.financeApi.financeData.financeValue = valor;
			this.financeApi.financeData.clientId = this.profileService.getUserId();
			await this.financeApi.addFinance();
			this.pushLastFinance();
			this.setSaldo(Number(valor));
			this.setGastoGanhoToStorage();
		} catch (error) {
			console.error();
		}
	}

	public limparGastoGanho(index: number, valor: number) {
		this.financeApi.deleteFinance(this.gastoGanhos[index].financeId);
		this.gastoGanhos.splice(index, 1);
		this.setSaldo(valor * -1);
		this.setGastoGanhoToStorage();
	}

	public atualizarGastoGanho(index: number, nome: string, valor: number) {
		let gastoGanho = this.gastoGanhos[index];
		this.setSaldo(+gastoGanho.financeValue * -1)
		gastoGanho.financeName = nome;
		gastoGanho.financeValue = valor;
		this.gastoGanhos.splice(index, 1, gastoGanho);
		this.financeApi.editFinance(gastoGanho);
		this.setSaldo(valor);
		this.setGastoGanhoToStorage();

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

	public async clearStorage() {
		try {
			await Preferences.remove({ key: 'GastosGanhos' });
		} catch (error: any) {
			console.error('Erro ao limpar o storage:', error);
		}
	}

	public confereValor(valor: number): boolean {
		return valor >= 0;
	}
}
