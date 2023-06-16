import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

import { FinancesAPIService } from './finances-api.service';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})

export class FinancesService {
	constructor(public financeApi: FinancesAPIService,
				public profileService: ProfileService,
				) { }

	ngOnInit(){
		this.profileService.initProfile();
	}
	
	//Atributos para Criação de lista de finanças e Saldo total
  	private financesArray: any[] = [];
	totalBalance: number = 0;

	//Variaveis para definição de das finanças
	financesAPI: any[] = [];
	financesStorage: any[] = [];

	//Métodos de tratamento das variáveis locais
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

	//Captura das Finanças no Banco e adição na variável local
	public async setfinancesArray() {
		try {
			this.resetTotalBalance();
			this.resetFinancesArray();

			if(this.financesAPI.length >= this.financesStorage.length){
				for(let finance of this.financesAPI){
					this.setTotalBalance(finance.financeValue);
					this.financesArray.push(finance);
				}
				this.setFinancesToStorage();
			}else{
				for(let finance of this.financesStorage){
					this.setTotalBalance(finance.financeValue);
					this.financesArray.push(finance);
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}

	//Obtendo finanças da API
	public async setFinancesAPI(){
		const financesData: any = await this.financeApi.getFinance();

		if(this.profileService.getUserId() === 0){
			let tempProfileId = 0;
			const resposta = await Preferences.get({ key: 'Profile' });
			if(resposta !== null && typeof resposta.value === 'string'){
				const restoredProfile = await JSON.parse(resposta.value);
				tempProfileId = restoredProfile[0].userId;
			}
			for (let finance of financesData) {
				if (finance.clientId === tempProfileId) {
					this.financesAPI.push(finance);
				}
			}
		}else{
			for (let finance of financesData) {
				if (finance.clientId === this.profileService.getUserId()) {
					this.financesAPI.push(finance);
				}
			}
		}
	}

	//Criação e adição de finança atual no banco
	public async addFinance(nome: string, valor: number) {
		try {
			this.financeApi.financeData.financeName = nome;
			this.financeApi.financeData.financeValue = valor;
			this.financeApi.financeData.clientId = this.profileService.getUserId();
			await this.financeApi.addFinance();
			this.pushLastFinance();
			this.setTotalBalance(valor);
			this.setFinancesToStorage();
		} catch (error) {
			// console.error();
		}
	}

	//Adição de finança atual na variável local
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
			// console.log(error)
		}
	}

	//Exclusão da finança selecionada
	public cleanFinance(index: number, valor: number) {
		this.financeApi.deleteFinance(this.financesArray[index].financeId);
		this.financesArray.splice(index, 1);
		this.setTotalBalance(valor * -1);
		this.setFinancesToStorage();
	}

	//Edição da finança selecionada
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

	//Setando storage local
	public async setFinancesToStorage() {
		await Preferences.set({
			key: 'GastosGanhos',
			value: JSON.stringify(this.financesArray),
		});

	}

	//Obtendo finaças do Storage local
	public async setFinancesArrayFromStorage() {
		const resposta = await Preferences.get({ key: 'GastosGanhos' });
		if (resposta !== null && typeof resposta.value === 'string') {
			let auxGastosGanhos: any[] = JSON.parse(resposta.value);
			if (Array.isArray(auxGastosGanhos)) {
				for (let i of auxGastosGanhos) {
					let finance = { financeId: i.financeId, financeName: i.financeName, financeValue: i.financeValue, clientId: i.clientId };
					this.financesStorage.push(finance);
					// this.setTotalBalance(finance.financeValue)
				}
			}
		} else {
			console.error("Valor inválido ou não encontrado no storage.");
		}
	}

	//Limpeza do Storage Local
	public async cleanStorage() {
		try {
			await Preferences.remove({ key: 'GastosGanhos' });
		} catch (error: any) {
			console.error('Erro ao limpar o storage:', error);
		}
	}

	//Tratamento para definir um gasto e ganho
	public confereValor(valor: number): boolean {
		return valor >= 0;
	}
}
