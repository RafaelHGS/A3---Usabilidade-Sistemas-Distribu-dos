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

	//Dados para cadastro
	signupData = {
		name: '',
		email: '',
		password: ''
	};

	//Cadastro no banco de dados
	async signup() {
		try {
			const url = urls.signup;
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
