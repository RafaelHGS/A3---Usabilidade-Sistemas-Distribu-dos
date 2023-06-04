import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { FinancesService } from './finances.service';
import axios from 'axios';
import urls from "src/assets/config/urls.json";


@Injectable({
	providedIn: 'root'
})
export class FinancesAPIService {

	constructor(public toastController: ToastController,
				) { }

	financeData = {
		financeId: null,
		financeName: '',
		financeValue: 0,
		clientId: 0,
	};

	public async addFinance() {
		try {
			const url = urls.addFinance;
			const response = await axios.post(url, this.financeData);
		} catch (error: any) {
			this.presentToast(error.message.response);
		}

	}

	public async editFinance(finance: any) {
		try {
			const url = urls.editFinance;
			const response = await axios.put(url, finance);
		} catch (error: any) {
			this.presentToast(error.message.response);
		}

	}

	public async getFinance() {
		try {
			const url = urls.getFinance;
			const response = await axios.get(url);

			return response.data;
		} catch (error: any) {
			this.presentToast(error.message.response);
		}

	}


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
