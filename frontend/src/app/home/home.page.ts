import { Component } from '@angular/core';
import { AlertController, ToastController, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { FinancesService } from '../services/finances.service';
import { Preferences } from '@capacitor/preferences';
import { FinancesAPIService } from '../services/finances-api.service';
import { ProfilePage } from '../profile/profile.page';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})

export class HomePage {
	type: string = "ganho";

	//Página Principal do aplicativo
	constructor(
		private alertController: AlertController,
		public financesService: FinancesService,
		public toastController: ToastController,
		public popoverController: PopoverController,
		public profileService : ProfileService,
		public financeApi : FinancesAPIService,
		public router: Router,
	) { }

	//Métodos para captura de finanças
	ngOnInit() {
		this.initFinances();
	}

	public async initFinances(){
		await this.profileService.initProfile();
		await this.financesService.setFinancesAPI();
		await this.financesService.setFinancesArrayFromStorage();
		this.financesService.setfinancesArray();
	}

	//Métodos para limpeza de finanças e perfil de usuário
	logout() {
		this.financesService.resetFinancesArray();
		this.financesService.resetTotalBalance();
		this.profileService.resetProfile();
		this.popoverController.dismiss().catch(error => console.error(error));
		this.router.navigate(["login"]).catch(error => console.error(error));
	}

	//Método de navegação para profile
	profile() {
		this.popoverController.dismiss().catch(error => console.error(error));
		this.router.navigate(["profile"]).catch(error => console.error(error));
	}

	//Adição de finança
	async presentAlertPromptAdd() {
		const alert = await this.alertController.create({
			header: "Novo Gasto/Ganho",
			inputs: [
				{
					name: "gastoGanho",
					type: "text",
					placeholder: "Gasto/Ganho"
				},
				{
					name: "valor",
					type: "number",
				}
			],
			buttons: [
				{
					text: "cancelar",
					role: "cancel",
					handler: () => {
						console.log("Confirm Cancel");
					}
				},
				{
					text: "Ok",
					handler: (dadosAlert) => {
						if (dadosAlert.gastoGanho != "" && dadosAlert.gastoGanho != null)
							this.financesService.addFinance(dadosAlert.gastoGanho, dadosAlert.valor);
						else {
							this.presentToast();
							this.presentAlertPromptAdd();
						}
					}
				}
			]
		})
		await alert.present();
	}

	//Exclusão de Finança
	async presentAlertPromptClean(index: number, valor: number) {
		const alert = await this.alertController.create({
			header: "Exclusão !!!",
			message: 'Deseja Excluir essa Entrada/Saída ?',
			buttons: [
				{
					text: "cancelar",
					role: "cancel",
				}, {
					text: "Excluir",
					handler: () => this.financesService.cleanFinance(index, valor)
				}
			]
		})
		await alert.present();
	}

	//Atualização de finança
	async presentAlertPromptUpdate(index: number, gastoGanho: any) {
		const alert = await this.alertController.create({
			header: "Alterar Campo",
			inputs: [
				{
					name: "gastoGanho",
					type: "text",
					placeholder: "Gasto/Ganho",
					value: gastoGanho.nome
				},
				{
					name: "valor",
					type: "number",
					value: gastoGanho.valor
				}
			],
			buttons: [
				{
					text: "cancelar",
					role: "cancel",
					handler: () => {
						console.log("Confirm Cancel");
					}
				},
				{
					text: "Salvar",
					handler: (dadosAlert) => {
						const valor = parseFloat(dadosAlert.valor);
						if (dadosAlert.gastoGanho != "" && !isNaN(valor)) {
							this.financesService.updateFinance(index, dadosAlert.gastoGanho, valor)
						} else {
							this.presentToast();
							this.presentAlertPromptUpdate(index, gastoGanho).catch(error => console.error(error));
						}
					}
				}
			]
		})
		await alert.present();
	}

	//Mensagem padrão de Erro
	async presentToast() {
		const toast = await this.toastController.create({
			message: "Preencha os campos!",
			duration: 2500
		});
		await toast.present();
	}
}