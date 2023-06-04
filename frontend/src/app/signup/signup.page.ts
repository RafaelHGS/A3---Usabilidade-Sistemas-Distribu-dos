import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import axios from 'axios';
import urls from "src/assets/config/urls.json";


@Component({
	selector: 'app-signup',
	templateUrl: 'signup.page.html',
	styleUrls: ['signup.page.scss'],
})

export class SignupPage {
	constructor(public router: Router, public toastController: ToastController) { }

	private _errorMessage: string = '';

	public getErrorMessage(): string {
		return this._errorMessage;
	}
	public setErrorMessage(value: string) {
		this._errorMessage = value;
	}


	signupData = {
		name: '',
		email: '',
		password: ''
	};

	async signup() {
		try {
			const url = urls.signup; // Altere a URL conforme necessário
			const response = await axios.post(url, this.signupData)
			this.router.navigate(["login"])
		} catch (error: any) {
			try{
				const aux = error.response.data.message;
				this.presentToast(aux);
			  }
			  catch (error){
				this.presentToast("Erro de Conexão com servidor, tente novamente mais tarde");
			  }
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
