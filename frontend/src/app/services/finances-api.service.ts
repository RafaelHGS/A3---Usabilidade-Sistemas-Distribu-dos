import { Injectable } from '@angular/core';
import axios from 'axios';
import { TkService } from './tk.service';
import { ProfileService } from './profile.service';
import { ToastController } from '@ionic/angular';

@Injectable({
	providedIn: 'root'
})
export class FinancesAPIService {

	constructor(public profileService: ProfileService,
					public toastController: ToastController) { }

	financeData = {
		financeId: null,
		financeName: '',
		financeValue: 0,
		clientId: 0,
	};

	async addFinance() {
		try {
			const url = "http://localhost:8080/finances/add";
			const response = await axios.post(url, this.financeData);
		} catch (error: any) {
			this.presentToast(error.message.response);
		}

	}

	async editFinance(finance: any) {
		try {
			const url = "http://localhost:8080/finances/edit";
			const response = await axios.put(url, finance);
		} catch (error: any) {
			this.presentToast(error.message.response);
		}

	}

	async getFinance() {
		try {
			const url = "http://localhost:8080/finances/list";
			const response = await axios.get(url);

			return response.data;
		} catch (error: any) {
			this.presentToast(error.message.response);
		}

	}


	async deleteFinance(financeId: String){
		try {
			const url = "http://localhost:8080/finances/delete/" + String(financeId);
			const response = await axios.delete(url);
			
			return response.data;
		} catch (error: any) {
			this.presentToast(error.message.response);
		}
	}

	async presentToast(msg: string) {
		const toast = await this.toastController.create({
			message: msg,
			duration: 2500
		});
		toast.present();
	}
}
