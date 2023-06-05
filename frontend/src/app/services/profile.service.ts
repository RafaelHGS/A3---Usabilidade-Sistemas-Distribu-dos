import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { FinancesAPIService } from './finances-api.service';
import { Preferences } from '@capacitor/preferences';
import axios from 'axios';
import urls from "src/assets/config/urls.json";


@Injectable({
	providedIn: 'root'
})
export class ProfileService {

	constructor(public alertController: AlertController,
				public toastController: ToastController,
				public financeApi: FinancesAPIService,
				public router: Router) { }


	//Atributos do Profile
	private email: string = "";
	private username: string = "";
	private userId: number = 0;

	public setEmail(email: string) {
		this.email = email;
	}

	public getEmail() {
		return this.email;
	}


	public setUsername(username: string) {
		this.username = username;
	}

	public getUsername() {
		return this.username;
	}

	public setUserId(userId: number) {
		this.userId = userId;
	}

	public getUserId() {
		return this.userId;
	}

	public resetProfile(){
		this.email = "";
		this.username = "";
		this.cleanStorage();
	}


	//Inicialização do profile
	public async initProfile(){
		const verifyProfile = Number(this.getUserId()); 
		if(verifyProfile == 0){
			this.getProfileFromStorage();
		}
	  }


	//Definindo Profile
	public async setProfile() {
		try {
			const url = urls.setProfile + this.getEmail();
			const response = await axios.get(url);
			this.setUsername(response.data.name);
			this.setUserId(response.data.id),
			this.setProfiletoStorage()

		} catch (error: any) {
			// const aux = error.response.data.message;
			// console.error(aux);
		}
	}


	//Pegando informações de usuário e email
	public getProfile() {
		try {
			const tempProfile: any[] = [
				this.getUsername(),
				this.getEmail()
			];
			return tempProfile;
		} catch (error: any) {
			// console.error(error);
			return [];
		}
	}
	

	//Setando Perfil ao storage Local
	public async setProfiletoStorage() {
		const tempProfile: any[] = [{
			"email" : this.getEmail(),
			"username": this.getUsername(),
			"userId": this.getUserId(),
		}
		]
		await Preferences.set({
			key: 'Profile',
			value: JSON.stringify(tempProfile),
		});

	}
	
	//Captura de Perfil
	public async getProfileFromStorage(){
		const resposta = await Preferences.get({ key: 'Profile' });
		if(resposta !== null && typeof resposta.value === 'string'){
			const restoredProfile = await JSON.parse(resposta.value);
			this.setEmail(restoredProfile[0].email);
			this.setUsername(restoredProfile[0].username);
			await this.setUserId(restoredProfile[0].userId);
		}
		else{
			console.error("Profile Não definido no Storage")
		}
	}

	//Limpeza do Storage Local
	public async cleanStorage() {
		try {
			await Preferences.remove({ key: 'Profile' });
		} catch (error: any) {
			console.error('Erro ao limpar o storage:', error);
		}
	}

	//Edição do Profile
	public async presentAlertPromptEditProfile() {
		const alert = await this.alertController.create({
			header: "Alterar Dados",
			inputs: [
				{
					name: "name",
					type: "text",
					placeholder: "Novo nome"
				},
				{
					name: "email",
					type: "text",
					placeholder: "Novo email"
				},
				{
					name: "senha",
					type: "text",
					placeholder: "Nova senha"
				}
			],
			buttons: [
				{
					text: "cancelar",
					role: "cancel",
					handler: () => {
						console.log("Confirm Cancel");
					}
				}, {
					text: "Alterar",
					handler: async (dadosAlert) => {
						if (dadosAlert.name != "") {
							try {
								const userData = {
									id: this.getUserId(),
									name: dadosAlert.name,
									email: dadosAlert.email,
									password: dadosAlert.senha
								};

								if (dadosAlert.email === "" || dadosAlert.email === null) {
									userData.email = this.getEmail();
								}
								if (dadosAlert.password === "" || dadosAlert.password === null) {
									userData.password = null;
								}


								const url = urls.editProfile;
								const response = await axios.put(url, userData);

								this.setUsername(userData.name);
								this.setEmail(userData.email);
								this.setProfile();

							} catch (error: any) {
								const aux = error.response.data.message;

								const toast = await this.toastController.create({
									message: aux,
									duration: 2500
								});
								toast.present();
								this.presentAlertPromptEditProfile();

							}
						}
						else {

							this.presentToast();
							this.presentAlertPromptEditProfile();
						}
					}
				}
			]
		})
		await alert.present();

	}


	//Deletando usuário e finanças associadas
	public async deleteProfile() {
		const alert = await this.alertController.create({
			header: "Exclusão !!!",
			message: 'Deseja Realmente excluir sua conta ? Essa Ação não poderá ser desfeita!',
			buttons: [
				{
					text: "cancelar",
					role: "cancel",
				}, {
					text: "Excluir",
					handler: async () => {
						try {
							const url = urls.deleteProfile + this.getEmail();
							const response = await axios.delete(url);

							const toast = await this.toastController.create({
								message: "Usuário Excluído com sucesso",
								duration: 2500
							});
							toast.present();

							this.router.navigate(["login"]);

						} catch (error) {
							// console.error(error);
						}
					}
				}
			]
		})
		await alert.present();



	}


	async presentToast() {
		const toast = await this.toastController.create({
			message: "Preencha os campos!",
			duration: 2500
		});
		toast.present();
	}


}
