import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import axios from 'axios';
import urls from "src/assets/config/urls.json";

@Injectable({
	providedIn: 'root'
})
export class FinancesAPIService {
	constructor(public toastController: ToastController) { }

	//Dados para adição de uma finança
	financeData = {
		financeId: null,
		financeName: '',
		financeValue: 0,
		clientId: 0,
	};

	//Para todos os métodos, substituir a URL no arquivo de configuração com a url adequada
	//Método de adição de finança
	public async addFinance() {
		try {
			const url = urls.addFinance;
			const response = await axios.post(url, this.financeData);
		} catch (error: any) {
			this.presentToast(error.message.response);
		}
	}

	//Método de adição de finança
	public async editFinance(finance: any) {
		try {
			const url = urls.editFinance;
			const response = await axios.put(url, finance);
		} catch (error: any) {
			this.presentToast(error.message.response);
		}
	}

	//Método para extrair finanças do banco
	public async getFinance() {
		try {
			const url = urls.getFinance;
			const response = await axios.get(url);

			return response.data;
		} catch (error: any) {
			this.presentToast(error.message.response);
		}
	}

	//Método de Exclusão de finança
	public async deleteFinance(financeId: String){
		try {
			const url = urls.deleteFinance + String(financeId);
			const response = await axios.delete(url);
			
			return response.data;
		} catch (error: any) {
			this.presentToast(error.message.response);
		}
	}

	public async presentToast(msg: string) {
		const toast = await this.toastController.create({
			message: msg,
			duration: 2500
		});
		toast.present();
	}
}
