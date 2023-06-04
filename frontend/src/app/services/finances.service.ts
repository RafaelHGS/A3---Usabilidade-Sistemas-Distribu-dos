import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { FinancesAPIService } from './finances-api.service';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class FinancesService {
  	private financesArray: any[] = [];
	totalBalance: number = 0;

	constructor(public financeApi: FinancesAPIService, public profileService: ProfileService) { }

	public async setfinancesArray() {
		try {
			this.resetTotalBalance();
			this.resetFinancesArray();
			const financesData: any = await this.financeApi.getFinance();
			for (let finance of financesData) {
				if (finance.clientId === this.profileService.getUserId()) {
					this.setTotalBalance(finance.financeValue);
					this.financesArray.push(finance);
				}
			}
			this.setFinancesToStorage();
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
			this.financesArray.push(financesFromThisClient[financesFromThisClient.length - 1]);
		} catch (error: any) {
			console.log(error)
		}
	}

	public setTotalBalance(novaEntrada: number) {
		this.totalBalance += novaEntrada;
	}

	public resetTotalBalance() {
		this.totalBalance = 0;
	}

	public getFinancesArray(): any[] {
		return this.financesArray;
	}

	public resetFinancesArray() {
		this.financesArray = [];
		this.cleanStorage();
	}


	public async addFinance(nome: string, valor: number) {
		try {
			this.financeApi.financeData.financeName = nome;
			this.financeApi.financeData.financeValue = valor;
			this.financeApi.financeData.clientId = this.profileService.getUserId();
			await this.financeApi.addFinance();
			this.pushLastFinance();
			this.setTotalBalance(Number(valor));
			this.setFinancesToStorage();
		} catch (error) {
			console.error();
		}
	}

	public cleanFinance(index: number, valor: number) {
		this.financeApi.deleteFinance(this.financesArray[index].financeId);
		this.financesArray.splice(index, 1);
		this.setTotalBalance(valor * -1);
		this.setFinancesToStorage();
	}

	public updateFinance(index: number, nome: string, valor: number) {
		let gastoGanho = this.financesArray[index];
		this.setTotalBalance(+gastoGanho.financeValue * -1)
		gastoGanho.financeName = nome;
		gastoGanho.financeValue = valor;
		this.financesArray.splice(index, 1, gastoGanho);
		this.financeApi.editFinance(gastoGanho);
		this.setTotalBalance(valor);
		this.setFinancesToStorage();

	}


	public async setFinancesToStorage() {
		await Preferences.set({
			key: 'GastosGanhos',
			value: JSON.stringify(this.financesArray),
		});

	}


	public async getFinancesArrayFromStorage() {
		const resposta = await Preferences.get({ key: 'GastosGanhos' });
		if (resposta !== null && typeof resposta.value === 'string') {
			let auxGastosGanhos: any[] = JSON.parse(resposta.value);
			if (Array.isArray(auxGastosGanhos)) {
				for (let i of auxGastosGanhos) {
					let finance = { financeId: i.financeId, financeName: i.financeName, financeValue: i.financeValue, clientId: i.clientId };
					this.financesArray.push(finance);
					this.setTotalBalance(finance.financeValue)
				}
			}
		} else {
			console.error("Valor inválido ou não encontrado no storage.");
		}
	}

	public async cleanStorage() {
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
