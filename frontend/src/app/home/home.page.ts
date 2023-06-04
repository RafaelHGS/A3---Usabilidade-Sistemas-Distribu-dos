import { Component } from '@angular/core';
import { AlertController, ToastController, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { FinancesService } from '../services/finances.service';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})

export class HomePage {
	type: string = "ganho";

	constructor(
		private alertController: AlertController,
		public financesService: FinancesService,
		public toastController: ToastController,
		public popoverController: PopoverController,
		public router: Router,
		public profileApi : ProfileService,
	) { }

	ngOnInit() {
		this.financesService.setGastoGanhos();
		if(this.financesService.getGastoGanho() == null){
			this.financesService.getGastoGanhoFromStorage();
		}
	}

	logout() {
		this.financesService.resetGastoGanho();
		this.financesService.resetSaldo();
		this.profileApi.resetProfile();
		this.popoverController.dismiss().catch(error => console.error(error));
		this.router.navigate(["login"]).catch(error => console.error(error));
	}

	profile() {
		this.popoverController.dismiss().catch(error => console.error(error));
		this.router.navigate(["profile"]).catch(error => console.error(error));
	}

	async presentAlertPromptAdicionar() {
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
						// const valor = parseFloat(dadosAlert.valor); // E preciso parsear o float do valor recebido no input(?)
						if (dadosAlert.gastoGanho != "" && dadosAlert.gastoGanho != null)
							this.financesService.adicionarGastoGanho(dadosAlert.gastoGanho, dadosAlert.valor);
						else {
							this.presentToast();
							this.presentAlertPromptAdicionar();
						}
					}
				}
			]
		})
		await alert.present();
	}

	async presentAlertPromptLimpar(index: number, valor: number) {
		const alert = await this.alertController.create({
			header: "Exclusão !!!",
			message: 'Deseja Excluir essa Entrada/Saída ?',
			buttons: [
				{
					text: "cancelar",
					role: "cancel",
				}, {
					text: "Excluir",
					handler: () => this.financesService.limparGastoGanho(index, valor)
				}
			]
		})
		await alert.present();
	}

	async presentAlertPromptAtualizar(index: number, gastoGanho: any) {
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
							this.financesService.atualizarGastoGanho(index, dadosAlert.gastoGanho, valor)
						} else {
							this.presentToast();
							this.presentAlertPromptAtualizar(index, gastoGanho).catch(error => console.error(error));
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

		/* By awaiting the toast.present() promise, you ensure that the promise is
		resolved or rejected before continuing the execution. -ChatGPT */
		await toast.present();
	}
}